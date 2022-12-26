
const RestartGame = ({onClickCloseResetPopup, onClickRestartGame}) => {
    

    const closePopupHandler = () => {
        onClickCloseResetPopup()
    }
    const restartHandler =( ) => {
        onClickRestartGame()
    }
    return (
        <div className="w-screen h-screen absolute modal">
            <div className="w-screen h-[228px] flex flex-col items-center justify-center bg-[#1F3641]">
                <p className="font-bold text-[24px] text-[#A8BFC9]">RESTART GAME?</p>
                <div className="flex">
                    <button onClick={closePopupHandler} className="button-quit bg-[#A8BFC9] w-[139px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] mt-[32px] mb-[16px] hover:bg-[#DBE8ED] mr-4">NO, CANCEL</button>
                    <button onClick={restartHandler} className="button-gold bg-[#F2B137] w-[151px] h-[56px] rounded-[15px] font-bold text-[#1A2A33] mt-[32px] mb-[16px] hover:bg-[#FFC860]">YES, RESTART</button>
                </div>
            </div>
        </div>
    );
}
 
export default RestartGame;