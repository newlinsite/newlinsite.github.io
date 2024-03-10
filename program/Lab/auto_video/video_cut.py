

#%% import

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageColor
from moviepy.editor import ImageSequenceClip

import pygame

def playSound(url, vol = 0.5):
    pygame.mixer.init()
    pygame.mixer.music.load(url)
    pygame.mixer.music.set_volume(vol)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy(): # 让程序保持运行，直到音频播放完毕
        pygame.time.Clock().tick(10)
    pygame.quit()
    
    
    
#%% Function
    
def easeIn(t):
    return t * t

def easeOut(t):
    return 1 - (1 - t) ** 2

def newText(videoSize, textParam, easeType, inS, stopS, outS):
    
    text_images = []
    fade_in_duration = inS  # 淡入持续时间（秒）
    stay_duration = stopS  # 停留时间（秒）
    fade_out_duration = outS  # 淡出持续时间（秒）
    duration = inS + stopS + outS
    frames = int(duration * fps)
    space = textParam['space']
    print(textParam['text'])
    
    for frame in range(frames):
        # 创建一帧图像
        frame_image = Image.new('RGBA', videoSize,(255, 255, 255, 0))
        draw = ImageDraw.Draw(frame_image)
        
        if frame < fade_in_duration * fps:  # 淡入阶段
            progress = frame / (fade_in_duration * fps)

            alpha_start,alpha_end = textParam['alpha']
            alpha_current = alpha_start + (alpha_end - alpha_start) * easeType(progress)
            
            x_start, y_start = textParam['start_pos']
            x_end, y_end = textParam['end_pos']
            x_current = x_start + (x_end - x_start) * easeType(progress)
            y_current = y_start + (y_end - y_start) * easeType(progress)
            font = ImageFont.truetype(textParam['font'], textParam['size'])

            color = ImageColor.getrgb(textParam['color'])+ (int(alpha_current),)     
            
            if space == 0:
                draw.text((x_current, y_current), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
                    draw.text((x_current, y_current), char, fill = color, font = font)
                    x_current += space    # 更新 x 坐标以绘制下一个字符             

        elif frame < (fade_in_duration + stay_duration) * fps:  # 停留阶段
            
            alpha = alpha_end
            x_current, y_current = textParam['end_pos']
            font = ImageFont.truetype(textParam['font'], textParam['size'])
            color = ImageColor.getrgb(textParam['color'])+ (int(alpha),)
            
            if space == 0:
                draw.text((x_current, y_current), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
                    draw.text((x_current, y_current), char, fill = color, font=font)
                    x_current += space    # 更新 x 坐标以绘制下一个字符    

        elif frame < (fade_in_duration + stay_duration + fade_out_duration) * fps:  # 淡出阶段
            progress = (frame - (fade_in_duration + stay_duration) * fps) / (fade_out_duration * fps)
        
                                
            alpha_start,alpha_end = textParam['alpha']
            alpha_current = alpha_end + (alpha_start - alpha_end) * easeType(progress)
            
            x_start, y_start = textParam['start_pos']
            x_end, y_end = textParam['end_pos']
            x_current = x_end + (x_start - x_end) * easeType(progress)
            y_current = y_end + (y_start - y_end) * easeType(progress)
            
            font = ImageFont.truetype(textParam['font'], textParam['size'])
            color = ImageColor.getrgb(textParam['color'])+ (int(alpha_current),)  
            
            if space == 0:
                draw.text((x_current, y_current), textParam['text'], fill = color, font = font)
            else:
                for char in textParam['text']:
                    draw.text((x_current, y_current), char, fill = color, font=font)
                    x_current += space    # 更新 x 坐标以绘制下一个字符    

        # 添加当前帧图像到列表中
        text_images.append(frame_image)

    return text_images


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
def imageToVideo(images, isOutput = True , outputName = "output.mp4", videoFps=30):
    imagesNp = [np.array(img) for img in images] # 将PIL图像对象转换为NumPy数组
    clip = ImageSequenceClip(imagesNp, fps = videoFps)   # 从图像文件创建图像序列剪辑
    if(isOutput):
        clip.write_videofile( outputName )  # 保存视频文件
    return clip








#%% =============================================================================
# 
# 
# 單字影片生成
# 
# 
# =============================================================================





import pandas as pd

dfText = pd.read_excel("wordList.xlsx")
Theme = ['type','食物',0]
content =[
        dfText.loc[dfText[Theme[0]] == Theme[1], 'ch'].tolist(),
        dfText.loc[dfText[Theme[0]] == Theme[1], 'jp'].tolist(),
        dfText.loc[dfText[Theme[0]] == Theme[1], 'en'].tolist()
    ]



## ------------------------------

clip = []

# 影片参数
videoBg = "bg01.png"
videoSec,fps = 8, 30
vSizeW, vSizeH =  Image.open( videoBg ).size
videoLen = videoSec * fps



for i in range(0,1):
#for i in range(0,len(content[0])):
    # 设置文本参数
    textParams= [
        {
            'text': content[0][i],
            'font': 'font/NotoSansTC-Medium.ttf',
            'space':     0,
            'size':      40,
            'color':     '#225500',
            'alpha':     (0,100),
            'start_pos': (100, 100),
            'end_pos':   (500, 100)
        },
        {
            'text': content[1][i],
            'font': 'font/NotoSansTC-Regular.ttf',
            'space':     10,
            'size':      30,
            'color':     '#225500',
            'alpha':     (0,100),
            'start_pos': (100, 200),
            'end_pos':   (500, 200)
        },
        {
            'text': content[2][i],
            'font': 'font/NotoSansTC-Light.ttf',
            'space':     50,
            'size':      25,
            'color':     '#222222',
            'alpha':     (0,100),
            'start_pos': (100, 260),
            'end_pos':   (500, 260)
        }
    ]
    
    
    
    # 生成逐帧图像
    textLayer=[]
    textLayer.append( newText((vSizeW, vSizeH), textParams[0], easeOut, 1.0, 5.0, 1.0) )    
    textLayer.append( newText((vSizeW, vSizeH), textParams[1], easeOut, 1.0, 4.4, 1.0) )    
    textLayer.append( newText((vSizeW, vSizeH), textParams[2], easeOut, 1.0, 4.0, 1.0) )    
      
    
    # 創造背景 > 所有圖層合併
    videoFrames = newVideo(videoBg, videoLen)
    mergeFs(videoFrames, 0.5, textLayer[0])
    mergeFs(videoFrames, 0.8, textLayer[1])
    mergeFs(videoFrames, 1.0, textLayer[2])
    
    textTimeline = [
        [ easeOut, 0.5, 1.0, 5.0, 1.0],
        [ easeOut, 0.8, 1.0, 4.4, 1.0],
        [ easeOut, 1.0, 1.0, 4.0, 1.0],
        ]
    
    
    clip.append(imageToVideo(videoFrames,True , Theme[0] + "_" + Theme[1] + Theme[2] + ".mp4" , fps))



videoFrames[28].show()





#%% =============================================================================
# 
# 
# 語音組合
# 
#
# =============================================================================



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
voice = createVoiceLayer("out.mp3", 5, 2, 3, True, "output.mp3")
voice.export('ou2.mp3', format='mp3')


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
    
    