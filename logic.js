// i miss you :)

const SECONDS_IN_DAY = 60 * 60 * 24
const MET_ALICE = new Date('August 23, 2022 16:00:00')
const FLYING_BACK = new Date('May 27, 2025 19:00:00')
const COUNTDOWN_START = new Date('May 21, 2025 10:00:00')
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
        // 555555: 'Lucky streak: 555,555!',
        // 666666: 'We just passed 666,666 - the number of the beast!',
        // 696969: '696969 lmao',
        // 888888: 'Fortune smiles: we just passed 888,888!',
        // 1000000: 'NOW it\'s under a million seconds!'
    }

    // var message = 'I thought it would be under a million seconds! Give it a few hours, my love :)'
    var message = 'Fun number facts will show up here soon :)'
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

// ********************* FROG ********************* //

let frogInterval;
let frog; 
let frogVisible = false;

document.addEventListener('DOMContentLoaded', () => {
    setInterval(update, 1000);

    // Add the frog after 10 seconds
    setTimeout(() => {
        createFrog();
        // Start the frog animation loop (every 30 seconds)
        animateFrogPeriodically();
    }, 3000); // Initial delay before showing frog
});

function createFrog() {
    frog = document.createElement('div');
    frog.id = 'frog';
    frog.innerHTML = '🐸';
    frog.style.position = 'absolute';
    frog.style.top = '50%';
    frog.style.left = '-100px'; // off-screen initially
    frog.style.fontSize = '30px';
    frog.style.cursor = 'pointer';
    frog.style.display = 'none';
    document.body.appendChild(frog);

    // Add click event to display modal
    frog.addEventListener('click', () => {
        displayModal("this frog misses you very much <3 *frog sounds*");
    });
}

function animateFrogPeriodically() {
    // Show and animate the frog immediately, then every 30s
    animateFrogAcrossScreen();
    frogInterval = setInterval(() => {
        animateFrogAcrossScreen();
    }, 30000);
}

function animateFrogAcrossScreen() {
    if (!frog) return;
    frog.style.display = 'inline';

    const screenWidth = window.innerWidth;
    const startX = -100;
    const endX = screenWidth + 100; // Frog goes off the screen to the right
    const startTime = performance.now();
    const duration = 11000; // 11 seconds for the journey

    function animationFrame(now) {
        let elapsed = now - startTime;
        let t = elapsed / duration;

        if (t > 1) t = 1; // clamp at the end

        // Linear interpolation for horizontal movement
        let x = startX + (endX - startX) * t;

        // Sinusoidal vertical motion: 
        // amplitude = 20% of screen height in pixels
        // We'll consider the frog's "baseline" at 50% of the window height.
        let baseline = window.innerHeight * 0.5;
        let amplitude = window.innerHeight * 0.2; // ~10% of screen height
        let y = baseline + Math.sin(t * 2 * Math.PI * 2) * amplitude; 
        // (t * 2 * Math.PI * 2) means 2 full cycles over the duration

        frog.style.left = x + 'px';
        frog.style.top = y + 'px';

        if (t < 1) {
            requestAnimationFrame(animationFrame);
        } else {
            // Animation complete: hide frog off-screen
            frog.style.left = '-100px';
            frog.style.top = '50%';
            frog.style.display = 'none';
        }
    }

    requestAnimationFrame(animationFrame);
}

function displayModal(message) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '1000';

    const messageText = document.createElement('p');
    messageText.innerText = message;

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'lightgreen';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.appendChild(messageText);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}
