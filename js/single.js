/*
* 单例模式:
* 我们需要一个对象A
* 这个对象一旦被创建，后续不会被改变
* */
function Person(){
    this.name="ruby";
    this.age=21;
    this.timeTamp=+new Date();
    var obj=this;
    /*or 根据情况做this的定义*/
    Person=function(){
        return obj;
    }
}
Person.prototype={
    constructor:Person,
    getName:function(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
}

var p1=new Person();
console.log(p1);
console.log(p1.getName());
console.log(p1.getAge());
setTimeout(function(){
    var p2=new Person();
    console.log(p2.getName());
    console.log(p2.getAge());
},1000);

/*
* 知识扩展：
* 在构造函数中修改其自身
* 以下我们注意到：S1我们将构造函数的原型进行了重写，因为如果没有这一步，那么a2将不会拥有原本原型函数中的任何函数。
* 原因就是Animal已被重写，就如同重新给了它一个新的地址，但是原本的原型仍然指向旧的Animal构造函数。
* */
function Animal(){
    this.hoot="hoot";
    this.name="owl";
    Animal=function(){
        this.name="bat";
    }
    Animal.prototype=this;/*S1*/
}
Animal.prototype={
    constructor:Animal,
    getName:function(){
        return this.name;
    }
}
var a1=new Animal();
console.log(a1.getName());
var a2=new Animal();
console.log(a2.getName());

