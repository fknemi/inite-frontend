import React from "react";
import styled from "styled-components";

const DetailsCardContainer = styled.div`
  width: 70%;
  p {
    background: #ffffff;
    box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
      0px 0px 3px rgba(27, 31, 35, 0.25);
    border-radius: 5px;
    width: 100%;
    font-size: 1.8rem;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  p.bold {
    font-weight: 500;
  }
  p.top {
    span {
      margin-top: -1rem;
    }
  }
  a,
  span {
    font-family: "DM Sans", sans-serif;
  }
  span {
    font-family: "DM Sans";
    font-weight: 500;
    margin-bottom: -1.5rem;
  }
  a {
    font-weight: 400;
    align-self: flex-end;
    margin-top: -1.5rem;
    margin-right: -1.2rem;
  }
  a.left {
    align-self: flex-start;
    width: 70%;
  }
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 200px;
  }

  button {
    width: 12rem;
    height: 4rem;
    border-radius: 5px;
    border-color: transparent;
    color: #fff;
    font-family: inherit;
    font-weight: 500;
    background: #000000;
    font-size: 1.6rem;
  }
`;

function DetailsCard(props: any) {
  return <DetailsCardContainer>{props.children}</DetailsCardContainer>;
}

export default DetailsCard;
