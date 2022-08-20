import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "../../api/user/user";
import Layout from "../../components/Layout";
import { loginAtom, redirectAtom } from '../../statedrive/atoms';
const Login = () => {
  const [loginForm, setLoginForm]: any = useRecoilState(loginAtom);
  const [redirect,setRedirect] = useRecoilState(redirectAtom)
  const navigate = useNavigate();
  return (
    <Layout>
      <div>Login</div>
      <div>
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
      </div>

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
            return navigate(redirect);
          }
        }}
      >
        Login
      </button>
    </Layout>
  );
};

export default Login;
