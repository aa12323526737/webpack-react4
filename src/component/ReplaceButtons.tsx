import * as React from "react";
import { Props } from "../fronttype";

export function ReplaceButtons(props: Props): JSX.Element {
	//解构props对象
	const { groupNodeTypeNames } = props;

	//创建事件监听函数,发送用户选择的节点类型消息给后台,替换节点此类型节点,放在按钮的点击事件中
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		//发送用户选择的节点类型消息给后台,替换节点此类型节点
		parent.postMessage({ pluginMessage: { type: "replace-node", data: event.currentTarget.innerText } }, "*");
	};
	//创建事件监听函数,发送用户选择的节点类型消息给后台,选中此类型节点,放在div的点击事件中
	const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
		//发送用户选择的节点类型消息给后台,选中此类型节点
		parent.postMessage({ pluginMessage: { type: "select-node", data: event.currentTarget.innerText } }, "*");
	};

	return (
		<div>
			{/* <div>
				{groupNodeTypeNames.map((item, index) => (
					<div className="replace" key={index}>
						<div className="text" onClick={handleDivClick}>
							{item}
						</div>
						<button className="replaceBtn" key={item} onClick={handleClick}>
							{item}
						</button>
						<div className="replaceCount">{groupNodeCounts[groupNodeTypeNames.indexOf(item)]}</div>
					</div>
				))}
			</div> */}

			{/* 循环groupNodeTypeNames嵌套对象,做出按钮 */}

			{Object.keys(groupNodeTypeNames).map((objKey, index) => (
				<div className="text" onClick={handleDivClick} key={index}>
					{objKey}
					{Object.values(groupNodeTypeNames).map((item, index) => (
						<div className="text" onClick={handleDivClick} key={index}>

							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
