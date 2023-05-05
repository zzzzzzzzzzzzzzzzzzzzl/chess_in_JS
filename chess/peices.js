var board_onclick=false
function toggle_board_onclick_events(){//will make the board nonclickable for certain events
    board_onclick=!board_onclick
    
    if (board_onclick){
        var container=document.getElementById('container')
        container.style="pointer-events:none;"
    }
    else{
        var container=document.getElementById('container')
        container.style="pointer-events:auto;"
    }
    
}
//==================================================================================================================================

export class pawn{
    constructor(){
        this.double=true//if the pawn can move forward 2 squares or not
        
    }
    get_valid_moves(square,last_move,board){

        
       
        if (this.colour){
            var forward=[[1,0]]
            var attack=[[1,-1],[1,1]]
            var adjacent=[[0,-1],[0,1]]
            var en_passant=[[1,-1],[1,1]]
            if (this.double){forward.push([2,0])}
        }
        else{
            var forward=[[-1,0]]
            var attack=[[-1,-1],[-1,1]]
            var adjacent=[[0,-1],[0,1]]
            var en_passant=[[-1,-1],[-1,1]]
            if (this.double){forward.push([-2,0])}
        }
        var valid=[]
        for(let i in forward){
            var check=[forward[i][0]+square[0],forward[i][1]+square[1]]
            if(check[0]>-1&&check[1]>-1&&check[0]<8&&check[1]<8){
                if (!board[check[0]][check[1]].piece){valid.push(check)}
            }
        }
        for(let i in attack){
            var check=[attack[i][0]+square[0],attack[i][1]+square[1]]
            if(check[0]>-1&&check[1]>-1&&check[0]<8&&check[1]<8){
                if (board[check[0]][check[1]].piece){valid.push(check)}
            }  
        }
        if (last_move){//this is all just to check if en passant is valid
            var last_move_vector=[Math.abs(last_move[0].square[0]-last_move[1].square[0]),last_move[0].square[1]-last_move[1].square[1]]
            if (last_move_vector.join()==[2,0].join()&&last_move[1].piece.constructor.name=="pawn"){
                for(let i in adjacent){
                    var check=[adjacent[i][0]+square[0],adjacent[i][1]+square[1]]
                    if (board[check[0]][check[1]].square==last_move[1].square){
                        
                        var push =[en_passant[i][0]+square[0],en_passant[i][1]+square[1]]
                        var en_passant_take=[check,push]
                        valid.push(push)
                    }
                }
            }
        }
        return [valid,en_passant_take]
    }
    move(square,board,selected){
        this.double=false
        this.promote(square)

        if(this.colour&&square.square[0]==7){this.promote()}
        else if(!this.colour&&square.square[0]==0){this.promote()}
    }
    promote(square){
        var x=square.div.firstChild
     //   x.remove()
        this.create_box_on_mouse_pos()
    }
    select_promotion_piece(sprite_url,piece_class,parent){
        function create_img(img_url){//creates a div with a img child and img url
    
            var img=document.createElement("img")
            img.src=img_url
            img.id='piece'
            var x=document.createElement('div');
            x.classList.add('promotion_box_child','square');
            x.appendChild(img) 
            
            return x;
        }
        var img=create_img(sprite_url)
        parent.appendChild(img)

        img.addEventListener('click',()=>{

            parent.parentNode.removeChild(parent)
            this.promote_to=sprite_url
            toggle_board_onclick_events()
        });
}
handle_it(piece){
    console.log("handelkd",piece)
}
create_parent_div(){///-------------------------------revise this

    var promotion_div=document.createElement("div")
    promotion_div.classList.add('promotion_box')
    if(this.colour){var c='w'}
    else{var c='b'}
    this.select_promotion_piece(`./sprite/${c}knight.png`,knight,promotion_div)
    this.select_promotion_piece(`./sprite/${c}bishop.png`,bishop,promotion_div)
    this.select_promotion_piece(`./sprite/${c}queen.png`,queen,promotion_div)
    this.select_promotion_piece(`./sprite/${c}rook.png`,rook,promotion_div)

    document.body.appendChild(promotion_div)
    return promotion_div
}


    create_box_on_mouse_pos(){
        toggle_board_onclick_events()
        var mouseX = window.pageXOffset + event.clientX;
        var mouseY = window.pageYOffset + event.clientY;
        $(this.create_parent_div())
                .css({
                    "left": mouseX + 'px',
                    "top": mouseY + 'px'
                })
                .appendTo(document.body);
        

    }
}
export class rook{
    constructor(){
    }
}

export class bishop{
    constructor(){
    }
}

export class knight{
    constructor(){
    }
}

