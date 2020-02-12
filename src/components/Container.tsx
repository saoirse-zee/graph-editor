import * as React from "react";

function Container({ children, handleClick }: any) {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      onClick={(e: any) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top; //y position within the element.
        handleClick([x, y])
      }}
      style={{ border: "solid 1px purple" }}
    >
      {children}
    </svg>
  );
}

export default Container;
