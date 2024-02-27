"""
Created on Tue Feb 27 19:45:20 2024

@author: newlin
"""



from moviepy.editor import *
from PIL import Image, ImageFont, ImageDraw



img = Image.new('RGBA', (360, 180))                       # 建立色彩模式為 RGBA，尺寸 360x180 的空白圖片
font = ImageFont.truetype('font/NotoSansTC-Regular.ttf', 40)   # 設定字型與尺寸
draw = ImageDraw.Draw(img)                                # 準備在圖片上繪圖
# 將文字畫入圖片
draw.text((10,120),'OXXO.STUDIO',fill=(255,255,255),font=font,stroke_width=2,stroke_fill='red')
draw.text(xy=(50,0), text='大家好\n哈哈', align='center', fill="#ffffff", font=font, stroke_width=2, stroke_fill="#111222")
img.save('ok.png')    # 儲存為 png





video = VideoFileClip("../aten/MRS/element/video.mp4")         # 讀取影片
# 以下功能需要 pillow 降板才能使用， pip install pillow==9.4.0
clip = video.resize((360,180)).subclip(1,10)   # 縮小影片尺寸，剪輯出 10～12 秒的片段
text_clip = ImageClip("ok.png", transparent=True).set_duration(2)   # 讀取圖片，將圖片變成長度兩秒的影片

output = CompositeVideoClip([clip, text_clip])  # 混合影片
output.write_videofile("output.mp4",temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")

print('ok')
