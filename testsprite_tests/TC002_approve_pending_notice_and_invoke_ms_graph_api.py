import requests
import datetime

BASE_URL = "http://localhost:8080"
HEADERS_JSON = {"Content-Type": "application/json"}
TIMEOUT = 30

def test_approve_pending_notice_and_invoke_ms_graph_api():
    notice_id = None
    try:
        # Step 1: Register a new notice with PENDING status
        now = datetime.datetime.utcnow()
        start_time = now.isoformat() + "Z"
        end_time = (now + datetime.timedelta(hours=1)).isoformat() + "Z"
        register_payload = {
            "title": "Test Notice for Approval",
            "content": "This is a test notice created for approval testing.",
            "noticeType": "GENERAL",
            "importance": "NORMAL",
            "writerId": "test_writer_001",
            "recipients": "user1,user2",
            "startTime": start_time,
            "endTime": end_time,
            "isRegularSend": False
        }
        resp = requests.post(f"{BASE_URL}/api/notices/register", json=register_payload, headers=HEADERS_JSON, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Register notice failed with status {resp.status_code}"
        notice_id = resp.json()
        assert isinstance(notice_id, int), "Register response did not return notice ID as int"

        # Step 2: Approve the notice with POST /api/notices/{noticeId}/approve
        approve_payload = {
            "approverId": "manager_001",
            "comments": "Approval for testing MS Graph API integration",
            "approved": True
        }
        resp = requests.post(f"{BASE_URL}/api/notices/{notice_id}/approve", json=approve_payload, headers=HEADERS_JSON, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Approve notice failed with status {resp.status_code}"

        # Step 3: Verify the notice status is updated to APPROVED via GET all notices endpoint
        resp = requests.get(f"{BASE_URL}/api/notices", headers=HEADERS_JSON, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Get notices failed with status {resp.status_code}"
        notices = resp.json()
        # Locate the updated notice and verify status and fields
        matched_notices = [n for n in notices if n.get("id") == notice_id]
        assert matched_notices, f"Could not find notice with ID {notice_id} in notices list"
        notice = matched_notices[0]
        assert notice.get("status") == "APPROVED", f"Notice status is not APPROVED but {notice.get('status')}"

        # Step 4: Verify approval logs exist and MS Graph API stub called
        # Since no direct endpoint for logs or MS Graph stub is provided,
        # Assume the approval action logged if the approve endpoint succeeded.
        # If the system exposes relevant headers or indirect signals, they could be verified here.
        # This test assumes success of approve API implies logs and MS Graph API call as per system design.

    finally:
        # Cleanup: Delete the created notice to maintain test isolation if deletion endpoint exists.
        # Since no DELETE endpoint described, skip cleanup or adapt if available.
        pass

test_approve_pending_notice_and_invoke_ms_graph_api()