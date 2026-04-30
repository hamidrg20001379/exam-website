import { useState, useEffect } from "react";
import "./App.css";
import QuestionBox from "./components/QuestionBox";
import { supabase } from "./lib/supabase";

function App() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  // 1. Load questions from Supabase when app loads
  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*");

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      setQuestions(data);

      // Pick a random question immediately
      if (data.length > 0) {
        setQuestion(
          data[Math.floor(Math.random() * data.length)]
        );
      }
    }

    loadQuestions();
  }, []);

  // 2. Button: pick new random question
  function changeQuestionIndex() {
    if (questions.length === 0) return;
    const random = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(random);
  }

  // 3. If still loading:
  if (!question) return <div>Loading...</div>;

  return (
    <QuestionBox
      question={question}
      onClick={changeQuestionIndex}
    />
  );
}

export default App;
