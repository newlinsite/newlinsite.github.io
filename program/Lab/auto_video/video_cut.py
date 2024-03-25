


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
                lineCurrent = (lineSpacing + textHeight * lineCount)
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
                lineCurrent = (lineSpacing + textHeight * lineCount)
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
                lineCurrent = (lineSpacing + textHeight * lineCount)
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
            alphaCurrent = alphaStart + (alphaEnd - alphaStart) * easeType(progress)
            imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
            # 建立一個具有修改後透明度的新圖片
            imageCurrent = Image.new('RGBA', image.size)
            imageCurrent.putdata(imageDataCurrent)
            
            # 大小 計算
            sizeCurrent = sizeStart + (sizeEnd - sizeStart) * progress
            imageCurrent = imageCurrent.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
            
            # 位置 計算
            xCurrent = xStart + (xEnd - xStart) * easeType(progress) - imageCurrent.width / 2
            yCurrent = yStart + (yEnd - yStart) * easeType(progress) - imageCurrent.height / 2
            
            # 繪製圓形遮罩
            mask = Image.new("L", imageCurrent.size, 255)
            # mask = Image.new("L", imageCurrent.size, 0) #"L"新創灰階圖像，0=全黑
            # drawMask = ImageDraw.Draw(mask) 
            # drawMask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill = 255) #畫橢圓形
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)), mask)
            
        ### 停留階段 --------------------------------------------------------------------
        elif frame < (inSec + stopSec) * fps:  # 停留阶段
            # 透明度 
            alphaCurrent = alphaEnd
            imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
            # 建立一個具有修改後透明度的新圖片
            imageCurrent = Image.new('RGBA', image.size)
            imageCurrent.putdata(imageDataCurrent)
            
            # 大小
            sizeCurrent = sizeEnd
            imageCurrent = image.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
            
            # 位置
            xCurrent = xEnd - imageCurrent.width / 2
            yCurrent = yEnd - imageCurrent.height / 2
            
            # 繪製圓形遮罩
            mask = Image.new("L", imageCurrent.size, 255)
            # mask = Image.new("L", imageCurrent.size, 0)
            # draw_mask = ImageDraw.Draw(mask)
            # draw_mask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill=255)
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)), mask)
    
        ### 淡出階段 --------------------------------------------------------------------
        elif frame < (inSec + stopSec + outSec) * fps:  # 淡出阶段
            progress = (frame - (inSec + stopSec) * fps) / (outSec * fps)
        
                   
            # 透明度 > 將每個像素的透明度乘以當前比率以降低透明度
            alphaCurrent = alphaEnd - (alphaStart - alphaEnd) * easeType(progress)
            imageDataCurrent = [(r, g, b, int(alpha * alphaCurrent)) for r, g, b, alpha in imageData]
            # 建立一個具有修改後透明度的新圖片
            imageCurrent = Image.new('RGBA', image.size)
            imageCurrent.putdata(imageDataCurrent)
            
                        
            # 大小
            sizeCurrent = sizeEnd - (sizeEnd - sizeStart) * progress
            imageCurrent = image.resize((int(sizeCurrent * imageWidth), int(sizeCurrent * imageHeight)))
            
            # 位置
            xCurrent = xEnd - (xEnd - xStart) * easeType(progress) - imageCurrent.width / 2
            yCurrent = yEnd - (yEnd - yStart) * easeType(progress) - imageCurrent.height / 2
            
            # 繪製圓形遮罩 > 畫圖
            mask = Image.new("L", imageCurrent.size, 255)
            # mask = Image.new("L", imageCurrent.size, 0)
            # draw_mask = ImageDraw.Draw(mask)
            # draw_mask.ellipse((0, 0, imageCurrent.size[0], imageCurrent.size[1]), fill=255)
            frameImage.paste(imageCurrent, (int(xCurrent), int(yCurrent)), mask)
                    
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


### 把圖片逐 Frame 變成影片 ------------------------------------------------
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
# 單字影片生成
# 
# 
# =============================================================================


# 主題
df = pd.read_excel("wordList.xlsx")
ThemeCol = 'type'
Theme = '職場'
template = 'cn-single'

# 影片参数
clip = []
videoBg = "bg02.png"
fps = 30
vSizeW, vSizeH =  Image.open( videoBg ).size


