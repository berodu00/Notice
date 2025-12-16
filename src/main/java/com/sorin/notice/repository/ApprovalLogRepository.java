package com.sorin.notice.repository;

import com.sorin.notice.domain.entity.ApprovalLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalLogRepository extends JpaRepository<ApprovalLog, Long> {
}
