# -*- coding: utf-8 -*-
"""
Created on Sun Jul 21 15:22:22 2024

@author: s9348
"""

from pynput.mouse import Listener
import pyautogui
import time



clickTime = int(input("clickTime : "))
print("start!!")
for i in range(300):
    time.sleep(clickTime)
    pyautogui.press('left') # 按下左方向键




input("over")
