export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-evenly bg-[#000000] p-5">
      <div className="relative left-[50] mb-3 flex flex-row items-center">
        <span className="relative top-3 p-10 text-xl font-[Open_Sans] font-black text-white">
          News-eye
        </span>
        <div className="border-l-2 p-10 text-sm font-[Open_Sans] font-black text-white">
          제작자: 서근재
          <br /> 연락처: 010-0000-0000
          <br /> 이메일: example@eaxmple.com
          <br /> 이 프로젝트는 개인 사이드 프로젝트입니다😁
        </div>
      </div>
      <span className="relative right-8 text-xs text-white">
        Copyright ⓒ 서근재
      </span>
    </footer>
  );
}
