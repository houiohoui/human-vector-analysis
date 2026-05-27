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
  window._axisMapRunning = false; // マップアニメーション停止
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

  // ─── タイプアイコン ───
  renderTypeIcon(primary.id, "normal");

  // ─── チャート ───
  drawRadarChart(primary.color);

  // ─── 二軸マップ + 文明マップ ───
  window._axisMapRunning = false; // 前回のアニメを停止
  setTimeout(drawAllMaps, 300);   // DOMが整った後に描画

  // ─── ランキング ───
  renderTopParams();

  // ─── パラメータ詳細 ───
  renderParamDetails();

  // ─── タイプ考察 ───
  renderTypeInsight(primary);

  // ─── タイプ相関 ───
  renderTypeRelations(primary);

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


// ════════════════════════════════════════════
// タイプアイコン表示
// ════════════════════════════════════════════

/** 現在表示中のタイプID（アイコン切り替え用） */
let currentIconTypeId = null;

function renderTypeIcon(typeId, state) {
  currentIconTypeId = typeId;
  const wrap = document.getElementById("result-type-icon");
  if (!wrap) return;
  wrap.innerHTML = getTypeIcon(typeId, state);
  // スキャンライン演出クラス付与
  wrap.setAttribute("data-type", typeId);
}

/** NORMAL / RUNAWAY / MATURE 切り替えボタン */
function switchIconState(state, btn) {
  if (!currentIconTypeId) return;
  renderTypeIcon(currentIconTypeId, state);
  // ボタンのactiveクラスを切り替え
  const btns = document.querySelectorAll(".icon-state-btn");
  btns.forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  // ラベル更新
  const label = document.getElementById("icon-state-label");
  if (label) {
    const map = { normal: "SUBJECT VISUAL RECORD", runaway: "⚠ RUNAWAY STATE", mature: "▶ MATURE STATE" };
    label.textContent = map[state] || "SUBJECT VISUAL RECORD";
    label.className = "icon-state-label mono " + (state !== "normal" ? "state-label-" + state : "");
  }
}

// ════════════════════════════════════════════
// パラメータ詳細解説レンダリング
// 上位5パラメータについて説明・高い場合・暴走時 を表示
// ════════════════════════════════════════════

function renderParamDetails() {
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]).slice(0,5);
  const maxAll  = sorted[0][1] || 1;
  const c = document.getElementById("param-detail-container");
  if (!c) return;
  c.innerHTML = "";

  sorted.forEach(([key, val]) => {
    const detail = PARAM_DETAILS[key];
    if (!detail) return;

    // 数値帯で状態テキストを選択
    const ratio = val / maxAll;
    let stateText, stateClass;
    if (ratio >= 0.85) {
      stateText  = "// EXCESSIVE: " + detail.runaway;
      stateClass = "state-excessive";
    } else if (ratio >= 0.65) {
      stateText  = "// HIGH: " + detail.high;
      stateClass = "state-high";
    } else if (ratio >= 0.4) {
      stateText  = "// MID: " + detail.desc;
      stateClass = "state-mid";
    } else {
      stateText  = "// LOW: " + detail.low;
      stateClass = "state-low";
    }

    c.innerHTML += `
      <div class="param-detail-item">
        <div class="param-detail-header">
          <span class="param-detail-name mono">${detail.label}</span>
          <span class="param-detail-val mono">${val}</span>
        </div>
        <p class="param-detail-desc">${detail.desc}</p>
        <p class="param-detail-state ${stateClass} mono">${stateText}</p>
      </div>
    `;
  });
}


// ════════════════════════════════════════════
// タイプ考察レンダリング（長所・弱点・暴走・ストレス・成熟・環境）
// ════════════════════════════════════════════

function renderTypeInsight(type) {
  // 長所
  const sl = document.getElementById("insight-strengths");
  if (sl) {
    sl.innerHTML = (type.strengths || []).map(s => `<li>${s}</li>`).join("");
  }
  // 弱点
  const wl = document.getElementById("insight-weaknesses");
  if (wl) {
    wl.innerHTML = (type.weaknesses || []).map(w => `<li>${w}</li>`).join("");
  }
  // 暴走
  const rw = document.getElementById("insight-runaway");
  if (rw) rw.textContent = type.runaway || "—";
  // ストレス
  const st = document.getElementById("insight-stress");
  if (st) st.textContent = type.stress || "—";
  // 成熟
  const mt = document.getElementById("insight-mature");
  if (mt) mt.textContent = type.mature || "—";
  // 環境
  const eb = document.getElementById("insight-env-best");
  if (eb) eb.textContent = (type.environment && type.environment.best) || "—";
  const ew = document.getElementById("insight-env-worst");
  if (ew) ew.textContent = (type.environment && type.environment.worst) || "—";
}


// ════════════════════════════════════════════
// タイプ相関レンダリング
// ════════════════════════════════════════════

// ════════════════════════════════════════════
// VECTOR AXIS MAP（二軸マップ）
// X軸: 現実(REALITY) ←→ 抽象(ABSTRACTION)
// Y軸: 秩序(ORDER)   ←→ 革命(REVOLUTION)
//
// 各パラメータの軸への寄与度（-1.0〜+1.0）
//   X軸(reality←→abstraction): 負=現実寄り、正=抽象寄り
//   Y軸(order←→revolution):    負=秩序寄り、正=革命寄り
// ════════════════════════════════════════════

/**
 * 20パラメータ → X/Y座標へのマッピング係数
 * 各パラメータが2軸にどれだけ影響するか。
 * xWeight: 負=現実側、正=抽象側
 * yWeight: 負=秩序側、正=革命側
 */
const PARAM_AXIS_WEIGHTS = {
  // ── X軸(現実←→抽象) ──
  reality:     { x: -0.9, y: -0.2 },  // 強く現実側
  work:        { x: -0.7, y: -0.3 },  // 現実×秩序
  endurance:   { x: -0.5, y: -0.4 },  // 現実×秩序
  love:        { x: -0.3, y:  0.0 },  // やや現実側
  management:  { x: -0.4, y: -0.6 },  // 現実×強秩序
  leadership:  { x: -0.2, y:  0.2 },  // 中央近く
  observer:    { x:  0.2, y: -0.3 },  // やや抽象×秩序
  solitude:    { x:  0.3, y:  0.1 },  // やや抽象
  expert:      { x:  0.1, y: -0.2 },  // 中央近く
  otaku:       { x:  0.4, y:  0.0 },  // やや抽象
  freedom:     { x:  0.2, y:  0.6 },  // やや抽象×革命
  creativity:  { x:  0.5, y:  0.5 },  // 抽象×革命
  unique:      { x:  0.6, y:  0.4 },  // 抽象×革命
  architect:   { x:  0.7, y: -0.1 },  // 強抽象×やや秩序
  research:    { x:  0.6, y:  0.0 },  // 抽象
  genius:      { x:  0.8, y:  0.2 },  // 強抽象×やや革命
  philosophy:  { x:  0.8, y:  0.3 },  // 強抽象
  meta:        { x:  0.9, y:  0.1 },  // 最強抽象
  revolution:  { x:  0.3, y:  0.9 },  // やや抽象×最強革命
  mystic:      { x:  0.7, y:  0.5 }   // 抽象×革命
};

