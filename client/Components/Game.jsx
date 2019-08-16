import React from 'react';
import Spot from './Spot.jsx';
import BoardLogic from './../boardLogic.jsx';


class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.rows = 6;
        this.columns = 7;
        this.win = 10;
        this.board = [];
        for (var i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.columns; j++) {
                this.board[i].push('');
            }
        }

        this.state = {
            board: this.board,
            currentTurn: 'O',
            gameOver: false
        }

        this.boardLogic = new BoardLogic();
    }

    componentDidMount() {
        
        fetch('/getBoard', {
            method: 'GET'
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            console.log('hit');
            if (data !== '') {
                console.log('load from server:', data);
                var jsonBoard = JSON.parse(data);
                this.board = jsonBoard.board;
                this.setState({
                    board: this.board,
                    currentTurn: jsonBoard.currentTurn
                })
            }
        });
    }

    reset() {
        for (var i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.columns; j++) {
                this.board[i].push('');
            }
        }

        this.setState({
            board: this.board,
            currentTurn: 'O',
            gameOver: false
        });

        this.updateBoardOnServer();
    }

    updateBoardOnServer() {
        fetch('/updateBoard', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                board: this.board,
                currentTurn: this.state.currentTurn
            }),
        })
        .then(data => {
            console.log("DATA:", data);
        });
    }

    setPiece(row, column, piece) {
        this.board[row][column] = piece;
    }

    toggleTurn(piece) {
        if (piece === 'O') {
            return 'X';
        } else {
            return 'O';
        }
    }

    setPieceGravity(column, piece) {
        if (this.state.gameOver) {
            return;
        }

        for (var i = this.rows-1; i >= 0; i--) {
            if (this.board[i][column] === '' || this.board[i][column] === undefined) {
                this.setPiece(i, column, piece);
                this.setState({
                    board: this.board,
                    currentTurn: this.toggleTurn(this.state.currentTurn)
                });

                if (this.boardLogic.checkForWin(this.board, this.win)) {
                    this.setState({
                        gameOver: true
                    })
                    console.log("WIN");
                }
                
                this.updateBoardOnServer();                
                return true;
            }
        }

        return false;
    }

    boardClick(e) {
        var id = e.target.id.toString();
        var pos = id.split('x');
        this.setPieceGravity(pos[1], this.state.currentTurn);
    }

    render() {
        return <div>
            {this.board.map((currentRow, rowIndex) => {
                return <div>
                    {currentRow.map((pieceVal, colIndex) => {
                        return <Spot boardClick={this.boardClick.bind(this)} id={rowIndex+'x'+colIndex} piece={pieceVal} />
                    })}
                </div>
            })}
            <br/>
            <div>
                <button onClick={this.reset.bind(this)}>reset</button>
            </div>
        </div>;
    }
}

export default Game; 