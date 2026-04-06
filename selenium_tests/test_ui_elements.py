import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_unauthenticated_redirect_to_login(browser, base_url):
    # Try to access protected home page
    browser.get(base_url)
    
    # Wait for the redirect to happen to /login
    WebDriverWait(browser, 10).until(EC.url_contains("/login"))
    assert "/login" in browser.current_url

def test_login_page_branding_elements(browser, base_url):
    browser.get(f"{base_url}/login")
    
    # Branding is within .wrapper block on the login page
    wrapper = browser.find_element(By.CLASS_NAME, "wrapper")
    branding = wrapper.find_element(By.CLASS_NAME, "arsenal-title-clean")
    tagline = wrapper.find_element(By.CLASS_NAME, "tagline")
    
    assert branding.text.upper() == "ARSENAL"
    assert tagline.text == "Your Ultimate Gaming Destination"

def test_login_page_showcase_content(browser, base_url):
    browser.get(f"{base_url}/login")
    
    # Check for the showcase section content
    showcase = browser.find_element(By.CLASS_NAME, "welcome-showcase")
    # Using 'in' because text might include child elements
    assert "Welcome Back" in showcase.text
    assert "Cyberpunk 2077" in showcase.text

def test_search_bar_absence_on_auth_pages(browser, base_url):
    browser.get(f"{base_url}/login")
    
    # Search bar is NOT present on the login page by design
    # Check that search-input doesn't exist
    from selenium.common.exceptions import NoSuchElementException
    with pytest.raises(NoSuchElementException):
        browser.find_element(By.CLASS_NAME, "search-input")