/**
 * 12タイプの固定座標（事前計算済み＋手調整）
 * x: -1(現実)〜+1(抽象), y: -1(秩序)〜+1(革命)
 * Canvas上では: x→横、y→縦(上がプラス)
 */
const TYPE_AXIS_COORDS = {
  abyss_architect:      { x:  0.78, y:  0.10 },
  civilization_operator:{ x: -0.60, y: -0.55 },
  solitary_observer:    { x:  0.50, y: -0.10 },
  mad_researcher:       { x:  0.55, y:  0.25 },
  revolutionary:        { x:  0.25, y:  0.82 },
  mystic_seeker:        { x:  0.62, y:  0.55 },
  altruist_operator:    { x: -0.35, y:  0.15 },
  reality_adapter:      { x: -0.72, y: -0.40 },
  lone_craftsman:       { x:  0.05, y: -0.35 },
  creative_impulse:     { x:  0.45, y:  0.70 },
  social_circulator:    { x: -0.45, y:  0.30 },
  harmony_supporter:    { x: -0.50, y: -0.15 }
};

/**
 * スコアから自分の軸座標を算出する
 * @param {Object} scores - { paramId: number }
 * @returns {{ x: number, y: number }} -1〜+1
 */
function calcAxisCoords(scores) {
  const total = Object.values(scores).reduce((s, v) => s + v, 0) || 1;
  let x = 0, y = 0;
  for (const [param, val] of Object.entries(scores)) {
    const w = PARAM_AXIS_WEIGHTS[param];
    if (!w) continue;
    const ratio = val / total;
    x += w.x * ratio;
    y += w.y * ratio;
  }
  // 正規化：振れ幅が小さいので2倍スケール（最大でも±1に収める）
  x = Math.max(-1, Math.min(1, x * 4));
  y = Math.max(-1, Math.min(1, y * 4));
  return { x, y };
}

/**
 * 二軸マップを描画する（Canvas API）
 */
function drawAxisMap() {
  const canvas = document.getElementById("axis-map-canvas");
  if (!canvas) return;

  // レスポンシブなサイズ設定
  const containerWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : 460;
  const size = Math.min(460, Math.max(280, containerWidth - 20));
  canvas.width  = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const W   = size, H = size;
  const cx  = W / 2, cy = H / 2;
  const R   = W * 0.42; // プロット半径

  /** 論理座標 → Canvas座標 */
  function toCanvas(lx, ly) {
    return { cx: cx + lx * R, cy: cy - ly * R };
  }

  // ── 背景 ──
  ctx.fillStyle = "#070c16";
  ctx.fillRect(0, 0, W, H);

  // 走査線
  ctx.fillStyle = "rgba(0,200,255,0.012)";
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);

  // ── グリッド（薄い同心円） ──
  for (const r of [0.25, 0.5, 0.75, 1.0]) {
    ctx.beginPath();
    ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,200,255,${r === 1.0 ? 0.12 : 0.07})`;
    ctx.lineWidth   = r === 1.0 ? 0.8 : 0.5;
    ctx.stroke();
  }

  // ── 四象限の色（背景） ──
  const quadColors = [
    { x1: cx, y1: 0,  x2: W-cx, y2: cy, color: "rgba(180,100,255,0.025)" }, // 右上:抽象×革命
    { x1: 0,  y1: 0,  x2: cx,   y2: cy, color: "rgba(255,100,80,0.02)"  }, // 左上:現実×革命
    { x1: 0,  y1: cy, x2: cx,   y2: H-cy, color: "rgba(0,200,255,0.025)" }, // 左下:現実×秩序
    { x1: cx, y1: cy, x2: W-cx, y2: H-cy, color: "rgba(255,180,0,0.02)"  }  // 右下:抽象×秩序
  ];
  for (const q of quadColors) {
    ctx.fillStyle = q.color;
    ctx.fillRect(q.x1, q.y1, q.x2, q.y2);
  }

  // ── 軸線 ──
  ctx.strokeStyle = "rgba(0,200,255,0.22)";
  ctx.lineWidth   = 0.8;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
  ctx.setLineDash([]);

  // ── 象限ラベル（コーナー） ──
  const quadLabels = [
    { lx: -0.78, ly:  0.78, text: ["REALITY×", "REVOLUTION"], color: "rgba(255,100,80,0.35)" },
    { lx:  0.78, ly:  0.78, text: ["ABSTRACTION×", "REVOLUTION"], color: "rgba(180,100,255,0.35)" },
    { lx: -0.78, ly: -0.78, text: ["REALITY×", "ORDER"], color: "rgba(0,200,255,0.3)" },
    { lx:  0.78, ly: -0.78, text: ["ABSTRACTION×", "ORDER"], color: "rgba(255,180,0,0.3)" }
  ];
  ctx.font = `${Math.round(W * 0.021)}px monospace`;
  for (const ql of quadLabels) {
    const p = toCanvas(ql.lx, ql.ly);
    ctx.fillStyle = ql.color;
    ctx.textAlign = ql.lx < 0 ? "left" : "right";
    ql.text.forEach((line, i) => {
      ctx.fillText(line, p.cx, p.cy + i * Math.round(W * 0.026));
    });
  }
  ctx.textAlign = "left";

  // ── 全タイプをプロット ──
  for (const t of DIAGNOSIS_TYPES) {
    const coord = TYPE_AXIS_COORDS[t.id];
    if (!coord) continue;
    const p = toCanvas(coord.x, coord.y);

    // 外側グロー（タイプカラー）
    const grad = ctx.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, W * 0.055);
    grad.addColorStop(0, t.color.replace("0.8", "0.22"));
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, W * 0.055, 0, Math.PI * 2);
    ctx.fill();

    // 点
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, W * 0.026, 0, Math.PI * 2);
    ctx.fillStyle = t.color.replace("0.8", "0.55");
    ctx.fill();

    // タイプコード（小）
    ctx.fillStyle = t.color.replace("0.8", "0.5");
    ctx.font      = `${Math.round(W * 0.02)}px monospace`;
    ctx.textAlign = coord.x > 0 ? "left" : "right";
    const offset  = W * 0.033;
    ctx.fillText(
      t.code.split("//")[0].trim(),
      p.cx + (coord.x > 0 ? offset : -offset),
      p.cy + Math.round(W * 0.012)
    );
  }
  ctx.textAlign = "left";

  // ── 自分の座標 ──
  const myCoord = calcAxisCoords(scores);
  const myP     = toCanvas(myCoord.x, myCoord.y);

  // パルスリング
  const now = Date.now();
  const pulse = (Math.sin(now / 500) + 1) / 2;
  const grad2 = ctx.createRadialGradient(myP.cx, myP.cy, 0, myP.cx, myP.cy, W * 0.09);
  grad2.addColorStop(0, `rgba(255,255,255,${0.12 + pulse * 0.08})`);
  grad2.addColorStop(1, "transparent");
  ctx.fillStyle = grad2;
  ctx.beginPath();
  ctx.arc(myP.cx, myP.cy, W * 0.09, 0, Math.PI * 2);
  ctx.fill();

  // 白い点（自分）
  ctx.beginPath();
  ctx.arc(myP.cx, myP.cy, W * 0.038, 0, Math.PI * 2);
  ctx.fillStyle   = "rgba(255,255,255,0.95)";
  ctx.shadowBlur  = 12;
  ctx.shadowColor = "#fff";
  ctx.fill();
  ctx.shadowBlur  = 0;

  // 中心点
  ctx.beginPath();
  ctx.arc(myP.cx, myP.cy, W * 0.015, 0, Math.PI * 2);
  ctx.fillStyle = "#070c16";
  ctx.fill();

  // YOU ラベル
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font      = `bold ${Math.round(W * 0.028)}px monospace`;
  ctx.textAlign = myCoord.x > 0 ? "right" : "left";
  ctx.fillText(
    "▶ YOU",
    myP.cx + (myCoord.x > 0 ? -(W * 0.046) : W * 0.046),
    myP.cy - W * 0.03
  );
  ctx.textAlign = "left";

  // 更新（アニメーションループ）
  if (window._axisMapRunning) {
    requestAnimationFrame(drawAxisMap);
  }
}

/** 二軸マップの凡例を生成 */
function buildAxisMapLegend() {
  const legend = document.getElementById("axis-map-legend");
  if (!legend) return;
  const myCoord = calcAxisCoords(scores);

  // 最も近いタイプを3つ探す
  const distances = DIAGNOSIS_TYPES.map(t => {
    const tc = TYPE_AXIS_COORDS[t.id];
    const dx = tc.x - myCoord.x, dy = tc.y - myCoord.y;
    return { t, dist: Math.sqrt(dx * dx + dy * dy) };
  }).sort((a, b) => a.dist - b.dist).slice(0, 3);

  const primary = diagnosePrimary();

  legend.innerHTML = `
    <p class="axis-legend-title mono">// YOUR COORDINATE</p>
    <div class="axis-you-coord">
      <span class="mono">X: ${myCoord.x >= 0 ? "ABSTRACTION" : "REALITY"}&nbsp;&nbsp;${Math.abs(myCoord.x * 100).toFixed(0)}%</span>
      <span class="mono">Y: ${myCoord.y >= 0 ? "REVOLUTION" : "ORDER"}&nbsp;&nbsp;${Math.abs(myCoord.y * 100).toFixed(0)}%</span>
    </div>
    <p class="axis-legend-title mono" style="margin-top:14px;">// NEAREST TYPES</p>
    <div class="axis-nearest-list">
      ${distances.map((d, i) => `
        <div class="axis-nearest-item ${d.t.id === primary.id ? "is-self" : ""}">
          <span class="axis-nearest-dot" style="background:${d.t.color.replace("0.8","0.7")};"></span>
          <span class="axis-nearest-code mono" style="color:${d.t.color};">${d.t.code.split("//")[0].trim()}</span>
          <span class="axis-nearest-name">${d.t.name}</span>
          ${d.t.id === primary.id ? '<span class="axis-you-badge mono">▶ YOU</span>' : ""}
        </div>
      `).join("")}
    </div>
    <p class="axis-map-note-text mono" id="axis-map-note"></p>
  `;

  // 座標説明文
  const noteEl = document.getElementById("axis-map-note");
  if (noteEl) {
    const xDir = myCoord.x >= 0 ? "抽象・概念" : "現実・実践";
    const yDir = myCoord.y >= 0 ? "革命・変革" : "秩序・維持";
    noteEl.textContent =
      `// この個体は ${xDir} 方向かつ ${yDir} 方向のベクトルを持つ。` +
      `座標 (${(myCoord.x).toFixed(2)}, ${(myCoord.y).toFixed(2)}) に位置する。`;
  }
}

