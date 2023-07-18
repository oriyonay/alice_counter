const SECONDS_IN_DAY = 60 * 60 * 24
const MET_ALICE = new Date('August 23, 2022 16:00:00')
const FLYING_BACK = new Date('August 4, 2023 17:45:00')
var numDays, numHrs, numMins

const BGCOLORS = [
    'lightblue', 'lightgreen', 'aqua', 'aquamarine', 'cornflowerblue',
    'darkseagreen', 'deepskyblue', 'greenyellow', 'gold', 'honeydew',
    'lavender', 'lightcoral'
]
const BGCOLOR_LENGTH = BGCOLORS.length

function changeBackgroundColor() {
    pickedcolor = BGCOLORS[Math.floor(Math.random() * BGCOLOR_LENGTH)]
    document.body.style.backgroundColor = pickedcolor
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateCounter, 1000)
})

function seconds_since(date) {
    return Math.floor((Date.now() - date) / 1000)
}

function seconds_until(date) {
    return Math.floor(Math.max(date - Date.now(), 0) / 1000)
}

function seconds_to_string(seconds) {
    days = Math.floor(seconds / SECONDS_IN_DAY)
    seconds -= days * SECONDS_IN_DAY
    hours = Math.floor(seconds / 3600)
    seconds -= hours * 3600
    minutes = Math.floor(seconds / 60)
    seconds -= minutes * 60

    return days + " days - " + hours + " hours - " + minutes +
        " minutes - " + seconds + " seconds"
}

function updateCounter() {
    // Seconds since meeting Alice <3
    if (seconds_since(MET_ALICE) % 15 == 0) changeBackgroundColor()
    let since_meeting_alice = seconds_to_string(seconds_since(MET_ALICE))
    document.querySelector('#since_meeting_alice').innerHTML = since_meeting_alice


    // Seconds until I fly back
    seconds = seconds_until(FLYING_BACK)
    let seconds_str = "(only " + seconds.toLocaleString() + " seconds)"
    let until_flying_back = seconds_to_string(seconds)
    document.querySelector('#until_flying_back').innerHTML = until_flying_back
    document.querySelector('#until_flying_back_in_seconds').innerHTML = seconds_str
}