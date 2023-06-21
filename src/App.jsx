import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./Components/Squares.jsx"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./board.js"
import { WinnerModal } from "./Components/WinnerModal.jsx"
import { checkDraw } from "./board.js"

function App() {
  const [board, setBoard] = useState(() =>  {
    const boardFromStore = window.localStorage.getItem('board')
    return boardFromStore ? JSON.parse(boardFromStore) : Array (9).fill(null)
  })
  const [turn, setTurn] = useState( () =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  

  const updateBoard = (index) => {
    // do not fill the board if something was selected
    if(board[index]|| winner){return}
    // refresh the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //change turns
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Save the game 
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkDraw(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
      <main className='board'>
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          {
            board.map((sqaure, index) => {
              return (
               <Square key={index} index={index} updateBoard={updateBoard}>
                 {sqaure}
               </Square>
              )
            }
          )}
        </section>
        <section className="turn">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner}/>
      </main>
    </>
  )
}

export default App
