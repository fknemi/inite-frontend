import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { login } from "../../api/user/user";
import Layout from "../../components/Layout/Layout";
import { loginAtom, userAtom, tokensAtom } from "../../statedrive/atoms";
import styled from "styled-components";
const Login = () => {
  const [loginForm, setLoginForm]: any = useRecoilState(loginAtom);
  const setUser = useSetRecoilState(userAtom);
  const setTokens = useSetRecoilState(tokensAtom);
  const navigate = useNavigate();
  const FormContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    

  `;
  const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 2px solid #9e9ea7;
    border-radius: 20px;
    width: 28rem;
    height: 30rem;

    
  `;

  return (
    <Layout>
      <FormContainer>
        <Form>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={loginForm.email}
            autoComplete="off"
            onChange={(e: React.SyntheticEvent) =>
              setLoginForm({
                ...loginForm,
                email: (e.target as HTMLInputElement).value,
              })
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={loginForm.password}
            autoComplete="off"
            onChange={(e: React.SyntheticEvent) =>
              setLoginForm({
                ...loginForm,
                password: (e.target as HTMLInputElement).value,
              })
            }
          />
          <div>
            <button
              className="bg-blue-500"
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
                  // localStorage.setItem("user", JSON.stringify(user))
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
          <Link to="/account/forgot/password">Forgot Password</Link>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default Login;
