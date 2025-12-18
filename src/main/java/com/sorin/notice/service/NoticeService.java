package com.sorin.notice.service;

import com.sorin.notice.domain.entity.ApprovalLog;
import com.sorin.notice.domain.entity.NoticeMaster;
import com.sorin.notice.domain.entity.NoticeSchedule;
import com.sorin.notice.domain.enums.ApprovalAction;
import com.sorin.notice.domain.enums.NoticeStatus;
import com.sorin.notice.dto.NoticeDto.*;
import com.sorin.notice.repository.ApprovalLogRepository;
import com.sorin.notice.repository.NoticeMasterRepository;
import com.sorin.notice.repository.NoticeScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMasterRepository noticeMasterRepository;
    private final NoticeScheduleRepository noticeScheduleRepository;
    private final ApprovalLogRepository approvalLogRepository;
    private final MSGraphService msGraphService;

    @Transactional(readOnly = true)
    public List<NoticeMaster> getAllNotices() {
        return noticeMasterRepository.findAll();
    }

    /**
     * 공지 등록 (A. 공지 등록 API)
     * - NoticeMaster, NoticeSchedule 저장
     * - Status: PENDING
     */
    @Transactional
    public Long registerNotice(NoticeRegisterRequest request) {
        // 1. Create NoticeMaster
        NoticeMaster notice = NoticeMaster.create(
                request.getTitle(),
                request.getContent(),
                request.getNoticeType(),
                request.getImportance(),
                request.getRecipients(),
                request.getWriterId());

        // Set Status to PENDING
        notice.submitForApproval();
        NoticeMaster savedNotice = noticeMasterRepository.save(notice);

        // 2. Create NoticeSchedule
        NoticeSchedule schedule = NoticeSchedule.create(
                savedNotice,
                request.getStartTime(),
                request.getEndTime(),
                request.isRegularSend());

        // Ensure bidirectional link in memory (optional but good practice)
        savedNotice.setSchedule(schedule);

        noticeScheduleRepository.save(schedule);

        return savedNotice.getId();
    }

    /**
     * 결재 처리 (B. 결재 처리 API)
     * - Validation: check if PENDING
     * - Update Status: APPROVED or REJECTED
     * - Log Approval
     * - Call Stub (if APPROVED)
     */
    @Transactional
    public void processApproval(Long noticeId, NoticeApproveRequest request) {
        NoticeMaster notice = noticeMasterRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid notice Id:" + noticeId));

        // Validation
        if (notice.getStatus() != NoticeStatus.PENDING) {
            throw new IllegalStateException("Notice is not in PENDING state.");
        }

        ApprovalAction action = request.isApproved() ? ApprovalAction.APPROVE : ApprovalAction.REJECT;

        // Update Status
        if (action == ApprovalAction.APPROVE) {
            notice.approve();
        } else {
            notice.reject();
        }

        // Log Approval
        ApprovalLog log = ApprovalLog.create(
                notice,
                request.getApproverId(),
                action,
                request.getComments());
        approvalLogRepository.save(log);

        // Call MS Graph Stub if Approved
        if (action == ApprovalAction.APPROVE) {
            msGraphService.sendNoticeAndRegisterCalendar(notice);
        }
    }
}
