var attack; //attack
var player; //player object
var defender; //defender object
var allCharacter = []; //array that stores all players
var playerSelected = false; //to show whether we picked a player
var defenderSelected = false; //to show whether we picked a defender
var attacker;
var defender;

// var audio = new Audio(); background audio that plays 
// var audioHit = new Audio(); audio when player or defender fights or gets hit

//object construct for characters
function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counter = counter;
    this.pic = pic;
}

//create the characters for the game
function initializeCharacters() {
    var luke = new Character("Luke Skywalker", 100, 10, 9, "assets/images/luke.jpg");
    var vader = new Character("Darth Vader", 180, 2 ,16,"assets/images/darth.jpeg" );
    var darth = new Character("Darth Maul", 120, 4, 10,"assets/images/maul.jpeg" );
    var obiwan = new Character("Obi Wan Kanobi", 150, 3, 14, "assets/images/obi.jpeg");
    allCharacter.push(luke, vader, darth, obiwan);
}

//character cards to be displayed
function characterCards(divId){
for (var i = 0; i < allCharacter.length; i++) {
    $(divId).append("<div></div>");
    $(divId + "div:last-child").css({
        display: "inline-block",
        margin: "30px"
    });
    $(divId + "div:last-child").addClass("card");
    $(divId + "div:last-child").attr("bAp", allCharacter[i].attackPower);
    $(divId + "div:last-child").attr("hp", allCharacter[i].healthPoints);
    $(divId + "div:last-child").attr("ap", allCharacter[i].attackPower);
    $(divId + "div:last-child").attr("counter", allCharacter[i].counter);
    $(divId + "div:last-child").append("<h5></h5>");
    $(divId + "div:last-child h5").addClass("avatar");
    $(divId + "div:last-child h5").text(allCharacter[i].name);
    $(divId + "img:last-child").append("<img>");
    $(divId + "img:last-child").attr("id", allCharacter[i].name);
    $(divId + "img:last-child").attr("class", allCharacter[i].pic);
    $(divId + "div:last-child").append("<p></p>");
    $(divId + "div:last-child p").addClass("avatar");
    $(divId + "div:last-child p").text("HP " + allCharacter[i].healthPoints);
    }
}   

initializeCharacters();
characterCards("#characterPlaceHolder");

//move cards into attack and defend sections 
$(".card").on("click", function Hero() {
    if ($(".character").children().length <= 1) {
        $(".card").appendTo(".enemies");
        $(".card").css('border-color', '#FCE300');
        $(this).appendTo(".character");
        $(this).show(1000);
        $(this).attr("data-value","attacker");
        $(this).attr("border-color", "green");
        attacker = $(this);
        attackAP = parseInt(attacker.attr("hp"));
        attackHP = parseInt(attacker.attr("ap"));
        baseAttack = parseInt(attacker.attr("bAp"));
        // audioTheme.play(); play theme audio 

        //background images changes when we choose hero
        if ($(attacker).find("h5").text() === "Luke Skywalker") {
            $("body").css("background-image", "url(assets/images/luke.jpg)");
        } else if ($(attacker).find("h5").text() === "Darth Vader") {
            $("body").css("background-image", "url(assets/images/darth.jpeg)");
        } else if ($(attacker).find("h5").text() === "Darth Maul") {
            $("body").css("background-image", "url(assets/images/maul.jpeg)");
        } else if ($(attacker).find("h5").text() === "Obi Wan Kanobi") {
            $("body").css("background-image", "url(assets/images/obi.jpeg)");
        }

    }else if ($(".defender").children().length <= 1) {
        $(this).show(1000);
        $(".fight").text("");
        $(this).appendTo(".defender");
        $(this).attr("data-value","defender");
        $(this).css('border-color', 'black');
        defender = $(this);
        defenderHp = parseInt(defender.attr("hp"));
        defenderAp = parseInt(defender.attr("counter"));
    }   else {
        console.log("You have chosen the attacker and the defender");
    }
});

//function to run when the player wins
function winning() {
    if (defenderHp <= 0) {
        $(".fight").text("You have defeated " + $(".defender h5.avatar").text() + " Choose another enemey!");
        $(".defender").remove();
        gameWin();
    }
}

//function to run when the player loses
function losing() {
    if (attackHP <= 0) {
        $(attacker).remove();
        $("#attack").text("Restart");
        $("#attack").attr("id", "restartButton");
        $(defender).hide(3000);
        $("#restartButton").on("click", function() {
            document.location.reload();
        });
        $(".fight").text("game over!");
        $(".fight").css({
            textAlign: "center",
            fontSize: "70px",
            border: "3px solid black",
            width: "35%"
        });
    }
}

//function when the enemy attacks
function enemyHit() {
    if (defenderHp > 0) {
        attackHP -= defenderAp;
        $(".fight").append("<p>");
        $(".fight p:last-child").attr("id", "defendInfo");
        $("#defendInfo").text($(".defender h5.avatar").text() + "attacked " + $(".character h5.avatar").text() + " for " + defenderAp + " damages ");
        $(".character p.avatar").text("HP: " + attackHP);
    }
}

//check to see if we won
function gameWin() {
    if (($(".enemies").children().length == 1) && ($(".defender").children().length == 1)) {
        $("attack").text("Restart");
        $("attack").attr("id", "restartButton");
        $("#restartButton").on("click", function() {
            document.location.reload();
        });
        $(".fight").text(" Thank you for saving the Galaxy. Please pay your taxes on time. ");
        $(".fight").css({
            fontSize: "100px",
            border: "5px solid white"
        });
    }
}

//function to start fight
$("attack").on('click', function() {
    if(($("#character").children().length > 1) && ($("#defender").children().length > 1)) {
        defenderHp -= attackAP;
        $(".defender p.avatar").text("HP " + defenderHp);
        $(".fight").append("<p>");
        $(".fight p:last-child").attr("id", "attackInfo");
        $("#attackInfo").text("You attacked " + $(".defender h5.avatar").text() + "for " + attackAP + " damages ");
        attackAP += baseAttack;
        // audioHit.play();
        enemyHit();
        winning();
        losing();
        gameWin();
    }
});