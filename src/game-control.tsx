import {useGameStateContext} from "./game-provider";

export default function GameControl() {
    const gameState = useGameStateContext();

    return (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <label>
                Board Size:
                <input type={"number"} min={3} disabled={gameState.playing} style={{marginLeft: "1rem"}} value={gameState.size} onChange={e => gameState.resetBoard(+e.target.value)}/>
            </label>
            {
                gameState.playing ?
                    <button type={"button"} onClick={() => gameState.resetBoard()}>Reset</button> :
                    <button type={"button"} onClick={gameState.playGame}>Play</button>
            }
        </div>
    )
}