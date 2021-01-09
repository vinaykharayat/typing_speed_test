const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var paragraphArray = [
    "Temp check",
    "Medical transcription, also known as MT, is an allied health profession dealing with the process of transcribing voice-recorded medical reports that are dictated by physicians, nurses and other healthcare practitioners. Medical reports can be voice files, notes taken during a lecture, or other spoken material. These are dictated over the phone or uploaded digitally via the Internet or through smart phone apps.",
    "Jim and Anne will be in charge of the spring field day to be held in early June. They will ask their friends' aid to get set up. There will be games for the boys and girls. The children will want to hike, ride their bikes, and swim. This yearly event will be held in the new Peach Grove Park. Ruth has work to do on the plans for food for the day. Last year Ruth spent most of her time helping the two cooks with many snacks. Hot dogs, fries, soft drinks, ice cream, and candy apples were big sellers. Apple pie and ice cream sold well too. I hope Ruth serves the same food this year. George Long will hire the band and singer for the day. A great jazz band will play. George's mom leads the group. The jazz band is sure to be one of the big hits. George is to have them play from one to four and also in the evening. The fine songs they will play are sure to please all of us. Nice gifts will be given to all of the winners in each of the events. Local news coverage will include television and newspapers. Joyce Scott will take care of the pictures for the school paper and yearbook. Maybe the national news will do a short story on the tenth annual spring field day.",
    "A data entry clerk is a member of staff employed to enter or update data into a computer system. Data is often entered into a computer from paper documents using a keyboard. The keyboards used can often have special keys and multiple colors to help in the task and speed up the work. Proper ergonomics at the workstation is a common topic considered. The Data Entry Clerk may also use a mouse, and a manually-fed scanner may be involved. Speed and accuracy, not necessarily in that order, are the key measures of the job; it is possible to do this job from home.",
    "A data entry clerk is a member of staff employed to enter or update data into a computer system. Data is often entered into a computer from paper documents using a keyboard. The keyboards used can often have special keys and multiple colors to help in the task and speed up the work. Proper ergonomics at the workstation is a common topic considered. The Data Entry Clerk may also use a mouse, and a manually-fed scanner may be involved. Speed and accuracy, not necessarily in that order, are the key measures of the job; it is possible to do this job from home.",
    "Closed captions were created for deaf or hard of hearing individuals to assist in comprehension. They can also be used as a tool by those learning to read, learning to speak a non-native language, or in an environment where the audio is difficult to hear or is intentionally muted."
]

var refParagraphList = document.querySelectorAll("#list_of_text option");
for(var i = 0; i<refParagraphList.length; i++){
    refParagraphList[i].textContent = paragraphArray[i];
}

document.querySelector("#list_of_text").addEventListener("click", function(){
    originText.textContent = "No paragraph selected"
    originText.textContent = paragraphArray[document.querySelector("#list_of_text").value];
})



document.querySelector("#origin-text p").innerHTML = originText.textContent;
// console.log(originText);
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var totalErrors = 0;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if(time<=9){
        return "0" + time;
    }
    return time;
}
// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    //Minutes
    timer[0] = Math.floor((timer[3]/100)/60);
    //Seconds 
    timer[1] = Math.floor((timer[3]/100) - (timer[0] *60));

    //MS "-timer[0] * 6000" is used to reset ms to 0 after one minute.
     timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.textContent.substring(0,textEntered.length);
    if(textEntered == originText.textContent){
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
        
        checkWpm(textEntered);
    }else if(textEntered == originTextMatch){
        testWrapper.style.borderColor = "blue";
    }else{
        totalErrors++;
        testWrapper.style.borderColor = "orange";
    }
}

//Function to check wpm
function checkWpm(textEntered){
    let wordsArray = textEntered.split(" ");
    let wpm = (wordsArray.length/5)/(timer[0] + (timer[1]/60));
    document.querySelector(".wpm").textContent = wpm.toFixed(2);
    checkError(wordsArray);
}

function checkError(totalWords){
    let error = (totalErrors/totalWords.length)*100;
    console.log(error);
    console.log(totalWords.length);
    console.log(totalErrors);
    document.querySelector(".error_per").textContent = error.toFixed(2);
}


// Start the timer:
function start(){
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML ="00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:

//"keypress" event happens before text is entered
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset);