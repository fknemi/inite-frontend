import React, { useState } from "react";
import { reportInstagramUser } from "../../api/user/user";
import { useSetRecoilState } from "recoil";
import { showReportModalAtom } from "../../statedrive/atoms";
import { ReportUserContainer } from "./styles";

const ReportUser = ({ username }: { username: string }) => {
  const [reportUser, setReportUser] = useState({
    accountReported: { username },
    reason: `${username}`,
    description: `${username}`,
  });
  const setShowReportModal = useSetRecoilState(showReportModalAtom);
  const [reasons, setReasons] = useState(["Fraud", "Illegal Activity"]);
  const [showReasons, setShowReason] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  return (
    <ReportUserContainer>
      <h1>Report {username}</h1>

      <div
        className={`dropdown ${showReasons ? "show" : ""}`}
        onClick={() => setShowReason(!showReasons)}
      >
        <option value="" className={`${selectedReason ? "selected" : ""} `}>
          {selectedReason || "No Reason Selected"}
        </option>
        {reasons.map((reason: string) => {
          return (
            <option
              onClick={() => {
                setSelectedReason(reason);
              }}
            >
              {reason}
            </option>
          );
        })}
      </div>

      <textarea name="" id=""></textarea>

      <button>Submit</button>
    </ReportUserContainer>
  );
};

export default ReportUser;

// <div className="bg-gray-500 flex flex-col gap-3 absolute w-80 h-80 top-10 left-60  border-red-500 border border-3">
//         <button onClick={() => setShowReportModal(false)}>Close</button>
//       <h1 className="font-bold">Reporting User: {username}</h1>
//       <input
//         placeholder="reason"
//         type="text"
//         className="border-3 border-green-400"
//         value={reportUser.reason}
//         onChange={(e) => {
//           setReportUser({
//             ...reportUser,
//             reason: e.target.value,
//           });
//         }}
//       />

//       <input
//         placeholder="description"
//         type="text"
//         className="border-3 border-green-400"
//         value={reportUser.description}
//         onChange={(e) => {
//           setReportUser({
//             ...reportUser,
//             description: e.target.value,
//           });
//         }}
//       />
//       <button
//         className={BUTTON_STYLE}
//         onClick={async () => {
//           const isSuccess = await reportInstagramUser(
//             reportUser.accountReported,
//             reportUser.reason,
//             reportUser.description
//           );
//           if (isSuccess) {
//             alert("User Reported ;)");
//             setShowReportModal(false)
//           }
//         }}
//       >
//         Submit
//       </button>
//     </div>
