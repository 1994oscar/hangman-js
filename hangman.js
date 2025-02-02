const wordEl            = document.getElementById('word');
const wrongLettersEl    = document.getElementById('wrong-letters');
const playAgainBtn      = document.getElementById('play-button');
const popup             = document.getElementById('popup-container');
const notification      = document.getElementById('notification-container');
const finalMessage      = document.getElementById('final-message');

const figureParts       = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'design', 'backend', 'frontend', 'cloud',
'bugs','framework','javascript', 'api'];

let selectedWord = words[Math.floor(Math.random()* words.length)];

const correctLetters    = [];
const wrongLetters      = [];

/** Show  hidden word */

const displayWord = () => {
    wordEl.innerHTML = 
    `${selectedWord.split('').map(letter => 
    `<div class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </div>`
    ).join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText  = 'Congratulations! You Won!';
        popup.style.display     = 'flex';
    }
}

/** Update the wrong letter  */
const  updateWrongLetterEl = () => {

    //Display wrong letters 
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Show human parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText= "Unfortunately you lost!"
        popup.style.display = 'flex';
    }
}

/** Show notification */
const showNotification = () => {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


/** Keydown letter press */
window.addEventListener('keydown', e => {
    //Verify if the player press a letter

    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterEl();
            } else {
                showNotification();
            }
        }
    }
});

/** Restart the game */
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterEl();

    popup.style.display = "none";
});

displayWord();