let c, t, answer;
let cTime = 7;
let timer_is_on = 0, scored = 0;
let maxNum = 12;
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let no1 = document.getElementById('no1');
let no2 = document.getElementById('no2');
let age = document.getElementById('age');
let timer = document.getElementById("txt")
let name = document.getElementById('name')
let game = document.getElementById('game');
let wBox = document.getElementById('wBox');
let score = document.getElementById('score');
let start = document.getElementById('start');
let corrext = document.getElementById('answer');
let kid = document.getElementById('easyButton');
let old = document.getElementById('hardButton');
let resetButton = document.getElementById('reset');
let ageLabel = document.getElementById('age-label');
let gameOver = document.getElementById('game-over');
let myTableDiv = document.getElementById("table-div");
let reset = [
    { player: 'TOM', value: 11 },
    { player: 'IS', value: 10 },
    { player: 'THE', value: 9 },
    { player: 'BEST', value: 8 },
    { player: 'harrison', value: 7 },
    { player: 'Jennifer', value: 6 },
    { player: 'harrison', value: 5 },
    { player: 'darcy', value: 4 },
    { player: 'harrison', value: 3 },
    { player: 'tom', value: 1 }
];
score.innerHTML = "Score: 0"
document.onload = kid.className += " onnit"
//------------------------------------------------functions------------------------------------------------//

kid.onclick = function kiddo() {
    ageLabel.style.display = "block"
    age.style.display = "inline-block";
    kid.className += " onnit"
    old.className -= " onnit"
}

old.onclick = () => {
    ageLabel.style.display = "none"
    age.style.display = "none"
    kid.className -= " onnit";
    old.className += " onnit"
}

function clearLocalStorage() {
    localStorage.removeItem("items")
    itemsArray = reset;
    localStorage.setItem('items', JSON.stringify(reset))
}

function mySort() {
    // sort by value
    itemsArray.sort(function (a, b) {
        return a.value - b.value;
    });
    itemsArray.reverse()
}

function timedCount() {
    if (c == -1) {
        stopCount();
        alert("Time's Up!");
    } else {
        timer.innerHTML = "Time Left: " + c;
        c = c - 1;
        t = setTimeout(timedCount, 1000);
    }
}

function startCount() {
    maxNum = (age.value) || 12;
    if (maxNum > 12) { maxNum = 12 };

    if (!name.value) {
        name.style.backgroundColor = "yellow";
        name.focus();
    } else if (name.value == "clear" && age.value == 1337) {
        clearLocalStorage();
    } else {
        //reset counter
        c = cTime;
        //start game
        startGame();
        if (!timer_is_on) {
            timer_is_on = 1;
            timedCount();
        }
    }
}

function _reset() {
    start.style.display = "block"
    game.style.display = "none";
    resetButton.style.display = "none";
    gameOver.style.display = "none";
    stopCount();
    myTableDiv.innerHTML = ""
}

function startGame() {
    /* console.log(maxNum) */
    start.style.display = "none"
    game.style.display = "block";
    timer.style.display = "inline-block";
    resetButton.style.display = "inline-block";
    resetButton.innerHTML = "Stop Game!"
    gameOver.style.display = "none";
    let myTableDiv = document.getElementById("table-div")
    myTableDiv.innerHTML = ""
    scored = 0;
    score.innerHTML = "Score: " + scored;
    myRand();
}

function myRand() {
    no1.innerHTML = Math.floor(Math.random() * maxNum);
    no2.innerHTML = Math.floor(Math.random() * maxNum);
    if (no1.innerHTML == 0) { no1.innerHTML = 1 };
    answer = Number(no1.innerHTML) + Number(no2.innerHTML);
    no1.style.backgroundColor = "#40407c";
    no2.style.backgroundColor = "#40407c";
    corrext.value = "";
    corrext.focus();
}

//if they hit 'enter' instead
function handle(e) {
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that runs
        myEnter();
    }
}

function myEnter() {
    if (corrext.value == answer) {
        try {
            myRand();
            scored++;
            score.innerHTML = "Score: " + scored;

        }
        catch (err) { console.log(err) }
    } else {
        no1.style.backgroundColor = "red";
        no2.style.backgroundColor = "red";
        corrext.value = "";
        corrext.focus();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    resetButton.innerHTML = "Restart Game"
    game.style.display = "none";
    let topScore = itemsArray[0].value;
    if (itemsArray.length < 9 || scored > itemsArray[itemsArray.length - 1].value) {
        itemsArray.push({ player: name.value, value: scored });
        mySort()
        if (scored > topScore || scored == topScore && name.value == itemsArray[0].player) {
            console.log("***top score!***")
        } else {
            console.log("***hi score!***")
        }
        itemsArray = itemsArray.slice(0, 10);
    };
    addTable(topScore)
    scored = 0
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

//dynamically generate table
function addTable(tS) {
    gameOver.style.display = "block"
    let table = document.createElement('TABLE')
    let tableBody = document.createElement('TBODY');
    tableBody.id = "t-div"
    table.style = "margin-left:auto;margin-right:auto;"
    table.border = '1'
    table.appendChild(tableBody);
    let heading = new Array();
    heading[0] = "TOP PLAYERS"
    heading[1] = "SCORE"
    let hiScoreList = new Array();

    for (i = 0; i < itemsArray.length; i++) {
        hiScoreList[i] = [itemsArray[i].player, itemsArray[i].value]
    }
    try {
        //TABLE COLUMNS
        let tr = document.createElement('TR');
        tableBody.appendChild(tr);
        for (i = 0; i < heading.length; i++) {
            let th = document.createElement('TH')
            th.width = '175';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
        }

        //TABLE ROWS
        for (i = 0; i < hiScoreList.length; i++) {
            let tr = document.createElement('TR');
            for (j = 0; j < hiScoreList[i].length; j++) {
                let td = document.createElement('TD')
                td.appendChild(document.createTextNode(hiScoreList[i][j]));
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }

        myTableDiv.appendChild(table)
        let tBod = document.getElementById("t-div");
        let tBodKid = [tBod.children[1].children[0], tBod.children[1].children[1]]
        if (scored > tS || scored == tS && name.value == itemsArray[0].player) {
            tBodKid[0].style = "color: #9c0964; background-color:coral"
            tBodKid[1].style = "color: #9c0964; background-color:coral"
        }
    } catch (error) {
        console.log(error)
    }
}
