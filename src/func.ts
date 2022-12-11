import {  ClassifiedNodesData ,  ClassifiedTypeNames, groupStyleNode } from "./endtype";
import {figmaRGBToHex}from "./color";

//分类当前页面所有的场景节点,返回被分类的节点数据
function getClassifiedNodesData(nodes: SceneNode[]) {
	const ClassifiedNodesData: ClassifiedNodesData = nodes.reduce(
		(ClassifiedNodesData: ClassifiedNodesData, node) => {
			if (node.type === "RECTANGLE") {
				ClassifiedNodesData["矩形"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["矩形"].nodes, node);
			}
			if (node.type === "LINE") {
				ClassifiedNodesData["线条"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["线条"].nodes, node);
			}
			if (node.type === "ELLIPSE") {
				ClassifiedNodesData["椭圆"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["椭圆"].nodes, node);
			}
			if (node.type === "POLYGON") {
				ClassifiedNodesData["多边形"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["多边形"].nodes, node);
			}
			if (node.type === "STAR") {
				ClassifiedNodesData["星形"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["星形"].nodes, node);
			}
			if (node.type === "VECTOR") {
				ClassifiedNodesData["矢量"].count++;
				// groupStyleNodeByFillsColor(ClassifiedNodesData["矢量"].nodes, node);
			}
			if (node.type === "TEXT") {
				ClassifiedNodesData["文本"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["文本"].nodes, node);
			}
			if (node.type === "FRAME") {
				ClassifiedNodesData["框架"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["框架"].nodes, node);
			}
			if (node.type === "COMPONENT") {
				ClassifiedNodesData["组件"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["组件"].nodes, node);
			}
			if (node.type === "SLICE") {
				ClassifiedNodesData["切片"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["切片"].nodes, node);
			}
			if (node.type === "SECTION") {
				ClassifiedNodesData["区块"].count++;
				groupStyleNodeByFillsColor(ClassifiedNodesData["区块"].nodes, node);
			}

			return ClassifiedNodesData;
		},
		{
			矩形: { count: 0, nodes: {} },
			线条: { count: 0, nodes: {} },
			椭圆: { count: 0, nodes: {} },
			多边形: { count: 0, nodes: {} },
			星形: { count: 0, nodes: {} },
			矢量: { count: 0, nodes: {} },
			文本: { count: 0, nodes: {} },
			框架: { count: 0, nodes: {} },
			组件: { count: 0, nodes: {} },
			切片: { count: 0, nodes: {} },
			区块: { count: 0, nodes: {} },
		}
	);
	return ClassifiedNodesData;
}

//根据被分类的当前页面所有的场景节点,双循环获得它所有的节点类型名称和类型下nodes样式分类节点的属性名,示例{矩形:["","",""],线条:["","",""],...}
export function getClassifiedTypeNames(ClassifiedNodesData: ClassifiedNodesData): ClassifiedTypeNames {
	const ClassifiedNodesDatasName: ClassifiedTypeNames = {};
	Object.keys(ClassifiedNodesData).forEach((key: string) => {
		ClassifiedNodesDatasName[key] = Object.keys(ClassifiedNodesData[key].nodes);
	});
	return ClassifiedNodesDatasName;
}

//根据被分类的当前页面所有的场景节点,获得它所有的节点数组的节点个数
export function getClassifiedNodesCount(ClassifiedNodesData: ClassifiedNodesData): number[] {
	return Object.values(ClassifiedNodesData).map(item => item.count); //TODO:待处理,这里的类型可以优化一下,可能ok的
}



//发送被分类的当前页面所有的场景节点的类型名给前台
export function sendToUI(pageAllNodes: SceneNode[]) {
	//获得被分类的当前页面所有的场景节点
	const ClassifiedNodesData: ClassifiedNodesData = getClassifiedNodesData(pageAllNodes);
	const ClassifiedTypeNames: ClassifiedTypeNames = getClassifiedTypeNames(ClassifiedNodesData);
	//获得被分类的当前页面所有的场景节点的节点个数
	const ClassifiedNodesCount = getClassifiedNodesCount(ClassifiedNodesData);
	//发送被分类的当前页面所有的场景节点的类型名给前台
	//发送被分类的当前页面所有的场景节点的节点个数给前台
	figma.ui.postMessage({ ClassifiedTypeNames: ClassifiedTypeNames, ClassifiedNodesCount: ClassifiedNodesCount });
}


//根据被分类的当前页面所有的场景节点和节点类型名称,获得这个节点类型名称对应的全部节点

function getNodesByTypeName(ClassifiedNodesData: ClassifiedNodesData, typeName: "矩形" | "线条" | "椭圆" | "多边形" | "星形" | "矢量" | "文本" | "框架" | "组件" | "切片" | "区块") {
	return ClassifiedNodesData[typeName].nodes[Object.keys(ClassifiedNodesData[typeName].nodes)[0]]; //TODO:待处理
}

//获得被选中的单个节点
function getSelectedNode(): SceneNode | undefined {
	//获得被选中的节点
	if (figma.currentPage.selection.length == 1) {
		const node = figma.currentPage.selection[0];
		return node;
	} else {
		figma.notify("请选择一个节点", { timeout: 1000 });
		return;
	}
}

