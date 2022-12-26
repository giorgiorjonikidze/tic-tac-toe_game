import { createSlice, configureStore } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "tic-tac-toe",
  initialState: {
    playerOne: "X",
    opponent: "cpu"
  },
  reducers: {
    setPlayerOneToX(state){
        state.playerOne = "X"
    },
    setPlayerOneToO(state){
        state.playerOne = "O"
    },
    setOpponentCpu(state){
        state.opponent = "cpu"
    },
    setOpponentHuman(state){
        state.opponent = "human"
    },
  },
});

const store = configureStore({
  reducer: gameSlice.reducer,
});

export const gameSliceActions = gameSlice.actions;

export default store;
