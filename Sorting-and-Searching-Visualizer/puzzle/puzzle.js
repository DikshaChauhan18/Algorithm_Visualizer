document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const newPuzzleButton = document.getElementById('new_puzzle');
    const solvePuzzleButton = document.getElementById('solve_puzzle');
    const checkPuzzleButton = document.getElementById('check_puzzle');

    const size = 9;
    let sudoku = Array.from({ length: size }, () => Array(size).fill(0));
    let solution = Array.from({ length: size }, () => Array(size).fill(0));

    function generateGrid() {
        gridElement.innerHTML = '';
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.classList.add('sudoku-cell');
                cell.maxLength = 1;

                if (sudoku[row][col] !== 0) {
                    cell.value = sudoku[row][col];
                    cell.classList.add('fixed');
                    cell.disabled = true;
                } else {
                    cell.addEventListener('input', () => {
                        const value = parseInt(cell.value);
                        if (!isNaN(value) && value > 0 && value <= 9) {
                            sudoku[row][col] = value;
                        } else {
                            cell.value = '';
                            sudoku[row][col] = 0;
                        }
                    });
                }
                gridElement.appendChild(cell);
            }
        }
    }

    function isSafe(board, row, col, num) {
        for (let x = 0; x < size; x++) {
            if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }

    function solveSudoku(board) {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (isSafe(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            } else {
                                board[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function generateNewPuzzle() {
        let board = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < 20; i++) {
            let row = Math.floor(Math.random() * size);
            let col = Math.floor(Math.random() * size);
            let num = Math.floor(Math.random() * size) + 1;
            if (isSafe(board, row, col, num)) {
                board[row][col] = num;
            }
        }

        solveSudoku(board);
        solution = JSON.parse(JSON.stringify(board));

        for (let i = 0; i < 40; i++) {
            let row = Math.floor(Math.random() * size);
            let col = Math.floor(Math.random() * size);
            board[row][col] = 0;
        }

        sudoku = board;
        generateGrid();
    }

    function solveCurrentSudoku() {
        sudoku = JSON.parse(JSON.stringify(solution));
        generateGrid();
    }

    function checkUserSolution() {
        let isCorrect = true;
        const cells = gridElement.querySelectorAll('.sudoku-cell');

        cells.forEach((cell, index) => {
            const row = Math.floor(index / size);
            const col = index % size;
            const value = parseInt(cell.value);

            if (value !== solution[row][col]) {
                isCorrect = false;
                cell.classList.add('incorrect');
            } else {
                cell.classList.remove('incorrect');
            }
        });

        if (isCorrect) {
            alert("Congratulations! You've solved the puzzle correctly.");
        } else {
            alert("Some values are incorrect. Please try again.");
        }
    }

    newPuzzleButton.addEventListener('click', generateNewPuzzle);
    solvePuzzleButton.addEventListener('click', solveCurrentSudoku);
    checkPuzzleButton.addEventListener('click', checkUserSolution);

    // Generate initial grid
    generateGrid();
});
