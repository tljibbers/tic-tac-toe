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
const nameHolder = document.querySelector('.NameHolder');
const oContainer = document.querySelector('.oContainer');
const xContainer = document.querySelector('.xContainer');
const p1DisplayNameHolder = document.createElement('div');
const p2DisplayNameHolder = document.createElement('div');
const resetContainer = document.querySelector('.resetGame');
const resetButton = document.querySelector('.ResetButton');

const player1 = createPlayer(player1Name.value, true, 0, null)
const player2 = createPlayer(player2Name.value, false, 0, null)



function createPlayer(name, playerTurn, playerScore, playerMarkChoice) {
    return {name, playerTurn, playerScore, playerMarkChoice}
}

function checkDiagonalsLeft(grid)
{
    if(((grid[0].blankButtonMark == grid[4].blankButtonMark) && (grid[0].blankButtonMark== grid[8].blankButtonMark)) && (grid[0].blankButtonMark != '-'))
    {
        return true;
    }
}

function checkDiagonalsRight(grid)
{
    if(((grid[6].blankButtonMark == grid[4].blankButtonMark) && (grid[6].blankButtonMark == grid[2].blankButtonMark)) && (grid[6].blankButtonMark != '-'))
    {
         return true;
    }  
}

function checkRows(grid)
{
    if(((grid[0].blankButtonMark == grid[3].blankButtonMark) && (grid[0].blankButtonMark == grid[6].blankButtonMark)) && grid[0].blankButtonMark != '-')
    {
        return true;
    }
    else if(((grid[1].blankButtonMark == grid[4].blankButtonMark) && (grid[1].blankButtonMark == grid[7].blankButtonMark)) && grid[1].blankButtonMark != '-' )
    {
        return true;
    }
    else if(((grid[2].blankButtonMark == grid[5].blankButtonMark) && (grid[2].blankButtonMark == grid[8].blankButtonMark)) && grid[2].blankButtonMark != '-')
    {
        return true;
    }  
}

