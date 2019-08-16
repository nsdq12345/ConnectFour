class BoardLogic {
    
    constructor() {

    }

    checkForWin(board, n) {
        return this.checkForHorizontalWin(board, n) || this.checkForVerticalWin(board, n)
            || this.checkForMajorDiagonalWin(board, n) || this.checkForMinorDiagonalWin(board, n);
    }

    checkForHorizontalWin(board, n) {
        for (var r = 0; r < board.length; r++) {
            for (var c = 0; c < board[r].length-n+1; c++) {
                var win = true;
                var currentPiece = board[r][c];
                if (currentPiece !== '') {
                    for (var i = 0; i < n; i++) {
                        if (currentPiece !== board[r][c+i]) {
                            win = false;
                        }
                    }
                    if (win) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkForVerticalWin(board, n) {
        for (var r = 0; r < board.length-n+1; r++) {
            for (var c = 0; c < board[r].length; c++) {
                var win = true;
                var currentPiece = board[r][c];
                if (currentPiece !== '') {
                    for (var i = 0; i < n; i++) {
                        if (currentPiece !== board[r+i][c]) {
                            win = false;
                        }
                    }
                    if (win) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkForMajorDiagonalWin(board, n) {
        for (var r = 0; r < board.length-n+1; r++) {
            for (var c = 0; c < board[r].length-n+1; c++) {
                var win = true;
                var currentPiece = board[r][c];
                if (currentPiece !== '') {
                    for (var i = 0; i < n; i++) {
                        if (currentPiece !== board[r+i][c+i]) {
                            win = false;
                        }
                    }
                    if (win) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkForMinorDiagonalWin(board, n) {
        for (var r = 0; r < board.length-n+1; r++) {
            for (var c = board[r].length-1; c >= n-1; c--) {
                var win = true;
                var currentPiece = board[r][c];
                if (currentPiece !== '') {
                    for (var i = 0; i < n; i++) {
                        if (currentPiece !== board[r+i][c-i]) {
                            win = false;
                        }
                    }
                    if (win) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

export default BoardLogic;