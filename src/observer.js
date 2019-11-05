import {Dep} from './dep'
//创建观察对象
export class Observer{
    constructor(data){
        //提供一个方法解析，完成属性的分析，和劫持
        this.observe(data)
    }

    //解析数据，完成对数据属性的“劫持”（控制对象属性的getter和setter方法）
    observe(data){
        //判断数据的有效性（必须是对象）
        if(!data||typeof data!=='object')
            return;
        //针对当前对象的属性重新定义（劫持）
        //获取对象键名
        var keys=Object.keys(data);
        keys.forEach((key)=>{
            this.defineReactive(data,key,data[key])
        })
    }

    //重新定义
    defineReactive(obj,key,val){
        var dep=new Dep();
        //目标对象，属性名，属性配置
        Object.defineProperty(obj,key,{
            //是否可遍历
            enumerable:true,
            //是否可以重新配置
            configurable:false,
            // 特权方法：getter
            get(){
                //针对watch创建时，直接完成发布订阅的添加
                Dep.target&&dep.addSub(Dep.target)
                return val;
            },
            //特权方法：setter
            set(newValue){
                val=newValue;
                dep.notify();
                //把新值覆盖到旧值
            }
        })
    }
}
