import iconX from ".././assets/icon-x.svg";
import iconXsilver from ".././assets/icon-x-silver.svg";
import iconXdark from ".././assets/icon-x-dark.svg";
import iconO from ".././assets/icon-o.svg";
import iconOsilver from ".././assets/icon-o-silver.svg";
import iconOdark from ".././assets/icon-o-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { gameSliceActions } from "./../store/store";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.playerOne);

  const chooseX = () => {
    dispatch(gameSliceActions.setPlayerOneToX());
  };
  const chooseO = () => {
    dispatch(gameSliceActions.setPlayerOneToO());
  };
  const cpuOpponentHandler = () => {
    dispatch(gameSliceActions.setOpponentCpu());
    navigate("/game");
    localStorage.setItem("player", JSON.stringify({ player: player,opponent: "cpu" }));
  };
  const humanOpponentHandler = () => {
    dispatch(gameSliceActions.setOpponentHuman());
    navigate("/game");
    localStorage.setItem("player", JSON.stringify({ player: player,opponent: "human" }));
  };

  return (
    <div className="w-screen h-screen bg-[#1A2A33] flex flex-col items-center pt-6">
      <div className="flex mb-[32px]">
        <img className="w-[32px] mr-[7px]" src={iconX} />
        <img className="w-[32px]" src={iconO} />
      </div>
      <div className="w-[327px] h-[205px] bg-[#1F3641] rounded-[15px] flex flex-col justify-center items-center">
        <p className="text-[#A8BFC9] font-bold">PICK PLAYER 1’S MARK</p>
        <div className="w-[279px] h-[75px] bg-[#1A2A33] rounded-[10px] mt-[24px] mb-[17px] flex items-center justify-evenly">
          <button
            onClick={chooseX}
            style={
              player === "X"
                ? { backgroundColor: "#A8BFC9" }
                : { backgroundColor: "#1A2A33" }
            }
            className="w-[131px] h-[54px]  rounded-[10px]  flex items-center justify-center"
          >
            <img
              className="w-[32px]"
              src={player === "X" ? iconXdark : iconXsilver}
            />
          </button>
          <button
            onClick={chooseO}
            style={
              player === "O"
                ? { backgroundColor: "#A8BFC9" }
                : { backgroundColor: "#1A2A33" }
            }
            className="w-[131px] h-[54px] bg-[#A8BFC9] rounded-[10px]  flex items-center justify-center"
          >
            <img
              className="w-[32px]"
              src={player === "O" ? iconOdark : iconOsilver}
            />
          </button>
        </div>
        <p className="text-[14px] text-[#A8BFC9] font-medium">
          REMEMBER : X GOES FIRST
        </p>
      </div>
      <button
        onClick={cpuOpponentHandler}
        className="button-gold bg-[#F2B137] w-[327px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] mt-[32px] mb-[16px] hover:bg-[#FFC860]"
      >
        NEW GAME (VS CPU)
      </button>
      <button
        onClick={humanOpponentHandler}
        className="button-blue bg-[#31C3BD] w-[327px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] hover:bg-[#65E9E4]"
      >
        NEW GAME (VS PLAYER)
      </button>
    </div>
  );
};

export default Landing;