export class queen{
    constructor(){
    }
}

export class king{
    constructor(){

    }
}

export class board{
    constructor(){
//================================================SET UP
    this.move_history
    this.turn=true
    this.selected=null
    this.valid=[]
    this.board=[]

    for(let i =0;i<8;i++){
            this.board.push([])
            for (let j=0;j<8;j++){
                this.board[i].push({
                    piece:null,
                    square:[i,j],
                    div:document.getElementById(`${i}.${j}`)  
                })
            }
        }
    }

    create_piece(piece_type,bool){
        var piece=new piece_type() 
        piece.colour=bool
        const name=piece.constructor.name

        if (bool){var c='w'}
        else{var c='b'}

        var spriteurl=`./sprite/${c}${name}.png`
        piece.sprite= document.createElement('img')
        piece.sprite.src=spriteurl
        piece.sprite.id='piece'

        return piece;
    }
    place_board_piece(x,y,piece,bool){
        this.board[x][y].piece=this.create_piece(piece,bool)
        this.board[x][y].div.appendChild(this.board[x][y].piece.sprite)
    }

    setboard(){

        for (let i in this.board[1]){
            this.place_board_piece(1,i,pawn,true)
        }
        for (let i in this.board[6]){
            this.place_board_piece(6,i,pawn,false)
        }
        this.place_board_piece(7,0,rook,false)
        this.place_board_piece(7,1,knight,false)
        this.place_board_piece(7,2,bishop,false)
        this.place_board_piece(7,3,queen,false)
        this.place_board_piece(7,4,king,false)
        this.place_board_piece(7,5,bishop,false)
        this.place_board_piece(7,6,knight,false)
        this.place_board_piece(7,7,rook,false)
        
        this.place_board_piece(0,0,rook,true)
        this.place_board_piece(0,1,knight,true)
        this.place_board_piece(0,2,bishop,true)
        this.place_board_piece(0,3,queen,true)
        this.place_board_piece(0,4,king,true)
        this.place_board_piece(0,5,bishop,true)
        this.place_board_piece(0,6,knight,true)
        this.place_board_piece(0,7,rook,true)
    }

    take_turn(id){
        this.valid_UN_highlight()

        
        this.clicked_square=this.board[id[0]][id[2]]

        if(this.valid.find(i=>i.join()==this.clicked_square.square.join())&&this.selected){//compares 2 arrays have to use "join()" to use equal operator on arr in js

            this.move_piece()
            return

        }

        if (this.clicked_square.piece){
            if(this.clicked_square.piece.colour==this.turn){
                this.selected=this.clicked_square
                this.get_valid()
                }
            }                
    }
    choose_piece(){

    }

    get_valid(){
        if(this.selected.piece){
            
            var arr=this.selected.piece.get_valid_moves(this.selected.square,this.last_move,this.board)

            this.en_passant=arr[1]
            this.valid=arr[0]
            this.selected.div.classList.add("selected")
            this.valid.map(i=>{
                if(i[0]>-1&&i[1]>-1&&i[0]<8&&i[1]<8){
                    this.board[i[0]][i[1]].div.classList.add("valid")
                        }
                    })
                }
            }
    valid_UN_highlight(){
        if (this.selected){this.selected.div.classList.remove("selected")}
            this.valid.map(i=>{
                if(i[0]>-1&&i[1]>-1&&i[0]<8&&i[1]<8){
                    this.board[i[0]][i[1]].div.classList.remove("valid")
                    }
                })
            }   
    move_piece(){
        if(this.clicked_square.piece){
            this.take_piece(this.clicked_square.square)
        }
        if(this.en_passant){
            if(this.clicked_square.square.join()==this.en_passant[1].join()){
                this.take_piece(this.en_passant[0])
                this.en_passant=null
            }     
        }
        this.selected.piece.move(this.clicked_square,this.board,this.selected)

        this.last_move=[this.selected,this.clicked_square]//gets the last move# only used for en passant
        this.selected.div.classList.remove("selected")
        this.clicked_square.div.appendChild(this.selected.piece.sprite)

        const  arr=this.clicked_square.square
        const arr2=this.selected.square
//=======================================================================================================
        const temp=this.board[arr[0]][arr[1]].piece//swap the two pieces
        this.board[arr[0]][arr[1]].piece=this.board[arr2[0]][arr2[1]].piece
        this.board[arr2[0]][arr2[1]].piece=temp


        this.selected=null
        this.clicked_square=null

        this.turn=!this.turn
    }
    take_piece(arr){
        document.body.appendChild(this.board[arr[0]][arr[1]].piece.sprite)
        this.board[arr[0]][arr[1]].piece=null
    }  
}








