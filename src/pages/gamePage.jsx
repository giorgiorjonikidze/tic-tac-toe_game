import iconX from ".././assets/icon-x.svg";
import iconO from ".././assets/icon-o.svg";
import restartIcon from ".././assets/icon-restart.svg";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import WinLossPopup from "../components/winLoss";
import { isTerminal } from "../utils/functions";
import InputBox from "../components/inputBox";
import RestartGame from "./../components/restartGame";

const GamePage = () => {
  const [nodes, setNodes] = useState({});
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winLine, setWinLine] = useState([]);
  const [resultPopup, setResultPopup] = useState(false);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("X");
  const [showResetPopup, setShowRestepopup] = useState(false);
  const [scores, setScores] = useState({ x: 0, o: 0, draw: 0 });
  const [human, setHuman] = useState("X");
  const [cpu, setCpu] = useState("O");

  const playerSymbol = useSelector((state) => state.playerOne);

  useEffect(() => {
    cpuStartHandler();
  }, []);

  const cpuStartHandler = () => {
    const { player, opponent } = JSON.parse(localStorage.getItem("player"));
    console.log(player);
    if (player === "O" && opponent === "cpu") {
      let editedBoard = [...board];
      let randomNumber = getBestMove(editedBoard, 0, false);
      if (editedBoard[randomNumber] === "") {
        editedBoard[randomNumber] = "X";
      }

      setBoard(editedBoard);
      setHuman("O");
      setCpu("X");
    }
  };

  const gameReset = () => {
    setWinLine([]);
    setBoard(Array(9).fill(""));
  };

  const getAvailableMoves = (board) => {
    const moves = [];
    board.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  };

  const handleClick = (id) => {
    const { opponent } = JSON.parse(localStorage.getItem("player"));

    if (board[id] !== "") return;

    if (opponent === "cpu") {
      let editedBoard = [...board];
      editedBoard[id] = human;

      setBoard(editedBoard);

      if (isTerminal(editedBoard).winner === human) {
        setWinLine(isTerminal(editedBoard).winLine);
        setScores((prevState) => ({ ...prevState, x: prevState.x + 1 }));
        setResultPopup(true);
        setWinner(human);
        return;
      }

      let randomNumber = getBestMove(editedBoard, 0, false);
      if (editedBoard[randomNumber] === "") {
        editedBoard[randomNumber] = cpu;
      }

      setBoard(editedBoard);

      if (isTerminal(editedBoard).winner === cpu) {
        setWinLine(isTerminal(editedBoard).winLine);
        setScores((prevState) => ({ ...prevState, o: prevState.o + 1 }));
        setResultPopup(true);
        setWinner(cpu);
        return;
      }

      if (isTerminal(editedBoard).winner === "draw") {
        setScores((prevState) => ({ ...prevState, draw: prevState.draw + 1 }));
        setResultPopup(true);
        setWinner("draw");
      }
    } else {
      let editedBoard = [...board];
      editedBoard[id] = turn;

      setBoard(editedBoard);

      if (isTerminal(editedBoard).winner === human) {
        setWinLine(isTerminal(editedBoard).winLine);
        setScores((prevState) => ({ ...prevState, x: prevState.x + 1 }));
        setResultPopup(true);
        setWinner(human);
        return;
      }

      setBoard(editedBoard);

      if (isTerminal(editedBoard).winner === cpu) {
        setWinLine(isTerminal(editedBoard).winLine);
        setScores((prevState) => ({ ...prevState, o: prevState.o + 1 }));
        setResultPopup(true);
        setWinner(cpu);
        return;
      }

      if (isTerminal(editedBoard).winner === "draw") {
        setScores((prevState) => ({ ...prevState, draw: prevState.draw + 1 }));
        setResultPopup(true);
        setWinner("draw");
      }
      if (turn === "X") {
        setTurn("O");
      } else {
        setTurn("X");
      }
    }
  };

  // const isEmpty = (board) => {
  //   return board.every((cell) => !cell);
  // };

  // const isFull = (board) => {
  //   return board.every((cell) => cell);
  // };

  const getBestMove = (newBoard, depth, isMax, callback = () => {}) => {
    if (depth === 0) setNodes({});

    if (isTerminal(newBoard) || depth === -1) {
      if (isTerminal(newBoard).winner === human) {
        return 100 - depth;
      } else if (isTerminal(newBoard).winner === cpu) {
        return -100 + depth;
      }
      return 0;
    }

    if (isMax) {
      let best = -100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = human;

        let score = getBestMove(child, depth + 1, false, callback);
        best = Math.max(best, score);
      });

      return best;
    }

    if (!isMax) {
      let best = 100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = cpu;

        let score = getBestMove(child, depth + 1, true, callback);
        best = Math.min(best, score);

        if (depth === 0) {
          const moves = nodes[score] ? `${nodes[score]},${index}` : index;
          nodes[score] = moves;
        }
      });
      if (depth === 0) {
        let returnValue;

        if (typeof nodes[best] === "string") {
          const arr = nodes[best].split(",");
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = nodes[best];
        }

        callback(returnValue);
        return returnValue;
      }
      return best;
    }
  };

  const nextRoundHandler = () => {
    gameReset();
    setResultPopup(false);
    const { player, opponent } = JSON.parse(localStorage.getItem("player"));
    if (player === "O" && opponent === "cpu") {
      let editedBoard = Array(9).fill("");
      let randomNumber = getBestMove(editedBoard, 0, false);
      if (editedBoard[randomNumber] === "") {
        editedBoard[randomNumber] = "X";
      }

      setBoard(editedBoard);
    }
  };
  const showRestarthandler = () => {
    setShowRestepopup(!showResetPopup);
  };

  const closeResetHandler = () => {
    setShowRestepopup(!showResetPopup);
  };
  const restartGameHandler = () => {
    gameReset();
    setScores({ x: 0, o: 0, draw: 0 });
    setShowRestepopup(!showResetPopup);
    const { player, opponent } = JSON.parse(localStorage.getItem("player"));
    if (player === "O" && opponent === "cpu") {
      let editedBoard = Array(9).fill("");
      let randomNumber = getBestMove(editedBoard, 0, false);
      console.log(randomNumber);
      if (editedBoard[randomNumber] === "") {
        editedBoard[randomNumber] = "X";
      }

      setBoard(editedBoard);
    }
  };

  const quitHandler = () => {
    setResultPopup(!resultPopup);
  };

  return (
    <Fragment>
      {resultPopup && (
        <WinLossPopup
          onNextRound={nextRoundHandler}
          onClickQuit={quitHandler}
          winner={winner}
        />
      )}
      {showResetPopup && (
        <RestartGame
          onClickCloseResetPopup={closeResetHandler}
          onClickRestartGame={restartGameHandler}
        />
      )}
      <div className="w-screen h-screen md:h-auto xl:h-screen  bg-[#1A2A33] flex flex-col items-center py-6 md:py-6 md:justify-center">
        <div className="flex justify-between w-full  px-[23px]  max-w-[375px] md:max-w-[500px]">
          <div className="flex mb-[32px] md:mb-[20px]">
            <img className="w-[32px] mr-[7px]" src={iconX} />
            <img className="w-[32px]" src={iconO} />
          </div>
          <div className="w-[96px] md:w-[140px] h-[40px] bg-[#1F3641] rounded-[5px] text-[#A8BFC9] text-[14px] font-bold flex items-center justify-evenly mr-[30px] md:gap-[13px] md:justify-center">
            <img className="w-[16px]" src={turn === human ? iconX : iconO} />
            TURN
          </div>
          <button
            onClick={showRestarthandler}
            className="w-[40px] h-[40px] bg-[#A8BFC9] rounded-[5px] flex items-center justify-center hover:bg-[#DBE8ED]"
          >
            <img src={restartIcon} alt="" />
          </button>
        </div>
        <div className="flex flex-wrap justify-center max-w-[375px] md:max-w-[500px]">
          {board.map((val, i) => {
            return (
              <InputBox
                key={i}
                id={i}
                value={val}
                handleClick={handleClick}
                board={winLine}
              />
            );
          })}
        </div>
        <div className="flex mt-[10px]">
          <div
            style={
              playerSymbol === human
                ? { backgroundColor: "#31C3BD" }
                : { backgroundColor: "#F2B137" }
            }
            className="w-[96px] md:w-[140px] h-[64px]  rounded-[10px] m-[10px] text-[14px] text-[#1A2A33] font-medium flex flex-col justify-center items-center"
          >
            <p>{playerSymbol} (YOU)</p>
            <p className="font-bold text-[20px]">{scores.x}</p>
          </div>
          <div className="w-[96px] md:w-[140px] h-[64px] bg-[#A8BFC9] rounded-[10px] m-[10px] text-[14px] text-[#1A2A33] font-medium flex flex-col justify-center items-center">
            <p>TIES</p>
            <p className="font-bold text-[20px]">{scores.draw}</p>
          </div>
          <div
            style={
              playerSymbol === cpu
                ? { backgroundColor: "#31C3BD" }
                : { backgroundColor: "#F2B137" }
            }
            className="w-[96px] md:w-[140px] h-[64px] rounded-[10px] m-[10px] text-[14px] text-[#1A2A33] font-medium flex flex-col justify-center items-center"
          >
            <p>{playerSymbol === human ? cpu : human} (CPU)</p>
            <p className="font-bold text-[20px]">{scores.o}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GamePage;
