//Question-cards
const formQuestions = Array.from(document.getElementsByClassName('form-questions'))
let index = 0

//Buttons
const resultButton = document.getElementById('result-button')
const retakeButton = document.getElementById('retake-button')
const resultsPage = document.getElementById('results')
const bar = document.getElementById('bar')
const instructions = document.getElementById('quiz-instructions')
const percent = document.getElementById('percent-bar')
const continueToQuiz = document.getElementById('intro-continue')
const backButton = document.getElementById('previous-button')
const nextButton = document.getElementById('next-button')
//const startQuiz = document.getElementById('start-quiz')

const announcer = document.getElementById('announcer')
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
let userName = '';


//Sections
const introSection = document.getElementById('introduction-section')
const quizSection = document.getElementById('quiz-section')
const userInfoSection = document.getElementById('user-info')
const userInfoForm = document.getElementById('user-info-form');
const quizForm = document.getElementById('quiz')
const radioErrorMessage = document.getElementById('answer-error')

//progress bar
const progressFill = document.querySelector('.progress-fill')
const progressText = document.querySelector('.progress-text')


const pointTotal = 4

//When we click continue to quiz
continueToQuiz.addEventListener('click', () => {

  introSection.hidden = true
  userInfoSection.hidden = false
  window.location.hash = '#user-info'
  document.getElementById('name').focus()
  announcer.textContent = 'Moved to user information section'

})


const clearError = (input, errorElement) => {
  input.removeAttribute('aria-invalid');
  errorElement.textContent = '';
  errorElement.hidden = true;
}

const showError = (input, errorElement, message) => {
  input.setAttribute('aria-invalid', 'true');
  errorElement.textContent = message;
  errorElement.hidden = false;
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {
    clearError(nameInput, nameError);
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value.trim()) {
    if (isValidEmail(emailInput.value)) {
      clearError(emailInput, emailError);
    }
  }
});

//When we click continue to quiz

userInfoForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const currentQuestion = formQuestions[0]
  currentQuestion.hidden = false
  retakeButton.hidden = true
  nextButton.hidden = false


  let isValid = true;

  if (!nameInput.value.trim()) {
    showError(nameInput, nameError, 'Please enter your name');
    isValid = false;
    nameInput.focus();
  } else {
    clearError(nameInput, nameError);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Please enter your email address');
    isValid = false;
    if (!nameError.textContent) {
      emailInput.focus();
    }
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Please enter a valid email address');
    isValid = false;
    if (!nameError.textContent) {
      emailInput.focus();
    }
  } else {
    clearError(emailInput, emailError);
  }

  if (isValid) {
    userName = nameInput.value.trim();
    userInfoSection.hidden = true
    quizSection.hidden = false
    quizSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('#quiz input[type="radio"]').focus();
    announcer.textContent = 'Moved to quiz section';
  }

  document.getElementById('question-1-1').focus()
  //quizForm.querySelector('input[type="radio"]').focus()
})
//when we click start quiz

//function that ensures the right buttons and questions are showing at the right time
const showNextQuestion = (i) => {

  if (i >= (formQuestions.length - 1)) {
    return
  } else if (i >= 0) {

    const currentQuestion = formQuestions[i]
    const nextQuestion = formQuestions[(i + 1) % formQuestions.length]

    let selected = (document.querySelectorAll('input[value="true"]:checked').length + document.querySelectorAll('input[value="false"]:checked').length)

    if ((i + 1) != selected) {
      radioErrorMessage.hidden = false
      radioErrorMessage.textContent = "you have to choose an answer"
      announcer.textContent = 'you have to choose an answer'

      return

      //felmeddelande
    }
    if (selected >= 1) {
      radioErrorMessage.hidden = true
    }

    backButton.removeAttribute('hidden')
    nextQuestion.removeAttribute('hidden')
    currentQuestion.setAttribute('hidden', true)


    if (i === formQuestions.length - 2) {
      nextButton.setAttribute('hidden', true)
      resultButton.removeAttribute('hidden')
    }

    index += 1

    document.getElementById('question-2-1').focus()
    document.getElementById('question-3-1').focus()
    document.getElementById('question-4-1').focus()
    //quizForm.querySelector('input[type="radio"]').focus()
    announcer.textContent = 'Moved to next question'
  }
}

