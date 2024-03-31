


#%% import
# Pillow   9.4.0

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageColor
from moviepy.editor import ImageSequenceClip
from moviepy.editor import VideoFileClip, concatenate_videoclips, AudioFileClip
import pygame #試聽聲音用
import pandas as pd


def playSound(url, vol = 0.5):
    pygame.mixer.init()
    pygame.mixer.music.load(url)
    pygame.mixer.music.set_volume(vol)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy(): # 让程序保持运行，直到音频播放完毕
        pygame.time.Clock().tick(10)
    pygame.quit()
    

    
# Function
    
def easeIn(t):
    return t * t

def easeOut(t):
    return 1 - (1 - t) ** 2

def drawRoundedRectangle(draw, xy, radius, **kwargs):
    # 绘制圆角矩形
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], **kwargs)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], **kwargs)
    draw.pieslice([x1, y1, x1 + radius * 2, y1 + radius * 2], 180, 270, **kwargs)
    draw.pieslice([x2 - radius * 2, y1, x2, y1 + radius * 2], 270, 360, **kwargs)
    draw.pieslice([x1, y2 - radius * 2, x1 + radius * 2, y2], 90, 180, **kwargs)
    draw.pieslice([x2 - radius * 2, y2 - radius * 2, x2, y2], 0, 90, **kwargs)

