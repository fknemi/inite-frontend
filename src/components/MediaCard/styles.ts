import styled from "styled-components";

export const MediaCardContainer = styled.div`
  padding-left: 4rem;
  display: flex;
  padding-bottom: 4rem;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1rem;

  > div:first-child {
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;

    span {
      width: 100%;
      background: rgba(72, 79, 88, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 5px;
      color: #484f58;
      text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
      font-size: 1.6rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }
    img {
      width: 25rem;
      filter: drop-shadow(0px 0px 3px rgba(27, 31, 35, 0.15))
        drop-shadow(0px 0px 3px rgba(27, 31, 35, 0.25));
      border-radius: 10px;
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
    button {
      width: 4rem;
      height: auto;
      padding: 1rem;
      background: none;
      border: none;
      background: rgba(72, 79, 88, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;

      box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
        0px 0px 3px rgba(27, 31, 35, 0.25);
      border-radius: 4px;

      svg {
        width: 100%;
        height: auto;

        path {
          fill: #000;
          stroke: #000;
        }
      }

      &:hover {
        background: #434ce8;
        svg {
          path {
            fill: #fff;
            stroke: #fff;
          }
        }
      }
    }
  }
`;
