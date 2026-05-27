/**
 * types.js
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 診断タイプ定義ファイル（拡張版）
 *
 * 収録内容：
 *   DIAGNOSIS_TYPES   … 主タイプ定義（10種）
 *   SUB_TYPE_RULES    … 副タイプ判定ルール
 *   THREAT_RULES      … 危険度判定ルール
 *   ANOMALY_RULES     … 矛盾検出ルール
 *   CIVILIZATION_ROLES… 文明内役割テーブル
 *   PARAM_LABELS      … パラメータの日本語名
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */


// ══════════════════════════════════════════════════
// 主タイプ定義（10種）
// ══════════════════════════════════════════════════

const DIAGNOSIS_TYPES = [

  // ───────────────────────────────────────
  // TYPE-Ω7 深淵設計者
  // ───────────────────────────────────────
  {
    id: "abyss_architect",
    name: "深淵設計者型",
    code: "TYPE-Ω7 // DEEP_ARCHITECT",
    description: "文明の根幹を設計する者",
    detail: `
対象個体は、既存の構造を解体し再構築する能力を持つ。
単なる問題解決者ではなく、問題そのものの定義を変える。
社会・技術・思想の深層に潜る傾向があり、
その思考は通常の観測範囲を超えることが多い。

文明史において、このタイプは「時代を作った者」として記録される。
孤独と戦略が共存し、長期的視野で動く。
その設計は、時に理解されるまで数十年を要する。
    `,
    primaryParams: ["architect", "meta", "genius", "research", "philosophy"],
    color: "rgba(0, 200, 255, 0.8)",
    civilizationRole: "文明再設計因子"
  },

  // ───────────────────────────────────────
  // TYPE-Σ4 文明運営者
  // ───────────────────────────────────────
  {
    id: "civilization_operator",
    name: "文明運営者型",
    code: "TYPE-Σ4 // CIVILIZATION_OPS",
    description: "社会を動かすオペレーター",
    detail: `
対象個体は、組織・社会・経済の動作原理を直感的に把握し、
それを最適化する能力に優れる。
リーダーシップと現実適応力が高く、
複雑な人間関係を調整しながら目標を達成する。

歴史上の「名君」「傑出した経営者」に近い特性を持つ。
理想と現実のバランスを保ちながら、
実際に文明を前進させる実行力を有する。
    `,
    primaryParams: ["management", "leadership", "reality", "work", "endurance"],
    color: "rgba(255, 160, 0, 0.8)",
    civilizationRole: "文明維持・推進因子"
  },

  // ───────────────────────────────────────
  // TYPE-Δ9 孤高観測者
  // ───────────────────────────────────────
  {
    id: "solitary_observer",
    name: "孤高観測者型",
    code: "TYPE-Δ9 // ISOLATED_WATCHER",
    description: "世界を外側から見続ける存在",
    detail: `
対象個体は、自らを「観測者」として世界の外側に置く傾向を持つ。
感情的な介入を最小化し、現象を純粋に記録・分析する。
孤独耐性が極めて高く、長期間の単独研究に適している。

このタイプは社会の「記録者」として機能し、
他者が見落とすパターンや異常を検出する能力を持つ。
時に「人間的温度」の低さを指摘されるが、
それは観測精度を保つための適応と解釈される。
    `,
    primaryParams: ["observer", "solitude", "meta", "research", "philosophy"],
    color: "rgba(180, 100, 255, 0.8)",
    civilizationRole: "境界観測者"
  },

  // ───────────────────────────────────────
  // TYPE-Ψ3 狂気研究者
  // ───────────────────────────────────────
  {
    id: "mad_researcher",
    name: "狂気研究者型",
    code: "TYPE-Ψ3 // OBSESSION_CORE",
    description: "真理への執着が臨界を超えた者",
    detail: `
対象個体は、特定分野への集中が通常の範囲を超えている。
オタク度・専門家度・研究者度が共鳴し合い、
外部の評価や社会的承認を必要としない探求サイクルに入っている。

「狂気」は侮辱ではなく、観測記録上の分類である。
この個体は文明の境界線を広げる可能性を持つが、
その過程で社会との摩擦が生じやすい。
孤独に耐えながら、誰も到達していない場所を目指す。
    `,
    primaryParams: ["expert", "otaku", "research", "solitude", "unique"],
    color: "rgba(255, 80, 80, 0.8)",
    civilizationRole: "失われた技術の継承者"
  },

  // ───────────────────────────────────────
  // TYPE-Λ1 革命家
  // ───────────────────────────────────────
  {
    id: "revolutionary",
    name: "革命家型",
    code: "TYPE-Λ1 // SYSTEM_BREAKER",
    description: "既存秩序を書き換える異端者",
    detail: `
対象個体は、現状の維持ではなく「構造そのものの変革」に駆動される。
ユニーク思想度・革命度・創造力が連動し、
社会の常識を疑う回路が常時作動している。

歴史においてこのタイプは「英雄」または「危険人物」として記録される。
その二面性は、変革のエネルギーが適切な方向へ向くかどうかに依存する。
信念と実行力が合致したとき、このタイプは世界を変える。
    `,
    primaryParams: ["revolution", "unique", "creativity", "freedom", "genius"],
    color: "rgba(255, 50, 120, 0.8)",
    civilizationRole: "崩壊後再建者 / 秩序破壊因子"
  },

  // ───────────────────────────────────────
  // TYPE-θ2 神秘探索者
  // ───────────────────────────────────────
  {
    id: "mystic_seeker",
    name: "神秘探索者型",
    code: "TYPE-θ2 // BEYOND_BOUNDARY",
    description: "人知の外縁を歩く者",
    detail: `
対象個体は、合理的な説明を超えた領域への強い引力を持つ。
神秘度・哲学度・創造力が高く、
「なぜ世界は存在するのか」という問いを生きることの
根幹に置いている。

このタイプは科学者になれば境界科学の開拓者に、
芸術家になれば時代を超えた作品を生む可能性がある。
その探求は終わることがなく、それ自体が目的と化している。
    `,
    primaryParams: ["mystic", "philosophy", "unique", "creativity", "observer"],
    color: "rgba(100, 255, 180, 0.8)",
    civilizationRole: "未知領域の探索者"
  },

  // ───────────────────────────────────────
  // TYPE-α6 博愛運営者
  // ───────────────────────────────────────
  {
    id: "altruist_operator",
    name: "博愛運営者型",
    code: "TYPE-α6 // HUMAN_NEXUS",
    description: "人間を繋ぐ媒介者",
    detail: `
対象個体は、人間への深い関心と共感能力を基盤として動作する。
博愛度・有能上司度・現実適応力が高く、
他者の成長・支援・繋がりに強いエネルギーを注ぐ。

このタイプは「リーダー」というより「場を作る者」に近い。
人々が最大限の能力を発揮できる環境を設計し、
その中で静かに、しかし確実に影響力を行使する。
文明においては「潤滑剤」として機能する重要な存在。
    `,
    primaryParams: ["love", "leadership", "reality", "endurance", "observer"],
    color: "rgba(80, 200, 120, 0.8)",
    civilizationRole: "文明潤滑剤・人間連結因子"
  },

  // ───────────────────────────────────────
  // TYPE-Φ5 現実適応者（新設）
  // ───────────────────────────────────────
  {
    id: "reality_adapter",
    name: "現実適応者型",
    code: "TYPE-Φ5 // STABLE_CORE",
    description: "文明を支える基盤存在",
    detail: `
対象個体は、現実との高い適合率を示す。
理想と現実のギャップを最小化し、
与えられた環境の中で最大限の成果を出す能力を持つ。

文明は極端な天才だけでは維持できない。
現実を回し続けるこのタイプこそが、
社会のインフラを形成する。
その「普通さ」は弱点ではなく、
高度な環境適応の証明である。

観測記録：このタイプが多数存在する文明ほど、
崩壊耐性が高い傾向が確認されている。
    `,
    primaryParams: ["reality", "work", "endurance", "management", "love"],
    color: "rgba(150, 180, 255, 0.8)",
    civilizationRole: "文明基盤維持因子"
  },

  // ───────────────────────────────────────
  // TYPE-Γ8 孤高職人（新設）
  // ───────────────────────────────────────
  {
    id: "lone_craftsman",
    name: "孤高職人型",
    code: "TYPE-Γ8 // SILENT_FORGE",
    description: "沈黙の中で技術を極める者",
    detail: `
対象個体は、高度な専門性と孤独耐性を組み合わせた特異な構造を持つ。
他者からの評価や社会的地位には関心が薄く、
「作ること」「極めること」自体に価値を見出す。

このタイプは目立たないが、
文明の実装レイヤーを支える重要な存在である。
革命を起こさず、世界を変えようともしない。
ただ、自分の領域において誰も届かない高みを目指す。
その沈黙は怠惰ではなく、深い集中の証である。
    `,
    primaryParams: ["expert", "solitude", "endurance", "work", "otaku"],
    color: "rgba(200, 160, 80, 0.8)",
    civilizationRole: "技術実装の守護者"
  },

  // ───────────────────────────────────────
  // TYPE-Ξ0 創造衝動型（新設）
  // ───────────────────────────────────────
  {
    id: "creative_impulse",
    name: "創造衝動型",
    code: "TYPE-Ξ0 // GENESIS_DRIVE",
    description: "存在が創造に向かう者",
    detail: `
対象個体は、創造衝動が全ての行動の根幹にある。
ジャンルや媒体を問わず、「何かを生み出すこと」への
抑えがたい衝動を持つ。

この個体の思考は非線形であり、
他者には理解困難な跳躍を頻繁に行う。
ユニーク思想度・創造力・神秘度の三角形が
その精神構造を形成している。

この力が形を得たとき、文明に新しい色が加わる。
形を得なかったとき、その衝動は内側に向かう。
    `,
    primaryParams: ["creativity", "unique", "mystic", "freedom", "philosophy"],
    color: "rgba(255, 120, 200, 0.8)",
    civilizationRole: "文明色彩付与因子"
  }

];


