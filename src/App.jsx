import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quiz from './components/Quiz/Quiz'
import { QuizInfo } from './components/QuizInfo/QuizInfo'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuizInfo />} />
          <Route path='/Quiz' element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App