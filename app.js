/**
 * app.js（v3 — 解析演出強化版）
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 追加機能：
 *   - 回答後ミニゲージ反応（曖昧表示）
 *   - 層間中間解析画面
 *   - Layer III 突入前の警告演出
 *   - 途中終了オプション（精度 + 暫定タイプ）
 *   - インライン解析メッセージ
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */


// ════════════════════════════════════════════
// グローバル状態
// ════════════════════════════════════════════

let currentQuestionIndex = 0;
let scores = {};
let radarChart = null;

/**
 * 各パラメータの「表示用ゲージ値」（実スコアより曖昧に表示する用）
 * ゲージは 0〜100 の範囲で管理し、実際のスコア比率より少し遅れて伸びる。
 */
let gaugeValues = {};

/** 現在のゲージアニメーションタイマー */
let gaugeAnimTimer = null;

/** 途中終了モードかどうか */
let isEarlyExit = false;

/** 通過した層の番号（1〜4）を記録 */
let completedLayers = [];

// ════════════════════════════════════════════
// 回答後に表示するインライン解析メッセージ
// ランダムに選ばれて、「何かが起きている感」を演出する
// ════════════════════════════════════════════

const ANALYSIS_MESSAGES = [
  "SCANNING THOUGHT STRUCTURE...",
  "BEHAVIORAL PATTERN INDEXED",
  "VECTOR DELTA RECORDED",
  "PARAMETER ADJUSTMENT APPLIED",
  "COGNITIVE SIGNATURE UPDATED",
  "CROSS-REFERENCING ARCHETYPE DATABASE...",
  "ANOMALY SIGNAL: TRACE",
  "CIVILIZATION ROLE ESTIMATION UPDATED",
  "PSYCHOLOGICAL DEPTH PROBE: ACTIVE",
  "DATA POINT REGISTERED",
  "RESONANCE PATTERN DETECTED",
  "SUBJECT PROFILE REFINED",
  "NEURAL VECTOR UPDATED",
  "CLASSIFICATION CONFIDENCE RISING",
  "DEEP STRUCTURE ECHO DETECTED",
];

/** レイヤー間の中間解析コメント定義 */
const LAYER_ANALYSIS = {
  1: {
    title: "LAYER-I ANALYSIS COMPLETE",
    subtitle: "日常行動パターン解析完了",
    body: (s) => {
      const lines = [];
      if (s.solitude > s.love)     lines.push("・高い孤独適応傾向を確認");
      else                          lines.push("・社会的接続傾向を確認");
      if (s.research > s.reality)  lines.push("・探求優位型の情報処理特性");
      else                          lines.push("・現実適応優位型の行動特性");
      if (s.creativity > s.work)   lines.push("・発散型の思考傾向");
      else                          lines.push("・収束型の作業傾向");
      if (s.otaku > 15)             lines.push("・高密度の専門没入傾向");
      if (s.management > 12)        lines.push("・軽度の管理者適性を観測");
      return lines.slice(0, 4).join("\n");
    },
    progress: "40%",
    accuracy: "38%"
  },
  2: {
    title: "LAYER-II ANALYSIS COMPLETE",
    subtitle: "思考傾向パターン解析完了",
    body: (s) => {
      const lines = [];
      if (s.meta > 20)              lines.push("・高いメタ認知能力を確認");
      if (s.revolution > 20)        lines.push("・既存秩序への強い再構築衝動");
      if (s.architect > 18)         lines.push("・構造設計的思考回路の優位性");
      if (s.philosophy > 18)        lines.push("・深層哲学思考パターンを検出");
      if (s.expert > 18)            lines.push("・専門特化型の知識集積傾向");
      if (s.observer > 18)          lines.push("・観測者バイアスの優位を確認");
      if (lines.length === 0)       lines.push("・均衡型思考パターンを確認");
      return lines.slice(0, 4).join("\n");
    },
    progress: "72%",
    accuracy: "65%"
  },
  3: {
    title: "LAYER-III ANALYSIS COMPLETE",
    subtitle: "極限状況応答解析完了",
    body: (s) => {
      const lines = [];
      if (s.endurance > 25)         lines.push("・極高値の消耗耐性を記録");
      if (s.love > 25)              lines.push("・博愛衝動が臨界値付近");
      if (s.revolution > 25)        lines.push("・秩序破壊因子：有意な反応");
      if (s.genius > 22)            lines.push("・自己超越的なビジョン傾向を確認");
      if (s.solitude > 25)          lines.push("・完全孤立耐性：高");
      if (s.reality > 25)           lines.push("・極限下での現実適応能力：高");
      if (lines.length === 0)       lines.push("・標準範囲の極限応答を記録");
      return lines.slice(0, 4).join("\n");
    },
    progress: "92%",
    accuracy: "89%"
  }
};

