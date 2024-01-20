const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const win = document.querySelector('.win');
const draw = document.querySelector('.draw');
const lose = document.querySelector('.lose');
const tela = document.querySelector('.message');
const player = document.querySelector('.player');
const messageScreen = document.querySelector('.text-message');
const celula = document.querySelectorAll('.cell');
let tipo = true;
let turn = true;

const possibleCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('btn1')) {
        btn1.classList.add('active');
        btn2.classList.remove('active');
        player.innerHTML = 'Player 2';
        tipo = true;
        turn = true;
        clearPlacares();
        resetGame();
    }

    if (el.classList.contains('btn2')) {
        btn2.classList.add('active');
        btn1.classList.remove('active');
        player.innerHTML = 'PC';
        tipo = false;
        turn = true;
        clearPlacares();
        resetGame();
    }

    if ((el.classList.contains('cell')) && !(el.classList.contains('X')) && !(el.classList.contains('circle'))) {
        el.classList.add(playerTurn());
        
        if (checkWin(playerTurn())) {
            endGame(true);
        } else if (checkDraw()) {
            endGame(false);
        } else {
            turn = !turn;
            if (!tipo) cpuTurn();
        }
    }

    if (el.classList.contains('button-message')) {
        tela.classList.remove('show');
        resetGame();
    }
});

const endGame = (game) => {
    if (game) {
        if (playerTurn() === "X") {
            addWin();
            messageScreen.innerHTML = 'X venceu!';
        } else {
            addLose();
            messageScreen.innerHTML = 'Círculo Venceu';
        }
    } else {
        addDraw()
        messageScreen.innerHTML = 'Empatou!';
    }
    tela.classList.add('show');
};

const addWin = () => {
    let num = Number(win.innerHTML);
    num++;
    num = num.toString().padStart(2, '0');
    win.innerHTML = num;
};

const addDraw = () => {
    let num = Number(draw.innerHTML);
    num++;
    num = num.toString().padStart(2, '0');
    draw.innerHTML = num;
};

const addLose = () => {
    let num = Number(lose.innerHTML);
    num++;
    num = num.toString().padStart(2, '0');
    lose.innerHTML = num;
};

const clearPlacares = () => {
    win.innerHTML = "00";
    draw.innerHTML = "00";
    lose.innerHTML = "00";
};

const playerTurn = () => {
    if (turn) {
        return "X";
    } else {
        return "circle";
    }
};

const resetGame = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.classList.remove('X');
        cell.classList.remove('circle');
    });
};

const checkWin = (player) => {
    return possibleCombination.some(conbination => {
        return conbination.every((index) => {
            return celula[index].classList.contains(player);
        });
    });
};

const checkDraw = () => {
    return [...celula].every((cel) => cel.classList.contains('X') || cel.classList.contains('circle'));
}

const cpuTurn = () => {
    let place = Math.floor(Math.random() * 9);
    let num = 0;

    while (celula[place].classList.contains('X') || celula[place].classList.contains('circle')) {
        place = Math.floor(Math.random() * 9);
        num++
        if (num === 20) return;
    };

    celula[place].classList.add(playerTurn());
    turn = !turn;
}