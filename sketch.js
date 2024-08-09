import Math from 'mathjs';

let hitSound;

let ballX;
let ballY;
let balR_Down_SpeedX;
let balR_Down_SpeedY;
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
let accelerated_L_Up_speed = 0;
let accelerated_L_Down_speed = 0;
let accelerated_R_Up_speed = 0;
let accelerated_R_Down_speed = 0;

let L_Up_KeyIsPressed = false; // 左パドルの上移動キーが押されているかどうかを示すフラグ
let L_Down_KeyIsPressed = false; 
let R_Up_KeyIsPressed = false; 
let R_Down_KeyIsPressed = false; 

var time = new Date();//時間

//試作
let L_Up_KeyCounter = 0; // カウンターの初期値
let L_Down_KeyCounter = 0; 
let R_Up_KeyCounter = 0; 
let R_Down_KeyCounter = 0; 
let is_L_Up_KeyPressed = false; // 左パドルの上移動キーの押下状態を管理するフラグ
let is_L_Down_KeyPressed = false;
let is_R_Up_KeyPressed = false;
let is_R_Down_KeyPressed = false;

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
    balR_Down_SpeedX = 7;
    balR_Down_SpeedY = 0;
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
    accelerated_L_Up_speed = 0;
    accelerated_L_Down_speed = 0;
    accelerated_R_Up_speed = 0;
    accelerated_R_Down_speed = 0;
    
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
    ballX += balR_Down_SpeedX;
    ballY += balR_Down_SpeedY;
    

    if (keyIsDown(65) || keyIsDown(87) || keyIsDown(69)) {//AかWかE
        accelerated_L_Up_speed = 0;
        if (!is_L_Up_KeyPressed) {
            // Wキーが新たに押された瞬間
            L_Up_KeyCounter = 0; // カウンターをリセット
            is_L_Up_KeyPressed = true; // Wキーが押されている状態に設定
        } else {
            // Wキーが押されている間//加速
            L_Up_KeyCounter++; // カウンターを増加
            if (paddleAY <= 0) {
                paddleAY = 0;
            } else {
                if(L_Up_KeyCounter < 5){
                    accelerated_L_Up_speed += paddleASpeed + L_Up_KeyCounter/4; // Wキーが押されている時間に応じて速度増加
                }else if(5 <= L_Up_KeyCounter < 8){
                    accelerated_L_Up_speed += paddleASpeed + L_Up_KeyCounter/3;
                }else if( 8 <= L_Up_KeyCounter < 11){
                    accelerated_L_Up_speed += paddleASpeed + L_Up_KeyCounter/2;
                }else if( 11 <= L_Up_KeyCounter < 14){
                    accelerated_L_Up_speed += paddleASpeed + L_Up_KeyCounter;
                } else{
                    accelerated_L_Up_speed += paddleASpeed + L_Up_KeyCounter*1.5;
                }
                paddleAY -= accelerated_L_Up_speed
            }
        }
    } else {
        // Wキーが離された場合
        is_L_Up_KeyPressed = false; // Wキーの押下状態をリセット
        L_Up_KeyCounter = 0;
    }

    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const L_Up_Speed = paddleASpeed + L_Up_KeyCounter;
    text("速度" + L_Up_Speed, 10, 50);
    
    if (keyIsDown(68) || keyIsDown(83) || keyIsDown(70) ) { // DかSかF
        if (!is_L_Down_KeyPressed) {
            // Sキーが新たに押された瞬間
            L_Down_KeyCounter = 0; // カウンターをリセット
            is_L_Down_KeyPressed = true; // Sキーが押されている状態に設定
        } else {
            // Sキーが押されている間
            L_Down_KeyCounter++; // カウンターを増加
            if (paddleAY + 100 >= height) {
                paddleAY + 100 == height;
            } else {
                paddleAY += paddleASpeed + L_Down_KeyCounter; // Sキーが押されている時間に応じて速度増加
            }
        }
    } else {
        // Sキーが離された場合
        is_L_Down_KeyPressed = false; // Sキーの押下状態をリセット
        L_Down_KeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const L_Down_Speed = paddleASpeed + L_Down_KeyCounter;
    text("速度" + L_Down_Speed, 10, 75);
    
    //右のパドルの動き

    //右のパドルの上移動
    if ( keyIsDown(107) || keyIsDown(79) || keyIsDown(73) ) {//+かOかI
        if (!is_R_Up_KeyPressed) {
            // R_Upキーが新たに押された瞬間
            R_Up_KeyCounter = 0; // カウンターをリセット
            is_R_Up_KeyPressed = true; // R_Upキーが押されている状態に設定
        }
        else {
            // R_Upキーが押されている間
            R_Up_KeyCounter++; // カウンターを増加
            if (paddleBY <= 0) {
                paddleBY = 0;
            } else {
                paddleBY -= paddleBSpeed + R_Up_KeyCounter; // R_Upキーが押されている時間に応じて速度増加
            }
        }
    }else {
        // R_Upキーが離された場合
        is_R_Up_KeyPressed = false; // R_Upキーの押下状態をリセット
        R_Up_KeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const R_Up_Speed = paddleBSpeed + R_Up_KeyCounter;
    text("速度" + R_Up_Speed, 10, 100);

    //右のパドルの下移動
    if (keyIsDown(75) || keyIsDown(76) || keyIsDown(74) ) {//KかLかJ
        if (!is_R_Down_KeyPressed) {
            // R_Downキーが新たに押された瞬間
            R_Down_KeyCounter = 0; // カウンターをリセット
            is_R_Down_KeyPressed = true; // R_Downキーが押されている状態に設定
        }
        else {
            // R_Downキーが押されている間
            R_Down_KeyCounter++; // カウンターを増加
            if (paddleBY + 100 >= height) {
                paddleBY + 100 == height;
            } else {
                paddleBY += paddleBSpeed + R_Down_KeyCounter; // R_Downキーが押されている時間に応じて速度増加
            }
        }
    }
    else {
        // R_Downキーが離された場合
        is_R_Down_KeyPressed = false; // R_Downキーの押下状態をリセット
        R_Down_KeyCounter = 0;
    }
    // カウンターの値を使った処理
    // 例: カウンターの値を表示
    textSize(20);
    fill("white");
    const R_Down_Speed = paddleBSpeed + R_Down_KeyCounter;
    text("速度" + R_Down_Speed, 10, 125);



    if (keyIsDown(78)) {//N：リセット
        scoreA = 0;
        scoreB = 0;
        setup();
    }

    

    //左のパドルの当たり判定
    if (paddleAY < ballY && ballY < paddleAY + paddleAHeight && paddleAX + paddleAWidth + ballRadius > ballX && ballX > paddleAX + paddleAWidth) {
        hitSound.play();
        //回転の影響について
        //balR_Down_SpeedYを増やすと下にいく
        balR_Down_SpeedY = balR_Down_SpeedY * 0.5 + spin;
        balR_Down_SpeedX *= -1;

        if (L_Up_Speed > 2) {
            spin = -L_Up_KeyCounter/5;
            scoreA += Math.abs(spin*0.05); // 掛けた回転量に応じてスコアを加算
        }else if (L_Down_Speed > 2) {
            spin = L_Down_KeyCounter/5;
            scoreA += Math.abs(spin*0.05);
        }
    }
    //右のパドルの当たり判定
    if (paddleBY < ballY && ballY < paddleBY + paddleBHeight && paddleBX - ballRadius < ballX && ballX < paddleBX) {
        hitSound.play();

        balR_Down_SpeedY = balR_Down_SpeedY * 0.5 + spin;
        balR_Down_SpeedX *= -1;

        if (R_Up_Speed > 2) {
            spin = -R_Up_KeyCounter/5;
            scoreB += Math.abs(spin*0.05); // 掛けた回転量に応じてスコアを加算
        }
        if (R_Down_Speed > 2) {
            spin = R_Down_KeyCounter/5;
            scoreB += Math.abs(spin*0.05);
        }
    }

    

    if (ballY + ballRadius > height) {
        balR_Down_SpeedY *= -1;
    }
    if (ballY - ballRadius < 0) {
        balR_Down_SpeedY *= -1;
    }

    if (ballX - ballRadius < 0) {
        balR_Down_SpeedX = 0;
        balR_Down_SpeedY = 0;
        fill("white");
        text("RIGHT  WIN", width / 2 - 65, height / 2);
        if (keyIsDown(32)) {
            scoreB += 1;
            setup();
        }
    }

    if (ballX + ballRadius > width) {
        balR_Down_SpeedX = 0;
        balR_Down_SpeedY = 0;
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
