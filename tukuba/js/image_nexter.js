
var scrollSession = $css("scrollSession")
var nextBtn = $("nextBtn")
var lastBtn = $("lastBtn")
var nextBtnHights = []



function createNextBtn() {
    for (i = 0; i < scrollSession.length; i++) {
        if (window.scrollY > scrollSession[i].offsetTop) {
            let j = i + 2
            lastBtn.href = "#img0" + i
            nextBtn.href = "#img0" + j
            lastBtn.classList.remove("hidden")
            nextBtn.classList.remove("hidden")
            if (i == 0) {
                lastBtn.classList.add("hidden")
            }
            if (i == scrollSession.length - 2) {
                nextBtn.classList.add("hidden")
            }
            break;
        } else {
            break;
        }
    }
}


window.onload = function () {
    // nextBtn.href = "#img01"
    createNextBtn()
    for (let i = 0; i < scrollSession.length; i++) {
        nextBtnHights.push(scrollSession[i].offsetTop)
    }
    window.addEventListener("scroll", function () {
        createNextBtn()
    })
    nextBtn.classList.remove("hidden")
}

