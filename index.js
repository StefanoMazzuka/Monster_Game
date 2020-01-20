"use strict";

$(function () {

    // CONSTANTS

    var attackSound = new sound("resources/attack.mp3");
    var damageSound = new sound("resources/damage.mp3");
    var rumSound = new sound("resources/rum.mp3");
    var eatSound = new sound("resources/eat.mp3");
    var confusedSound = new sound("resources/confused.mp3");

    let currentTurn = 0

    let totalHealth = 100;
    let health = 100;
    let dead = 0;

    let blurTime = 1;

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

    var attackOne = {
        id: '#attack-one',
        name: 'Sendo coñazo',
        damage: 7,
        info: 'Stefanomon le metió tremendo golpe a Pedromon. Es muy efectivo.'
    };
    let attackTwo = {
        id: '#attack-two',
        name: 'Arepita',
        damage: 14,
        info: 'Stefanomon comió una arepita... Estaba increíble.'
    };
    let attackThree = {
        id: '#attack-three',
        name: 'Beber ron',
        info: 'Stefanomon se echó un trago de ron. Ahora es más fuerte pero... está mareado.'
    };
    let attackFour = {
        id: '#attack-four',
        name: 'Confundir',
        damage: false,
        info: 'Stefanomon grita ¡No es coña, hablo en serio!. Pedromon está confundido.',
        info2: '¡Pedromon está tan confuso que se hirió a sí mismo!',
        max: 2
    };

    var attackOneEnemy = {
        damage: 20,
        info: 'Pedromon tira una flash. Es muy efectivo.'
    };
    let attackTwoEnemy = {
        damage: 12,
        info: 'Pedromon usó Síndrome de Korsakoff y Delirium Tremens.'
    };
    let attackThreeEnemy = {
        damage: 6,
        info: 'Pedromon dice que eres manco al CS:GO. No es muy efectivo.'
    };
    let attackFourEnemy = {
        damage: 2,
        info: 'Pedromon usó cosquillas. No es muy efectivo.'
    };

    // PLAYER LOGIC

    function playPlayer() {
        if (player.healthPercentage == dead) endGame("YO LOSE!");
        else enableAttacks();
    }

    function nextTurn(attackId) {
        disableAttacks();
        updateHealthBar(enemy.healthPercentageId, enemy.healthBarId, enemy.healthPercentage);
        if (blurTime > 0) blurTime--;
        else notBlur(player.imgId);
        if (attackId == 1) blink(enemy.imgId);
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
        if (attackFour.max != 0) $(attackFour.id).prop('disabled', false);
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
            attackSound.play();
            setInfo(attackOne.info);
            nextTurn(1);
        }
    });

    $(attackTwo.id).on({
        'click': function () {
            $(player.imgId).shake();
            if (player.healthPercentage + attackTwo.damage <= totalHealth) player.healthPercentage += attackTwo.damage;
            else player.healthPercentage = totalHealth;
            updateHealthBar(player.healthPercentageId, player.healthBarId, player.healthPercentage);
            eatSound.play();
            setInfo(attackTwo.info);
            nextTurn(2);
        }
    });

    $(attackThree.id).on({
        'click': function () {
            $(player.imgId).shake();
            blur(player.imgId)
            rumSound.play();
            setInfo(attackThree.info);
            nextTurn(3);
        }
    });

    $(attackFour.id).on({
        'click': function () {
            $(player.imgId).shake();
            attackFour.damage = true;
            confusedSound.play();
            setInfo(attackFour.info);
            attackFour.max--;
            updateAttackFour();
            nextTurn(4);
        }
    });

    function updateAttackFour() {
        $(attackFour.id).text("Confundir " + attackFour.max + '/2');
    }

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
              case 0: damage = attackOneEnemy.damage;
                if (attackFour.damage) setInfo(attackFour.info2);
                else setInfo(attackOneEnemy.info);
                break;
              case 1: damage = attackTwoEnemy.damage;
                if (attackFour.damage) setInfo(attackFour.info2);
                else setInfo(attackTwoEnemy.info);
                break;
              case 2: damage = attackThreeEnemy.damage;
                if (attackFour.damage) setInfo(attackFour.info2);
                else setInfo(attackThreeEnemy.info);
                break;
              case 3: damage = attackFourEnemy.damage;
                if (attackFour.damage) setInfo(attackFour.info2);
                else setInfo(attackFourEnemy.info);
                break;
              default:
                break;
            }
            $(enemy.imgId).shake();
           damageSound.play();
           if (attackFour.damage) {
                if (enemy.healthPercentage >= damage) enemy.healthPercentage -= damage;
                else enemy.healthPercentage = dead;
                attackFour.damage = false;
                updateHealthBar(enemy.healthPercentageId, enemy.healthBarId, enemy.healthPercentage);
                blink(enemy.imgId);
           }
           else {
                if (player.healthPercentage >= damage) player.healthPercentage -= damage;
                else player.healthPercentage = dead;
                updateHealthBar(player.healthPercentageId, player.healthBarId, player.healthPercentage);
                blink(player.imgId);
           }
           playPlayer();
        }, 3000);
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

    // INFO TEXT

    function setInfo(text) {
        $("#info").text(text);
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

    function blur(imgId) {
        blurTime = 1;
        $(imgId).css("filter", "blur(4px)");
        attackOne.damage = 14;
    }

    function notBlur(imgId) {
        $(imgId).css("filter", "");
        attackOne.damage = 7;
    }
});