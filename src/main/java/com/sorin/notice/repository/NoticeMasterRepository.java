package com.sorin.notice.repository;

import com.sorin.notice.domain.entity.NoticeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeMasterRepository extends JpaRepository<NoticeMaster, Long> {
}
