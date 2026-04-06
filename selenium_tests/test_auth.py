import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_login_page_branding(browser, base_url):
    browser.get(f"{base_url}/login")
    
    # Wait for the title to be present
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "arsenal-title-clean"))
    )
    
    title = browser.find_element(By.CLASS_NAME, "arsenal-title-clean")
    tagline = browser.find_element(By.CLASS_NAME, "tagline")
    
    assert title.text.upper() == "ARSENAL"
    assert tagline.text == "Your Ultimate Gaming Destination"

def test_login_form_elements(browser, base_url):
    browser.get(f"{base_url}/login")
    
    email_input = browser.find_element(By.NAME, "email")
    password_input = browser.find_element(By.NAME, "password")
    submit_btn = browser.find_element(By.CSS_SELECTOR, "button.btn")
    
    assert email_input.is_displayed()
    assert password_input.is_displayed()
    assert submit_btn.is_displayed()
    assert submit_btn.text == "Login"

def test_login_validation_error_flow(browser, base_url):
    browser.get(f"{base_url}/login")
    
    email_input = browser.find_element(By.NAME, "email")
    password_input = browser.find_element(By.NAME, "password")
    submit_btn = browser.find_element(By.CSS_SELECTOR, "button.btn")
    
    # Fill with invalid data (too short password)
    email_input.clear()
    email_input.send_keys("test@example.com")
    password_input.clear()
    password_input.send_keys("123")
    
    submit_btn.click()
    
    # Check if the input box for password has the 'error' class applied
    password_box = browser.find_element(By.XPATH, "//input[@name='password']/parent::div")
    assert "error" in password_box.get_attribute("class")

def test_registration_navigation_and_elements(browser, base_url):
    browser.get(f"{base_url}/login")
    
    register_link = browser.find_element(By.LINK_TEXT, "Register")
    register_link.click()
    
    # Wait for URL change to /register
    WebDriverWait(browser, 5).until(EC.url_contains("/register"))
    
    # Verify elements on registration page
    username_input = browser.find_element(By.NAME, "username")
    email_input = browser.find_element(By.NAME, "email")
    password_input = browser.find_element(By.NAME, "password")
    confirm_password_input = browser.find_element(By.NAME, "confirmPassword")
    
    assert username_input.is_displayed()
    assert email_input.is_displayed()
    assert password_input.is_displayed()
    assert confirm_password_input.is_displayed()
    
    # Test navigation back to login
    login_link = browser.find_element(By.LINK_TEXT, "Login")
    login_link.click()
    WebDriverWait(browser, 5).until(EC.url_contains("/login"))
