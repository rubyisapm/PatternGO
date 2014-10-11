/*
* 工厂模式：
* 我们在写构造函数时，我们知道它的一些公共的特征，尚不清楚对象的类型。
*
* */
/*type name designer fuel*/
function CarMaker(){
    this.factory="Ferrari";
}
CarMaker.prototype={
    constructor:CarMaker,
    drive:function(){
        console.log("run fast");
    },
    getType:function(){
        console.log(this.type);
    },
    getDesigner:function(){
        console.log(this.designer);
    },
    work:function(workshop){
        var workshop=CarMaker.workshops[workshop];
        if(workshop){
            workshop.call(this);
        }else{
            return;
        }
    }
}
CarMaker.workshops={};
CarMaker.workshops.SUV=function(){
    this.type="SUV";
    this.name="runner";
    this.designer="Jack";
    this.fuel="gas";
    this.declaration=function(){
        console.log("I'm motivated.");
    }
}
CarMaker.workshops.SportsCar=function(){
    this.type="SportsCar";
    this.name="flasher";
    this.designer="Tom";
    this.fuel="water";
    this.declaration=function(){
        console.log("I'm the winner.");
    };
    this.decoration=function(){
        console.log("It has a high-quality decoration.");
    }
}

var suv=new CarMaker();
suv.work("SUV");
console.dir(suv);
suv.drive();
suv.getDesigner();
suv.declaration();

var sportscar=new CarMaker();
sportscar.work("SportsCar");
console.dir(sportscar);
sportscar.getDesigner();
sportscar.decoration();


