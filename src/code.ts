import { replaceSelectedNodes, sendToUI, selectSelectedNodes } from "./func";
import { createNodeByType, createNodeByArray } from "./node";

figma.showUI(__html__, { themeColors: true, height: 300 });
// createNodeByArray();
//插件初始化时,发送当前页面的所有节点给前台
const pageAllNodes = figma.currentPage.findAll();
sendToUI(pageAllNodes);

//事件监听,等待接收前台的消息
figma.ui.onmessage = message => {
	//根据前台传递过来的用户选择的节点类型和选中的节点消息,替换节点数组中的每一个节点为当前页面被用户选中的节点
	replaceSelectedNodes(message);
	//根据前台传递过来的节点类型,选中节点
	selectSelectedNodes(message);
};