// ════════════════════════════════════════════
// 初期化
// ════════════════════════════════════════════

window.addEventListener("DOMContentLoaded", () => {
  initScores();
  startTitleAnimation();
});

function initScores() {
  Object.keys(PARAM_LABELS).forEach(k => {
    scores[k] = 0;
    gaugeValues[k] = 0;
  });
  completedLayers = [];
  isEarlyExit = false;
}


// ════════════════════════════════════════════
// タイトル画面
// ════════════════════════════════════════════

function startTitleAnimation() {
  const lines = [
    "SYSTEM ONLINE...",
    "LOADING VECTOR ANALYSIS PROTOCOL v7.1.4...",
    "PARAMETER DATABASE: 20 AXES LOADED",
    "QUESTION MATRIX: " + QUESTIONS.length + " QUERIES READY",
    "ARCHETYPE DATABASE: " + DIAGNOSIS_TYPES.length + " TYPES INDEXED",
    "ANOMALY DETECTION MODULE: ACTIVE",
    "THREAT ANALYSIS ENGINE: ARMED",
    ">>> READY FOR SUBJECT SCAN."
  ];

  const logEl = document.getElementById("title-log");
  if (!logEl) return;

  let lineIndex = 0, charIndex = 0;

  const t = setInterval(() => {
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      charIndex++;
      const done = lines.slice(0, lineIndex).join("\n");
      logEl.textContent = (done ? done + "\n" : "") + line.slice(0, charIndex);
    } else {
      lineIndex++;
      charIndex = 0;
      if (lineIndex >= lines.length) {
        clearInterval(t);
        const btn = document.getElementById("start-btn");
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    }
  }, 35);
}


// ════════════════════════════════════════════
// 画面遷移
// ════════════════════════════════════════════

function startDiagnosis() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  showQuestion(0);
}

/** 通常の最終スキャン画面へ */
function showResultScreen() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("scan-screen").style.display = "flex";
  runScanAnimation();
}

/** 途中終了ボタンから呼ばれる */
function earlyExit() {
  isEarlyExit = true;
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("scan-screen").style.display = "flex";
  runScanAnimation(true);
}

