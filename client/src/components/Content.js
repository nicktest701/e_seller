import React from "react";

function Content({ children, style }) {
  return (
    <div className="content" style={style}>
      {children}
    </div>
  );
}

export default Content;
