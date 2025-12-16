package com.sorin.notice.controller;

import com.sorin.notice.dto.NoticeDto.*;
import com.sorin.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sorin.notice.domain.entity.NoticeMaster;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/register")
    public ResponseEntity<Long> registerNotice(@RequestBody NoticeRegisterRequest request) {
        Long noticeId = noticeService.registerNotice(request);
        return ResponseEntity.ok(noticeId);
    }

    @PostMapping("/{noticeId}/approve")
    public ResponseEntity<Void> approveNotice(
            @PathVariable Long noticeId,
            @RequestBody NoticeApproveRequest request) {
        noticeService.processApproval(noticeId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<NoticeMaster>> getNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }
}
