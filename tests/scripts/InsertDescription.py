# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class InsertDescription(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument('headless')
        chrome_options.add_argument('disable-gpu')
        self.driver = webdriver.Chrome(
            executable_path='..\\chromedriver.exe',
            chrome_options=chrome_options)
        self.driver.implicitly_wait(30)
        self.driver.set_window_position(0, 0)
        self.driver.set_window_size(1920, 1080)
        self.base_url = "https://www.google.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_insert_description(self):
        driver = self.driver
        driver.get("http://localhost:4200/todolist")
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20970]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20970]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20970]").send_keys(u"Venerdì ore 18")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//button[2]/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20924]//*[@x-test-hook-20935]").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
