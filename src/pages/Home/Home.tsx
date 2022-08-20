import React from "react";
import Layout from "../../components/Layout";


const Home = () => {
  const inputs = [
    "name",
    "username",
    "email",
    "gender",
    "password",
    "confirmPassword",
  ];
  return (
    <Layout>
      <div>
        <h1>Home</h1>
        <div className="">
        {inputs.map((input) => (
""
        ))

        }
            </div>
      </div>
    </Layout>
  );
};
export default Home;
