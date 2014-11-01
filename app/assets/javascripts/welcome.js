// initialize timers
var timer1; // total game time elapsed
var timer2; // time since last keydown
var previous; // timestamp of most recent keypress
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
    // if game already underway
    if (previous) {
        timer2 = event.timeStamp - previous; // get speed
        speeds.push(timer2); // Add speed to array
        // Show average speed so far
        avg = Math.floor(average(speeds));
        var wpm = Math.floor(1/((avg * 5)/60000));
        $("div#score").html
        ("Your average speed is "+avg+" milliseconds per character <br />"+
        "which is "+wpm+" words per minute");
    }
    // else this must be the first character typed
    else {
        // remove "just start typing" hint
        $("div#game").html("");
        // TODO: start game timer
        timer1 = event.timeStamp;
        // hint
        $("div#score").html("Keep Typing");
    }
    // current becomes previous
    previous = event.timeStamp;

    //format and display user input -- color depends on speed
    if (timer2 < 60) {
        $("div#game").append("<span class='fast'>"+typed+"</span>");
    } 
    else if (timer2 < 90){
        $("div#game").append("<span class='medium_fast'>"+typed+"</span>");
    }
    else if (timer2 < 120) {
        $("div#game").append("<span class='medium'>"+typed+"</span>");
    }
    else if (timer2 < 150) {
        $("div#game").append("<span class='medium_slow'>"+typed+"</span>");
    }
    else {
        $("div#game").append("<span class='slow'>"+typed+"</span>");
    }
});


// TODO: display game time elapsed?

// TODO: make speedometer display

