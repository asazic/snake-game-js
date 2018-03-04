$(document).ready(function () {

    // INITIAL SETTINGS
    var snake = ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5"];

    var way = "right";
    var oldWay = "";
    var food = "12-13";
    var score = 0;
    var best = 0;
    var play; // NEDED FOR INTERVAL
    var gameOver = false;


    // DRAW SNAKE FROM ARRAY
    var drawSnake = function () {
        for (i = 0; i < 15; i++) {
            for (j = 0; j < 15; j++) {
                var elem = "#" + i + "-" + j;
                $(elem).removeClass("snake-body");
                $(elem).removeClass("snake-head");
            }
        }
        for (i = 0; i < snake.length - 1; i++)
            $("#" + snake[i]).addClass("snake-body");
        $("#" + snake[snake.length - 1]).addClass("snake-head");
    }
    $("#12-13").addClass("food");
    drawSnake();

    // RESET TO INITIAL SETTINGS
    var reset = function () {
        snake = ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5"];
        way = "right";
        oldWay = "";
        $("#" + food).removeClass("food");
        food = "12-13";
        score = 0;
        $(".score").text("SCORE: 0");
        modalText = "PAUSE";
        $("#" + food).addClass("food");
        drawSnake();
    }

    // RETURNS ROW NUMBER OF CURRENT SNAKE'S HEAD
    var getHeadRow = function () {
        var headIndex = snake.length - 1;
        var head = snake[headIndex];
        var headNums = head.split('-');
        return parseInt(headNums[0]);
    }

    // RETURNS COLUMN NUMBER OF CURRENT SNAKE'S HEAD
    var getHeadColumn = function () {
        var headIndex = snake.length - 1;
        var head = snake[headIndex];
        var headNums = head.split('-');
        return parseInt(headNums[1]);
    }

    // MOVE ONE FIELD TO THE RIGHT AND CHECK IF THE MOVE IS VALID
    var moveRight = function () {
        if (oldWay != "left") {
            var col = getHeadColumn();
            var row = getHeadRow();
            if (col < 14) {
                var newHead = row + "-" + (col + 1);

                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }

                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            } else {
                var newHead = row + "-0";

                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }

                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            way = "left";
            oldWay = "";
            moveLeft();
            return true;
        }
    }

    // MOVE ONE FIELD TO THE LEFT AND CHECK IF THE MOVE IS VALID
    var moveLeft = function () {
        if (oldWay != "right") {
            var col = getHeadColumn();
            var row = getHeadRow();
            if (col > 0) {
                var newHead = row + "-" + (col - 1);
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            } else {
                var newHead = row + "-14";
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            way = "right";
            oldWay = "";
            moveRight();
            return true;
        }
    }

    // MOVE ONE FIELD UP AND CHECK IF THE MOVE IS VALID
    var moveUp = function () {
        if (oldWay != "down") {
            var col = getHeadColumn();
            var row = getHeadRow();
            if (row > 0) {
                var newHead = (row - 1) + "-" + col;
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            } else {
                var newHead = "14-" + col;
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            way = "down";
            oldWay = "";
            moveDown();
            return true;
        }
    }

    // MOVE ONE FIELD DOWN AND CHECK IF THE MOVE IS VALID
    var moveDown = function () {
        if (oldWay != "up") {
            var col = getHeadColumn();
            var row = getHeadRow();
            if (row < 14) {
                var newHead = (row + 1) + "-" + col;
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead);
                    return true;
                } else {
                    return false;
                }
            } else {
                var newHead = "0-" + col;
                if (newHead == food) {
                    addScore();
                    removeFood();
                    placeFood();
                } else {
                    snake.shift();
                }
                if (snake.indexOf(newHead) === -1) {
                    snake.push(newHead)
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            way = "up";
            oldWay = "";
            moveUp();
            return true;
        }
    }

    // START SNAKE 
    var run = function () {
        if (play)
            clearInterval(play);

        play = setInterval(function () {
            switch (way) {
                case "right":
                    if (moveRight()) {
                        drawSnake();
                    } else {
                        checkScore();
                        stop();
                        reset();
                        $("#game-over-modal").show();
                        gameOver = true;
                    }
                    break;
                case "left":
                    if (moveLeft()) {
                        drawSnake();
                    } else {
                        checkScore();
                        stop();
                        reset();
                        $("#game-over-modal").show();
                        gameOver = true;
                    }
                    break;
                case "up":
                    if (moveUp()) {
                        drawSnake();
                    } else {
                        checkScore();
                        stop();
                        reset();
                        $("#game-over-modal").show();
                        gameOver = true;
                    }
                    break;
                default:
                    if (moveDown()) {
                        drawSnake();
                    } else {
                        checkScore();
                        stop();
                        reset();
                        $("#game-over-modal").show();
                        gameOver = true;
                    }
                    break;
            }
        }, 200);
    }

    // STOP SNAKE
    var stop = function () {
        clearInterval(play);
    }

    // PLACE FOOD ON RANDOM PLACE
    var placeFood = function () {
        var row = Math.floor(Math.random() * 15);
        var col = Math.floor(Math.random() * 15);

        var position = row + "-" + col;

        if (snake.indexOf(position) === -1) {
            food = position;
            $("#" + food).addClass("food");
        } else {
            placeFood();
        }
    }

    // REMOVE FOOD - CALLED WHEN SNAKE EATS FOOD
    var removeFood = function () {
        $("#" + food).removeClass("food");
    }

    // ADD SCORE - CALLED WHEN SNAKE EATS FOOD
    var addScore = function () {
        score++;
        $(".score").text("SCORE: " + score);
    }

    // CHECK IF BEST SCORE IS BEATEN - CALLED ON GAME OVER
    var checkScore = function () {
        var bestScore = getBestScore("score");
        if (bestScore) {
            if (parseInt(bestScore) < score) {
                setBestScore("score", score);
                $(".best-score").text("BEST SCORE: " + score);
            }
        } else {
            setBestScore("score", score);
            $(".best-score").text("BEST SCORE: " + score);
        }
    }

    // INITIAL RUN
    run();

    // CHANGE CURRENT WAY
    var changeWay = function (e) {
        switch (e.which) {
            case 37:
                e.preventDefault();
                if (way != "right") {
                    oldWay = way;
                    way = "left";
                    console.log(way);
                }
                break;
            case 38:
                e.preventDefault();
                if (way != "down") {
                    oldWay = way;
                    way = "up";
                    console.log(way);
                }
                break;

            case 39:
                e.preventDefault();
                if (way != "left") {
                    oldWay = way;
                    way = "right";
                    console.log(way);
                }
                break;

            case 40:
                e.preventDefault();
                if (way != "up") {
                    oldWay = way;
                    way = "down";
                    console.log(way);
                }
                break;

            default: return;
        }
    }

    // LISTEN FOR ARROW KEY EVENT
    var timeout;
    $(document).keydown(function (e) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(function () {
            changeWay(e)
        }, 105);
    });

    // GAME OVER MODAL
    $("#game-over-modal .close").on("click", function (e) {
        $("#game-over-modal").hide();
        reset();
        run();
        gameOver = false;
    });

    $("#play-again-button").on("click", function () {
        $("#game-over-modal").hide();
        reset();
        run();
        gameOver = false;
    });

    $(document).keydown(function (e) {
        if (gameOver) {
            if (e.which == 13) {
                $("#game-over-modal").hide();
                reset();
                run();
                gameOver = false;
            }
        }
    });

    // PAUSE MODAL
    var paused = false;
    $(document).keydown(function (e) {
        if (!gameOver) {
            if (e.which == 32) {
                if (!paused) {
                    e.preventDefault();
                    stop();
                    $("#pause-modal").show();
                    paused = true;
                } else {
                    e.preventDefault();
                    $("#pause-modal").hide();
                    run();
                    paused = false;
                }
            }
        }
    });

    $("#pause-modal .close").on("click", function (e) {
        $("#pause-modal").hide();
        run();
    });

    $("#continue-button").on("click", function () {
        $("#pause-modal").hide();
        run();
    });

    // SCORE COOKIE - COOKIES ARE NOT IN USE CURRENTLY
    var setBestScore = function (key, value) {
        best = value;
        //Cookies.set(key, value, {expires: 7});
    }

    var getBestScore = function (key) {
        //var key = Cookies.get(key);
        return best;//key ? key : null;
    }

    // PLACE INITIAL BEST SCORE
    var bestScore = getBestScore("score");
    if (bestScore) {
        $(".best-score").text("BEST SCORE: " + bestScore);
    } else {
        $(".best-score").text("BEST SCORE: 0");
    }
});