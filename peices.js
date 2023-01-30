




export class pawn{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}pawn.png`;
        var sprite= document.createElement('img');
        
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

    }
}

export class rook{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}rook.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';

    }
}

export class bishop{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}bishop.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';
    }
}

export class knight{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}knight.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';
    }
}

export class queen{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}queen.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';
    }
}

export class king{
    constructor(c,s){
        this.c=c;
        this.s=s;
        var id=`${s[0]}.${s[1]}`;
        this.div=document.getElementById(id);
        var spriteurl=`./sprite/${this.c}king.png`;
        var sprite= document.createElement('img');
        sprite.src=spriteurl;
        this.div.appendChild(sprite);

        sprite.id='piece';
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






