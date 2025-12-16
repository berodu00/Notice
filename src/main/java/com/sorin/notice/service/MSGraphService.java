package com.sorin.notice.service;

import com.sorin.notice.domain.entity.NoticeMaster;

public interface MSGraphService {
    void sendNoticeAndRegisterCalendar(NoticeMaster notice);
}
