/**
 * state.js — MENTAL STATE ANALYSIS MODULE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 設計方針：
 *   - 医療・精神医学的表現は使わない。「構造状態解析」として扱う。
 *   - 8つの状態（STATE）を定義。全タイプ共通の「現在軸」として機能する。
 *   - 10問の追加質問でSTATEを算出。既存スコアは参照のみ（変更しない）。
 *   - TYPE × STATE の組み合わせで「今どのように存在しているか」を出力。
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */


// ══════════════════════════════════════════════════
// MENTAL STATES 定義（8種）
// ══════════════════════════════════════════════════

const MENTAL_STATES = {

  STABLE: {
    id: "STABLE",
    label: "STABLE",
    name: "安定稼働",
    color: "rgba(80,200,120,0.85)",
    icon: "◈",
    desc: "人格構造が現在の環境と高い整合性を保っている。思考・行動・感情の各層が正常に連携している状態。",
    condition: "対象個体のベクトルは安定範囲内にある。外部ストレスの影響が最小化されており、本来のタイプ特性が最大限に発揮できる状態。",
    recovery: null,
    typeComments: {
      abyss_architect:      "設計思考が冴えわたっている。この状態が最も深い構造への到達を可能にする。",
      civilization_operator:"組織・環境への適応が最適化されている。この状態が最大の実行効率を生む。",
      solitary_observer:    "観測精度が最高水準にある。静かに、しかし確実に世界を記録し続けている。",
      mad_researcher:       "探求サイクルが正常に回転している。この状態が最も深い発見を生む。",
      revolutionary:        "変革衝動が制御された状態にある。エネルギーが方向性を持ち、動ける。",
      mystic_seeker:        "直感と観察のバランスが保たれている。感じる力が歪みなく機能している。",
      altruist_operator:    "他者への供給と自己維持のバランスが取れている。この状態が最も安定した支援を生む。",
      reality_adapter:      "現実との接合が完全な状態。能力が最大限に環境へ出力されている。",
      lone_craftsman:       "集中の回路が完全に開いている。作業への没入が最高品質を生む状態。",
      creative_impulse:     "創造衝動と実行力が同期している。この状態でこそ衝動が形になる。",
      social_circulator:    "社会との接続が最適化されている。流れの中で自分の役割が明確に見える。",
      harmony_supporter:    "支援と自己の境界線が健全な状態。場への貢献が最も自然に出力できる。"
    }
  },

  OVERCLOCKED: {
    id: "OVERCLOCKED",
    label: "OVERCLOCKED",
    name: "思考過負荷",
    color: "rgba(255,160,0,0.85)",
    icon: "⚡",
    desc: "処理容量を超えた思考負荷が継続している。出力は高いが、消耗速度も高い。燃焼型の状態。",
    condition: "高速・多層の思考処理が継続しており、停止が困難な状態。外部刺激への感度が上昇している一方、判断の精度が低下する場合がある。",
    recovery: "意図的な入力遮断が有効。低刺激環境での一時停止が構造を回復させる。",
    typeComments: {
      abyss_architect:      "設計ループが自己加速している。停止するには外部からの強制介入が必要になることがある。",
      civilization_operator:"タスク処理が飽和状態に近い。効率低下の前に負荷の再分配が必要。",
      solitary_observer:    "観測対象が増加しすぎている。フォーカスを絞ることで精度が回復する。",
      mad_researcher:       "探求の深度と速度が同時に上昇している。出口を持たないループのリスクがある。",
      revolutionary:        "変革衝動が過熱状態。この状態は破壊力が最大化するが、方向性を失いやすい。",
      mystic_seeker:        "感覚の感度が上がりすぎている。入力の絞り込みで精度が戻る。",
      altruist_operator:    "他者への対応が飽和状態に近い。この状態が継続すると消耗段階へ移行する。",
      reality_adapter:      "現実の変化への対応が過負荷になっている。優先順位の再設定が有効。",
      lone_craftsman:       "作業の没入が継続しすぎている。強制的な停止を入れることで品質が回復する。",
      creative_impulse:     "衝動の発火が連続しており、一つも完成しない可能性がある。着地点の設定が必要。",
      social_circulator:    "接触量が多すぎて処理が追いついていない。意図的な接触の選別が必要。",
      harmony_supporter:    "場への気遣いが限界に近づいている。自分のための時間を確保する必要がある。"
    }
  },

  FATIGUED: {
    id: "FATIGUED",
    label: "FATIGUED",
    name: "長期消耗",
    color: "rgba(150,130,180,0.85)",
    icon: "◎",
    desc: "エネルギーの出力が長期間にわたって入力を上回っている。本来の特性が発揮できない状態。",
    condition: "本来好きだったことへの反応が鈍化している。外部からは「普通に動いている」ように見えるが、内部では消耗が蓄積している。",
    recovery: "強制的な非活動期間が必要。出力を止め、環境からの刺激を減らすことで回復が始まる。",
    typeComments: {
      abyss_architect:      "設計の深度が浅くなっている。消耗が本来の思考範囲を縮小させている。",
      civilization_operator:"運営の精度が落ちている。判断より習慣で動いている可能性がある。",
      solitary_observer:    "観測そのものへの関心が薄れている。これは深刻な消耗のサインである。",
      mad_researcher:       "探求への衝動が消えかけている。この状態が続くと完全な停止に至る。",
      revolutionary:        "変革衝動が低下している。エネルギーが枯渇する前に補充が必要。",
      mystic_seeker:        "直感のアンテナが機能低下している。感じる力が戻るには休止が必要。",
      altruist_operator:    "他者への支援継続が自己を圧迫している。「与えること」を一時停止する必要がある。",
      reality_adapter:      "現実対応の速度が落ちている。これは消耗の典型的な症状である。",
      lone_craftsman:       "作業への集中が途切れがちになっている。無理な継続は品質を破壊する。",
      creative_impulse:     "創造への衝動が沈黙している。この状態では強制しても出力されない。",
      social_circulator:    "社会との接続への意欲が低下している。孤立を選びたくなる兆候がある。",
      harmony_supporter:    "場を維持するエネルギーが底をついている。最も燃え尽きリスクが高い状態。"
    }
  },

  DETACHED: {
    id: "DETACHED",
    label: "DETACHED",
    name: "現実乖離",
    color: "rgba(100,160,255,0.85)",
    icon: "◌",
    desc: "内部の思考・感覚世界が外部現実より鮮明になっている。現実への接続が薄れている状態。",
    condition: "現実より内側の世界に比重が移動している。外部から見ると「上の空」「反応が遅い」と見られることがある。",
    recovery: "身体的・物理的な現実接触が有効。実際に手を使う作業、外部の感覚入力が現実層を回復させる。",
    typeComments: {
      abyss_architect:      "設計が現実から切り離されて動いている。この状態の設計は美しいが、実装不可能になる。",
      civilization_operator:"現実判断への接続が薄れている。この状態での意思決定は精度が低下する。",
      solitary_observer:    "観測対象が現実から内部世界へ移動している。このタイプが最も陥りやすい状態。",
      mad_researcher:       "探求が現実と切り離された空間に入っている。成果が出ないまま深化する危険がある。",
      revolutionary:        "変革の対象が現実ではなく概念になっている。この状態の革命は実効性を持たない。",
      mystic_seeker:        "神秘体験と現実の境界が薄くなっている。このタイプには周期的に起こりうる状態。",
      altruist_operator:    "他者への関与が観念的になっている。実際の行動への接続を意識する必要がある。",
      reality_adapter:      "このタイプが乖離状態に入るとき、構造的な問題が存在している可能性が高い。",
      lone_craftsman:       "作業世界への没入が外部との接続を切り始めている。定期的な現実確認が必要。",
      creative_impulse:     "創造の世界が現実を侵食している。作品が完成しても、自分が戻ってこない状態。",
      social_circulator:    "社会との接続感が薄れている。人の中にいても孤立感を感じている可能性がある。",
      harmony_supporter:    "場から心理的に離脱している。体だけがそこにいる状態になっている。"
    }
  },

  SUPPRESSED: {
    id: "SUPPRESSED",
    label: "SUPPRESSED",
    name: "抑制状態",
    color: "rgba(180,140,80,0.85)",
    icon: "▣",
    desc: "本来のタイプ特性が環境・状況によって抑制されている。本質が出力されていない状態。",
    condition: "周囲の期待・ルール・環境への同調が、本来のベクトルを抑制している。内部では圧力が蓄積しており、爆発的な解放のリスクがある。",
    recovery: "本来の傾向が「許される」環境への移動が最も有効。小さくとも本質に近い行動の実行が圧力を解放する。",
    typeComments: {
      abyss_architect:      "設計衝動が環境によって封じられている。この抑圧が長期化すると構造崩壊に至る。",
      civilization_operator:"本来の運営能力が発揮できていない。環境の変更か、権限の拡大が必要。",
      solitary_observer:    "観測の自由が制限されている。この状態のこのタイプは最も苦しい。",
      mad_researcher:       "探求衝動が外部制約によって封じられている。この圧力はいつか爆発する。",
      revolutionary:        "変革衝動が抑えられている。この状態が最も危険な爆発的解放を準備している。",
      mystic_seeker:        "感覚・直感の表現が制限されている。内部への没入が加速している可能性がある。",
      altruist_operator:    "支援への衝動が環境によってブロックされている。フラストレーションが蓄積する。",
      reality_adapter:      "このタイプは抑制に比較的耐性があるが、長期化すると本来の能力が失われる。",
      lone_craftsman:       "作業への集中を邪魔され続けている。この状態での出力品質は著しく低下する。",
      creative_impulse:     "創造衝動が封じられている。最も本人が苦しむ状態の一つ。",
      social_circulator:    "流動性が制限されている。固定した役割・環境への拘束が本質を抑えている。",
      harmony_supporter:    "支援したくても動けない制約がある。無力感が蓄積しやすい。"
    }
  },

  RECOVERING: {
    id: "RECOVERING",
    label: "RECOVERING",
    name: "回復中",
    color: "rgba(0,200,200,0.85)",
    icon: "◑",
    desc: "消耗・崩壊・抑制から回復の過程にある。まだ不安定だが、上昇の方向にある状態。",
    condition: "ベクトルが底から上昇中。完全な回復にはまだ時間が必要だが、方向性は正しい。この状態に気づくこと自体が回復の証である。",
    recovery: "無理な加速をしないことが最重要。回復のペースを外部から押し付けられると逆行する。",
    typeComments: {
      abyss_architect:      "設計への意欲が少しずつ戻ってきている。完全回復まで焦らないことが重要。",
      civilization_operator:"運営能力が段階的に回復している。まだ全力は出さなくていい段階にある。",
      solitary_observer:    "観測への関心が再点火し始めている。静かな環境でこの回復を加速できる。",
      mad_researcher:       "探求への好奇心が再び動き始めている。小さな発見から積み上げていける状態。",
      revolutionary:        "変革への意欲が再点火しつつある。この段階では小さな行動から始めることが有効。",
      mystic_seeker:        "直感のアンテナが少しずつ感度を取り戻している。急がず感覚に従うこと。",
      altruist_operator:    "他者への関心が回復しつつある。まず自分の回復が完了してから動くことが重要。",
      reality_adapter:      "現実適応能力が段階的に回復している。このタイプの回復は比較的速い。",
      lone_craftsman:       "作業への集中力が少しずつ戻ってきている。小さな完成から再スタートできる状態。",
      creative_impulse:     "創造衝動が再び動き始めている。完成度より発火することを優先できる段階。",
      social_circulator:    "社会との接続への意欲が戻ってきている。慎重に接触範囲を広げていける状態。",
      harmony_supporter:    "場への関与が再開しつつある。まず自分の境界線を確認してから動くこと。"
    }
  },

  COLLAPSED: {
    id: "COLLAPSED",
    label: "COLLAPSED",
    name: "構造崩壊",
    color: "rgba(255,60,60,0.85)",
    icon: "✕",
    desc: "タイプ構造が一時的に機能不全を起こしている。本来の特性が出力されていない最も深刻な状態。",
    condition: "通常の機能を維持するためのコストが最大化している。外部への出力が困難になっており、内部でも整合性が失われつつある。",
    recovery: "最優先事項は安全の確保。環境の変化・信頼できる他者への接触・最低限の生活維持が回復の基盤になる。",
    typeComments: {
      abyss_architect:      "設計の全体像が見えなくなっている。この状態では何も設計できない。それで構わない。",
      civilization_operator:"運営の全てを手放すことが必要な状態にある。休止が唯一の回復経路。",
      solitary_observer:    "観測そのものが苦痛になっている。世界から一時的に目を閉じることが許される。",
      mad_researcher:       "探求への衝動が完全に消えている。これは緊急の休止が必要なサインである。",
      revolutionary:        "変革への意欲が消失し、無力感に変わっている。今は変えることより生き残ることを優先する。",
      mystic_seeker:        "感覚が麻痺しているか、または過負荷になっている。外部刺激を最小化することが必要。",
      altruist_operator:    "他者を支える前に、自分を支える人を見つけることが緊急の課題になっている。",
      reality_adapter:      "このタイプがここまで崩壊することは稀。深刻な外部要因がある可能性が高い。",
      lone_craftsman:       "作業への意欲が完全に消えている。強制的な継続は禁止。完全な停止が必要。",
      creative_impulse:     "創造衝動の完全な消失は、このタイプにとって最も深刻なサインである。",
      social_circulator:    "社会との全ての接続が切れている。最低一人の信頼できる人との接触が最優先。",
      harmony_supporter:    "場を支えることを全て停止することが必要。今は誰かに支えられる番である。"
    }
  },

  MATURE: {
    id: "MATURE",
    label: "MATURE",
    name: "安定成熟",
    color: "rgba(0,220,180,0.85)",
    icon: "◆",
    desc: "タイプ構造が深化・洗練された状態。本来の特性が最大限に発揮され、弱点が統合されている。",
    condition: "長期的な経験と自己理解によって、タイプの特性が磨かれている。単なる安定ではなく、深い確信と共に機能している状態。",
    recovery: null,
    typeComments: {
      abyss_architect:      "設計が現実と接続し始めている。孤独な設計者から、文明を動かす設計者へと変化している。",
      civilization_operator:"運営が使命と結びついている。効率だけでなく、意味のある組織を動かしている。",
      solitary_observer:    "観測が行動に変換できるようになってきた。記録するだけでなく、影響を与えている。",
      mad_researcher:       "探求が世界に届く形を持ち始めている。孤独な研究が文明に触れ始める段階。",
      revolutionary:        "壊した後に何を作るかを知っている。破壊者から再建者へと進化している段階。",
      mystic_seeker:        "直感を検証する能力が育っている。感じることと証明することが統合されつつある。",
      altruist_operator:    "支援が組織設計のレベルに達している。一人を支えるのではなく、場そのものを作っている。",
      reality_adapter:      "現実維持と変革のバランスを理解している。いつ変えて、いつ守るかを知っている。",
      lone_craftsman:       "孤独な深度が、世界に届く言語を持ち始めた。伝えることと作ることが一体化している。",
      creative_impulse:     "衝動が完成まで持続するようになった。作り続けることと、残すことが両立している。",
      social_circulator:    "流動性が方向性を持ち始めた。流れるだけでなく、流れを作ることができている。",
      harmony_supporter:    "場の設計ができるようになった。個人のケアから、構造的な安定の構築者へ進化している。"
    }
  }
};


