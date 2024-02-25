

import pandas as pd

price= 50
count_t=3600
price_t=price*count_t

buy=1

# percent=count_buy/count_t

expectedValue_last = 0
for buy in range(1,3600):
    expectedValue=buy/3600*(3600-buy)*50
    if expectedValue<expectedValue_last:
        print(expectedValue)
        break
    expectedValue_last=expectedValue


