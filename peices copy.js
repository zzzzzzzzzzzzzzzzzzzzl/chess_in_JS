
function bool_colour(c){
    var x;
    if (c=='w'){
        var x=true;
    };
    if (c=='b'){
        var x=false;
    }
    return x;
}
//==================================================================================================================================

export class pawn{
    
    constructor(c,s){
        this.c=c;
        this.c_bool=bool_colour(c);
        this.times_moved=0
        this.last_turn_moved;

        
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}pawn.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);
        sprite.id='piece';

    }
    get_valid_squares(selected,board){ 
        const pos=selected[0]
        const turn_counter=board.turn_counter
        board=board.board
        if(selected[1].c_bool){
            var pawn_double=[[0,2]]
            var check=[[0,1]]
            var take=[[-1,1],[1,1]]
            var en_passant=[[-1,0],[1,0]]
            var take_if_enemy=false
            var fourorthree=4
            var pawndoublecheck=1

        }
        else{
            var pawn_double=[[0,-2]]
            var check=[[0,-1]]
            var take=[[-1,-1],[1,-1]]
            var en_passant=[[-1,0],[1,0]]
            var take_if_enemy=true
            var fourorthree=3
            var pawndoublecheck=-1

        }
        var valid=[]
        var en_passant_valid=[]
        check.map(i=>{
            try{
                var x=[i[0]+pos[0],i[1]+pos[1]]
                if (board[x[0]][x[1]][1]=='n'){
                    valid.push(board[x[0]][x[1]])
                }
            }
            catch{}    
        })
        take.map(i=>{
            try{
                var x=[i[0]+pos[0],i[1]+pos[1]]
                if (board[x[0]][x[1]][1].c_bool==take_if_enemy){
                    valid.push(board[x[0]][x[1]])
                }
            }
            catch{}   
        })
        pawn_double.map(i=>{
            try{
                var x=[i[0]+pos[0],i[1]+pos[1]]
                if (board[x[0]][x[1]][1]=='n' && board[x[0]][x[1]-pawndoublecheck][1]=='n'&&this.times_moved==0){
                    valid.push(board[x[0]][x[1]])
                }
            }
            catch{}    
        })
        en_passant.map(i=>{
            try{
                var x=[i[0]+pos[0],i[1]+pos[1]]
                if (typeof(board[x[0]][x[1]][1])==typeof(selected[1])&&board[x[0]][x[1]][1].c_bool==take_if_enemy&&
                board[x[0]][x[1]][1].times_moved==1&&x[1]==fourorthree&&turn_counter-1==board[x[0]][x[1]][1].last_turn_moved){
                    var add
                    if(selected[1].c_bool){
                        add=1
                    }
                    else{add=-1}
                    valid.push(board[x[0]][x[1]+add])
                }
            } 
            catch{} 
        })
        return valid
   
    }
    piece_moved(square){
        this.times_moved++
        this.square=square
        this.create_box_on_mouse_pos(this.c)
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

        var piece_class=piece_class
        var img=create_img(sprite_url)
        parent.appendChild(img)
        var selected_piece=null
        function promotion_box_onclick(piece_class,square){
            
            toggle_board_onclick_events()
            console.log('right here baby')
            parent.parentNode.removeChild(parent)
            selected_piece=piece_class
            console.log(square)

            var pos=square[0]
            var piece=square[1]
            var div=$(`${pos[0]}.${pos[1]}`)
            div.removeChild(div.firstElementChild)
            var promoted_piece=
            div.appendChild()

            

            console.log(div)
        }
        var square=this.square
        img.addEventListener('click',function(){promotion_box_onclick(piece_class,square)});


        return selected_piece

}
create_parent_div(c){///-------------------------------revise this

    toggle_board_onclick_events()

    var promotion_div=document.createElement("div")
    promotion_div.classList.add('promotion_box')

    this.select_promotion_piece(`./sprite/${c}knight.png`,knight,promotion_div)
    this.select_promotion_piece(`./sprite/${c}bishop.png`,bishop,promotion_div)
    this.select_promotion_piece(`./sprite/${c}queen.png`,queen,promotion_div)
    this.select_promotion_piece(`./sprite/${c}rook.png`,rook,promotion_div)

    document.body.appendChild(promotion_div)
    return promotion_div
}


    create_box_on_mouse_pos(colour){

        var mouseX = window.pageXOffset + event.clientX;
        var mouseY = window.pageYOffset + event.clientY;
        $(this.create_parent_div(colour))
                .css({
                    "left": mouseX + 'px',
                    "top": mouseY + 'px'
                })
                .appendTo(document.body);
        

    }
}

