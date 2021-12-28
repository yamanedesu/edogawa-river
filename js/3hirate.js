// スロット画像配列
var slotImg = ['125.jpg', '125.jpg', '125.jpg', '135.jpg', '135.jpg', '135.jpg', '126.jpg', '126.jpg', '126.jpg', '146.jpg', '146.jpg', '146.jpg', '136.jpg', '136.jpg', '136.jpg', '156.jpg', '156.jpg', '156.jpg', '234.jpg', '234.jpg', '245.jpg', '245.jpg', '235.jpg', '235.jpg', '356.jpg', '356.jpg', '236.jpg', '236.jpg', '246.jpg', '246.jpg', '456.jpg', '456.jpg', '256.jpg', '256.jpg', '346.jpg', '346.jpg', '123.jpg', '124.jpg', '134.jpg', '145.jpg', '345.jpg'];
// 縦に並べるスロット画像の数
var slotNum = 41;
// スロット画像のスタート位置
var startPos = -50 * (slotNum - 3);
// スロット画像の停止位置
var stopPos = -130;
// 最後に真ん中（２行目）にくるスロット画像の番号
var middleNum = 7;
// 回転エフェクト配列（jQuery easing）
var slotEasing = ['easeOutBounce'];
// 回転秒数
var slotDuration = 5;

/** 重複チェック用配列 */
var randoms = [];
/** 最小値と最大値 */
var min = 0, max = 40;

/*---------------------
 Definitions
-----------------------*/
var easingIdx;
var time;
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();

/*---------------------
 Functions
-----------------------*/
/* 初期処理 */
$(document).ready(function () {
    // A枠にスロット画像を生成
    slotCreate($("#slots_a .wrapper"), 1);
});

/** 重複チェックしながら乱数作成 */
for(i = min; i <= max; i++){
    while(true){
      var tmp = intRandom(min, max);
      if(!randoms.includes(tmp)){
        randoms.push(tmp);
        break;
      }
    }
  }
   
  /** min以上max以下の整数値の乱数を返す */
  function intRandom(min, max){
    return Math.floor( Math.random() * (max - min + 1)) + min;
}

console.log(randoms);

/* スロット画像生成 */
function slotCreate(obj, slotno) {

    // アニメーションをストップ（アニメーション処理中の場合の対応）
    obj.stop(true, true);
    // 枠内の要素をクリア
    obj.children().remove();

    // 前回結果を退避
    // 1行目の画像INDEXをセーブ
    var save_result1 = result1[slotno];
    // 2行目の画像INDEXをセーブ
    var save_result2 = result2[slotno];
    // 3行目の画像INDEXをセーブ
    var save_result3 = result3[slotno];

    // スロット画像のタグ生成
    for (var i = 0; i < slotNum; i++) {
        // 画像ファイルは配列からランダムに取得
        // var idx = i;
        var idx = randoms[i];

        // 画像ファイルの調整
        if (i == middleNum - 1) {
            // 最後に1行目にくる画像
            result1[slotno] = idx;
        } else if (i == slotNum - 1) {
            // 最初に1行目にくる画像
            if (save_result1 != undefined) {
                // 前回結果の1行目の画像INDEXを設定
                idx = save_result1;
            }
        }

        obj.append("<div class='slot'>"
            + "<img border='0'"
            + " src='img/" + slotImg[idx] + "'"
            + " width='418' height='95' />"
            + "</div>");
    }

    // スロット画像のスタート位置を設定
    obj.css({
        "margin-top": startPos + "px"
    });
}

/* スロットスタート */
function slotStart() {

    // スタートボタンの無効化
    $("#startBtn").prop('disabled', true);

    // スロットの回転秒数の取得
    time = slotDuration * 800;
    // スロットの回転エフェクトをランダムに取得
    easingIdx = Math.floor(Math.random() * slotEasing.length);

    // A枠のスロット画像移動
    slotMove($("#slots_a .wrapper"), 1);
    // スタートボタンの有効化
    $("#startBtn").prop('disabled', false);

    // キュー削除
    $(this).dequeue();

    setTimeout(doReload,3915);
    
}

function doReload() {
    window.location.reload();
}

/* スロット画像移動 */
function slotMove(obj, slotno) {

    if (obj.css("margin-top") != startPos + "px") {
        // スロットが動いた後であれば、スロット画像を再作成
        slotCreate(obj, slotno);
    }

    // スロット画像の移動アニメーション
    obj.animate({
        "margin-top": stopPos + "px"
    }, {
        'duration': time,
        'easing': slotEasing[easingIdx]
    });
};