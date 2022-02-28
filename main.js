function loadFunction()
{
    document.getElementById('9').addEventListener('click', function() {
        numberPress(9);
    });
    document.getElementById('8').addEventListener('click', function() {
        numberPress(8);
    });
    document.getElementById('7').addEventListener('click', function() {
        numberPress(7);
    });
    document.getElementById('6').addEventListener('click', function() {
        numberPress(6);
    });
    document.getElementById('5').addEventListener('click', function() {
        numberPress(5);
    });
    document.getElementById('4').addEventListener('click', function() {
        numberPress(4);
    });
    document.getElementById('3').addEventListener('click', function() {
        numberPress(3);
    });
    document.getElementById('2').addEventListener('click', function() {
        numberPress(2);
    });
    document.getElementById('1').addEventListener('click', function() {
        numberPress(1);
    });
    document.getElementById('0').addEventListener('click', function() {
        numberPress(0);
    });
}


function clearScreen()
{
    //clears the screen
    document.getElementById('screen').textContent = 0;
}

function delChar() {
    //delete right most character from screen
    let curVal = parseInt(document.getElementById('screen').textContent);
    if(curVal>=10)
    {
        curVal = parseInt(curVal/10);
    }
    else
    {
        curVal = 0;
    }
    
    document.getElementById('screen').textContent = curVal;
}

function numberPress(x)
{
    //place number on the screen and increment current values
    console.log(x);
    let curVal = parseInt(document.getElementById('screen').textContent);
    curVal = curVal*10 + parseInt(x);
    document.getElementById('screen').textContent = curVal;
}

function operatorPress() 
{
    //used for each operator press
}

function decimalPress()
{
    //used for decimal press
}

function equalPress()
{
    //used for when the equal sign is pressed
}