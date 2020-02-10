import * as React from "react";

function Container({ children }: any) {
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

export default Container;