function retryDiagnosis() {
  initScores();
  currentQuestionIndex = 0;

  ["result-screen","scan-screen","quiz-screen","mid-screen","warning-screen"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const titleScreen = document.getElementById("title-screen");
  titleScreen.style.display = "flex";
  document.getElementById("title-log").textContent = "";
  const btn = document.getElementById("start-btn");
  btn.style.opacity = "0";
  btn.style.pointerEvents = "none";

  if (radarChart) { radarChart.destroy(); radarChart = null; }

  setTimeout(startTitleAnimation, 300);
}


// ════════════════════════════════════════════
// スキャン演出
// ════════════════════════════════════════════

function runScanAnimation(early = false) {
  const logEl = document.getElementById("scan-log");
  const barEl = document.getElementById("scan-bar");
  const titleEl = document.getElementById("scan-title");

  if (early) {
    titleEl.textContent = "PARTIAL ANALYSIS PROCESSING...";
  } else {
    titleEl.textContent = "ANALYZING SUBJECT...";
  }

  const steps = early ? [
    { text: "COLLECTING PARTIAL VECTOR DATA...", delay: 0,    progress: 20 },
    { text: "RUNNING INCOMPLETE ARCHETYPE MATCH...", delay: 500, progress: 45 },
    { text: "ESTIMATING REMAINING PARAMETERS...", delay: 1000, progress: 65 },
    { text: "GENERATING PROVISIONAL REPORT...", delay: 1500,  progress: 85 },
    { text: `>>> PROVISIONAL ANALYSIS COMPLETE. [ACCURACY: ${getAccuracy()}%]`, delay: 2000, progress: 100 }
  ] : [
    { text: "COLLECTING RAW VECTOR DATA...", delay: 0,    progress: 10 },
    { text: "NORMALIZING 20 PARAMETER AXES...", delay: 600, progress: 25 },
    { text: "RUNNING ARCHETYPE MATCHING ALGORITHM...", delay: 1200, progress: 42 },
    { text: "CALCULATING THREAT COEFFICIENT...", delay: 1800, progress: 58 },
    { text: "SCANNING FOR ANOMALOUS PATTERNS...", delay: 2400, progress: 72 },
    { text: "CROSS-REFERENCING CIVILIZATION ROLES...", delay: 2900, progress: 85 },
    { text: "GENERATING ANALYSIS REPORT...", delay: 3400,  progress: 95 },
    { text: ">>> DEEP ANALYSIS COMPLETE.", delay: 3900,   progress: 100 }
  ];

  let accumulated = "";

  steps.forEach(step => {
    setTimeout(() => {
      accumulated += step.text + "\n";
      logEl.textContent = accumulated;
      barEl.style.width = step.progress + "%";

      if (step.progress === 100) {
        setTimeout(() => {
          document.getElementById("scan-screen").style.display = "none";
          document.getElementById("result-screen").style.display = "block";
          renderResult(early);
        }, 600);
      }
    }, step.delay);
  });
}

/** 現在の解析精度を質問進捗から計算 */
function getAccuracy() {
  return Math.min(99, Math.round((currentQuestionIndex / QUESTIONS.length) * 100));
}


// ════════════════════════════════════════════
// 層間中間解析画面
// ════════════════════════════════════════════

/**
 * 層の切れ目で中間解析画面を表示する
 * @param {number} layer - 終了した層番号（1〜3）
 * @param {number} nextIndex - 次の質問インデックス
 */
function showMidAnalysis(layer, nextIndex) {
  const data = LAYER_ANALYSIS[layer];
  if (!data) { showQuestion(nextIndex); return; }

  completedLayers.push(layer);

  document.getElementById("quiz-screen").style.display = "none";
  const midScreen = document.getElementById("mid-screen");
  midScreen.style.display = "flex";

  // コンテンツ埋め込み
  document.getElementById("mid-title").textContent = data.title;
  document.getElementById("mid-subtitle").textContent = data.subtitle;
  document.getElementById("mid-body").textContent = data.body(scores);
  document.getElementById("mid-accuracy").textContent = `解析精度: ${data.accuracy}`;

  // 「続行」ボタンの動作を設定
  const continueBtn = document.getElementById("mid-continue-btn");
  const exitBtn = document.getElementById("mid-exit-btn");

  continueBtn.onclick = () => {
    midScreen.style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    // Layer III 突入前は警告を挟む
    if (layer === 2) {
      showDeepWarning(nextIndex);
    } else {
      showQuestion(nextIndex);
    }
  };

  exitBtn.onclick = () => {
    midScreen.style.display = "none";
    earlyExit();
  };

  // 画面をフェードイン
  midScreen.querySelector(".mid-inner").classList.remove("fade-in");
  void midScreen.querySelector(".mid-inner").offsetWidth;
  midScreen.querySelector(".mid-inner").classList.add("fade-in");
}


// ════════════════════════════════════════════
// Layer III 突入前の警告演出
// ════════════════════════════════════════════

function showDeepWarning(nextIndex) {
  const warnScreen = document.getElementById("warning-screen");
  warnScreen.style.display = "flex";

  // カウントダウンして自動で消える（または手動で進む）
  document.getElementById("warning-continue-btn").onclick = () => {
    warnScreen.style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion(nextIndex);
  };

  // 5秒後に自動進行
  setTimeout(() => {
    if (warnScreen.style.display !== "none") {
      warnScreen.style.display = "none";
      document.getElementById("quiz-screen").style.display = "block";
      showQuestion(nextIndex);
    }
  }, 6000);
}


// ════════════════════════════════════════════
// 質問の表示
// ════════════════════════════════════════════

function showQuestion(index) {
  currentQuestionIndex = index;
  const question = QUESTIONS[index];

  // ─── 進捗 ───
  const pct = Math.round((index / QUESTIONS.length) * 100);
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("progress-text").textContent =
    `QUERY ${String(index + 1).padStart(3, "0")} / ${String(QUESTIONS.length).padStart(3, "0")}`;

  // ─── 層ラベル ───
  const layerNames = {
    1: "LAYER-I  DAILY BEHAVIOR",
    2: "LAYER-II COGNITIVE TENDENCY",
    3: "LAYER-III EXTREME RESPONSE",
    4: "LAYER-IV ABYSS"
  };
  document.getElementById("layer-label").textContent = layerNames[question.layer] || "";

  // ─── 精度表示 ───
  document.getElementById("accuracy-display").textContent = `ACCURACY: ${getAccuracy()}%`;

  // ─── 質問テキスト ───
  document.getElementById("question-number").textContent =
    `[ QUERY_${String(question.id).padStart(3, "0")} ]`;
  document.getElementById("question-text").textContent = question.text;

  // ─── 選択肢 ───
  const container = document.getElementById("options-container");
  container.innerHTML = "";
  question.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-label">${opt.label}</span>`;
    btn.style.animationDelay = `${i * 70}ms`;
    btn.addEventListener("click", () => selectAnswer(opt.scores, question.weight || 1, btn, question.layer, index));
    container.appendChild(btn);
  });

  // ─── 解析メッセージをクリア ───
  const msgEl = document.getElementById("analysis-msg");
  if (msgEl) { msgEl.textContent = ""; msgEl.classList.remove("show"); }

  // ─── フェードイン ───
  const card = document.getElementById("question-card");
  card.classList.remove("fade-in");
  void card.offsetWidth;
  card.classList.add("fade-in");
}


