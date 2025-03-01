export default function LogoutModal() {
  return (
    <div className="flex h-full flex-col items-center justify-evenly">
      <span>로그아웃 하시겠습니까?</span>

      <div className="flex w-[70%] flex-row justify-between mb-2">
        <button className="w-[100px] rounded-[0.3rem] border-2 border-[black] hover:bg-[black] hover:text-[white]">
          확인
        </button>
        <button className="w-[100px] rounded-[0.3rem] border-2 border-[black] bg-[black] text-[white] hover:border-2 hover:border-[black] hover:bg-[white] hover:text-[black]">
          취소
        </button>
      </div>
    </div>
  );
}
