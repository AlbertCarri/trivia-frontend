'use client'

import ConfettiRain from "@/components/confetti"
import { triviaAnswer } from "@/utils/trivia"
import { use, useEffect, useState } from "react"

export default function Home() {
  const [orderQuestions, setOrderQuestions] = useState([])
  const [trivia, setTrivia] = useState(0)
  const [gameState, setGameState] = useState('ready')
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(15)
  const [confetti, setConfetti] = useState(false)
  const question = triviaAnswer

  useEffect(() => {
    if (time <= 0 && gameState === 'runing') gameOver('timeover')
    if (time > 0) {
      const intervalo = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(intervalo);
    }

  }, [time]);

  const randomQuestions = () => {
    let questionList = Array.from({ length: 55 }, (_, i) => i)
    for (let i = questionList.length - 1; i > -1; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let beforeJ = questionList[i]
      questionList[i] = questionList[j]
      questionList[j] = beforeJ
    }
    setConfetti(false)
    setScore(0)
    setTrivia(0)
    setOrderQuestions(questionList)
    setGameState('runing')
    setTime(15)
  }

  const checkResult = (result, correctAnswer) => {
    if (result === question[orderQuestions[trivia]][5]) {
      setScore(score + 100)
      setGameState('correct')
    } else {
      gameOver('gameover')
    }
    console.log('TRIVIA:::', trivia)
  }

  const nextQuestion = () => {
    setTrivia(trivia + 1)
    if (trivia === 53) {
      setConfetti(true)
      setGameState('fin')
    } else {
      setGameState('runing')
      setTime(15)
    }
  }

  const gameOver = (game) => {
    setGameState(game)
  }

  return (
    <div className="flex flex-col lg:w-1/3 w-11/12 lg:p-8 p-2 mx-auto mt-2">
      {confetti && (
        <>
          <ConfettiRain />
          <div className="dark:bg-cyan-600 bg-sky-200 text-center mt-16 lg:w-2/3 w-full p-4 rounded-3xl mx-auto border-solid border-2 dark:border-neutral-100 border-neutral-900">
            <p className="text-4xl mb-4"><b>¡¡¡Congratilacion!!!</b></p>
            <p className="text-xl mb-2"><b>¡Eres el campeón!</b></p>
            <p className="text-xl mb-8">Tu Puntaje fue : {score}</p>
            <button type="button" onClick={randomQuestions} className="bg-stone-500 rounded-2xl px-4 py-2 shadow-neutral-900 shadow-xl">JUGAR DE NUEVO</button>
          </div>
        </>
      )}

      {gameState === 'correct' && (
        <div className="dark:bg-cyan-600 bg-sky-200 text-center mt-16 lg:w-2/3 w-full p-4 rounded-3xl mx-auto border-solid border-2 dark:border-neutral-100 border-neutral-900">
          <p className="text-4xl mb-4"><b>Correcto</b></p>
          <p className="text-xl mb-4">"{question[orderQuestions[trivia]][0]}"</p>
          <p className="text-xl mb-2"><b>Respuesta correcta:</b></p>
          <p className="text-xl mb-16">{question[orderQuestions[trivia]][((question[orderQuestions[trivia]][5]).charCodeAt(0)) - 64]}</p>
          <button type="button" onClick={nextQuestion} className="bg-stone-500 rounded-2xl px-4 py-2 shadow-neutral-900 shadow-xl">PRÓXIMA PREGUNTA</button>
        </div>
      )}

      {(gameState === 'gameover' || gameState === 'timeover') && (
        <div className="dark:bg-red-700 bg-red-300 text-center mt-8 lg:w-2/3 w-full px-4 py-8 rounded-3xl mx-auto border-solid border-2 dark:border-neutral-100 border-neutral-900">
          <p className="text-4xl mb-4"><b>{gameState === 'timeover' ? 'Se acabó el tiempo' : 'Fallaste'}</b></p>
          <p className="text-xl mb-4">"{question[orderQuestions[trivia]][0]}"</p>
          <p className="text-xl mb-2"><b>La respuesta correcta era:</b></p>
          <p className="text-ms mb-12">{question[orderQuestions[trivia]][((question[orderQuestions[trivia]][5]).charCodeAt(0)) - 64]}</p>
          <p className="text-xl mb-8">Tu Puntaje fue : {score}</p>
          <button type="button" onClick={randomQuestions} className="bg-stone-500 rounded-2xl px-4 py-2 shadow-neutral-900 shadow-xl">JUGAR OTRA VEZ</button>
        </div>
      )}

      {gameState === 'ready' && (
        <div className="text-center mt-12">
          <p className="lg:text-6xl text-4xl">Trivia Frontend</p>
          <p className="lg:text-2xl text-ms">HTML, CSS, Javascript y REACT</p>
          <button type="button" onClick={randomQuestions}
            className="dark:bg-red-800 bg-red-400 mx-auto w-32 p-4 rounded-xl text-2xl mb-4 mt-32"
          >Start</button>
        </div>
      )}
      {gameState === 'runing' && (
        <div className="lg:text-2xl text-lg text-center">
          <div className="text-4xl lg:mb-8 mb-0">
            Score {score}
          </div>
          <div className="flex flex-row lg:text-5xl text-2xl lg:mb-8 mb-0 justify-center items-center">
            <img src="/time.png" alt="time" className="lg:scale-100 scale-50"/> {time}
          </div>
          <div className="mb-8 dark:bg-yellow-600 bg-yellow-200 dark:text-white text-slate-800 py-4 px-6 border-solid border-2 border-white rounded-2xl">
            <h1>{question[orderQuestions[trivia]][0]}</h1>
          </div>
          <div className=" flex flex-col items-center ">
            <button className="bg-teal-800 dark:text-current text-slate-200 w-11/12 py-2 px-4 border-solid border-2 border-white rounded-2xl mb-2 active:bg-orange-700 lg:hover:bg-orange-700"
              onClick={() => checkResult('A', question[orderQuestions[trivia]][1])}>
              {question[orderQuestions[trivia]][1]}
            </button>
            <button className="bg-teal-800 dark:text-current text-slate-200 w-11/12 py-2 px-4 border-solid border-2 border-white rounded-2xl mb-2 active:bg-orange-700 lg:hover:bg-orange-700"
              onClick={() => checkResult('B', question[orderQuestions[trivia]][2])}
            >
              {question[orderQuestions[trivia]][2]}
            </button>
            <button className="bg-teal-800 dark:text-current text-slate-200 w-11/12 py-2 px-4 border-solid border-2 border-white rounded-2xl mb-2 active:bg-orange-700 lg:hover:bg-orange-700"
              onClick={() => checkResult('C', question[orderQuestions[trivia]][3])}
            >
              {question[orderQuestions[trivia]][3]}
            </button>
            <button className="bg-teal-800 dark:text-current text-slate-200 w-11/12 py-2 px-4 border-solid border-2 border-white rounded-2xl mb-2 active:bg-orange-700 lg:hover:bg-orange-700"
              onClick={() => checkResult('D', question[orderQuestions[trivia]][4])}
            >
              {question[orderQuestions[trivia]][4]}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
