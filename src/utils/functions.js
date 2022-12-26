const isEmpty = (board) => {
  return board.every((cell) => !cell);
};

const isFull = (board) => {
  return board.every((cell) => cell);
};


export const isTerminal = (board) => {
  if (isEmpty(board)) return false;

  if (board[0] === board[1] && board[0] === board[2] && board[0]) {
    return { winner: board[0], winLine: [0, 1, 2] };
  }
  if (board[3] === board[4] && board[3] === board[5] && board[3]) {
    return { winner: board[3], winLine: [3, 4, 5] };
  }
  if (board[6] === board[7] && board[6] === board[8] && board[6]) {
    return { winner: board[6], winLine: [6, 7, 8] };
  }

  if (board[0] === board[3] && board[0] === board[6] && board[0]) {
    return { winner: board[0], winLine: [0, 3, 6] };
  }
  if (board[1] === board[4] && board[1] === board[7] && board[1]) {
    return { winner: board[1], winLine: [1, 4, 7] };
  }
  if (board[2] === board[5] && board[2] === board[8] && board[2]) {
    return { winner: board[2], winLine: [2, 5, 8] };
  }

  if (board[0] === board[4] && board[0] === board[8] && board[0]) {
    return { winner: board[0], winLine: [0, 4, 8] };
  }
  if (board[2] === board[4] && board[2] === board[6] && board[2]) {
    return { winner: board[2], winLine: [2, 4, 6] };
  }

  if (isFull(board)) {
    return { winner: "draw" };
  }

  return false;
};

