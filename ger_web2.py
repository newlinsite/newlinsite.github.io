# -*- coding: utf-8 -*-
"""
Created on Wed Jun 28 17:40:21 2023

@author: newlin
"""


import requests
import pandas as pd
import time
import datetime
import random
import re

import urllib3
urllib3.disable_warnings()



#-------------資訊----------------------------

   
url_index_template = "https://www.thenewslens.com/latest-article/page"
url_indexPage = 10





user_agent = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36' #偽裝使用者
headers = {'User-Agent': user_agent,
          #'server': 'PChome/1.0.4',
          #'Referer': 'https://mall.pchome.com.tw/newarrival/'
          }



#-------------獲取目錄----------------------------

index_df = pd.DataFrame()
for pageNo in range(url_indexPage):     
      
    
    url_index = url_index_template + str(pageNo+1)
    if pageNo==0:
        url_index = "https://www.thenewslens.com/latest-article"
    print("page : "+ str(pageNo+1))    
        
    index_res = requests.get(url=url_index,headers=headers, verify=False).text
    
    # 使用正則表達式找到所有符合的文字
    index_res2 = re.sub(r'\n', '', index_res)
    index_res2 = re.findall(r'.*?<div class="img-box"> <a href="https://www.thenewslens.com/article/(\d+)" title="(.*?)" class="', index_res2)
    

          
    # 將提取的資料轉換為 DataFrame
    index_data = pd.DataFrame(index_res2, columns=['articleNo', 'title'])
    index_df =  pd.concat([index_df, index_data], ignore_index=True)
    
    time.sleep(random.uniform(0.5,1))


index_df = index_df.drop_duplicates(subset=['articleNo']).reset_index(drop=True)




#-------------爬ing----------------------------

df = pd.DataFrame()
df_en = pd.DataFrame()


for i in range(len(index_df)): 
    
    articleNo = index_df.loc[i, 'articleNo'] 
    
    url = "https://www.thenewslens.com/article/" + articleNo
    print('Page ----- ' + str(articleNo),url)
    
    #-------------資料倒入----------------------------

    res_text = requests.get(url=url,headers=headers, verify=False).text    
          
    start_marker = '"articleBody":"'
    start_index = res_text.find(start_marker)

    if start_index != -1:
        start_index += len(start_marker)
        end_index = res_text.find('</script>', start_index)
        if end_index != -1:
            article_body = res_text[start_index:end_index]
            article_body = str(article_body.encode('utf-8').decode('unicode-escape'))
            
            
    article_body = re.sub(r'\{"name":.*?"channel_name":\[\]\}\}', '', article_body)
    article_body = article_body.split("新聞來源", 1)[0].strip()
    article_body = article_body.split("延伸閱讀 ", 1)[0].strip()
    
            

            
         
    data = pd.DataFrame({'content': [article_body]})
    df =  pd.concat([df, data], ignore_index=True)

    
    #取出英文字
    english_words = re.findall(r'[a-zA-Z]+', article_body)
    data_en = pd.DataFrame({'english_words': english_words})
    df_en  =  pd.concat([df_en , data_en], ignore_index=True)
    
    time.sleep(random.uniform(0.4,2))





#計算英文字，並變成表格
df_en = df_en.value_counts().reset_index()

substring = df[1929:1930]

#------------輸出----------------------------
file_output_date = datetime.datetime.now().strftime('%Y-%m-%d')
fileNameTag = str(url_indexPage) + '_' + file_output_date

index_df.to_excel('output_index_' + fileNameTag +'.xlsx', index=False)
df.to_excel('output_content_' + fileNameTag +'.xlsx', index=False)
df_en.to_excel('output_en_' + fileNameTag +'.xlsx', index=False)

