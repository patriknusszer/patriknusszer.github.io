/* function modSelection() {
	var selected = document.getElementsByClassName('selected')[0]

	if (selected) {
		var oldsz = selected.offsetWidth
		var pseudoe = document.createElement('div')
		pseudoe.innerHTML = selected.innerHTML
		pseudoe.style.visibility = 'hidden'
		pseudoe.style.fontFamily = 'LatoWebMedium'
		pseudoe.style.position = 'absolute'
		document.getElementsByTagName("body")[0].appendChild(pseudoe)
		// reflow(pseudoe)

		var newsz = pseudoe.offsetWidth
		console.log(newsz)
		var szdiff = newsz - oldsz
		console.log(szdiff)
		var cstyle = window.getComputedStyle(selected)
		var ml = parseInt(cstyle.marginLeft.substring(0, cstyle.marginLeft.indexOf('px')))
		selected.style = 'margin-left: ' + (ml - szdiff) + 'px font-family: LatoWebMedium'
	}
} */

var bkg

window.addEventListener('DOMContentLoaded', (event) => {
	// modSelection()
	bkg = document.getElementById('background')

	/* if (bkg && (/Android|iPhone|iPad|iPod|BlackBerry/).test(navigator.userAgent || navigator.vendor || window.opera)) {
		bkg.style.top = 'auto'
		bkg.style.bottom = '0px'
		window.onresize = resizeBkg()
	} */
})

function resizeBkg() {
	// bkg.style.height = screen.height
}

var canRemove = false

if (matchMedia) {
	var mq = window.matchMedia("(max-width: 770px)")
	mq.addListener(widthMobile)
	widthMobile(mq)
}

function widthMobile(mq) {
	if (mq.matches) {
		var navbar = document.getElementById("navbar")
		canRemove = true

		if (!navbar) {
			document.addEventListener("DOMContentLoaded", function(event) { 
				navbar = document.getElementById("navbar")
				addMenuMobile(navbar)
			})
		}
		else
		    addMenuMobile(navbar)
	}
	else if (canRemove)
		removeMenuMobile()
}

var menuOpenClick = true

function getPanel() {
	return (panel = document.getElementById("panel"))
}

function reflow(elt) {
    elt.offsetHeight
}

function packmenus(menu_text_block, gb) {
	var a = document.createElement('a')
	a.href = '/Home/Projects/' + (gb ? 'true' : 'false')
	var p = document.createElement('p')
	p.innerHTML = (gb ? 'Projects' : 'Projektek')
	p.className = 'p_white'
	a.appendChild(p)
	menu_text_block.appendChild(a)

	var a = document.createElement('a')
	a.href = '/Home/Blog/' + (gb ? 'true' : 'false')
	var p = document.createElement('p')
	p.innerHTML = 'Blog'
	p.className = 'p_white'
	a.appendChild(p)
	menu_text_block.appendChild(a)

	var a = document.createElement('a')
	a.href = '/Home/Services/' + (gb ? 'true' : 'false')
	var p = document.createElement('p')
	p.innerHTML = (gb ? 'Services' : 'Szolgáltatások')
	p.className = 'p_white'
	a.appendChild(p)
	menu_text_block.appendChild(a)


	var a = document.createElement('a')
	a.href = '/Home/Reference/' + (gb ? 'true' : 'false')
	var p = document.createElement('p')
	p.innerHTML = (gb ? 'Reference' : 'Referenciáim')
	p.className = 'p_white'
	a.appendChild(p)
	menu_text_block.appendChild(a)


	var a = document.createElement('a')
	a.href = '/Home/Contact/' + (gb ? 'true' : 'false')
	var p = document.createElement('p')
	p.innerHTML = (gb ? 'Contact' : 'Kapcsolat')
	p.className = 'p_white'
	a.appendChild(p)
	menu_text_block.appendChild(a)
}

function addMenuMobile(navbar) {
	var mobile_menu_btn = document.createElement('div')
	mobile_menu_btn.innerHTML = '='
	mobile_menu_btn.id = "mobile_menu_btn"

	mobile_menu_btn.onclick = function() {
		if (menuOpenClick) {
			menuOpenClick = false
			var mobile_menu = document.createElement('div')
			var menu_text_block = document.createElement('div')
			menu_text_block.id = 'menu_text_block'
			packmenus(menu_text_block, window.location.href.includes('true'))
			var menu_block = document.createElement('div')
			menu_block.appendChild(menu_text_block)
			menu_block.id = 'menu_block'
            mobile_menu.appendChild(menu_block)
            var body = document.getElementsByTagName('body')[0]
            body.insertBefore(mobile_menu, getPanel())
			mobile_menu_btn.innerHTML = '×'
			// for reflow: window.getComputedStyle(mobile_menu).getPropertyValue("background-color")
			mobile_menu.id = "mobile_menu"
		}
		else {
			menuOpenClick = true
			var mobile_menu = document.getElementById('mobile_menu')
			mobile_menu.parentNode.removeChild(mobile_menu)
			mobile_menu_btn.innerHTML = '='
			// getPanel().id= "panel"
		}
	}

	navbar.insertBefore(mobile_menu_btn, navbar.childNodes[0])
}

function removeMenuMobile() {
	var mobile_menu = document.getElementById('mobile_menu')

	if (mobile_menu) {
		menuOpenClick = true
		mobile_menu.parentNode.removeChild(mobile_menu)
	}

	var mobile_menu_btn = document.getElementById('mobile_menu_btn')
	mobile_menu_btn.parentNode.removeChild(mobile_menu_btn)
}