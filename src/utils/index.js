//获取元素信息
export function query(el){
    return typeof el =='string'?document.querySelector(el):el
}

//检验是不是元素类型
export function isElementNode(node){
    return node.nodeType==1
}

//检查是不是文本节点
export function isTextNode(node){
    return node.nodeType==3
}

//将类数组对象转为数组返回
export function toArray(bumArray){
    return [].slice.call(bumArray)
}  


//判断是否是不是属性指令
export function isDirective(attrName){
    return attrName.startsWith('v-')
}