def newText(videoSize, textParam, easeType, inSec, stopSec, outSec, fps = 30):
    
    textBox = []
    duration = inSec + stopSec + outSec
    frames = int(duration * fps)

    
    # 文字參數
    alphaStart, alphaEnd = textParam['alpha']
    alphaStart = alphaStart*2.55
    alphaEnd   = alphaEnd  *2.55
    xStart, xEnd = textParam['x']
    yStart, yEnd = textParam['y']
    tSizeStart, tSizeEnd = textParam['size']
    space = textParam['space']
    if(textParam['bg']):
        xPadding, yPadding = textParam['padding']
        radius = textParam['radius']
        bgColor = textParam['bgColor']
        
    textLines = textParam['text'].split('\n')  # 按行拆分文字
    print(textLines)
  
    for frame in range(frames):
        
        # 創建透明底板
        frameImage = Image.new('RGBA', videoSize,(255, 255, 255, 0))
        draw = ImageDraw.Draw(frameImage)
        lineSpacing = textParam['lineSpace']
        lineCount = 0
        
        for text in textLines:  #根據行數位移高度 ( lineCurrent )
            ### 淡入階段 --------------------------------------------------------------------
            if frame < inSec * fps:
                progress = frame / (inSec * fps)
    
                # 透明度、顏色 計算
                alphaCurrent = alphaStart + (alphaEnd - alphaStart) * easeType(progress)
                color = ImageColor.getrgb(textParam['color']) + (int(alphaCurrent),)  
                
                # 建立 "font" > 算文字尺寸 > 如有置中 > 取出中心校正值
                font = ImageFont.truetype(textParam['font'], int(tSizeStart + (tSizeEnd - tSizeStart) * progress))
                
                textWidth, textHeight = draw.textsize(text, font = font)
                textCenterWidth , textCenterHeight = (0,0)
                if(textParam['alignCenter']):
                    textCenterWidth = textWidth / 2
                    textCenterHeight = textHeight / 2
                
                # 位置 計算
                lineCurrent = (lineSpacing + textHeight) * lineCount
                xCurrent = xStart + (xEnd - xStart) * easeType(progress) - textCenterWidth
                yCurrent = yStart + (yEnd - yStart) * easeType(progress) - textCenterHeight + lineCurrent
                
                # 繪製圓角矩形
                if(textParam['bg']):
                    bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alphaCurrent),)  
                    drawRoundedRectangle(draw, 
                     (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                     radius, fill = bgColorCurrent)
                
                # 建立文字
                if space == 0:
                    draw.text((xCurrent, yCurrent), text, fill = color, font = font)
                else:
                    for char in text:
                        draw.text((xCurrent, yCurrent), char, fill=color, font=font)
                        xCurrent += space    # 更新 x 坐标以绘制下一个字符             
            
            ### 停留階段 --------------------------------------------------------------------           
            elif frame < (inSec + stopSec) * fps:  # 停留阶段
                
                # 透明度 計算
                alpha = alphaEnd
                color = ImageColor.getrgb(textParam['color']) + (int(alpha),)
                
                # 建立 "font" > 算文字尺寸 > 如有置中 > 取出中心校正值
                font = ImageFont.truetype(textParam['font'], tSizeEnd )
                textWidth, textHeight = draw.textsize(text, font = font)
                textCenterWidth , textCenterHeight = (0,0)
                if(textParam['alignCenter']):
                    textCenterWidth = textWidth / 2
                    textCenterHeight = textHeight / 2
                
                # 位置 計算
                lineCurrent = (lineSpacing + textHeight )* lineCount
                xCurrent = xEnd  -  textCenterWidth
                yCurrent = yEnd  - textCenterHeight + lineCurrent  
                

                # 繪製圓角矩形
                if(textParam['bg']):
                    bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alpha),)  
                    drawRoundedRectangle(draw, 
                     (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                     radius, fill = bgColorCurrent)
                    
                # 建立文字
                if space == 0:
                    draw.text((xCurrent, yCurrent), text, fill = color, font = font)
                else:
                    for char in text:
                        draw.text((xCurrent, yCurrent), char, fill = color, font = font)
                        xCurrent += space    # 更新 x 坐标以绘制下一个字符
        
            ### 淡出階段 --------------------------------------------------------------------
            elif frame < (inSec + stopSec + outSec) * fps:  # 淡出阶段
                progress = (frame - (inSec + stopSec) * fps) / (outSec * fps)
            
                # 透明度、顏色
                alphaCurrent = alphaEnd + (alphaStart - alphaEnd) * easeType(progress)
                color = ImageColor.getrgb(textParam['color']) + (int(alphaCurrent),)             
    
                # 建立 "font" > 算文字尺寸 > 如有置中 > 取出中心校正值
                font = ImageFont.truetype(textParam['font'], int(tSizeEnd - (tSizeEnd - tSizeStart) * progress))
                textWidth, textHeight = draw.textsize(text, font = font)
                textCenterWidth , textCenterHeight = (0,0) 
                if(textParam['alignCenter']):
                    textCenterWidth = textWidth / 2
                    textCenterHeight = textHeight / 2 
                
                # 位置 計算
                lineCurrent = (lineSpacing + textHeight) * lineCount
                xCurrent = xEnd + (xStart - xEnd) * easeType(progress) -  textCenterWidth
                yCurrent = yEnd + (yStart - yEnd) * easeType(progress) - textCenterHeight + lineCurrent
                
                # 繪製圓角矩形
                if(textParam['bg']):
                    bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alphaCurrent),)  
                    drawRoundedRectangle(draw, 
                     (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                     radius, fill = bgColorCurrent)
                
                # 建立文字
                if space == 0:
                    draw.text((xCurrent, yCurrent), text, fill = color, font = font)
                else:
                    for char in text:
                        draw.text((xCurrent, yCurrent), char, fill = color, font = font)
                        xCurrent += space    # 更新 x 坐标以绘制下一个字符 
            # 進行下一列，如果有多列文字的話
            lineCount = lineCount + 1
                        
        # 添加当前帧图像到列表中            
        textBox.append(frameImage) 
    return textBox

def newImage(videoSize, imageParam, easeType, inSec, stopSec, outSec):
    
    imageBox = []
    duration = inSec + stopSec + outSec
    frames = int(duration * fps)
    
    stopSecTag = 0  # 用於讓停留階段只算一次透明度和大小

    # 圖片參數
    alphaStart, alphaEnd = imageParam['alpha']
    xStart, xEnd = imageParam['x']
    yStart, yEnd = imageParam['y']
    sizeStart, sizeEnd = imageParam['size']
    image = Image.open(imageParam['image'])
    imageWidth, imageHeight = image.size
    
    if image.mode != 'RGBA': # 确保图像模式为RGBA，如果原图像没有透明度，就创建一个新的带透明度的图像
        image = image.convert('RGBA')
    imageData = image.getdata() # 获取图像的透明度数据

    for frame in range(frames):
        # 創建透明底板
        frameImage = Image.new('RGBA', videoSize, (255, 255, 255, 0))
        
        ### 淡入階段 --------------------------------------------------------------------
        if frame < inSec * fps:
            progress = frame / (inSec * fps)
            # 透明度 > 將每個像素的透明度乘以當前比率以降低透明度
            alphaCurrent = (alphaStart + (alphaEnd - alphaStart) * easeType(progress)) / 100
            imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
            # 建立一個具有修改後透明度的新圖片
            imageCurrent = Image.new('RGBA', image.size)
            imageCurrent.putdata(imageDataCurrent)
            
            
            # 大小 計算 ，如果進場大小不一樣在執行
            if(sizeEnd != sizeStart):
                sizeCurrent = ( sizeStart + (sizeEnd - sizeStart) * progress ) / 100
                # print(sizeCurrent,int(sizeCurrent * imageWidth),int(sizeCurrent * imageHeight))
                imageCurrent = imageCurrent.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
            
            # 位置 計算
            xCurrent = xStart + (xEnd - xStart) * easeType(progress) - imageCurrent.width / 2
            yCurrent = yStart + (yEnd - yStart) * easeType(progress) - imageCurrent.height / 2
            
            # 繪製圓形遮罩
            # mask = Image.new("L", imageCurrent.size, 255)
            # mask = Image.new("L", imageCurrent.size, 0) #"L"新創灰階圖像，0=全黑
            # drawMask = ImageDraw.Draw(mask) 
            # drawMask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill = 255) #畫橢圓形
            # frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)), mask)
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)))
            
        ### 停留階段 --------------------------------------------------------------------
        elif frame < (inSec + stopSec) * fps:  # 停留阶段
        
            if(stopSecTag == 0): # 用於讓停留階段只算一次透明度和大小
                # 透明度 
                alphaCurrent = alphaEnd / 100
                imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
                # 建立一個具有修改後透明度的新圖片
                imageCurrent = Image.new('RGBA', image.size)
                imageCurrent.putdata(imageDataCurrent)
                
                # 大小
                sizeCurrent = ( sizeEnd ) / 100
                imageCurrent = image.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
                
                # 位置
                xCurrent = xEnd - imageCurrent.width / 2
                yCurrent = yEnd - imageCurrent.height / 2                
                
                # 繪製圓形遮罩
                # mask = Image.new("L", imageCurrent.size, 255)
                # mask = Image.new("L", imageCurrent.size, 0)
                # draw_mask = ImageDraw.Draw(mask)
                # draw_mask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill=255)
                # frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)), mask)
                
                stopSecTag = 1
            
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)))
    
        ### 淡出階段 --------------------------------------------------------------------
        elif frame < (inSec + stopSec + outSec) * fps:  # 淡出阶段
            progress = (frame - (inSec + stopSec) * fps) / (outSec * fps)

            # 透明度 > 將每個像素的透明度乘以當前比率以降低透明度
            alphaCurrent = (alphaEnd + (alphaStart - alphaEnd) * easeType(progress)) / 100
            # print(alphaCurrent)
            imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
            # 建立一個具有修改後透明度的新圖片
            imageCurrent = Image.new('RGBA', image.size)
            imageCurrent.putdata(imageDataCurrent)
            
                        
            # 大小，如果進場大小不一樣在執行
            if(sizeEnd != sizeStart):
                sizeCurrent = (sizeEnd - (sizeEnd - sizeStart) * progress) / 100
                imageCurrent = image.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
            
            
            # 位置
            xCurrent = xEnd - (xEnd - xStart) * easeType(progress) - imageCurrent.width / 2
            yCurrent = yEnd - (yEnd - yStart) * easeType(progress) - imageCurrent.height / 2
            
            # 繪製圓形遮罩 > 畫圖
            # mask = Image.new("L", imageCurrent.size, 255)
            # mask = Image.new("L", imageCurrent.size, 0)
            # draw_mask = ImageDraw.Draw(mask)
            # draw_mask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill=255)
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)))
            
                    
        imageBox.append(frameImage) # 添加当前帧图像到列表中
    return imageBox

