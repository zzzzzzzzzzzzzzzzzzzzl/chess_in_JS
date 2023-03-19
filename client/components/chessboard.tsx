import { Board } from "./pieces"

  

export  class chessBoard{
    constructor(props){

        this.props=props
        this.board=Array(8).fill().map((i,idx)=>{
            return Array(8).fill().map((j,jdx)=>{
                return `${idx}.${jdx}`
            })
        })

    }

    placePiece(pos,piece,colour){ 
        const c = (colour ? "w" : "b");
        this.board[pos[0]][pos[1]]={
            piece:piece,
            colour:colour,
            sprite:`./sprite/${c}${piece}.png`,
            div:function(){return document.getElementById(`${pos[0]}.${pos[1]}`)}
                    
            }
        }
        setBoard(){
             const BackRank=7
             this.placePiece([BackRank,0],"rook",false)//square//piece//colour
             this.placePiece([BackRank,1],"knight",false)
             this.placePiece([BackRank,2],"bishop",false)
             this.placePiece([BackRank,3],"queen",false)
             this.placePiece([BackRank,4],"king",false)
             this.placePiece([BackRank,5],"bishop",false)
             this.placePiece([BackRank,6],"knight",false)
             this.placePiece([BackRank,7],"rook",false)
             
             this.placePiece([0,0],"rook",true)
             this.placePiece([0,1],"knight",true)
             this.placePiece([0,2],"bishop",true)
             this.placePiece([0,3],"queen",true)
             this.placePiece([0,4],"king",true)
             this.placePiece([0,5],"bishop",true)
             this.placePiece([0,6],"knight",true)
             this.placePiece([0,7],"rook",true)

             this.board.map((i,idx)=> {this.placePiece([1,idx],"pawn",true)
             this.placePiece([6,idx],"pawn",false)
            })
        } 
        handleClick(e,pos){
            this.clicked=this.board[pos[0]][pos[1]]
            
            let arr=[pos]
            


            if(!this.selected ||this.clicked.piece){
                if(this.selected){
                    this.dehighlight()
                }
                this.selected=this.clicked
                this.highlight(e)
            }
            else{
                this.dehighlight()
                this.selected=null
                this
            }
            
        }
        highlight(e){
            this.selected.div().classList.add("selected");
        }
        dehighlight(e){
            this.selected.div().classList.remove("selected");
        }
        
   }
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
   
