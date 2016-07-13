var CHAT_SELECTOR = "_5rpu" 	// "._5rpu", "._1mf"
var EMPTY_CHAR = "x" //"⁠"				// <-- THERE'S AN EMPTY CHARACTER IN THIS STRING
var SMILEY_LIST = [":)", ":("]

document.getElementById("pagelet_dock").addEventListener("input", function() {
	if(event.target.classList.contains(CHAT_SELECTOR)) {
		activeChat = event.srcElement;
		activeSpan = getInnerSpan(activeChat);
		activeSpan.style.backgroundColor = "#AAA#";
		innerText = activeSpan.textContent;
		console.log(activeSpan);
		if (existsSmiley(innerText)) {
			typeEmptyChar(activeSpan);
		}
	}
});
// TODO: pagelet_dock seems overly broad and inelegant
// TODO: do you need to check if inner-span data-text==true?

function getInnerSpan(node) {
	childSpans = node.getElementsByTagName("span"); 	
	// TODO: handle error?
	lastSpan = childSpans[childSpans.length-1];
	return lastSpan;
}

function existsSmiley(innerText) {
	for (var i=0; i<SMILEY_LIST.length; i++) {
		smiley = SMILEY_LIST[i];
		smileyIndex = innerText.indexOf(smiley);
		if (smileyIndex >= 0 && (smileyIndex + smiley.length == innerText.length)) {
			return true;
		}
	}
	return false;
}

function insertEmptyChar(innerText) {
	var len = innerText.length;
	return innerText.slice(0,len-1) + EMPTY_CHAR + innerText[len-1];
}

function replaceChatText(element, text) { 
	// Taken from [1]
	text = "<span> </span>";

    var textEvent = document.createEvent('TextEvent'); 
    textEvent.initTextEvent('textInput', true, true, window, text);
    element.dispatchEvent(textEvent); 
}
// TODO: Race conditions?
// Event constructors? [2]

function typeEmptyChar(element) {
    var textEvent = document.createEvent('TextEvent'); 
    textEvent.initTextEvent('textInput', true, true, window, EMPTY_CHAR);;
    element.dispatchEvent(textEvent); 
}





// References
// ------------
// [1] http://stackoverflow.com/questions/35368880/set-or-replace-textcontent-in-facebooks-chat
// [2] http://stackoverflow.com/questions/15951468/what-is-a-good-example-of-using-event-constructors-in-js

/*
QUESTIONS

What do you do if the input chat is something like "text [[]] text"?
Rapid key presses?
Smileys in the middle of sentences
This extension heats up your computer a lot?

Make a separate span with the smiley?

*/


