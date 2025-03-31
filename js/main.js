const formQuestions = Array.from(document.getElementsByClassName('form-questions'))
const nextButton = document.getElementById('next-button')
const backButton = document.getElementById('back-button')
const resultButton = document.getElementById('result-button')
const retakeButton = document.getElementById('retake-button')

const resultsPage = document.getElementById('results')

const bar = document.getElementById('bar')
const percent = document.getElementById('percent-bar')


console.log(formQuestions)


let index = 0;



//function that ensures the right buttons and questions are showing at the right time
const showNextQuestion = (i) => {

  if (i >= (formQuestions.length - 1)) {
    return
  } else if (i >= 0) {

    const currentQuestion = formQuestions[i]
    const nextQuestion = formQuestions[(i + 1) % formQuestions.length]

    if (i > 0) {
      const prevQuestion = formQuestions[(i - 1) % formQuestions.length]
      currentQuestion.classList.add('slide-out-left')
    }

    nextQuestion.classList.add('slide-in-right')
    console.log(nextQuestion)

    backButton.removeAttribute('hidden')
    nextQuestion.removeAttribute('hidden')
    currentQuestion.setAttribute('hidden', true)


    if (i === formQuestions.length - 2) {
      nextButton.setAttribute('hidden', true)
      resultButton.removeAttribute('hidden')
    }

    index += 1
    moveBar(index)
    console.log(index)
  }
}

const showPrevQuestion = (i) => {


  if (i >= 1) {
    const currentQuestion = formQuestions[i]
    const prevQuestion = formQuestions[(i - 1) % formQuestions.length]

    const nextQuestion = formQuestions[(i + 1) % formQuestions.length]

    nextQuestion.classList.add('slide-out-right')
    prevQuestion.classList.add('slide-in-left')

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
  moveBar(index)
  console.log(index)
}

const countScore = () => {
  let points = document.querySelectorAll('input[value="true"]:checked')
  console.log("here is:", points)
  return points.length

}

const wrongQuestions = () => {
  let questions = document.querySelectorAll('input[value="false"]:checked')
  let question = []
  //let falseQuestions = questions.closest(':not(span)').data('id')
  //let falseQuestions = questions.parentElement

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


const showResults = (i) => {
  const score = document.getElementById('score')
  const flunked = document.getElementById('flunked')
  const resultsMessage = document.getElementById('results-message')
  const currentQuestion = formQuestions[i]
  const pointTotal = 4
  let points = countScore()
  let questions = wrongQuestions()

  currentQuestion.classList.add('slide-out-left')
  resultsPage.classList.add('slide-in-right')

  backButton.setAttribute('hidden', true)
  nextButton.setAttribute('hidden', true)
  resultButton.setAttribute('hidden', true)
  currentQuestion.setAttribute('hidden', true)
  resultsPage.removeAttribute('hidden')
  retakeButton.removeAttribute('hidden')

  if (points < pointTotal) {
    //flunked.innerHTML = `Questions you got wrong are: ${questions.forEach(q => {
    //  `${q}`
    //})}`
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
  moveBar(4)
}

const moveBar = (i) => {

  switch (i) {
    case 0:
      bar.style.width = "7%"
      break
    case 1:
      bar.style.width = "25%"
      break
    case 2:
      bar.style.width = "50%"
      break
    case 3:
      bar.style.width = "75%"
      break
    case 4:
      bar.style.width = "100%"
      break
    default:
      bar.style.width = "7%"
      break
  }
}






nextButton.addEventListener(('click'), () => {
  showNextQuestion(index)
})

backButton.addEventListener(('click'), () => {
  showPrevQuestion(index)
})

resultButton.addEventListener(('click'), (event) => {
  event.preventDefault()
  showResults(index)
})

//eventlistener där vi för "Retake quiz" knappen där vi ser till att den laddar om från quizet, inte introduction. 