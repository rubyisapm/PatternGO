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
    this.news={};
    this.events={};
}
NewsCenter.prototype={
    subscribe:function(p,e,c){
        if(e in this.events){
            this.subscriber.e=this.subscriber.e ? [] : this.subscriber.e;
            this.subscriber.e.push(p);
        }

    },
    addNew:function(id,content){
        this.news[id]=content;
        /*find all the subscriber of this event*/
        var subscribers=this.subscribe.addNew;
        var length=subscribers.length;
        for(var i=0;i<length;i++){
            subscribers.callbacks["addNew"](data);
        }
    },
    changeNew:function(){

    },
    delNew:function(){

    }
}

var person={
    callbacks:{
        addNew:function(){
            console.log("我收到一条新消息!");
        }
    }
}
var center=new NewsCenter();
center.subscribe(person,"addNew");

