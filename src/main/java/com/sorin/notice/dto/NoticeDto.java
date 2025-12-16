package com.sorin.notice.dto;

import com.sorin.notice.domain.enums.Importance;
import com.sorin.notice.domain.enums.NoticeType;
import lombok.Data;

import java.time.LocalDateTime;

public class NoticeDto {

    @Data
    public static class NoticeRegisterRequest {
        private String title;
        private String content;
        private NoticeType noticeType;
        private Importance importance;
        private String recipients;
        private String writerId;

        // Schedule Info
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private boolean isRegularSend;
    }

    @Data
    public static class NoticeApproveRequest {
        private String approverId;
        private String comments;
        private boolean approved; // true for APPROVE, false for REJECT
    }
}
