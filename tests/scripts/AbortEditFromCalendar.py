# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class AbortEditFromCalendar(unittest.TestCase):
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
    
    def test_abort_edit_from_calendar(self):
        driver = self.driver
        driver.get("http://localhost:4200/todolist")
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").send_keys("Dentista")
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").send_keys("4/5/2021")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//button[2]/span").click()
        driver.find_element_by_xpath("//mat-tab-body[@id='mat-tab-content-0-0']/div/div/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[2]/td[2]/div").click()
        driver.find_element_by_xpath("//mat-dialog-container[@id='mat-dialog-0']/app-todo-dialog/div[3]/button/span").click()
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
