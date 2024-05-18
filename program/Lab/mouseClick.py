# -*- coding: utf-8 -*-
"""
Created on Sat May  4 17:08:06 2024

@author: s9348
"""

from pynput.mouse import Listener
import pyautogui
import time


def on_click(x, y, button, pressed):
    global stopTag
    if button == button.right and pressed:
        stopTag = True
        print("Stop")
        return False  # 返回 False 停止监听鼠标事件




stopTag = False
clickTime = 20
clickTime = int(input("clickTime : "))
print("start!!")


with Listener(on_click=on_click) as listener:
    for i in range(300):
        for j in range(5):
            time.sleep(clickTime/5)
            if(stopTag):
                break
        if(stopTag):
            break
        print(i)
        pyautogui.click()


    listener.join()

input("over")
