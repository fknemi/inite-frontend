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
    color: #ffff;
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
    font-size: 1.6rem;
    outline-color: transparent;
    border-radius: 5px;
    border-color: transparent;
    box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
      0px 0px 3px rgba(27, 31, 35, 0.25);

    &::placeholder {
      color: #a29d9d;
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
      border-radius: 5px;
      border-color: transparent;
      color: #fff;
      font-family: inherit;
      font-weight: 500;
      background: #152E4D;
    }
  }
  a {
    color: #f4f4f4;
    font-size: 1.4rem;
    text-decoration: none;
  }
  a:last-child {
    text-decoration: none;
    padding-top: 8rem;
    span {
      font-weight: 500;
      color: #fff;
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
                  localStorage.setItem("user", JSON.stringify(user));
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
