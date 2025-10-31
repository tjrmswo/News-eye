import { Reasons } from '@/constants/reason';

export default function DeleteModal() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <span className="w-max border-b-2 border-black text-xl">회원탈퇴</span>

      <select className="w-3xs rounded-sm border-2 border-black p-1 text-base text-[#888888]">
        <option value="" disabled={true}>
          탈퇴 사유를 선택해주세요
        </option>
        {Reasons.map((reason) => (
          <option key={reason.key}>{reason.comment}</option>
        ))}
      </select>

      <textarea className="max-h-2xs w-lg rounded-sm border-2 border-black p-1" />
    </div>
  );
}
