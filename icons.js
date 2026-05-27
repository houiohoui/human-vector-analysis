/**
 * icons.js — TYPE VISUAL RECORD
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 各タイプの「概念アバター」をSVGで定義する。
 * 画像ファイル不要。全てインラインSVG。
 *
 * 設計方針：
 *   - 顔・感情は表現しない（概念記号として機能する）
 *   - SCP記録風「SUBJECT VISUAL RECORD」
 *   - 状態：normal / runaway / mature の3種
 *   - カラーは各タイプのtypes.js color に準拠
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const TYPE_ICONS = {

  // ─────────────────────────────────
  // TYPE-Ω7 深淵設計者
  // 多重同心円 + 中心の青白瞳 + 幾何学フレーム
  // ─────────────────────────────────
  abyss_architect: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <filter id="glow-aa">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="noise-aa">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
            <feComposite in="SourceGraphic" in2="gray" operator="in"/>
          </filter>
        </defs>
        <!-- 背景グリッド -->
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(0,200,255,0.08)" stroke-width="0.5"/>
        <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(0,200,255,0.08)" stroke-width="0.5"/>
        <!-- 外側の多重円 -->
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,200,255,0.12)" stroke-width="0.5"/>
        <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0,200,255,0.18)" stroke-width="0.5" stroke-dasharray="4 3"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(0,200,255,0.25)" stroke-width="1"/>
        <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(0,200,255,0.35)" stroke-width="1"/>
        <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(0,200,255,0.5)" stroke-width="1.5"/>
        <!-- 幾何学フレーム（四角） -->
        <rect x="15" y="15" width="170" height="170" fill="none" stroke="rgba(0,200,255,0.1)" stroke-width="0.5"/>
        <rect x="60" y="60" width="80" height="80" fill="none" stroke="rgba(0,200,255,0.2)" stroke-width="0.5" transform="rotate(45 100 100)"/>
        <!-- 十字線 -->
        <line x1="100" y1="55" x2="100" y2="145" stroke="rgba(0,200,255,0.25)" stroke-width="0.5"/>
        <line x1="55" y1="100" x2="145" y2="100" stroke="rgba(0,200,255,0.25)" stroke-width="0.5"/>
        <!-- 中心の瞳 -->
        <ellipse cx="100" cy="100" rx="18" ry="10" fill="rgba(0,10,20,0.9)" stroke="rgba(0,200,255,0.7)" stroke-width="1.5" filter="url(#glow-aa)"/>
        <ellipse cx="100" cy="100" rx="7" ry="7" fill="rgba(0,200,255,0.9)" filter="url(#glow-aa)"/>
        <ellipse cx="100" cy="100" rx="3" ry="3" fill="#fff"/>
        <!-- スキャンライン -->
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(0,200,255,0.06)" stroke-width="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-80;0,80;0,0" dur="6s" repeatCount="indefinite"/>
        </line>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(0,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(0,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(0,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(0,200,255,0.35)" stroke-width="1.5" fill="none"/>
      </svg>`,

    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <defs>
          <filter id="glitch-aa">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <rect width="200" height="200" fill="rgba(40,0,0,0.3)"/>
        <!-- 崩壊した多重円 -->
        <circle cx="100" cy="97" r="75" fill="none" stroke="rgba(255,40,40,0.3)" stroke-width="1" stroke-dasharray="2 5"/>
        <circle cx="103" cy="100" r="55" fill="none" stroke="rgba(255,60,60,0.5)" stroke-width="1" stroke-dasharray="3 2"/>
        <circle cx="98" cy="103" r="35" fill="none" stroke="rgba(255,80,80,0.7)" stroke-width="1.5"/>
        <!-- ノイズライン群 -->
        <line x1="0" y1="88" x2="200" y2="92" stroke="rgba(0,200,255,0.4)" stroke-width="0.5"/>
        <line x1="0" y1="102" x2="200" y2="99" stroke="rgba(0,200,255,0.3)" stroke-width="0.5"/>
        <line x1="0" y1="115" x2="200" y2="111" stroke="rgba(0,200,255,0.2)" stroke-width="0.5"/>
        <!-- 崩壊した瞳 -->
        <ellipse cx="100" cy="100" rx="20" ry="12" fill="rgba(20,0,0,0.9)" stroke="rgba(255,40,40,0.8)" stroke-width="2"/>
        <ellipse cx="100" cy="100" rx="8" ry="8" fill="rgba(255,60,60,0.9)"/>
        <rect x="95" y="87" width="2" height="26" fill="rgba(255,200,0,0.8)"/>
        <!-- グリッチブロック -->
        <rect x="20" y="80" width="60" height="4" fill="rgba(0,200,255,0.15)"/>
        <rect x="120" y="110" width="50" height="3" fill="rgba(255,40,40,0.2)"/>
        <rect x="60" y="130" width="80" height="2" fill="rgba(0,200,255,0.1)"/>
      </svg>`,

    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs>
          <filter id="glow-aa-m">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- 安定した巨大同心円 -->
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,200,255,0.25)" stroke-width="1"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(0,200,255,0.4)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(0,200,255,0.6)" stroke-width="2"/>
        <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(0,200,255,0.8)" stroke-width="2.5" filter="url(#glow-aa-m)"/>
        <!-- 巨大構造フレーム -->
        <polygon points="100,5 195,55 195,145 100,195 5,145 5,55" fill="none" stroke="rgba(0,200,255,0.15)" stroke-width="0.5"/>
        <!-- 中心の安定した瞳 -->
        <ellipse cx="100" cy="100" rx="20" ry="12" fill="rgba(0,5,15,0.95)" stroke="rgba(0,220,255,1)" stroke-width="2" filter="url(#glow-aa-m)"/>
        <ellipse cx="100" cy="100" rx="8" ry="8" fill="rgba(0,200,255,1)" filter="url(#glow-aa-m)"/>
        <ellipse cx="100" cy="100" rx="3" ry="3" fill="#ffffff"/>
        <!-- 放射線 -->
        <line x1="100" y1="30" x2="100" y2="68" stroke="rgba(0,200,255,0.4)" stroke-width="1"/>
        <line x1="100" y1="132" x2="100" y2="170" stroke="rgba(0,200,255,0.4)" stroke-width="1"/>
        <line x1="30" y1="100" x2="68" y2="100" stroke="rgba(0,200,255,0.4)" stroke-width="1"/>
        <line x1="132" y1="100" x2="170" y2="100" stroke="rgba(0,200,255,0.4)" stroke-width="1"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Σ4 文明運営者
  // 金属フレーム + 歯車構造 + 六角形グリッド
  // ─────────────────────────────────
  civilization_operator: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <!-- 六角形外枠 -->
        <polygon points="100,10 175,52 175,148 100,190 25,148 25,52" fill="none" stroke="rgba(255,160,0,0.3)" stroke-width="1.5"/>
        <polygon points="100,30 158,62 158,138 100,170 42,138 42,62" fill="none" stroke="rgba(255,160,0,0.2)" stroke-width="1"/>
        <!-- グリッド線 -->
        <line x1="25" y1="100" x2="175" y2="100" stroke="rgba(255,160,0,0.1)" stroke-width="0.5"/>
        <line x1="62" y1="35" x2="138" y2="165" stroke="rgba(255,160,0,0.1)" stroke-width="0.5"/>
        <line x1="138" y1="35" x2="62" y2="165" stroke="rgba(255,160,0,0.1)" stroke-width="0.5"/>
        <!-- 中心の歯車風 -->
        <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,160,0,0.5)" stroke-width="2" stroke-dasharray="6 3"/>
        <circle cx="100" cy="100" r="18" fill="rgba(15,10,0,0.9)" stroke="rgba(255,160,0,0.7)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="8" fill="rgba(255,160,0,0.8)"/>
        <!-- 歯車の歯 -->
        <rect x="97" y="62" width="6" height="10" rx="1" fill="rgba(255,160,0,0.5)"/>
        <rect x="97" y="128" width="6" height="10" rx="1" fill="rgba(255,160,0,0.5)"/>
        <rect x="62" y="97" width="10" height="6" rx="1" fill="rgba(255,160,0,0.5)"/>
        <rect x="128" y="97" width="10" height="6" rx="1" fill="rgba(255,160,0,0.5)"/>
        <rect x="73" y="73" width="8" height="8" rx="1" fill="rgba(255,160,0,0.35)" transform="rotate(45 77 77)"/>
        <rect x="119" y="73" width="8" height="8" rx="1" fill="rgba(255,160,0,0.35)" transform="rotate(45 123 77)"/>
        <rect x="73" y="119" width="8" height="8" rx="1" fill="rgba(255,160,0,0.35)" transform="rotate(45 77 123)"/>
        <rect x="119" y="119" width="8" height="8" rx="1" fill="rgba(255,160,0,0.35)" transform="rotate(45 123 123)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(255,160,0,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(255,160,0,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(255,160,0,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(255,160,0,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <polygon points="100,10 175,52 175,148 100,190 25,148 25,52" fill="rgba(30,15,0,0.3)" stroke="rgba(255,80,0,0.5)" stroke-width="2"/>
        <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(255,80,0,0.6)" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="100" cy="100" r="18" fill="rgba(30,10,0,0.9)" stroke="rgba(255,60,0,0.8)" stroke-width="2"/>
        <circle cx="100" cy="100" r="8" fill="rgba(255,80,0,0.9)"/>
        <!-- 制御不能ライン -->
        <line x1="30" y1="60" x2="80" y2="90" stroke="rgba(255,160,0,0.4)" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="170" y1="60" x2="120" y2="90" stroke="rgba(255,160,0,0.4)" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="100" y1="165" x2="100" y2="120" stroke="rgba(255,160,0,0.4)" stroke-width="1" stroke-dasharray="2 3"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-co"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <polygon points="100,10 175,52 175,148 100,190 25,148 25,52" fill="none" stroke="rgba(255,200,80,0.5)" stroke-width="2" filter="url(#glow-co)"/>
        <polygon points="100,35 152,65 152,135 100,165 48,135 48,65" fill="none" stroke="rgba(255,180,0,0.3)" stroke-width="1"/>
        <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(255,200,80,0.6)" stroke-width="2"/>
        <circle cx="100" cy="100" r="14" fill="rgba(255,200,80,0.9)" filter="url(#glow-co)"/>
        <circle cx="100" cy="100" r="6" fill="#fff"/>
        <line x1="25" y1="100" x2="175" y2="100" stroke="rgba(255,180,0,0.2)" stroke-width="0.5"/>
        <line x1="62" y1="35" x2="138" y2="165" stroke="rgba(255,180,0,0.2)" stroke-width="0.5"/>
        <line x1="138" y1="35" x2="62" y2="165" stroke="rgba(255,180,0,0.2)" stroke-width="0.5"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Δ9 孤高観測者
  // ノイズグリッド + フード + 単眼（目だけ見える）
  // ─────────────────────────────────
  solitary_observer: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <filter id="noise-so">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="n"/>
            <feColorMatrix type="saturate" values="0" in="n" result="g"/>
            <feBlend in="SourceGraphic" in2="g" mode="overlay" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>
        <!-- ノイズ背景テクスチャ -->
        <rect width="200" height="200" fill="none" filter="url(#noise-so)" opacity="0.3"/>
        <!-- 水平スキャンライン群 -->
        <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(180,100,255,0.08)" stroke-width="1"/>
        <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="140" x2="200" y2="140" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="160" x2="200" y2="160" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="180" x2="200" y2="180" stroke="rgba(180,100,255,0.06)" stroke-width="1"/>
        <!-- フード（暗い三角シルエット） -->
        <path d="M100,5 C60,20 25,60 30,120 C35,160 65,195 100,195 C135,195 165,160 170,120 C175,60 140,20 100,5 Z" fill="rgba(8,6,14,0.85)" stroke="rgba(180,100,255,0.15)" stroke-width="1"/>
        <!-- フードの影 -->
        <path d="M100,5 C60,20 45,50 50,90 C55,105 70,110 100,110 C130,110 145,105 150,90 C155,50 140,20 100,5 Z" fill="rgba(4,3,8,0.6)"/>
        <!-- 目だけ見える -->
        <ellipse cx="100" cy="108" rx="28" ry="14" fill="rgba(180,100,255,0.1)"/>
        <ellipse cx="100" cy="108" rx="12" ry="6" fill="rgba(180,100,255,0.8)"/>
        <ellipse cx="100" cy="108" rx="5" ry="5" fill="rgba(200,120,255,1)"/>
        <ellipse cx="100" cy="108" rx="2" ry="2" fill="#fff"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(180,100,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(180,100,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(180,100,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(180,100,255,0.35)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <path d="M100,5 C60,20 25,60 30,120 C35,160 65,195 100,195 C135,195 165,160 170,120 C175,60 140,20 100,5 Z" fill="rgba(6,4,10,0.9)" stroke="rgba(100,50,150,0.2)" stroke-width="1"/>
        <!-- 目が消えかけている -->
        <ellipse cx="100" cy="108" rx="12" ry="6" fill="rgba(100,60,150,0.3)"/>
        <ellipse cx="100" cy="108" rx="4" ry="4" fill="rgba(120,70,180,0.5)"/>
        <!-- ノイズ断片 -->
        <rect x="30" y="90" width="20" height="2" fill="rgba(180,100,255,0.15)"/>
        <rect x="150" y="100" width="15" height="2" fill="rgba(180,100,255,0.1)"/>
        <rect x="60" y="130" width="8" height="2" fill="rgba(180,100,255,0.12)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-so"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <line x1="0" y1="150" x2="200" y2="150" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <line x1="0" y1="180" x2="200" y2="180" stroke="rgba(180,100,255,0.1)" stroke-width="1"/>
        <path d="M100,5 C60,20 25,60 30,120 C35,160 65,195 100,195 C135,195 165,160 170,120 C175,60 140,20 100,5 Z" fill="rgba(10,6,20,0.85)" stroke="rgba(200,140,255,0.4)" stroke-width="1.5" filter="url(#glow-so)"/>
        <ellipse cx="100" cy="108" rx="32" ry="16" fill="rgba(180,100,255,0.15)" filter="url(#glow-so)"/>
        <ellipse cx="100" cy="108" rx="14" ry="7" fill="rgba(200,130,255,0.9)" filter="url(#glow-so)"/>
        <ellipse cx="100" cy="108" rx="6" ry="6" fill="rgba(220,160,255,1)"/>
        <ellipse cx="100" cy="108" rx="2.5" ry="2.5" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Ψ3 狂気研究者
  // 壊れた解析画面 + グリッチ + 数式断片
  // ─────────────────────────────────
  mad_researcher: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <!-- 壊れたモニター枠 -->
        <rect x="15" y="25" width="170" height="130" rx="4" fill="none" stroke="rgba(255,80,80,0.3)" stroke-width="1.5"/>
        <rect x="20" y="30" width="160" height="120" rx="2" fill="rgba(10,0,0,0.5)" stroke="rgba(255,80,80,0.15)" stroke-width="0.5"/>
        <!-- 解析データライン -->
        <line x1="25" y1="55" x2="175" y2="55" stroke="rgba(255,80,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="80" x2="175" y2="80" stroke="rgba(255,80,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="105" x2="175" y2="105" stroke="rgba(255,80,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="130" x2="175" y2="130" stroke="rgba(255,80,80,0.2)" stroke-width="0.5"/>
        <!-- グリッチブロック（ランダムな矩形） -->
        <rect x="30" y="42" width="45" height="6" fill="rgba(255,80,80,0.25)"/>
        <rect x="80" y="42" width="20" height="6" fill="rgba(255,80,80,0.15)"/>
        <rect x="110" y="42" width="55" height="6" fill="rgba(255,80,80,0.2)"/>
        <rect x="30" y="67" width="30" height="6" fill="rgba(255,80,80,0.2)"/>
        <rect x="68" y="67" width="60" height="6" fill="rgba(255,80,80,0.3)"/>
        <rect x="136" y="67" width="34" height="6" fill="rgba(255,80,80,0.15)"/>
        <rect x="30" y="92" width="80" height="6" fill="rgba(0,200,255,0.2)"/>
        <rect x="118" y="92" width="52" height="6" fill="rgba(255,80,80,0.25)"/>
        <rect x="30" y="117" width="15" height="6" fill="rgba(255,80,80,0.3)"/>
        <rect x="53" y="117" width="90" height="6" fill="rgba(255,80,80,0.2)"/>
        <!-- 中心の赤い点（観測点） -->
        <circle cx="100" cy="90" r="8" fill="rgba(255,80,80,0.8)" stroke="rgba(255,120,120,0.5)" stroke-width="1"/>
        <circle cx="100" cy="90" r="3" fill="#fff"/>
        <!-- ズレた水平線（グリッチ） -->
        <rect x="0" y="73" width="200" height="3" fill="rgba(255,80,80,0.1)">
          <animateTransform attributeName="transform" type="translate" values="0,0;8,0;-5,0;0,0" dur="3s" repeatCount="indefinite"/>
        </rect>
        <!-- 下部スタンド -->
        <rect x="85" y="155" width="30" height="8" rx="2" fill="rgba(255,80,80,0.15)" stroke="rgba(255,80,80,0.2)" stroke-width="1"/>
        <rect x="70" y="163" width="60" height="6" rx="2" fill="rgba(255,80,80,0.1)" stroke="rgba(255,80,80,0.15)" stroke-width="1"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(255,80,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(255,80,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(255,80,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(255,80,80,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <rect x="15" y="25" width="170" height="130" rx="4" fill="rgba(20,0,0,0.4)" stroke="rgba(255,30,30,0.6)" stroke-width="2"/>
        <!-- ほぼ全画面ノイズ -->
        <rect x="20" y="30" width="160" height="120" rx="2" fill="rgba(30,0,0,0.8)"/>
        <rect x="25" y="35" width="70" height="8" fill="rgba(255,30,30,0.5)"/>
        <rect x="30" y="50" width="140" height="4" fill="rgba(255,30,30,0.3)"/>
        <rect x="25" y="61" width="100" height="8" fill="rgba(255,30,30,0.4)"/>
        <rect x="25" y="76" width="40" height="4" fill="rgba(255,80,80,0.6)"/>
        <rect x="72" y="76" width="90" height="4" fill="rgba(255,30,30,0.3)"/>
        <rect x="25" y="87" width="155" height="8" fill="rgba(255,30,30,0.2)"/>
        <rect x="25" y="102" width="80" height="4" fill="rgba(255,60,60,0.5)"/>
        <rect x="112" y="102" width="60" height="4" fill="rgba(255,30,30,0.4)"/>
        <rect x="25" y="115" width="155" height="8" fill="rgba(255,30,30,0.3)"/>
        <rect x="25" y="130" width="50" height="4" fill="rgba(255,80,80,0.5)"/>
        <circle cx="100" cy="90" r="12" fill="rgba(255,20,20,0.9)"/>
        <circle cx="100" cy="90" r="4" fill="#ff8080"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-mr"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <rect x="15" y="25" width="170" height="130" rx="4" fill="none" stroke="rgba(255,120,80,0.5)" stroke-width="1.5" filter="url(#glow-mr)"/>
        <rect x="20" y="30" width="160" height="120" rx="2" fill="rgba(10,5,0,0.6)"/>
        <!-- 整然としたデータ -->
        <line x1="25" y1="55" x2="175" y2="55" stroke="rgba(255,120,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="80" x2="175" y2="80" stroke="rgba(255,120,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="105" x2="175" y2="105" stroke="rgba(255,120,80,0.2)" stroke-width="0.5"/>
        <line x1="25" y1="130" x2="175" y2="130" stroke="rgba(255,120,80,0.2)" stroke-width="0.5"/>
        <rect x="30" y="42" width="140" height="6" fill="rgba(255,120,80,0.3)"/>
        <rect x="30" y="67" width="100" height="6" fill="rgba(255,120,80,0.25)"/>
        <rect x="30" y="92" width="120" height="6" fill="rgba(255,120,80,0.3)"/>
        <rect x="30" y="117" width="90" height="6" fill="rgba(255,120,80,0.25)"/>
        <circle cx="100" cy="90" r="10" fill="rgba(255,150,80,0.9)" filter="url(#glow-mr)"/>
        <circle cx="100" cy="90" r="4" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Λ1 革命家
  // 赤い亀裂線 + 放射状爆発 + 仮面の破片
  // ─────────────────────────────────
  revolutionary: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <filter id="glow-rev">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- 放射状の背景ライン -->
        <line x1="100" y1="100" x2="100" y2="5" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <line x1="100" y1="100" x2="181" y2="53" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <line x1="100" y1="100" x2="181" y2="147" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <line x1="100" y1="100" x2="100" y2="195" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <line x1="100" y1="100" x2="19" y2="147" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <line x1="100" y1="100" x2="19" y2="53" stroke="rgba(255,50,100,0.12)" stroke-width="1"/>
        <!-- 亀裂ライン（メイン） -->
        <path d="M100,10 L93,55 L108,70 L88,100 L105,115 L95,145 L100,190" stroke="rgba(255,50,100,0.8)" stroke-width="2" fill="none" filter="url(#glow-rev)"/>
        <!-- 亀裂の枝 -->
        <path d="M93,55 L60,40" stroke="rgba(255,50,100,0.4)" stroke-width="1" fill="none"/>
        <path d="M108,70 L145,58" stroke="rgba(255,50,100,0.4)" stroke-width="1" fill="none"/>
        <path d="M88,100 L45,95" stroke="rgba(255,50,100,0.35)" stroke-width="1" fill="none"/>
        <path d="M105,115 L155,120" stroke="rgba(255,50,100,0.35)" stroke-width="1" fill="none"/>
        <path d="M95,145 L55,160" stroke="rgba(255,50,100,0.3)" stroke-width="1" fill="none"/>
        <!-- 亀裂の内側の光 -->
        <path d="M100,10 L93,55 L108,70 L88,100 L105,115 L95,145 L100,190" stroke="rgba(255,150,180,0.3)" stroke-width="1" fill="none"/>
        <!-- 中心の炎 -->
        <circle cx="100" cy="100" r="10" fill="rgba(255,50,100,0.9)" filter="url(#glow-rev)"/>
        <circle cx="100" cy="100" r="4" fill="rgba(255,200,200,1)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(255,50,100,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(255,50,100,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(255,50,100,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(255,50,100,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <defs><filter id="glow-rev-r"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <!-- 全方位の亀裂 -->
        <path d="M100,100 L20,10" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L180,15" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L195,90" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L180,185" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L20,185" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L5,110" stroke="rgba(255,30,60,0.6)" stroke-width="1.5" fill="none"/>
        <path d="M100,100 L100,195" stroke="rgba(255,30,60,0.7)" stroke-width="2" fill="none"/>
        <path d="M100,100 L100,5" stroke="rgba(255,30,60,0.7)" stroke-width="2" fill="none"/>
        <circle cx="100" cy="100" r="15" fill="rgba(255,20,50,1)" filter="url(#glow-rev-r)"/>
        <circle cx="100" cy="100" r="6" fill="#fff"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-rev-m"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <!-- 制御された亀裂 + 設計の円 -->
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,100,140,0.15)" stroke-width="1"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,100,140,0.25)" stroke-width="1"/>
        <path d="M100,20 L93,65 L108,80 L88,100 L105,115 L95,145 L100,180" stroke="rgba(255,100,140,0.7)" stroke-width="1.5" fill="none" filter="url(#glow-rev-m)"/>
        <circle cx="100" cy="100" r="12" fill="rgba(255,80,120,0.9)" filter="url(#glow-rev-m)"/>
        <circle cx="100" cy="100" r="5" fill="#fff"/>
        <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="181" y2="50" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="181" y2="150" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="19" y2="150" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="19" y2="50" stroke="rgba(255,100,140,0.2)" stroke-width="0.5"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-θ2 神秘探索者
  // 螺旋 + 霧 + 第三の目
  // ─────────────────────────────────
  mystic_seeker: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <radialGradient id="mist-ms" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(100,255,180,0.15)"/>
            <stop offset="100%" stop-color="rgba(100,255,180,0)"/>
          </radialGradient>
        </defs>
        <!-- 霧の背景 -->
        <circle cx="100" cy="100" r="90" fill="url(#mist-ms)"/>
        <!-- 螺旋ライン -->
        <path d="M100,100 C100,85 115,75 115,60 C115,40 95,28 80,35 C60,45 55,70 65,85 C78,105 105,112 118,100 C135,85 132,60 118,48 C100,32 72,30 58,45 C38,65 40,100 55,115 C75,135 110,138 128,120 C150,98 148,65 130,50" stroke="rgba(100,255,180,0.4)" stroke-width="1" fill="none"/>
        <!-- 霧の粒子（小円群） -->
        <circle cx="70" cy="70" r="3" fill="rgba(100,255,180,0.15)"/>
        <circle cx="130" cy="60" r="2" fill="rgba(100,255,180,0.1)"/>
        <circle cx="155" cy="100" r="4" fill="rgba(100,255,180,0.1)"/>
        <circle cx="140" cy="140" r="3" fill="rgba(100,255,180,0.12)"/>
        <circle cx="60" cy="130" r="2" fill="rgba(100,255,180,0.1)"/>
        <circle cx="45" cy="90" r="3" fill="rgba(100,255,180,0.12)"/>
        <!-- 第三の目（中心） -->
        <ellipse cx="100" cy="100" rx="22" ry="14" fill="rgba(4,8,12,0.9)" stroke="rgba(100,255,180,0.5)" stroke-width="1.5"/>
        <ellipse cx="100" cy="100" rx="10" ry="10" fill="rgba(100,255,180,0.85)"/>
        <ellipse cx="100" cy="100" rx="4" ry="4" fill="rgba(180,255,220,1)"/>
        <ellipse cx="100" cy="100" rx="1.5" ry="1.5" fill="#fff"/>
        <!-- 上下のまつ毛的な線 -->
        <path d="M78,96 C85,90 115,90 122,96" stroke="rgba(100,255,180,0.4)" stroke-width="1" fill="none"/>
        <path d="M78,104 C85,110 115,110 122,104" stroke="rgba(100,255,180,0.4)" stroke-width="1" fill="none"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(100,255,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(100,255,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(100,255,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(100,255,180,0.35)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <defs><radialGradient id="mist-ms-r" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(100,255,180,0.3)"/><stop offset="100%" stop-color="rgba(100,255,180,0.05)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#mist-ms-r)"/>
        <!-- 崩れた螺旋 -->
        <path d="M100,100 C100,75 125,55 125,30 C125,5 90,0 70,15 C40,35 35,80 55,100 C80,125 130,125 145,100 C165,70 155,30 135,18" stroke="rgba(100,255,180,0.5)" stroke-width="1.5" fill="none"/>
        <!-- 現実が溶けた感の背景 -->
        <circle cx="60" cy="60" r="15" fill="rgba(100,255,180,0.06)"/>
        <circle cx="140" cy="140" r="20" fill="rgba(100,255,180,0.04)"/>
        <ellipse cx="100" cy="100" rx="30" ry="18" fill="rgba(4,8,12,0.95)" stroke="rgba(100,255,180,0.7)" stroke-width="2"/>
        <ellipse cx="100" cy="100" rx="14" ry="14" fill="rgba(100,255,180,0.95)"/>
        <ellipse cx="100" cy="100" rx="6" ry="6" fill="#fff"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-ms"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="mist-ms-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(100,255,180,0.2)"/><stop offset="100%" stop-color="rgba(100,255,180,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#mist-ms-m)"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(100,255,180,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(100,255,180,0.25)" stroke-width="1"/>
        <path d="M100,100 C100,85 115,75 115,60 C115,40 95,28 80,35 C60,45 55,70 65,85 C78,105 105,112 118,100" stroke="rgba(100,255,180,0.5)" stroke-width="1.5" fill="none"/>
        <ellipse cx="100" cy="100" rx="24" ry="15" fill="rgba(4,8,12,0.9)" stroke="rgba(150,255,200,0.8)" stroke-width="2" filter="url(#glow-ms)"/>
        <ellipse cx="100" cy="100" rx="11" ry="11" fill="rgba(140,255,200,1)" filter="url(#glow-ms)"/>
        <ellipse cx="100" cy="100" rx="4.5" ry="4.5" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-α6 博愛運営者
  // 柔らかい白光 + 繋がりの線 + 開いた手形
  // ─────────────────────────────────
  altruist_operator: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <radialGradient id="warm-ao" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(80,200,120,0.2)"/>
            <stop offset="100%" stop-color="rgba(80,200,120,0)"/>
          </radialGradient>
          <filter id="glow-ao"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <!-- 温かい光 -->
        <circle cx="100" cy="100" r="90" fill="url(#warm-ao)"/>
        <!-- 繋がりの網（他者との接続） -->
        <circle cx="50" cy="60" r="6" fill="rgba(80,200,120,0.4)" stroke="rgba(80,200,120,0.3)" stroke-width="1"/>
        <circle cx="150" cy="55" r="5" fill="rgba(80,200,120,0.35)" stroke="rgba(80,200,120,0.25)" stroke-width="1"/>
        <circle cx="170" cy="120" r="7" fill="rgba(80,200,120,0.4)" stroke="rgba(80,200,120,0.3)" stroke-width="1"/>
        <circle cx="130" cy="170" r="5" fill="rgba(80,200,120,0.35)" stroke="rgba(80,200,120,0.25)" stroke-width="1"/>
        <circle cx="65" cy="165" r="6" fill="rgba(80,200,120,0.4)" stroke="rgba(80,200,120,0.3)" stroke-width="1"/>
        <circle cx="35" cy="130" r="5" fill="rgba(80,200,120,0.35)" stroke="rgba(80,200,120,0.25)" stroke-width="1"/>
        <!-- 接続ライン -->
        <line x1="50" y1="60" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <line x1="150" y1="55" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <line x1="170" y1="120" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <line x1="130" y1="170" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <line x1="65" y1="165" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <line x1="35" y1="130" x2="100" y2="100" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <!-- 中心の光点 -->
        <circle cx="100" cy="100" r="22" fill="rgba(4,12,8,0.9)" stroke="rgba(80,200,120,0.6)" stroke-width="2" filter="url(#glow-ao)"/>
        <circle cx="100" cy="100" r="12" fill="rgba(80,200,120,0.85)" filter="url(#glow-ao)"/>
        <circle cx="100" cy="100" r="5" fill="rgba(200,255,220,1)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(80,200,120,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(80,200,120,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(80,200,120,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(80,200,120,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <defs><radialGradient id="warm-ao-r" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(80,200,120,0.05)"/><stop offset="100%" stop-color="rgba(80,200,120,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#warm-ao-r)"/>
        <!-- 引き伸ばされた接続（過負荷） -->
        <line x1="10" y1="20" x2="100" y2="100" stroke="rgba(80,200,120,0.35)" stroke-width="1.5"/>
        <line x1="190" y1="20" x2="100" y2="100" stroke="rgba(80,200,120,0.35)" stroke-width="1.5"/>
        <line x1="190" y1="180" x2="100" y2="100" stroke="rgba(80,200,120,0.35)" stroke-width="1.5"/>
        <line x1="10" y1="180" x2="100" y2="100" stroke="rgba(80,200,120,0.35)" stroke-width="1.5"/>
        <line x1="100" y1="5" x2="100" y2="100" stroke="rgba(80,200,120,0.4)" stroke-width="2"/>
        <line x1="100" y1="195" x2="100" y2="100" stroke="rgba(80,200,120,0.4)" stroke-width="2"/>
        <circle cx="100" cy="100" r="18" fill="rgba(4,12,8,0.9)" stroke="rgba(80,200,120,0.4)" stroke-width="2"/>
        <circle cx="100" cy="100" r="8" fill="rgba(60,160,90,0.7)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-ao-m"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="warm-ao-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(80,200,120,0.35)"/><stop offset="100%" stop-color="rgba(80,200,120,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#warm-ao-m)"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(80,200,120,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="48" fill="none" stroke="rgba(80,200,120,0.3)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="26" fill="rgba(4,12,8,0.9)" stroke="rgba(100,230,140,0.8)" stroke-width="2" filter="url(#glow-ao-m)"/>
        <circle cx="100" cy="100" r="14" fill="rgba(100,230,140,0.9)" filter="url(#glow-ao-m)"/>
        <circle cx="100" cy="100" r="5" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Φ5 現実適応者
  // 安定した格子 + 中心軸 + 青白の四角
  // ─────────────────────────────────
  reality_adapter: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <!-- 格子背景 -->
        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="0" y1="160" x2="200" y2="160" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="40" y1="0" x2="40" y2="200" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="80" y1="0" x2="80" y2="200" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="120" y1="0" x2="120" y2="200" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <line x1="160" y1="0" x2="160" y2="200" stroke="rgba(150,180,255,0.08)" stroke-width="1"/>
        <!-- 外枠 -->
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="rgba(150,180,255,0.2)" stroke-width="1"/>
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="rgba(150,180,255,0.3)" stroke-width="1"/>
        <!-- 中央の安定した軸 -->
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(150,180,255,0.35)" stroke-width="1.5"/>
        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(150,180,255,0.35)" stroke-width="1.5"/>
        <!-- 中心の四角 -->
        <rect x="80" y="80" width="40" height="40" fill="rgba(5,8,18,0.9)" stroke="rgba(150,180,255,0.6)" stroke-width="2"/>
        <rect x="88" y="88" width="24" height="24" fill="rgba(150,180,255,0.7)"/>
        <rect x="95" y="95" width="10" height="10" fill="#fff"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(150,180,255,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(150,180,255,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(150,180,255,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(150,180,255,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <!-- 硬直した格子 -->
        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="0" y1="160" x2="200" y2="160" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="40" y1="0" x2="40" y2="200" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="80" y1="0" x2="80" y2="200" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="120" y1="0" x2="120" y2="200" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <line x1="160" y1="0" x2="160" y2="200" stroke="rgba(150,180,255,0.15)" stroke-width="1"/>
        <!-- 完全に硬直した中心 -->
        <rect x="70" y="70" width="60" height="60" fill="rgba(5,8,18,0.95)" stroke="rgba(100,130,200,0.8)" stroke-width="3"/>
        <rect x="82" y="82" width="36" height="36" fill="rgba(100,130,200,0.6)"/>
        <rect x="92" y="92" width="16" height="16" fill="rgba(150,180,255,0.9)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-ra"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="0" y1="160" x2="200" y2="160" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="40" y1="0" x2="40" y2="200" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="80" y1="0" x2="80" y2="200" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="120" y1="0" x2="120" y2="200" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <line x1="160" y1="0" x2="160" y2="200" stroke="rgba(150,180,255,0.12)" stroke-width="1"/>
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="rgba(180,200,255,0.3)" stroke-width="1" filter="url(#glow-ra)"/>
        <rect x="60" y="60" width="80" height="80" fill="none" stroke="rgba(180,200,255,0.4)" stroke-width="1.5"/>
        <rect x="82" y="82" width="36" height="36" fill="rgba(5,8,18,0.9)" stroke="rgba(180,200,255,0.8)" stroke-width="2" filter="url(#glow-ra)"/>
        <rect x="89" y="89" width="22" height="22" fill="rgba(180,200,255,0.85)" filter="url(#glow-ra)"/>
        <rect x="96" y="96" width="8" height="8" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Γ8 孤高職人
  // 工具の幾何学 + 削りの跡 + 金属の艶
  // ─────────────────────────────────
  lone_craftsman: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <!-- 削りの平行線群 -->
        <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="70" x2="200" y2="70" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="110" x2="200" y2="110" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="130" x2="200" y2="130" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="150" x2="200" y2="150" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <line x1="0" y1="170" x2="200" y2="170" stroke="rgba(200,160,80,0.07)" stroke-width="2"/>
        <!-- 六角ボルト型フレーム -->
        <polygon points="100,15 160,48 160,113 100,147 40,113 40,48" fill="none" stroke="rgba(200,160,80,0.25)" stroke-width="1.5"/>
        <!-- 十字の工具形状 -->
        <line x1="100" y1="48" x2="100" y2="147" stroke="rgba(200,160,80,0.35)" stroke-width="2"/>
        <line x1="40" y1="80" x2="160" y2="80" stroke="rgba(200,160,80,0.35)" stroke-width="2"/>
        <!-- 中心の精密な四角形 -->
        <rect x="82" y="62" width="36" height="36" fill="rgba(8,6,2,0.9)" stroke="rgba(200,160,80,0.6)" stroke-width="1.5" transform="rotate(0 100 80)"/>
        <rect x="89" y="69" width="22" height="22" fill="rgba(200,160,80,0.75)"/>
        <rect x="96" y="76" width="8" height="8" fill="rgba(240,200,120,1)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(200,160,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(200,160,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(200,160,80,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(200,160,80,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <polygon points="100,15 160,48 160,113 100,147 40,113 40,48" fill="rgba(12,9,3,0.5)" stroke="rgba(150,120,60,0.4)" stroke-width="1"/>
        <line x1="100" y1="48" x2="100" y2="147" stroke="rgba(160,120,50,0.3)" stroke-width="2"/>
        <line x1="40" y1="80" x2="160" y2="80" stroke="rgba(160,120,50,0.3)" stroke-width="2"/>
        <!-- 暗くなった中心 -->
        <rect x="80" y="60" width="40" height="40" fill="rgba(6,4,2,0.95)" stroke="rgba(140,100,40,0.5)" stroke-width="2"/>
        <rect x="88" y="68" width="24" height="24" fill="rgba(120,90,40,0.5)"/>
        <rect x="95" y="75" width="10" height="10" fill="rgba(160,120,60,0.7)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-lc"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <polygon points="100,15 160,48 160,113 100,147 40,113 40,48" fill="none" stroke="rgba(240,200,80,0.4)" stroke-width="2" filter="url(#glow-lc)"/>
        <polygon points="100,30 148,57 148,107 100,133 52,107 52,57" fill="none" stroke="rgba(220,180,70,0.2)" stroke-width="1"/>
        <line x1="100" y1="48" x2="100" y2="133" stroke="rgba(220,180,70,0.3)" stroke-width="1.5"/>
        <line x1="52" y1="82" x2="148" y2="82" stroke="rgba(220,180,70,0.3)" stroke-width="1.5"/>
        <rect x="80" y="62" width="40" height="40" fill="rgba(8,6,2,0.9)" stroke="rgba(240,200,80,0.8)" stroke-width="2" filter="url(#glow-lc)"/>
        <rect x="88" y="70" width="24" height="24" fill="rgba(240,200,80,0.85)" filter="url(#glow-lc)"/>
        <rect x="95" y="77" width="10" height="10" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Ξ0 創造衝動型
  // 爆発する色彩の欠片 + 渦 + ピンク光
  // ─────────────────────────────────
  creative_impulse: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <filter id="glow-ci"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="burst-ci" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,120,200,0.25)"/>
            <stop offset="100%" stop-color="rgba(255,120,200,0)"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#burst-ci)"/>
        <!-- 飛び散る三角形の欠片 -->
        <polygon points="100,100 75,45 65,60" fill="rgba(255,120,200,0.4)"/>
        <polygon points="100,100 145,55 155,75" fill="rgba(255,160,220,0.35)"/>
        <polygon points="100,100 165,95 155,115" fill="rgba(255,120,200,0.3)"/>
        <polygon points="100,100 138,155 118,162" fill="rgba(255,150,210,0.35)"/>
        <polygon points="100,100 62,160 45,148" fill="rgba(255,120,200,0.3)"/>
        <polygon points="100,100 35,110 40,90" fill="rgba(255,160,220,0.35)"/>
        <polygon points="100,100 55,62 72,50" fill="rgba(255,120,200,0.25)"/>
        <!-- 渦の中心 -->
        <circle cx="100" cy="100" r="24" fill="rgba(6,3,8,0.9)" stroke="rgba(255,120,200,0.6)" stroke-width="2" filter="url(#glow-ci)"/>
        <circle cx="100" cy="100" r="13" fill="rgba(255,120,200,0.9)" filter="url(#glow-ci)"/>
        <circle cx="100" cy="100" r="5" fill="rgba(255,220,240,1)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(255,120,200,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(255,120,200,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(255,120,200,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(255,120,200,0.4)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <defs><radialGradient id="burst-ci-r" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,80,160,0.4)"/><stop offset="100%" stop-color="rgba(255,80,160,0.02)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#burst-ci-r)"/>
        <!-- 完全爆散 -->
        <polygon points="100,100 50,10 35,25" fill="rgba(255,80,160,0.5)"/>
        <polygon points="100,100 170,20 185,40" fill="rgba(255,80,160,0.45)"/>
        <polygon points="100,100 195,80 195,110" fill="rgba(255,80,160,0.5)"/>
        <polygon points="100,100 175,175 155,185" fill="rgba(255,80,160,0.45)"/>
        <polygon points="100,100 45,185 25,170" fill="rgba(255,80,160,0.5)"/>
        <polygon points="100,100 5,110 5,80" fill="rgba(255,80,160,0.45)"/>
        <polygon points="100,100 60,15 40,30" fill="rgba(255,80,160,0.3)"/>
        <polygon points="100,100 140,10 160,25" fill="rgba(255,80,160,0.3)"/>
        <circle cx="100" cy="100" r="16" fill="rgba(6,3,8,0.95)" stroke="rgba(255,50,140,0.8)" stroke-width="2"/>
        <circle cx="100" cy="100" r="7" fill="rgba(255,50,140,1)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-ci-m"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="burst-ci-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,160,220,0.2)"/><stop offset="100%" stop-color="rgba(255,160,220,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#burst-ci-m)"/>
        <!-- 制御された欠片（整形） -->
        <polygon points="100,100 80,48 100,42 120,48" fill="rgba(255,160,220,0.4)"/>
        <polygon points="100,100 150,75 155,95 148,112" fill="rgba(255,160,220,0.35)"/>
        <polygon points="100,100 120,155 100,162 80,155" fill="rgba(255,160,220,0.4)"/>
        <polygon points="100,100 50,112 42,95 50,75" fill="rgba(255,160,220,0.35)"/>
        <circle cx="100" cy="100" r="26" fill="rgba(6,3,8,0.9)" stroke="rgba(255,180,230,0.9)" stroke-width="2.5" filter="url(#glow-ci-m)"/>
        <circle cx="100" cy="100" r="14" fill="rgba(255,160,220,0.95)" filter="url(#glow-ci-m)"/>
        <circle cx="100" cy="100" r="5" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Η2 社会循環者
  // 流れる曲線 + 多点接続 + 水色
  // ─────────────────────────────────
  social_circulator: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs><radialGradient id="flow-sc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(100,200,255,0.12)"/><stop offset="100%" stop-color="rgba(100,200,255,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#flow-sc)"/>
        <!-- 流れる曲線 -->
        <path d="M20,100 C40,50 80,30 100,100 C120,170 160,150 180,100" stroke="rgba(100,200,255,0.4)" stroke-width="1.5" fill="none"/>
        <path d="M20,100 C40,150 80,170 100,100 C120,30 160,50 180,100" stroke="rgba(100,200,255,0.25)" stroke-width="1" fill="none"/>
        <path d="M100,20 C50,40 30,80 100,100 C170,120 150,160 100,180" stroke="rgba(100,200,255,0.3)" stroke-width="1" fill="none"/>
        <!-- 接続ノード -->
        <circle cx="20" cy="100" r="5" fill="rgba(100,200,255,0.5)"/>
        <circle cx="180" cy="100" r="5" fill="rgba(100,200,255,0.5)"/>
        <circle cx="100" cy="20" r="4" fill="rgba(100,200,255,0.4)"/>
        <circle cx="100" cy="180" r="4" fill="rgba(100,200,255,0.4)"/>
        <circle cx="40" cy="45" r="4" fill="rgba(100,200,255,0.35)"/>
        <circle cx="160" cy="155" r="4" fill="rgba(100,200,255,0.35)"/>
        <!-- 中心 -->
        <circle cx="100" cy="100" r="20" fill="rgba(4,8,14,0.9)" stroke="rgba(100,200,255,0.55)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="10" fill="rgba(100,200,255,0.8)"/>
        <circle cx="100" cy="100" r="4" fill="#d0f0ff"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(100,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(100,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(100,200,255,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(100,200,255,0.35)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <!-- 流れが止まった -->
        <path d="M20,100 C40,50 80,30 100,100 C120,170 160,150 180,100" stroke="rgba(80,160,200,0.2)" stroke-width="1" fill="none"/>
        <path d="M20,100 C40,150 80,170 100,100 C120,30 160,50 180,100" stroke="rgba(80,160,200,0.15)" stroke-width="1" fill="none"/>
        <circle cx="20" cy="100" r="4" fill="rgba(80,160,200,0.25)"/>
        <circle cx="180" cy="100" r="4" fill="rgba(80,160,200,0.25)"/>
        <circle cx="100" cy="100" r="18" fill="rgba(4,8,14,0.95)" stroke="rgba(80,160,200,0.35)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="8" fill="rgba(80,160,200,0.5)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-sc"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="flow-sc-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(100,200,255,0.22)"/><stop offset="100%" stop-color="rgba(100,200,255,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#flow-sc-m)"/>
        <path d="M20,100 C40,50 80,30 100,100 C120,170 160,150 180,100" stroke="rgba(130,220,255,0.5)" stroke-width="2" fill="none" filter="url(#glow-sc)"/>
        <path d="M20,100 C40,150 80,170 100,100 C120,30 160,50 180,100" stroke="rgba(130,220,255,0.3)" stroke-width="1.5" fill="none"/>
        <circle cx="100" cy="100" r="22" fill="rgba(4,8,14,0.9)" stroke="rgba(130,220,255,0.8)" stroke-width="2" filter="url(#glow-sc)"/>
        <circle cx="100" cy="100" r="12" fill="rgba(130,220,255,0.9)" filter="url(#glow-sc)"/>
        <circle cx="100" cy="100" r="5" fill="#fff"/>
      </svg>`
  },

  // ─────────────────────────────────
  // TYPE-Β3 調和支援者
  // 柔らかい多重光輪 + 穏やかな白 + 補佐形状
  // ─────────────────────────────────
  harmony_supporter: {
    normal: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
        <defs>
          <radialGradient id="soft-hs" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(160,220,180,0.18)"/>
            <stop offset="80%" stop-color="rgba(160,220,180,0.04)"/>
            <stop offset="100%" stop-color="rgba(160,220,180,0)"/>
          </radialGradient>
          <filter id="soft-hs-f"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>
        <!-- 柔らかな光輪 -->
        <circle cx="100" cy="100" r="88" fill="url(#soft-hs)"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(160,220,180,0.12)" stroke-width="1"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(160,220,180,0.15)" stroke-width="1"/>
        <circle cx="100" cy="100" r="52" fill="none" stroke="rgba(160,220,180,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(160,220,180,0.28)" stroke-width="1.5"/>
        <!-- 花弁状の補佐形 -->
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.15)" transform="rotate(0 100 100)"/>
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.12)" transform="rotate(60 100 100)"/>
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.12)" transform="rotate(120 100 100)"/>
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.12)" transform="rotate(180 100 100)"/>
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.12)" transform="rotate(240 100 100)"/>
        <ellipse cx="100" cy="65" rx="10" ry="18" fill="rgba(160,220,180,0.12)" transform="rotate(300 100 100)"/>
        <!-- 中心の穏やかな光 -->
        <circle cx="100" cy="100" r="20" fill="rgba(4,10,6,0.9)" stroke="rgba(160,220,180,0.5)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="11" fill="rgba(160,220,180,0.85)"/>
        <circle cx="100" cy="100" r="5" fill="rgba(220,255,230,1)"/>
        <!-- コーナーマーカー -->
        <path d="M10,10 L10,28 M10,10 L28,10" stroke="rgba(160,220,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,10 L190,28 M190,10 L172,10" stroke="rgba(160,220,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M10,190 L10,172 M10,190 L28,190" stroke="rgba(160,220,180,0.35)" stroke-width="1.5" fill="none"/>
        <path d="M190,190 L190,172 M190,190 L172,190" stroke="rgba(160,220,180,0.35)" stroke-width="1.5" fill="none"/>
      </svg>`,
    runaway: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-runaway">
        <!-- 光が消えかけている -->
        <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(120,180,140,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(120,180,140,0.08)" stroke-width="1"/>
        <circle cx="100" cy="100" r="52" fill="none" stroke="rgba(120,180,140,0.1)" stroke-width="1"/>
        <!-- 引き裂かれた花弁 -->
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.08)" transform="rotate(0 100 100)"/>
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.06)" transform="rotate(60 100 100)"/>
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.06)" transform="rotate(120 100 100)"/>
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.06)" transform="rotate(180 100 100)"/>
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.06)" transform="rotate(240 100 100)"/>
        <ellipse cx="100" cy="65" rx="8" ry="16" fill="rgba(120,180,140,0.06)" transform="rotate(300 100 100)"/>
        <circle cx="100" cy="100" r="18" fill="rgba(4,8,6,0.97)" stroke="rgba(100,160,120,0.3)" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="7" fill="rgba(100,160,120,0.5)"/>
      </svg>`,
    mature: `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg state-mature">
        <defs><filter id="glow-hs"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="soft-hs-m" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(180,240,200,0.3)"/><stop offset="100%" stop-color="rgba(180,240,200,0)"/></radialGradient></defs>
        <circle cx="100" cy="100" r="90" fill="url(#soft-hs-m)"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(180,240,200,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(180,240,200,0.3)" stroke-width="1.5"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.2)" transform="rotate(0 100 100)" filter="url(#glow-hs)"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.15)" transform="rotate(60 100 100)"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.15)" transform="rotate(120 100 100)"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.15)" transform="rotate(180 100 100)"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.15)" transform="rotate(240 100 100)"/>
        <ellipse cx="100" cy="60" rx="12" ry="20" fill="rgba(180,240,200,0.15)" transform="rotate(300 100 100)"/>
        <circle cx="100" cy="100" r="22" fill="rgba(4,10,6,0.9)" stroke="rgba(180,240,200,0.85)" stroke-width="2.5" filter="url(#glow-hs)"/>
        <circle cx="100" cy="100" r="13" fill="rgba(180,240,200,0.95)" filter="url(#glow-hs)"/>
        <circle cx="100" cy="100" r="5.5" fill="#fff"/>
      </svg>`
  }

};

/**
 * タイプアイコンを取得するユーティリティ関数
 * @param {string} typeId   - タイプID
 * @param {string} state    - "normal" | "runaway" | "mature"
 * @returns {string}        - SVG文字列（なければ空文字）
 */
