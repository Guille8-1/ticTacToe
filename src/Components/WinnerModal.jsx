import { Square } from "./Squares";
export const WinnerModal = ({winner, resetGame}) => {
    if (winner === null) return null;
    const winnerText = winner === false ? 'Draw' : 'Won'
    return (
        <>
            {
                winner != null && (
                <section className="winner">
                    <div className="text">
                        <h2>
                        {winnerText}
                        </h2>
                        <header>
                        {winner && <Square>{winner}</Square>}
                        </header>
                        <footer>
                        <button onClick={resetGame}>Play Again?</button>
                        </footer>
                    </div>
                </section>
                )
            }
        </>
    )
}