/**
 * 文明構造マップを描画する
 * 4つの文明圏: 研究都市 / 官僚社会 / 芸術共同体 / 崩壊後文明
 */
const CIVILIZATION_ZONES = [
  {
    id:    "research_city",
    name:  "研究都市",
    nameEn:"RESEARCH CITY",
    desc:  "知的探求が文明の中枢。孤高と協調が共存する高密度思考圏。",
    color: "rgba(0,200,255,0.15)",
    borderColor: "rgba(0,200,255,0.3)",
    cx: 0.55, cy: -0.3,  // 軸マップ座標（x:抽象、y:やや秩序）
    r: 0.40,
    textColor: "rgba(0,200,255,0.7)"
  },
  {
    id:    "bureaucratic",
    name:  "官僚社会",
    nameEn:"BUREAUCRATIC ORDER",
    desc:  "秩序と継続性を最優先とする安定文明。個の自由は制限されるが基盤は強固。",
    color: "rgba(255,160,0,0.12)",
    borderColor: "rgba(255,160,0,0.3)",
    cx: -0.55, cy: -0.55,
    r: 0.38,
    textColor: "rgba(255,160,0,0.7)"
  },
  {
    id:    "art_commune",
    name:  "芸術共同体",
    nameEn:"ART COMMUNE",
    desc:  "創造と感性が文明を駆動する。変化が日常であり、構造は流動的。",
    color: "rgba(255,80,180,0.12)",
    borderColor: "rgba(255,80,180,0.3)",
    cx: 0.40, cy: 0.60,
    r: 0.38,
    textColor: "rgba(255,80,180,0.7)"
  },
  {
    id:    "post_collapse",
    name:  "崩壊後文明",
    nameEn:"POST-COLLAPSE",
    desc:  "既存秩序が崩れた後の再構築期。革命家と設計者が文明の核になる。",
    color: "rgba(255,60,60,0.1)",
    borderColor: "rgba(255,60,60,0.25)",
    cx: -0.20, cy: 0.65,
    r: 0.40,
    textColor: "rgba(255,100,80,0.7)"
  }
];

/** types.jsのcivilizationFitからゾーンとの親和性を算出 */
function calcCivScore(typeId, zoneId) {
  const t = DIAGNOSIS_TYPES.find(d => d.id === typeId);
  if (!t || !t.civilizationFit) return 0;
  const MAP_CIV = {
    research_city:  "研究都市",
    bureaucratic:   "官僚組織",
    art_commune:    "芸術共同体",
    post_collapse:  "崩壊後文明"
  };
  const key = MAP_CIV[zoneId];
  const val  = t.civilizationFit[key];
  if (!val) return 0.5;
  return { "◎": 1.0, "○": 0.7, "△": 0.35, "×": 0.05 }[val] ?? 0.5;
}

