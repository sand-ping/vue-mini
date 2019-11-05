import {query, toArray,isElementNode,isTextNode,isDirective} from './utils'
import {Watcher} from './watcher'
import {Observer} from './observer'
import {CompilerUtils} from './compile'

// MiniVue构造函数 参数是一个对象
class MVVM {
    constructor(options){
        this._init(options)
    }

    // 初始化数据和方法
    _init(options) {
        this.vm=this,
        this.$el = options.el;
        this.$data=options.data;

        //获取元素node节点
        var el=query(this.$el);
        if(!el){
            return ;
        }
        this.$el=el;

        //添加属性观察对象
        new Observer(this.$data)

        //获取节点片段
        var fragment=this.node2Fragment(el)

        //解析
        this.compiler(fragment)
        this.$el.appendChild(fragment)

    }

    //解析虚拟dom
    compiler(parent){
        //获取子节点
        let childNodes=parent.childNodes;
        //遍历每一个节点
        toArray(childNodes).forEach((node)=>{
            //判断节点类型
            //属性节点（解析指令）
            if(isElementNode(node)){
                this.compileElement(node)
            }else if(isTextNode(node)){
                //文本节点（解析指令）
                this.compileText(node)
            }
            //如果还有子节点，继续解析
            this.compiler(node)
        })
 
    }

    //解析元素节点的指令
    compileElement(node){
        //获取当前元素的所有属性
        var attributes=node.attributes;
        //遍历当前元素的所有属性
        toArray(attributes).forEach((item)=>{
            var attrName=item.name;
            //判断属性是否是指令
            if(isDirective(attrName)){
                //获取指令类型
                var type=attrName.substr(2)
                //指令的值就是表达式
                var expr=item.value;
                if(!!CompilerUtils[type]){
                    CompilerUtils[type](node,this.vm,expr)
                }
                
            }
        })
    }

    
    //解析文本节点的指令
    compileText(node){
        var textReg_g=/\{\{([^\{]+)\}\}/mg
        var textContent=node.textContent;
        var match=textContent.match(textReg_g)
        if(!!match){
            var matchArr=match.map((item)=>{
                //去掉{{}}
                item=item.slice(2,item.length-2);
                item.trim();
                return item;
            })
            node.textContent=this.compileText_update(textContent,matchArr)

            matchArr.forEach((item)=>{
                if(!!this.$data[item]){
                    new Watcher(this,item,(newValue)=>{
                        node.textContent=this.compileText_update(textContent,matchArr)
                    })
                }
            })
        }   
    }
    //解析文本节点，返回替换成的文本
    compileText_update(textContent,matchArr){
        var textReg=/\{\{([^\{]+)\}\}/m
        matchArr.forEach((item)=>{
            console.log('this.$data[item',this.$data[item])
            textContent=textContent.replace(textReg,this.$data[item])
        })
        return textContent;
    }

    //获取元素片段
    node2Fragment(node){
        let fragment=document.createDocumentFragment(),child;
        while(child=node.firstChild){
            //child在原来的那里就没了，由于指针已经变了
            fragment.appendChild(child)
        }
        return fragment
    }
}

window.MVVM=MVVM;
