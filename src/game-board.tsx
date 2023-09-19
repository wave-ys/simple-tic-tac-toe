import {useGameStateContext} from "./game-provider";

export default function GameBoard() {
    const gameState = useGameStateContext();

    return (
        <div>
            {
                Array(gameState.size).fill(undefined).map((_, row) =>
                    <div style={{display: "flex"}} key={row}>
                        {
                            new Array(gameState.size).fill(undefined).map((_, col) =>
                                <div key={col} style={{
                                    width: "2rem",
                                    height: "2rem",
                                    border: "0.5px solid black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} onClick={() => {
                                    if (!gameState.playing)
                                        return alert("Click Play to play the game!");
                                    if (gameState.winner)
                                        return alert("Game is over!")
                                    gameState.toggle(gameState.currentPlayer, row, col)
                                }}>
                                    <span>
                                        {gameState.board[row][col] === 1 && 'X'}
                                        {gameState.board[row][col] === 2 && 'O'}
                                    </span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}