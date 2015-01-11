var cardGame = new Object();
cardGame.grid = [["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""]];    //grid where cards are assigned to
cardGame.cardCodes = [
    "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
    "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
    "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD", 
    "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC"]; //all possible cards (52)  
cardGame.cardCode1 = "";
cardGame.cardCode2 = "";  
cardGame.usedPosition1 = "";
cardGame.usedPosition2 = "";  
cardGame.usedPositions = [];   //stores positions which have matched cards
cardGame.gameActive = true; //determines if you are able to play the game
cardGame.randomize = function(){  //randomizes which cards go to which slot
    this.emptySlots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,
            36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
    for (var i = 0; i <= 31; i++){ //picks up 32 cards out of possible 52 cards
         var randomCard = Math.floor(Math.random() * this.cardCodes.length); //randomly choosing card from remaining cards 
         
         for(var j = 0; j <= 1; j++){ //place same type of card into two different slots
             var slotPosition = Math.floor(Math.random() * this.emptySlots.length); //randomly choosing an empty slot
             var slotPositionValue = this.emptySlots[slotPosition];
             var firstPosition = Math.floor(slotPositionValue / 16); //generates row number on the grid
             var secondPosition = slotPositionValue % 16; //generates column number on the grid        
             this.grid[firstPosition][secondPosition] = this.cardCodes[randomCard]; //assigns random card to the slot on the grid 
             this.emptySlots.splice(slotPosition, 1); //deletes the slot taken by a card
         }   

         this.cardCodes.splice(randomCard, 1); //deletes the chosen card from all the possible cards  
    }       
}       
cardGame.restartGame = function(){
    this.cardCodes = [
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
        "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD", 
        "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC"];
        
    this.grid = [["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""],
        ["","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","",""]]; 
    
    this.gameActive = true;  
    cardGame.cardCode1 = "";
    cardGame.cardCode2 = "";  
    cardGame.usedPosition1 = "";
    cardGame.usedPosition2 = "";  
    cardGame.usedPositions = [];
    cardGame.randomize();
    
    for (var k = 0; k <= 63; k++){
        document.getElementById("image_" + k).src = "images/back.jpg";  
    } 
}

cardGame.randomize();

function flipCard(position){ 
    if (cardGame.usedPositions.indexOf(position) === -1 && cardGame.gameActive === true && !(cardGame.cardCode1 != "" && cardGame.cardCode2 != "")){ //checks if the position of the click is used or not
        if(cardGame.cardCode1 === "") { //first card is not flipped yet
            var gridPosition1 = Math.floor(position / 16); //first position of the clicked card
            var gridPosition2 = position % 16; //second position of the clicked card
            cardGame.cardCode1 = cardGame.grid[gridPosition1][gridPosition2]; //card code assigned to a variable
            document.getElementById("image_" + position).src = "images/" + cardGame.cardCode1 + ".jpg"; //shows the image related with the card code
            cardGame.usedPosition1 = position; //stores the position of the first flipped card
        } else if (cardGame.usedPosition1 != position) {  //goes here if the first card is already flipped
            var gridPosition1 = Math.floor(position / 16); //first position of the clicked card
            var gridPosition2 = position % 16; //second position of the clicked card
            cardGame.cardCode2 = cardGame.grid[gridPosition1][gridPosition2]; //card code assigned to a variable
            document.getElementById("image_" + position).src = "images/" + cardGame.cardCode2 + ".jpg"; //shows the image related with the card code
            cardGame.usedPosition2 = position; //stores the position of the second card
            
            if (cardGame.cardCode1 === cardGame.cardCode2){ //checks if the code of both cards match
                cardGame.usedPositions.push(cardGame.usedPosition1); //adds the first card into the used position array
                cardGame.usedPositions.push(cardGame.usedPosition2); //adds the second card into the used position array
                cardGame.cardCode1 = ""; //wipes the variable of the first card
                cardGame.cardCode2 = "";  //wipes the variable of the second card
                
                if (cardGame.usedPositions.length === 64){
                    cardGame.gameActive = false;
                    if(confirm("Game over! Would you like to play again?")){
                        cardGame.restartGame();
                    }    
                }
                    
            } else {   //if both cards don't match
                setTimeout (function() {  //perform these codes after a set time
                    cardGame.cardCode1 = ""; //wipes the variable of the first card
                    cardGame.cardCode2 = "";  //wipes the variable of the second card
                    document.getElementById("image_" + cardGame.usedPosition1).src = "images/back.jpg"; //changes the picture of the first card to default
                    document.getElementById("image_" + cardGame.usedPosition2).src = "images/back.jpg"; //changes the picture of the second card to default
                },1500);
            }
        }
    }
}

