# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class EditAllFields(unittest.TestCase):
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
    
    def test_edit_all_fields(self):
        driver = self.driver
        driver.get("http://localhost:4200/todolist")
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20967]").send_keys("Dentista")
        driver.find_element_by_xpath("//mat-form-field[2]/div/div/div[3]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20970]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20970]").send_keys(u"Venerdì ore 18")
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20964]//*[@x-test-hook-20973]").send_keys("04/05/2021")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//button[2]/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20988]//*[@x-test-tpl-20914]//*[@x-test-tpl-20924]//*[@x-test-hook-20933]").click()
        driver.find_element_by_xpath("//mat-dialog-container[@id='mat-dialog-0']/app-todo-dialog/div/mat-form-field/div/div").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20949]//*[@x-test-hook-20952]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20949]//*[@x-test-hook-20952]").send_keys("Palestra")
        driver.find_element_by_xpath("//mat-dialog-container[@id='mat-dialog-0']/app-todo-dialog/mat-form-field/div/div").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20953]//*[@x-test-hook-20955]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20953]//*[@x-test-hook-20955]").send_keys(u"Martedì ore 18")
        driver.find_element_by_xpath("//mat-dialog-container[@id='mat-dialog-0']/app-todo-dialog/div[2]/mat-form-field/div/div/div[3]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20956]//*[@x-test-hook-20959]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20956]//*[@x-test-hook-20959]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20978]//*[@x-test-hook-20987]//*[@x-test-tpl-20956]//*[@x-test-hook-20959]").send_keys("6/5/2021")
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
