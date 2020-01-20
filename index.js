"use strict";

$(function () {

    // CONSTANTS

    var attackSound = new sound("resources/attack.mp3");
    var damageSound = new sound("resources/damage.mp3");

    let currentTurn = 0

    let totalHealth = 100;
    let health = 100;
    let dead = 0;

    let player = {
        imgId: '#player-img',
        healthBarId: '#player-health-bar',
        healthPercentageId: '#player-health-percentage',
        healthPercentage: totalHealth,
    };
    let enemy = {
        imgId: '#enemy-img',
        healthBarId: '#enemy-health-bar',
        healthPercentageId: '#enemy-health-percentage',
        healthPercentage: totalHealth,
    };

    let attackOne = {
        id: '#attack-one',
        name: 'Cosquillas',
        damage: 1
    };
    let attackTwo = {
        id: '#attack-two',
        name: 'Moder oreja',
        damage: 5
    };
    let attackThree = {
        id: '#attack-three',
        name: 'Patada rodilla',
        damage: 10
    };
    let attackFour = {
        id: '#attack-four',
        name: 'Sendo coñazo',
        damage: 15
    };

    // PLAYER LOGIC

    function playPlayer() {
        if (player.healthPercentage == dead) endGame("YO LOSE!");
        else enableAttacks();
    }

    function nextTurn() {
        disableAttacks();
        attackSound.play();
        updateHealthBar(enemy.healthPercentageId, enemy.healthBarId, enemy.healthPercentage);
        blink(enemy.imgId);
        if (enemy.healthPercentage == dead) endGame("YOU WIN!");
        else playEnemy();
    }

    function endGame(result) {
        $("#battle-result").text(result);
    }

    function enableAttacks() {
        $(attackOne.id).prop('disabled', false);
        $(attackTwo.id).prop('disabled', false);
        $(attackThree.id).prop('disabled', false);
        $(attackFour.id).prop('disabled', false);
    }

    function disableAttacks() {
        $(attackOne.id).prop('disabled', true);
        $(attackTwo.id).prop('disabled', true);
        $(attackThree.id).prop('disabled', true);
        $(attackFour.id).prop('disabled', true);
    }

    $(attackOne.id).on({
        'click': function () {
            $(player.imgId).shake();
            if (enemy.healthPercentage >= attackOne.damage) enemy.healthPercentage -= attackOne.damage;
            else enemy.healthPercentage = dead;
            nextTurn();
        }
    });

    $(attackTwo.id).on({
        'click': function () {
            $(player.imgId).shake();
            if (enemy.healthPercentage >= attackTwo.damage) enemy.healthPercentage -= attackTwo.damage;
            else enemy.healthPercentage = dead;
            nextTurn();
        }
    });

    $(attackThree.id).on({
        'click': function () {
            $(player.imgId).shake();
            if (enemy.healthPercentage >= attackThree.damage) enemy.healthPercentage -= attackThree.damage;
            else enemy.healthPercentage = dead;
            nextTurn();
        }
    });

    $(attackFour.id).on({
        'click': function () {
            $(player.imgId).shake();
            if (enemy.healthPercentage >= attackFour.damage) enemy.healthPercentage -= attackFour.damage;
            else enemy.healthPercentage = dead;
            nextTurn();
        }
    });

    function updateHealthBar(healthPercentageId, healthBarId, healthPercentage) {
        $(healthPercentageId).text(healthPercentage + '/' + totalHealth);
        $(healthBarId).animate({
            'width': healthPercentage + "%"
            }, 400);
    }

    // ENEMY LOGIC

    function playEnemy() {
        disableAttacks();
        setTimeout(function(){
            var enemyAttack = Math.floor(Math.random() * 4);
            var damage = 0;
            switch (enemyAttack) {
              case 0: damage = 5;
                break;
              case 1: damage = 10;
                break;
              case 2: damage = 15;
                break;
              case 3: damage = 20;
                break;
              default:
                break;
            }
            $(enemy.imgId).shake();
           damageSound.play();
            if (player.healthPercentage >= damage) player.healthPercentage -= damage;
            else player.healthPercentage = dead;
            updateHealthBar(player.healthPercentageId, player.healthBarId, player.healthPercentage);
            blink(player.imgId);
            playPlayer();
        }, 1000);
    }

    // SOUNDS

    function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
        this.sound.play();
      }
      this.stop = function(){
        this.sound.pause();
      }
    }

    // ANIMATIONS

    jQuery.fn.shake = function() {
        this.each(function (i) {
            $(this).css({
                "position": "relative"
            });
            for (var x = 0; x < 3; x++) {
                $(this).animate({
                    left: -10
                }, 10).animate({
                    left: 0
                }, 50).animate({
                    left: 10
                }, 10).animate({
                    left: 0
                }, 50);
            }
        });
    }

    function blink(imgId) {
        for (var x = 0; x < 2; x++) {
            $(imgId).animate({
            "opacity": 0
            }, 70).animate({
            "opacity": 1
            }, 70);
        }
    }
});