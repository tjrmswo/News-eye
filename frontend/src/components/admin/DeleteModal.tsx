import { Reasons } from '@/constants/reason';

export default function DeleteModal() {
  return (
    <div className="flex h-full flex-col p-5 gap-3">
      <span className="w-max border-b-2 text-xl border-black">회원탈퇴</span>

      <select
        id="select"
        className="w-3xs border-black border-2 rounded-sm text-base text-[#888888] p-1"
        aria-placeholder="탈퇴 사유를 선택해주세요"
      >
        {Reasons.map((reason) => (
          <option key={reason.key}>{reason.comment}</option>
        ))}
      </select>

      <textarea className="w-lg h-2xs border-black border-2 rounded-sm p-1" />
    </div>
  );
}
