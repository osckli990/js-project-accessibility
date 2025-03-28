const formQuestions = Array.from(document.getElementsByClassName('form-questions'))
const nextButton = document.getElementById('next-button')
const backButton = document.getElementById('back-button')
const resultButton = document.getElementById('result-button')


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

  console.log(index)
}


nextButton.addEventListener(('click'), () => {
  showNextQuestion(index)
})

backButton.addEventListener(('click'), () => {
  showPrevQuestion(index)
})

