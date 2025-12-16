package com.sorin.notice.service.impl;

import com.sorin.notice.domain.entity.NoticeMaster;
import com.sorin.notice.service.MSGraphService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MSGraphServiceStub implements MSGraphService {

    @Override
    public void sendNoticeAndRegisterCalendar(NoticeMaster notice) {
        log.info("============== [MS Graph API STUB] ==============");
        log.info("Registering Notice to Outlook Calendar: {}", notice.getTitle());
        log.info("Sending Email to Recipients: {}", notice.getRecipients());
        log.info("Notice Content: {}", notice.getContent());

        // Simulate external API call latency
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        log.info("Successfully registered event and sent emails.");
        log.info("=================================================");
    }
}