# 創立影片基底
def newVideo(backgroundUrl, videoLen):
    videoFrames=[]
    for i in range(videoLen):
        background = Image.open( backgroundUrl )
        videoFrames.append(background)
    return videoFrames

# 在特定 frames 疊上新圖
def mergeFs(bgFs, startSec, fs , test = False):
    startFrame = int(fps*startSec)
    loopStart  = startFrame
    endFrame   = startFrame + len(fs)
    # 判斷是否為測試，如果為測試 只貼 test 內區間
    if(test != False):                              
        loopStart  = test[0]
        endFrame   = test[1]
    # 開始 Merge    
    for i in range(loopStart, endFrame):
        textFrame = fs[i-startFrame]                # 取出要貼的圖
        bgFs[i].paste(textFrame, (0, 0), textFrame) # 貼上去
    #return bgFs

# 把圖片逐 Frame 變成影片 ------------------------------------------------
def imageToVideo(images, videoFps = 30, isOutput = True , outputName = "output.mp4"):
    imagesNp = [np.array(img) for img in images] # 将PIL图像对象转换为NumPy数组
    clip = ImageSequenceClip(imagesNp, fps = videoFps)   # 从图像文件创建图像序列剪辑
    if(isOutput):
        clip.write_videofile( outputName, fps = videoFps)  # 保存视频文件
    return clip
    # ----------------------------------------------------------------
    # 如果 clip.write_videofile 讀取不到 fps 請再函示庫加入以下 Code 30可以改成指定 fps
    # if fps is None:
    #     fps = 30
    # --------------------------------

