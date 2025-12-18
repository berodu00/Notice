package com.sorin.notice.domain.entity;

import com.sorin.notice.domain.enums.Importance;
import com.sorin.notice.domain.enums.NoticeStatus;
import com.sorin.notice.domain.enums.NoticeType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

import java.time.LocalDateTime;

@Entity
@Table(name = "notice_master")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "notice_type", nullable = false)
    private NoticeType noticeType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Importance importance;

    private String recipients; // JSON structure or comma separated

    @Column(name = "writer_id", nullable = false)
    private String writerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NoticeStatus status;

    @OneToOne(mappedBy = "noticeMaster", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private NoticeSchedule schedule;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper to create new instance
    public static NoticeMaster create(String title, String content, NoticeType type, Importance importance,
            String recipients, String writerId) {
        NoticeMaster notice = new NoticeMaster();
        notice.title = title;
        notice.content = content;
        notice.noticeType = type;
        notice.importance = importance;
        notice.recipients = recipients;
        notice.writerId = writerId;
        notice.status = NoticeStatus.DRAFT; // Default
        return notice;
    }

    public void submitForApproval() {
        this.status = NoticeStatus.PENDING;
    }

    public void approve() {
        this.status = NoticeStatus.APPROVED;
    }

    public void reject() {
        this.status = NoticeStatus.REJECTED;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
