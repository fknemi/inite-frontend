import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 0 auto;
  padding-bottom: 2rem;
  overflow-x: hidden;
`;
export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;

  background: #fff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  border: none;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    top: 0;

    span,
    button {
      background: rgba(72, 79, 88, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 5px;
      color: #484f58;
      text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
      font-size: 1.6rem;
      width: 8rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    span,
    div {
      margin: 1rem;
    }
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    > img {
      width: 20rem;
      height: 20rem;
      border-radius: 200px;
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 6rem;
      margin-right: -4rem;

      p {
        font-size: 2.5rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span:first-child {
          font-size: 1.6rem;
        }
      }
    }

    > div:nth-child(3) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      div:first-child {
        font-weight: 500;
        h1 {
          font-size: 3rem;
        }
        h1,
        span {
          font-weight: inherit;
        }

        span {
          font-size: 1.5rem;
          margin-top: -1rem;
        }
      }
      div:last-child {
        font-weight: 400;
        font-size: 1.8rem;
        span {
          font-size: 1.5rem;
        }
      }
    }

    > div:nth-child(4) {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      h1 {
        padding-left: 4rem;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    width: 95%;
    > div:nth-child(2) > div:nth-child(2) {
      p {
        font-size: 1.4rem;
      }
      span:first-child {
        font-size: 1.2rem;
      }
    }
  }
`;

export const MediaCardsContainer = styled.div`
  height: 100%;
  width: 100%;
  gap: 2rem;
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  
`;
