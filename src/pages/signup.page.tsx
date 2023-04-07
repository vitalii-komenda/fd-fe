import { useContext, useState } from "react";
import styled from "styled-components";
import InputComponent from "../components/input.component";
import Button from "../components/button.component";
import { AppContext } from "../service";

const LoginToContinueText = styled.p`
  font-family: MarkPro;
  font-size: 16px;
  color: #a1a4ad;
  margin-bottom: 25px;
`;

const RedirectToLogin = styled.p`
  width: 218px;
  height: 18px;
  margin: 0;
  font-family: MarkPro;
  font-size: 14px;
  color: #1f2a4b;
  text-decoration: underline;
  cursor: pointer;
`;

const TodoListContainer = styled.div`
  margin: -5px 0 0 0;
`;

const SignupPage = ({
  handleRedirectToLogin,
}: {
  handleRedirectToLogin: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const appContext = useContext(AppContext);

  const handleSignup = async () => {
    if (name && email && password) {
      const res = await appContext.signup({ name, email, password });

      if (!res.error) {
        handleRedirectToLogin();
      }
    }
  };

  return (
    <TodoListContainer>
      <LoginToContinueText>
        Sign up to start using Simpledo today.
      </LoginToContinueText>

      <InputComponent onChange={setName} placeholder="Full Name" />
      <InputComponent onChange={setEmail} placeholder="Email" />
      <InputComponent type="password" onChange={setPassword} placeholder="Password" />

      <RedirectToLogin onClick={handleRedirectToLogin}>Do have an account? Sign in.</RedirectToLogin>

      <Button onClick={handleSignup} name="Sign Up" />
    </TodoListContainer>
  );
};

export default SignupPage;
