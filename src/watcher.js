import {Dep} from './dep'
//声明一个订阅者
//需要订阅功能的节点；全局vm对象；发布时需要做的事
export class Watcher{
    constructor(vm,expr,callback){
        //缓存重要属性
        this.vm=vm;
        this.expr=expr;
        this.callback=callback;

        //缓存当前值
        this.value=this.get();
    }
    //获取当前值
    get(){
        //当前订阅者添加到全局
        Dep.target=this;//watcher实例
        var value=this.vm.$data[this.expr]
        //清空全局
        Dep.target=null;
        //返回
        return value;
    }

    //提供一个更新方法（应对发布后，要做的事情）
    update(){
        //  获取新值，老值，判断后执行回调
        var newValue=this.vm.$data[this.expr]
        var oldValue=this.value;
        if(newValue!==oldValue){
            this.callback(newValue);
        }
    }
}
