

import{
    board,pawn,rook,bishop,knight,queen,king
}from './peices.js'

var selected;
function select(id){
    console.log(selected);
    if (selected){
        //find a valid square to move to, if square is invalid deselect.
        var move=getsquare(id);
        if (selectif(move)==false){
    console.log('valid');
        }
        else{
            console.log('invalid');
            var selected;
        };



    }
    else{
    var t=document.getElementById(id).firstElementChild
    var valid=selectif(getsquare(id));
    if(valid){
        selected=id;
        }
    console.log(selected);
    };
}

//takes the div id  from the html and converts it into int so that so get the correct index for the board array.
function getsquare(id){
    var x=parseInt(id[0]);
    var y=parseInt(id[2]);
    return b.board[x][y];
}
//if there is a piece on the square return true
function selectif(s){
    return s[1]!='n';

}
//if a piece is selected then check 
function moveif(s){

}
function createsquare(color,id){
    var x=document.createElement('div');
    x.addEventListener('click',function(){select(this.id)});
    x.classList.add(color);
    x.classList.add('square');
    x.id=id
    return x;
}

var container=document.getElementById('container')
var row=0;
var color='n';

function createrow(column){
    var x=document.createElement('div')
    for (let i =0;i<column;i++){
        
        if ((row+i)%2==0){  color ='light';}
        else{color='dark';}
        var n=`${i}.${row}`
        var square=createsquare(color,n);

        x.appendChild(square)
    }
    x.classList.add('column');
    container.appendChild(x);
    row++
}

function createboard(width,height){

    for (let i=0;i<height;i++){createrow(width)}
}

createboard(8,8);
var b=new board();

b.setboard()
console.log(b);


var t='1.9';

console.log(t[0]);
console.log(t[2]);




