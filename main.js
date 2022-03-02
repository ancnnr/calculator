
//Set up primary variables
let values = [0, 0, ''];
let hasDecimal  = false;
let numDec = 0;

//create action listeners
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
    document.getElementById('add').addEventListener('click', function() {
        operatorPress('+');
    });
    document.getElementById('sub').addEventListener('click', function() {
        operatorPress('-');
    });
    document.getElementById('mult').addEventListener('click', function() {
        operatorPress('*');
    });
    document.getElementById('divide').addEventListener('click', function() {
        operatorPress('÷');
    });
    document.getElementById('equals').addEventListener('click', function() {
        equalPress();
    });
    document.getElementById('decimal').addEventListener('click', function() {
        decimalPress();
    });
    document.addEventListener('keypress', function(e) {
        keyPress(e.keyCode);
    })
    document.addEventListener('keydown', function(e) {
        if(e.keyCode==27 || e.keyCode==46)
        {
            clearScreen();
        }
        if(e.keyCode==8)
        {
            delChar();
        }
    });
}

//deal with keypresses by translating keycode into numerical value
function keyPress(x)
{
    if(x>=48 && x<=57)
    {
        numberPress(x-48);
    }
    else if(x==43)
    {
        operatorPress('+');
    }
    else if(x==45)
    {
        operatorPress('-');
    }
    else if(x==42)
    {
        operatorPress('*');
    }
    else if(x==47)
    {
        operatorPress('÷');
    }
    else if(x==13)
    {
        equalPress();
    }
    else if(x==46)
    {
        decimalPress();
    }
}

//clears the screen and resets all necessary values
function clearScreen()
{
    document.getElementById('val-screen').textContent = 0;
    values[0] = 0;    
    document.getElementById('calculation').textContent = ' ';
    values[2] = '';
    hasDecimal = false;
    numDec = 0;
}

//delete right most character from screen (if it's last decimal value also remove decimal symbol)
function delChar() 
{
    let curVal = values[0];
    if(hasDecimal)
    {
        if(numDec>1)
        {
            curVal = parseInt((curVal*(10**(numDec-1))))/(10.0**(numDec-1));
            numDec--;
        }
        else
        {
            curVal = parseInt(curVal);
            numDec--;
            hasDecimal = false;
            document.getElementById('val-screen').textContent = 
            document.getElementById('val-screen').textContent.slice(0,-1);
        }
    }
    else if(curVal>=10)
    {
        curVal = parseInt(curVal/10);
    }
    else
    {
        curVal = 0;
    }

    document.getElementById('val-screen').textContent = curVal;
    values[0] = curVal;
}

//place number on the screen and increment current values
function numberPress(x)
{
    let curVal = values[0];
    if(!hasDecimal)
    {
        curVal = curVal*10 + parseInt(x);
        document.getElementById('val-screen').textContent = curVal;
        values[0]=curVal;
    }
    else
    {
        curVal = curVal*(10**(numDec+1));
        curVal = Math.round(curVal + parseInt(x));
        curVal = curVal/(10.0**(numDec+1));

        numDec++;
        document.getElementById('val-screen').textContent = curVal;
        values[0]=curVal;
    }

}

//deal with operator press if it's first or chained operator
function operatorPress(x) 
{
    if(values[2]=='')
    {
        values[1] = values[0];
        values[2] = x;
        values[0] = 0;
        hasDecimal = false
        numDec = 0;
    }

    else {
        const res = getResult();
        values[1] = res;
        values[2] = x;
        values[0] = 0;
        hasDecimal = false
        numDec = 0;
        document.getElementById('val-screen').textContent = res;
    }
    
    document.getElementById('calculation').textContent= values[1] + ' ' + values[2] + ' ';

}

//deal with decimal press by toggling necessary values and adding the "." to the screen.
function decimalPress()
{
    if(!hasDecimal)
    {
        if(values[0]>0)
        {
            curVal = values[0].toFixed(numDec);
            values[0] = curVal;
            document.getElementById('val-screen').textContent += ".";
            hasDecimal = true;
        }

        else {
            hasDecimal = true;
            document.getElementById('val-screen').textContent += ".";
        }
    }

    else
    {

    }
}

//does the actual calculation of values and limits to screen size of 10 decimal values.
function getResult()
{
    let result;

    if(values[2]=='+')
    {
        result = values[1]+values[0];
    }
    else if(values[2]=='-')
    {
        result = values[1]-values[0]
    }
    else if(values[2]=='*')
    {
        result = values[1]*values[0];
    }
    else if(values[2]=='÷')
    {   
        if(values[0]===0)
        {
            result = 'ERR'
        }
        else {
            result = values[1]/values[0];
        }
    }
    return parseFloat(result.toFixed(10));
}

//deal with the press of equals by finalizing a calculation.
function equalPress()
{
    let result = getResult();

    const upper = document.getElementById('calculation').textContent;
    document.getElementById('calculation').textContent = upper + values[0] + ' = ';
    document.getElementById('val-screen').textContent = result;    
}