//========================================================================================================


export class rook{
    constructor(c,s){
        this.last_turn_moved
        this.c=c;
        this.c_bool=bool_colour(c);

        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}rook.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

        this.times_moved=0

    }
}

export class bishop{
    constructor(c,s){
        this.last_turn_moved
        this.c=c;
        this.c_bool=bool_colour(c);

        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}bishop.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

        this.times_moved=0
    }
    piece_moved(){
        this.times_moved++
    }
}

export class knight{
    constructor(c,s){
        this.last_turn_moved
        this.c=c;
        this.c_bool=bool_colour(c);

        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}knight.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

        this.times_moved=0
    }
    piece_moved(){
        this.times_moved++
    }
}

export class queen{
    constructor(c,s){
        this.last_turn_moved
        this.c=c;
        this.c_bool=bool_colour(c);

        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}queen.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

        this.times_moved=0
    }
    piece_moved(){
        this.times_moved++
    }
}

export class king{
    constructor(c,s){
        this.last_turn_moved
        this.c=c;
        this.c_bool=bool_colour(c);
     
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}king.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

        this.times_moved=0
    }
    piece_moved(){
        this.times_moved++
    }
}

export class board{
    constructor(){
        this.turn_counter=0

        this.board=[];
        for(let i =0;i<8;i++){
            this.board.push([])
            for (let j=0;j<8;j++){
                var id=`${i}.${j}`
                var div=document.getElementById(id);
                var p='n'
      
                this.board[i].push([[i,j],p,div]);
                
            }
        }
    }
    setboard(){
        this.board.forEach(i => {
            i.forEach(j=>{ 
                //place wrook
                if (j[0].toString()==[0,0].toString() ||j[0].toString()==[7,0].toString() ){
                j[1]=new rook('w',j[0]);};
                //place wknight
                if (j[0].toString()==[1,0].toString() ||j[0].toString()==[6,0].toString() ){
                j[1]=new knight('w',j[0]);};
                //place wbishop
                if (j[0].toString()==[2,0].toString() ||j[0].toString()==[5,0].toString() ){
                    j[1]=new bishop('w',j[0]);};
                //place wking
                if (j[0].toString()==[3,0].toString()){
                    j[1]=new king('w',j[0]);};
                //place wqueen
                if (j[0].toString()==[4,0].toString()  ){
                    j[1]=new queen('w',j[0]);};
                //place wpawn
                if (j[0][1]==1 ){
                    j[1]=new pawn('w',j[0]);};

                    //place brook
                if (j[0].toString()==[0,7].toString() ||j[0].toString()==[7,7].toString() ){
                    j[1]=new rook('b',j[0]);};
                    //place bknight
                    if (j[0].toString()==[1,7].toString() ||j[0].toString()==[6,7].toString() ){
                    j[1]=new knight('b',j[0]);};
                    //place bbishop
                    if (j[0].toString()==[2,7].toString() ||j[0].toString()==[5,7].toString() ){
                        j[1]=new bishop('b',j[0]);};
                    //place bking
                    if (j[0].toString()==[3,7].toString()){
                        j[1]=new king('b',j[0]);};
                    //place bqueen
                    if (j[0].toString()==[4,7].toString()  ){
                        j[1]=new queen('b',j[0]);};
                    //place bpawn
                    if (j[0][1]==6 ){
                        j[1]=new pawn('b',j[0]);}; 
            });
            
        });
    }
}



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







