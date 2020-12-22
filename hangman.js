const wordEl            = document.getElementById('word');
const wrongLettersEl    = document.getElementById('wrong-letters');
const playAgainBtn      = document.getElementById('play-again');
const popup             = document.getElementById('popup-container');
const notification      = document.getElementById('notification-container');
const finalMessage      = document.getElementById('final-message');

const figureParts       = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'design'];

let selectedWord = words[Math.floor(Math.random()* words.length)];

const correctLetters    = [];
const wrongLetters      = [];

/** Show  hidden word */
const displayWord = ()=>{
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

displayWord();