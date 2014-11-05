// initialize timers
var timer1; // total game time elapsed
var timer2; // time since last keydown
var timer3; // time since started typing current word
var previous; // timestamp of most recent keypress
var wordspeed = 0; // time taken to type current word
var avg;
var typed;
var speeds = [];

// TODO: handle non-ascii keyboard: backspace, enter, and delete
//     (it already ignores tab, control, alt, etc as it should do)

// TODO: make speed display go back to zero when typing stops

// Helper function to calculate average of values in an array
function average(array) {
	var sum = array.reduce(function (a, b) {
		return a + b;
		});
	var answer = (sum / array.length);
	return answer;
}

$(window).keypress(function (event) {
    // override default behavior of keypress in this div
    event.preventDefault();
    
    // get character that user typed
    typed = String.fromCharCode(event.which);
    
    // if game already underway, calculate and display speed
    if (previous) {
        timer2 = event.timeStamp - previous; // get speed

        // TODO: calculate current avg instead of growing array
        speeds.push(timer2); // Add speed to array
        avg = Math.floor(average(speeds)); // get avg of array
        
        // TODO: calculate speed of most recent word
        //		(include break in the count but not first char)
        //  wordspeed is the sum of char times for this word so far
        // wordspeed += timer2;
        
        // find avg wpm from avg milliseconds per character
        var wpm = Math.floor(1/((avg * 5)/60000)); 

        // Show average speed so far
        $("div#score").html
        ("Your average speed is "+avg+" milliseconds per character, "+
        "which is "+wpm+" words per minute.");
    }
    // else it's the first character, so display hint
    else {
        // remove "just start typing" hint
        $("div#game").html("");
        // start game timer
        timer1 = event.timeStamp;
        // hint
        $("div#score").html("Keep Typing");
    }
    // current time becomes previous time
    previous = event.timeStamp;

    //TODO: format and display user input -- color depends on speed    
    //		if typed is not a space or return, print character in black 
    //		else if typed is a space or return, 
    //			change color of completed word, print space or return
    //  		and start tracking next word
    
    // style each character typed based on time elapsed since previous
    if (timer2 < 50) {
        $("div#game").append("<span class='vfast'>"+typed+"</span>");
    } 
    if (timer2 < 60) {
        $("div#game").append("<span class='fast'>"+typed+"</span>");
    } 
    else if (timer2 < 80){
        $("div#game").append("<span class='medium_fast'>"+typed+"</span>");
    }
    else if (timer2 < 110) {
        $("div#game").append("<span class='medium'>"+typed+"</span>");
    }
    else if (timer2 < 140) {
        $("div#game").append("<span class='medium_slow'>"+typed+"</span>");
    }
    else if (timer2 < 160) {
        $("div#game").append("<span class='slow'>"+typed+"</span>");
    }
    else {
        $("div#game").append("<span class='vslow'>"+typed+"</span>");
    }
    
});


// TODO: display game time elapsed?

// TODO: make speedometer display