function checkColumns(grid)
{
    if(((grid[0].blankButtonMark == grid[1].blankButtonMark) && (grid[0].blankButtonMark == grid[2].blankButtonMark)) && grid[0].blankButtonMark != '-')
    {
        return true;
    }
    else if(((grid[3].blankButtonMark == grid[4].blankButtonMark) && (grid[3].blankButtonMark == grid[5].blankButtonMark)) && grid[3].blankButtonMark != '-')
    {
        return true;
    }
    else if(((grid[6].blankButtonMark == grid[7].blankButtonMark) && (grid[6].blankButtonMark == grid[8].blankButtonMark)) && grid[6].blankButtonMark != '-')
    {
        return true;
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

function checkWinner(grid)
{
    if(checkColumns(grid) || checkDiagonalsLeft(grid) || checkDiagonalsRight(grid) || checkRows(grid))
    {
        alert('winner')
        winner = true;
        console.log(player1.playerTurn)
        console.log(player2.playerTurn)
        postWin()
    }
}

function checkTie(grid)
{
    const checkTieHelper = grid.some(obj => obj.blankButtonMark === '-');
    console.log(checkTieHelper);
    if(checkTieHelper == false && winner == false)
    {
        alert('tie');
    }
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

function nameStyling(position1, position2)
{
    position1.style.position = 'absolute'
    position1.style.left = '200px'
    position1.style.bottom = '140px'
    position1.style.fontFamily = 'Rubik'
    position1.style.fontSize = '20px'
    
    position2.style.position = 'absolute'
    position2.style.right = '200px'
    position2.style.fontFamily = 'Rubik'
    position2.style.fontSize = '20px'
    position2.style.bottom = '140px'
}

function createDisplayNamesDOM()
{
    nameHolder.style.visibility = 'visible'
    const player1DisplayName = document.createTextNode('Player 1:' + " " + player1Name.value);
    const player2DisplayName = document.createTextNode('Player 2:' + " " + player2Name.value);
    p1DisplayNameHolder.appendChild(player1DisplayName);
    p2DisplayNameHolder.appendChild(player2DisplayName);
    nameHolder.style.animation = 'textMove 1s ease-in forwards'


    if(xButtonPressed == true)
    {
        nameStyling(p1DisplayNameHolder, p2DisplayNameHolder)
        document.querySelector('.xBoxContainerName').appendChild(p1DisplayNameHolder)
        document.querySelector('.oBoxContainerName').appendChild(p2DisplayNameHolder)
    }
    else if(oButtonPressed == true)
    {
        nameStyling(p2DisplayNameHolder, p1DisplayNameHolder)
        document.querySelector('.oBoxContainerName').appendChild(p1DisplayNameHolder)
        document.querySelector('.xBoxContainerName').appendChild(p2DisplayNameHolder)
    }

}


function createDomGrid(player1, player2)
{
   createDisplayNamesDOM()

    for(let i = 0; i <= 2; i++)
    {
        for(let j = 0; j <= 2; j++)
        {
            const blankButton = document.createElement('button');
            blankButton.style.borderStyle = 'solid';
            blankButton.style.backgroundColor = 'white';
            blankButton.className = 'ticTacToeButton';
            ticTacToeContainer.appendChild(blankButton);
            ticTacToeContainer.style.animation = 'textMove 2s ease-in forwards'
            domGrid.push({storeBlankButton: blankButton, blankButtonMark: '-', alreadyChecked : false});

            blankButton.addEventListener('click', function(){
                const getIndex = domGrid.findIndex(i => i.storeBlankButton === blankButton)                
                if(player1.playerTurn == true)
                {
                    const imgTest = createXOrOImage(player1);
                    blankButton.appendChild(imgTest);
                    domGrid[getIndex].alreadyChecked = true;
                    domGrid[getIndex].blankButtonMark = player1.playerMarkChoice;
                    console.log(domGrid[getIndex].blankButtonMark);
                    const getStampIndex = document.getElementById('StampImageHover')
                    while(getStampIndex.parentNode)
                    {
                        getStampIndex.parentNode.removeChild(getStampIndex);
                    }
                    checkWinner(domGrid)
                    checkTie(domGrid)
                    switchPlayer(player1, player2)   
                }
                else if(player2.playerTurn == true)
                {
                    const imgTest = createXOrOImage(player2);
                    blankButton.appendChild(imgTest);
                    domGrid[getIndex].alreadyChecked = true;
                    domGrid[getIndex].blankButtonMark = player2.playerMarkChoice;
                    const getStampIndex = document.getElementById('StampImageHover')
                    while(getStampIndex.parentNode)
                    {
                        getStampIndex.parentNode.removeChild(getStampIndex);
                    }
                    checkWinner(domGrid)
                    checkTie(domGrid)
                    switchPlayer(player1, player2)
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
                if(player2.playerTurn == true && domGrid[getIndex].alreadyChecked == false)
                {
                    const imgTest = createXOrOImage(player2);
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
                if(player2.playerTurn == true && domGrid[getIndex].alreadyChecked == false)
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
    
}

function postWin()
{
    document.querySelector('.resetGame').style.visibility = 'visible'
    document.querySelector('.resetGame').style.animation = 'resetGamePopUp 1s ease-out forwards'
    if(player1.playerTurn == true)
    {
        const p1WinContainer = document.createElement('div')
        const p1Win = document.createTextNode(player1Name.value + " " + 'Wins!')
        p1WinContainer.style.fontFamily = 'Rubik'
        p1WinContainer.style.fontSize = '50px'
        p1WinContainer.appendChild(p1Win)
        resetContainer.appendChild(p1WinContainer)
    }
    if(player2.playerTurn == true)
    {
        const p2WinContainer = document.createElement('div')
        const p2Win = document.createTextNode(player2Name.value + " " + 'Wins!')
        p2WinContainer.style.fontFamily = 'Rubik'
        p2WinContainer.style.fontSize = '50px'
        p2WinContainer.appendChild(p2Win)
        resetContainer.appendChild(p2WinContainer)
    }
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
    document.querySelector('.StampContainer').style.animationDelay = "0.5s"
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

resetButton.addEventListener("click", function(){
    location.reload();
})




