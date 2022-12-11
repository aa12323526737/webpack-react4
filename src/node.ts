//创建一个函数,每种类型的节点创建一个,加入当前页面节点中
export function createNodeByType() {
	//创建一个矩形节点
	const node = figma.createRectangle();
	node.name = "矩形";
	figma.currentPage.appendChild(node);
	//创建一个线条节点
	const node2 = figma.createLine();
	node2.name = "线条";
	figma.currentPage.appendChild(node2);
	//创建一个椭圆节点
	const node3 = figma.createEllipse();
	node3.name = "椭圆";
	figma.currentPage.appendChild(node3);
	//创建一个多边形节点
	const node4 = figma.createPolygon();
	node4.name = "多边形";
	figma.currentPage.appendChild(node4);
	//创建一个星形节点
	const node5 = figma.createStar();
	node5.name = "星形";
	figma.currentPage.appendChild(node5);
	//创建一个矢量节点
	const node6 = figma.createVector();
	node6.name = "矢量";
	figma.currentPage.appendChild(node6);
	//创建一个文本节点
	const node7 = figma.createText();
	node7.name = "文本";
	figma.currentPage.appendChild(node7);
	//创建一个框架节点
	const node8 = figma.createFrame();
	node8.name = "框架";
	figma.currentPage.appendChild(node8);
	//创建一个组件节点
	const node9 = figma.createComponent();
	node9.name = "组件";
	figma.currentPage.appendChild(node9);
	//创建一个页面节点
	// const node10 = figma.createPage();
	// node10.name = "页面";
	// figma.currentPage.appendChild(node10);
	//创建一个切片节点
	const node11 = figma.createSlice();
	node11.name = "切片";
	figma.currentPage.appendChild(node11);
	//创建一个便签节点
	// const node12 = figma.createSticky();
	// node12.name = "便签";
	// figma.currentPage.appendChild(node12);
	//创建一个连接器节点
	// const node13 = figma.createConnector();
	// node13.name = "连接器";
	// figma.currentPage.appendChild(node13);
	//创建一个带文本的形状节点
	// const node14 = figma.createShapeWithText();
	// node14.name = "带文本的形状";
	// figma.currentPage.appendChild(node14);
	//创建一个代码块节点
	// const node15 = figma.createCodeBlock
	// node15.name = "代码块";
	// figma.currentPage.appendChild(node15);
	//创建一个区块节点
	const node16 = figma.createSection();
	node16.name = "区块";
	figma.currentPage.appendChild(node16);
}

//创建一个函数,根据节点名称创建节点,加入当前页面节点中
export function createNodeByName(name: string) {
	if (name == "矩形") {
		const node = figma.createRectangle();
		node.name = "矩形";
		figma.currentPage.appendChild(node);
	}
	if (name == "线条") {
		const node = figma.createLine();
		node.name = "线条";
		figma.currentPage.appendChild(node);
	}
	if (name == "椭圆") {
		const node = figma.createEllipse();
		node.name = "椭圆";
		figma.currentPage.appendChild(node);
	}
	if (name == "多边形") {
		const node = figma.createPolygon();
		node.name = "多边形";
		figma.currentPage.appendChild(node);
	}
	if (name == "星形") {
		const node = figma.createStar();
		node.name = "星形";
		figma.currentPage.appendChild(node);
	}
	if (name == "矢量") {
		const node = figma.createVector();
		node.name = "矢量";
		figma.currentPage.appendChild(node);
	}
	if (name == "文本") {
		const node = figma.createText();
		node.name = "文本";
		figma.currentPage.appendChild(node);
	}
	if (name == "框架") {
		const node = figma.createFrame();
		node.name = "框架";
		figma.currentPage.appendChild(node);
	}
	if (name == "组件") {
		const node = figma.createComponent();
		node.name = "组件";
		figma.currentPage.appendChild(node);
	}

	if (name == "切片") {
		const node = figma.createSlice();
		node.name = "切片";
		figma.currentPage.appendChild(node);
	}

	if (name == "区块") {
		const node = figma.createSection();
		node.name = "区块";
		figma.currentPage.appendChild(node);
	}
}

//创建一个节点名称数组
const nodeNames = ["矩形", "线条", "椭圆", "多边形", "星形", "矢量", "文本", "框架", "组件", "切片", "区块"];

//循环节点名称数组,创建节点
export function createNodeByArray() {
	nodeNames.forEach(nodeName => {
		createNodeByName(nodeName);
	});
}

//对比两个节点的fills填充属性
export function compareFills(node1: SceneNode, node2: SceneNode) {
	if ("fills" in node1 && "fills" in node2 && JSON.stringify(node1.fills) == JSON.stringify(node2.fills)) {
		return true;
	} else {
		return false;
	}
}
//对比两个节点的strokes描边属性
export function compareStrokes(node1: SceneNode, node2: SceneNode) {
	if ("strokes" in node1 && "strokes" in node2 && JSON.stringify(node1.strokes) == JSON.stringify(node2.strokes)) {
		return true;
	} else {
		return false;
	}
}

//对比两个节点的effects效果属性
export function compareEffects(node1: SceneNode, node2: SceneNode) {
	if ("effects" in node1 && "effects" in node2 && JSON.stringify(node1.effects) == JSON.stringify(node2.effects)) {
		return true;
	} else {
		return false;
	}
}
//对比两个节点的layoutGrids网格属性
export function compareLayoutGrids(node1: SceneNode, node2: SceneNode) {
	if ("layoutGrids" in node1 && "layoutGrids" in node2 && JSON.stringify(node1.layoutGrids) == JSON.stringify(node2.layoutGrids)) {
		return true;
	} else {
		return false;
	}
}

//如果两个节点都有fills填充属性,,对比两个节点的fills填充属性,
//如果两个节点都有strokes描边属性, 对比两个节点的strokes描边属性,
//如果两个节点都有effects效果属性, 对比两个节点的effects效果属性,
//如果两个节点都有layoutGrids网格属性, 对比两个节点的layoutGrids网格属性,
//最后返回一个布尔值
export function compareNodeStyle(node1: SceneNode, node2: SceneNode) {
	if ("fills" in node1 && "fills" in node2) {
		if (!compareFills(node1, node2)) {
			return false;
		}
	}
	if ("strokes" in node1 && "strokes" in node2) {
		if (!compareStrokes(node1, node2)) {
			return false;
		}
	}
	if ("effects" in node1 && "effects" in node2) {
		if (!compareEffects(node1, node2)) {
			return false;
		}
	}
	if ("layoutGrids" in node1 && "layoutGrids" in node2) {
		if (!compareLayoutGrids(node1, node2)) {
			return false;
		}
	}
	return true;
}
