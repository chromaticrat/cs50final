// initialize variables
var timer1; // total game time elapsed
var timer2; // time since last keydown
var timer3; // time since started typing current word
var previousTime; // timestamp of most recent keypress
var wordspeed = 0; // time taken to type current word
var previousKey; // last key typed
var newKey; // current key pressed
var wordlength = 1; // length of current word
var wordclass; // css class for completed word
var keycount = 0; // total characters displayed in div#game
var wpm = 0;
var speeds = [];

// Helper function to start game
function start(event) {
	$("div#game").html("");	// remove first hint
	timer1 = event.timeStamp; 	// start game timer
	timer2 = 0;	// first character is free
	timer3 = event.timeStamp;	// start word timer
	$("div#score").html("Keep Typing");	// offer second hint
}

// TODO: Helper function to handle backspace
function back(key) {
	var elements = document.getElementsByClassName("current");
	var current = elements[0].innerHTML;
	elements[0].innerHTML = current.substr(0, current.length - 1);
	// shorten count of current word length and total length
	wordlength --;
	keycount --;
	// TEST
	//$("div#test").append("Called 'back()'. <br />Wordlength = "
	//+wordlength+" and Keycount = "+keycount+"<br />");
}

// Helper function to update speedometer
// changes CSS width of the div with id of "speedbar-cover", according to wpm)
function speedbar(){
	var coverage = (Math.abs(wpm/2 - 100)).toString();
	var coverWidth = coverage.concat("%");
	$("div#speedbar-cover").css("width", coverWidth);
}

// Helper function to calculate and display speed
function processSpeed(event) {
	var now = event.timeStamp;
	// Calculate speeds
	timer2 = now - previousTime; // get this character speed
	//$("div#speed").append(timer2+",  "); // TEST timer2
	
	// get words per min assuming every 5 characters is a word
	wpm = Math.floor((keycount/5) / ((now - timer1)/60000));
	
	// space (32) or return (13) define word break for formatting
	// TODO: ignore keypress if previousTime key was also one of these 
	if (event.which == 32 || event.which == 13) {
		wordspeed = Math.floor(60000/(now - timer3)); //wpm rate for just this word
		timer3 = now;
		wordlength = 0;
	}
	speedbar();
}

// choose color according to typing rate
function getcolor(){
	switch (true) {
	case wordspeed < 35:
		wordclass = "vslow";
		break;
	case wordspeed < 45:
		wordclass = "slow";
		break;
	case wordspeed < 55:
		wordclass = "medium_slow";
		break;
	case wordspeed < 65:
		wordclass = "medium";
		break;
	case wordspeed < 75:
		wordclass = "medium_fast";
		break;
	case wordspeed < 85:
		wordclass = "fast";
		break;
	default:
		wordclass = "vfast";
	}
}

// Helper function to style and display newKey input
function display() { 
	// if this is the first character of the game
	if (timer2 == 0) {
		$("div#game").append("<span class='current'>"+newKey+"</span>");
	}
	// display completed word
	else if (wordlength == 0) {
		// Get color class for word based on speed
		getcolor();
		// apply color 
		$("span.current").append(newKey)
			.removeClass("current")
			.addClass(wordclass);
		$("div#game").append("<span class='current'></span>");
	}
	// display new character of word in progress
	else {
		$("span.current").append(newKey);
	}
	// display speed
	$("div#score").html("Average Speed: "+wpm+" wpm");
	$("div#score").append("<br />Speed Of Most Recent Word: "+wordspeed+" wpm");
}

// Main Function: Handler for Keypress events in the window
$(window).keypress(function (event) {    
	// prevent default events so insertion point can't be changed by user
	event.preventDefault();
    // make a string from whatever key the user typed
    newKey = String.fromCharCode(event.which);
    // TEST input
    //$("div#test").append("user typed "+event.which+" which is '"+newKey+"', ");
    // if game already underway, keep playing
    if (previousTime) {
        // if the key pressed is Backspace
    	//if (event.which == 8) { back(); }
    	// if not Backspace
		//else { 
		processSpeed(event); 
		//}
    }
    // if this is the first character, start the game
    else { start(event); }
    // display keyboard input
	display();
    // keep track of when most recent keyboard input received
    previousTime = event.timeStamp; 
    wordlength ++;
	keycount ++;
});





// wish list
// ******************
// ?TODO: make speed display go back to zero when typing stops
// 	TODO: make speedometer display
// 	TODO: calculate current avg instead of growing array
//  TODO: calculate speed of most recent word
//		(include break in the count but not first char)
//       wordspeed is the sum of char times for this word so far
//        wordspeed += timer2;
// 	?TODO: display game time elapsed
//TODO: format and display user input -- color depends on speed    
//		if newKey is not a space or return, print character in black 
//		else if newKey is a space or return, 
//			change color of completed word, print space or return
//  		and start tracking next word

// vestigial code
// ******************

// Helper function to calculate average of values in an array
// function average(array) {
// 	var sum = array.reduce(function (a, b) {
// 		return a + b;
// 		});
// 	var answer = (sum / array.length);
// 	return answer;
// }

// 	speeds.push(timer2); // Add speed to array
// 	avg = Math.floor(average(speeds)); // get avg of array (ms per key)
// 	var wpm = Math.floor(1/((avg * 5)/60000)); // get wpm from ms per key
	
	// Display speeds
// 	$("div#score").html
// 	("Your average speed is "+avg+" milliseconds per character, "+
// 	"which is "+wpm+" words per minute.");


// style each character typed based on time elapsed since previous time
//     if (timer2 < 50) {
//         $("div#game").append("<span class='vfast'>"+newKey+"</span>");
//     } 
//     else if (timer2 < 60) {
//         $("div#game").append("<span class='fast'>"+newKey+"</span>");
//     } 
//     else if (timer2 < 80){
//         $("div#game").append("<span class='medium_fast'>"+newKey+"</span>");
//     }
//     else if (timer2 < 110) {
//         $("div#game").append("<span class='medium'>"+newKey+"</span>");
//     }
//     else if (timer2 < 140) {
//         $("div#game").append("<span class='medium_slow'>"+newKey+"</span>");
//     }
//     else if (timer2 < 160) {
//         $("div#game").append("<span class='slow'>"+newKey+"</span>");
//     }
//     else {
//         $("div#game").append("<span class='vslow'>"+newKey+"</span>");
//     }

