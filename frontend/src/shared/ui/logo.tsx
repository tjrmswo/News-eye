import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex cursor-pointer flex-row items-center">
        <Image src="/images/news-eye.png" width={55} height={55} alt="로고" />
        <span className="text-2xl font-[Open_Sans] font-black">News-eye</span>
      </div>
    </Link>
  );
}