//根据旧节点,克隆一个新节点,并设置新节点的位置等于旧节点位置和宽高等于旧节点宽高
function cloneNode(oldNode: SceneNode, newNode: SceneNode): SceneNode {
	//克隆得到新节点
	const cloneNewNode = newNode.clone();
	//设置克隆的新节点的位置等于旧节点位置
	cloneNewNode.x = oldNode.x;
	cloneNewNode.y = oldNode.y;
	//如果克隆的新节点存在resize
	if ("resize" in cloneNewNode && oldNode.height >= 0.01) {
		//设置克隆的新节点的宽高等于旧节点宽高
		cloneNewNode.resize(oldNode.width, oldNode.height); //TODO:待处理,可能可以了
	} else if ("resize" in cloneNewNode) {
		//设置克隆的新节点的宽高等于100
		cloneNewNode.resize(0.01, 0.01);
	}
	return cloneNewNode;
}



//替换两个场景节点,oldNode是要被替换的节点，newNode是新节点
function replaceNode(oldNode: SceneNode, newNode: SceneNode): void {
	//获取oldNode的父节点
	const parentNode = oldNode.parent;
	if (!parentNode) return; //TODO:待处理,可能要提示一下用户
	//获取 oldNode 在其父节点中的索引
	const index = parentNode.children.indexOf(oldNode);
	if (index === -1) return;
	//克隆得到新节点,并设置位置和宽高和旧节点相同
	const cloneNewNode = cloneNode(oldNode, newNode);
	//在旧节点的索引位置,添加克隆的新节点
	parentNode.insertChild(index, cloneNewNode);
	//移除 oldNode
	oldNode.remove();
}

//替换场景节点数组中的每一个节点, nodes是要被替换的节点数组，newNode是新节点
function replaceNodes(nodes: SceneNode[], newNode: SceneNode): void {
	//遍历节点数组,除了newNode,其他的节点都替换成newNode
	nodes.forEach(node => {
		if (node.id !== newNode.id) {
			replaceNode(node, newNode);
		}
	});
}

//根据前台传递过来的用户选择的节点类型和选中的节点消息,替换节点数组中的每一个节点为当前页面被用户选中的节点
export function replaceSelectedNodes(message) {
	//获得当前页面的所有节点
	const pageAllNodes = figma.currentPage.findAll();
	if (message.type === "replace-node") {
		//获得被分类的当前页面所有的场景节点
		const ClassifiedNodesData: ClassifiedNodesData = getClassifiedNodesData(pageAllNodes);
		//根据用户选择的节点类型,获得对应类型的节点数组
		const nodes = getNodesByTypeName(ClassifiedNodesData, message.data);
		//获得当前页面被用户选中的节点
		const selectedNode = getSelectedNode();
		//如果节点存在
		if (selectedNode) {
			//TODO:
			//替换节点数组中的每一个节点为当前页面被用户选中的节点
			replaceNodes(nodes, selectedNode);
			figma.notify("替换成功", { timeout: 1000 });
		}
	}
	//重新发送被分类的当前页面所有的场景节点的类型名给前台
	sendToUI(pageAllNodes); //TODO:这里有问题
}



//根据节点数组,选中这些节点
function selectNodes(nodes: SceneNode[]): void {
	//TODO:待处理
	//清空当前页面的选中节点
	figma.currentPage.selection = [];
	//选中这些节点
	figma.currentPage.selection = nodes;
	//滚动到能看到全部选中的节点
	figma.viewport.scrollAndZoomIntoView(nodes);
}

//根据前台传递过来的用户选择的节点类型,选中节点数组中的每一个节点
export function selectSelectedNodes(message) {
	//TODO:待处理,可以和replaceNodesbyUserSelectedNode优化
	//获得当前页面的所有节点
const pageAllNodes = figma.currentPage.findAll();
	if (message.type === "select-node") {
		//获得被分类的当前页面所有的场景节点
		const ClassifiedNodesData: ClassifiedNodesData = getClassifiedNodesData(pageAllNodes);
		//根据用户选择的节点类型,获得对应类型的节点数组
		const nodes = getNodesByTypeName(ClassifiedNodesData, message.data);
		//如果节点数组不是空数组,选中节点数组中的每一个节点,否则提示用户
		if (nodes.length > 0) {
			selectNodes(nodes);
		} else {
			figma.notify("当前页面没有此类型的节点", { timeout: 1000 });
		}
	}
}

//创建一个空对象,判断节点数组的每一项的fills填充属性是否相同,如果相同,则将fills属性的颜色作为key,将节点数组的每一项作为value,添加到空对象中,如果不相同,则还是将fills属性的颜色作为key,将节点数组的每一项作为value,添加到空对象中
export function groupStyleNodeByFillsColor(groupStyleNode: groupStyleNode, node: SceneNode): groupStyleNode {
	if ("fills" in node) {
		const rbg = node.fills[0].color as RGB; //TODO:待处理
		//根据RGB对象,转换为16进制颜色
		const color = figmaRGBToHex(rbg);
		if (!groupStyleNode[color]) {
			groupStyleNode[color] = [];
		}
		groupStyleNode[color].push(node);
	}
	return groupStyleNode;
}



