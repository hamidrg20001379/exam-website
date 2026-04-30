import { useState, useEffect } from "react";
import "./App.css";
import QuestionBox from "./components/QuestionBox";
import { supabase } from "./lib/supabase";

function App() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  async function loadQuestions() {
    setIsLoading(true);
    setErrorMessage("");
    setIsEmpty(false);

    const { data, error } = await supabase
      .from("questions")
      .select("*");

    if (error) {
      console.error("Failed to fetch questions from Supabase:", error);
      setQuestions([]);
      setQuestion(null);
      setErrorMessage("We couldn't load questions right now. Please try again.");
      setIsLoading(false);
      return;
    }

    const safeData = data ?? [];
    setQuestions(safeData);

    if (safeData.length === 0) {
      setQuestion(null);
      setIsEmpty(true);
      setIsLoading(false);
      return;
    }

    // Pick a random question immediately
    setQuestion(
      safeData[Math.floor(Math.random() * safeData.length)]
    );
    setIsLoading(false);
  }

  // 1. Load questions from Supabase when app loads
  useEffect(() => {
    loadQuestions();
  }, []);

  // 2. Button: pick new random question
  function changeQuestionIndex() {
    if (questions.length === 0 || isEmpty) return;
    const random = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(random);
  }

  if (isLoading) {
    return (
      <div>
        <h1>Exam Website</h1>
        <p>Loading your question bank...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <h1>Exam Website</h1>
        <p>{errorMessage}</p>
        <button onClick={loadQuestions}>Retry</button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div>
        <h1>Exam Website</h1>
        <p>No questions published yet.</p>
        <p>Admin guidance: add and publish questions in Supabase to get started.</p>
        <button disabled>next</button>
      </div>
    );
  }

  return (
    <QuestionBox
      question={question}
      onClick={changeQuestionIndex}
      isDisabled={isEmpty}
    />
  );
}

export default App;
