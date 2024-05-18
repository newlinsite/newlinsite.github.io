# -*- coding: utf-8 -*-
"""
Created on Sat May  4 14:16:54 2024

@author: s9348
"""

import pyautogui
import time





# ----------------------------
# 
# Mouse
# 
# ----------------------------

pyautogui.size()
pyautogui.position()


# 基本移動
pyautogui.moveTo(100, 200)   # moves mouse to X of 100, Y of 200.
pyautogui.moveTo(None, 500)  # moves mouse to X of 100, Y of 500.
pyautogui.moveTo(100, 200, 2)   # moves mouse to X of 100, Y of 200 over 2 seconds

# 移動過場
pyautogui.moveTo(100, 100, 2, pyautogui.easeInQuad)     # start slow, end fast
pyautogui.moveTo(100, 100, 2, pyautogui.easeOutQuad)    # start fast, end slow
pyautogui.moveTo(100, 100, 2, pyautogui.easeInOutQuad)  # start and end fast, slow in middle
pyautogui.moveTo(100, 100, 2, pyautogui.easeInBounce)   # bounce at the end
pyautogui.moveTo(100, 100, 2, pyautogui.easeInElastic)  # rubber band at the end

# 拖曳
pyautogui.dragTo(100, 200, button='left')     # drag mouse to X of 100, Y of 200 while holding down left mouse button
pyautogui.dragTo(300, 400, 2, button='left')  # drag mouse to X of 300, Y of 400 over 2 seconds while holding down left mouse button
pyautogui.drag(30, 0, 2, button='right')   # drag the mouse left 30 pixels over 2 seconds while holding down the right mouse button




# 點擊
pyautogui.click()  # click the mouse
pyautogui.click(x=100, y=200)  # move to 100, 200, then click the left mouse button.
pyautogui.click(button='right')  # right-click the mouse , 'left', 'middle', or 'right'

pyautogui.doubleClick()  # perform a left-button double click
pyautogui.click(clicks=2)  # double-click the left mouse button
pyautogui.click(clicks=2, interval=0.25)  # double-click the left mouse button, but with a quarter second pause in between clicks
pyautogui.click(button='right', clicks=3, interval=0.25)  ## triple-click the right mouse button with a quarter second pause in between clicks

# Mouse up down
pyautogui.mouseDown(); 
pyautogui.mouseUp()
pyautogui.mouseDown(button='right')  # press the right button down
pyautogui.mouseUp(button='right', x=100, y=200)  # move the mouse to 100, 200, then release the right button up.



# 滾動
pyautogui.scroll(100)   # scroll up 10 "clicks"
pyautogui.scroll(-100)  # scroll down 10 "clicks"
pyautogui.scroll(100, x=100, y=100)  # move mouse cursor to 100, 200, then scroll up 10 "clicks"





#! python3  constantly print out the position of the mouse cursor
import pyautogui, sys
print('Press Ctrl-C to quit.')
try:
    while True:
        x, y = pyautogui.position()
        positionStr = 'X: ' + str(x).rjust(4) + ' Y: ' + str(y).rjust(4)
        print(positionStr, end='')
        print('\b' * len(positionStr), end='', flush=True)
except KeyboardInterrupt:
    print('\n')






# ----------------------------
# 
# Keyboard
# 
# ----------------------------

pyautogui.press('enter') #按下enter鍵

pyautogui.keyDown('ctrl')
pyautogui.press('a')
pyautogui.keyUp('ctrl') #全選的功能鍵效果

# 打字
pyautogui.write('Hello world!', interval=0.5)
# 組合快捷鍵
pyautogui.hotkey('ctrl', 'shift', 'esc')
# 持續按著某按鍵，再按其他按鍵
with pyautogui.hold('shift'):
        pyautogui.press(['left', 'left', 'left'])







# ----------------------------
# 
# screenshot
# 
# ----------------------------


pyautogui.screenshot('1.png')
image = pyautogui.screenshot(region=(0,0, 300, 400))

pyautogui.locateOnScreen('calc7key.png')
