/** 文明マップ描画 */
function drawCivMap() {
  const canvas = document.getElementById("civ-map-canvas");
  if (!canvas) return;

  const containerWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : 460;
  const W = Math.min(460, Math.max(280, containerWidth - 20));
  const H = Math.round(W * 0.74);
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d");
  const cx  = W / 2, cy = H / 2;
  const R   = Math.min(W, H) * 0.43;

  function toCanvas(lx, ly) {
    return { cx: cx + lx * R, cy: cy - ly * R * 0.85 };
  }

  // 背景
  ctx.fillStyle = "#070c16";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(0,200,255,0.01)";
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);

  const primary  = diagnosePrimary();
  const myCoord  = calcAxisCoords(scores);

  // ── 文明圏を描画 ──
  for (const zone of CIVILIZATION_ZONES) {
    const p = toCanvas(zone.cx, zone.cy);
    const pr = zone.r * R;

    // スコア算出（主タイプとの親和性）
    const affinity = calcCivScore(primary.id, zone.id);

    // 自分のベクトル座標とゾーン中心の距離
    const dx = myCoord.x - zone.cx;
    const dy = myCoord.y - zone.cy;
    const distToZone = Math.sqrt(dx * dx + dy * dy);
    const isNearest  = distToZone < zone.r + 0.2;

    // ゾーン背景グラデーション
    const grad = ctx.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, pr);
    grad.addColorStop(0,   zone.color.replace("0.1", isNearest ? "0.25" : "0.08"));
    grad.addColorStop(0.7, zone.color.replace("0.1", isNearest ? "0.12" : "0.03"));
    grad.addColorStop(1,   "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, pr, 0, Math.PI * 2);
    ctx.fill();

    // 枠線
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, pr, 0, Math.PI * 2);
    ctx.strokeStyle = isNearest
      ? zone.borderColor.replace("0.3", "0.65")
      : zone.borderColor.replace("0.3", "0.2");
    ctx.lineWidth   = isNearest ? 1.5 : 0.8;
    if (!isNearest) ctx.setLineDash([3, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // ゾーン名ラベル
    ctx.fillStyle  = zone.textColor.replace("0.7", isNearest ? "0.9" : "0.45");
    ctx.font       = `${Math.round(W * 0.028)}px monospace`;
    ctx.textAlign  = "center";
    ctx.fillText(zone.nameEn, p.cx, p.cy - pr * 0.65);
    ctx.font = `${Math.round(W * 0.022)}px 'Noto Sans JP',sans-serif`;
    ctx.fillText(zone.name, p.cx, p.cy - pr * 0.65 + Math.round(W * 0.032));
    ctx.textAlign = "left";
  }

  // ── 全タイプ点 ──
  for (const t of DIAGNOSIS_TYPES) {
    const ac = TYPE_AXIS_COORDS[t.id];
    if (!ac) continue;
    const p = toCanvas(ac.x, ac.y);

    ctx.beginPath();
    ctx.arc(p.cx, p.cy, W * 0.018, 0, Math.PI * 2);
    ctx.fillStyle = t.id === primary.id
      ? t.color.replace("0.8", "0.9")
      : t.color.replace("0.8", "0.3");
    ctx.fill();

    if (t.id === primary.id) {
      // 主タイプは大きく光る
      const grd = ctx.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, W * 0.06);
      grd.addColorStop(0, t.color.replace("0.8", "0.2"));
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.cx, p.cy, W * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── 自分の座標 ──
  const myP = toCanvas(myCoord.x, myCoord.y);
  ctx.beginPath();
  ctx.arc(myP.cx, myP.cy, W * 0.032, 0, Math.PI * 2);
  ctx.fillStyle   = "rgba(255,255,255,0.9)";
  ctx.shadowBlur  = 14;
  ctx.shadowColor = "#fff";
  ctx.fill();
  ctx.shadowBlur  = 0;
  ctx.beginPath();
  ctx.arc(myP.cx, myP.cy, W * 0.013, 0, Math.PI * 2);
  ctx.fillStyle = "#070c16";
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font      = `bold ${Math.round(W * 0.026)}px monospace`;
  ctx.textAlign = myCoord.x > 0 ? "right" : "left";
  ctx.fillText("▶ YOU",
    myP.cx + (myCoord.x > 0 ? -(W * 0.04) : W * 0.04),
    myP.cy - W * 0.026
  );
  ctx.textAlign = "left";

  // 凡例
  buildCivMapLegend(primary, myCoord);
}

/** 文明マップの凡例を生成 */
function buildCivMapLegend(primary, myCoord) {
  const legend = document.getElementById("civ-map-legend");
  if (!legend) return;

  // 各ゾーンへの距離で近い順にソート
  const ranked = CIVILIZATION_ZONES.map(zone => {
    const dx = myCoord.x - zone.cx;
    const dy = myCoord.y - zone.cy;
    const dist     = Math.sqrt(dx * dx + dy * dy);
    const affinity = calcCivScore(primary.id, zone.id);
    return { zone, dist, affinity };
  }).sort((a, b) => a.dist - b.dist);

  legend.innerHTML = `
    <p class="civ-legend-title mono">// CIVILIZATION AFFINITY RANKING</p>
    <div class="civ-rank-list">
      ${ranked.map((item, i) => {
        const pct = Math.round((1 - Math.min(item.dist / 2, 1)) * 100);
        const fitLabel = ["◎ IDEAL", "○ COMPATIBLE", "△ ADAPTABLE", "× HOSTILE"][
          item.affinity >= 0.9 ? 0 : item.affinity >= 0.6 ? 1 : item.affinity >= 0.3 ? 2 : 3
        ];
        return `
          <div class="civ-rank-item ${i === 0 ? "civ-rank-top" : ""}">
            <div class="civ-rank-header">
              <span class="civ-rank-num mono">${["01","02","03","04"][i]}</span>
              <span class="civ-rank-name" style="color:${item.zone.textColor};">${item.zone.name}</span>
              <span class="civ-rank-en mono" style="color:${item.zone.textColor.replace("0.7","0.45")};">${item.zone.nameEn}</span>
              <span class="civ-fit-badge mono">${fitLabel}</span>
            </div>
            <div class="civ-rank-bar-wrap">
              <div class="civ-rank-bar" style="width:${pct}%;background:${item.zone.borderColor};"></div>
            </div>
            ${i === 0 ? `<p class="civ-rank-desc">${item.zone.desc}</p>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/** 両マップを結果画面に描画（showResult から呼ばれる） */
function drawAllMaps() {
  window._axisMapRunning = true;
  drawAxisMap();
  buildAxisMapLegend();
  drawCivMap();
}

// ════════════════════════════════════════════
// MENTAL STATE ANALYSIS
// 追加10問でTYPE × STATEの現在状態を解析する。
// メイン診断とは完全分離。scores には触れない。
// ════════════════════════════════════════════

let stateQuestionIndex = 0;
let stateScores        = {};

/** 結果画面の「INITIATE STATE ANALYSIS」ボタンから呼ばれる */
function startStateAnalysis() {
  // 初期化
  stateQuestionIndex = 0;
  stateScores = {};
  for (const sid of Object.keys(MENTAL_STATES)) stateScores[sid] = 0;

  // CTAパネルを非表示
  const cta = document.getElementById("state-cta-panel");
  if (cta) cta.style.display = "none";

  // モーダルを開く
  const modal = document.getElementById("state-modal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";

  renderStateQuestion();
}

/** SKIP ボタン */
function skipStateAnalysis() {
  const cta = document.getElementById("state-cta-panel");
  if (cta) cta.style.display = "none";
}

/** ABORT ボタン（モーダル内） */
function abortStateAnalysis() {
  const modal = document.getElementById("state-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  // CTAを再表示
  const cta = document.getElementById("state-cta-panel");
  if (cta) cta.style.display = "";
}

/** 現在の質問を描画する */
function renderStateQuestion() {
  const q     = STATE_QUESTIONS[stateQuestionIndex];
  const total = STATE_QUESTIONS.length;

  // 進捗バー
  const fill  = document.getElementById("state-prog-fill");
  const label = document.getElementById("state-prog-label");
  if (fill)  fill.style.width  = `${((stateQuestionIndex) / total) * 100}%`;
  if (label) label.textContent = `${stateQuestionIndex + 1} / ${total}`;

  // 質問テキスト
  const preface = document.getElementById("state-q-preface");
  const text    = document.getElementById("state-q-text");
  if (preface) preface.textContent = q.preface;
  if (text)    text.textContent    = q.text;

  // フッターライン
  const footer = document.getElementById("state-modal-footer");
  if (footer) footer.textContent = `STATE PROBE ${String(stateQuestionIndex + 1).padStart(2,"0")} — READING STRUCTURAL CONDITION...`;

  // 選択肢を描画
  const opts = document.getElementById("state-options");
  if (!opts) return;
  opts.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className   = "state-opt-btn mono";
    btn.textContent = opt.text;
    btn.onclick     = () => selectStateOption(opt);
    opts.appendChild(btn);
  });
}

/** 選択肢クリック時 */
function selectStateOption(opt) {
  // スコア加算
  for (const [sid, val] of Object.entries(opt.scores)) {
    if (stateScores[sid] !== undefined) stateScores[sid] += val;
  }

  stateQuestionIndex++;

  if (stateQuestionIndex < STATE_QUESTIONS.length) {
    // 次の問へ（軽いフェード）
    const body = document.getElementById("state-modal-body");
    if (body) {
      body.style.opacity = "0";
      body.style.transform = "translateY(6px)";
      setTimeout(() => {
        renderStateQuestion();
        body.style.opacity   = "1";
        body.style.transform = "translateY(0)";
      }, 160);
    } else {
      renderStateQuestion();
    }
  } else {
    // 全問完了 → 解析 → 結果表示
    finishStateAnalysis();
  }
}

/** 全問完了後の解析と結果表示 */
function finishStateAnalysis() {
  const footer = document.getElementById("state-modal-footer");
  if (footer) footer.textContent = "CALCULATING MENTAL STATE... PLEASE WAIT";

  // 演出ディレイ後に結果を出す
  setTimeout(() => {
    const modal = document.getElementById("state-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";

    // 状態算出
    const state = calcMentalState(stateScores);

    // タイプ別コメント取得
    const primaryType = diagnosePrimary();
    const typeComment = state.typeComments
      ? (state.typeComments[primaryType.id] || "")
      : "";

    // 結果パネルを構築して表示
    renderStateResult(state, typeComment);
  }, 700);
}

/** STATE結果をDOMに描画 */
function renderStateResult(state, typeComment) {
  const panel = document.getElementById("state-result-panel");
  if (!panel) return;
  panel.style.display = "";

  // バッジ
  const badge     = document.getElementById("state-badge");
  const badgeLabel = document.getElementById("state-badge-label");
  const badgeName  = document.getElementById("state-badge-name");
  if (badge)      badge.style.borderColor     = state.color;
  if (badge)      badge.style.boxShadow       = `0 0 24px ${state.color.replace("0.85","0.2")}`;
  if (badgeLabel) { badgeLabel.textContent = state.icon + " " + state.label; badgeLabel.style.color = state.color; }
  if (badgeName)  badgeName.textContent = state.name;

  // 状態説明
  const condEl = document.getElementById("state-condition-text");
  if (condEl) condEl.textContent = state.condition;

  // タイプ別コメント
  const commentEl = document.getElementById("state-type-comment");
  if (commentEl) {
    commentEl.innerHTML = typeComment
      ? `<p class="state-type-comment-label mono">// TYPE-SPECIFIC ANALYSIS</p>
         <p class="state-type-comment-text">${typeComment}</p>`
      : "";
  }

  // 回復アドバイス
  const recoveryEl = document.getElementById("state-recovery");
  if (recoveryEl) {
    if (state.recovery) {
      recoveryEl.innerHTML = `
        <p class="state-recovery-label mono">// RECOVERY PROTOCOL</p>
        <p class="state-recovery-text">${state.recovery}</p>
      `;
    } else {
      recoveryEl.innerHTML = "";
    }
  }

  // アイコンにSTATE反映
  const stateToIconState = {
    STABLE: "normal", OVERCLOCKED: "runaway", FATIGUED: "runaway",
    DETACHED: "runaway", SUPPRESSED: "runaway", RECOVERING: "normal",
    COLLAPSED: "runaway", MATURE: "mature"
  };
  const iconState = stateToIconState[state.id] || "normal";
  renderTypeIcon(currentIconTypeId, iconState);
  // ボタンのactiveも更新
  const stateBtn = document.querySelector(`.icon-state-btn[onclick*="${iconState}"]`);
  if (stateBtn) {
    document.querySelectorAll(".icon-state-btn").forEach(b => b.classList.remove("active"));
    stateBtn.classList.add("active");
  }

  // スクロールして見せる
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ════════════════════════════════════════════
// TYPE DOSSIER モーダル
// 全タイプ図鑑。クリックで「研究ファイル閲覧」風に開く。
// openDossier(typeId) … 指定タイプの詳細を表示
// openDossierList()  … 全タイプ一覧を表示（TYPE ARCHIVEボタン用）
// ════════════════════════════════════════════

function openDossierList() {
  const modal   = document.getElementById("dossier-modal");
  const content = document.getElementById("dossier-content");
  const access  = document.getElementById("dossier-access-line");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  access.textContent = "ACCESSING TYPE DATABASE...";
  content.innerHTML  = "";

  setTimeout(() => {
    access.textContent = "ALL RECORDS LOADED — " + DIAGNOSIS_TYPES.length + " ENTRIES";
    content.innerHTML = buildTypeListHTML();
  }, 600);
}

function openDossier(typeId) {
  const type    = DIAGNOSIS_TYPES.find(t => t.id === typeId);
  if (!type) return;

  const modal   = document.getElementById("dossier-modal");
  const content = document.getElementById("dossier-content");
  const access  = document.getElementById("dossier-access-line");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  access.textContent = `ACCESSING: ${type.code}...`;
  content.innerHTML  = "";

  setTimeout(() => {
    access.textContent = `RECORD UNLOCKED: ${type.name}`;
    content.innerHTML  = buildDossierHTML(type);
  }, 500);
}

function closeDossierBtn() {
  const modal = document.getElementById("dossier-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function closeDossier(event) {
  // オーバーレイ（背景）クリックで閉じる
  if (event.target.id === "dossier-modal") {
    closeDossierBtn();
  }
}

/** 全タイプ一覧HTML */
function buildTypeListHTML() {
  // タイトル画面からの呼び出し時はスコア未確定のため null 扱い
  const hasDiagnosis = currentQuestionIndex > 0 && Object.keys(scores).length > 0;
  const primaryType = (hasDiagnosis && typeof diagnosePrimary === "function") ? diagnosePrimary() : null;

  let html = `<div class="dossier-list-grid">`;
  DIAGNOSIS_TYPES.forEach(t => {
    const isSelf = primaryType && t.id === primaryType.id;
    const rarityBar = Math.round((t.rarity || 5) / 100 * 200);
    html += `
      <div class="dossier-list-card ${isSelf ? "dossier-list-self" : ""}"
           onclick="openDossier('${t.id}')"
           style="border-color:${t.color.replace("0.8","0.25")}">
        <div class="dossier-list-icon">${getTypeIcon(t.id, "normal")}</div>
        <span class="dossier-list-code mono" style="color:${t.color};">${t.code.split("//")[0].trim()}</span>
        <span class="dossier-list-name">${t.name}</span>
        <span class="dossier-list-role mono">${t.civilizationRole}</span>
        <div class="dossier-rarity-row mono">
          <span>出現率</span>
          <div class="dossier-rarity-track"><div class="dossier-rarity-bar" style="width:${Math.min(rarityBar,200)}px;background:${t.color};"></div></div>
          <span>${t.rarity || "—"}%</span>
        </div>
        ${isSelf ? '<span class="dossier-self-badge mono">▶ YOU</span>' : ""}
        <span class="dossier-open-hint mono">&gt; OPEN DOSSIER</span>
      </div>
    `;
  });
  html += `</div>`;
  return html;
}

/** タイプ詳細HTML */
function buildDossierHTML(type) {
  const hasDiagnosis = currentQuestionIndex > 0 && Object.keys(scores).length > 0;
  const primaryType = (hasDiagnosis && typeof diagnosePrimary === "function") ? diagnosePrimary() : null;
  const isSelf = primaryType && type.id === primaryType.id;

  // ─── 自分との差異 ───
  let diffHTML = "";
  if (primaryType && !isSelf) {
    // 自分のスコアとそのタイプの主要パラメータを比較
    const myPrimaryScore = primaryType.primaryParams.reduce((s, p) => s + (scores[p] || 0), 0);
    const thatPrimaryScore = type.primaryParams.reduce((s, p) => s + (scores[p] || 0), 0);
    const diffs = type.primaryParams.map(p => ({
      label: PARAM_LABELS[p] || p,
      key: p,
      mine: scores[p] || 0,
      theirs: (scores[p] || 0)  // 自分の同パラメータ値との差を示す
    })).sort((a,b) => Math.abs(b.theirs - b.mine) - Math.abs(a.theirs - a.mine));

    // このタイプのprimaryParams での自分の値 vs タイプ平均（仮想）
    diffHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// YOUR VECTOR PROXIMITY</p>
        <p class="dossier-diff-note">あなたのスコアでこのタイプの主要パラメータを見た場合：</p>
        <div class="dossier-diff-list">
          ${type.primaryParams.map(p => {
            const v = scores[p] || 0;
            const maxPossible = 60;
            const pct = Math.round(v / maxPossible * 100);
            return `<div class="dossier-diff-row">
              <span class="dossier-diff-label mono">${PARAM_LABELS[p] || p}</span>
              <div class="dossier-diff-track"><div class="dossier-diff-bar" style="width:${pct}%;background:${type.color};"></div></div>
              <span class="dossier-diff-val mono">${v}</span>
            </div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  // ─── 文明適性マップ ───
  const fitSymbolClass = { "◎": "fit-s", "○": "fit-a", "△": "fit-b", "×": "fit-x" };
  let fitHTML = "";
  if (type.civilizationFit) {
    const rows = Object.entries(type.civilizationFit).map(([env, sym]) => `
      <div class="fit-row">
        <span class="fit-env">${env}</span>
        <span class="fit-sym ${fitSymbolClass[sym] || ""}">${sym}</span>
      </div>
    `).join("");
    fitHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// CIVILIZATION FIT MAP</p>
        <div class="fit-grid">${rows}</div>
      </div>
    `;
  }

  // ─── あるある ───
  let aruaruHTML = "";
  if (type.aruaru && type.aruaru.length) {
    aruaruHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// ${type.name} あるある</p>
        <ul class="dossier-aruaru">
          ${type.aruaru.map(a => `<li>${a}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  // ─── シナジー・テンション ───
  const synTypes  = (type.relations && type.relations.synergy || []).map(id => DIAGNOSIS_TYPES.find(d => d.id === id)).filter(Boolean);
  const tenTypes  = (type.relations && type.relations.tension  || []).map(id => DIAGNOSIS_TYPES.find(d => d.id === id)).filter(Boolean);

  const relHTML = `
    <div class="dossier-section">
      <p class="dossier-section-label mono">// TYPE RELATIONS</p>
      <div class="dossier-rel-row">
        <div class="dossier-rel-block">
          <p class="dossier-rel-label synergy mono">◆ SYNERGY</p>
          ${synTypes.map(t => `
            <div class="dossier-rel-card" onclick="openDossier('${t.id}')" style="border-color:${t.color.replace("0.8","0.4")};">
              <span class="dossier-rel-code mono" style="color:${t.color};">${t.code.split("//")[0].trim()}</span>
              <span class="dossier-rel-name">${t.name}</span>
              <span class="dossier-rel-hint mono">&gt; VIEW</span>
            </div>
          `).join("")}
          <p class="dossier-rel-note">${type.synergyNote || ""}</p>
        </div>
        <div class="dossier-rel-block">
          <p class="dossier-rel-label tension mono">◆ TENSION</p>
          ${tenTypes.map(t => `
            <div class="dossier-rel-card tension-card" onclick="openDossier('${t.id}')">
              <span class="dossier-rel-code mono" style="color:rgba(255,100,80,0.8);">${t.code.split("//")[0].trim()}</span>
              <span class="dossier-rel-name">${t.name}</span>
              <span class="dossier-rel-hint mono">&gt; VIEW</span>
            </div>
          `).join("")}
          <p class="dossier-rel-note">${type.tensionNote || ""}</p>
        </div>
      </div>
    </div>
  `;

  // ─── ① タイプ間ストーリー ───
  // このタイプが関わる全ストーリーを検索
  const myStories = Object.entries(TYPE_STORIES || {})
    .filter(([key]) => key.split("___").includes(type.id))
    .map(([key, story]) => {
      const otherIds = key.split("___").filter(id => id !== type.id);
      const others   = otherIds.map(id => DIAGNOSIS_TYPES.find(d => d.id === id)).filter(Boolean);
      return { story, others, key };
    });

  let storyHTML = "";
  if (myStories.length) {
    const cards = myStories.map(({ story, others }) => {
      const otherNames = others.map(o =>
        `<span style="color:${o.color};font-weight:700;">${o.name}</span>`
      ).join(" × ");
      return `
        <div class="story-card">
          <div class="story-card-header">
            <span class="story-tag mono" style="border-color:${story.tagColor};color:${story.tagColor};">${story.tag}</span>
            <span class="story-vs mono">${type.name} × ${others.map(o=>o.name).join(" × ")}</span>
          </div>
          <p class="story-title">${story.title}</p>
          <p class="story-scenario">${story.scenario.trim().replace(/\n/g, "<br>")}</p>
        </div>
      `;
    }).join("");
    storyHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// TYPE STORIES — CIVILIZATION DRAMA</p>
        ${cards}
      </div>
    `;
  }

  // ─── ② 危険な融合 ───
  const myFusions = (DANGEROUS_FUSIONS || []).filter(f => f.types.includes(type.id));
  let fusionHTML = "";
  if (myFusions.length) {
    const cards = myFusions.map(f => {
      const bars = Array.from({ length: 5 }, (_, i) =>
        `<span class="danger-pip ${i < f.dangerLevel ? "pip-on" : ""}"></span>`
      ).join("");
      const partnerIds = f.types.filter(id => id !== type.id);
      const partners   = partnerIds.map(id => {
        const pt = DIAGNOSIS_TYPES.find(d => d.id === id);
        return pt
          ? `<span class="fusion-partner-tag" onclick="openDossier('${pt.id}')"
               style="border-color:${pt.color.replace("0.8","0.4")};color:${pt.color};">${pt.name}</span>`
          : "";
      }).join("");
      return `
        <div class="fusion-card" style="border-color:${f.color}33;">
          <div class="fusion-header">
            <span class="fusion-code mono" style="color:${f.color};">${f.code}</span>
            <div class="danger-pips">${bars}</div>
          </div>
          <p class="fusion-name" style="color:${f.color};">${f.name}</p>
          <div class="fusion-partners">${partners}</div>
          <p class="fusion-effect">${f.effect}</p>
          <p class="fusion-potential mono">// POTENTIAL: ${f.potential}</p>
        </div>
      `;
    }).join("");
    fusionHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// DANGEROUS FUSION — COMBINATION ANALYSIS</p>
        ${cards}
      </div>
    `;
  }

  // ─── ③ タイプ進化 ───
  const evolutions = (TYPE_EVOLUTIONS || {})[type.id] || [];
  let evolutionHTML = "";
  if (evolutions.length) {
    const rows = evolutions.map(ev => {
      const target = DIAGNOSIS_TYPES.find(d => d.id === ev.target);
      return `
        <div class="evo-row">
          <div class="evo-condition">${ev.condition}</div>
          <div class="evo-arrow mono">→</div>
          <div class="evo-target" onclick="${target ? `openDossier('${target.id}')` : ""}"
               style="${target ? `color:${target.color};border-color:${target.color.replace("0.8","0.3")};` : ""}">
            <span class="evo-label mono">${ev.label}</span>
            ${target ? `<span class="evo-name">${target.name}</span>` : ""}
          </div>
        </div>
      `;
    }).join("");
    evolutionHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// TYPE EVOLUTION — VECTOR SHIFT</p>
        <p class="evo-note">特定の条件下で、このタイプは別のベクトルへ偏移する可能性がある。</p>
        ${rows}
      </div>
    `;
  }

  // ─── ④ 偉人マッチ ───
  const figures = (FAMOUS_FIGURES || {})[type.id] || [];
  let figureHTML = "";
  if (figures.length) {
    const cards = figures.map((fig, i) => `
      <div class="figure-card">
        <span class="figure-rank mono">${String(i+1).padStart(2,"0")}</span>
        <div class="figure-info">
          <span class="figure-name">${fig.name}</span>
          <span class="figure-desc">${fig.desc}</span>
        </div>
      </div>
    `).join("");
    figureHTML = `
      <div class="dossier-section">
        <p class="dossier-section-label mono">// FAMOUS FIGURES — ARCHETYPE MATCH</p>
        <p class="figure-note">このタイプに近い特性を持つと観測された歴史上の人物。</p>
        ${cards}
      </div>
    `;
  }

  // ─── ドラマ文（シンプル版、ストーリーがない場合のフォールバック） ───
  const dramaLines = myStories.length === 0
    ? synTypes.map(st =>
        `<p class="drama-line"><span class="drama-type" style="color:${type.color};">${type.name}</span>は、<span class="drama-type" style="color:${st.color};">${st.name}</span>によって補完される。</p>`
      ).join("")
    + tenTypes.map(tt =>
        `<p class="drama-line"><span class="drama-type" style="color:${type.color};">${type.name}</span>と<span class="drama-type" style="color:rgba(255,100,80,0.9);">${tt.name}</span>は思想的衝突が起こりやすい。</p>`
      ).join("")
    : "";

  return `
    <!-- 基本情報 -->
    <div class="dossier-top">
      <div class="dossier-id-block">
        <div class="dossier-icon-wrap">
          ${getTypeIcon(type.id, "normal")}
          <div class="dossier-icon-states mono">
            <button class="dossier-icon-btn active" onclick="switchDossierIcon(this,'${type.id}','normal')">NRM</button>
            <button class="dossier-icon-btn" onclick="switchDossierIcon(this,'${type.id}','runaway')">RNW</button>
            <button class="dossier-icon-btn" onclick="switchDossierIcon(this,'${type.id}','mature')">MTR</button>
          </div>
        </div>
        <code class="dossier-code mono" style="color:${type.color};">${type.code}</code>
        <h2 class="dossier-name" style="text-shadow:0 0 20px ${type.color.replace("0.8","0.3")};">${type.name}</h2>
        <p class="dossier-desc mono">${type.description}</p>
        <div class="dossier-rarity-inline mono">
          <span>RARITY: </span>
          <span style="color:${type.color};">${type.rarity || "—"}%</span>
          <span class="rarity-comment">${getRarityComment(type.rarity || 5)}</span>
        </div>
      </div>
      <div class="dossier-role-block">
        <p class="dossier-section-label mono">// CIVILIZATION ROLE</p>
        <p class="dossier-role-text">${type.civilizationRole}</p>
        <p class="dossier-detail">${(type.detail || "").trim()}</p>
      </div>
    </div>

    <!-- タイプ間ドラマ（ストーリーなしの場合のフォールバック） -->
    ${dramaLines ? `<div class="dossier-section drama-section"><p class="dossier-section-label mono">// TYPE DRAMA</p>${dramaLines}</div>` : ""}

    <!-- ① タイプ間ストーリー -->
    ${storyHTML}

    <!-- ④ 偉人マッチ -->
    ${figureHTML}

    <!-- あるある -->
    ${aruaruHTML}

    <!-- 文明適性 -->
    ${fitHTML}

    <!-- ③ タイプ進化 -->
    ${evolutionHTML}

    <!-- 長所・弱点 -->
    <div class="dossier-section">
      <p class="dossier-section-label mono">// STRENGTHS / WEAKNESSES</p>
      <div class="dossier-sw-row">
        <div>
          <p class="dossier-sw-label strength mono">▲ STRENGTHS</p>
          <ul class="dossier-sw-list strength-list">${(type.strengths||[]).map(s=>`<li>${s}</li>`).join("")}</ul>
        </div>
        <div>
          <p class="dossier-sw-label weakness mono">▼ WEAKNESSES</p>
          <ul class="dossier-sw-list weakness-list">${(type.weaknesses||[]).map(w=>`<li>${w}</li>`).join("")}</ul>
        </div>
      </div>
    </div>

    <!-- 暴走・成熟 -->
    <div class="dossier-section">
      <p class="dossier-section-label mono">// RUNAWAY / MATURE</p>
      <div class="dossier-rm-row">
        <div class="dossier-runaway"><p class="dossier-rm-label runaway mono">⚠ RUNAWAY</p><p>${type.runaway||"—"}</p></div>
        <div class="dossier-mature"><p class="dossier-rm-label mature mono">▶ MATURE</p><p>${type.mature||"—"}</p></div>
      </div>
    </div>

    <!-- 環境 -->
    <div class="dossier-section">
      <p class="dossier-section-label mono">// OPTIMAL ENVIRONMENT</p>
      <p class="env-text best">◎ ${(type.environment && type.environment.best)||"—"}</p>
      <p class="dossier-section-label mono" style="margin-top:8px;">// HAZARDOUS ENVIRONMENT</p>
      <p class="env-text worst">× ${(type.environment && type.environment.worst)||"—"}</p>
    </div>

    <!-- タイプ相関 -->
    ${relHTML}

    <!-- ② 危険な融合 -->
    ${fusionHTML}

    <!-- 自分との差異 -->
    ${diffHTML}

    <!-- ナビゲーション：他タイプへ -->
    <div class="dossier-nav">
      <button class="dossier-nav-btn mono" onclick="openDossierList()">
        &lt; BACK TO ALL TYPES
      </button>
    </div>
  `;
}

/** 出現率コメント */
/** モーダル内アイコン状態切り替え */
function switchDossierIcon(btn, typeId, state) {
  const wrap = btn.closest(".dossier-icon-wrap");
  if (!wrap) return;
  // SVG部分だけ差し替え（ボタン行は残す）
  const existing = wrap.querySelector("svg");
  if (existing) existing.remove();
  const tmp = document.createElement("div");
  tmp.innerHTML = getTypeIcon(typeId, state);
  const newSvg = tmp.querySelector("svg");
  if (newSvg) wrap.insertBefore(newSvg, wrap.querySelector(".dossier-icon-states"));
  // activeクラス切り替え
  wrap.querySelectorAll(".dossier-icon-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function getRarityComment(rarity) {
  if (rarity <= 3)   return "// EXTREMELY RARE";
  if (rarity <= 6)   return "// RARE";
  if (rarity <= 10)  return "// UNCOMMON";
  if (rarity <= 20)  return "// COMMON";
  return "// WIDESPREAD";
}

function renderTypeRelations(type) {
  // シナジータイプ
  const sc = document.getElementById("relation-synergy");
  const sn = document.getElementById("relation-synergy-note");
  if (sc) {
    sc.innerHTML = (type.relations && type.relations.synergy || [])
      .map(id => {
        const t = DIAGNOSIS_TYPES.find(d => d.id === id);
        return t ? `<span class="relation-tag synergy-tag" style="border-color:${t.color};color:${t.color};">${t.name}</span>` : "";
      }).join("");
  }
  if (sn) sn.textContent = type.synergyNote || "";

  // テンションタイプ
  const tc = document.getElementById("relation-tension");
  const tn = document.getElementById("relation-tension-note");
  if (tc) {
    tc.innerHTML = (type.relations && type.relations.tension || [])
      .map(id => {
        const t = DIAGNOSIS_TYPES.find(d => d.id === id);
        return t ? `<span class="relation-tag tension-tag">${t.name}</span>` : "";
      }).join("");
  }
  if (tn) tn.textContent = type.tensionNote || "";

  // 全タイプ一覧グリッド
  const grid = document.getElementById("all-types-grid");
  if (grid) {
    grid.innerHTML = DIAGNOSIS_TYPES.map(t => {
      const isSelf    = t.id === type.id;
      const isSynergy = (type.relations && type.relations.synergy || []).includes(t.id);
      const isTension = (type.relations && type.relations.tension || []).includes(t.id);
      let cls = "type-card";
      if (isSelf)    cls += " type-card-self";
      if (isSynergy) cls += " type-card-synergy";
      if (isTension) cls += " type-card-tension";
      return `
        <div class="${cls}" style="border-color:${t.color.replace("0.8","0.22")};"
             onclick="openDossier('${t.id}')" title="ファイルを開く">
          <span class="type-card-code mono" style="color:${t.color};">${t.code.split("//")[0].trim()}</span>
          <span class="type-card-name">${t.name}</span>
          <span class="type-card-role mono">${t.civilizationRole}</span>
          ${isSelf    ? '<span class="type-card-badge self-badge mono">YOU</span>'      : ""}
          ${isSynergy ? '<span class="type-card-badge synergy-badge mono">SYNERGY</span>' : ""}
          ${isTension ? '<span class="type-card-badge tension-badge mono">TENSION</span>' : ""}
          <span class="type-card-open mono">&gt; OPEN</span>
        </div>
      `;
    }).join("");
  }
}
