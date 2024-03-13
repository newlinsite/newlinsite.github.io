


#%% import
# Pillow   9.4.0

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageColor
from moviepy.editor import ImageSequenceClip
import pygame #試聽聲音用

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

def newText(videoSize, textParam, easeType, inSec, stopSec, outSec):
    
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
    xPadding, yPadding = textParam['padding']
    bgColor = textParam['bgColor']
    print(textParam['text'])
    
    for frame in range(frames):
        
        # 創建透明底板
        frameImage = Image.new('RGBA', videoSize,(255, 255, 255, 0))
        draw = ImageDraw.Draw(frameImage)
        
        
        ### 淡入階段 --------------------------------------------------------------------
        if frame < inSec * fps:
            progress = frame / (inSec * fps)

            # 透明度、顏色 計算
            alphaCurrent = alphaStart + (alphaEnd - alphaStart) * easeType(progress)
            color = ImageColor.getrgb(textParam['color']) + (int(alphaCurrent),)  
            
            # 建立 "font" > 算文字尺寸 > 如有置中 > 取出中心校正值
            font = ImageFont.truetype(textParam['font'], int(tSizeStart + (tSizeEnd - tSizeStart) * progress))
            textWidth, textHeight = draw.textsize(textParam['text'], font = font)
            textCenterWidth , textCenterHeight = (0,0)
            if(textParam['alignCenter']):
                textCenterWidth = textWidth / 2
                textCenterHeight = textHeight / 2
            
            # 位置 計算
            xCurrent = xStart + (xEnd - xStart) * easeType(progress) -  textCenterWidth
            yCurrent = yStart + (yEnd - yStart) * easeType(progress) - textCenterHeight
            
            # 繪製圓角矩形
            if(textParam['bg']):
                bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alphaCurrent),)  
                drawRoundedRectangle(draw, 
                 (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                 5, fill = bgColorCurrent)
            
            # 建立文字
            if space == 0:
                draw.text((xCurrent, yCurrent), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
                    draw.text((xCurrent, yCurrent), char, fill=color, font=font)
                    xCurrent += space    # 更新 x 坐标以绘制下一个字符             
        
        ### 停留階段 --------------------------------------------------------------------
       
        elif frame < (inSec + stopSec) * fps:  # 停留阶段
            # 透明度 計算
            alpha = alphaEnd
            color = ImageColor.getrgb(textParam['color']) + (int(alpha),)
            
            # 建立 "font" > 算文字尺寸 > 如有置中 > 取出中心校正值
            font = ImageFont.truetype(textParam['font'], tSizeEnd )
            textWidth, textHeight = draw.textsize(textParam['text'], font = font)
            textCenterWidth , textCenterHeight = (0,0)
            if(textParam['alignCenter']):
                textCenterWidth = textWidth / 2
                textCenterHeight = textHeight / 2
            
            # 位置 計算
            xCurrent = xEnd  -  textCenterWidth
            yCurrent = yEnd  - textCenterHeight            
            
            # 繪製圓角矩形
            if(textParam['bg']):
                bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alpha),)  
                drawRoundedRectangle(draw, 
                 (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                 5, fill = bgColorCurrent)
            
            
            # 建立文字
            if space == 0:
                draw.text((xCurrent, yCurrent), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
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
            textWidth, textHeight = draw.textsize(textParam['text'], font = font)
            textCenterWidth , textCenterHeight = (0,0) 
            if(textParam['alignCenter']):
                textCenterWidth = textWidth / 2
                textCenterHeight = textHeight / 2 
            
            # 位置 計算
            xCurrent = xEnd + (xStart - xEnd) * easeType(progress) -  textCenterWidth
            yCurrent = yEnd + (yStart - yEnd) * easeType(progress) - textCenterHeight
            
            # 繪製圓角矩形
            if(textParam['bg']):
                bgColorCurrent = ImageColor.getrgb(bgColor) + (int(alphaCurrent),)  
                drawRoundedRectangle(draw, 
                 (xCurrent-xPadding, yCurrent-yPadding, xCurrent + textWidth + xPadding, yCurrent + textHeight + yPadding), 
                 5, fill = bgColorCurrent)
            
            # 建立文字
            if space == 0:
                draw.text((xCurrent, yCurrent), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
                    draw.text((xCurrent, yCurrent), char, fill = color, font = font)
                    xCurrent += space    # 更新 x 坐标以绘制下一个字符    
                    
        textBox.append(frameImage) # 添加当前帧图像到列表中
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




#創立影片基底
def newVideo(backgroundUrl, videoLen):
    videoFrames=[]
    for i in range(videoLen):
        background = Image.open( backgroundUrl )
        videoFrames.append(background)
    return videoFrames


#在特定 frames 疊上新圖
def mergeFs(bgFs, startSec, fs):
    startFrame = int(fps*startSec)
    for i in range(startFrame, startFrame + len(fs)):
        textFrame = fs[i-startFrame]
        bgFs[i].paste(textFrame, (0, 0), textFrame)
    #return bgFs


### 把圖片逐 Frame 變成影片 ------------------------------------------------
def imageToVideo(images, videoFps = 30, isOutput = True , outputName = "output.mp4"):
    imagesNp = [np.array(img) for img in images] # 将PIL图像对象转换为NumPy数组
    clip = ImageSequenceClip(imagesNp, fps = videoFps)   # 从图像文件创建图像序列剪辑
    if(isOutput):
        clip.write_videofile( outputName, fps = videoFps)  # 保存视频文件
    return clip
    
    # 如果 clip.write_videofile 讀取不到 fps 請再函示庫加入以下 Code 30可以改成指定 fps
    # if fps is None:
    #     fps = 30




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





import pandas as pd

dfText = pd.read_excel("wordList.xlsx")
Theme = ['type','職場',"0"]
content =[
        dfText.loc[dfText[Theme[0]] == Theme[1], 'ch'].tolist(),
        dfText.loc[dfText[Theme[0]] == Theme[1], 'spelling-1'].tolist(),
        dfText.loc[dfText[Theme[0]] == Theme[1], 'spelling-2 '].tolist(),
        # dfText.loc[dfText[Theme[0]] == Theme[1], 'jp'].tolist(),
        dfText.loc[dfText[Theme[0]] == Theme[1], 'detail'].tolist()
    ]




clip = []

# 影片参数
videoBg = "bg02.png"
fps = 30
vSizeW, vSizeH =  Image.open( videoBg ).size

fade = [
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut},
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut},
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut},
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut},
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut},
    { 't':[0.5, 1.0, 6.0, 1.0 ], 'f': easeOut}
 ]

