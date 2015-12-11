window.onresize = displayMenuOnFullScreen;

function toggleMenu() {
	buttonToggle = document.getElementById("toggle_menu");
	navMenu = document.querySelector(".navigation ul");
	login = document.querySelector(".navigation .login");

	toggleButtonMenu(buttonToggle);
	toggle(navMenu);
	toggle(login);
}

function toggleButtonMenu(element) {
	buttonToggle = element.querySelector("button");
	buttonToggle.style.backgroundPositionY = (window.getComputedStyle(buttonToggle, null).backgroundPositionY == "0px") ? "40px" : "0px";
	textToogle = element.querySelector("span");
	toggle(textToogle)
}

function defaultButtonToggle(element) {
	buttonToggle = element.querySelector("button");
	buttonToggle.style.backgroundPositionY = "0px";
	textToogle = element.querySelector("span");
	show(textToogle);
}

function displayMenuOnFullScreen() {
	buttonToggle = document.getElementById("toggle_menu");
	navMenu = document.querySelector(".navigation ul");
	login = document.querySelector(".navigation .login");
	toggle(buttonToggle, navMenu);
	toggle(buttonToggle, login);
	defaultButtonToggle(buttonToggle);
}

function getRealDisplay(elem) {
	if (elem.currentStyle) {
		return elem.currentStyle.display;
	} else if (window.getComputedStyle) {
		var computedStyle = window.getComputedStyle(elem, null );

		return computedStyle.getPropertyValue('display');
	}
}

function hide(el) {
	if (!el.getAttribute('displayOld')) {
		el.setAttribute("displayOld", el.style.display)
	}

	el.style.display = "none";
}

var displayCache = {};

function isHidden(el) {
	var width = el.offsetWidth, height = el.offsetHeight,
		tr = el.nodeName.toLowerCase() === "tr";

	return width === 0 && height === 0 && !tr ?
		true : width > 0 && height > 0 && !tr ? false :	getRealDisplay(el);
}

function toggle(elCheck, elAction) {
	elAction = elAction||elCheck;
	isHidden(elCheck) ? show(elAction) : hide(elAction);
}


function show(el) {

	if (getRealDisplay(el) != 'none') return;

	var old = el.getAttribute("displayOld");
	el.style.display = old || "";

	if ( getRealDisplay(el) === "none" ) {
		var nodeName = el.nodeName, body = document.body, display;

		if ( displayCache[nodeName] ) {
			display = displayCache[nodeName];
		} else {
			var testElem = document.createElement(nodeName);
			body.appendChild(testElem);
			display = getRealDisplay(testElem);

			if (display === "none" ) {
				display = "block";
			}

			body.removeChild(testElem)
			displayCache[nodeName] = display;
		}

		el.setAttribute('displayOld', display);
		el.style.display = display;
	}
}
