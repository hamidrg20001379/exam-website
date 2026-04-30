
import './QuestionBox.css'
import QuestionText from './QuestionText'
function QuestionBox(props) {
    return <div key={props.key} id="question" className="question-box">
        <QuestionText question={props.question}></QuestionText>
        <button
            className="next-button"
            onClick={props.onClick}
            disabled={props.isDisabled}
        >
            next
        </button>
    </div>
}

export default QuestionBox
