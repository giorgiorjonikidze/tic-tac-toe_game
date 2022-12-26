import { Link } from "react-router-dom";
import iconO from ".././assets/icon-o.svg";
import iconX from ".././assets/icon-x.svg";

const WinLossPopup = (props) => {
  const nextRoundHandler = () => {
    props.onNextRound()
  };
  return (
    <div className="w-screen h-screen modal absolute">
      <div className="w-screen h-[228px] bg-[#1F3641] flex flex-col items-center justify-center z-50">
        {props.winner === "X" && (
          <p className="font-bold text-[14px] text-[#A8BFC9] mb-4">
           PLAYER 1 WINS!
          </p>
        )}
        {props.winner === "O" && (
          <p className="font-bold text-[14px] text-[#A8BFC9] mb-4">
           PLAYER 2 WINS!
          </p>
        )}
        {props.winner === "draw" && (
          ""
        )}

        {props.winner === "X" && (
          <div className="flex items-center justify-center">
            <img className="w-[30px] mr-[8px]" src={iconX} />
            <p className="font-bold text-[24px] text-[#31C3BD]">
              TAKES THE ROUND
            </p>
          </div>
        )}
        {props.winner === "O" && (
          <div className="flex items-center justify-center">
            <img className="w-[30px] mr-[8px]" src={iconO} />
            <p className="font-bold text-[24px] text-[#F2B137]">
              TAKES THE ROUND
            </p>
          </div>
        )}
        {props.winner === "draw" && (
          <p className="text-[24px] font-bold text-[#A8BFC9]">ROUND TIED</p>
        )}

        <div className="flex">
          <Link to="/" >
            <button className="button-quit bg-[#A8BFC9] w-[76px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] mt-[32px] mb-[16px] hover:bg-[#FFC860] mr-4">
              QUIT
            </button>
          </Link>

          <button
            onClick={nextRoundHandler}
            className="button-gold bg-[#F2B137] w-[146px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] mt-[32px] mb-[16px] hover:bg-[#FFC860]"
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinLossPopup;
