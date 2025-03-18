"use strict"

let calculator = document.getElementById("calculator");
let expression_box = document.getElementById("expression");
let result_box = document.getElementById("result");
let expression = "";

calculator.onclick = function(event){
    let btn = event.target;
   
    if(btn.tagName !== "BUTTON") return;
    

    let clicked_value = btn.textContent;

    if(["+", "-", "/", "*"].includes(clicked_value)){
            if(["+", "-", "/", "*"].includes((expression.trim()).slice(-1))) return;
            clicked_value = " " + clicked_value + " ";
        }
    
    if(clicked_value === "="){
        if(expression.trim() == "") return;
        try{
            let result = eval(expression)
            result_box.textContent = result;
            expression_box.textContent = expression + " ="
            expression = String(result);
        }
        catch(error){
            result_box.textContent = "error";
            expression_box.textContent = expression + " ="
            expression = "";
        }
    }

    else if(clicked_value === "AC"){
        result_box.textContent = "0";
        expression_box.textContent = "ANS = "
        expression = "";
        return;
    }

    else if(clicked_value === "DEL"){
        expression = expression.trim();
        expression = expression.slice(0, -1)
        result_box.textContent = expression || "0";
    }

    else{
        expression = expression + clicked_value;
        result_box.textContent = expression;
    } 
}