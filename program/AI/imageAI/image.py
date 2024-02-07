# -*- coding: utf-8 -*-
"""
Created on Sat Nov 18 14:01:13 2023

@author: s9348
"""



# ----------------------------------------
#
#
# Pillow：這是 Python 中最常用的圖片處理庫，可以用來進行基本的圖片操作，如調整大小、裁剪、旋轉等。
#
#
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
import random


# 顯示影像功能 --------------------------------
def cvPrint(image,waitTime = 0):
    cv2.imshow('Image', image)
    cv2.waitKey( waitTime )
    cv2.destroyAllWindows()


# 繪製圓角矩形功能 --------------------------------
def recR( image, xy, size, r, thickness, color):
    x, y = xy[0], xy[1]
    w, h = size[0], size[1]
    # Draw the four corners of the rounded rectangle using arcs
    cv2.ellipse(image, ( x + r   , y + r    ), (r, r), 180, 0, 90, color, thickness)
    cv2.ellipse(image, ( x + w -r, y + r    ), (r, r), 270, 0, 90, color, thickness)
    cv2.ellipse(image, ( x + r   , y + h -r ), (r, r), 90, 0, 90, color, thickness)
    cv2.ellipse(image, ( x + w -r, y + h -r ), (r, r), 0, 0, 90, color, thickness)
    
    cv2.line(image, (x + r, y     ), (x + w - r, y         ), color, thickness)
    cv2.line(image, (x    , y + r ), (x        , y + h - r ), color, thickness)
    cv2.line(image, (x + r, y + h ), (x + w - r, y + h     ), color, thickness)
    cv2.line(image, (x + w, y + r ), (x + w    , y + h - r ), color, thickness)


# 合併圖片功能 --------------------------------
def mergeImg(bgImg, mergeImg, xy):
    # 獲取前景圖片的尺寸
    fh, fw = mergeImg.shape[:2]

    if mergeImg.shape[2] == 4:  # 带有Alpha通道
        print("Image with alpha channel")

        # 分離前景圖片的Alpha通道和RGB通道
        alpha_channel = mergeImg[:, :, 3]
        rgb_channels = mergeImg[:, :, :3]

        # 創建Alpha因子
        alpha_factor = alpha_channel[:, :, np.newaxis].astype(np.float32) / 255.0
        alpha_factor = np.concatenate((alpha_factor, alpha_factor, alpha_factor), axis=2)

        # 前景和背景合成
        mergeImg = alpha_factor * rgb_channels + (1 - alpha_factor) * bgImg[xy[1]:xy[1] + fh, xy[0]:xy[0] + fw, :3]
    else:  # 不带Alpha通道
        print("Image without alpha channel")
        mergeImg = mergeImg[:, :, :3]

    # 將合成的部分放回背景圖片
    bgImg[xy[1]:xy[1] + fh, xy[0]:xy[0] + fw, :3] = mergeImg

    return bgImg


# ----------------------------------------
#
#  OpenCV 影像處理 Tools
#
# ----------------------------------------


# 讀取圖片
image = cv2.imread('image/001.jpg')
image = cv2.imread('image/012.jpg')

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

# 高斯模糊 --------------------------------
image = cv2.GaussianBlur(image, (13,13), 20) #ksize只能是(奇數,奇數)

# 抓邊緣 --------------------------------
image = cv2.Canny(image,100,150)

# 膨脹 (線條變粗) --------------------------------
kernel = np.ones((3,3), np.uint8)                 # 創一個內容都是1的陣列
image = cv2.dilate(image, kernel, iterations=1)  # kernel 陣列

# 侵蝕 (線條變細) --------------------------------
kernel = np.ones((3,3), np.uint8)                 # 創一個內容都是1的陣列
image = cv2.erode(image, kernel, iterations=1)  # kernel 陣列


# 旋轉圖片 --------------------------------
# cv2.ROTATE_90_COUNTERCLOCKWISE - 90度逆時針旋轉  cv2.ROTATE_180 - 180度旋轉
image = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)



