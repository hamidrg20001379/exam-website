import { useState } from 'react'
import './QuestionBox.css'


function QuestionText(props) {
    var [isAnswerShowing,setAnswerState] = useState(false)

    function toggle(){
        setAnswerState(!isAnswerShowing)
    }
    return <div className="question-text-area"
    onClick={toggle}>
        <p>{isAnswerShowing ? props.question.answer : props.question.question}</p>
    </div>
}

export default QuestionText