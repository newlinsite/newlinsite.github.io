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
	"d_wweb",
	"d_kud",
	//----------------------
	"d_wall",
	"v_vis",
	"v_ino",
	"v_3d"
]

var worknameBoxFull = [
	"portfolio",
	//----------------------
	"All-in-One Streaming Studio </br> Solution Application.",
	"Text-to-Speech </br> AI Application",
	"Future Training Room",
	"Virtual USB Video Streaming </br>Windows Tool",
	"Design system",
	//----------------------
	"SO!Eyewear Website",
	"Official Website Optimization ",
	"Gaming KVM Adapter Application",
	"Chunlin Official Website",
	"Creator-oriented </br>e-commerce platform",
	//----------------------
	"Road Construction </br>Noise Control System",
	"VIS / Visual Design",
	"Infographic Design",
	"3D Render"
]


//查找作品順序
console.log(workName)
var workNumber = worknameBox.indexOf(workName)

console.log(workNumber)


//--------------------
//	input index work name/link
//--------------------
if (workNumber == 0) {
	let h3 = $tag("h3")
	let link = $tag("a")
	for (let i = 0; i < h3.length; i++) {
		h3[i].innerHTML = worknameBoxFull[i + 1];
		link[i].href = worknameBox[i + 1] + ".html#img01"
	}
}


//--------------------
//	input work name and image
//--------------------
if (workNumber > 0) {
	$tag("title")[0].innerHTML = worknameBoxFull[workNumber].replace('</br>', '')
	$tag("h1")[0].innerHTML = worknameBoxFull[workNumber]
	let img = $tag("img")
	for (let i = 0; i < img.length; i++) {
		let imgType = ".png"
		if (img[i].alt == "svg") {
			imgType = ".svg"
		} else if (img[i].alt == "gif") {
			imgType = ".gif"
		}
		img[i].src = "image/" + worknameBox[workNumber] + i + imgType
		console.log(img[i].src)
	}
}





//--------------------------------
//
//			Header/footer
//
//--------------------------------

var header = $tag("header")
var footer = $tag("footer")

// input Header
var headerHtml = '\
			<div class="container row flex-align-end">\
				<a href="index.html"><img src="image/logo.png" alt="" class="logo"></a>\
				<ul class="row flex-jus-end">\
					<li><a href="index.html">Works</a></li>\
					<!-- <li><a href="about.html">Blog</a></li> -->\
					<li><a href="about.html">Resume</a></li>\
				</ul>\
				<!--<div class="sidebar row flex-dir-col">\
					<a href="index.html">home</a>\
					<a class="block now" href="index.html">Works</a>\
				</div>-->\
			</div>'

header[0].innerHTML = headerHtml;


// input footer
var footerHtml = '\
	<div class="container">123\
	</div>'

footer[0].innerHTML = footerHtml;




// Header smaller

document.addEventListener('scroll', function (e) {
	if (window.scrollY != 0) {
		header[0].classList.add("sm");
	} else {
		header[0].classList.remove("sm");
	}
})





