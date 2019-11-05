//创建发布者
//管理订阅者
//通知
export function Dep(){
    this.subs=[];
}
Dep.prototype={
    //添加订阅
    addSub(sub){
        this.subs.push(sub)
    },
    //通知
    notify(){
        this.subs.forEach((sub)=>{
            sub.update();
        })
    }
}