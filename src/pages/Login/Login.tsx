import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { login } from "../../api/user/user";
import Layout from "../../components/Layout/Layout";
import { loginAtom, userAtom, tokensAtom } from "../../statedrive/atoms";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-family: "Inter", "sans-serif";

  h1 {
    font-weight: 500;
    font-size: 4rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  margin-top: 3rem;
  input {
    font-family: inherit;
    width: 40%;
    height: 42px;
    padding: 0 0 0 1rem;
    background: #ffffff;
    border: 2px solid #306ee6;
    box-shadow: 0px 0px 20px 2px rgba(48, 110, 230, 0.25);
    border-radius: 5px;
    font-size: 1.6rem;
    &::placeholder {
      color: #5c6877;
    }
    outline: none;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
    width: 41%;
    button {
      width: 12rem;
      height: 4rem;
      background: #000000;
      border-radius: 5px;
      color: #fff;
      font-family: inherit;
      font-weight: 500;
    }
  }
  a:first-child {
    color: #5c6877;
    font-size: 1.4rem;
    text-decoration: none;
  }
  a:last-child {
    color: #5c6877;
    font-size: 1.4rem;
    text-decoration: none;
    padding-top: 8rem;

    span {
      font-weight: 600;
      color: #000;
    }
  }
`;

const Login = () => {
  const [loginForm, setLoginForm]: any = useRecoilState(loginAtom);
  const setUser = useSetRecoilState(userAtom);
  const setTokens = useSetRecoilState(tokensAtom);
  const navigate = useNavigate();

  return (
    <Layout>
      <FormContainer>
        <h1>Login</h1>
        <Form>
          <input
            type="text"
            value={loginForm.email}
            autoComplete="off"
            placeholder="Email"
            onChange={(e: React.SyntheticEvent) =>
              setLoginForm({
                email: (e.target as HTMLInputElement).value,
              })
            }
          />

          <input
            type="password"
            value={loginForm.password}
            autoComplete="off"
            placeholder="Password"
            onChange={(e: React.SyntheticEvent) =>
              setLoginForm({
                ...loginForm,
                password: (e.target as HTMLInputElement).value,
              })
            }
          />
          <div>
            <Link to="/account/forgot/password">Forgot your password?</Link>
            <button
              onClick={async () => {
                const { email, password } = loginForm;
                if (!email || !password) {
                  return "";
                }
                console.log(email, password);
                const { isSuccess, user }: any = await login(email, password);
                if (isSuccess) {
                  let token = localStorage.getItem("x-token") as string;
                  let refreshToken = localStorage.getItem(
                    "x-refresh-token"
                  ) as string;
                  localStorage.setItem("user", JSON.stringify(user))
                  if (token && refreshToken) {
                    setUser(user);
                    setTokens({
                      token: token,
                      refreshToken: refreshToken,
                    });
                  }
                  return navigate("/dashboard");
                }
              }}
            >
              Login
            </button>
          </div>
          <Link to="/account/register">
            Don’t have an account? <span>Sign Up</span>
          </Link>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default Login;
