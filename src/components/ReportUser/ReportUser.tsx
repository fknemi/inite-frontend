import React, { useState } from "react";
import { reportInstagramUser } from "../../api/user/user";
import { useSetRecoilState } from 'recoil';
import { showReportModalAtom } from "../../statedrive/atoms";
let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";
const ReportUser = ({ username }: { username: string }) => {
  const [reportUser, setReportUser] = useState({
    accountReported: { username },
    reason: `i peed my pants ${username}`,
    description: `i peed my pants ${username}`,
  });
  const setShowReportModal = useSetRecoilState(showReportModalAtom)
  return (
    <div className="bg-gray-500 flex flex-col gap-3 absolute w-80 h-80 top-10 left-60  border-red-500 border border-3">
        <button onClick={() => setShowReportModal(false)}>Close</button>
      <h1 className="font-bold">Reporting User: {username}</h1>
      <input
        placeholder="reason"
        type="text"
        className="border-3 border-green-400"
        value={reportUser.reason}
        onChange={(e) => {
          setReportUser({
            ...reportUser,
            reason: e.target.value,
          });
        }}
      />

      <input
        placeholder="description"
        type="text"
        className="border-3 border-green-400"
        value={reportUser.description}
        onChange={(e) => {
          setReportUser({
            ...reportUser,
            description: e.target.value,
          });
        }}
      />
      <button
        className={BUTTON_STYLE}
        onClick={async () => {
          const isSuccess = await reportInstagramUser(
            reportUser.accountReported,
            reportUser.reason,
            reportUser.description
          );
          if (isSuccess) {
            alert("User Reported ;)");
            setShowReportModal(false)
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ReportUser;
