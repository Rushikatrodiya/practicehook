import React from "react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button onClick={onClick} disabled={disabled} style={{ margin: "4px", padding: "8px" }}>
      {children}
    </button>
  );
};

export default Button;
