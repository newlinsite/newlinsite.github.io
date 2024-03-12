// 引入 library
const express = require('express');
// express 引入的是一個 function
const app = express();
// 建立一個不易產生衝突的 port 用來測試
const port = 5001;



// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get('/hello', (req, res) => {
    res.send('hello world!')
})

app.get('/bye', (req, res) => {
    res.send('bye!')
})


const path = require('path');
// 使用express.static中間件提供靜態資源
app.use(express.static(path.join(__dirname, 'public')));


// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})









