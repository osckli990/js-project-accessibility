const formQuestions = Array.from(document.getElementsByClassName('form-questions'))
const nextButton = document.getElementById('next-button')

console.log(formQuestions)


let index = 0;




const showNextQuestion = (i) => {

  if (i >= (formQuestions.length - 1)) {
    console.log("här borde vi sluta")
  } else {

    const currentQuestion = formQuestions[i]
    const nextQuestion = formQuestions[(i + 1) % formQuestions.length]
    console.log(nextQuestion)

    currentQuestion.setAttribute('hidden', true)
    nextQuestion.removeAttribute('hidden', false)


    index += 1

    console.log(index)

  }

  //tar in index och kollar vad det är? 
  //lägga till 1 på indexet

  //ändra så index variabel blir det nya numret

  //visa array-item med det indexet

  //ändra attributet till hidden eller ta bort hidden 

}


nextButton.addEventListener(('click'), () => {
  showNextQuestion(index)
})

