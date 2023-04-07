import { useContext, useState } from "react";
import styled from "styled-components";
import InputComponent from "../components/input.component";
import Button from "../components/button.component";
import ls from "local-storage";
import { AppContext } from "../service";

const LoginToContinueText = styled.p`
  font-family: MarkPro;
  font-size: 16px;
  color: #a1a4ad;
  margin-bottom: 25px;
`;

const RedirectToSignup = styled.p`
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

const LoginPage = ({
  refetchTodos,
  handleRedirectToSignup,
}: {
  refetchTodos: () => void;
  handleRedirectToSignup: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appContext = useContext(AppContext);

  const handleLogin = async () => {
    const res = await appContext.login({ email, password });

    if (res.token) {
      ls("token", res.token);

      await refetchTodos();
    }
  };

  return (
    <TodoListContainer>
      <LoginToContinueText>Log in to continue.</LoginToContinueText>

      <InputComponent onChange={setEmail} placeholder="Email" />
      <InputComponent type="password" onChange={setPassword} placeholder="Password" />

      <RedirectToSignup onClick={handleRedirectToSignup}>
        Don’t have an account? Sign up.
      </RedirectToSignup>

      <Button onClick={handleLogin} name="Log In" />
    </TodoListContainer>
  );
};

export default LoginPage;