// ════════════════════════════════════════════
// 回答処理
// ════════════════════════════════════════════

function selectAnswer(scoreMap, weight, btn, currentLayer, questionIndex) {
  btn.classList.add("selected");
  document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);

  // ─── スコア加算 ───
  Object.entries(scoreMap).forEach(([param, points]) => {
    if (param in scores) scores[param] += points * weight;
  });

  // ─── ゲージを微反応させる（曖昧表示） ───
  flashMiniGauges(scoreMap, weight);

  // ─── ランダム解析メッセージ ───
  showAnalysisMessage();

  // ─── 次の質問 or 中間解析 ───
  setTimeout(() => {
    const nextIndex = questionIndex + 1;
    const nextQuestion = QUESTIONS[nextIndex];

    if (!nextQuestion) {
      // 全問完了
      showResultScreen();
      return;
    }

    const currentLayerNum = currentLayer;
    const nextLayerNum = nextQuestion.layer;

    // 層が変わった → 中間解析を挟む（Layer 1→2, 2→3, 3→4）
    if (nextLayerNum > currentLayerNum && currentLayerNum <= 3) {
      showMidAnalysis(currentLayerNum, nextIndex);
    } else {
      showQuestion(nextIndex);
    }
  }, 420);
}


// ════════════════════════════════════════════
// ミニゲージ反応（曖昧表示）
// ════════════════════════════════════════════

/**
 * 回答後、サイドのミニゲージをわずかに伸ばす。
 * 実スコアを直接見せずに「何かが動いている感」を演出。
 * @param {Object} scoreMap - この回答のスコア
 * @param {number} weight   - 質問の重み
 */