#%% ==============================

# 圖層累加時間時間軸
fadeAccu = {
    'cn-single':[
        { 't':[0.6, 1.5, 9.4, 10.0 ], 'f': easeOut},
        { 't':[1.0, 1.8, 9.0, 9.50 ], 'f': easeOut},
        { 't':[1.0, 1.8, 9.0, 9.50 ], 'f': easeOut},
        { 't':[1.2, 2.0, 9.0, 9.50 ], 'f': easeOut},
        { 't':[1.2, 2.0, 9.0, 9.50 ], 'f': easeOut},
        { 't':[1.4, 3.2, 8.5, 9.00 ], 'f': easeOut},
        { 't':[1.4, 3.2, 8.5, 9.00 ], 'f': easeOut}
     ]
}

textTemplate = {
    'cn-single':[
    {   'Name': "中文",
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
        'bg':False
    },
    {   'name':"注音標題",
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
    {   'name':"注音",
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
    {   'name':"拼音標題",
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
    {   'name':"拼音",
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
    {   'name':"日文",
        'isDynamic': True, 'col':'jp',
        'text': '',
        'font': 'font/NotoSansTC-Regular.ttf',
        'space':     0,  'lineSpace': 0,
        'size':      (50, 55),
        'alignCenter':True,
        'color':     '#FFFFFF',
        'alpha':     (0,90),
        'x':         (960, 960),
        'y':         (700, 725),
        'bg':False
    },
    {   'name':"說明",
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
    }]
}







# 測試控制區
singleImg = True
# singleImg = False

i = 1
j = 0
loopTimes = 2
# loopTimes = len(textTemplate[ template ])




# 還原累加時間時間軸 > 取 fade 中最長片段 + 0.5 秒
fade = originalTime(fadeAccu[template])
videoLen = int((max(sum(row['t']) for row in fade) + 0.5)) * fps

# 開始製作
for i in range(0,loopTimes):
    
    # 宣告開始
    thisCn = df.loc[ df[ThemeCol] == Theme, 'ch'].tolist()[i]
    thisId = str(df.loc[ df[ThemeCol] == Theme, 'id'].tolist()[i])
    print(thisCn + ", id: " + thisId  + "  ---- Start ----------------------------- ")
    
    # 设置 Template > 用於帶入文字
    tem =  textTemplate[ template ]

       
    # 生成逐帧图像
    textLayer = []
    for j in range(len(fade)):
        print("create Layer " + str(j) + "---------")
        
        # 將文字放入模板，根據模板上的欄位，(如果是list則帶入動態資訊)
        if (tem[j]['isDynamic']):
            tem[j]['text'] = df.loc[ df[ThemeCol] == Theme, tem[j]['col']].tolist()[i]
            if isinstance(tem[j]['text'], str):
                print(tem[j]['text'])
            else:
                tem[j]['text'] = ""
                
         
        #是否輸出單張畫面 ( 觀看排版用 )
        if(singleImg):
            textLayer.append( newText((vSizeW, vSizeH), tem[j], easeOut, 0, 1/fps , 0) )
        else:
            textLayer.append( newText((vSizeW, vSizeH), tem[j], easeOut, fade[j]['t'][1], fade[j]['t'][2], fade[j]['t'][3]) ) 

    # 創造背景 > 所有圖層合併
    videoFrames = newVideo(videoBg, videoLen)
    for j in range(len(textLayer)):
        print("start Merge " + str(j))
        #是否輸出單張畫面 ( 觀看排版用 )
        if(singleImg):
            mergeFs(videoFrames, 0, textLayer[j])
        else:
            mergeFs(videoFrames, fade[j]['t'][0], textLayer[j])

    # 如為測試則跳出
    if(singleImg):
        videoFrames[0].show()
        break
    
    # 產生片段 > 儲存 > 輸出
    outputUrl = template + "_" + Theme + "_" + thisCn + ".mp4"
    clip.append(imageToVideo(videoFrames, fps ,True , outputUrl ))










#%% =============================================================================
# 
# 
# 語音組合
# 
#
# =============================================================================

# 使用 pydub 如出現以下錯誤 : winError2 找不到系统文件
# 為 ffmepeg 讀不到問題，方法
# 1. 從 https://ffmpeg.org/ 安装 ffmpeg ( 不要使用 Source Code 或是 pip )
# 2. 將下載後的整個資料夾放到適合的位置
# 3. 系統內容>進階>環境變數>path>新增以上位置 + ffmpeg 資料夾內 bin 的連結



from pydub import AudioSegment

def createVoiceLayer( url, startS, aTimeS, times, isTranslate = False, translateUrl = ""):
    voiceSource = AudioSegment.from_mp3(url)
    voiceLen = voiceSource.duration_seconds
    voiceMa = aTimeS - voiceLen
    if voiceMa < 0:
        print('Source Voice is too long')
        return None
    
    aVoice = voiceSource + AudioSegment.silent(duration = voiceMa*1000)
    voice = aVoice
    for i in range( times-1 ):
        voice = voice + aVoice
    voice = AudioSegment.silent(duration = startS*1000 ) + voice
    
    if isTranslate:
        voiceTra = AudioSegment.from_mp3( translateUrl )
        voice = voice + voiceTra
    return voice
   

    

#%% ----


# 主題
df = pd.read_excel("wordList.xlsx")
ThemeCol = 'type'
Theme = '職場'
template = 'cn-single'


# 創造聲音圖層
voice = []
for i in range(len(clip)):
    voice.append(createVoiceLayer("tts/jp_a000"+ i +".mp3", 3.5, 3, 2, True, "tts/jp_a000"+ i +".mp3"))






#%% =============================================================================
# 
# 
# 影音組合 > 輸出片段 > 組合主片段 > 輸出
# 
#
# =============================================================================



for i  in range(len(clip)):

    video = clip[i]  
    audio = voice[i]
    clip[i]  = video.set_audio(audio)         # 合併影片與聲音
    outputUrl = Theme[1] + "_" + Theme[2] + str(i) + ".mp4"
    clip[i]  .write_videofile( outputUrl, temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")



finalClip = concatenate_videoclips(clip)







# audio = AudioFileClip("ou2.mp3")  
# output = video.set_audio(audio)         # 合併影片與聲音
# output.write_videofile("output.mp4", temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")
# # 注意要設定相關參數，不然轉出來的影片會沒有聲音


playSound("out.mp3")
playSound("output.mp3")
playSound("ou2.mp3")















#%%----------------------------------------------------
import numpy as np
from moviepy.editor import ImageSequenceClip
from moviepy.editor import *

# 将PIL图像对象转换为NumPy数组
text_frames_np = [np.array(img) for img in text_frames]

# 创建ImageSequenceClip
clip = ImageSequenceClip(text_frames_np, fps=fps)

clip.show()

# 保存为视频文件
clip.write_videofile("output_video.mp4", codec="libx264", fps=fps)



out = cv2.vWriter('text_animation.mp4', cv2.vWriter_fourcc(*'mp4v'), fps, (width, height))
for frame_image in text_frames:
    frame_bgr = cv2.cvtColor(np.array(frame_image), cv2.COLOR_RGBA2BGR)
    out.write(frame_bgr)
out.release()

#----------------------------------------------------















video = VideoFileClip("../aten/MRS/element/video.mp4")         # 讀取影片
# 以下功能需要 pillow 降板才能使用， pip install pillow==9.4.0
clip = video.resize((360,180)).subclip(1,10)   # 縮小影片尺寸，剪輯出 10～12 秒的片段
text_clip = ImageClip("ok.png", transparent=True).set_duration(2)   # 讀取圖片，將圖片變成長度兩秒的影片

output = CompositeVideoClip([clip, text_clip])  # 混合影片
output.write_videofile("output.mp4",temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")

print('ok')















#tts
import pandas as pd

"""

先執行 google_tts.py上的功能

"""


dfText = pd.read_excel("wordList.xlsx")

content = dfText["jp"][0]




content = """
    <speak>
    
    Here are <say-as interpret-as="characters">SSML</say-as> samples.
    
    <break time="200ms"/>
    
    您好您好    
    
    <break time="200ms"/>
    
    初めまして
    
    </speak>
"""

voice = tts(content,"tw-C")
voice = tts(content,"jp-C-n")


ttsOuput(voice,"out")
    
    