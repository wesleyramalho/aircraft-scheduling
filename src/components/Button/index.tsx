import styled from "styled-components";
import { PRIMARY_COLOR } from "../../theme";

type ButtonProps = {
    children?: React.ReactNode;
    variant?: "primary" | "danger";
    disabled?: boolean; 
    onClick?: (e: React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

const ButtonComponent = styled.button<ButtonProps>`
  background: ${(props) =>
        props.variant === "danger" ? "#d9534f" : PRIMARY_COLOR};
  color: ${(props) => (props.variant === "danger" ? "#fff" : "#fff")};
  font-size: 1em;
  margin: 1em;
  padding: 6px 12px;
  border: ${(props) =>
        props.variant === "danger" ? "1px solid #d9534f" : `1px solid ${PRIMARY_COLOR}`};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) =>
        props.variant === "danger" ? "#c9302c" : `${PRIMARY_COLOR}cc`};
  }
`;



const Button = ({
    children,
    variant = "primary",
    onClick,
    onKeyPress,
    disabled,
}: ButtonProps) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter") {
            onClick && onClick(e);
        }
        onKeyPress && onKeyPress(e);
    };
    return (
        <ButtonComponent
            variant={variant}
            onClick={onClick}
            onKeyPress={handleKeyPress}
            disabled={disabled}
        >
            {children}
        </ButtonComponent>
    );
};

export default Button;