function flashMiniGauges(scoreMap, weight) {
  // 実際の上昇量は分かりにくいよう、ノイズを混ぜる
  Object.entries(scoreMap).forEach(([param, pts]) => {
    if (!(param in gaugeValues)) return;

    // 全パラメータの最大スコアを推計（1問あたり最大4点 × weight × 問題数）
    const estimatedMax = QUESTIONS.length * 4 * 1.5;

    // gaugeValues を 0〜100 で管理（実スコアを非線形にマップ）
    const rawRatio = Math.min(scores[param] / estimatedMax, 1);
    const displayRatio = Math.sqrt(rawRatio); // 非線形: 初期は伸びやすく、後半は鈍化
    gaugeValues[param] = Math.round(displayRatio * 100);
  });

  // 上昇したゲージ上位3つだけを表示（どれが上がったか分かりにくくする）
  const topChanged = Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  renderMiniGauges(topChanged);
}

/**
 * ミニゲージUIを更新する
 * PC：横幅で伸びる縦リスト / スマホ：高さで伸びる横スクロール
 * @param {string[]} highlightParams - 今回ハイライトするパラメータ
 */
function renderMiniGauges(highlightParams = []) {
  const container = document.getElementById("mini-gauge-container");
  if (!container) return;

  container.innerHTML = "";

  // スコア上位8パラメータだけ表示（全20は多すぎる）
  const topParams = Object.entries(gaugeValues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const isMobile = window.innerWidth <= 600;

  topParams.forEach(([param, gVal]) => {
    const isHighlight = highlightParams.includes(param);
    const label = PARAM_LABELS[param] || param;
    const displayPct = Math.max(1, Math.min(95, gVal));

    if (isMobile) {
      // スマホ：縦バー（高さで表示）
      container.innerHTML += `
        <div class="mini-gauge-row ${isHighlight ? "active" : ""}">
          <div class="mini-gauge-track">
            <div class="mini-gauge-bar ${isHighlight ? "highlight" : ""}"
                 style="height:${displayPct}%"></div>
          </div>
          <span class="mini-gauge-label">${label}</span>
        </div>
      `;
    } else {
      // PC：横バー（幅で表示）
      container.innerHTML += `
        <div class="mini-gauge-row ${isHighlight ? "active" : ""}">
          <span class="mini-gauge-label">${label}</span>
          <div class="mini-gauge-track">
            <div class="mini-gauge-bar ${isHighlight ? "highlight" : ""}"
                 style="width:${displayPct}%"></div>
          </div>
        </div>
      `;
    }
  });
}

/** ランダムな解析メッセージを表示 */
function showAnalysisMessage() {
  const msgEl = document.getElementById("analysis-msg");
  if (!msgEl) return;

  const msg = ANALYSIS_MESSAGES[Math.floor(Math.random() * ANALYSIS_MESSAGES.length)];
  msgEl.textContent = msg;
  msgEl.classList.remove("show");
  void msgEl.offsetWidth;
  msgEl.classList.add("show");
}


// ════════════════════════════════════════════
// 結果表示
// ════════════════════════════════════════════

function renderResult(early = false) {
  const primary = diagnosePrimary();
  const sub = diagnoseSub();
  const threat = calcThreatLevel(scores);
  const anomalies = detectAnomalies();

  // ─── バッジ（DEEP / PROVISIONAL） ───
  const badgeEl = document.getElementById("result-badge");
  if (early) {
    badgeEl.textContent = `PROVISIONAL REPORT — ACCURACY: ${getAccuracy()}%`;
    badgeEl.className = "result-badge provisional";
  } else {
    badgeEl.textContent = "DEEP ANALYSIS COMPLETE";
    badgeEl.className = "result-badge deep";
  }

  // ─── タイプ ───
  document.getElementById("result-type-code").textContent = primary.code;
  document.getElementById("result-type-name").textContent = primary.name;
  document.getElementById("result-description").textContent = primary.description;
  document.getElementById("result-detail").textContent = primary.detail.trim();

  // ─── 副タイプ ───
  const subEl = document.getElementById("result-sub-type");
  if (sub) {
    subEl.style.display = "block";
    document.getElementById("sub-type-label").textContent = sub.label;
  } else {
    subEl.style.display = "none";
  }

  // ─── 文明内役割 ───
  document.getElementById("civilization-role").textContent = primary.civilizationRole || "—";

  // ─── 危険度 ───
  const threatEl  = document.getElementById("threat-level");
  const threatBar = document.getElementById("threat-bar");
  const threatMsg = document.getElementById("threat-message");
  threatEl.textContent = threat.level;
  threatEl.style.color = threat.color;
  threatEl.style.textShadow = `0 0 10px ${threat.color}`;
  threatMsg.textContent = threat.message;
  const tw = { MINIMAL:"10%", LOW:"30%", MODERATE:"55%", HIGH:"78%", EXCESSIVE:"100%" };
  threatBar.style.width = tw[threat.level] || "0%";
  threatBar.style.background = `linear-gradient(90deg,transparent,${threat.color})`;

  // ─── 矛盾 ───
  renderAnomalies(anomalies);

  // ─── チャート ───
  drawRadarChart(primary.color);

  // ─── ランキング ───
  renderTopParams();

  // ─── フェードイン ───
  document.getElementById("result-main").classList.remove("fade-in");
  void document.getElementById("result-main").offsetWidth;
  document.getElementById("result-main").classList.add("fade-in");
}

function diagnosePrimary() {
  let best = DIAGNOSIS_TYPES[0], bestScore = -1;
  DIAGNOSIS_TYPES.forEach(t => {
    const s = t.primaryParams.reduce((sum, p) => sum + (scores[p] || 0), 0);
    if (s > bestScore) { bestScore = s; best = t; }
  });
  return best;
}

function diagnoseSub() {
  for (const r of SUB_TYPE_RULES) { if (r.condition(scores)) return r; }
  return null;
}

function detectAnomalies() {
  return ANOMALY_RULES.filter(r => r.condition(scores));
}

function renderAnomalies(anomalies) {
  const c = document.getElementById("anomaly-container");
  c.innerHTML = "";
  if (anomalies.length === 0) {
    c.innerHTML = `<p class="anomaly-none mono">NO ANOMALIES DETECTED.</p>`;
    return;
  }
  anomalies.forEach(a => {
    c.innerHTML += `
      <div class="anomaly-item">
        <p class="anomaly-label mono">⚠ ${a.label}</p>
        <p class="anomaly-detail">${a.detail}</p>
      </div>
    `;
  });
}


// ════════════════════════════════════════════
// レーダーチャート
// ════════════════════════════════════════════

function drawRadarChart(typeColor) {
  const ctx = document.getElementById("radar-chart").getContext("2d");
  const labels = Object.values(PARAM_LABELS);
  const data   = Object.keys(PARAM_LABELS).map(k => scores[k] || 0);

  if (radarChart) radarChart.destroy();

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "VECTOR",
        data,
        backgroundColor: typeColor.replace("0.8","0.12"),
        borderColor: typeColor,
        borderWidth: 2,
        pointBackgroundColor: typeColor,
        pointBorderColor: "#0a0a0f",
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0,
          grid:        { color:"rgba(0,200,255,0.12)" },
          angleLines:  { color:"rgba(0,200,255,0.18)" },
          pointLabels: { color:"rgba(0,200,255,0.75)", font:{ size:10, family:"'Noto Sans JP',sans-serif" } },
          ticks:       { color:"rgba(0,200,255,0.35)", backdropColor:"transparent", font:{ size:8 } }
        }
      },
      animation: { duration:1400, easing:"easeInOutQuart" }
    }
  });
}


