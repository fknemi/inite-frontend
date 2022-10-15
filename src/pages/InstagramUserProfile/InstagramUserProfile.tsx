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
import styled from "styled-components";

const ProfileContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 87%;
  height: 87%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  gap: 2rem;
  img {
    width: 12rem;
    height: 12rem;
    border-radius: 200px;
  }
  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
    span {
      font-size: 1.5rem;
      font-weight: 400;
    }

    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10rem;
    text-align: center;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 500;
      gap: 0.8rem;
      span {
        font-size: 2rem;
        color: #858585;
      }
    }
  }
  button {
    width: 16rem;
    height: 4rem;
    background: #000000;
    border-radius: 5px;
    color: #fff;
    font-family: inherit;
    font-weight: 500;
  }
`;
const MediaContainer = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  

  div {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    align-items: stretch;
    justify-content: space-between;
    gap: 5rem;

  }
`;

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
            ? [
                { type: "image", url: instagramUser.avatar },
                { type: "image", url: instagramUser.avatar },
                { type: "image", url: instagramUser.avatar },
                { type: "image", url: instagramUser.avatar },
              ]
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
            <ProfileContainer>
              <InfoContainer>
                <div>
                  <img src={instagramUser.avatar} alt="" />
                  <span>{instagramUser.username}</span>
                  <h1>{instagramUser.name}</h1>
                </div>

                <div>
                  <p>
                    <span>Posts</span>
                    {instagramUser.postsCount}
                  </p>
                  <p>
                    <span>Following</span>
                    {instagramUser.followingCount}
                  </p>
                  <p>
                    <span>Followers</span>
                    {instagramUser.followedByCount}
                  </p>
                  <p>
                    <span>Account Status</span>
                    {instagramUser.isPrivate ? "Private" : "Public"}
                  </p>
                </div>
                <button
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
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              </InfoContainer>

              <MediaContainer>
                <h1>Media</h1>

                <div>
                  {media.map(({ url }: { url: string }) => {
                    return <img key={url} src={url} alt="" />;
                  })}
                </div>
              </MediaContainer>
            </ProfileContainer>
          </Layout>
        </>
      ) : (
        "404"
      )}
    </>
  );
};

export default InstagramUserProfile;

// <div>

//               <div>
//                 <span>{instagramUser.username}</span>

//                 <span>
//                   Name:{" "}
//                   {recentChanges.name && recentChanges.name.isRecent ? (
//                     <>
//                       {recentChanges.name.value} Recently Changed (
//                       {instagramUser.name})
//                     </>
//                   ) : (
//                     instagramUser.name
//                   )}
//                 </span>

//                 <span>
//                   Biography:{" "}
//                   {recentChanges.biography &&
//                   recentChanges.biography.isRecent ? (
//                     <>
//                       {recentChanges.biography.value} Recently Changed (
//                       {instagramUser.biography})
//                     </>
//                   ) : (
//                     instagramUser.biography
//                   )}
//                 </span>

//                 <span>
//                   Avatar:{" "}
//                   {recentChanges.avatar && recentChanges.avatar.isRecent ? (
//                     <>
//                       <img src={recentChanges.avatar.value} alt="" /> Recently
//                       Changed <br /> <img src={instagramUser.avatar} alt="" />
//                     </>
//                   ) : (
//                     <img src={instagramUser.avatar} alt="" />
//                   )}
//                 </span>

//                 <span>
//                   Private Account:{" "}
//                   {recentChanges.isPrivate &&
//                   recentChanges.isPrivate.isRecent ? (
//                     <>
//                       {recentChanges.isPrivate.value ? "Private" : "Public"}{" "}
//                       Recently Changed (
//                       {instagramUser.isPrivate ? "Private" : "Public"})
//                     </>
//                   ) : (
//                     instagramUser.isPrivate
//                   )}
//                 </span>

//                 <span>
//                   followedByCount:{" "}
//                   {recentChanges.followedByCount &&
//                   recentChanges.followedByCount.isRecent ? (
//                     <>
//                       {recentChanges.followedByCount.value} Recently Changed (
//                       {instagramUser.followedByCount})
//                     </>
//                   ) : (
//                     instagramUser.followedByCount
//                   )}
//                 </span>

//                 <span>
//                   followingCount:{" "}
//                   {recentChanges.followingCount &&
//                   recentChanges.followingCount.isRecent ? (
//                     <>
//                       {recentChanges.followingCount.value} Recently Changed (
//                       {instagramUser.followingCount})
//                     </>
//                   ) : (
//                     instagramUser.followingCount
//                   )}
//                 </span>

//                 <span>
//                   postsCount:{" "}
//                   {recentChanges.postsCount &&
//                   recentChanges.postsCount.isRecent ? (
//                     <>
//                       {recentChanges.postsCount.value} Recently Changed (
//                       {instagramUser.postsCount})
//                     </>
//                   ) : (
//                     instagramUser.postsCount
//                   )}
//                 </span>

//                 <button
//                   onClick={async () => {
//                     if (!isFollowed) {
//                       if (!username) {
//                         return;
//                       }

//                       const isSuccess: any = await followInstagramUser(
//                         instagramUser
//                       );

//                       if (isSuccess) {
//                         setIsFollowed(true);
//                         setFollowing([...following, username]);
//                       }
//                       if (!media.length) {
//                         const { data }: any = await getInstagramUserMedia(
//                           username
//                         );
//                         if (isSuccess) {
//                           setMedia(data);
//                         }
//                       }
//                     } else {
//                       const isSuccess = await unfollowInstagramUser(username);
//                       if (isSuccess) {
//                         setIsFollowed(false);
//                         setFollowing(
//                           following.filter((item: string) => item !== username)
//                         );
//                         const { data }: any = await getInstagramUserMedia(
//                           username
//                         );
//                         if (data) {
//                           setMedia(data);
//                         }
//                       }
//                     }
//                   }}
//                 >
//                   {isFollowed ? "Unfollow" : "Follow"} {username}
//                 </button>

//                 {/* <div className="Media flex flex-grow">
//                 {media.map(({ url }: { url: string }) => {
//                 return <img key={url} src={url} alt="" />;
//               })}
//               </div> */}
//                 {!showReportModal ? (
//                   <button onClick={() => setShowReportModal(!showReportModal)}>
//                     Report User
//                   </button>
//                 ) : null}

//                 <div></div>
//               </div>
//               {showReportModal ? (
//                 <ReportUser username={instagramUser.username} />
//               ) : null}
//             </div>
