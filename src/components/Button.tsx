import React, { FC, MouseEvent } from "react";

interface IBtn {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  color: string;
  children: string;
  marginR?: number;
}

export const Button: FC<IBtn> = ({ color, onClick, marginR, children }) => {
  return (
    <button
      className={`py-2 px-4 bg-${color}-400 rounded hover:shadow-md transition-all mr-${marginR}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