# 把累加的數列還原
def originalTime(data):
    newData = []
    for item in data:
        newValues = []
        for i in range(4):
            if i > 0 :
                newValue = item['t'][i] - item['t'][i-1]
            else:
                newValue = item['t'][i]
            newValues.append(newValue) 
        newData.append({'t': newValues})
    return newData


## ------------------------------
# font = ImageFont.truetype('font/NotoSansTC-Medium.ttf', 10)
# frame_image = Image.new('RGBA', (500,500),(255, 255, 255, 0))
# draw = ImageDraw.Draw(frame_image)
# draw.textsize("5555", font=font)


#%% =============================================================================
# 
# 
# 影片生成
# 
# 
# =============================================================================


# 主題
df = pd.read_excel("wordList.xlsx")
ThemeCol = 'type'
Theme = '職場'
filterCol = 'textFilter'
tFilter    = "職場O"
videoTem = 'ch-single'
audioTem = 'ch-jp-ch'


# 影片参数
oVideo = []
videoBg = "image/bg01.png"
# videoBg = "image/bg01_short.png"

fps = 30
vSizeW, vSizeH =  Image.open( videoBg ).size


# -- 測試控制區 --------------------------

singleImg = True
singleImg = False

i = 0
j = 0
loopTimes = False
# loopTimes = 1



# -----------------------------





# Template
voiceTemplates = {
    'ch-ch':{
        "startS":3,
        "voices"     :["ch-F","ch-M"],
        "voiceTimes" :[ 6.0  , 3.0  ]
        },
    'ch-ch-s':{
        "startS":1.8,
        "voices"     :["ch-F","ch-M"],
        "voiceTimes" :[ 4.0  , 3.0  ]
        },
    'ch-jp-ch':{
        "startS":1.5,
        "voices"     :["ch-F","jp-F","ch-M"],
        "voiceTimes" :[ 3.5  ,3.5   , 2.5  ]
        },
    'ch-jp-ch-s':{
        "startS":1.0,
        "voices"     :["ch-F","jp-F"],
        "voiceTimes" :[ 2.4  ,3.0   ]
        },
    }


fadeAccu = {  # 圖層累加時間時間軸
    'ch-single':[
             { 't':[0.6, 1.3, 8.4, 9.0 ], 'f': easeOut},
             { 't':[1.0, 1.6, 8.0, 8.50 ], 'f': easeOut},
             { 't':[1.0, 1.6, 8.0, 8.50 ], 'f': easeOut},
             { 't':[1.2, 1.8, 8.0, 8.50 ], 'f': easeOut},
             { 't':[1.2, 1.8, 8.0, 8.50 ], 'f': easeOut},
             { 't':[1.4, 2.8, 7.5, 8.00 ], 'f': easeOut},
             { 't':[1.4, 2.8, 7.5, 8.00 ], 'f': easeOut},
             { 't':[1.9, 2.4, 7.0, 7.50 ], 'f': easeOut}
             ],   
    'ch-single-s':[
             { 't':[0.5, 1.0, 5.4, 6.0 ], 'f': easeOut},
             { 't':[0.7, 1.1, 5.0, 5.5 ], 'f': easeOut},
             { 't':[0.7, 1.1, 5.0, 5.5 ], 'f': easeOut},
             { 't':[0.8, 1.2, 5.0, 5.5 ], 'f': easeOut},
             { 't':[0.8, 1.2, 5.0, 5.5 ], 'f': easeOut},
             { 't':[1.0, 1.8, 4.5, 5.0 ], 'f': easeOut},
             { 't':[1.0, 1.8, 4.5, 5.0 ], 'f': easeOut},
             # { 't':[1.9, 2.4, 7.0, 7.50 ], 'f': easeOut}
             ],
}

