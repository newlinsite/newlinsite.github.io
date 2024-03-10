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





"""## ---------------------------------------

# 影片参数

videoBg = "bg01.png"
vSizeW, vSizeH =  Image.open( videoBg ).size

videoSec = 4
fps = 30
videoLen = videoSec * fps

textCn = ['Hello']
textEn = ['Hello 123444' ]


# 设置文本参数
textParams= [
    {
        'text': textCn[0],
        'font': 'font/NotoSansTC-Regular.ttf',
        'size':      36,
        'color':     '#225500',
        'alpha':     (0,100),
        'start_pos': (100, 100),
        'end_pos':   (500, 100)
    },
    {
        'text': textEn[0],
        'font': 'font/NotoSansTC-Regular.ttf',
        'size':      100,
        'color':     '#225500',
        'alpha':     (50,100),
        'start_pos': (100, 500),
        'end_pos':   (500, 500)
    }
]

# 生成逐帧图像
text01 = newText((vSizeW, vSizeH), textParams[0], easeOut, 0.5, 1, 1)
text02 = newText((vSizeW, vSizeH), textParams[1], easeOut, 0.5, 1, 1)


videoFrames = newVideo(videoBg, videoLen)
mergeFs(videoFrames, 0, text01)
mergeFs(videoFrames, 0.5, text02)


clip = imageToVideo(videoFrames,True , "output.mp4")


"""






