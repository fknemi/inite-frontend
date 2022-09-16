import React, { useEffect } from "react";
import { linkInstagramAccount } from "../api/user/user";
import {
  Navigate,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

console.log(process.env.REACT_APP_ID);

const AUTHORIZATION_URL = `https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_ID}&redirect_uri=https://localhost:3000/user/account/settings&response_type=code&scope=user_profile,user_media&display=popup`;
export const GoogleLogin = () => {
  return <div>LoginButtons</div>;
};

export const InstagramLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code")) {
      linkInstagramAccount(searchParams.get("code") as string);
      // window.location.href = "/user/account/settings";

    }
  }, [searchParams]);

  return (
    <button
      onClick={async () => {
        window.location.href = AUTHORIZATION_URL;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    >
lol

    </button>
  );
};
