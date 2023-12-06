# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.


https://www.youtube.com/watch?v=wm9yR1VspPs

"""




"""  --------------------------------------------------------------------


1. 簡單線性回歸


"""  



# 讀資料 ----------------------------------------------------------------------

import pandas as pd



data = pd.read_csv("Salary_Data.csv")

# y = w*x + b
x = data["YearsExperience"]
y = data["Salary"]





# 畫圖表 ----------------------------------------------------------------------

import matplotlib.pyplot as plt
import matplotlib as mpl

#安裝中文字體
import wget
from matplotlib.font_manager import fontManager
wget.download("https://github.com/GrandmaCan/ML/raw/main/Resgression/ChineseFont.ttf")
fontManager.addfont("ChineseFont.ttf")
mpl.rc('font', family="ChineseFont")


plt.scatter(x, y, marker="x", color="red")
plt.title("年資-薪水")
plt.xlabel("年資")
plt.ylabel("月薪(千)")
plt.show()




# Cost funcion --------------------------------------------------

def lineCostComputer(x, y, w, b):
    y_p  = x*w + b
    cost = (y_p - y)**2
    return cost


def lineCostsssComputer(x, y, w, b):
    costs = lineCostComputer(x, y, w, b).mean()
    return costs



y_p  = x*w + b
cost = (y_p - y)**2
costs = lineCostComputer(x, y, w, b).mean()

# 畫預設線與原始資料圖表 的功能 --------------------------------------------------


def plotPrint(x, y, w, b):
  y_p = x*w + b
  cost = lineCostComputer(x, y, w, b)
  
  plt.plot(x, y_p, color="blue", label="預測線")
  plt.scatter(x, y, marker="x", color="red", label="真實數據")
  plt.plot(x, cost**0.5, color="green", alpha=0.7, label="cost",linestyle="--")
  plt.fill_between(x, cost**0.5, color="green", alpha=0.1)  # 添加面积阴影
    
  plt.title("年資-薪水")
  plt.xlabel("年資")
  plt.ylabel("月薪(千)")
  plt.xlim([0, 12])          #最大最小值
  plt.ylim([-50, 200])
  plt.legend()               #新增圖例
  plt.show()
  print("cost:",f"{lineCostsssComputer(x, y, w, b): .3f}")


# 新增互動 Slider spyder 不能用...
#from ipywidgets import interact
#interact(plotPrint,x=x, y=y , w=(-100, 100, 1), b=(-100, 100, 1))


plotPrint(x, y, -5, 100)





#-----------------------------------------------------------------------------

# 尋找最小 Cost

#-----------------------------------------------------------------------------



import numpy as np

# 找出最小w ------------------------------------------------------------------
costs = []
for w in range(-100,100):
    cost = lineCostsssComputer(x, y, w, 0)
    costs.append( cost )    

plt.plot(range(-100,100), costs,  color="blue", )
plt.show()




# 窮舉找出最小 w b ---------------------------------------------------------------

ws = np.arange(-200, 201)
bs = np.arange(-200, 201)
costs = np.zeros((401, 401))

i = 0
for w in ws: 
  j = 0
  for b in bs: 
    cost = lineCostsssComputer(x, y, w, b)
    costs[i,j] = cost
    j = j+1
  i = i+1


# 畫3D圖

plt.figure(figsize=(7, 7))         #長寬
ax = plt.axes(projection="3d")
ax.view_init(15, 60)               #視角
ax.xaxis.set_pane_color((0, 0, 0)) #底顏色
ax.yaxis.set_pane_color((0, 0, 0))
ax.zaxis.set_pane_color((0, 0, 0))


b_grid, w_grid = np.meshgrid(bs, ws)
# https://wangyeming.github.io/2018/11/12/numpy-meshgrid/
ax.plot_surface(w_grid, b_grid, costs, cmap="Spectral_r", alpha=0.7)
ax.plot_wireframe(w_grid, b_grid, costs, color="black", alpha=0.1)

#文字/標籤
ax.set_title("w b 對應的 cost")
ax.set_xlabel("w")
ax.set_ylabel("b")
ax.set_zlabel("cost")

#找出最低數值印出來
w_index, b_index = np.where(costs == np.min(costs))
ax.scatter(ws[w_index], bs[b_index], costs[w_index, b_index], color="red", s=40)

plt.show()

print(f"當w={ws[w_index]}, b={bs[b_index]} 會有最小cost:{costs[w_index, b_index]}")







#-----------------------------------------------------------------------------

# 尋找最小 梯度下降

#-----------------------------------------------------------------------------


#梯度計算器----------------------------------------------------------
def gradientComputer(x, y, w, b):
    wGradient = (2*x*( x*w + b - y)).mean()    # *2是分微分 其實可以刪掉
    bGradient = (2*( x*w + b - y)).mean()      # *2 其實可以刪掉
    return  wGradient, bGradient


def gradientDescent(x, y, w0, b0, learnRate, costFction, gradientFunction, runIter, printIter=1000):
    
    w = w0
    b = b0
    
    #儲存空間
    wBox = []
    bBox = []
    costBox = []
    
    for i in range(runIter):
        #計算初始梯度
        wG, bG = gradientFunction(x, y, w, b)
        costs = costFction(x, y, w, b)
        
        #儲存資料
        wBox.append(w)
        bBox.append(b)
        costBox.append(costs)
        
        #梯度下降
        w = w - wG * learnRate
        b = b - bG * learnRate
                
        # 輸出，全部顯示太多，每一千次顯示一次
        if i%printIter == 0: 
            print(f"{i:5}  w: {w: .3f},wG{wG: .3f}, b: {b: .3f},bG{bG: .3f}, costs:{costs:.3f}")
        
    return(w, b, wBox, bBox, costBox)
    


wF,bF,wBox,bBox,costBox = gradientDescent(x, y, -100, -100, 0.001, lineCostsssComputer, gradientComputer, 10000, 1000)


# 畫 cost 下降圖---------------------------------------------------------------
plt.plot(np.arange(0,1000), costBox[0:1000], color="blue")
plt.xlabel("更新次數")
plt.ylabel("cost")
plt.show()



# 畫 3D 下降過程圖--------------------------------------------------------------

plt.figure(figsize=(7, 10))         #長寬
ax = plt.axes(projection="3d")
ax.view_init(20, -65)               #視角
ax.xaxis.set_pane_color((0.9, 0.9, 0.9)) #底顏色
ax.yaxis.set_pane_color((0.9, 0.9, 0.9))
ax.zaxis.set_pane_color((0.9, 0.9, 0.9))

#畫w,b Cost 需先蓋好 b_grid, w_grid  在上面
b_grid, w_grid = np.meshgrid(bs, ws)
ax.plot_surface(w_grid, b_grid, costs, cmap="Spectral_r", alpha=0.7)
ax.plot_wireframe(w_grid, b_grid, costs, color="black", alpha=0.1)

#cost 過程
ax.plot(wBox, bBox, costBox, color="black", alpha=0.9)

#找出最低數值印出來
w_index, b_index = np.where(costs == np.min(costs))
ax.scatter(ws[w_index], bs[b_index], costs[w_index, b_index], color="red", s=40)
ax.scatter(wBox[0], bBox[0], costBox[0], color="green", s=40)

#文字/標籤
ax.set_title("w b 對應的 cost")
ax.set_xlabel("w")
ax.set_ylabel("b")
ax.set_zlabel("cost")

 
plt.show()





#最後檢查
plotPrint(x, y, 9.124, 28.011)






#看看方程式
ax = np.arange(-90, 90,0.1)


ay = 0.001*ax**5 + ax**3 + 10*ax**2 + ax
ay = 2*ax**3 - 3*ax**2 - 12*ax - 3
ay = ax**2 + 2*ax + 1

plt.xlim([-2, 3])          #最大最小值
plt.ylim([-25, 5])

plt.axhline(y=0)#x軸
plt.axvline(x=0)#y軸
plt.plot(ax, ay, color="blue", label="預測線")
plt.show()

#解方程式
np.roots([1,2,1]) # x**2 + 2x + 1
np.roots([2,1])   # 2x +1