textTemplate = {
    'ch-single':[
        {   'name': "中文  ", 'type':"text",
            'isDynamic': True, 'col':'ch',
            'text': '',
            'font': 'font/NotoSansTC-Medium.ttf',
            'space':      0,  'lineSpace': 0,
            'size':      (80, 80),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (960, 960),
            'y':         (280, 320),
            'bg':False,
        },          
        {   'name':"注音標題", 'type':"text",
            'text': "注音",
            'isDynamic': False , 'col':'',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':      0,  'lineSpace': 0,
            'size':      (33, 33),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (814, 814),
            'y':         (450, 450),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51",'radius': 10
        },
        {   'name':"注音", 'type':"text",
            'isDynamic': True, 'col':'spelling-1',
            'text': '',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (34, 34),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (1000, 965),
            'y':         (450, 450),
            'bg':False
        },
        {   'name':"拼音標題", 'type':"text",
            'isDynamic': False , 'col':'',
            'text': "拼音",
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (33, 33),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (814, 814),
            'y':         (540, 540),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51",'radius': 10
        },
        {   'name':"拼音", 'type':"text",
            'isDynamic': True, 'col':'spelling-2',
            'text': '',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (34, 34),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (1000, 965),
            'y':         (540, 540),
            'bg':False
        },
        {   'name':"日文", 'type':"text",
            'isDynamic': True, 'col':'jp',
            'text': '',
            'font': 'font/MPLUS1p-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (55, 55),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,90),
            'x':         (960, 960),
            'y':         (700, 725),
            'bg':False
        },
        {   'name':"說明", 'type':"text",
            'isDynamic': True, 'col':'detail',
            'text': '',
            'font': 'font/MPLUS1p-Regular.ttf',
            'space':     0,  'lineSpace': 5,
            'size':      (30, 30),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,70),
            'x':         (960, 960),
            'y':         (750, 800),
            'bg':False
        },
        { 'name':"圖片", 'type':"image",
         'isDynamic': True, 'col':'img',
          'image':'',
          'alpha':     (0,100),
          'size':      (100,100),
          'x':         (330, 350),
          'y':         (540, 540),
        }],
    'ch-single-s':[
        {   'name': "中文  ", 'type':"text",
            'isDynamic': True, 'col':'ch',
            'text': '',
            'font': 'font/NotoSansTC-Medium.ttf',
            'space':      0,  'lineSpace': 0,
            'size':      (145, 145),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (540, 540),
            'y':         (500, 550),
            'bg':False,
        },          
        {   'name':"注音標題", 'type':"text",
            'text': "注音",
            'isDynamic': False , 'col':'',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':      0,  'lineSpace': 0,
            'size':      (55, 55),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (240, 280),
            'y':         (800, 800),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51",'radius': 10
        },
        {   'name':"注音", 'type':"text",
            'isDynamic': True, 'col':'spelling-1',
            'text': '',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (60, 60),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (550, 520),
            'y':         (800, 800),
            'bg':False
        },
        {   'name':"拼音標題", 'type':"text",
            'isDynamic': False , 'col':'',
            'text': "拼音",
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (55, 55),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (240, 280),
            'y':         (950, 950),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51",'radius': 10
        },
        {   'name':"拼音", 'type':"text",
            'isDynamic': True, 'col':'spelling-2',
            'text': '',
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (60, 60),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (550, 520),
            'y':         (940, 940),
            'bg':False
        },
        {   'name':"日文", 'type':"text",
            'isDynamic': True, 'col':'jp',
            'text': '',
            'font': 'font/MPLUS1p-Regular.ttf',
            'space':     0,  'lineSpace': 0,
            'size':      (72, 72),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,90),
            'x':         (540, 540),
            'y':         (1100, 1200),
            'bg':False
        },
        {   'name':"說明", 'type':"text",
            'isDynamic': True, 'col':'detail-2',
            'text': '',
            'font': 'font/MPLUS1p-Regular.ttf',
            'space':     0,  'lineSpace': 10,
            'size':      (50, 50),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,70),
            'x':         (540, 540),
            'y':         (1400, 1325),
            'bg':False
        },
        # { 'name':"圖片", 'type':"image",
        #  'isDynamic': True, 'col':'img',
        #   'image':'',
        #   'alpha':     (0,100),
        #   'size':      (100,100),
        #   'x':         (330, 350),
        #   'y':         (540, 540),
        # }
        ]
}



