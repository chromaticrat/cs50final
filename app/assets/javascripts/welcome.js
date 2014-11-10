// initialize variables
var timer1; // total game time elapsed
var timer2; // time since last keydown
var timer3; // time since started typing current word
var previous; // timestamp of most recent keypress
var wordspeed = 0; // time taken to type current word
var wordlength = 1; // length of current word
var wordclass; // css class for completed word
var keycount = 0; // total characters displayed in div#game
var wpm = 0;
var typed;
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


	// shorten count of current word length and total length
	wordlength --;
	keycount --;
}

// Helper function to calculate and display speed
function processSpeed(event) {
	var now = event.timeStamp;
	// Calculate speeds
	timer2 = now - previous; // get this character speed
	$("div#speed").append(timer2+",  "); // TEST timer2
	
	// get words per min assuming every 5 characters is a word
	wpm = Math.floor((keycount/5) / ((now - timer1)/60000));
	
	// space (32) or return (13) define word break for formatting 
	if (event.which == 32 || event.which == 13) {
		wordspeed = Math.floor(60000/(now - timer3)); //wpm rate for just this word
		timer3 = now;
		wordlength = 0;
	}
}

// choose color for each word as it is completed
function getcolor(){
	if (wordspeed < 35) {
		wordclass = "vslow";
	}
	else if (wordspeed < 45) {
		wordclass = "slow";
	}
	else if (wordspeed < 55) {
		wordclass = "medium_slow";
	}
	else if (wordspeed < 65) {
		wordclass = "medium";
	}
	else if (wordspeed < 75) {
		wordclass = "medium_fast";
	}
	else if (wordspeed < 85) {
		wordclass = "fast";
	}
	else {
		wordclass = "vfast";
	}
	
}


// Helper function to style and display typed input
function display() { 
	// if this is the first character of the game
	if (timer2 == 0) {
		$("div#game").html("<span class='current'>"+typed+"</span>");
	}
	// display completed word
	else if (wordlength == 0) {
		// Get color class for word based on speed
		getcolor();
		// apply color 
		$("span.current").append(typed)
			.removeClass("current")
			.addClass(wordclass);
		$("div#game").append("<span class='current'>&nbsp;</span>");
	}
	// display new character of word in progress
	else {
		$("span.current").append(typed);
	}
	// display speed
	$("div#score").html("Average Speed: "+wpm+" wpm");
	$("div#score").append("<br />Speed Of Most Recent Word: "+wordspeed+" wpm");
}

// Main Function
$(window).keypress(function (event) {    
	// prevent default events 
	event.preventDefault();
    // make a string from whatever key the user typed
    typed = String.fromCharCode(event.which);
    // if game already underway, keep playing
    if (previous) {
        // if the key pressed is Backspace
    	if (event.which == 8) { back(); }
    	// if not Backspace
		else { processSpeed(event); }
    }
    // if this is the first character, start the game
    else { start(event); }
    // display keyboard input
	display();
    // keep track of when most recent keyboard input received
    previous = event.timeStamp; 
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
//		if typed is not a space or return, print character in black 
//		else if typed is a space or return, 
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


// style each character typed based on time elapsed since previous
//     if (timer2 < 50) {
//         $("div#game").append("<span class='vfast'>"+typed+"</span>");
//     } 
//     else if (timer2 < 60) {
//         $("div#game").append("<span class='fast'>"+typed+"</span>");
//     } 
//     else if (timer2 < 80){
//         $("div#game").append("<span class='medium_fast'>"+typed+"</span>");
//     }
//     else if (timer2 < 110) {
//         $("div#game").append("<span class='medium'>"+typed+"</span>");
//     }
//     else if (timer2 < 140) {
//         $("div#game").append("<span class='medium_slow'>"+typed+"</span>");
//     }
//     else if (timer2 < 160) {
//         $("div#game").append("<span class='slow'>"+typed+"</span>");
//     }
//     else {
//         $("div#game").append("<span class='vslow'>"+typed+"</span>");
//     }

