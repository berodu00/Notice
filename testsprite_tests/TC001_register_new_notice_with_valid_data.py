import requests
import datetime

BASE_URL = "http://localhost:8080"
HEADERS = {
    "Content-Type": "application/json"
}
TIMEOUT = 30

def test_register_new_notice_with_valid_data():
    register_url = f"{BASE_URL}/api/notices/register"
    # Prepare a valid notice payload with all mandatory fields
    now = datetime.datetime.utcnow()
    start_time = now.isoformat() + "Z"
    end_time = (now + datetime.timedelta(hours=1)).isoformat() + "Z"

    payload = {
        "title": "Scheduled System Maintenance",
        "content": "There will be a scheduled system maintenance tomorrow from 2 AM to 3 AM.",
        "noticeType": "SYSTEM_MAINTENANCE",
        "importance": "HIGH",
        "writerId": "admin_user_01",
        "recipients": "dept_it,dept_ops",
        "startTime": start_time,
        "endTime": end_time,
        "isRegularSend": False
    }

    notice_id = None

    try:
        response = requests.post(register_url, json=payload, headers=HEADERS, timeout=TIMEOUT)
        response.raise_for_status()
        # The response JSON is expected to be the new notice ID (integer)
        notice_id = response.json()
        assert isinstance(notice_id, int), f"Expected integer notice ID, got {type(notice_id)}"

        # Verify that the newly created notice status is PENDING by fetching it (assume GET /api/notices returns all)
        get_notices_url = f"{BASE_URL}/api/notices"
        get_response = requests.get(get_notices_url, headers=HEADERS, timeout=TIMEOUT)
        get_response.raise_for_status()
        notices = get_response.json()
        # Find the created notice by id
        created_notice = next((n for n in notices if n.get("id") == notice_id), None)
        assert created_notice is not None, f"Created notice with ID {notice_id} not found in notice list"
        assert created_notice.get("status") == "PENDING", f"Expected status 'PENDING', got {created_notice.get('status')}"

    finally:
        # Cleanup: delete the created notice if possible (no delete endpoint specified in PRD, so skip)
        pass

test_register_new_notice_with_valid_data()