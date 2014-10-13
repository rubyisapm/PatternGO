/*
* 提供外界访问内部数据的接口
* */
function DataCube(){
    this.count=-1;
}
DataCube.prototype={
    constructor:DataCube,
    data:{
        boss:"not you",
        secretary:"Alice",
        financeDep:{
            manager:"Fimay",
            employees:["Fery","Fony","Filera","Fryan"],
            area:20
        },
        frontEndDep:{
            manager:"God",
            employees:["ab","fh","qj","aq","xj"]
        }
    },
    addDeveloper:function(name){
        if(typeof name=="string"){
            this.data.frontEndDep.employees.push(name);
        }
    },
    changeBoss:function(name){
        this.data.boss=name;
    },
    getBoss:function(){
        console.log(this.data.boss);
    },
    nextDeveloper:function(){
        var developers=this.data.frontEndDep.employees;
        if(this.count>=-1 && this.count<developers.length-1){
            console.log(this.data.frontEndDep.employees[++this.count]);
        }else if(this.count>=developers.length-1){
            console.log("There are no more developers.");
        }else{
            console.log("error!");
        }
    },
    lastDeveloper:function(){
        var developers=this.data.frontEndDep.employees;
        if(this.count>0 && this.count<=developers.length){
            console.log(developers[--this.count]);
        }else if(this.count<=0){
            console.log("The first one yet.");
        }
    }
}

var operater1=new DataCube();
operater1.addDeveloper("ruby");
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();

var operater2=new DataCube();
operater2.addDeveloper("will");
operater2.addDeveloper("tom");
operater2.addDeveloper("toddy");
operater2.addDeveloper("scott");

operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();
operater1.nextDeveloper();

operater2.nextDeveloper();
operater2.lastDeveloper();
