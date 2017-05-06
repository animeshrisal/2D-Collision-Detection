var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
            
var W = 640;
var H = 480;
var counter = 0;
    
canvas.height = H;
canvas.width = W;

var ballArray = [];

var ball = {}, gravity = 0.2;

var option = 0;

ball = {
    x: W/2,
    y: 50,
    
    radius: 15,
    color: "red",
    
    vx : 1,
    vy : 1,
    
    draw: function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
};

function clearCanvas(){
    ctx.clearRect(0, 0, W, H);
}

function detect(){
    option = 0;
}

function handling(){
    option = 1;
}

function update(){
    if(counter == 400){
        
        ballArray.push(Object.assign({}, ball));
        counter = 0;
    }
    
    counter++;
    clearCanvas();
    
    ballArray.forEach(function(stuff, stuffIndex){
      
        stuff.draw();  
        stuff.y += stuff.vy;
        stuff.x += stuff.vx;

        //collision against walls

        if(stuff.y + stuff.radius > H -1){
            stuff.vy = -1;
        }
        else if(stuff.y + stuff.radius < 30){
            stuff.vy = 1;
        }
        else if(stuff.x + stuff.radius > W - 1){
            stuff.vx = -1;
        }
        else if(stuff.x + stuff.radius < 30){
            stuff.vx = 1;
        }

        // collision against other balls
        

        ballArray.forEach(function(otherStuff, otherStuffIndex){
            if (stuffIndex == otherStuffIndex){
                //do nothing
            }else{
                dx = otherStuff.x - stuff.x;
                dy = otherStuff.y - stuff.y;   
                var distance = Math.sqrt(dx * dx + dy * dy);
                if(distance <= stuff.radius + otherStuff.radius){
                    if(option == 0){
                        stuff.color = "yellow";
                        otherStuff.color = "yellow";
                        
                    }
                    else if(option == 1){
                        var collision_angle = Math.atan2(dy, dx);
                        stuff.vx -= Math.cos(collision_angle);
                        stuff.vy -= Math.sin(collision_angle);
                        otherStuff.vx += Math.cos(collision_angle);
                        otherStuff.vy += Math.sin(collision_angle);
                    }
                }else{
                    stuff.color = "red";
                }
            }  
        }); 
    });
}



setInterval(update, 0.1);