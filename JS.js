

import{
    board,pawn,rook,bishop,knight,queen,king
}from './peices.js'
var turn =false;
var selected;
function select(id){

    var square=getsquare(id);
    console.log(turn);

    //if selected is none then select a square with a piece on it
        if (square[1]!='n'){
            selected=square;
        };

        //if a square with a piece on it is selected and the other input square has no piece on it// should these be functions? for better organisation?
        if (selected && square[1]=='n' ){
            square[1]=selected[1];
            selected[1]='n';

            //selected div should have a child, square div should not. child selected child onto square div and delete child from selected.
            var selected_div=get_div(selected[0]);
            var square_div=get_div(square[0]);
            square_div.appendChild(selected_div.firstElementChild);
            
            turn=!turn;
        }

        //we just need to define movement for each peice.



    



}



//takes the div id  from the html and converts it into int so that so get the correct index for the board array.
function get_div(arr){
    var id= `${arr[0]}.${arr[1]}`;
    return document.getElementById(id);
    
}
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




