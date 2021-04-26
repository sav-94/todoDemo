# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class DeleteFromB(unittest.TestCase):
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
    
    def test_delete_from_b(self):
        driver = self.driver
        driver.get("http://localhost:4200/todo-login")
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21026]//*[@x-test-hook-21031]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21026]//*[@x-test-hook-21031]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21026]//*[@x-test-hook-21031]").send_keys("accountdiaccesso@gmail.com")
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21026]//*[@x-test-hook-21035]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21026]//*[@x-test-hook-21035]").send_keys("Accesso.1234")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20969]//*[@x-test-hook-20975]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20969]//*[@x-test-hook-20975]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20969]//*[@x-test-hook-20975]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21043]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21043]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21043]").send_keys("Dentista")
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21053]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21053]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-21040]//*[@x-test-hook-21053]").send_keys("04/05/2021")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20969]//*[@x-test-hook-20976]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20978]//*[@x-test-tpl-20985]//*[@x-test-hook-20993]").click()
        driver.find_element_by_xpath("//mat-dialog-container[@id='mat-dialog-0']/app-todo-dialog/div[3]/button[2]/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-21058]//*[@x-test-hook-21068]//*[@x-test-tpl-20967]//*[@x-test-tpl-20969]//*[@x-test-hook-20977]").click()
    
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
