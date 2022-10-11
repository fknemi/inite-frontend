import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useRecoilState } from "recoil";
import {
  followingAtom,
  instagramUserAtom,
  userAtom,
} from "../../statedrive/atoms";
import { useParams } from "react-router-dom";
import { recentChangesAtom, showReportModalAtom } from "../../statedrive/atoms";
import { INSTAGRAM_USER } from "../../@types/types";
import {
  getInstagramUserMedia,
  fetchRecentChanges,
} from "../../api/instagram/instagram";
import {
  followInstagramUser,
  unfollowInstagramUser,
} from "../../api/user/user";
import ReportUser from "../../components/ReportUser/ReportUser";
let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";
const InstagramUserProfile = () => {
  const { username }: any = useParams();
  const [instagramUser, setInstagramUser] =
    useRecoilState<INSTAGRAM_USER>(instagramUserAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [following, setFollowing]: any = useRecoilState(followingAtom);
  const [isFollowed, setIsFollowed] = useState(following.includes(username));
  const [recentChanges, setRecentChanges]: any =
    useRecoilState(recentChangesAtom);
  const [media, setMedia]: any = useState([]);
  const [showReportModal, setShowReportModal] =
    useRecoilState(showReportModalAtom);

  useEffect(() => {
    (async () => {
      let { isSuccess, data }: any = await getInstagramUserMedia(username);
      if (isSuccess) {
        setMedia(data);
      } else {
        setMedia(
          media.length === 0
            ? [{ type: "image", url: instagramUser.avatar }]
            : media
        );
      }
      const recentData: any = await fetchRecentChanges(instagramUser);
      setRecentChanges(recentData.data);
    })();
  }, []);

  return (
    <>
      {instagramUser.username === username ? (
        <>
          <Layout>
            <div className="mt-10">
              <div>InstagramUserProfile</div>
              {isFollowed ? "following" : "Not Followed"}
              <div className="flex flex-col">
                <span>Username: {instagramUser.username}</span>

                <span>
                  Name:{" "}
                  {recentChanges.name && recentChanges.name.isRecent ? (
                    <>
                      {recentChanges.name.value} Recently Changed (
                      {instagramUser.name})
                    </>
                  ) : (
                    instagramUser.name
                  )}
                </span>

                <span>
                  Biography:{" "}
                  {recentChanges.biography &&
                  recentChanges.biography.isRecent ? (
                    <>
                      {recentChanges.biography.value} Recently Changed (
                      {instagramUser.biography})
                    </>
                  ) : (
                    instagramUser.biography
                  )}
                </span>

                <span className="flex flex-row gap-2">
                  Avatar:{" "}
                  {recentChanges.avatar && recentChanges.avatar.isRecent ? (
                    <>
                      <img
                        className="w-10 h-10"
                        src={recentChanges.avatar.value}
                        alt=""
                      />{" "}
                      Recently Changed <br />{" "}
                      <img
                        className="w-10 h-10"
                        src={instagramUser.avatar}
                        alt=""
                      />
                    </>
                  ) : (
                    <img
                      className="w-10 h-10"
                      src={instagramUser.avatar}
                      alt=""
                    />
                  )}
                </span>

                <span>
                  Private Account:{" "}
                  {recentChanges.isPrivate &&
                  recentChanges.isPrivate.isRecent ? (
                    <>
                      {recentChanges.isPrivate.value ? "Private" : "Public"}{" "}
                      Recently Changed (
                      {instagramUser.isPrivate ? "Private" : "Public"})
                    </>
                  ) : (
                    instagramUser.isPrivate
                  )}
                </span>

                <span>
                  followedByCount:{" "}
                  {recentChanges.followedByCount &&
                  recentChanges.followedByCount.isRecent ? (
                    <>
                      {recentChanges.followedByCount.value} Recently Changed (
                      {instagramUser.followedByCount})
                    </>
                  ) : (
                    instagramUser.followedByCount
                  )}
                </span>

                <span>
                  followingCount:{" "}
                  {recentChanges.followingCount &&
                  recentChanges.followingCount.isRecent ? (
                    <>
                      {recentChanges.followingCount.value} Recently Changed (
                      {instagramUser.followingCount})
                    </>
                  ) : (
                    instagramUser.followingCount
                  )}
                </span>

                <span>
                  postsCount:{" "}
                  {recentChanges.postsCount &&
                  recentChanges.postsCount.isRecent ? (
                    <>
                      {recentChanges.postsCount.value} Recently Changed (
                      {instagramUser.postsCount})
                    </>
                  ) : (
                    instagramUser.postsCount
                  )}
                </span>

                <button
                  className="border-2 rounded-md mt-5 bg-red-400 border-blue-500"
                  onClick={async () => {
                    if (!isFollowed) {
                      if (!username) {
                        return;
                      }

                      const isSuccess: any = await followInstagramUser(
                        instagramUser
                      );

                      if (isSuccess) {
                        setIsFollowed(true);
                        setFollowing([...following, username]);
                      }
                      if (!media.length) {
                        const { data }: any = await getInstagramUserMedia(
                          username
                        );
                        if (isSuccess) {
                          setMedia(data);
                        }
                      }
                    } else {
                      const isSuccess = await unfollowInstagramUser(username);
                      if (isSuccess) {
                        setIsFollowed(false);
                        setFollowing(
                          following.filter((item: string) => item !== username)
                        );
                        const { data }: any = await getInstagramUserMedia(
                          username
                        );
                        if (data) {
                          setMedia(data);
                        }
                      }
                    }
                  }}
                >
                  {isFollowed ? "Unfollow" : "Follow"} {username}
                </button>

                {/* <div className="Media flex flex-grow">
                {media.map(({ url }: { url: string }) => {
                return <img key={url} src={url} alt="" />;
              })}
              </div> */}
                {!showReportModal ? (
                  <button
                    className={BUTTON_STYLE}
                    onClick={() => setShowReportModal(!showReportModal)}
                  >
                    Report User
                  </button>
                ) : null}

                <div></div>
              </div>
              {showReportModal ? (
                <ReportUser username={instagramUser.username} />
              ) : null}
            </div>
          </Layout>
        </>
      ) : (
        "404"
      )}
    </>
  );
};

export default InstagramUserProfile;
