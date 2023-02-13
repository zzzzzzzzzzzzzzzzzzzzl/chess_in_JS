

import{
    board,pawn,rook,bishop,knight,queen,king
}from './peices.js'
var color_to_move =true;// instead of black and white we will use true and false
var selected;
var valid;

function select(id){//id is a string with 2 numbers in it "5.8"
   
    var square=getsquare(id)
    var square_piece=square[1]
    
        if (square_piece.c_bool==color_to_move ){
            try{
                unhighlight_selected(selected)
                unhighlight_valid(valid)
            }catch{}
            selected=square    
            highlight_selected(selected)
            
            //
            valid=selected[1].get_valid_squares(selected,b)
            highlight_valid(valid)
        }
        
        if (selected && (square_piece=='n' || selected[1].c_bool== !square_piece.c_bool) ){//if a piece is selected and the piece is
            move_piece(square,selected)
            unhighlight_selected(selected)
            unhighlight_valid(valid)
            
            color_to_move=!color_to_move   
        }


        //we just need to define movement for each peice.



}
function get_valid_squares(selected){
    var arr=selected[1].get_valid_squares(selected[1])// so we call a function in for whichever the piece class is called and it will return an arr of valid moves
    //if we are doing this as a class function though we dont need to have this function here for it./
}
function highlight_valid(arr){
    for(let i in arr){
        console.log(arr[i])
        var div=get_div(arr[i][0])
        div.classList.add('valid')
      }
}
function unhighlight_valid(arr){
    for(let i in arr){
        console.log(arr[i])
        var div=get_div(arr[i][0])
        div.classList.remove('valid')
      }
}
function highlight_selected(selected){
    var div=get_div(selected[0])
    div.classList.add('selected')
}
function unhighlight_selected(selected){
    var div=get_div(selected[0])
    div.classList.remove('selected')
}
function move_piece(square,selected){


    selected[1].piece_moved()
    console.log(selected[1].times_moved)
    console.log(selected[1])

    if (square[1]!='n'){
        var element = get_div(square[0]).firstElementChild;
        element.remove(); 
    }
    square[1]=selected[1]
    selected[1]='n'
    var selected_div=get_div(selected[0])
    var square_div=get_div(square[0])
    square_div.appendChild(selected_div.firstElementChild)


} 

function get_div(arr){
    var id= `${arr[0]}.${arr[1]}`;
    return document.getElementById(id);
    
}
function getsquare(id){
    var x=parseInt(id[0]);
    var y=parseInt(id[2]);
    return b.board[x][y];
}


//----------------------------------
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

function createrow(column,rows){
    var x=document.createElement('div')
    for (let i =0;i<column;i++){
        
        if ((row+i)%2==0){  color ='light';}
        else{color='dark';}
        var n=`${i}.${row}`
        var square=createsquare(color,n);

        x.appendChild(square)
    }
    x.classList.add('column');
    row++
    return x
}

function createboard(width,height){
    var rows=[]
    for (let i=0;i<height;i++){rows.push(createrow(width,rows))}
    for (let i in rows){
        container.appendChild(rows[rows.length-i-1]);
    }
}

createboard(8,8);
var b=new board();

b.setboard()
console.log(b);



