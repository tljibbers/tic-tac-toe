let grid = [['-','-','-'],['-','-','-'],['-','-','-']]
let xStamp = 'x'
let oStamp = 'o'
let winner = false;
let player1Turn = true;
let player2Turn = false;

const player1Name = document.getElementById('fname');
const player2Name = document.getElementById('sname');
const submitForm = document.querySelector('form');

function createPlayer(name, playerTurn, playerMarkChoice) {
    return {name, playerTurn, playerMarkChoice}
}


function printGrid(grid)
{
    console.log(grid[0][0] + " " + grid[0][1] + " " + grid[0][2]);
    console.log(grid[1][0] + " " + grid[1][1] + " " + grid[1][2]);
    console.log(grid[2][0] + " " + grid[2][1] + " " + grid[2][2]);
}
function checkDiagonalsLeft(grid)
{
    if(((grid[0][0] == grid[1][1]) && (grid[0][0]== grid[2][2])) && grid[0][0] != '-')
    {
        return true;
    }
}

function checkDiagonalsRight(grid)
{
    if(((grid[2][0] === grid[1][1]) && (grid[2][0] === grid[0][2])) && (grid[2][0] != '-'))
    {
         return true;
    }  
}

function checkRows(grid)
{
    if(((grid[0][0] == grid[1][0]) && (grid[0][0] == grid[2][0])) && grid[0][0] != '-')
    {
        return true;
    }
    else if(((grid[0][1] == grid[1][1]) && (grid[0][1]== grid[2][1])) && grid[0][1] != '-' )
    {
        return true;
    }
    else if(((grid[0][2] == grid[1][2]) && (grid[0][2]== grid[2][2])) && grid[0][2] != '-')
    {
        return true;
    }  
}

function checkColumns(grid)
{
    if(((grid[0][0] == grid[0][1]) && (grid[0][0] == grid[0][2])) && grid[0][0] != '-')
    {
        return true;
    }
    else if(((grid[1][0] == grid[1][1]) && (grid[1][0] == grid[1][2])) && grid[1][0] != '-')
    {
        return true;
    }
    else if(((grid[2][0] == grid[2][1]) && (grid[2][0] == grid[2][2])) && grid[2][0] != '-')
    {
        return true;
    }
    
}

function chooseNumber(grid, player1Turn, player2Turn)
{
    let userInputX = prompt("Please enter a value between 0 and 2");
    if(userInputX > 2)
    {
        console.log("Number can't be higher than 2")
        userInputX = prompt("Please enter a value between 0 and 2");
    }
    let userInputY = prompt("Please enter a value between 0 and 2");
    if(userInputY > 2)
    {
        console.log("Number can't be higher than 2")
        userInputY = prompt("Please enter a value between 0 and 2");
    }

    if(player1Turn == true && grid[userInputX][userInputY] == '-')
    {
        grid[userInputX][userInputY] = xStamp;
        printGrid(grid);
    }
    else if(player2Turn == true && grid[userInputX][userInputY] == '-')
    {
        grid[userInputX][userInputY] = oStamp;
        printGrid(grid);
    }
    else
    {
        alert("Can't fill in a spot that has already been filled")
        chooseNumber(grid, player1Turn, player2Turn);
    }

}

function switchPlayer()
{
    if(player1Turn == true)
    {
        player1Turn = false;
        player2Turn = true;
    }
    else
    {
        player1Turn = true;
        player2Turn = false;
    }
}

function checkWinner()
{
    if(checkColumns(grid) || checkDiagonalsLeft(grid) || checkDiagonalsRight(grid) || checkRows(grid))
    {
        winner = true;
    }
}

function checkTie()
{
    if(!grid.includes('-'))
    {
        console.log('Tie Game')
    }
}



function gameLoop()
{
    while(winner != true)
    {
        chooseNumber(grid, player1Turn, player2Turn)
        checkWinner()
        checkTie()
        switchPlayer()
    }
    console.log('game won!')
}

function displayName()
{
    console.log(player1Name.value)
}

submitForm.addEventListener('submit', e=>{
    if(player1Name == '' || player1Name == null)
    {
        e.preventDefault()
    }
    if(player2Name == '' || player2Name == null)
    {
        e.preventDefault()
    }

    displayName()
})

player1 = createPlayer('Test', player1Turn, 'false')
player2 = createPlayer('Test', player2Turn, 'true')