const showPrevQuestion = (i) => {
  selected

  if (i >= 1) {

    const currentQuestion = formQuestions[i]
    const prevQuestion = formQuestions[(i - 1) % formQuestions.length]

    currentQuestion.setAttribute('hidden', true)
    prevQuestion.removeAttribute('hidden')

    if (i === formQuestions.length - 1) {
      resultButton.setAttribute('hidden', true)
      nextButton.removeAttribute('hidden')
    }
    if (i === 1) {
      backButton.setAttribute('hidden', true)
    }
  }

  index -= 1
  announcer.textContent = 'Moved to previous question';

  document.getElementById('question-1-1').focus()
  document.getElementById('question-2-1').focus()
  document.getElementById('question-3-1').focus()
  //quizForm.querySelector('input[type="radio"]').focus()

}

const countScore = () => {
  let points = document.querySelectorAll('input[value="true"]:checked')
  console.log("here is:", points)
  return points.length
}

const WrongQuestionCount = () => {
  let points = document.querySelectorAll('input[value="false"]:checked')
  return points.length
}

const wrongQuestions = () => {
  let questions = document.querySelectorAll('input[value="false"]:checked')
  let question = []

  let falseQuestions = []
  questions.forEach(question => {
    falseQuestions.push(question.parentElement.parentElement.id)
  })

  for (i = 0; falseQuestions[i]; i++) {
    question[i] = `question ${i + 1}`
  }
  console.log(question)
  return question
}

const updateProgress = () => {
  let points = (countScore() + WrongQuestionCount())
  const percentage = (points / pointTotal) * 100;
  console.log(percentage)

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${points} of ${pointTotal} sections completed`;
  announcer.textContent = `${points} of ${pointTotal} sections completed`;
}

quizForm.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    updateProgress()
  })
})
//each input has an event listener cuasing a update


const showResults = (i) => {
  const score = document.getElementById('score')
  const flunked = document.getElementById('flunked')
  const resultsMessage = document.getElementById('results-message')
  const currentQuestion = formQuestions[i]
  let points = countScore()
  let questions = wrongQuestions()

  let selected = (document.querySelectorAll('input[value="true"]:checked').length + document.querySelectorAll('input[value="false"]:checked').length)

  if ((i + 1) != selected) {
    radioErrorMessage.hidden = false
    radioErrorMessage.textContent = "you have to choose an answer"
    announcer.textContent = 'you have to choose an answer'

    return

    //felmeddelande
  }
  if (selected >= 1) {
    radioErrorMessage.hidden = true
  }


  backButton.setAttribute('hidden', true)
  nextButton.setAttribute('hidden', true)
  resultButton.setAttribute('hidden', true)
  currentQuestion.setAttribute('hidden', true)
  resultsPage.removeAttribute('hidden')
  retakeButton.removeAttribute('hidden')

  bar.hidden = true
  progressText.hidden = true
  instructions.hidden = true

  announcer.textContent = 'Moved to result page'

  if (points < pointTotal) {
    flunked.innerHTML = `Questions you got wrong are: ${questions.map(q => { return q }).join(", ")}`
  } else {
    flunked.innerHTML = ''
  }

  score.innerHTML = `Your score is ${points}/${pointTotal}`

  if (points === 0) {
    resultsMessage.innerHTML = 'Yikes...'
  } else if (points === 1) {
    resultsMessage.innerHTML = 'det här säger sig självt'
  } else if (points === 2) {
    resultsMessage.innerHTML = 'wow. hälften'
  } else if (points === 3) {
    resultsMessage.innerHTML = 'nära skjuter ingen hare'
  } else if (points === pointTotal) {
    resultsMessage.innerHTML = 'Winner, winner chicken dinner'
  }
}

nextButton.addEventListener(('click'), () => {
  showNextQuestion(index)
})

backButton.addEventListener(('click'), () => {
  showPrevQuestion(index)
})

quizForm.addEventListener(('submit'), (event) => {
  event.preventDefault()
  showResults(index)
})

retakeButton.addEventListener(('click'), () => {
  resultsPage.hidden = true
  index = 0
  introSection.hidden = false
  retakeButton.hidden = false
  quizSection.hidden = true

  /*
  let infoInput = [document.getElementById('name'), document.getElementById('email')]
  infoInput.forEach((input) => {
    input.value = ''
  })
  // clearing name and email input
  */

  document.querySelector('input[name="web-accessibility"]:checked').checked = false;
  document.querySelector('input[name="WCAG"]:checked').checked = false;
  document.querySelector('input[name="cognitive-disability"]:checked').checked = false;
  document.querySelector('input[name="color-accessibility"]:checked').checked = false;
  //clearing marked radio buttons

  progressFill.style.width = `0%`
  //clearing progress bar


})
//eventlistener där vi för "Retake quiz" knappen där vi ser till att den laddar om från quizet, inte introduction. 