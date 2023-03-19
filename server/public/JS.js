

import{
    bishop,board,knight,queen,rook
}from './peices.js'

//----------------------------------
var container=document.getElementById('container')
var row=0;
var color='n';


function createboard(width,height){
    function createrow(column,rows){
        function createsquare(color,id){
            var x=document.createElement('div');
            x.addEventListener('click',function(){b.take_turn(id)});
            x.classList.add(color);
            x.classList.add('square');
            x.id=id
           // x.innerHTML=id//<================temp line remove to get rid of numbers on screen
            return x;
        }
        var x=document.createElement('div')
        for (let i =0;i<column;i++){
            
            if ((row+i)%2==0){  color ='light';}
            else{color='dark';}
            var n=`${row}.${i}`
            var square=createsquare(color,n);
    
            x.appendChild(square)
        }
        x.classList.add('column');
        row++
        return x
    }
    
    var rows=[]
    for (let i=0;i<height;i++){rows.push(createrow(width,rows))}
    for (let i in rows){
        container.appendChild(rows[rows.length-i-1]);
    }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------


createboard(8,8);
var b=new board();

b.setboard()