function getTypeIcon(typeId, state = "normal") {
  const entry = TYPE_ICONS[typeId];
  if (!entry) return generateFallbackIcon(typeId);
  return entry[state] || entry.normal || generateFallbackIcon(typeId);
}

/**
 * アイコン未定義タイプ用フォールバック（コードを表示するシンプルなSVG）
 */
function generateFallbackIcon(typeId) {
  const t = DIAGNOSIS_TYPES.find(d => d.id === typeId);
  const color = (t && t.color) ? t.color : "rgba(0,200,255,0.6)";
  const code  = (t && t.code)  ? t.code.split("//")[0].trim() : typeId;
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="type-svg">
      <rect x="15" y="15" width="170" height="170" fill="none" stroke="${color.replace("0.8","0.25")}" stroke-width="1"/>
      <line x1="15" y1="15" x2="185" y2="185" stroke="${color.replace("0.8","0.1")}" stroke-width="0.5"/>
      <line x1="185" y1="15" x2="15" y2="185" stroke="${color.replace("0.8","0.1")}" stroke-width="0.5"/>
      <circle cx="100" cy="100" r="30" fill="${color.replace("0.8","0.1")}" stroke="${color.replace("0.8","0.4")}" stroke-width="1.5"/>
      <text x="100" y="96" text-anchor="middle" fill="${color}" font-family="monospace" font-size="11">CLASSIFIED</text>
      <text x="100" y="111" text-anchor="middle" fill="${color.replace("0.8","0.5")}" font-family="monospace" font-size="8">${code}</text>
      <path d="M10,10 L10,28 M10,10 L28,10" stroke="${color.replace("0.8","0.35")}" stroke-width="1.5" fill="none"/>
      <path d="M190,10 L190,28 M190,10 L172,10" stroke="${color.replace("0.8","0.35")}" stroke-width="1.5" fill="none"/>
      <path d="M10,190 L10,172 M10,190 L28,190" stroke="${color.replace("0.8","0.35")}" stroke-width="1.5" fill="none"/>
      <path d="M190,190 L190,172 M190,190 L172,190" stroke="${color.replace("0.8","0.35")}" stroke-width="1.5" fill="none"/>
    </svg>
  `;
}