// ══════════════════════════════════════════════════
// 副タイプ判定ルール
// 主タイプとは別に「もう一つの顔」を表示する
// ══════════════════════════════════════════════════

const SUB_TYPE_RULES = [
  // 条件：architect が高い → 副タイプ「隠れ設計者」
  {
    id: "hidden_architect",
    label: "隠れ設計者",
    condition: scores => scores.architect >= 20 && scores.management >= 15
  },
  // 条件：revolution + unique が高い → 副タイプ「異端思想体」
  {
    id: "heretic_thinker",
    label: "異端思想体",
    condition: scores => scores.revolution >= 18 && scores.unique >= 18
  },
  // 条件：solitude + observer が高い → 副タイプ「孤立観測者」
  {
    id: "isolated_scanner",
    label: "孤立観測者",
    condition: scores => scores.solitude >= 20 && scores.observer >= 18
  },
  // 条件：research + expert が高い → 副タイプ「深掘り特化型」
  {
    id: "deep_specialist",
    label: "深掘り特化型",
    condition: scores => scores.research >= 20 && scores.expert >= 20
  },
  // 条件：love + leadership が高い → 副タイプ「場の設計者」
  {
    id: "field_creator",
    label: "場の設計者",
    condition: scores => scores.love >= 22 && scores.leadership >= 20
  },
  // 条件：mystic + philosophy が高い → 副タイプ「境界歩行者」
  {
    id: "boundary_walker",
    label: "境界歩行者",
    condition: scores => scores.mystic >= 18 && scores.philosophy >= 20
  },
  // 条件：creativity + unique が高い → 副タイプ「異形創造体」
  {
    id: "anomalous_creator",
    label: "異形創造体",
    condition: scores => scores.creativity >= 22 && scores.unique >= 20
  },
  // 条件：reality + endurance が高い → 副タイプ「鋼の基盤」
  {
    id: "iron_foundation",
    label: "鋼の基盤",
    condition: scores => scores.reality >= 25 && scores.endurance >= 22
  }
];


