/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started;
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function begin_play(){
	console.log('begin play activated',player1_id.value,player2_id.value, this.started);

	if(!isEmpty(player1_id.value) && !isEmpty(player2_id.value) && (this.started != true))
	{
		this.started = true; //activate the boolean

		player1_id.disabled = true;
		player2_id.disabled = true; //set to readonly then add the x and o

		player1_id.value = player1_id.value + " (X)";
		player2_id.value = player2_id.value + " (O)";

		if(whose_move() == 1) //output which user's turn it is
		{
			document.getElementById("turn_info").style.fontWeight = 'bold'; //set to bold
			document.getElementById("turn_info").innerHTML = "X's turn";

			console.log(whose_move(), "it is now x's turn");

		}
		else
		{
			document.getElementById("turn_info").style.fontWeight = 'bold';
			document.getElementById("turn_info").innerHTML = "O's turn";
			console.log(whose_move(), "it is now o's turn");

		}

		console.log('neither player name is empty, proceed');
		console.log(this.started);

	}
	if(this.started == true){ //skip extra presses
		console.log('game already started!, skipping button press');
		return;

	}
 	if (isEmpty(player1_id.value) == true | isEmpty(player2_id.value) == true){ //alert if needed
		window.alert("Player names must not be empty");
		return;
	}

}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the started flag as false

*/
function reset_play(){
	console.log('reset initialized!');

	this.started = false;

	player1_id.disabled = false;
	player2_id.disabled = false; //re init the text boxes
	player1_id.value = "";
	player2_id.value = "";

	document.getElementById("turn_info").style.fontWeight = 'normal'; //set this back to normal
	document.getElementById("turn_info").innerHTML = "Game has not started yet";

	this.turn = 1; //default value
	board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]; //set board state to default.
	//var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

	for(var i = 0; i <= 8; i++){ //for loop to overwrite entries
		var replace = table_ids[i];
		console.log('replace set to ', replace);

				document.getElementById(replace).innerHTML = table_ids[i];
	}
	console.log('table wiped!');
	return;
}
/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework)
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/
var values = [];
var turn_counter = 0;

function play() {



	var table_list = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
	var userMove = document.getElementById("move_text_id").value;
	console.log('current usermove = ', userMove, 'cells value is', document.getElementById(userMove).innerHTML );

	if(game_started() == false){
			window.alert("Game has not started yet!");
			return;
	}

	if(table_list.indexOf(userMove) !== -1){ //-1 returned if not found
		console.log('valid user move: player :',whose_move());

		if(document.getElementById(userMove).innerHTML != "(X)" && document.getElementById(userMove).innerHTML != "(O)"){
			console.log('cell is empty, and okay to be written to :199');

			if(this.turn == 1){ //if , whose_moveplayer 1

				document.getElementById(userMove).innerHTML = "(X)";
				console.log("player 1 turn complete");

			}
			if(this.turn == 0){ //if player 2

				document.getElementById(userMove).innerHTML = "(O)"; //You get the cell element just by using document.getElementById("A1")
				console.log("player 2 turn complete");

			}
			for(var j=0; j<9; j++){
				var current_val = document.getElementById(table_list[j]).innerHTML;
				console.log('retrieved value', current_val, 'current iteration is', j);
				values[j] = current_val;
				console.log(values);
			}

			//    x x x     0 1 2
			//		x x x     3 4 5
			//	  x x x   5 6 7
			var win = false;                //CHECK FOR WIN CASES!
			var winner;
					//across rows
				if (values[0] == values[1] && values[0] == values[2]) {
					win = true;
					winner = values[0];
				}
				if (values[3] == values[4] && values[3] == values[5]) {
					win = true;
					winner = values[3];
				}
				if (values[5] == values[6] && values[5] == values[7]) {
					win = true;
					winner = values[5];
				}
					 // down rows
				if (values[0] == values[3] && values[0] == values[5]) {
					win = true;
					winner = values[0];
				}
				if (values[1] == values[4] && values[1] == values[6]) {
					win = true;
					winner = values[1];
				}
				if (values[2] == values[5] && values[2] == values[7]) {
					win = true;
					winner = values[2];
				}
				//diagonals
				if (values[0] == values[4] && values[0] == values[7]) {
					win = true;
					winner = values[0];
				}
				if (values[2] == values[4] && values[2] == values[5]) {
						win = true;
						winner = values[2];
				}
				if (win == true) {
					if(winner == "(O)"){
						window.alert('Winner! = (O)');
	          reset_play();
					}
					else{
						window.alert('Winner! = (X)');
          	reset_play();
					}
				}
				toggle_move();
			}
			else{
				window.alert("cell already used");
				}
		}

		else{
			window.alert("Invalid move");
	}
	turn_counter++;
	if(turn_counter == 9){ //when all cells are filled, and yet no winner
		console.log('turn limit reached, reset initialized');
		reset_play();
	}
}

/*
Do not change this method.
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
