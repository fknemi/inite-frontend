import React from "react";
import { MediaCardContainer } from "./styles";

function MediaCard({ url }: { url: string }) {
  return (
    <MediaCardContainer>
      <div>
        <span>10 September 2022 10:39 PM</span>
        <img src={url} alt="" />
      </div>
      <div></div>
    </MediaCardContainer>
  );
}

export default MediaCard;
