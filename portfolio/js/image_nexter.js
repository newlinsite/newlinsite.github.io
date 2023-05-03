
var scrollSession = $css("scrollSession")
var nextBtn = $("nextBtn")
var lastBtn = $("lastBtn")
var nextBtnHights = []


// console.log(scrollSession[6]])

function createNextBtn() {
    for (i = 0; i <= nextBtnHights.length; i++) {
        if (window.scrollY + 1 < nextBtnHights[i]) {
            let j = i - 2
            // console.log(i, j, window.scrollY + 1, nextBtnHights[i])
            lastBtn.href = "#img0" + j
            nextBtn.href = "#img0" + i
            lastBtn.classList.remove("hidden")
            nextBtn.classList.remove("hidden")
            if (i == 1) {
                lastBtn.classList.add("hidden")
            }
            if (i == scrollSession.length) {
                nextBtn.classList.add("hidden")
            }
            break;
        }
    }
}



window.onload = function () {
    //建立高度表
    for (let i = 0; i < scrollSession.length; i++) {
        nextBtnHights.push(scrollSession[i].offsetTop)
    }
    //將高度列表最後加入一個偵測用的假數字
    nextBtnHights.push(scrollSession[scrollSession.length - 1].offsetTop + 100)

    createNextBtn()
    window.addEventListener("scroll", function () {
        createNextBtn()
    })
    nextBtn.classList.remove("hidden")



    //Loading
    $("loadingMask").classList.add("over")
}

