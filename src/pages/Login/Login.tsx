import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { login } from "../../api/user/user";
import Layout from "../../components/Layout";
import { loginAtom, userAtom, tokensAtom } from "../../statedrive/atoms";
const Login = () => {
  const [loginForm, setLoginForm]: any = useRecoilState(loginAtom);
  const setUser = useSetRecoilState(userAtom);
  const setTokens = useSetRecoilState(tokensAtom);
  const navigate = useNavigate();
  return (
    <Layout>
      <div>Login</div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          value={loginForm.email}
          autoComplete="off"
          placeholder="Email"
          onChange={(e: React.SyntheticEvent) =>
            setLoginForm({
              ...loginForm,
              email: (e.target as HTMLInputElement).value,
            })
          }
        />
        <input
          type="text"
          name="password"
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
        <Link to="/account/forgot/password">Forgot Password</Link>
      </div>
    </Layout>
  );
};

export default Login;
