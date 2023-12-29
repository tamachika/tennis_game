let hitSound;

let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let ballRadius;
let paddleAX;
let paddleAY;
let paddleASpeed;
let paddleAWidth;
let paddleAHeight;
let paddleBX;
let paddleBY;
let paddleBSpeed;
let paddleBWidth;
let paddleBHeight;
let x1;
let y1;
let xWidth;
let yHeight;
let scoreA = 0;
let scoreB = 0;
let textA;
let textB;

//ボールにかかっている回転
let spin = 0;

//加速
let accelerated_Wspeed = 0;
let accelerated_Sspeed = 0;
let accelerated_Ospeed = 0;
let accelerated_Lspeed = 0;

let wKeyIsPressed = false; // Wキーが押されているかどうかを示すフラグ
let sKeyIsPressed = false; // Sキーが押されているかどうかを示すフラグ
let oKeyIsPressed = false; // Oキーが押されているかどうかを示すフラグ
let lKeyIsPressed = false; // Lキーが押されているかどうかを示すフラグ

var time = new Date();//時間

//試作
let wKeyCounter = 0; // カウンターの初期値
let sKeyCounter = 0; // カウンターの初期値
let oKeyCounter = 0; // カウンターの初期値
let lKeyCounter = 0; // カウンターの初期値  
let isWKeyPressed = false; // Wキーの押下状態を管理するフラグ
let isSKeyPressed = false; // Sキーの押下状態を管理するフラグ
let isOKeyPressed = false; // Oキーの押下状態を管理するフラグ
let isLKeyPressed = false; // Lキーの押下状態を管理するフラグ

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function preload() {
    hitSound = loadSound('audio/hit.mp3'); // サウンドファイルのパスを指定
}
  

function setup() {
    hitSound.setVolume(0.5); // 音量を設定

    createCanvas(600, 400);
    x1 = (width / 2) - 1;
    y1 = height * 0;
    xWidth = 2;
    yHeight = 400;
    ballX = width / 2;
    ballY = height / 2;
    ballSpeedX = 7;
    ballSpeedY = 0;
    ballRadius = 10;

    paddleAX = width - 570;
    paddleAY = height / 2 - 50;
    paddleASpeed = 2;
    paddleAWidth = 10;
    paddleAHeight = 100;

    paddleBX = width - 40;
    paddleBY = height / 2 - 50;
    paddleBSpeed = 2;
    paddleBWidth = 10;
    paddleBHeight = 100;

    //回転のリセット
    spin = 0;

    //パドルの加速のリセット
    accelerated_Lspeed = 0;
    accelerated_Ospeed = 0;
    accelerated_Sspeed = 0;
    accelerated_Wspeed = 0;
}

