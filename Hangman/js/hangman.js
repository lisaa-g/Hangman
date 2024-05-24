var countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
  "China", "Colombia", "Comoros", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea Bissau",
  "Guyana", "Haiti", "Holy See", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

  let answer = '';
  let maxWrong = 6;
  let mistakes = 0;
  let guessed = [];
  let wordStatus = null;

  function randomWord() {
    answer = countries[Math.floor(Math.random() * countries.length)];
  }

  function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }

  function handleGuess(chosenLetter) {
    chosenLetter = chosenLetter.toLowerCase(); // Convert chosen letter to lowercase
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    let chosenButton = document.getElementById(chosenLetter);
    chosenButton.setAttribute('disabled', true);
    chosenButton.classList.add('chosen');
  
    if (answer.toLowerCase().indexOf(chosenLetter) >= 0) { // Compare in lowercase
      guessedWord();
      checkIfGameWon();
    } else {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }   

  function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './hangman_images/' + mistakes + '.png';
  }

  function checkIfGameWon() {
    let wordStatusWithoutSpaces = wordStatus.replace(/&nbsp;/g, ' ').toLowerCase(); // Convert to lowercase
    if (wordStatusWithoutSpaces === answer.toLowerCase()) {
      document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
  }      

  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
      document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
  }

  function guessedWord() {
    wordStatus = answer.split('').map(letter => {
      if (letter === ' ') {
        return '&nbsp;'; // Non-breaking space HTML entity
      } else {
        // Convert both letter and guessed letters to lowercase for comparison
        return (guessed.indexOf(letter.toLowerCase()) >= 0 || guessed.indexOf(letter.toUpperCase()) >= 0 ? letter : " _ ");
      }
    }).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }    

  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }

  function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './hangman_images/0.png';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
  }

  document.getElementById('maxWrong').innerHTML = maxWrong;

  randomWord();
  generateButtons();
  guessedWord();