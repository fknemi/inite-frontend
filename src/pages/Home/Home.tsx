import React from "react";
import Layout from "../../components/Layout/Layout";
import Cube from "../../components/Assets/Cube/Cube";
import styled from "styled-components";
import HeroImage from "../../components/Assets/HeroImage/HeroImage";
import { Link } from "react-router-dom";

const Home = () => {
  const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10rem;
    padding-top: 15rem;
    /* border: 2px solid blue; */
    width: 100%;
    height: 100%;
    @media only screen and (max-width: 640px) {
      padding-left: 4rem;
    }
    > div:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      /* border: 2px solid pink; */
      > div:first-child {
        /* border: 2px solid green; */

        h1 {
          font-size: 5rem;
          font-weight: 700;
          margin: 0;
        }
        h2 {
          font-weight: 300;
          font-family: "Sofia Sans", sans-serif;
          font-size: 2.5rem;
        }
        @media only screen and (max-width: 640px) {
          h1 {
            font-size: 4rem;
          }
          h2 {
            font-size: 2rem;
          }
        }
        @media only screen and (max-width: 480px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      }
      > div:last-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 2rem;

        a {
          text-decoration: none;
          color: #fff;
          font-size: 1.6rem;
          font-weight: 500;
          padding: 1rem 2rem;
          border-radius: 5px;
          border: 1px solid #e0e1d7;
        }

        a:first-child {
          background: #152e4d;
          border-color: #152e4d;
        }
        @media only screen and (max-width: 640px) {
          a {
            font-size: 1.2rem;
            padding: 1rem 2rem;
          }
        }
        @media only screen and (max-width: 480px) {
          a{
            font-size: 1rem;
            padding: 1rem 3rem;
      }
    }

    > div:last-child {
      /* border: 2px solid red; */
      width: 20%;
      height: 100%;
      padding: 2rem;
    }
  `;

  return (
    <Layout>
      <Header>
        <div>
          <div>
            <h1>
              Keep Up With Your
              <br />
              Favourite Creators
            </h1>
            <h2>
              Stay on track with your favourite creators and
              <br />
              you’ll never miss out on anything
            </h2>
          </div>

          <div>
            <Link to="#">Get Started</Link>
            <Link to="#">Learn More</Link>
          </div>
        </div>
        <div></div>
      </Header>
    </Layout>
  );
};
export default Home;
