/**
 * 订阅者模式
 * 订阅者订阅消息中心的消息
 * 消息中心有份订阅者清单，记录着每条消息的订阅者
 * 当某条消息更新时，通知给它的订阅者
 */
/**
 * NewsCenter：消息中心制造库
 *
 * */
function NewsCenter(){
    this.subscriber={};
}
NewsCenter.prototype={
    constructor:NewsCenter,
    subscribe:function(p,e){
        this.subscriber[e]=typeof this.subscriber[e] =="undefined" ? [] : this.subscriber[e];
        this.subscriber[e].push(p);
    },
    send:function(e,data){
        var subscribers=this.subscriber[e];
        var l=subscribers.length;
        for(var i=0;i<l;i++){
            if(typeof data != "undefined"){
                subscribers[i].callbacks[e](data);
            }else{
                subscribers[i].callbacks[e]();
            }
        }
    }
}

var person={
    callbacks:{
        addNews:function(data){
            if(data){
                console.log("我收到一条新消息!消息的内容是:"+data);
            }
        }
    }
}
var center=new NewsCenter();
center.subscribe(person,"addNews");
center.send("addNews","这是新消息的内容!");

