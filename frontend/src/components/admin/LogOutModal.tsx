export default function LogOutModal() {
  return (
    <div className="h-full flex flex-col items-center justify-evenly">
      <span>로그아웃 하시겠습니까?</span>

      <div className="w-[70%] flex flex-row justify-between">
        <button className="w-[100px] border-2 border-[black] rounded-[0.3rem] hover:bg-[black] hover:text-[white]">
          확인
        </button>
        <button className="w-[100px] border-2 border-[black] rounded-[0.3rem] bg-[black] text-[white] hover:border-2 hover:border-[black] hover:text-[black] hover:bg-[white]">
          취소
        </button>
      </div>
    </div>
  );
}
