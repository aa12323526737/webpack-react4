import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReplaceButtons } from "./component/ReplaceButtons";
import "./ui.css";

function UI() {


	//创建一个空数组,用来存储后台传来的分类的当前页面所有的场景节点类型名数组
	const [groupNodeTypeNames, setGroupNodeTypeNames] = React.useState<{
		[key: string]: string[];
	}>({});
	//创建一个空数组,用来存储后台传来的分类的当前页面所有的场景节点的节点个数数组
	const [setGroupNodeCounts] = React.useState<number[]>([]);
	//事件监听,接收后台传来的消息
	window.onmessage = (msg: MessageEvent): void => {
		//获得后台传来的数据
		const { groupNodeTypeNames } = msg.data.pluginMessage;


		//将后台传来的数据存储到对应的状态中,用来渲染组件,显示节点类型
		setGroupNodeTypeNames(groupNodeTypeNames);
		//将后台传来的数据存储到对应的状态中,用来渲染组件,显示节点个数
		// setGroupNodeCounts(groupNodeCounts);
	};


	return (
		<div className="App">
			<ReplaceButtons groupNodeTypeNames={groupNodeTypeNames}  />
		</div>
	);
}

ReactDOM.render(<UI />, document.getElementById("react-page"));
