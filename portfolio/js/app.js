// Function
var $ = function (name) {
	return document.getElementById(name)
}
var $css = function (name) {
	return document.getElementsByClassName(name)
}
var $tag = function (name) {
	return document.getElementsByTagName(name)
}




//--------------------------------------------
//
//		input name , work image
//
//--------------------------------------------


//--------------------
//	定義是哪個作品
//--------------------

var worknameBox = [
	"home",
	//----------------------
	"d_uc",
	"d_tts",
	"d_ftr",
	"d_uvc",
	"d_ds",
	//----------------------

	"d_so",
	"d_ofweb",
	"d_game",
	"d_wall",
	"d_vrbot",
	"d_ar",
	// "d_wweb",
	//----------------------
	"v_vis",
	"v_ino",
	"v_3d",
	//----------------------
	"c_auto_tag",
	"c_auto-matome",
	"c_demo",
	"c_party",
	"c_test",
	"c_an",
	"d_wall"
]
var worknameBoxTag = [
	["home"],
	//----------------------
	["Scenario Definition", "Software PRD", "iPad UI Design", "Design Library"],
	["AI Interact Design", "Website", "B2B Solution"],
	["Scenario Definition", "IoT Control System Design"],
	["Window AP Design", "Streaming", "UI Flow"],
	["UI Library", "APP icon", "interaction flow library"],
	//----------------------

	["Website", "Frond-end", "SEO", "Google Analysis"],
	["User Research", "Re-design", "User Journey Map"],
	["Gaming", "First Use", " Tutorial"],
	["Product design", "Field research"],
	["Product design", "VR"],
	["AR", "Concept Design"],
	// ["Google Analytics", "Website"],
	//----------------------
	["Visual System", "Poster", "Illustration", "Animations"],
	["Infographic", "Flow", "Scenario Illustration"],
	["3D max", "V-ray", "Industral Design"],
	//----------------------
	["python", "AI", "data"],
	["python", "AI"],
	["JavaScript", "After Effects"],
	["JavaScript", "Web Audio API"],
	["JavaScript", "Usability test Tools"],
	["JavaScript", "After Effects"],
	""
]
var worknameBoxFull = [
	"portfolio",
	//----------------------
	"All-in-One Streaming Studio </br> Solution Application",
	"Text-to-Speech </br> AI Solution",
	"Future Training Room",
	"Virtual USB Video Streaming </br>Windows Tool",
	"Design system",
	//----------------------
	"SO!Eyewear Website",
	"Official Website Optimization ",
	"Gaming KVM Adapter Application",
	"Road Construction </br>Noise Control System",
	"Remote VR Interactive Robot",
	"Reality Plus",
	// "Chunlin Official Website",
	//----------------------
	"VIS / Visual Design",
	"Infographic Design",
	"3D Render",
	//----------------------

	"Experimentation of Structuring  <br> Unstructured Data,	and Visualization",
	"Automated Tool for Interview Transcript <br>and Summary Generation",
	"Overcoming Costly On-Site Demos: <br>Virtual Demo Room Solution for Pro AV Sales",
	"Party Game",
	"Prototypes and Tools",
	"The interactive animation</br>for a marketing campaign",
	"Nosice control system"
]


//查找作品順序
try {
	var workNumber = worknameBox.indexOf(workName)
	console.log(workNumber, workName)

} catch {
	console.log("There is not work page")
}










//--------------------
//	input INDEX work name/link
//--------------------
if (workNumber == 0) {
	let h3 = $tag("h3")
	let link = $css("card-link")
	let tagBox = $css("detail_box")
	for (let i = 0; i < h3.length; i++) {
		h3[i].innerHTML = worknameBoxFull[i + 1];
		link[i].href = worknameBox[i + 1] + ".html#img00"
		link[i].style = "background-image: url(../image/cover_" + worknameBox[i + 1] + ".png);"
		let tag = ""
		for (let j = 0; j < worknameBoxTag[i + 1].length; j++) {
			tag = tag + "<p class=\"tag\">" + worknameBoxTag[i + 1][j]; +"</p>"
		}
		tagBox[i].innerHTML = tag
	}
}


//--------------------
//	input cover me interact
//--------------------
try {
	let coverMe = $("cover-me")

	let scrollX = document.documentElement.scrollTop / 60 - 80
	let scrollY = document.documentElement.scrollTop / 10 - 100
	let rotate = document.documentElement.scrollTop / 100
	let x = 0
	coverMe.style = "transform: translate(" + scrollX + "px," + scrollY + "px) "
	window.addEventListener("mousemove", function (e) {
		x = (e.x + e.y) / 30
		coverMe.style = "filter: hue-rotate(" + x + "deg);transform: translate(" + scrollX + "px," + scrollY + "px) rotate(" + rotate + "deg);"
	})
	window.addEventListener("scroll", function (e) {
		scrollX = document.documentElement.scrollTop / 60 - 80
		scrollY = document.documentElement.scrollTop / 10 - 100
		rotate = document.documentElement.scrollTop / 100
		coverMe.style = "filter: hue-rotate(" + x + "deg);transform: translate(" + scrollX + "px," + scrollY + "px) rotate(" + rotate + "deg);"
	})
} catch {
	console.log("There is no coverme")
}





