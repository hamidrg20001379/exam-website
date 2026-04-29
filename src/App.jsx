import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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
    onClick={changeQuestionIndex}
  >

  </QuestionBox>
}

export default App
