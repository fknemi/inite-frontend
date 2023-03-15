import React from "react";
import { MediaCardContainer } from "./styles";

function MediaCard({url}: {url: string;}) {
  return (
    <MediaCardContainer >
      <div>
        <span>10 September 2022 10:39 PM</span>
        <img
          src={url}
          alt=""
        />
      </div>
      <div>
        {/* <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
        <button>
          <svg
            
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 19H13M7 1L7 15M7 15L12 10M7 15L2 10"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div> */}
      </div>
    </MediaCardContainer>
  );
}

export default MediaCard;