// ════════════════════════════════════════════
// 上位パラメータランキング
// ════════════════════════════════════════════

// ════════════════════════════════════════════
// シェア画像生成（Canvas API）
// ════════════════════════════════════════════

/**
 * 診断結果を画像化してダウンロードする
 * Canvas に直接描画するので、外部サービス不要・完全ローカル動作
 */
function downloadShareImage() {
  const canvas = document.getElementById("share-canvas");
  const ctx = canvas.getContext("2d");

  const W = 800, H = 480;
  canvas.width = W;
  canvas.height = H;

  // ── 背景 ──
  ctx.fillStyle = "#080c12";
  ctx.fillRect(0, 0, W, H);

  // 走査線風ストライプ（薄く）
  ctx.fillStyle = "rgba(0,200,255,0.018)";
  for (let y = 0; y < H; y += 4) { ctx.fillRect(0, y, W, 2); }

  // ── 枠線（外枠） ──
  ctx.strokeStyle = "rgba(0,200,255,0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, W - 32, H - 32);

  // 四隅の L字装飾
  const corners = [[16,16],[W-16,16],[16,H-16],[W-16,H-16]];
  const dirs = [[1,1],[-1,1],[1,-1],[-1,-1]];
  ctx.strokeStyle = "rgba(0,200,255,0.8)";
  ctx.lineWidth = 2;
  corners.forEach(([cx,cy], i) => {
    const [dx,dy] = dirs[i];
    ctx.beginPath();
    ctx.moveTo(cx + dx*24, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy*24);
    ctx.stroke();
  });

  // ── ヘッダー文字 ──
  ctx.font = "13px 'Courier New', monospace";
  ctx.fillStyle = "rgba(0,200,255,0.5)";
  ctx.fillText("INST.#0047 // HUMAN VECTOR ANALYSIS", 32, 44);

  // ── 施設ID右端 ──
  ctx.textAlign = "right";
  ctx.fillText("ANALYSIS REPORT", W - 32, 44);
  ctx.textAlign = "left";

  // 区切り線
  ctx.strokeStyle = "rgba(0,200,255,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, 54); ctx.lineTo(W - 32, 54);
  ctx.stroke();

  // ── タイプコード ──
  const typeCode = document.getElementById("result-type-code").textContent;
  ctx.font = "12px 'Courier New', monospace";
  ctx.fillStyle = "rgba(0,200,255,0.45)";
  ctx.fillText(typeCode, 32, 84);

  // ── タイプ名（大きく） ──
  const typeName = document.getElementById("result-type-name").textContent;
  ctx.font = "bold 40px 'Noto Sans JP', 'Hiragino Sans', sans-serif";
  ctx.fillStyle = "#00c8ff";
  // 発光効果
  ctx.shadowColor = "rgba(0,200,255,0.6)";
  ctx.shadowBlur = 20;
  ctx.fillText(typeName, 32, 134);
  ctx.shadowBlur = 0;

  // ── 一行説明 ──
  const desc = document.getElementById("result-description").textContent;
  ctx.font = "14px 'Courier New', monospace";
  ctx.fillStyle = "#ff9800";
  ctx.fillText(desc, 32, 162);

  // ── 文明内役割 ──
  const role = document.getElementById("civilization-role").textContent;
  ctx.font = "12px 'Courier New', monospace";
  ctx.fillStyle = "rgba(0,200,255,0.4)";
  ctx.fillText("// CIVILIZATION ROLE:", 32, 192);
  ctx.fillStyle = "#50c878";
  ctx.fillText(role, 200, 192);

  // ── 危険度 ──
  const threatLevel = document.getElementById("threat-level").textContent;
  const threatColor = document.getElementById("threat-level").style.color;
  ctx.font = "12px 'Courier New', monospace";
  ctx.fillStyle = "rgba(0,200,255,0.4)";
  ctx.fillText("THREAT LEVEL :", 32, 220);
  ctx.font = "bold 16px 'Courier New', monospace";
  ctx.fillStyle = threatColor || "#ff9800";
  ctx.shadowColor = threatColor || "#ff9800";
  ctx.shadowBlur = 10;
  ctx.fillText(threatLevel, 160, 220);
  ctx.shadowBlur = 0;

  // 区切り線
  ctx.strokeStyle = "rgba(0,200,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(32, 238); ctx.lineTo(W - 32, 238);
  ctx.stroke();

  // ── 上位5パラメータ バーグラフ ──
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]).slice(0,5);
  const maxVal = sorted[0][1] || 1;
  const barAreaW = W - 64;
  const barH = 18;
  const barGap = 32;
  const barStartY = 260;

  ctx.font = "11px 'Courier New', monospace";
  sorted.forEach(([key, val], i) => {
    const y = barStartY + i * barGap;
    const barW = Math.round((val / maxVal) * (barAreaW * 0.5));
    const label = PARAM_LABELS[key] || key;

    // ラベル
    ctx.fillStyle = "rgba(0,200,255,0.55)";
    ctx.fillText(`0${i+1}  ${label}`, 32, y + 13);

    // バー背景
    ctx.fillStyle = "rgba(0,200,255,0.06)";
    ctx.fillRect(200, y, barAreaW * 0.5, barH);

    // バー本体
    const grad = ctx.createLinearGradient(200, y, 200 + barW, y);
    grad.addColorStop(0, "rgba(0,200,255,0.4)");
    grad.addColorStop(1, "rgba(0,200,255,0.9)");
    ctx.fillStyle = grad;
    ctx.fillRect(200, y, barW, barH);

    // 数値
    ctx.fillStyle = "rgba(0,200,255,0.7)";
    ctx.fillText(String(val), 200 + barAreaW * 0.5 + 8, y + 13);
  });

  // ── 副タイプ（あれば） ──
  const subEl = document.getElementById("result-sub-type");
  if (subEl && subEl.style.display !== "none") {
    const subLabel = document.getElementById("sub-type-label").textContent;
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillStyle = "rgba(0,200,255,0.35)";
    ctx.fillText("// SECONDARY:", 32, H - 50);
    ctx.fillStyle = "rgba(180,100,255,0.85)";
    ctx.fillText(subLabel, 130, H - 50);
  }

  // ── フッター ──
  ctx.font = "10px 'Courier New', monospace";
  ctx.fillStyle = "rgba(90,120,154,0.45)";
  ctx.textAlign = "center";
  ctx.fillText("INST.#0047 // HUMAN VECTOR ANALYSIS SYSTEM", W / 2, H - 26);
  ctx.textAlign = "left";

  // ── ダウンロード ──
  const link = document.createElement("a");
  link.download = `HVA_${typeName}_REPORT.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * X（Twitter）にシェアする
 * テキストと診断URLをXの投稿フォームに渡す
 */
function shareToX() {
  const typeName  = document.getElementById("result-type-name").textContent;
  const typeCode  = document.getElementById("result-type-code").textContent;
  const threat    = document.getElementById("threat-level").textContent;
  const role      = document.getElementById("civilization-role").textContent;
  const pageUrl   = encodeURIComponent(window.location.href);

  const text = encodeURIComponent(
    `【人間ベクトル分析診断】\n` +
    `${typeCode}\n` +
    `タイプ：${typeName}\n` +
    `文明内役割：${role}\n` +
    `THREAT LEVEL：${threat}\n` +
    `#人間ベクトル分析 #HumanVectorAnalysis`
  );

  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`, "_blank");
}

function renderTopParams() {
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]).slice(0,7);
  const maxVal = sorted[0][1] || 1;
  const c = document.getElementById("top-params");
  c.innerHTML = "";

  sorted.forEach(([key,val],i) => {
    const pct = Math.round((val/maxVal)*100);
    c.innerHTML += `
      <div class="param-row">
        <span class="param-rank">${String(i+1).padStart(2,"0")}</span>
        <span class="param-name">${PARAM_LABELS[key]||key}</span>
        <div class="param-bar-wrap"><div class="param-bar" style="width:${pct}%"></div></div>
        <span class="param-value">${val}</span>
      </div>
    `;
  });
}
