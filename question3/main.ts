export class Connect4 {
  // define variables/types
  gameBoard: string[][]
  playerOne: string
  playerTwo: string
  activePlayer: string
  isGameActive: boolean
  turnCount: number

  constructor() {
    // define the gameboard 6x7
    this.gameBoard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ]

    // initialize the variables
    this.playerOne = '1'
    this.playerTwo = '2'
    this.activePlayer = this.playerTwo
    this.isGameActive = true
    this.turnCount = 0
  }

  // takes column # as argument (indexes 0-6)
  play(col: number): string {
    // check if game is active
    if (!this.isGameActive) return `Game has finished!`

    // adjust turn count
    this.incrementTurnCount()

    // change active player
    this.changePlayer()

    // player makes move
    const played = this.placeMarker(col)
    if (played === false) {
      return 'Column full!'
    }

    // check for wins
    const horizontalWin = this.checkHorizontalWin()
    if (horizontalWin) {
      this.isGameActive = false
      return `Player ${this.activePlayer} wins!`
    }
    const verticalWin = this.checkVerticalWin()
    if (verticalWin) {
      this.isGameActive = false
      return `Player ${this.activePlayer} wins!`
    }

    // should return a string like 'Player 1 has a turn'
    return `Player ${this.activePlayer} has a turn`
  }

  // HELPER FUNCTIONS
  // function to handle the active player
  changePlayer() {
    if (this.turnCount === 1) {
      this.activePlayer = this.playerOne
    } else if (this.turnCount > 1) {
      this.activePlayer =
        this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne
    }
  }

  // update turn count
  incrementTurnCount() {
    this.turnCount += 1
  }

  // place a piece
  placeMarker(col: number) {
    // check if invalid action (if highest point of grid has a value, the column is full)
    if (this.gameBoard[0][col] !== '') {
      return false
    }

    // valid action
    for (let index = this.gameBoard.length - 1; index >= 0; index--) {
      if (this.gameBoard[index][col] === '') {
        this.gameBoard[index][col] = this.activePlayer
        return true
      }
    }
  }

  // 🏆 Victory Conditions
  checkHorizontalWin() {
    // check each row for a match
    // validate so empty space doesn't trigger a win
    let matched = false

    this.gameBoard.forEach((row, index) => {
      for (let i = 0; i < row.length - 3; i++) {
        if (
          row[i] === row[i + 1] &&
          row[i] === row[i + 2] &&
          row[i] === row[i + 3] &&
          row[i] !== ''
        ) {
          matched = true
        }
      }
    })
    return matched
  }

  checkVerticalWin() {
    let matched = false

    // reduce all the arrays into one large array
    const fakeBoard = this.gameBoard.reduce((acc, curr) => {
      return acc.concat(curr)
    }, [])

    // loop over values with increments of 7 for matches
    fakeBoard.forEach((item, index) => {
      if (
        item === fakeBoard[index + 7] &&
        item === fakeBoard[index + 14] &&
        item === fakeBoard[index + 21] &&
        item !== ''
      ) {
        matched = true
      }
    })

    return matched
  }

  checkDiagonalLeftWin() {
    // combination of the two previous ideas i think
    // there would be a check for the columns that might work such as n + 8
    // however, because of space, the loop would have to be changed
    // [XXXX---]
    // [XXXXX--]
    // [XXXXXX-]
    // [-XXXXXX]
    // [--XXXXX]
    // [---XXXX]
    // let matched = false
    // return matched
  }

  checkDiagonalRightWin() {
    // reverse of the above
  }
}
