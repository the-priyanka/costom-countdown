let inputContainer = document.getElementById("input-container")
let countdownForm = document.getElementById("countdownForm")
let dateEl = document.getElementById("date-picker")

let countdownEl = document.getElementById("countdown")
let countdownElTitle = document.getElementById("countdown-title")
let countdownBtn = document.getElementById("countdown-button")
let timeElements = document.querySelectorAll("span")

let completeEl = document.getElementById("complete")
let completeElInfo = document.getElementById("complete-info")
let completeBtn = document.getElementById("complete-button")


let countdownTitle = ""
let countdownDate = ""
let countdownValue = Date
let countdownActive;
let savedCountdown;

let second = 1000
let minute = second * 60
let hour = minute * 60
let day = hour * 24

// set Date input min with today's date
let today = new Date().toISOString().split("T")[0]
dateEl.setAttribute("min", today)

// populate countdown / complete UI 
function updateDOM() {
  countdownActive = setInterval(() => {
    let now = new Date().getTime()
    let distance = countdownValue - now

    let days = Math.floor(distance / day)
    let hours = Math.floor((distance % day) / hour)
    let minutes = Math.floor((distance % hour) / minute)
    let seconds = Math.floor((distance % minute) / second)

    // Hide Input 
    inputContainer.hidden = true;

    //  if the countdown has end, show complete 
    if (distance < 0) {
      countdownEl.hidden = true
      clearInterval(countdownActive)
      completeElInfo.textContent = `${ countdownTitle } finished on ${ countdownDate }`
      completeEl.hidden = false
    }
    else {
      // else, show the countdown in progress 
      countdownElTitle.textContent = `${ countdownTitle }`
      timeElements[0].textContent = `${ days }`
      timeElements[1].textContent = `${ hours }`
      timeElements[2].textContent = `${ minutes }`
      timeElements[3].textContent = `${ seconds }`
      completeEl.hidden = true
      countdownEl.hidden = false
    }
  }, second);
}

// take values from form input
function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }
  console.log(savedCountdown)
  localStorage.setItem("countdown", JSON.stringify(savedCountdown))
  // check for valid date
  if (countdownDate === "") {
    alert("Please select a date for the countdown.")
  }
  else {
    // get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// Reset All Value 
function reset() {
  // hide countdowns, show input 
  countdownEl.hidden = true
  completeEl.hidden = true
  inputContainer.hidden = false
  // stop the countdown 
  clearInterval(countdownActive)
  // Reset value 
  countdownTitle = ""
  countdownDate = ""
  localStorage.removeItem("countdown")
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available 
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown)
countdownBtn.addEventListener("click", reset)
completeBtn.addEventListener("click", reset)

// on load, check localStorage

restorePreviousCountdown()