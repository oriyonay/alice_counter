const SECONDS_IN_DAY = 60 * 60 * 24
const MET_ALICE = new Date('August 23, 2022 16:00:00')
const FLYING_BACK = new Date('December 31, 2023 15:00:00')
const COUNTDOWN_START = new Date('December 18, 2023 17:00:00')
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
    setInterval(update, 1000)
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

    return days + ' days - ' + hours + ' hours - ' + minutes +
        ' minutes - ' + seconds + ' seconds'
}

function updateNote(seconds) {
    const milestones = {
        20001: 'Blast off! Like in "2001: A Space Odyssey"',
        31416: '31416, the first five digits of π',
        42042: 'The meaning of everything: 42,042 :) jk it\'s you',
        65537: 'A really nice prime number: 65537 is 2^16 + 1',
        81920: 'Power play: 81920 is 2^13 times 10 and LESS THAN 24 HOURS',
        123456: '123456 is such a silly little number',
        314159: 'The full Pi: 314159, the first six digits of π',
        360000: 'ONLY ONE HUNDRED HOURS!',
        555555: 'Lucky streak: 555,555!',
        666666: 'We just passed 666,666 - the number of the beast!',
        888888: 'Fortune smiles: we just passed 888,888!',
        1000000: 'NOW it\'s under a million seconds!'
    }

    var message = 'I thought it would be under a million seconds! Give it a few hours, my love :)'
    for (const [milestone, milestoneMessage] of Object.entries(milestones)) {
        if (seconds <= milestone) {
            message = milestoneMessage
            break
        }
    }
    document.querySelector('#note').innerHTML = message;
}


function update() {
    // Seconds since meeting Alice <3
    if (seconds_since(MET_ALICE) % 15 == 0) changeBackgroundColor()
    let since_meeting_alice = seconds_to_string(seconds_since(MET_ALICE))
    document.querySelector('#since_meeting_alice').innerHTML = since_meeting_alice


    // Seconds until I fly back
    seconds = seconds_until(FLYING_BACK)
    let seconds_str = '(only ' + seconds.toLocaleString() + ' seconds)'
    let until_flying_back = seconds_to_string(seconds)
    document.querySelector('#until_flying_back').innerHTML = until_flying_back
    document.querySelector('#until_flying_back_in_seconds').innerHTML = seconds_str

    // Update progress bar
    const total = seconds_since(COUNTDOWN_START) + seconds_until(FLYING_BACK)
    const elapsed = seconds_since(COUNTDOWN_START)
    let progress_percentage = (elapsed / total) * 100
    // console.log(progress_percentage)
    document.getElementById('progress-bar').style.width = progress_percentage + '%'
    document.getElementById('progress-bar-text').textContent = progress_percentage.toFixed(2) + '%'

    // Update note
    updateNote(seconds)
}