
"use strict"

let counter = 0;
let result = document.getElementById("result");
let dec_bttn = document.getElementById("decrement_btt");
let reset_bttn = document.getElementById("reset_btt");
let inc_bttn = document.getElementById("increment_btt");

inc_bttn.addEventListener("click", (event)=>{
    result.textContent = ++counter;
    changeColor();
});

reset_bttn.addEventListener("click", (event)=>{
    counter =  0;
    result.textContent = counter;
    changeColor();
});

dec_bttn.addEventListener("click", (event)=>{
    result.textContent = --counter;
    changeColor();
});

function changeColor(){
    let color = "rgb(131, 131, 131)";
    if(counter != 0){
        color = counter > 0 ? "rgba(26, 219, 26, 0.781)" : "rgba(219, 26, 26, 0.781)";
    }
    result.style.color = color;
}