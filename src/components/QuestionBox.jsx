

function QuestionBox(props) {
    return <div key={props.key} id="question">
        <p>{props.question}</p>
        <button className="next-button" onClick={props.onClick}></button>
    </div>
}

export default QuestionBox