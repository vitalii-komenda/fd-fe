import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 36px;
  margin: 45px 0px 0px;
  border-radius: 4px;
  border: 1px solid rgb(74, 119, 229);
  background-color: rgb(74, 119, 229);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

type PropsType = {
  onClick: () => void;
  name: string;
};

function ButtonComponent(props: PropsType) {
  return <Button onClick={props.onClick}>{props.name}</Button>;
}

export default ButtonComponent;
