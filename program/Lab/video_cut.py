"""
Created on Tue Feb 27 19:45:20 2024

@author: newlin
"""



from moviepy.editor import *
from PIL import Image, ImageDraw, ImageFont, ImageColor



def newText(textList):
    textContainer = Image.new('RGBA', (size[0], size[1]))   # 建立畫布
    textDraw = ImageDraw.Draw(textContainer)                              # 準備在圖片上繪圖
    for t in textBox:
        font = ImageFont.truetype(t['font'], t['size'])
        color = ImageColor.getrgb(t['color'])
        alpha = t['alpha']
        print(color + (alpha,))
        textDraw.text( (t['xy'][0],t['xy'][1]) , t['text'] , fill = color + (alpha,) , font = font , stroke_width = t['border'][0] , stroke_fill = t['border'][1])
    return textContainer


size = [800,450]


font = ["font/NotoSansTC-Regular.ttf"]
textBox = [
     {'text': "text01", 'xy' : [100,100],  'size' : 40,  'color':"#000333",'alpha':0, 'border' : [2,"#333333"], 'font':font[0]},
     {'text': "text02", 'xy' : [100,300],  'size' : 30,  'color':"#ffffff",'alpha':50, 'border' : [2,"#333333"], 'font':font[0]},
     {'text': "text03", 'xy' : [100,400],  'size' : 20,  'color':"#555555",'alpha':255, 'border' : [2,"#333333"], 'font':font[0]}
     ]

textContainer = newText(textBox)

textContainer.show()
textContainer.save('ok.png')



def newText(textList):
    textContainer = Image.new('RGBA', (size[0], size[1]))   # 建立畫布
    textDraw = ImageDraw.Draw(textContainer)                              # 準備在圖片上繪圖
    for t in textList:
        font = ImageFont.truetype(t['font'], t['size'])
        color = ImageColor.getrgb(t['color'])
        alpha = t['alpha']
        
        textDraw.text( (t['xy'][0],t['xy'][1]) , t['text'] , fill = color + (alpha,) , font = font , stroke_width = t['border'][0] , stroke_fill = t['border'][1])
    return textContainer



def newText(text, s, x, y ,alpha, border, boderColor, font):
    font = ImageFont.truetype(t['font'], s)
    for frame in range(frames):
    textDraw.text( (x,y) , text , fill = color + (alpha,) , font = font , stroke_width = border , stroke_fill = borderColor)


進場delay
動畫
總長度
退場delay
antext(text,'x',[0,100],[])



import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageColor

def ease_in(t):
    return t * t

def ease_out(t):
    return 1 - (1 - t) ** 2

def move_and_fade_in_out(image_size, text_params, duration, ease_function):
    frames = duration * fps
    text_images = []

    fade_in_duration = 1.0  # 淡入持续时间（秒）
    stay_duration = 2.0  # 停留时间（秒）
    fade_out_duration = 1.0  # 淡出持续时间（秒）

    for frame in range(frames):
        # 创建一帧图像
        frame_image = Image.new('RGBA', image_size)
        draw = ImageDraw.Draw(frame_image)

        if frame < fade_in_duration * fps:  # 淡入阶段
            progress = frame / (fade_in_duration * fps)
            for text_param in text_params:
                              
                alpha_start,alpha_end = text_param['alpha']
                alpha_current = alpha_start + (alpha_end - alpha_start) * ease_function(progress)
                
                
                               
                x_start, y_start = text_param['start_pos']
                x_end, y_end = text_param['end_pos']
                x_current = x_start + (x_end - x_start) * ease_function(progress)
                y_current = y_start + (y_end - y_start) * ease_function(progress)
                font = ImageFont.truetype(text_param['font'], text_param['size'])
                color = ImageColor.getrgb(text_param['color'])+ (int(alpha_current),)
         

                print(color)
                
                draw.text((x_current, y_current), text_param['text'], fill = color , font=font)
                frame_image.save(str(frame) + 'ok.png')
        elif frame < (fade_in_duration + stay_duration) * fps:  # 停留阶段
            for text_param in text_params:
                alpha = 255
                x_current, y_current = text_param['end_pos']
                font = ImageFont.truetype(text_param['font'], text_param['size'])
                color = ImageColor.getrgb(text_param['color'])
                draw.text((x_current, y_current), text_param['text'], fill=color + (int(alpha),), font=font)

        elif frame < (fade_in_duration + stay_duration + fade_out_duration) * fps:  # 淡出阶段
            progress = (frame - (fade_in_duration + stay_duration) * fps) / (fade_out_duration * fps)
            for text_param in text_params:
                                
                alpha_start,alpha_end = text_param['alpha']
                alpha_current = alpha_end + (alpha_start - alpha_end) * ease_function(progress)
                
                x_start, y_start = text_param['start_pos']
                x_end, y_end = text_param['end_pos']
                x_current = x_end + (x_start - x_end) * ease_function(progress)
                y_current = y_end + (y_start - y_end) * ease_function(progress)
                font = ImageFont.truetype(text_param['font'], text_param['size'])
                color = ImageColor.getrgb(text_param['color'])
                draw.text((x_current, y_current), text_param['text'], fill=color + (int(alpha),), font=font)

        # 添加当前帧图像到列表中
        text_images.append(frame_image)

    return text_images

# 设置视频参数
width, height = 640, 480
fps = 30
duration = 4  # 秒

# 设置文本参数
text_params = [
    {
        'text': 'Hello',
        'font': 'arial.ttf',
        'size': 36,
        'color': '#225500',
        'alpha': (0,100),
        'start_pos': (100, 100),
        'end_pos': (500, 100)
    }
]

# 生成逐帧图像，使用 ease_in_out 缓动函数
text_frames = move_and_fade_in_out((width, height), text_params, duration, ease_out)
text_frames[12].show()

# 保存视频
out = cv2.VideoWriter('text_animation.mp4', cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
for frame_image in text_frames:
    frame_bgr = cv2.cvtColor(np.array(frame_image), cv2.COLOR_RGBA2BGR)
    out.write(frame_bgr)
out.release()




























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
    
    