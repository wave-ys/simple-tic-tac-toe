import {useGameStateContext} from "./game-provider";

export default function GameResult() {
    const gameState = useGameStateContext();

    if (!gameState.winner)
        return <></>

    return (
        <div style={{ marginTop: "1rem" }}>
            The winner is
            {gameState.winner === 1 && " X"}
            {gameState.winner === 2 && " O"}
            !
        </div>
    )
}