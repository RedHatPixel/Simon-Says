const btns = document.querySelectorAll('#circle button');
controlButton('off');

const audioFiles = ['Sound1.wav', 'Sound2.wav', 'Sound3.wav', 'Sound4.wav'];
const audioElements = audioFiles.map((file) => {
    const audio = new Audio(`assets/sound/${file}`);
    audio.preload = 'auto';
    return audio;
});

function playSound(value, control=true) {
    const sound = audioElements[value].cloneNode();
    sound.play();

    if (control) {
        controlButton('block');
        sound.onended = () => {
            controlButton('on');
        }
    } 
};

function controlButton(state) {
    let switchBool, show;
    switch(state) {
        case 'off':
            switchBool = true;
            show = true;
            break;
        case 'on':
            switchBool = false;
            show = false;
            break;
        case 'block':
            switchBool = true;
            show = false;
            break;
    };
    btns.forEach((btn) => {
        btn.disabled = switchBool;
        if (show) btn.classList.add('disable');
        else btn.classList.remove('disable');
    });
};

const playBtn = document.getElementById('start-button');
playBtn.addEventListener('click', () => {
    playBtn.style.display = 'none';
    nextLevel();
});

let gameSequence = [];
let userSequence = [];
let level = 0;
btns.forEach((btn, value, array) => {
    btn.addEventListener('click', () => {
        playSound(value);
        HandleGame(value);
    });
});

function HandleGame(value) {
    userSequence.push(value);
    if (!checkUserSequence()) {
        setTimeout(() => {
            alert(`Game Over, level: ${level}`);
            resetGame();
        }, 1000);
    }
    else if (userSequence.length === gameSequence.length) {
        setTimeout(nextLevel, 1000);
    }
};

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
};

function nextLevel() {
    userSequence = [];
    level++;
    let value = Math.floor(Math.floor(Math.random() * btns.length));
    gameSequence.push(value);
    controlButton('block');
    setTimeout(playSequence, 1000);
};

function playSequence() {
    let delay = 0;

    gameSequence.forEach((value, index) => {
        setTimeout(() => {
            btns[value].classList.add('disable');
            playSound(value, false);

            setTimeout(() => {
                btns[value].classList.remove('disable');

                if (index === gameSequence.length - 1) {
                    setTimeout(() => {
                        controlButton('on');
                        console.log('Sequences are complete');
                    }, 500);
                }
            }, 500);

        }, delay);
        delay += 1000;
    });
};

function resetGame() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    playBtn.style.display = 'block';
    controlButton('off');
}