
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

            draw.text((x_current, y_current), textParam['text'], fill=color, font=font)

        elif frame < (fade_in_duration + stay_duration) * fps:  # 停留阶段
            
            alpha = alpha_end
            x_current, y_current = textParam['end_pos']
            font = ImageFont.truetype(textParam['font'], textParam['size'])
            color = ImageColor.getrgb(textParam['color'])
            draw.text((x_current, y_current), textParam['text'], fill=color + (int(alpha),), font=font)

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
            
            draw.text((x_current, y_current), textParam['text'], fill=color , font=font)

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

