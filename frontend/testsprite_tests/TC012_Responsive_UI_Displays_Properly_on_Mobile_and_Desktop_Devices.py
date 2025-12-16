import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Change desktop browser resolution to test responsiveness and verify layout and UI elements on Dashboard page.
        await page.goto('http://localhost:5173/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Change desktop browser resolution to 1366x768 and verify Notice Dashboard page layout and UI elements.
        await page.goto('http://localhost:5173/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Change desktop browser resolution to 1366x768 and verify Notice Dashboard page layout and UI elements.
        await page.goto('http://localhost:5173/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=IT Notice System').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=New Notice').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Notice Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Total: 25').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PENDING').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=12/16/2025').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Quarterly Security Update').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=admin').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=HIGH').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice 1').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=NORMAL').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=New Feature Release').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice for Rejection').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice Minimal').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Scheduled Dispatch Test Notice').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Notice 2 - Approved').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Security Alert: Unauthorized Access Detected').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice for Approval').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=System Maintenance Scheduled').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=System Maintenance Notification').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice Title').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Notice for Calendar API Failure').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Test Completion Notice').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Scheduled Maintenance Notice').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Notice 1 - Pending Approval').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=공지1').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=APPROVED').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=REJECTED').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    