// ══════════════════════════════════════════════════
// STATE ANALYSIS 質問（全10問）
// 各選択肢は state スコアを加算する
// stateScores = { STABLE, OVERCLOCKED, FATIGUED, DETACHED, SUPPRESSED, RECOVERING, COLLAPSED, MATURE }
// ══════════════════════════════════════════════════

const STATE_QUESTIONS = [
  {
    id: "sq01",
    preface: "STATE PROBE 01 // COGNITIVE LOAD",
    text: "最近、思考が止まらない・止められないと感じることがある",
    options: [
      { text: "かなり当てはまる。思考が際限なく続く感覚がある",
        scores: { OVERCLOCKED: 3, DETACHED: 1 } },
      { text: "少し当てはまる。考えすぎることがある",
        scores: { OVERCLOCKED: 2, STABLE: 1 } },
      { text: "あまり当てはまらない。思考は必要なときに動く",
        scores: { STABLE: 2, MATURE: 1 } },
      { text: "全く当てはまらない。むしろ何も考えたくない",
        scores: { FATIGUED: 3, COLLAPSED: 1 } }
    ]
  },
  {
    id: "sq02",
    preface: "STATE PROBE 02 // ENERGY OUTPUT",
    text: "本来好きだったこと・熱中できていたことへの反応が変わっている",
    options: [
      { text: "以前より反応が鈍くなっている",
        scores: { FATIGUED: 3, COLLAPSED: 1 } },
      { text: "逆に過剰に反応しすぎることがある",
        scores: { OVERCLOCKED: 2, RECOVERING: 1 } },
      { text: "感覚は変わっているが、動ける状態にある",
        scores: { RECOVERING: 2, STABLE: 1 } },
      { text: "安定して関われている",
        scores: { STABLE: 2, MATURE: 2 } }
    ]
  },
  {
    id: "sq03",
    preface: "STATE PROBE 03 // REALITY CONNECTION",
    text: "現実の出来事より、自分の内部の思考・感覚の方が鮮明に感じる",
    options: [
      { text: "明らかにそう。現実感が薄い",
        scores: { DETACHED: 3, COLLAPSED: 1 } },
      { text: "どちらかといえばそう。内側が優先される",
        scores: { DETACHED: 2, OVERCLOCKED: 1 } },
      { text: "時々そういうことがある程度",
        scores: { STABLE: 1, RECOVERING: 1 } },
      { text: "現実の方がはっきりしている",
        scores: { STABLE: 2, MATURE: 1 } }
    ]
  },
  {
    id: "sq04",
    preface: "STATE PROBE 04 // ENVIRONMENTAL PRESSURE",
    text: "周囲の環境・期待に合わせるために、本来の自分の思考や行動を抑えている感覚がある",
    options: [
      { text: "強くある。本来の自分が出せていない",
        scores: { SUPPRESSED: 3, FATIGUED: 1 } },
      { text: "多少はある。状況に応じて抑えている",
        scores: { SUPPRESSED: 2, STABLE: 1 } },
      { text: "ほとんどない。比較的自由に動けている",
        scores: { STABLE: 2, MATURE: 1 } },
      { text: "全くない。今の環境は自分に合っている",
        scores: { STABLE: 3, MATURE: 2 } }
    ]
  },
  {
    id: "sq05",
    preface: "STATE PROBE 05 // CONTINUITY",
    text: "最近の自分の状態を、これまでの自分と比べると",
    options: [
      { text: "崩れている・機能が落ちていると感じる",
        scores: { COLLAPSED: 2, FATIGUED: 2 } },
      { text: "疲れているが、何とか機能している",
        scores: { FATIGUED: 2, RECOVERING: 1 } },
      { text: "回復してきている・上向きになっている",
        scores: { RECOVERING: 3, STABLE: 1 } },
      { text: "安定しているか、以前より深みが増している",
        scores: { STABLE: 2, MATURE: 3 } }
    ]
  },
  {
    id: "sq06",
    preface: "STATE PROBE 06 // EXTERNAL OUTPUT",
    text: "自分の考えや行動を外部へ出力（発言・行動・創作など）することについて",
    options: [
      { text: "出力できない・したくない状態にある",
        scores: { COLLAPSED: 2, SUPPRESSED: 2 } },
      { text: "出力したいが、過剰になりすぎて制御が難しい",
        scores: { OVERCLOCKED: 3, UNSTABLE: 1 } },
      { text: "出力できているが、疲れを感じながらやっている",
        scores: { FATIGUED: 2, RECOVERING: 1 } },
      { text: "自然に、適切なタイミングで出力できている",
        scores: { STABLE: 2, MATURE: 2 } }
    ]
  },
  {
    id: "sq07",
    preface: "STATE PROBE 07 // SELF AWARENESS",
    text: "現在の自分の状態を、どの程度把握できているか",
    options: [
      { text: "把握できていない・分からない状態にある",
        scores: { COLLAPSED: 2, DETACHED: 2 } },
      { text: "なんとなく把握しているが、対処できていない",
        scores: { FATIGUED: 2, SUPPRESSED: 1 } },
      { text: "把握しており、少しずつ対処しようとしている",
        scores: { RECOVERING: 3, STABLE: 1 } },
      { text: "明確に把握しており、適切に対応できている",
        scores: { STABLE: 2, MATURE: 3 } }
    ]
  },
  {
    id: "sq08",
    preface: "STATE PROBE 08 // LONG-TERM ORIENTATION",
    text: "現在の自分は、長期的な目標・ビジョンとどう関係しているか",
    options: [
      { text: "長期のことを考える余裕が全くない",
        scores: { COLLAPSED: 2, FATIGUED: 2 } },
      { text: "考えようとするが、思考が散漫になる",
        scores: { OVERCLOCKED: 2, DETACHED: 1 } },
      { text: "少しずつ再接続できてきている",
        scores: { RECOVERING: 3, STABLE: 1 } },
      { text: "長期ビジョンと現在の行動が連動している",
        scores: { STABLE: 2, MATURE: 3 } }
    ]
  },
  {
    id: "sq09",
    preface: "STATE PROBE 09 // SOCIAL INTERFACE",
    text: "他者との接触・コミュニケーションについて今感じること",
    options: [
      { text: "誰とも関わりたくない・関われない",
        scores: { COLLAPSED: 2, DETACHED: 2 } },
      { text: "関わりたいが、消耗する。必要最低限になっている",
        scores: { FATIGUED: 2, SUPPRESSED: 1 } },
      { text: "選択的に関われる。必要な接触はできる",
        scores: { RECOVERING: 2, STABLE: 2 } },
      { text: "自然に、適切な形で関われている",
        scores: { STABLE: 2, MATURE: 2 } }
    ]
  },
  {
    id: "sq10",
    preface: "STATE PROBE 10 // STRUCTURAL INTEGRITY",
    text: "今の自分の「在り方」について、最も近いものを選ぶ",
    options: [
      { text: "崩れている・何かが根本的にずれている感覚",
        scores: { COLLAPSED: 3, DETACHED: 1 } },
      { text: "無理に形を保っている・限界が近い感覚",
        scores: { SUPPRESSED: 2, FATIGUED: 2 } },
      { text: "まだ不安定だが、方向は見えてきた感覚",
        scores: { RECOVERING: 3, OVERCLOCKED: 1 } },
      { text: "安定している・または以前より深くなった感覚",
        scores: { STABLE: 2, MATURE: 3 } }
    ]
  }
];


// ══════════════════════════════════════════════════
// STATE 算出関数
// ══════════════════════════════════════════════════

/**
 * STATE スコアから最終STATEを決定する
 * @param {Object} stateScores - { STATE_ID: number } の累積スコア
 * @returns {Object} - MENTAL_STATES の該当エントリ
 */
function calcMentalState(stateScores) {
  // スコアが最大のSTATEを選ぶ
  let maxScore = -1;
  let result = "STABLE";
  for (const [stateId, score] of Object.entries(stateScores)) {
    if (score > maxScore && MENTAL_STATES[stateId]) {
      maxScore = score;
      result   = stateId;
    }
  }
  return MENTAL_STATES[result];
}
