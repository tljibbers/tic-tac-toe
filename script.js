let grid = [['-','-','-'],['-','-','-'],['-','-','-']]
let xStamp = 'x'
let oStamp = 'o'
let winner = false;
let player1Turn = true;
let player2Turn = false;
let xButtonPressed = false;
let oButtonPressed = true;

let domGrid = []

const player1Name = document.getElementById('fname');
const player2Name = document.getElementById('sname');
const submitForm = document.getElementById('form');
const inputContainer = document.querySelector(".InputContainer");
const stampContainer = document.querySelector(".StampContainer");
const xBox = document.querySelector(".XBox");
const oBox = document.querySelector(".OBox");
const ticTacToeContainer = document.querySelector(".ticTacToeGrid");

const player1 = createPlayer(player1Name.value, true, 0, null)
const player2 = createPlayer(player2Name.value, false, 0, null)

function createPlayer(name, playerTurn, playerScore, playerMarkChoice) {
    return {name, playerTurn, playerScore, playerMarkChoice}
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

function switchPlayer(player1, player2)
{
    if(player1.playerTurn == true)
    {
        player1.playerTurn = false;
        player2.playerTurn = true;
    }
    else
    {
        player1.playerTurn = true;
        player2.playerTurn = false;
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

function createXOrOImage(player)
{
    if(player.playerMarkChoice == 'x')
    {
        const xImg = document.createElement('img');
        xImg.src = "images/x-symbol-svgrepo-com.svg";
        xImg.id = 'xStampImage';
        xImg.style.width = '100px';
        xImg.style.height = '100px';
        return xImg
    }
    else if(player.playerMarkChoice == 'o')
    {
        const oImg = document.createElement('img');
        oImg.src = "images/checkbox-blank-circle-outline.svg";
        oImg.id = 'oStampImage';
        oImg.style.width = '100px';
        oImg.style.height = '100px';
        return oImg
    }
    return null;
}


function createDomGrid(player1, player2)
{
    for(let i = 0; i <= 2; i++)
    {
        for(let j = 0; j <= 2; j++)
        {
            const blankButton = document.createElement('button');
            blankButton.style.borderStyle = 'solid';
            blankButton.style.backgroundColor = 'white';
            blankButton.className = 'ticTacToeButton';
            ticTacToeContainer.appendChild(blankButton);
            domGrid.push({storeBlankButton: blankButton, blankButtonMark: '-', alreadyChecked : false});

            blankButton.addEventListener('click', function(){
                const getIndex = domGrid.findIndex(i => i.storeBlankButton === blankButton)                
                if(player1.playerTurn == true)
                {
                    const imgTest = createXOrOImage(player1);
                    blankButton.appendChild(imgTest);
                    domGrid[getIndex].alreadyChecked = true;
                    const getX = document.getElementById('StampImageHover')
                    while(getX.parentNode)
                    {
                        getX.parentNode.removeChild(getX);
                    }    
                }
            })

            blankButton.addEventListener('mouseover', function(){
                const getIndex = domGrid.findIndex(i => i.storeBlankButton === blankButton) 
                blankButton.style.cursor = 'pointer'
                blankButton.style.backgroundColor = '#fafafa'
                if(player1.playerTurn == true && domGrid[getIndex].alreadyChecked == false)
                {
                    
                    const imgTest = createXOrOImage(player1);
                    imgTest.id = 'StampImageHover'
                    imgTest.style.opacity = '0.5'
                    blankButton.appendChild(imgTest);
                }
            });

            blankButton.addEventListener('mouseout', function(){
                blankButton.style.backgroundColor = 'white';
                const getIndex = domGrid.findIndex(i => i.storeBlankButton === blankButton) 
                if(player1.playerTurn == true && domGrid[getIndex].alreadyChecked == false)
                {
                    const getX = document.getElementById('StampImageHover')
                    while(getX.parentNode)
                    {
                        getX.parentNode.removeChild(getX);
                    }
                }
            })
        }
    }
    console.log(domGrid[0])
    
}

function hideSubmitForm()
{
    inputContainer.style.visibility = 'hidden'
    stampContainer.style.visibility = 'visible'
    document.querySelector(".XBox").style.animation = "xMove 1s ease forwards"
    document.querySelector(".XBox").style.animationDelay = "1s"
    document.querySelector(".OBox").style.animation = "oMove 1s ease forwards"
    document.querySelector(".OBox").style.animationDelay = "1s"
    document.getElementById('chooseStampText').style.animation = "textMove 1s ease-out forwards"

}

function setUpGameDOMXChoice() {
    document.getElementById('chooseStampText').style.animation = "textMovePostSelection 1s ease-out forwards"
    document.getElementById('xImage').style.animation = 'imageDisappear 1s ease-out forwards'
    document.getElementById('oImage').style.animation = 'imageDisappear 1s ease-out forwards'
    if(xButtonPressed == true)
    {
        document.getElementById('oImage').style.animationDelay = "0.5s"
    }
    else if(oButtonPressed == true)
    {
        document.getElementById('xImage').style.animationDelay = "0.5s"
    }
    document.querySelector('.StampContainer').style.animation = 'imageDisappear 1s ease-out forwards'
    document.querySelector('.StampContainer').style.animationDelay = "1s"
    ticTacToeContainer.style.visibility = 'visible';
    
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

    e.preventDefault()
    hideSubmitForm()
    
})

xBox.addEventListener("click", function(){
    xButtonPressed = true;
    setUpGameDOMXChoice();
    player1.playerMarkChoice = 'x';
    player2.playerMarkChoice = 'o';
    createDomGrid(player1, player2);
})

oBox.addEventListener("click", function(){
    oButtonPressed = true;
    player1.playerMarkChoice = 'o';
    player2.playerMarkChoice = 'x';
    setUpGameDOMXChoice();
    createDomGrid(player1, player2);
})