# 取 fade 中最長片段 + 0.5 秒
videoLen = int((max(sum(row['t']) for row in fade) + 0.5)) * fps

# for i in range(0,1):
for i in range(0,len(content[0])):
    # 设置文本参数
    textParams= [
        {   'name':"中文",
            'text': content[0][i],
            'font': 'font/NotoSansTC-Medium.ttf',
            'space':     0,
            'size':      (80, 85),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (960, 960),
            'y':         (300, 320),
            'bg':False, 'padding':(8,8), 'bgColor':"#333333"
        },
        {   'name':"注音標題",
            'text': "注音",
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,
            'size':      (33, 33),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (814, 814),
            'y':         (480, 480),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51"
        },
        {   'name':"注音",
            'text': content[1][i],
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,
            'size':      (34, 34),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (990, 965),
            'y':         (480, 480),
            'bg':False, 'padding':(8,8), 'bgColor':"#406A51"
        },
        {   'name':"拼音標題",
            'text': "拼音",
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,
            'size':      (33, 33),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (814, 814),
            'y':         (564, 564),
            'bg':True, 'padding':(26,8), 'bgColor':"#406A51"
        },
        {   'name':"拼音",
            'text': content[2][i],
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     0,
            'size':      (34, 34),
            'alignCenter':False,
            'color':     '#FFFFFF',
            'alpha':     (0,100),
            'x':         (990, 965),
            'y':         (564, 564),
            'bg':False, 'padding':(8,8),  'bgColor':"#406A51"
        },
        # {   'name':"日文",
        #     'text': content[2][i],
        #     'font': 'font/NotoSansTC-Light.ttf',
        #     'space':     0,
        #     'size':      (1, 25),
        #     'alignCenter':True,
        #     'color':     '#222222',
        #     'alpha':     (0,100),
        #     'x':         (960, 960),
        #     'y':         (100, 600),
        #     'bg':True, 'padding':(8,8), 'bgColor':(255, 255, 255, 255)
        # },
        {   'name':"說明",
            'text': content[3][i],
            'font': 'font/NotoSansTC-Light.ttf',
            'space':     0,
            'size':      (30, 30),
            'alignCenter':True,
            'color':     '#FFFFFF',
            'alpha':     (0,70),
            'x':         (960, 960),
            'y':         (680, 700),
            'bg':False, 'padding':(8,8),  'bgColor':"#406A51"
        }
    ]
    
    
    # 生成逐帧图像
    textLayer = []
    for j in range(len(fade)):
        print("create Layer " + str(j) + "------------------")
        textLayer.append( newText((vSizeW, vSizeH), textParams[j], easeOut, fade[j]['t'][1], fade[j]['t'][2], fade[j]['t'][3]) )    

    # 創造背景 > 所有圖層合併
    videoFrames = newVideo(videoBg, videoLen)
    for j in range(len(textLayer)):
        print("start Merge " + str(j))
        mergeFs(videoFrames, fade[j]['t'][0], textLayer[j])

    # 產生片段 > 儲存 > 輸出
    clip.append(imageToVideo(videoFrames, fps ,True , Theme[0] + "_" + Theme[1] + Theme[2] + str(i) + ".mp4" ))





videoFrames[28].show()








# imageParam ={
#     'image':"001.png",
#     'x':(0,100),
#     'y':(0,200),
#     'size':(0.5,1),
#     'alpha':(0,1)
#     }
# images = newImage((800,800), imageParam, easeOut, 1.5, 1, 1.5)


# videoTest = newVideo(videoBg, 5*fps)

# mergeFs(videoTest, 0.5, images)

# imageToVideo(videoTest,True , "4444.mp4" , fps)

# images[20].show()




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
    
    
# 創造聲音圖層
voice = createVoiceLayer("tts/jp_a0001.mp3", 5, 2, 3, True, "tts/jp_a0001.mp3")







#%%

"""

影音組合

"""

from moviepy.editor import *
video = clip[0]  
audio = AudioFileClip("ou2.mp3")  
output = video.set_audio(audio)         # 合併影片與聲音
output.write_videofile("output.mp4", temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")
# 注意要設定相關參數，不然轉出來的影片會沒有聲音










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
    
    