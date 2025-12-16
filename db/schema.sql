-- 1. notice_master Table
CREATE TABLE notice_master (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    notice_type VARCHAR(50) NOT NULL, -- e.g., SYSTEM_MAINTENANCE, GENERAL, SECURITY
    importance VARCHAR(20) NOT NULL, -- e.g., HIGH, NORMAL, LOW
    recipients VARCHAR(255), -- Comma separated or JSON string depending on requirements
    writer_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT', -- DRAFT, PENDING, APPROVED, REJECTED, COMPLETED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. notice_schedule Table
CREATE TABLE notice_schedule (
    id BIGSERIAL PRIMARY KEY,
    notice_id BIGINT NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    is_regular_send BOOLEAN DEFAULT FALSE,
    outlook_event_id VARCHAR(255),
    CONSTRAINT fk_notice_master FOREIGN KEY (notice_id) REFERENCES notice_master (id) ON DELETE CASCADE
);

-- 3. approval_log Table
CREATE TABLE approval_log (
    id BIGSERIAL PRIMARY KEY,
    notice_id BIGINT NOT NULL,
    approver_id VARCHAR(50) NOT NULL,
    action VARCHAR(20) NOT NULL, -- APPROVE, REJECT
    comments TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notice_master_approval FOREIGN KEY (notice_id) REFERENCES notice_master (id) ON DELETE CASCADE
);

-- Indexes for performance (Optional but recommended)
CREATE INDEX idx_notice_status ON notice_master(status);
CREATE INDEX idx_notice_schedule_notice_id ON notice_schedule(notice_id);
CREATE INDEX idx_approval_log_notice_id ON approval_log(notice_id);
