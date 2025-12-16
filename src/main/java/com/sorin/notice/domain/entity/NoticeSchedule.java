package com.sorin.notice.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

import java.time.LocalDateTime;

@Entity
@Table(name = "notice_schedule")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id", nullable = false)
    private NoticeMaster noticeMaster;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "is_regular_send")
    private boolean isRegularSend;

    @Column(name = "outlook_event_id")
    private String outlookEventId;

    public static NoticeSchedule create(NoticeMaster noticeMaster, LocalDateTime startTime, LocalDateTime endTime,
            boolean isRegularSend) {
        NoticeSchedule schedule = new NoticeSchedule();
        schedule.noticeMaster = noticeMaster;
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.isRegularSend = isRegularSend;
        return schedule;
    }
}