function draw() {
    console.log('コンソールに出力されるか確認');

    background(0);
    textA = "Left:" + scoreA;
    textB = "Right:" + scoreB;
    fill("white");
    textSize(20);
    text(textA, 10, 25);
    text(textB, 305, 25);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    

    if (keyIsDown(87)) {//W:左のパドルの動き
        accelerated_Wspeed = 0;
        if (!isWKeyPressed) {
            // Wキーが新たに押された瞬間
            wKeyCounter = 0; // カウンターをリセット
            isWKeyPressed = true; // Wキーが押されている状態に設定
        } else {
            // Wキーが押されている間//加速
            wKeyCounter++; // カウンターを増加
            if (paddleAY <= 0) {
                paddleAY = 0;
            } else {
                if(wKeyCounter < 5){
                    accelerated_Wspeed += paddleASpeed + wKeyCounter/4; // Wキーが押されている時間に応じて速度増加
                }else if(5 <= wKeyCounter < 8){
                    accelerated_Wspeed += paddleASpeed + wKeyCounter/3;
                }else if( 8 <= wKeyCounter < 11){
                    accelerated_Wspeed += paddleASpeed + wKeyCounter/2;
                }else if( 11 <= wKeyCounter < 14){
                    accelerated_Wspeed += paddleASpeed + wKeyCounter;
                } else{
                    accelerated_Wspeed += paddleASpeed + wKeyCounter*1.5;
                }
                paddleAY -= accelerated_Wspeed
            }
        }
    } else {
        // Wキーが離された場合
        isWKeyPressed = false; // Wキーの押下状態をリセット
        wKeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const wspeed = paddleASpeed + wKeyCounter;
    text("速度" + wspeed, 10, 50);
    
    if (keyIsDown(83)) { // Sキーのキーコードは83
        if (!isSKeyPressed) {
            // Sキーが新たに押された瞬間
            sKeyCounter = 0; // カウンターをリセット
            isSKeyPressed = true; // Sキーが押されている状態に設定
        } else {
            // Sキーが押されている間
            sKeyCounter++; // カウンターを増加
            if (paddleAY + 100 >= height) {
                paddleAY + 100 == height;
            } else {
                paddleAY += paddleASpeed + sKeyCounter; // Sキーが押されている時間に応じて速度増加
            }
        }
    } else {
        // Sキーが離された場合
        isSKeyPressed = false; // Sキーの押下状態をリセット
        sKeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const sspeed = paddleASpeed + sKeyCounter;
    text("速度" + sspeed, 10, 75);
    
    //右のパドルの動き
    if (keyIsDown(79)) {//O
        if (!isOKeyPressed) {
            // Oキーが新たに押された瞬間
            oKeyCounter = 0; // カウンターをリセット
            isOKeyPressed = true; // Oキーが押されている状態に設定
        }
        else {
            // Oキーが押されている間
            oKeyCounter++; // カウンターを増加
            if (paddleBY <= 0) {
                paddleBY = 0;
            } else {
                paddleBY -= paddleBSpeed + oKeyCounter; // Oキーが押されている時間に応じて速度増加
            }
        }
    }else {
        // Oキーが離された場合
        isOKeyPressed = false; // Oキーの押下状態をリセット
        oKeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const ospeed = paddleBSpeed + oKeyCounter;
    text("速度" + ospeed, 10, 100);

    if (keyIsDown(76)) {//L
        if (!isLKeyPressed) {
            // Lキーが新たに押された瞬間
            lKeyCounter = 0; // カウンターをリセット
            isLKeyPressed = true; // Lキーが押されている状態に設定
        }
        else {
            // Lキーが押されている間
            lKeyCounter++; // カウンターを増加
            if (paddleBY + 100 >= height) {
                paddleBY + 100 == height;
            } else {
                paddleBY += paddleBSpeed + lKeyCounter; // Lキーが押されている時間に応じて速度増加
            }
        }
    }
    else {
        // Lキーが離された場合
        isLKeyPressed = false; // Lキーの押下状態をリセット
        lKeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const lspeed = paddleBSpeed + lKeyCounter;
    text("速度" + lspeed, 10, 125);



    if (keyIsDown(78)) {//N：リセット
        scoreA = 0;
        scoreB = 0;
        setup();
    }

    

    //左のパドルの当たり判定
    if (paddleAY < ballY && ballY < paddleAY + paddleAHeight && paddleAX + paddleAWidth + ballRadius > ballX && ballX > paddleAX + paddleAWidth) {
        hitSound.play();
        //回転の影響について
        //ballSpeedYを増やすと下にいく
        ballSpeedY = ballSpeedY * 0.5 + spin;
        ballSpeedX *= -1;

        if (wspeed > 2) {
            spin = -wKeyCounter/5;
        }else if (sspeed > 2) {
            spin = sKeyCounter/5;
        }
    }
    //右のパドルの当たり判定
    if (paddleBY < ballY && ballY < paddleBY + paddleBHeight && paddleBX - ballRadius < ballX && ballX < paddleBX) {
        hitSound.play();

        ballSpeedY = ballSpeedY * 0.5 + spin;
        ballSpeedX *= -1;

        if (ospeed > 2) {
            spin = -oKeyCounter/5;
        }
        if (lspeed > 2) {
            spin = lKeyCounter/5;
        }
    }

    

    if (ballY + ballRadius > height) {
        ballSpeedY *= -1;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY *= -1;
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = 0;
        ballSpeedY = 0;
        fill("white");
        text("RIGHT  WIN", width / 2 - 65, height / 2);
        if (keyIsDown(32)) {
            scoreB += 1;
            setup();
        }
    }

    if (ballX + ballRadius > width) {
        ballSpeedX = 0;
        ballSpeedY = 0;
        fill("white");
        text("LEFT  WIN", width / 2 - 56, height / 2);
        if (keyIsDown(32)) {
            scoreA += 1;
            setup();
        }
    }
    //線の描画
    circle(ballX, ballY, ballRadius * 2);
    rect(paddleAX, paddleAY, paddleAWidth, paddleAHeight);
    rect(paddleBX, paddleBY, paddleBWidth, paddleBHeight);
    rect(x1, y1, xWidth, yHeight);

    textSize(20);
    fill("white");
    text("回転" + spin*(-1), 10, 150);
}
