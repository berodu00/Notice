import requests

BASE_URL = "http://localhost:8080"
GET_NOTICES_ENDPOINT = "/api/notices"
TIMEOUT = 30

def test_get_all_notices_list():
    url = BASE_URL + GET_NOTICES_ENDPOINT
    try:
        response = requests.get(url, timeout=TIMEOUT)
        response.raise_for_status()
    except requests.RequestException as e:
        assert False, f"HTTP request failed: {e}"

    try:
        notices = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(notices, list), f"Expected response to be a list but got {type(notices)}"

    for notice in notices:
        assert isinstance(notice, dict), f"Each notice should be a dict but got {type(notice)}"
        assert 'id' in notice, "Notice item missing 'id' field"
        assert isinstance(notice['id'], int), f"Notice 'id' should be int but got {type(notice['id'])}"
        assert 'title' in notice, "Notice item missing 'title' field"
        assert isinstance(notice['title'], str), f"Notice 'title' should be str but got {type(notice['title'])}"
        assert 'status' in notice, "Notice item missing 'status' field"
        assert isinstance(notice['status'], str), f"Notice 'status' should be str but got {type(notice['status'])}"

test_get_all_notices_list()