//--------------------
//	input work name , image , next/last work
//--------------------
if (workNumber > 0) {
	$tag("title")[0].innerHTML = worknameBoxFull[workNumber].replace('</br>', '')
	$tag("h1")[0].innerHTML = worknameBoxFull[workNumber]

	//input image
	let img = $tag("img")
	let j = 0
	for (let i = 0; i < img.length; i++) {

		let imgType = ".png"
		if (img[i].alt == "svg") {
			imgType = ".svg"
		} else if (img[i].alt == "gif") {
			imgType = ".gif"
		}
		if (img[i].alt != "no") {
			num = i - j
			img[i].src = "../image/" + worknameBox[workNumber] + num + imgType
		} else {
			j++
		}

	}

	//input side bar
	try {
		$("sidebar").classList.add("row")
		$("sidebar").classList.add("flex-dir-col")
		$("sidebar").innerHTML = '<div class="row flex-dir-col">\
				<a class="mt-xl" href="index.html">Home</a>\
				<a id="nextwork" class="icon" href="#">chevron_right<div id="nextwork-describe"></div></a>\
				<a id="lastwork" class="icon" href="#">chevron_left<div id="lastwork-describe"></div></a>\
			</div>\
			<a href="#">Top</a>'

		//導入上下一個作品按鈕連結
		if (workNumber == 1) {
			$("lastwork").classList.add("hidden")
		} else if (workNumber == worknameBox.length) {
			$("nextwork").classList.add("hidden")
		}
		$("nextwork").href = worknameBox[workNumber + 1] + ".html#img00"
		$("lastwork").href = worknameBox[workNumber - 1] + ".html#img00"
		$("nextwork-describe").innerHTML = '<img src="../image/cover_' + worknameBox[workNumber + 1] + '.png">' + "<span>" + worknameBoxFull[workNumber + 1] + "</span>"
		$("lastwork-describe").innerHTML = '<img src="../image/cover_' + worknameBox[workNumber - 1] + '.png">' + "<span>" + worknameBoxFull[workNumber - 1] + "</span>"
		// $("lastwork-describe").innerHTML = worknameBoxFull[workNumber - 1]
	} catch {
		console.log("It's no side bar here")
	}
}

//--------------------
//	input .imgbox.fold 
//--------------------
try {
	var imgboxFold = $css("imgbox fold")
	var imgFold = $css("img-fold")
	var imgFoldSingal = [1, 1]
	for (let i = 0; i < imgboxFold.length; i++) {
		imgboxFold[i].addEventListener("click", function () {
			if (imgFoldSingal[i] == 1) {
				imgboxFold[i].style = "height:" + imgFold[i].clientHeight + "px"
				imgboxFold[i].classList.add("unfolded")
				imgboxFold[i].classList.remove("folded")
				imgFoldSingal[i] = 0
			} else {
				imgboxFold[i].style = "height: 480px"
				imgboxFold[i].classList.add("folded")
				imgboxFold[i].classList.remove("unfolded")
				imgFoldSingal[i] = 1
			}
		})
	}
} catch {
	console.log("no fold image")
}







//--------------------------------
//
//			Header/footer
//
//--------------------------------
// input Header
try {
	var header = $tag("header")
	var headerHtml = '\
			<div class="container">\
				<a href="index.html">\
					<div class="logo">\
						<div></div>\
					</div>\
				</a>\
				<ul class="row flex-jus-end">\
					<li><a href="index.html">Works</a></li>\
					<li><a href="about_jp.html">Resume</a></li>\
				</ul>\
			</div>'
	header[0].innerHTML = headerHtml;


	// Header smaller
	var LastScrollY = 0
	document.addEventListener('scroll', function (e) {
		let scrollY = window.scrollY
		if (scrollY == 0) {
			header[0].classList.remove("sm");
			header[0].classList.remove("md");
		} else if (scrollY > LastScrollY) {
			header[0].classList.remove("md");
			header[0].classList.add("sm");
		} else {
			header[0].classList.remove("sm");
			header[0].classList.add("md");
		}
		LastScrollY = scrollY
	})
} catch {
	console.log("noheader")
}

// input footer
try {
	var footer = $tag("footer")
	var footerHtml = '\
			<div class="container">\
			<div class="session-border pt-md pb-md">\
				<div class="row flex-jus-c">\
					<div class="col-3 col-md-4 col-xsm-12 text-xsm-center">\
						<h2 style="font-size:16px">林新翔 / LIN SIN-SIANG</h2>\
						<h5 style="font-size:15px">UI/UX Designer</h5>\
					</div>\
					<div class="col-5 col-md-4 col-xsm-12 row-xsm flex-xsm-jus-c">\
						<div class="row flex-align-c">\
							<img src="../image/icon_email.png">\
							<p class="mb-xxs">newslining@gmail.com</p>\
						</div>\
						<a class="row flex-align-c" href="https://www.linkedin.com/in/sin-siang-lin/" target="_blank">\
							<img src="../image/icon_linkedin-rect.png">\
							<p>linkedin sin-siang-lin</p>\
						</a>\
					</div>\
					<div class="col-4 col-xsm-12 text-xsm-center mt-sm-sm">\
						<a href="about_jp.html" class="btn">Recume <span class="icon"> arrow_forward</span>\
						</a>\
					</div>\
				</div>\
			</div>\
			</div>\
			<div id="loadingMask" class="">\
			<svg viewBox="25 25 50 50">\
				<circle cx="50" cy="50" r="20"></circle>\
			</svg>\
		</div>'
	footer[0].innerHTML = footerHtml;
} catch {
	console.log("nofooter")
}






//--------------------------------
//
//			Loading
//
//--------------------------------
try {
	$("loadingMask").classList.add("over")
} catch {
	console.log("no Loading Mask")
}

window.onload = function () {
	try {
		$("loadingMask").classList.add("over")
	} catch {
		console.log("no Loading Mask")
	}

}

