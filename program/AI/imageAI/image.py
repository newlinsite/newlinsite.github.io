# -*- coding: utf-8 -*-
"""
Created on Sat Nov 18 14:01:13 2023

@author: s9348
"""



# ----------------------------------------

# Pillow：這是 Python 中最常用的圖片處理庫，可以用來進行基本的圖片操作，如調整大小、裁剪、旋轉等。

# ----------------------------------------


from PIL import Image, ImageEnhance

# 讀取圖片
image = Image.open('001.jpg')

# 調整對比度
enhancer = ImageEnhance.Contrast(image)
image = enhancer.enhance(2.1)  # factor > 1 增加對比度，factor < 1 降低對比度

# 保存圖片
image.show()
image.save('new_image.jpg')







# ----------------------------------------
#
#
# OpenCV：這是一個功能強大的電腦視覺庫，其中包含了大量的圖像處理功能。
#
#
# ----------------------------------------




import cv2
import numpy as np


# 顯示影像功能 --------------------------------
def cvPrint(image):
    cv2.imshow('Image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()






# ----------------------------------------

#  OpenCV 影像處理

# ----------------------------------------


# 讀取圖片
image = cv2.imread('image/001.jpg')

# 調整色溫（例如增加藍色通道）
blue_channel = image[:,:,0]
image[:,:,0] = cv2.add(blue_channel, -100)  # 增加藍色通道的值


# 調整亮度（加法）--------------------------------
brightness_offset = 50
# 創建一個與原圖像相同大小和類型的數組，並將所有值設置為 brightness_offset
brightness_array = np.full(image.shape, brightness_offset, dtype=np.float64)
# 調整亮度
image = cv2.add(image.astype(np.float64), brightness_array)
# 將結果轉換回合適的數據類型以顯示和保存
image = np.clip(image, 0, 255).astype(np.uint8)




# 轉為灰度圖 --------------------------------
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)




# 旋轉圖片 --------------------------------
# cv2.ROTATE_90_CLOCKWISE - 90度順時針旋轉
# cv2.ROTATE_180 - 180度旋轉
# cv2.ROTATE_90_COUNTERCLOCKWISE - 90度逆時針旋轉
image = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)



# 旋轉圖片 -任意角度 --------------------------------
# 獲取圖像中心
(h, w) = image.shape[:2]
center = (w / 2, h / 2)
# 計算旋轉矩陣（以中心為旋轉點，旋轉 45 度，縮放因子 1）
M = cv2.getRotationMatrix2D(center, 45, 1.0)
# 進行仿射變換（旋轉）
image = cv2.warpAffine(image, M, (w, h))








cvPrint()



#保存圖片 --------------------------------
cv2.imwrite('new_image.jpg', image)






# ----------------------------------------

#  OpenCV 影像辨識

# ----------------------------------------



# 讀取圖片
img = cv2.imread('image/017.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)   # 將圖片轉成灰階

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")   # 載入人臉模型
faces = face_cascade.detectMultiScale(gray, 1.2, 3)    # 偵測人臉
# faces = face_cascade.detectMultiScale(img, scaleFactor, minNeighbors, flags, minSize, maxSize)
# 偵測並取出相關屬性
# img 來源影像，建議使用灰階影像
# scaleFactor 前後兩次掃瞄偵測畫面的比例係數，預設 1.1
# minNeighbors 構成檢測目標的相鄰矩形的最小個數，預設 3
# flags 通常不用設定，若設定 CV_HAAR_DO_CANNY_PRUNING 會使用 Canny 邊緣偵測，排除邊緣過多或過少的區域
# minSize, maxSize 限制目標區域的範圍，通常不用設定



for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)    # 抓取每個人臉屬性，繪製方框
    
    # 繪製馬賽克區域
    mosaic = img[y:y+h, x:x+w]   # 馬賽克區域
    level = 15                   # 馬賽克程度
    mh = int(h/level)            # 根據馬賽克程度縮小的高度
    mw = int(w/level)            # 根據馬賽克程度縮小的寬度
    mosaic = cv2.resize(mosaic, (mw,mh), interpolation=cv2.INTER_LINEAR) # 先縮小
    mosaic = cv2.resize(mosaic, (w,h), interpolation=cv2.INTER_NEAREST)  # 然後放大
    img[y:y+h, x:x+w+100] = mosaic   # 將指定區域換成馬賽克區域



cv2.imshow('Image', img)
cv2.waitKey(0) # 按下任意鍵停止
cv2.destroyAllWindows()

cvPrint(img)
