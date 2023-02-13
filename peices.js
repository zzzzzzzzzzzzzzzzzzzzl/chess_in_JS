
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

console.log('test peices.js');

export class pawn{
    constructor(c,s){
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
        this.times_moved=0

        
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}pawn.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);
        sprite.id='piece';

    }
    piece_moved(){
        this.times_moved++
    }
    get_valid_squares(selected,board){
        // ok for pawn kind of tricky we need to check square in front#only while the square is empty
        //and the two adjasent squares of that square.#though only while taking
        //if the pawn has not moved +2 forward is a valid move
        // if an oposing pawn has moved forward 2 squares last turn 
        //then the square behind that is valid and will take that piece.
        
        if (selected[1].c_bool){var valid=this.search_white(selected,board)}
        else{var valid=this.search_black(piece,board)}
        return valid
    }

    search_white(selected,board){
        const pos=selected[0]
        board=board.board
        var pawn_double=[[0,2]]
        var check=[[0,1]]
        var take=[[-1,1],[1,1],[-1,2],[1,2]]
        var valid=[]
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
                if (board[x[0]][x[1]][1].c_bool==false){
                    valid.push(board[x[0]][x[1]])
                }
            }
            catch{}   
        })
        pawn_double.map(i=>{
            try{
                var x=[i[0]+pos[0],i[1]+pos[1]]
                if (board[x[0]][x[1]][1]=='n' && this.times_moved==0){
                    valid.push(board[x[0]][x[1]])
                }
            }
            catch{}    
        })
        return valid
    }
    highlight(arr){
        for(let i in arr){
            
            const pos =arr[i][0]
            console.log(  document.getElementById(`${pos[0]}.${pos[1]}`))
            document.getElementById(`${pos[0]}.${pos[1]}`).style.backgroundColor='red'
        }

    }
    
    search_black(piece,board){
        var valid=[]
        return valid

    }
}

export class rook{
    constructor(c,s){
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}rook.png`;
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

export class bishop{
    constructor(c,s){
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
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
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
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
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
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
        this.c=c;
        this.c_bool=bool_colour(c);
        this.s=s;
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
        this.board=[];
        for(let i =0;i<8;i++){
            this.board.push([])
            for (let j=0;j<8;j++){
                var id=`${i}.${j}`
                var div=document.getElementById(id);
                var p='n'
      
                this.board[i].push([[i,j],p,div]);// i and j are x and y respectivley. p is piece class. div is the square it represents.
                
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






