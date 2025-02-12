let grid = [['-','-','-'],['-','-','-'],['-','-','-']]
let xStamp = 'x'
let oStamp = 'o'
let winner = false;
let player1Turn = false;
let player2Turn = false;

function printGrid(grid)
{
    console.log(grid[0][0] + " " + grid[0][1] + " " + grid[0][2]);
    console.log(grid[1][0] + " " + grid[1][1] + " " + grid[1][2]);
    console.log(grid[2][0] + " " + grid[2][1] + " " + grid[2][2]);
}
function checkDiagonalsLeft(grid)
{
    if(grid[0][0] == grid[1][1] == grid[2][2] && grid[0][0] != '-')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkDiagonalsRight(grid)
{
    if(grid[2][0] == grid[1][1] == grid[0][2] && grid[2][0] != '-')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkRows(grid)
{
    if(grid[0][0] == grid[1][0] == grid[2][0] && grid[0][0] != '-' || grid[0][1] == grid[1][1] == grid[2][1] && grid[0][1] != '-' || grid[0][2] == grid[1][2] == grid[2][2] && grid[0][2] != '-')
    {
        return true;
    }
    else
    {
        return false;
    }
    
}

function checkColumns()
{
    if(grid[0][0] == grid[0][1] == grid[0][2] && grid[0][0] != '-'|| grid[1][0] == grid[1][1] == grid[1][2] && grid[1][0] != '-'|| grid[2][0] == grid[2][1] == grid[2][2] && grid[2][0] != '-')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function play(grid, player1Turn, player2Turn)
{
    if(player1Turn == true || player2Turn == true)
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
        if(player1Turn == true)
        {
            if(grid[userInputX][userInputY] == '-')
            {
                grid[userInputX][userInputY] = xStamp;
                printGrid(grid);
                checkColumns(grid);
                checkDiagonalsLeft(grid);
                checkDiagonalsRight(grid);
                checkRows(grid);
                player1Turn = false;
                player2Turn = true;
                play(grid, player1Turn, player2Turn);
            }
            play(grid, player1Turn, player2Turn);
        }
        if(player2Turn == true)
        {
            if(grid[userInputX][userInputY] == '-')
            {
                grid[userInputX][userInputY] = oStamp;
                printGrid(grid);
                checkColumns(grid);
                checkDiagonalsLeft(grid);
                checkDiagonalsRight(grid);
                checkRows(grid);
                player2Turn = false;
                player1Turn = true;
                play(grid, player1Turn, player2Turn);
            }
        }
    }


    
}



function gameLoop()
{
    player1Turn = true;
    while(winner == false)
    {
        play(grid, player1Turn, player2Turn)
    }
}

gameLoop()