# % -% ==============================




# ------------------------------------------------------------

# 開始製作 圖序列

# ------------------------------------------------------------

# 還原累加時間時間軸 > 取 fade 中最長片段 + 0.5 秒
fade = originalTime(fadeAccu[videoTem])
videoLen = int((max(sum(row['t']) for row in fade) + 0.5)) * fps

if(loopTimes == False): # 測試用，用於限制製作影片數量
    loopTimes = len(df.loc[ df[filterCol] == tFilter, 'ch'])

for i in range(0,loopTimes):
    
    # 宣告開始
    thisCn = df.loc[ df[filterCol] == tFilter, 'ch'].tolist()[i]
    thisId = str(df.loc[ df[filterCol] == tFilter, 'id'].tolist()[i])
    print(thisCn + ", id: " + thisId  + "  --- Start ----------------------- ")
    
    # 设置 videoTem > 用於帶入文字
    tem =  textTemplate[ videoTem ]

    # 生成逐帧图像 ------------------------------------------
    layer = []
    for j in range(len(fade)):
        print("create Layer " + str(j) + "---------")
        
        # 製作文字圖層
        if tem[j]['type']=="text":
            # 將文字放入模板，根據模板上的欄位，(如果 isDynamic = True 則帶入動態資訊)
            if (tem[j]['isDynamic']):
                tem[j]['text'] = df.loc[ df[filterCol] == tFilter, tem[j]['col']].tolist()[i]
                if isinstance(tem[j]['text'], str):
                    nothing = 1
                else:
                    tem[j]['text'] = ""
             
            # 開始生成逐張圖
            if(singleImg): #是否輸出單張畫面 ( 觀看排版用 )
                layer.append( newText((vSizeW, vSizeH), tem[j], easeOut, 0, 1/fps , 0) )
            else:
                layer.append( newText((vSizeW, vSizeH), tem[j], easeOut, fade[j]['t'][1], fade[j]['t'][2], fade[j]['t'][3]) ) 
        
        # 製作圖片圖層
        if tem[j]['type']=="image":
            # 將圖片名稱放入模板，根據模板上的欄位，(如果 isDynamic = True 則帶入動態資訊)
            if (tem[j]['isDynamic']):
                tem[j]['image'] =  df.loc[ df[filterCol] == tFilter, tem[j]['col']].tolist()[i]
                if isinstance(tem[j]['image'], str):
                    tem[j]['image'] = "image/" + tem[j]['image'] + ".png" #
                    print(tem[j]['image'])
                else:
                    tem[j]['image'] = ""
                    break
            if(singleImg): #是否輸出單張畫面 ( 觀看排版用 )
                layer.append( newImage((vSizeW, vSizeH), tem[j], easeOut, 0, 1/fps , 0) )               
            else:
                layer.append( newImage((vSizeW, vSizeH), tem[j], easeOut, fade[j]['t'][1], fade[j]['t'][2], fade[j]['t'][3]) ) 
             

    
# 創造背景 > 所有圖層合併 -----------------------------------
    videoFrames = newVideo(videoBg, videoLen)
    for j in range(len(layer)):
        print("start Merge " + str(j))
        #是否輸出單張畫面 ( 觀看排版用 )
        if(singleImg):
            mergeFs(videoFrames, 0, layer[j])
        else:
            mergeFs(videoFrames, fade[j]['t'][0], layer[j])
            layer[j] = "" #清空記憶體
    # 如為測試單張畫面則跳出
    if(singleImg):
        videoFrames[0].show()
        break
    
    # 產生片段 > 儲存 > 輸出 -----------------------------------
    outputUrl = "oVideo/" + videoTem + "_" + Theme + "_" + thisCn + ".mp4"
    oVideo_temp = imageToVideo(videoFrames, fps ,True , outputUrl )
    oVideo_temp = ""








