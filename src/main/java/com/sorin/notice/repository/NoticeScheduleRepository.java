package com.sorin.notice.repository;

import com.sorin.notice.domain.entity.NoticeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeScheduleRepository extends JpaRepository<NoticeSchedule, Long> {
}
