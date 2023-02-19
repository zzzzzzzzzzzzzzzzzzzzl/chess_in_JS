function test(){
    x=1
    y=2
    return {x,y}
}
var {x,y}=test()
console.log(test(),"test",x,y)