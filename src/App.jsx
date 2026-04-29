import { useState } from 'react'
import './App.css'
import QuestionBox from './components/QuestionBox'
import questions from '../questions.json'

function RandomQuestionGenerator() {
  return questions[Math.floor(questions.length * Math.random())]
}
function App() {
  const [question, setQuestion] = useState(RandomQuestionGenerator())

  function changeQuestionIndex() {
    setQuestion(RandomQuestionGenerator())
  }
  return <QuestionBox
    question={question}
    onClick={changeQuestionIndex}
  >

  </QuestionBox>
}

export default App
