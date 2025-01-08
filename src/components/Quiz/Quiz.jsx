import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.css'

function Quiz() {
  const [index, setIndex] = useState(0);
  const [quizStatus, setQuizStatus] = useState('Running');
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state.results;

  useEffect(() => {
    const options = {
      allOpts: [...results[index].incorrect_answers, results[index].correct_answer],
      incorrectOpts: [...results[index].incorrect_answers],
      correctOpt: results[index].correct_answer
    };

    shuffleOptions(options.allOpts);
    setShuffledOptions(options.allOpts);
    setSelectedOption(null);
  }, [index])

  const shuffleOptions = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }


  const handleNext = () => {
    if (index === results.length - 1) {
      setQuizStatus('Over');
    }
    else {
      setIndex(index + 1);
      setSelectedOption(null);
    }
  }

  const checkAnswer = (result, ans) => {
    setSelectedOption(ans);
    if (ans === results[index].correct_answer)
      setCount(count + 1);
    setAnswers([...answers, { num: index + 1, question: result.question, selectedOpt: ans, correctOpt: result.correct_answer }]);
  }


  const getOption = (option) => {
    if (!selectedOption) return ''
    return option === results[index].correct_answer
      ? 'correct'
      : selectedOption === option
        ? 'incorrect'
        : '';
  }

  const decodeHtmlEntities = (text) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
    return decodedString;
  };

  const handleRestartQuiz = () => {
    navigate('/');
  }

  return quizStatus === 'Running' ? (
    <div className='container'>
      <h1>QuizApp</h1>
      <hr />
      <h2>{index + 1}. {decodeHtmlEntities(results[index].question)}</h2>
      <ul>
        {shuffledOptions.map((option, idx) => {
          return (
            <li key={idx} className={getOption(option)} onClick={() => checkAnswer(results[index], option)}>{decodeHtmlEntities(option)}</li>
          )
        })}
      </ul>
      <button onClick={handleNext} disabled={!selectedOption}>{index === results.length - 1 ? 'Finish' : 'Next'}</button>
      <div className="index">{index + 1} of {results.length} Question</div>
    </div>
  )
    :
    (
      <div className='container'>
        <h1>QuizApp</h1>
        <hr />
        <table className='table' border='1px' cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Selected Answer</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((obj, key) => (
              <tr key={key}>
                <td>{obj.num}</td>
                <td>{decodeHtmlEntities(obj.question)}</td>
                <td>{decodeHtmlEntities(obj.correctOpt)}</td>
                <td>{decodeHtmlEntities(obj.selectedOpt)}</td>
              </tr>
            ))}
          </tbody>

        </table>
        <h4>You got {count} questions correct out of {results.length} questions.</h4>
        <button onClick={handleRestartQuiz}>Start New Quiz</button>
      </div>
    )

}

export default Quiz