#%% =============================================================================
# 
# 
# 影音組合
# 
#
# =============================================================================

# 使用 pydub 如出現以下錯誤 : winError2 找不到系统文件
# 為 ffmepeg 讀不到問題，方法
# 1. 從 https://ffmpeg.org/ 安装 ffmpeg ( 不要使用 Source Code 或是 pip )
# 2. 將下載後的整個資料夾放到適合的位置
# 3. 系統內容>進階>環境變數>path>新增以上位置 + ffmpeg 資料夾內 bin 的連結



from pydub import AudioSegment
import pandas as pd


def createVoiceLayer( startS, voiceUrls, voiceTimes):
    
    voices      = []
    voiceLens   = []
    voiceMas    = []
    aVoices     = []
    # 讀取聲音
    for url in voiceUrls:
        try:
            voices.append(AudioSegment.from_mp3(url))
        except:
            print( url + " is not found")
            voices.append("not found")
    
    # 計算個聲音長度與間距
    for i in range(len(voices)):
        voice = voices[i]
        if(voice == "not found"):
            voiceLens.append(0)
        else:
            voiceLens.append(voice.duration_seconds)
        voiceMas.append(voiceTimes[i] - voiceLens[i])
        if voiceMas[i] < 0:
            print('Source Voice is too long')
            return None
    
    # 將每段聲音加上無聲間距
    for i in range(len(voices)):
        if(voice == "not found"):
            aVoices.append(AudioSegment.silent(duration = voiceMas[i]*1000))
        else:
            aVoices.append(voices[i] + AudioSegment.silent(duration = voiceMas[i]*1000))
    
    # 用無聲開始階段 創立最後輸出的新聲音 > 循環加入所有聲音
    voiceOutput = AudioSegment.silent(duration = startS*1000 )
    for voice in voices:
        voiceOutput = voiceOutput + voice
    
    return voiceOutput





#%% ---------------------------------------------------------------- 

#   語音組合

#   -------------------------------------------------------------



# 創造聲音圖層------------
# output_voice = []

nameList = df.loc[ df[filterCol] == tFilter, 'ch'].tolist()
idList = df.loc[ df[filterCol] == tFilter, "id"].tolist()

for i in range(loopTimes):  
    
    # 建立 影片所需的 voices 音檔 list
    name = nameList[i]
    ID   = str(idList[i])
    
    print( ID + " " + name )
    
    # 讀取音檔
    audioUrls = []
    for voiceAttr in voiceTemplates[audioTem]["voices"]:
        audioUrls.append("tts/" + Theme + "_" + name  + "_" + voiceAttr + "_" +  ID + ".mp3")
    
    # 開始語音組合
    audioLayer = createVoiceLayer( voiceTemplates[audioTem]['startS'], audioUrls, voiceTemplates[audioTem]['voiceTimes'])
    
    # 輸出音檔
    filename = "oAudio/" + audioTem + "_" + Theme + "_" + name + ".mp3"
    audioLayer.export(filename, format="mp3")
    
    

    


#%% ---------------------------------------------------------------- 

#   讀取影音 > 影音組合

#   -------------------------------------------------------------



# 讀取 影片 語音
oVideo = []
oAudio = []
for i in range(loopTimes):
    oVideo.append(VideoFileClip("oVideo/" + videoTem + "_" + Theme + "_" + nameList[i] + ".mp4"))
    oAudio.append(AudioFileClip("oAudio/" + audioTem + "_" + Theme + "_" + nameList[i] + ".mp3"))





# 開始組合影音
for i  in range(loopTimes):
    # 讀取 影、音
    video = oVideo[i]  
    audio = oAudio[i]
    
    # 合併影片與聲音
    oVideo[i]  = video.set_audio(audio)         
    
    # 輸出
    outputUrl = "oVA/" + videoTem + "_" + audioTem + "_" + Theme + "_" + nameList[i] + ".mp4"
    oVideo[i].write_videofile(outputUrl, temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")







#%% ---------------------------------------------------------------- 

#   組合主片段 > 輸出

#   -------------------------------------------------------------



output = concatenate_videoclips(oVideo)      # 合併影片
outputUrl = "Output/" + Theme + "_" + videoTem + "_" + audioTem  + ".mp4"

output.write_videofile( outputUrl ,temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")






    