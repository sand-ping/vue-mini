import {Watcher} from './watcher'

//通过指令解析
export var CompilerUtils={
    //解析text指令
    text(node,vm,expr){
        //找到更新方法
        var updaterFn=this.updater['textUpdater'];
        //执行更新方法
        updaterFn && updaterFn(node,vm.$data[expr])
        var date =expr
        //发出订阅，按之前的更新方法更新
        new Watcher(vm,expr,(newValue)=>{
            updaterFn && updaterFn(node,newValue)
        })
    },
    model(node,vm,expr){
        //找到更新方法
        var updaterFn=this.updater['modelUpdater'];
        //执行更新方法
        updaterFn && updaterFn(node,vm.$data[expr])

        //发出订阅，按之前的更新方法更新
        new Watcher(vm,expr,(newValue)=>{
            updaterFn && updaterFn(node,newValue)
        })

        node.addEventListener('input',(e)=>{
            var newValue=e.target.value;

            vm.$data[expr]=newValue;
        })
    },
    //更新规则
    updater:{
        //文本更新
        textUpdater(node,value){
            node.textContent=value
        },
        modelUpdater(node,value){
            node.value=value
        }
    },
}

