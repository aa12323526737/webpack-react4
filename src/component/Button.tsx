import * as React from "react";
import * as ReactDOM from "react-dom";

//创建一个通用的点击事件按钮
export function Button(props: { label: string; onClick: () => void }) : JSX.Element {
  const { onClick, label } = props;
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}





