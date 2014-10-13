/**
 * 订阅者模式
 * 订阅者订阅消息中心的消息
 * 消息中心有份订阅者清单，记录着每条消息的订阅者
 * 当某条消息更新时，通知给它的订阅者
 */
/**
 * NewsCenter：消息中心制造库
 * Subscriber: 制造一个订阅者
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
            var callback=subscribers[i].callbacks[e];
            if(typeof data != "undefined"){
                for(var j=0;j<callback.length;j++){
                    callback[j](data);
                }
            }
        }
    },
    unsubscribe:function(p,e){
        var subscribers=this.subscriber[e];
        for(var i=0; i<subscribers.length;i++){
            if(subscribers[i].name== p.name){
                var copy1=subscribers;
                var copy2=subscribers;
                var f=copy1.splice(0,i);
                var b=copy2.splice(i+1,copy2.length-i);
                this.subscriber[e]= f.concat(b);
            }

        }
    }
}

function Subscriber(name){
    this.name=name;
    this.callbacks={};
}
Subscriber.prototype={
    constructor:Subscriber,
    register:function(e,c){
        this.callbacks[e]=typeof this.callbacks[e] == "undefined" ? [] : this.callbacks[e];
        this.callbacks[e].push(c);
    }
}

/*create a center*/
var center=new NewsCenter();

var ruby=new Subscriber("ruby");
ruby.register("delNews",function(data){
    console.log("我是ruby,那货把消息删了？！");
})
ruby.register("addNews",function(data){
    console.log("我是ruby,那货添加了一条新消息!"+data);
})
center.subscribe(ruby,"delNews");
center.subscribe(ruby,"addNews");

var tom=new Subscriber("tom");
tom.register("addNews",function(data){
    console.log("我是tom,我收到一条新消息!消息的内容是:"+data);
});
tom.register("addNews",function(data){
    console.log("我是tom,这是第二个回调函数！");
});
center.subscribe(tom,"addNews");
center.unsubscribe(ruby,"addNews");

center.send("addNews","这是新消息的内容!");
center.send("delNews","我删除了一条消息");