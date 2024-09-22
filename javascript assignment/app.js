let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function() {
    if(started==false){

        console.log("game started");
        started = true;

        levelup();
    }
});

function gameflash(btn) {
    console.log("button flashed");
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

// function userflash(btn) {
//     btn.classList.add("userflash");
//     setTimeout(function () {
//         btn.classList.remove("userflash");
//     }, 250);
// }

function levelup() {
    userseq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random()*4);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    // console.log(gameseq);
    setTimeout(() => {
        gameflash(randbtn)
    }, 150);
}

function checkans(idx) {
    // console.log("curr level : ",level);
    
    if(userseq[idx]==gameseq[idx]) {
        if(userseq.length == gameseq.length) {
            setTimeout(levelup,1000);
        }
    } else {
        h2.innerHTML = `Game over!Your score was <b> ${level} </b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnpress() {
  let btn = this;
  gameflash(btn);
  usercolor=btn.getAttribute("id");
  userseq.push(usercolor);
  console.log(userseq);
  checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}