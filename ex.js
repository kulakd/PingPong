const table=document.getElementById('table');
const ctx=table.getContext('2d');
const width=table.width;
const height=table.height;
const start=document.getElementById("start");
//score,Velocity of ball and rocket
let score1=0;
let score2=0;
let racket_speed=4;
let ball_speed=2.5;
//Start of the match
start.addEventListener("click", (e) => 
        { 
			update(); 
		}) 
//First Player
const player1 = {x:0, y:table.height / 2, width: 30, height: 80}; 
player1.draw = function()
{
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
};
//Second Player
const player2 = {x: table.width-30, y: table.height / 2, width: 30, height: 80}; 
player2.draw = function()
{
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
};
//Ball
const ball= {x: table.width / 2, y: table.height / 2, vx: ball_speed, vy: ball_speed};
ball.draw = function()
{
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
}
//Key mapping
const input = {arwup: false, arwdwn: false, w: false, s:false};
document.addEventListener('keydown', function(e)
    {
        e.preventDefault();
        if (e.code == "ArrowUp")
           {
                input.arwup = true;
            }
        else if (e.code == "ArrowDown") 
            {
               input.arwdwn = true;
           }
        else if (e.code == "KeyW")
           {
               input.w = true;
           }
        else if (e.code == "KeyS")
            {
             input.s = true;
            }
    })
document.addEventListener('keyup', function(e)
    {
        e.preventDefault();
        if (e.code == "ArrowUp") input.arwup = false;
        else if (e.code == "ArrowDown") input.arwdwn = false;
        else if (e.code == "KeyW") input.w = false;
        else if (e.code == "KeyS") input.s = false;
    })
//winning
function WIN()
    {
        if (score1>score2) 
            {
                document.getElementById(score);
                score.innerHTML = "RED POTG";
            }
	    else if (score2>score1)
            {
                document.getElementById(score);
                score.innerHTML = "ORANGE POTG";
	        }
    }
function update()
{
    ctx.clearRect(0, 0, table.width, table.height);
    //ball movement
    if (ball.y+ball.vy>table.height||ball.y+ball.vy<0) 
        {
            ball.vy=-ball.vy;
        }
    if (ball.x==player1.x+30 && ball.y+ball.vy >= player1.y && ball.y <= player1.y+player1.height)
        {
            ball.vx = -ball.vx;
        }
    if (ball.x==player2.x-10 && ball.y+ball.vy >=player2.y && ball.y <= player2.y+player2.height)
        {
            ball.vx = -ball.vx;
        }
    //adding score 
    if (ball.x==0) 
        {
            score2++;
            //ball reset
            ball.x=table.width / 2;
            ball.y=table.height / 2;
            ball.vx = -ball.vx; 
        }      
    if (ball.x==width)
        {
            score1++;
            ball.x=table.width / 2;
            ball.y=table.height / 2;
            ball.vx = -ball.vx;
        }
    document.getElementById(score);
    score.innerHTML="RR "+score1+ " - "+score2+" OR";
    if (score1==21 || score2==21)
        {
            WIN();
		    return;
        }
    //Velocity of rockets
    if (input.arwup==true && player2.y >= -30)
    {
        player2.y -= racket_speed;
    }
    if (input.arwdwn==true && player2.y <= table.height-30)
    {
        player2.y += racket_speed;
    }
    if (input.w==true && player1.y >= -30)
    {
        player1.y -= racket_speed;
    }
    if (input.s==true && player1.y <= table.height-30)
    {
        player1.y += racket_speed;
    }
    player1.draw();
    player2.draw();
    ball.x+=ball.vx;
    ball.y+=ball.vy;
    ball.draw();
    window.requestAnimationFrame(update);
}