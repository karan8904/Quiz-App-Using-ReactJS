import React, { useState } from 'react'
import './style.css'
import { noOfQuestions, category, difficulty, type } from '../Params'
import { useNavigate } from 'react-router-dom'

function QuizInfo() {
  const [processing, setProcessing] = useState(false);
  const [quizConfig, setQuizConfig] = useState({
    nums: 1,
    cat: 0,
    diff: 0,
    qType: 0,
  });

  const { nums, cat, diff, qType } = quizConfig;
  const updateQuizConfig = (key, value) => {
    setQuizConfig((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  const navigate = useNavigate();

  const handleStartButton = (e) => {
    e.preventDefault();
    setProcessing(true);
    fetch(`https://opentdb.com/api.php?amount=${nums}&category=${cat}&difficulty=${diff}&type=${qType}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          navigate('/Quiz', { state: { results: data.results } });
        }, 3000);
      })
      .catch(err => {
        alert("Something went wrong. Please try again.");
        setProcessing(false);
        console.log(err);
      });
  }

  return (
    <div className='container'>
      <h1>QuizApp</h1>
      <hr />
      <form className='quizInfo'>
        <div>
          <label htmlFor="noOfQue">Number of Questions:</label>
          <select name="noOfQue" id="noOfQue" onChange={e => updateQuizConfig('nums', e.target.value)} disabled={processing}>
            {noOfQuestions.map((obj) => (
              <option key={obj.key} value={obj.value}>{obj.text}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cat">Select Category:</label>
          <select name="cat" id="cat" onChange={e => updateQuizConfig('cat', e.target.value)} disabled={processing}>
            {category.map((obj) => (
              <option key={obj.key} value={obj.value}>{obj.text}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select name="difficulty" id="difficulty" onChange={e => updateQuizConfig('diff', e.target.value)} disabled={processing}>
            {difficulty.map((obj) => (
              <option key={obj.key} value={obj.value}>{obj.text}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type">Select Type:</label>
          <select name="type" id="type" onChange={e => updateQuizConfig('qType', e.target.value)} disabled={processing}>
            {type.map((obj) => (
              <option key={obj.key} value={obj.value}>{obj.text}</option>
            ))}
          </select>
        </div>

        <button type="submit" onClick={handleStartButton} disabled={processing}>
          {processing ? 'Processing' : 'Start Quiz'}
        </button>
      </form>
    </div>
  )
}

export { QuizInfo }