var CHAT_SELECTOR = "_5rpu" 	// "._5rpu", "._1mf"
var EMPTY_CHAR = "⁠"				// <-- THERE'S AN EMPTY CHARACTER IN THIS STRING
var SMILEY_LIST = [":)", ":("]

document.getElementById("pagelet_dock").addEventListener("input", function() {
	if(event.target.classList.contains(CHAT_SELECTOR)) {
		activeChat = event.srcElement;
		activeSpan = getInnerSpan(activeChat);
		innerText = activeSpan.textContent;
		if (existsSmiley(innerText)) {
			newText = insertEmptyChar(innerText);
			replaceChatText(activeSpan, newText);
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
    var textEvent = document.createEvent('TextEvent'); 
    textEvent.initTextEvent('textInput', true, true, window, text);
    element.dispatchEvent(textEvent); 
}






// [1] http://stackoverflow.com/questions/35368880/set-or-replace-textcontent-in-facebooks-chat

/*

QUESTIONS

What do you do if the input chat is something like "text [[]] text"?

*/