import React from "react";
import Layout from "../../components/Layout/Layout";
import Cube from "../../components/Assets/Cube/Cube";
import styled, { createGlobalStyle } from "styled-components";
import HeroImage from "../../components/Assets/HeroImage/HeroImage";

const Home = () => {
  

  const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 0 8rem;
    margin-top: 5rem;
    div {
      color: #fff;
      h1 {
        text-align: center;
        text-transform: capitalize;
        letter-spacing: 0.15px;
        font-size: 4.3rem;
        font-weight: 600;
      }
      p {
        font-weight: 400;
        letter-spacing: 0.15px;
        line-height: 150%;
        font-size: 2rem;
        margin-top: -2.5rem;
      }
    }

    p,
    div:nth-child(3) {
      padding-left: 4.9rem;
    }

    div:nth-child(3) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      gap: 3.5rem;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        width: 15rem;
        height: 4rem;
        text-align: center;
        font-size: 1.4rem;
        border-radius: 5px;
        color: #fff;
        font-weight: 500;
      }
      a:first-child {
        background-color: #03b915;
      }
      a:last-child {
        border: 1px solid #fff;
      }
    }

    span {
      &:first-child {
        position: relative;
        z-index: 999;
        left: -50px;
        top: -20px;
      }
      &:last-child {
        position: absolute;
        top: 100px;
        right: 0;
      }
    }
  `;

  return (
    <Layout>
      <Header>
        <span>
          <Cube />
        </span>
        <div>
          <h1>
            Keep up with your <br /> favourite creators
          </h1>
          <p>
            Stay on track with your favourite creators and
            <br />
            you’ll never miss out on anything
          </p>
        </div>

        <div>
          <a href="">Get Started</a>
          <a href="">Learn More</a>
        </div>
        <span>
          <HeroImage />
        </span>
      </Header>
    </Layout>
  );
};
export default Home;
