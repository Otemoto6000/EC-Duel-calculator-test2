// ------------------------------------
// 1. 変数の初期値設定
// ------------------------------------
let varA = 8000; // 自分LP
let varB = 8000; // 相手LP
let varC = 0;    // 糾罪カウンター
// 変数D (要求カウンター数) は varB の値から計算される

// P効果ボタンE, F, G, Hが押されたかどうかの状態を保持
let pEffectUsed = {
    'E': false,
    'F': false,
    'G': false,
    'H': false
};

// ------------------------------------
// 2. 表示更新関数
// ------------------------------------

/**
 * 変数D (要求カウンター数) の値を計算する。
 * 変数D = ceil(varB / 9)
 * @returns {number} 計算後の変数Dの値
 */
function calculateVarD() {
    // 相手LP (varB) を9で割り、余りを繰り上げて整数にする
    return Math.ceil(varB / 9);
}

/**
 * すべての変数を画面に表示し、ボタンの状態を更新するメインの関数。
 */
function updateDisplay() {
    // 変数Bが0未満にならないように補正 (0になった場合、YOU WIN!!)
    if (varB < 0) {
        varB = 0;
    }
    // 変数Cが0未満にならないように補正
    if (varC < 0) {
        varC = 0;
    }
    
    // 変数Dを計算
    const varD = calculateVarD();

    // HTML要素の更新
    document.getElementById('varA').textContent = varA.toLocaleString();
    document.getElementById('varB').textContent = varB.toLocaleString();
    document.getElementById('varC').textContent = varC;
    document.getElementById('varD').textContent = varD;

    // P効果ボタン (E, F, G, H) の状態更新
    ['E', 'F', 'G', 'H'].forEach(key => {
        const button = document.getElementById('btn' + key);
        if (pEffectUsed[key]) {
            button.classList.add('btn-disabled');
            button.disabled = true;
        } else {
            button.classList.remove('btn-disabled');
            button.disabled = false;
        }
    });

    // 勝利条件のチェックと表示
    const winMessage = document.getElementById('win-message');
    if (varB === 0) {
        winMessage.style.display = 'flex'; // 「YOU WIN!!」を表示
    } else {
        winMessage.style.display = 'none'; // 非表示
    }
}

// ------------------------------------
// 3. ボタンの挙動 (イベントハンドラ)
// ------------------------------------

/**
 * ボタン E, F, G, H (P効果ボタン) の挙動
 * @param {string} key - 'E', 'F', 'G', 'H' のいずれか
 */
function pEffect(key) {
    if (pEffectUsed[key]) {
        // 既に押されている場合は何もしない
        return;
    }

    // 変数Aを-900
    varA -= 900;
    
    // 変数Cを+1
    varC += 1;
    
    // 押下状態を記録し、ボタンを無効化
    pEffectUsed[key] = true;

    updateDisplay();
}

/**
 * ボタンI (ターンリセット) の挙動
 * P効果ボタンE, F, G, Hをもう一度押せるようにする
 */
function turnReset() {
    // すべてのP効果ボタンの使用フラグをリセット
    pEffectUsed = {
        'E': false,
        'F': false,
        'G': false,
        'H': false
    };
    updateDisplay();
}

/**
 * ボタンJ, K (カウンター増加), L (カウンター減少) の挙動を統合
 * @param {number} delta - 1 (+1), 2 (+2), or -1 (-1)
 */
function adjustCounter(delta) {
    varC += delta;
    updateDisplay();
}

/**
 * ボタンM (900バーン) の挙動
 * 変数Bを-900する
 */
function burn900() {
    varB -= 900;
    updateDisplay();
}

/**
 * ボタンN (エニポリ砲発射！！) の挙動
 * 変数Bを-(変数C*900)し、変数Cを0にする
 */
function enipoli() {
    const damage = varC * 900;
    varB -= damage;
    varC = 0; // 変数Cを0にする
    updateDisplay();
}

/**
 * ボタンO (完全リセット) の挙動
 * すべての変数を初期値に戻し、P効果ボタンをリセットする
 */
function fullReset() {
    varA = 8000;
    varB = 8000;
    varC = 0;
    
    // P効果ボタンの状態もリセット
    turnReset(); 

    // 勝利表示を取り消すのは updateDisplay 内で行われるため、ここでは変数を初期化するだけでOK
    updateDisplay();
}

// ------------------------------------
// 4. 初期化
// ------------------------------------

// ページ読み込み時に一度表示を更新し、初期状態をセット
updateDisplay();