// ══════════════════════════════════════════════════
// 危険度判定ルール（THREAT LEVEL）
// ══════════════════════════════════════════════════

/**
 * 危険度レベルの定義
 * level:   表示ラベル
 * color:   表示色
 * message: 研究所コメント
 */
const THREAT_LEVELS = {
  MINIMAL: {
    level: "MINIMAL",
    color: "rgba(80, 200, 120, 0.9)",
    message: "対象個体は文明維持側に属する。危険因子は観測されていない。"
  },
  LOW: {
    level: "LOW",
    color: "rgba(150, 200, 255, 0.9)",
    message: "軽微な逸脱傾向を検出。通常の社会適応範囲内と判断。"
  },
  MODERATE: {
    level: "MODERATE",
    color: "rgba(255, 200, 0, 0.9)",
    message: "特定条件下において現状秩序との摩擦が予測される。継続観測を推奨。"
  },
  HIGH: {
    level: "HIGH",
    color: "rgba(255, 100, 0, 0.9)",
    message: "既存秩序への強い再構築衝動を検出。影響範囲の拡大に注意。"
  },
  EXCESSIVE: {
    level: "EXCESSIVE",
    color: "rgba(255, 30, 60, 0.9)",
    message: "臨界値を超える逸脱指数を観測。当施設での監視対象に指定。"
  }
};

/**
 * スコアから危険度を算出する関数
 * @param {Object} scores - パラメータスコア
 * @returns {Object} THREAT_LEVELS のいずれか
 */
