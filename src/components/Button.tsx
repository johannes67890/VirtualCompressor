import React from "react";
import { classNames } from "../static/classNames";

const Button: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  classes?: string;
  id?: string;
}> = ({ children, onClick, style, classes, id }) => {
  return (
    <button
      id={id}
      style={style}
      className={classNames(
        classes,
        "bg-secondary-300 text-white hover:bg-opacity-60 py-1 px-2 rounded-md select-none"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
