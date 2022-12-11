/**
 * @description 按样式被分类的节点对象
 * @example interface ClassifiedNodeObj {
	矩形: { count: number; nodes: groupStyleNode };
	线条: { count: number; nodes: groupStyleNode };
	椭圆: { count: number; nodes: groupStyleNode };
	多边形: { count: number; nodes: groupStyleNode };
	星形: { count: number; nodes: groupStyleNode };
	矢量: { count: number; nodes: groupStyleNode };
	文本: { count: number; nodes: groupStyleNode };
	框架: { count: number; nodes: groupStyleNode };
	组件: { count: number; nodes: groupStyleNode };
	切片: { count: number; nodes: groupStyleNode };
	区块: { count: number; nodes: groupStyleNode };
}
 *
 */

interface ClassifiedNodesData {
	矩形: { count: number; nodes: groupStyleNode };
	线条: { count: number; nodes: groupStyleNode };
	椭圆: { count: number; nodes: groupStyleNode };
	多边形: { count: number; nodes: groupStyleNode };
	星形: { count: number; nodes: groupStyleNode };
	矢量: { count: number; nodes: groupStyleNode };
	文本: { count: number; nodes: groupStyleNode };
	框架: { count: number; nodes: groupStyleNode };
	组件: { count: number; nodes: groupStyleNode };
	切片: { count: number; nodes: groupStyleNode };
	区块: { count: number; nodes: groupStyleNode };
}


/**
 * @description groupStyleNode 用于存储按样式被分类的节点
 * @example {[key: string]: SceneNode[]}
 * 				{填充:[node1,node2,node3],描边:[node1,node2,node3],...}
 */
interface groupStyleNode {
	[key: string]: SceneNode[];
}


/**
 * @description GroupNodeTypeName 用于存储按样式被分类的所有的节点类型名
 * @example {[key: string]: string[]}
 *          {矩形:["","",""],线条:["","",""],...}
 */
interface ClassifiedTypeNames {
	[key: string]: string[];
}
export { ClassifiedNodesData as ClassifiedNodeData , groupStyleNode, ClassifiedTypeNames as GroupNodeTypeName };
