/*
* 装饰者模式：
* 给实例添加各种装饰，实例可以选择不同的装饰方式，但不一定使用全部的装饰。
* 装饰可以动态添加。
* 装饰不能被继承，因为它不是类的核心定义。
* */

function Product(price){
    this.price=price || 1000;
}
Product.prototype={
    constructor:Product,
    getPrice:function(){
        console.log(this.price);
    },
    decorate:function(type){
        var decorations=this.constructor.decorations;
        if(typeof type=="string"){
            if(decorations[type]){
                decorations[type].call(this);
            }
        }else{
            console.log("error!");
        }
    }
}
Product.decorations={};
Product.decorations.tariff=function(){
    this.price=this.price*(1+0.05);
}
Product.decorations.vat=function(){
    this.price=this.price*(1+0.03);
}
Product.decorations.tax=function(){
    this.price=this.price*(1+0.06);
}

var car=new Product(100000);
car.decorate("tariff");
car.getPrice();
car.decorate("vat");
car.getPrice();