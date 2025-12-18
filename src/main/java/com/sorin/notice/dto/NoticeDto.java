package com.sorin.notice.dto;

import com.sorin.notice.domain.enums.Importance;
import com.sorin.notice.domain.enums.NoticeType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class NoticeDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class NoticeRegisterRequest {
        private String title;
        private String content;
        private NoticeType noticeType;
        private Importance importance;
        private String writerId;
        private String recipients;

        // Schedule fields
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private boolean isRegularSend;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class NoticeApproveRequest {
        private String approverId;
        private String comments;
        private boolean approved;
    }
}
