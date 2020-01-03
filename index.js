"use strict";

$(function () {

    let health = 100;
    let dead = 0;
    let attackOne = 10;
    let attackTwo = 15;
    let attackThree = 20;
    let attackFour = 25;

    $('#attack-one').on({
        'click': function () {
            if (health >= attackOne) health -= attackOne;
            else health = dead;
            updateHealthBar();
        }
    });

    $('#attack-two').on({
        'click': function () {
            if (health >= attackTwo) health -= attackTwo;
            else health = dead;
            updateHealthBar();
        }
    });

    $('#attack-three').on({
        'click': function () {
            if (health >= attackThree) health -= attackThree;
            else health = dead;
            updateHealthBar();
        }
    });

    $('#attack-four').on({
        'click': function () {
            if (health >= attackFour) health -= attackFour;
            else health = dead;
            updateHealthBar();
        }
    });

    function updateHealthBar() {
    $('#health-percentage').text(health + '%');
    $('#health-bar').animate({
        'width': health + "%"
        }, 400);
    }
});