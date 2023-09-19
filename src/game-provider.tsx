import React, {createContext, useCallback, useContext, useState} from "react";

interface GameState {
    playing: boolean;
    size: number;
    board: number[][]; // 0 or 1('X') or 2('O')
    winner: number;
    currentPlayer: number; // 1('X') or 2('O')
}

interface GameStateContextType extends GameState{
    resetBoard: (size?: number) => void;
    playGame: () => void;
    toggle: (player: number, row: number, col: number) => void;
}

const contextDefaultValue : GameStateContextType = {
    playing: false,
    size: 3,
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    winner: 0,
    currentPlayer: 1,

    resetBoard: () => {},
    playGame: () => {},
    toggle: () => {}
}

const GameStateContext = createContext<GameStateContextType>(contextDefaultValue)

export function useGameStateContext() {
    return useContext(GameStateContext);
}

export function GameStateProvider({children}:{children: React.ReactNode}) {
    const [gameState, setGameState] = useState<GameState>(contextDefaultValue);

    const clearBoard = useCallback((size?: number) => {
        setGameState(prev => ({
            ...prev,
            size: size ?? prev.size,
            board: Array(size ?? prev.size).fill(Array(size ?? prev.size).fill(0)),
            winner: 0,
            currentPlayer: 1,
            playing: false
        }));
    }, []);

    const checkWinner = useCallback((board: number[][], size: number) => {
        for (let i = 0; i < size; i++) {
            if (board[i].every(v => v === 1))
                return 1;
            if (board[i].every(v => v === 2))
                return 2;
        }

        for (let i = 0; i < size; i++) {
            const col = board.map(row => row[i]);
            if (col.every(v => v === 1))
                return 1;
            if (col.every(v => v === 2))
                return 2;
        }

        const slash1 = board.map((row, index) => row[index]);
        if (slash1.every(v => v === 1))
            return 1;
        if (slash1.every(v => v === 2))
            return 2;

        const slash2 = board.map((row, index) => row[size - index - 1]);
        if (slash2.every(v => v === 1))
            return 1;
        if (slash2.every(v => v === 2))
            return 2;

        return 0;
    }, [])

    const playGame = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            playing: true
        }))
    }, []);

    const toggle = useCallback((player: number, row: number, col: number) => {
        setGameState(prev => {
            if (!prev.playing || prev.winner)
                return prev;

            const resBoard = [...prev.board].map(item => [...item]);
            resBoard[row][col] = player;

            return ({
                ...prev,
                board: resBoard,
                currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
                winner: checkWinner(resBoard, prev.size)
            })
        });
    }, [checkWinner])

    return (
        <GameStateContext.Provider value={{
            ...gameState,
            resetBoard: clearBoard,
            playGame,
            toggle
        }}>
            {children}
        </GameStateContext.Provider>
    )
}