"use strict"

const   ACCORDIANS = document.querySelectorAll(".accordian");

for(let elem of ACCORDIANS){
    let icon = elem.querySelector(".icon");
    let answer = elem.querySelector(".answer");
    
    elem.addEventListener("click", function(){
        console.log("clicked");
        icon.classList.toggle("active");
        answer.classList.toggle("active");
    });
}