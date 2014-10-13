/*
*
*/
function Validator(rule){
    this.rule=rule;
}
Validator.prototype={
    constructor:Validator,
    validate:function(data){
        //invoke the test method
        var validations=this.validations;
        this.result=[];
        for(var i in data){
            var rule=this.rule[i];
            for(var j in rule){
                var feedback=validations[j].call(data[i],rule[j]);
                if(!feedback.status){
                    this.noteInit(data[i].note,feedback.msg);
                    this.result.push(i);
                    break;
                }
                this.noteInit(data[i].note,"验证通过！");
            }
        }
        return this.result;
    },
    noteInit:function(c,m){
        c.innerHTML=m;
    },
    validations:{
        Vnull:function(r){
            if(r){
                if(this.value==""){
                    return {
                        status:false,
                        msg:"该值不能为空！"
                    }
                }else{
                    return {
                        status:true
                    }
                }
            }

        },
        VzhOnly:function(r){
            console.log(this.value)
            if(r){
                if(!/^[^u4e00-u9fa5]+$/.test(this.value)){
                    return {
                        status:false,
                        msg:"只能输入中文！"
                    }
                }else{
                    return {
                        status:true
                    }
                }
            }

        },
        VenOnly:function(r){
            if(r){
                if(!/^[a-z]+&/.test(this.value)){
                    return {
                        status:false,
                        msg:"只能输入英文！"
                    }
                }else{
                    return {
                        status:true
                    }
                }
            }

        },
        lengthLimit:function(range){
            var fc=range.substr(0,1),
                sc=range.substr(range.length-1,1),
                min=range.substring(1,range.indexOf(",")),
                max=range.substring(range.indexOf(",")+1,range.length-1),
                fe=fc=="(" ? this.value.length>min : this.value.length>=min,
                se=sc==")" ? this.value.length<max : this.value.length<=max;
            if(!fe || !se){
                return {
                    status:false,
                    msg:"请确认输入的字符长度在"+range+"之间!"
                }
            }else{
                return {
                    status:true
                }
            }
        },
        numberLimit:function(range){
            var fc=range.substr(0,1),
                sc=range.substr(range.length-1,1),
                min=range.substring(1,range.indexOf(",")),
                max=range.substring(range.indexOf(",")+1,range.length-1),
                fe=fc=="(" ? this.value>min : this.value>=min,
                se=sc==")" ? this.value<max : this.value<=max;
            if(!fe || !se){
                return {
                    status:false,
                    msg:"请确认输入大小在"+range+"之间的数字！"
                }
            }else{
                return {
                    status:true
                }
            }
        },
        check:function(url){
            /*need jquery's support*/
            $.ajax({
                url:url,
                param:{value:this.value},
                asyn:false,
                contentType:"json",
                dataType:"json",
                success:function(data){
                    return data;
                },
                error:function(){
                    return {
                        status:false,
                        msg:"请求超时，请重试！"
                    }
                }
            })
        }
    },
    addValidation:function(name,fn,deep){
        if(typeof fn=="function"){
            if(deep){
                this.constructor.validations.name=fn;
            }
            this.validations.name=fn;
        }
    }
}

var validator=new Validator({
    name:{
        Vnull:true,
        VzhOnly:true,
        lengthLimit:"(1,4)"
    },
    age:{
        Vnull:true,
        numberLimit:"(10,20)"
    }
})
var note1=document.getElementById("name");
var note2=document.getElementById("age");
var data={
    name:{
        value:"中文四个",
        note:note1
    },
    age:{
        value:10,
        note:note2
    }

}
console.log(validator.validate(data));