# 旋轉圖片 -任意角度 --------------------------------
(h, w) = image.shape[:2]
center = (w / 2, h / 2)                      # 獲取圖像中心
M = cv2.getRotationMatrix2D(center, 45, 1.0) # 計算旋轉矩陣（以中心為旋轉點，旋轉 45 度，縮放因子 1）
image = cv2.warpAffine(image, M, (w, h))     # 進行仿射變換（旋轉）


# 裁切 --------------------------------
image = image[100:300,100:300]

# 局部上色 -------------------------------
for row in range(50,100):
    for col in range (50,100):
        image[row][col]=[255,100,100]

for row in range(image.shape[0]):
    for col in range (image.shape[1]):
        if image[row][col][0]<100:
            image[row][col][0]=[200,50,80]
            
for row in range(image.shape[0]):
    for col in range (image.shape[1]):
        if image[row][col][0]<100:
            image[row][col][0]=image[row][col][0]-100



cvPrint(image)
cvPrint(image,2000)
 




#保存圖片 --------------------------------
cv2.imwrite('new_image.jpg', image)














# ----------------------------------------
#
#  OpenCV 影像辨識:人臉
#
# ----------------------------------------


# 讀取圖片
img = cv2.imread('image/021.jpg')
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


# 準備導入 face 圖片
imgFace = [0,0,0,0,0,0]
for i in range(6):
    imgFace[i] = cv2.imread('image/face0' + str(i) + '.png', cv2.IMREAD_UNCHANGED)


# 繪製抓取位置
for (x, y, w, h) in faces:
    
    # 抓取每個人臉屬性，繪製方框 --------------------------------------------
    #cv2.rectangle(img, (x, y), ( x + w,  y + h), (160, 86, 22), 3)    
    
    # 繪製馬賽克區域 --------------------------------------------
    mosaic = img[ y : y + h, x : x + w]     # 馬賽克區域
    level = 15                              # 馬賽克程度
    mh = int(h / level)                     # 根據馬賽克程度縮小的高度
    mw = int(w / level)                     # 根據馬賽克程度縮小的寬度
    mosaic = cv2.resize(mosaic, (mw,mh), interpolation=cv2.INTER_LINEAR) # 先縮小
    mosaic = cv2.resize(mosaic, (w,h), interpolation=cv2.INTER_NEAREST)  # 然後放大
    img[y: y + h, x: x + w ] = mosaic   # 將指定區域換成馬賽克區域

    # 繪製圓角矩形 --------------------------------------------
    #recR(img,[x,y], [w,h], 15, 4,  (160, 86, 22))
    
    # 貼圖其他圖片 --------------------------------------------
    num = random.randint(0, len(imgFace)-1)
    imgInput = cv2.resize(imgFace[num],(w,h))
    mergeImg(img, imgInput,[x,y])

                


cvPrint(img,1000)

cvPrint(img)










# ----------------------------------------
#
#  OpenCV 讀入影片
#
# ----------------------------------------



cap = cv2.VideoCapture(2)
if not cap.isOpened():
    print("Cannot open camera")
    exit()
while True:
    ret, frame = cap.read()             # 讀取影片的每一幀
    if not ret:
        print("Cannot receive frame")   # 如果讀取錯誤，印出訊息
        break
    
    frame = cv2.resize(frame,(540,320)) # 縮小尺寸，避免尺寸過大導致效能不好
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)   # 將鏡頭影像轉換成灰階
    faces = face_cascade.detectMultiScale(gray)      # 偵測人臉
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)   # 標記人臉
    cv2.imshow('Image', frame)          # 如果讀取成功，顯示該幀的畫面
    if cv2.waitKey(10) == ord('q'):      # 每一毫秒更新一次，直到按下 q 結束
        break
cap.release()                           # 所有作業都完成後，釋放資源
cv2.destroyAllWindows()                 # 結束所有視窗




