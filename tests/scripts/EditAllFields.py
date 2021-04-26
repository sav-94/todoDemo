# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class EditAllFields(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.google.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_edit_all_fields(self):
        driver = self.driver
        driver.get("http://localhost:4200/todolist")
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20952]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20952]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20952]").send_keys("Dentista")
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20955]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20955]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20949]//*[@x-test-hook-20955]").send_keys(u"Venerdì ore 18")
        driver.find_element_by_xpath("//form/div/button/span").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20909]//*[@x-test-hook-20916]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20930]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20924]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20924]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20924]").send_keys("Palestra")
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20927]").click()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20927]").clear()
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20927]").send_keys("Sabato mattina")
        driver.find_element_by_xpath("//*[@x-test-tpl-20958]//*[@x-test-hook-20968]//*[@x-test-tpl-20908]//*[@x-test-tpl-20918]//*[@x-test-hook-20933]").click()
    
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
