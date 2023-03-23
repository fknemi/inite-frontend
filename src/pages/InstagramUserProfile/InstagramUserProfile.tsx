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
import { INSTAGRAM_USER, changedUser } from "../../@types/types";
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
import { Container, MediaCardsContainer, UserCardContainer } from "./styles";
import MediaCard from "../../components/MediaCard/MediaCard";

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
      console.log(recentData.data);
      setRecentChanges(recentData.data);
    })();
  }, []);
  console.log(instagramUser);
  return (
    <Layout>
      <Container>
        <UserCardContainer>
          <div>
            <span>Private</span>
            <div>
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
              <button onClick={() => setShowReportModal(!showReportModal)}>
                Report
              </button>
              {showReportModal && (
                <ReportUser username={instagramUser.username} />
              )}
            </div>
          </div>

          <div>
            <img
              src={
                recentChanges.avatar &&
                recentChanges.avatar.isRecent &&
                recentChanges.avatar.value
                  ? recentChanges.avatar.value
                  : instagramUser.avatar
              }
              alt=""
            />
            <div>
              <p>
                <span>{instagramUser.postsCount}</span>
                <span>Posts</span>
              </p>
              <p>
                <span>{instagramUser.followedByCount}</span>
                <span>Followers</span>
              </p>
              <p>
                <span>{instagramUser.followingCount}</span>
                <span>Following</span>
              </p>
            </div>
            <div>
              <div>
                <h1>
                  {" "}
                  {recentChanges.name && recentChanges.name.isRecent ? (
                    <>
                      {recentChanges.name.value} Recently Changed (
                      {instagramUser.name})
                    </>
                  ) : (
                    instagramUser.name
                  )}
                </h1>
                <span>{instagramUser.username}</span>
              </div>
              <div>
                <p>
                  {" "}
                  {recentChanges.biography &&
                  recentChanges.biography.isRecent ? (
                    <>
                      {recentChanges.biography.value} Recently Changed (
                      {instagramUser.biography})
                    </>
                  ) : (
                    instagramUser.biography
                  )}
                </p>
                <span>
                  {(recentChanges.isPrivate &&
                    recentChanges.isPrivate.isRecent) ||
                  instagramUser.isPrivate
                    ? "*private account"
                    : "*public account"}
                </span>
              </div>
            </div>
            <div>
              <h1>Media</h1>
              <MediaCardsContainer>
                {media.map(({ url }: { url: string }) => {
                  return <MediaCard key={url} url={url} />;
                })}
              </MediaCardsContainer>
            </div>
          </div>
        </UserCardContainer>
      </Container>
    </Layout>
  );
};

export default InstagramUserProfile;

// <div>

//               <div>
//                 <span>{instagramUser.username}</span>

//                 <span>
//                   Name:{" "}
// {recentChanges.name && recentChanges.name.isRecent ? (
//   <>
//     {recentChanges.name.value} Recently Changed (
//     {instagramUser.name})
//   </>
// ) : (
//   instagramUser.name
// )}
//                 </span>

//                 <span>
//                   Biography:{" "}
// {recentChanges.biography &&
// recentChanges.biography.isRecent ? (
//   <>
//     {recentChanges.biography.value} Recently Changed (
//     {instagramUser.biography})
//   </>
// ) : (
//   instagramUser.biography
// )}
//                 </span>

//                 <span>
//                   Avatar:{" "}
// {recentChanges.avatar && recentChanges.avatar.isRecent ? (
//   <>
//     <img src={recentChanges.avatar.value} alt="" /> Recently
//     Changed <br /> <img src={instagramUser.avatar} alt="" />
//   </>
// ) : (
//   <img src={instagramUser.avatar} alt="" />
// )}

//                 </span>

//                 <span>
//                   Private Account:{" "}

//                   {recentChanges.isPrivate &&
//                   recentChanges.isPrivate.isRecent ? (
//                     <>
//                       {recentChanges.isPrivate.value ? "Private" : "Public"}

{
  (" ");
}
//                       Recently Changed (
//                       {instagramUser.isPrivate ? "Private" : "Public"})
//                     </>
//                   ) : (
//                     instagramUser.isPrivate
//                   )
// }

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
// <ReportUser username={instagramUser.username} />
//               ) : null}
//             </div>

// {instagramUser.username === username ? (
//   <>
//     <Layout>
//       <ProfileContainer>
//         <InfoContainer>
//           <div>
//             <img src={instagramUser.avatar} alt="" />
//             <span>{instagramUser.username}</span>
//             <h1>{instagramUser.name}</h1>
//           </div>

//           <div>
//             <p>
//               <span>Posts</span>
//               {instagramUser.postsCount}
//             </p>
//             <p>
//               <span>Following</span>
//               {instagramUser.followingCount}
//             </p>
//             <p>
//               <span>Followers</span>
//               {instagramUser.followedByCount}
//             </p>
//             <p>
//               <span>Account Status</span>
//               {instagramUser.isPrivate ? "Private" : "Public"}
//             </p>
//           </div>
//           <button
// onClick={async () => {
//   if (!isFollowed) {
//     if (!username) {
//       return;
//     }

//     const isSuccess: any = await followInstagramUser(
//       instagramUser
//     );

//     if (isSuccess) {
//       setIsFollowed(true);
//       setFollowing([...following, username]);
//     }
//     if (!media.length) {
//       const { data }: any = await getInstagramUserMedia(
//         username
//       );
//       if (isSuccess) {
//         setMedia(data);
//       }
//     }
//   } else {
//     const isSuccess = await unfollowInstagramUser(username);
//     if (isSuccess) {
//       setIsFollowed(false);
//       setFollowing(
//         following.filter((item: string) => item !== username)
//       );
//       const { data }: any = await getInstagramUserMedia(
//         username
//       );
//       if (data) {
//         setMedia(data);
//       }
//     }
//   }
// }}

//           >
//             {isFollowed ? "Unfollow" : "Follow"}
//           </button>
//         </InfoContainer>

//         <MediaContainer>
//           <h1>Media</h1>

//           <div>
//             {media.map(({ url }: { url: string }) => {
//               return <img key={url} src={url} alt="" />;
//             })}
//           </div>
//         </MediaContainer>
//       </ProfileContainer>
//     </Layout>
//   </>
// ) : (
//   "404"
// )}
