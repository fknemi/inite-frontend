import React, { useState } from "react";
import { banInstagramUser, unbanInstagramUser } from "../../../api/admin/admin";
import {
  deleteInstagramUser,
  deleteInstagramUserMedia,
  getInstagramUserDetails,
} from "../../../api/owner/owner";
import Details from "./Details";
import { useRecoilState } from "recoil";
import { instagramUsersAtom } from "../../../statedrive/atoms";
import { ActionButtonsContainer } from "../Users/ActionButtons";
import { REPORT } from "../../../@types/types";

const ActionButtons = ({
  _isBanned,
  _isOwner,
  username,
  deleteReport,
  updateReadStatus,
  report,
}: {
  _isBanned: boolean;
  _isOwner: boolean;
  username: string;
  deleteReport: (id: string) => void;
  updateReadStatus: (id: string, read: boolean) => void;
  report: REPORT;
}) => {
  const [isBanned, setIsBanned]: any = useState(_isBanned);
  const [isOwner, setIsOwner]: any = useState(_isOwner);
  const [deleteMedia, setDeleteMedia]: any = useState(undefined);
  const [instagramUserDetails, setInstagramUserDetails]: any = useState({});
  const [showDetails, setShowDetails]: any = useState(false);
  const [instagramUsers, setInstagramUsers] =
    useRecoilState(instagramUsersAtom);
    
  return (
    <ActionButtonsContainer className="report">
      <button onClick={() => deleteReport(report._id)}>Delete Report</button>
      <button onClick={() => updateReadStatus(report._id, !report.readStatus)}>
        {report.readStatus ? "Reopen Report" : "Close Report"}
      </button>
      <button onClick={() => setShowDetails(!showDetails)}>View Details</button>
      {showDetails && <Details {...report} />}
    </ActionButtonsContainer>
  );
};
export default ActionButtons;
