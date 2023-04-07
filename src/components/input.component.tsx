import { useState } from "react";
import styled from "styled-components";

export const Input = styled.input`
  padding: 10px 0;
  width: 100%;
  height: 20px;
  margin-bottom: 25px;
  font-size: 16px;
  border: none;
  border-bottom: 1px #d7dae0 solid;
  &:focus {
    outline: none;
    border-bottom: 1px #4a77e5 solid;
  }
  ::placeholder {
    font-family: MarkPro;
    font-size: 16px;
    color: #9ea3b2;
  }
`;

type PropsType = {
  onEnter?: (name: string) => void;
  onChange?: (name: string) => void;
  placeholder?: string;
  cleanOnEnter?: boolean;
  type?: 'password' | 'text';
};

function InputComponent(props: PropsType) {
  const [value, setValue] = useState("");

  const handleChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setValue(value);

    props.onChange && props.onChange(value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && props.onEnter) {
      props.onEnter(value);

      if (props.cleanOnEnter) {
        setValue("");
      }
    }
  };

  return (
    <Input
      type={props.type ?? 'text'}
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default InputComponent;