function calcThreatLevel(scores) {
  let threatScore = 0;

  // 革命衝動
  if (scores.revolution >= 25) threatScore += 3;
  else if (scores.revolution >= 18) threatScore += 2;
  else if (scores.revolution >= 12) threatScore += 1;

  // 現実離脱（研究高・現実低）
  if (scores.research >= 25 && scores.reality <= 10) threatScore += 2;

  // 孤立傾向（孤独高・博愛低）
  if (scores.solitude >= 25 && scores.love <= 8) threatScore += 2;

  // 思想過激（ユニーク高・現実低）
  if (scores.unique >= 22 && scores.reality <= 10) threatScore += 2;

  // 天才志向（偉人高・消耗耐性高）
  if (scores.genius >= 22 && scores.endurance >= 22) threatScore += 1;

  // 現実適応が高いと減少
  if (scores.reality >= 20) threatScore -= 2;
  if (scores.love >= 20) threatScore -= 1;

  // レベル決定
  if (threatScore >= 7) return THREAT_LEVELS.EXCESSIVE;
  if (threatScore >= 5) return THREAT_LEVELS.HIGH;
  if (threatScore >= 3) return THREAT_LEVELS.MODERATE;
  if (threatScore >= 1) return THREAT_LEVELS.LOW;
  return THREAT_LEVELS.MINIMAL;
}


// ══════════════════════════════════════════════════
// 矛盾検出ルール（ANOMALY）
// 特定パラメータの組み合わせで警告を生成
// ══════════════════════════════════════════════════

const ANOMALY_RULES = [
  // 博愛高・革命高 → 理想主義過剰
  {
    id: "idealism_overdrive",
    label: "IDEALISM OVERDRIVE DETECTED",
    detail: "博愛衝動と革命衝動が共存。理想と現実の乖離が極大化する恐れあり。",
    condition: s => s.love >= 20 && s.revolution >= 20
  },
  // 研究高・現実低 → 現実切断傾向
  {
    id: "reality_disconnect",
    label: "REALITY DISCONNECT TENDENCY",
    detail: "高度な抽象思考能力を持つ一方、現代社会との適合率低下が観測される。",
    condition: s => s.research >= 22 && s.reality <= 8
  },
  // 革命高・博愛低 → 過激化リスク
  {
    id: "radicalization_risk",
    label: "RADICALIZATION PATTERN DETECTED",
    detail: "変革衝動が高値を示す一方、共感回路の低下を確認。過激化リスクに注意。",
    condition: s => s.revolution >= 22 && s.love <= 8
  },
  // 孤独高・哲学高 → 深淵没入傾向
  {
    id: "abyss_immersion",
    label: "ABYSS IMMERSION TENDENCY",
    detail: "孤独耐性と哲学度の複合上昇を観測。自己参照ループへの没入リスクあり。",
    condition: s => s.solitude >= 22 && s.philosophy >= 22
  },
  // 創造高・現実低 → 非着地型思考
  {
    id: "ungrounded_creation",
    label: "UNGROUNDED CREATION PATTERN",
    detail: "創造衝動は強大だが、現実実装への抵抗が高い。出力が世界に届かない可能性。",
    condition: s => s.creativity >= 22 && s.reality <= 8
  },
  // 神秘高・研究高 → 境界越境傾向
  {
    id: "boundary_crossing",
    label: "BOUNDARY CROSSING TENDENCY",
    detail: "神秘探求と科学探求が同時に最大化。観測不能領域への接近を記録。",
    condition: s => s.mystic >= 20 && s.research >= 22
  },
  // 全パラメータが均等（標準偏差が低い）→ 未分化型
  {
    id: "undifferentiated",
    label: "UNDIFFERENTIATED VECTOR DETECTED",
    detail: "全パラメータが均等分布。特定の強力なベクトルが検出されていない。可能性は未開放状態。",
    condition: s => {
      const vals = Object.values(s);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const variance = vals.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / vals.length;
      return Math.sqrt(variance) < 4;
    }
  }
];


// ══════════════════════════════════════════════════
// パラメータの日本語ラベル定義
// レーダーチャートの軸ラベルに使用
// ══════════════════════════════════════════════════

const PARAM_LABELS = {
  freedom:    "生活自由度",
  work:       "仕事傾向度",
  unique:     "ユニーク思想",
  genius:     "偉人度",
  expert:     "専門家度",
  otaku:      "オタク度",
  leadership: "有能上司度",
  management: "経営者感覚",
  architect:  "設計者度",
  research:   "研究者度",
  love:       "博愛度",
  creativity: "創造力",
  philosophy: "哲学度",
  meta:       "メタ認知度",
  solitude:   "孤独耐性",
  endurance:  "消耗耐性",
  reality:    "現実適応力",
  revolution: "革命度",
  observer:   "観測者度",
  mystic:     "神秘度"
};
