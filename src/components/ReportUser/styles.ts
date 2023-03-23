import styled from "styled-components";

export const ReportUserContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;

  color: #000;
  padding: 1rem;
  display: flex;
  flex-direction: column !important;
  width: 30rem;
  flex-wrap: nowrap !important;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 60%;
  top: 15%;

  textarea {
    font-family: inherit;
    width: 90%;
    height: 14rem;
    padding: 0 0 0 1rem;
    background: #ffffff;
    font-size: 1.6rem;
    outline-color: transparent;
    border-radius: 5px;
    border-color: transparent;
    box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
      0px 0px 3px rgba(27, 31, 35, 0.25);
    resize: none;
    &::placeholder {
      color: #a29d9d;
    }
    outline: none;
  }
  .dropdown {
    display: flex;
    flex-direction: column !important;
    align-items: flex-start;
    justify-content: flex-start;

    width: 80%;
    gap: 0 !important;
    .selected {
      background: #25ce82;
      color: #fff;
    }

    option {
      font-size: 1.6rem;
      outline-color: transparent;
      border-radius: 5px;
      border-color: transparent;
      box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
        0px 0px 3px rgba(27, 31, 35, 0.25);
      resize: none;
      width: 100%;
      height: 3rem;

      align-items: center;
      justify-content: flex-start;
      padding-left: 0.5rem;
      display: none;
    }
    option:first-child {
      display: flex;
    }
    &.show option {
      display: flex;
    }
  }
  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 1.4rem;
    }
    width: 40%;
    left: 50%;
    top: 20%;
    .dropdown  option{
      font-size: 1.2rem;
    }
  }
`;
