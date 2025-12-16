package com.sorin.notice.domain.entity;

import com.sorin.notice.domain.enums.ApprovalAction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

import java.time.LocalDateTime;

@Entity
@Table(name = "approval_log")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApprovalLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id", nullable = false)
    private NoticeMaster noticeMaster;

    @Column(name = "approver_id", nullable = false)
    private String approverId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalAction action;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    public static ApprovalLog create(NoticeMaster noticeMaster, String approverId, ApprovalAction action,
            String comments) {
        ApprovalLog log = new ApprovalLog();
        log.noticeMaster = noticeMaster;
        log.approverId = approverId;
        log.action = action;
        log.comments = comments;
        log.processedAt = LocalDateTime.now();
        return log;
    }
}
