

"""Synthesizes speech from the input string of text or ssml.
Make sure to be working in a virtual environment.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/
"""
from google.cloud import texttospeech

# Instantiates a client
client = texttospeech.TextToSpeechClient()

def tts(content , viodeCode , contentType = "text"):
    
    # 聲優表
    voiceMap = {
        "tw-A": {"language": "cmn-TW", "name": "cmn-TW-Wavenet-A"},#f
        "tw-B": {"language": "cmn-TW", "name": "cmn-TW-Wavenet-B"},
        "tw-C": {"language": "cmn-TW", "name": "cmn-TW-Wavenet-C"},
        "jp-B-n": {"language": "ja-JP",  "name": "ja-JP-Neural2-B"}, #f
        "jp-C-n": {"language": "ja-JP",  "name": "ja-JP-Neural2-C"}, 
        "jp-D-n": {"language": "ja-JP",  "name": "ja-JP-Neural2-D"}, 
        "jp-A": {"language": "ja-JP",  "name": "ja-JP-Wavenet-A"}, #f
        "jp-B": {"language": "ja-JP",  "name": "ja-JP-Wavenet-B"}, #f
        "jp-C": {"language": "ja-JP",  "name": "ja-JP-Wavenet-C"}, 
        "jp-D": {"language": "ja-JP",  "name": "ja-JP-Wavenet-D"}, 
        "us-A-n":   {"language": "en-US",  "name": "en-US-Neural2-A"},
        "us-C-n":   {"language": "en-US",  "name": "en-US-Neural2-C"}, #f
        "us-D-n":   {"language": "en-US",  "name": "en-US-Neural2-D"},
        "us-E-n":   {"language": "en-US",  "name": "en-US-Neural2-E"}, #f
    }

    
    if viodeCode in voiceMap:
        
        # 根據 聲優表 語音代碼與聲音
        voiceAttr = voiceMap[viodeCode]
        print(voiceAttr["language"] + " " + voiceAttr["name"] + contentType + " : " + content )
    
        # Set the text input to be synthesized
        if contentType == "ssml":
            synthesis_input = texttospeech.SynthesisInput(ssml = content)
            
        else:
            synthesis_input = texttospeech.SynthesisInput(text = content)
        
        voice = texttospeech.VoiceSelectionParams(
            language_code = voiceAttr["language"],
            name = voiceAttr["name"]
            #ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
        )
        
        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        
        # TTSing , voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        return response
    else:
        print("wrong voice code")


def voiceOuput(voice,name):
    with open( name + ".mp3", "wb" ) as out:
        # Write the response to the output file.
        out.write(voice.audio_content)
        print('save -  ' + name + '.mp3"')
    


#%%
'''
    ssml tag
    <break time="200ms"/>
    <say-as interpret-as="characters">can</say-as>
    <say-as interpret-as='telephone' google:style='zero-as-zero'>1800-202-1212</say-as>
  　<say-as interpret-as="verbatim">abcdefg</say-as>
 　 <say-as interpret-as="date" format="yyyymmdd" detail="1">
    1960-09-10
  　</say-as>
   嗶嗶聲
   <say-as interpret-as="expletive">censor this</say-as> 
   段落
   <p><s>This is sentence one.</s><s>This is sentence two.</s></p>
   別名
   <sub alias="World Wide Web Consortium">W3C</sub>
   <sub alias="にっぽんばし">日本橋</sub>
   
   Go from <mark name="here"/> here, to <mark name="there"/> there!
   
   速度 音高
   <prosody rate="slow" pitch="-2st">Can you hear me now?</prosody>
   重音
   <emphasis level="moderate">This is an important announcement</emphasis>
   破音字
   <phoneme alphabet="ipa" ph="ˌmænɪˈtoʊbə">manitoba</phoneme>
   <phoneme alphabet="x-sampa" ph='m@"hA:g@%ni:'>mahogany</phoneme>
'''



    
#%%


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
    



voiceMap = {
    "ch-F": "tw-A",
    "ch-M": "tw-B",
    "jp-F": "jp-A", 
    "jp-M": "jp-C", 
}



# 主題
df = pd.read_excel("wordList.xlsx")
ThemeCol = 'type'
Theme = '職場'
languages = ["ch","jp"]
voiceGander = ["F","M"]

for lang in languages:
    textList = df.loc[ df[ThemeCol] == Theme, lang].tolist()
    nameList = df.loc[ df[ThemeCol] == Theme, 'ch'].tolist()
    idList = df.loc[ df[ThemeCol] == Theme, "id"].tolist()
    
    for gender in voiceGander:
        voice = voiceMap[lang + "-" + gender]
        
        for text, ID, name in zip(textList, idList, nameList):
            vocie = tts( text , voice )
            audioOutputUrl = "tts/" + Theme + "_" + name  + "_" + lang + "-" + gender + "_" +  str(ID)
            voiceOuput(vocie, audioOutputUrl)




playSound(audioOutputUrl + ".mp3")





















    