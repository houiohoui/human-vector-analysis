/**
 * questions.js（100問版 v2 — パラメータ拡張版）
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 4層構造 / 重み付きスコア / 各選択肢4〜6パラメータ
 *
 * 層構成：
 *   Layer 1（Q01〜Q40）: 日常行動  weight:1
 *   Layer 2（Q41〜Q70）: 思考傾向  weight:2
 *   Layer 3（Q71〜Q90）: 極限状況  weight:3
 *   Layer 4（Q91〜Q100）:深淵・世界観 weight:2
 *
 * 追加方法：QUESTIONS 配列の末尾に追加。id は連番で。
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const QUESTIONS = [

  // ════════════════════════════════════════
  // LAYER I — 日常行動（Q01〜Q40）weight: 1
  // ════════════════════════════════════════

  {
    id: 1, layer: 1, weight: 1,
    text: "休日の午後、何もする予定がないとき、あなたは自然と何をしているか？",
    options: [
      { label: "A：気になっていたことを調べ続けている", scores: { research: 3, otaku: 2, solitude: 1, expert: 1, meta: 1 } },
      { label: "B：何か作ったり、手を動かしている", scores: { creativity: 3, work: 2, expert: 1, freedom: 1 } },
      { label: "C：動画・SNS・ゲームでゆっくり過ごす", scores: { reality: 2, freedom: 2, endurance: 1 } },
      { label: "D：誰かと話したり、出かけたりする", scores: { love: 3, leadership: 1, reality: 1, observer: 1 } }
    ]
  },
  {
    id: 2, layer: 1, weight: 1,
    text: "買い物をするとき、最も重視するのは？",
    options: [
      { label: "A：性能・スペック", scores: { expert: 3, research: 2, meta: 1, work: 1 } },
      { label: "B：コスパ・費用対効果", scores: { reality: 3, management: 2, work: 1, endurance: 1 } },
      { label: "C：デザイン・見た目", scores: { creativity: 3, freedom: 2, mystic: 1 } },
      { label: "D：ロマン・意味・物語", scores: { mystic: 3, unique: 2, philosophy: 1, creativity: 1 } }
    ]
  },
  {
    id: 3, layer: 1, weight: 1,
    text: "SNSとの距離感として最も近いのは？",
    options: [
      { label: "A：情報収集ツールとして活用している", scores: { research: 3, meta: 2, observer: 1, work: 1 } },
      { label: "B：発信・交流に使っている", scores: { leadership: 3, love: 2, reality: 1, management: 1 } },
      { label: "C：ほどよく使うが依存はしていない", scores: { reality: 3, endurance: 2, meta: 1 } },
      { label: "D：ほぼ使わない・距離を置いている", scores: { solitude: 4, freedom: 2, observer: 1, unique: 1 } }
    ]
  },
  {
    id: 4, layer: 1, weight: 1,
    text: "作業や勉強のとき、集中しやすいのは？",
    options: [
      { label: "A：完全な静寂・一人の空間", scores: { solitude: 4, expert: 1, research: 1, endurance: 1 } },
      { label: "B：BGM・環境音がある場所", scores: { creativity: 2, reality: 2, freedom: 1, work: 1 } },
      { label: "C：カフェなど、人のいる場所", scores: { love: 2, reality: 2, observer: 1 } },
      { label: "D：場所は関係ない、気分次第", scores: { freedom: 3, meta: 2, creativity: 1, endurance: 1 } }
    ]
  },
  {
    id: 5, layer: 1, weight: 1,
    text: "初対面の人との会話で、あなたはどう動くか？",
    options: [
      { label: "A：相手のことを聞き出そうとする", scores: { observer: 3, meta: 2, research: 1, love: 1 } },
      { label: "B：自分の話をして距離を縮める", scores: { leadership: 3, love: 2, reality: 1 } },
      { label: "C：当たり障りなく場に合わせる", scores: { reality: 3, endurance: 2, love: 1, observer: 1 } },
      { label: "D：必要最低限しか話さない", scores: { solitude: 3, observer: 2, freedom: 1, unique: 1 } }
    ]
  },
  {
    id: 6, layer: 1, weight: 1,
    text: "部屋の状態として最も近いのは？",
    options: [
      { label: "A：情報・資料が整理された機能的な空間", scores: { architect: 3, management: 2, work: 1, meta: 1 } },
      { label: "B：物が多いが自分だけの秩序がある", scores: { otaku: 3, unique: 2, freedom: 1, research: 1 } },
      { label: "C：基本的にきれいに保っている", scores: { reality: 3, work: 2, management: 1 } },
      { label: "D：あまり気にしていない", scores: { freedom: 3, creativity: 2, solitude: 1 } }
    ]
  },
  {
    id: 7, layer: 1, weight: 1,
    text: "食事に対するあなたのスタンスは？",
    options: [
      { label: "A：効率重視。栄養が摂れればいい", scores: { work: 3, endurance: 2, research: 1, solitude: 1 } },
      { label: "B：食べること自体が楽しみ", scores: { love: 3, reality: 2, freedom: 1 } },
      { label: "C：こだわりがあり、良いものを選ぶ", scores: { expert: 3, otaku: 2, unique: 1, creativity: 1 } },
      { label: "D：忘れがち。後回しになることが多い", scores: { research: 3, solitude: 2, genius: 1, endurance: 1 } }
    ]
  },
  {
    id: 8, layer: 1, weight: 1,
    text: "睡眠について最も当てはまるのは？",
    options: [
      { label: "A：規則正しく確保するよう努めている", scores: { reality: 3, management: 2, work: 1, endurance: 1 } },
      { label: "B：夜中に活動が活発になりやすい", scores: { research: 3, solitude: 2, creativity: 1, unique: 1 } },
      { label: "C：寝るのが好き・睡眠を大切にする", scores: { freedom: 2, endurance: 2, reality: 1, love: 1 } },
      { label: "D：不規則だが気にしていない", scores: { freedom: 3, creativity: 2, observer: 1 } }
    ]
  },
  {
    id: 9, layer: 1, weight: 1,
    text: "移動中（電車・バスなど）は何をしているか？",
    options: [
      { label: "A：考え事・思考・アイデアを整理する", scores: { philosophy: 3, architect: 2, meta: 1, creativity: 1 } },
      { label: "B：読書・記事・情報収集", scores: { research: 3, expert: 2, work: 1, meta: 1 } },
      { label: "C：音楽・動画・ゲームなどを楽しむ", scores: { reality: 2, freedom: 2, otaku: 1, endurance: 1 } },
      { label: "D：ぼーっとしている・何も考えない", scores: { observer: 3, meta: 2, freedom: 1, mystic: 1 } }
    ]
  },
  {
    id: 10, layer: 1, weight: 1,
    text: "趣味への向き合い方として近いのは？",
    options: [
      { label: "A：深く極める。エンドレスに掘り下げる", scores: { otaku: 4, expert: 2, solitude: 1, genius: 1 } },
      { label: "B：広く浅く、いろいろ試す", scores: { creativity: 3, freedom: 2, observer: 1, meta: 1 } },
      { label: "C：誰かと一緒に楽しむ", scores: { love: 3, leadership: 2, reality: 1 } },
      { label: "D：趣味と呼べるものがあまりない", scores: { work: 3, endurance: 2, reality: 1 } }
    ]
  },
  {
    id: 11, layer: 1, weight: 1,
    text: "締め切りや期限に対して、あなたはどのタイプか？",
    options: [
      { label: "A：前倒しで終わらせる派", scores: { work: 3, management: 2, endurance: 1, reality: 1 } },
      { label: "B：ギリギリまで粘って完成させる", scores: { endurance: 3, creativity: 2, genius: 1, expert: 1 } },
      { label: "C：だいたいいつも遅れがち", scores: { freedom: 3, unique: 2, creativity: 1 } },
      { label: "D：期限より「完成度」を優先する", scores: { expert: 3, genius: 2, solitude: 1, philosophy: 1 } }
    ]
  },
  {
    id: 12, layer: 1, weight: 1,
    text: "怒りを感じたとき、どう処理するか？",
    options: [
      { label: "A：その場で原因を分析・言語化する", scores: { meta: 4, observer: 2, research: 1, architect: 1 } },
      { label: "B：しばらく経ってから冷静に対処する", scores: { endurance: 3, reality: 2, meta: 1 } },
      { label: "C：人に話して発散する", scores: { love: 3, leadership: 2, reality: 1 } },
      { label: "D：作業・運動などに集中して消化する", scores: { work: 3, endurance: 2, solitude: 1, creativity: 1 } }
    ]
  },
  {
    id: 13, layer: 1, weight: 1,
    text: "誰かに頼み事をされたとき、あなたはどうするか？",
    options: [
      { label: "A：基本的に断れない・引き受けてしまう", scores: { love: 4, endurance: 2, reality: 1, leadership: 1 } },
      { label: "B：状況を判断して、できることはやる", scores: { reality: 3, management: 2, meta: 1, work: 1 } },
      { label: "C：自分のキャパを優先して断ることも多い", scores: { solitude: 3, freedom: 2, meta: 1, endurance: 1 } },
      { label: "D：相手の真の目的を考えてから動く", scores: { meta: 3, observer: 3, architect: 1, research: 1 } }
    ]
  },
  {
    id: 14, layer: 1, weight: 1,
    text: "グループ作業での立ち位置として自然なのは？",
    options: [
      { label: "A：全体を仕切る・まとめ役", scores: { leadership: 4, management: 2, meta: 1, endurance: 1 } },
      { label: "B：特定の役割に集中して貢献する", scores: { expert: 4, work: 2, endurance: 1, solitude: 1 } },
      { label: "C：全体を観察してサポートに回る", scores: { observer: 3, love: 2, meta: 1, architect: 1 } },
      { label: "D：グループ作業自体が苦手", scores: { solitude: 4, freedom: 2, unique: 1, expert: 1 } }
    ]
  },
  {
    id: 15, layer: 1, weight: 1,
    text: "映画・ドラマを観るとき、最も楽しんでいるのは？",
    options: [
      { label: "A：構成・伏線・テーマの分析", scores: { meta: 3, architect: 2, research: 1, observer: 1 } },
      { label: "B：キャラクターへの共感・感情移入", scores: { love: 3, observer: 2, mystic: 1, philosophy: 1 } },
      { label: "C：世界観・ビジュアルへの没入", scores: { mystic: 3, creativity: 2, unique: 1, observer: 1 } },
      { label: "D：純粋なエンターテインメントとして", scores: { reality: 3, freedom: 2, endurance: 1 } }
    ]
  },
  {
    id: 16, layer: 1, weight: 1,
    text: "新しい技術や道具を手に入れたとき、最初にすることは？",
    options: [
      { label: "A：マニュアルや仕様を全部読む", scores: { expert: 3, research: 2, meta: 1, endurance: 1 } },
      { label: "B：とりあえず触って試す", scores: { creativity: 3, freedom: 2, work: 1, reality: 1 } },
      { label: "C：活用方法を調べてから使う", scores: { management: 3, work: 2, meta: 1, reality: 1 } },
      { label: "D：必要になるまで放置する", scores: { reality: 2, endurance: 2, freedom: 1, observer: 1 } }
    ]
  },
  {
    id: 17, layer: 1, weight: 1,
    text: "日常生活でストレスを感じるのはどんな場面か？",
    options: [
      { label: "A：自分の時間・空間を侵害されるとき", scores: { solitude: 4, freedom: 2, unique: 1, expert: 1 } },
      { label: "B：理不尽なルールや慣習に縛られるとき", scores: { revolution: 3, unique: 2, philosophy: 1, freedom: 1 } },
      { label: "C：成果が出ない・成長を感じないとき", scores: { genius: 3, endurance: 2, work: 1, expert: 1 } },
      { label: "D：人間関係の摩擦・軋轢が続くとき", scores: { love: 2, observer: 2, endurance: 1, solitude: 1 } }
    ]
  },
  {
    id: 18, layer: 1, weight: 1,
    text: "本棚（または検索履歴・閲覧履歴）を見たら、どのジャンルが多いか？",
    options: [
      { label: "A：科学・技術・専門書", scores: { research: 4, expert: 2, meta: 1, architect: 1 } },
      { label: "B：哲学・思想・歴史・人文", scores: { philosophy: 4, unique: 2, mystic: 1, meta: 1 } },
      { label: "C：ビジネス・経済・実用書", scores: { management: 3, work: 2, reality: 1, leadership: 1 } },
      { label: "D：エンタメ・創作・サブカル", scores: { otaku: 4, creativity: 2, freedom: 1, unique: 1 } }
    ]
  },
  {
    id: 19, layer: 1, weight: 1,
    text: "お金の使い方として最も近いのは？",
    options: [
      { label: "A：将来への投資・自己研鑽に使う", scores: { genius: 3, work: 2, management: 1, endurance: 1 } },
      { label: "B：好きなものに惜しみなく使う", scores: { otaku: 3, freedom: 2, creativity: 1, unique: 1 } },
      { label: "C：きちんと管理して無駄遣いしない", scores: { management: 4, reality: 2, work: 1 } },
      { label: "D：あまり管理していない・貯まったら使う", scores: { freedom: 3, creativity: 2, observer: 1 } }
    ]
  },
  {
    id: 20, layer: 1, weight: 1,
    text: "会話中、相手が明らかに間違いを言っているとき、あなたはどうするか？",
    options: [
      { label: "A：すぐに正確な情報で訂正する", scores: { expert: 3, meta: 2, research: 1, unique: 1 } },
      { label: "B：状況を見て、必要なら指摘する", scores: { reality: 3, observer: 2, meta: 1, love: 1 } },
      { label: "C：波風を立てないよう黙っている", scores: { endurance: 3, love: 2, reality: 1, observer: 1 } },
      { label: "D：なぜそう思うのか興味が出て掘り下げる", scores: { research: 3, observer: 2, meta: 1, philosophy: 1 } }
    ]
  },
  {
    id: 21, layer: 1, weight: 1,
    text: "「計画」と「即興」、あなたのスタイルはどちらに近いか？",
    options: [
      { label: "A：常に計画を立てて動く", scores: { management: 4, architect: 2, work: 1, endurance: 1 } },
      { label: "B：大枠だけ決めて、細部は柔軟に", scores: { meta: 3, reality: 2, architect: 1, freedom: 1 } },
      { label: "C：そのとき気分で動く", scores: { freedom: 4, creativity: 2, mystic: 1 } },
      { label: "D：状況によって使い分ける", scores: { meta: 3, reality: 2, management: 1, observer: 1 } }
    ]
  },
  {
    id: 22, layer: 1, weight: 1,
    text: "自分の感情について、あなたはどう認識しているか？",
    options: [
      { label: "A：よく分析・言語化している", scores: { meta: 4, philosophy: 2, observer: 1, research: 1 } },
      { label: "B：感じるまま、直感的に動く", scores: { creativity: 3, freedom: 2, mystic: 1, love: 1 } },
      { label: "C：感情は抑えて論理的に判断する", scores: { observer: 3, endurance: 2, meta: 1, work: 1 } },
      { label: "D：自分の感情がよくわからない", scores: { solitude: 3, mystic: 2, observer: 1, philosophy: 1 } }
    ]
  },
  {
    id: 23, layer: 1, weight: 1,
    text: "集団の中での自分の「居場所」として自然なのは？",
    options: [
      { label: "A：中心にいて引っ張っている", scores: { leadership: 4, revolution: 1, management: 1, genius: 1 } },
      { label: "B：縁の下で支えている", scores: { love: 3, endurance: 2, work: 1, observer: 1 } },
      { label: "C：少し外側から観察している", scores: { observer: 4, solitude: 2, meta: 1, unique: 1 } },
      { label: "D：集団自体を避けがち", scores: { solitude: 4, freedom: 2, unique: 1, expert: 1 } }
    ]
  },
  {
    id: 24, layer: 1, weight: 1,
    text: "旅行するとして、選ぶスタイルは？",
    options: [
      { label: "A：徹底的に調べてから行く", scores: { research: 3, expert: 2, meta: 1, work: 1 } },
      { label: "B：大まかなルートだけ決めて自由に動く", scores: { freedom: 4, creativity: 2, observer: 1 } },
      { label: "C：誰かと一緒に、楽しく過ごす", scores: { love: 3, reality: 2, leadership: 1 } },
      { label: "D：旅行にあまり興味がない", scores: { solitude: 3, work: 2, expert: 1, research: 1 } }
    ]
  },
  {
    id: 25, layer: 1, weight: 1,
    text: "締め切りのない自由な時間が1ヶ月あったら、何をするか？",
    options: [
      { label: "A：ずっと調べたかったことを研究する", scores: { research: 4, otaku: 2, solitude: 1, expert: 1 } },
      { label: "B：何か作品・プロジェクトを完成させる", scores: { creativity: 4, work: 2, genius: 1, expert: 1 } },
      { label: "C：世界中を旅して経験を積む", scores: { freedom: 4, reality: 2, creativity: 1, observer: 1 } },
      { label: "D：休息・睡眠・回復に充てる", scores: { endurance: 3, reality: 2, love: 1 } }
    ]
  },
  {
    id: 26, layer: 1, weight: 1,
    text: "読書（または情報収集）のスタイルは？",
    options: [
      { label: "A：1冊を丁寧に読み込む", scores: { expert: 3, endurance: 2, research: 1, solitude: 1 } },
      { label: "B：複数を並行して読む", scores: { meta: 3, architect: 2, creativity: 1, research: 1 } },
      { label: "C：目次・要点だけ素早く取り込む", scores: { management: 3, work: 2, reality: 1, meta: 1 } },
      { label: "D：気分で気になった箇所だけ読む", scores: { freedom: 3, creativity: 2, mystic: 1, observer: 1 } }
    ]
  },
  {
    id: 27, layer: 1, weight: 1,
    text: "ミスをしたとき、最初の反応は？",
    options: [
      { label: "A：原因を分析して再発防止を考える", scores: { meta: 4, architect: 2, research: 1, endurance: 1 } },
      { label: "B：すぐ謝って関係修復を優先する", scores: { love: 3, reality: 2, endurance: 1, leadership: 1 } },
      { label: "C：しばらく引きずるが、立ち直る", scores: { endurance: 3, philosophy: 2, genius: 1 } },
      { label: "D：深く気にせず、次に切り替える", scores: { reality: 3, freedom: 2, endurance: 1, work: 1 } }
    ]
  },
  {
    id: 28, layer: 1, weight: 1,
    text: "人に何かを教えるとき、あなたのスタイルは？",
    options: [
      { label: "A：体系的・論理的に説明する", scores: { architect: 3, expert: 2, meta: 1, research: 1 } },
      { label: "B：相手のペースに合わせて伝える", scores: { leadership: 3, love: 3, observer: 1 } },
      { label: "C：自分でやって見せる", scores: { work: 3, expert: 2, endurance: 1 } },
      { label: "D：人に教えるのが苦手・向いていない", scores: { solitude: 3, expert: 2, unique: 1, freedom: 1 } }
    ]
  },
  {
    id: 29, layer: 1, weight: 1,
    text: "自分の考えを整理するとき、どんな方法を使うか？",
    options: [
      { label: "A：文章・メモに書き出す", scores: { architect: 3, meta: 2, research: 1, philosophy: 1 } },
      { label: "B：図・マップ・構造図を描く", scores: { architect: 4, research: 1, meta: 1, creativity: 1 } },
      { label: "C：頭の中だけで整理する", scores: { meta: 3, solitude: 2, genius: 1, philosophy: 1 } },
      { label: "D：話しながら整理する", scores: { leadership: 3, love: 2, reality: 1 } }
    ]
  },
  {
    id: 30, layer: 1, weight: 1,
    text: "新しい環境（職場・学校など）に入ったとき、どう動くか？",
    options: [
      { label: "A：まず全体の構造・人間関係を把握する", scores: { observer: 4, meta: 2, architect: 1, management: 1 } },
      { label: "B：積極的に自分を売り込む・関係を作る", scores: { leadership: 3, love: 2, management: 1, revolution: 1 } },
      { label: "C：しばらく様子を見て慎重に動く", scores: { reality: 3, endurance: 2, observer: 1, meta: 1 } },
      { label: "D：とりあえず自分の仕事をこなす", scores: { work: 3, endurance: 2, reality: 1, expert: 1 } }
    ]
  },
  {
    id: 31, layer: 1, weight: 1,
    text: "「承認欲求」について、自分に最も近い感覚は？",
    options: [
      { label: "A：ほとんどない。他人の評価に興味がない", scores: { solitude: 4, genius: 2, freedom: 1, unique: 1 } },
      { label: "B：あるが、自分でコントロールできている", scores: { meta: 3, reality: 2, endurance: 1, observer: 1 } },
      { label: "C：人に認めてほしい気持ちは強い方だ", scores: { love: 3, leadership: 2, genius: 1 } },
      { label: "D：特定の人・分野だけに認められたい", scores: { expert: 3, genius: 2, solitude: 1, unique: 1 } }
    ]
  },
  {
    id: 32, layer: 1, weight: 1,
    text: "「なんとなく嫌な予感」を感じたとき、どう動くか？",
    options: [
      { label: "A：その感覚の根拠を分析しようとする", scores: { meta: 4, research: 2, architect: 1, observer: 1 } },
      { label: "B：予感を信じて行動を変える", scores: { mystic: 3, freedom: 2, unique: 1, endurance: 1 } },
      { label: "C：とりあえず動いて確かめる", scores: { reality: 3, work: 2, endurance: 1 } },
      { label: "D：気にしないようにする", scores: { endurance: 3, reality: 2, work: 1 } }
    ]
  },
  {
    id: 33, layer: 1, weight: 1,
    text: "自分の「強み」として最も実感しているのは？",
    options: [
      { label: "A：深く考え抜く力", scores: { research: 3, philosophy: 2, meta: 1, genius: 1 } },
      { label: "B：人を巻き込む・動かす力", scores: { leadership: 4, management: 2, love: 1 } },
      { label: "C：黙々と続ける粘り強さ", scores: { endurance: 4, expert: 2, work: 1, solitude: 1 } },
      { label: "D：新しいアイデアを生む力", scores: { creativity: 4, unique: 2, freedom: 1, genius: 1 } }
    ]
  },
  {
    id: 34, layer: 1, weight: 1,
    text: "長期的なプロジェクトを途中で諦めたことはあるか？",
    options: [
      { label: "A：ほとんどない。始めたことは終わらせる", scores: { endurance: 4, work: 2, genius: 1, expert: 1 } },
      { label: "B：優先度が下がったものは切る", scores: { management: 3, meta: 2, reality: 1, architect: 1 } },
      { label: "C：熱量が冷めると続けられない", scores: { freedom: 3, creativity: 2, unique: 1 } },
      { label: "D：完璧にできないと分かると止まる", scores: { expert: 3, genius: 2, philosophy: 1, endurance: 1 } }
    ]
  },
  {
    id: 35, layer: 1, weight: 1,
    text: "「孤独な時間」に対してどう感じるか？",
    options: [
      { label: "A：最も生産的で好きな時間", scores: { solitude: 5, research: 2, expert: 1, genius: 1 } },
      { label: "B：必要だが、長くは続けたくない", scores: { endurance: 2, reality: 2, meta: 1, work: 1 } },
      { label: "C：できれば避けたい", scores: { love: 3, leadership: 2, reality: 1 } },
      { label: "D：孤独かどうか気にしたことがない", scores: { work: 3, observer: 2, endurance: 1, freedom: 1 } }
    ]
  },
  {
    id: 36, layer: 1, weight: 1,
    text: "問題に直面したとき、最初にすることは？",
    options: [
      { label: "A：原因・構造を調べる", scores: { research: 3, architect: 2, meta: 1, expert: 1 } },
      { label: "B：すぐに行動・試行錯誤する", scores: { work: 4, reality: 2, endurance: 1 } },
      { label: "C：誰かに相談する", scores: { love: 3, leadership: 2, reality: 1, observer: 1 } },
      { label: "D：しばらく放置して自然に解決するか様子を見る", scores: { freedom: 3, observer: 2, meta: 1 } }
    ]
  },
  {
    id: 37, layer: 1, weight: 1,
    text: "「自分は普通だと思うか？」という問いへの答えは？",
    options: [
      { label: "A：普通ではないと思う（良くも悪くも）", scores: { unique: 4, genius: 2, philosophy: 1, observer: 1 } },
      { label: "B：普通だと思う（それが悪いとは思わない）", scores: { reality: 4, work: 2, endurance: 1 } },
      { label: "C：考えたことがない", scores: { observer: 3, freedom: 2, reality: 1 } },
      { label: "D：「普通」の定義が気になる", scores: { philosophy: 3, meta: 3, research: 1, unique: 1 } }
    ]
  },
  {
    id: 38, layer: 1, weight: 1,
    text: "人に「ありがとう」と言われたとき、どんな気持ちになるか？",
    options: [
      { label: "A：素直に嬉しい", scores: { love: 3, reality: 2, leadership: 1 } },
      { label: "B：照れるが嬉しい", scores: { endurance: 2, reality: 2, love: 1, solitude: 1 } },
      { label: "C：あまりピンとこない・淡々としている", scores: { solitude: 3, observer: 2, expert: 1, work: 1 } },
      { label: "D：その人の「何が良かったか」を確認したくなる", scores: { meta: 3, research: 2, observer: 1, architect: 1 } }
    ]
  },
  {
    id: 39, layer: 1, weight: 1,
    text: "「人生の意味」という問いに対して、今のあなたは？",
    options: [
      { label: "A：答えを探し続けている", scores: { philosophy: 4, mystic: 2, research: 1, genius: 1 } },
      { label: "B：自分なりの答えを持っている", scores: { genius: 3, meta: 2, philosophy: 1, endurance: 1 } },
      { label: "C：そんな問いより今やることが大事", scores: { reality: 4, work: 2, endurance: 1 } },
      { label: "D：意味はないと思っているが、それでいい", scores: { philosophy: 3, freedom: 2, observer: 1, unique: 1 } }
    ]
  },
  {
    id: 40, layer: 1, weight: 1,
    text: "「集中状態（フロー）」に入りやすいのはどんな作業か？",
    options: [
      { label: "A：深く調べる・分析する作業", scores: { research: 4, expert: 2, solitude: 1, meta: 1 } },
      { label: "B：何かを作る・組み立てる作業", scores: { creativity: 3, architect: 2, work: 1, expert: 1 } },
      { label: "C：人と話す・議論する", scores: { leadership: 3, love: 2, observer: 1 } },
      { label: "D：ルーティン作業・黙々とこなす", scores: { work: 3, endurance: 3, solitude: 1, reality: 1 } }
    ]
  },

  // ════════════════════════════════════════
  // LAYER II — 思考傾向（Q41〜Q70）weight: 2
  // ════════════════════════════════════════

  {
    id: 41, layer: 2, weight: 2,
    text: "知らない分野に突然出会ったとき、どう反応するか？",
    options: [
      { label: "A：とにかく全部調べたくなる", scores: { research: 4, otaku: 2, expert: 1, unique: 1 } },
      { label: "B：自分の知識と繋げて理解しようとする", scores: { meta: 4, architect: 2, research: 1, observer: 1 } },
      { label: "C：必要になるまで保留する", scores: { reality: 3, work: 2, endurance: 1 } },
      { label: "D：その分野の「最深部」だけ気になる", scores: { expert: 3, unique: 2, genius: 1, solitude: 1 } }
    ]
  },
  {
    id: 42, layer: 2, weight: 2,
    text: "複雑な問題を解決するとき、どのアプローチが近いか？",
    options: [
      { label: "A：まず全体像・構造を把握してから細部へ", scores: { architect: 4, meta: 2, observer: 1, management: 1 } },
      { label: "B：細部から積み上げて全体を作る", scores: { expert: 3, work: 2, endurance: 1, research: 1 } },
      { label: "C：直感で動いて後から修正する", scores: { creativity: 3, freedom: 2, reality: 1, endurance: 1 } },
      { label: "D：他者の知見を集めて判断する", scores: { leadership: 3, management: 2, love: 1, observer: 1 } }
    ]
  },
  {
    id: 43, layer: 2, weight: 2,
    text: "「自分の思考パターン」について、どれだけ把握しているか？",
    options: [
      { label: "A：かなり把握している・常に観察している", scores: { meta: 5, observer: 2, research: 1, philosophy: 1 } },
      { label: "B：ある程度は分かっている", scores: { meta: 3, reality: 2, work: 1 } },
      { label: "C：あまり考えたことがない", scores: { work: 2, reality: 2, endurance: 1 } },
      { label: "D：把握しようとするが難しい", scores: { philosophy: 3, meta: 2, mystic: 1, unique: 1 } }
    ]
  },
  {
    id: 44, layer: 2, weight: 2,
    text: "目標を立てるとき、どんな設定をするか？",
    options: [
      { label: "A：具体的・数値化できる短中期目標", scores: { work: 4, management: 2, reality: 1, endurance: 1 } },
      { label: "B：大きなビジョンだけ描いて逆算する", scores: { genius: 3, architect: 2, management: 1, revolution: 1 } },
      { label: "C：とくに目標を立てない・行動ベース", scores: { freedom: 3, reality: 2, creativity: 1 } },
      { label: "D：文明・歴史スケールの長期目標", scores: { genius: 4, philosophy: 2, architect: 1, unique: 1 } }
    ]
  },
  {
    id: 45, layer: 2, weight: 2,
    text: "学習の動機として最も強いのは？",
    options: [
      { label: "A：純粋な好奇心・知りたい衝動", scores: { research: 4, otaku: 2, genius: 1, freedom: 1 } },
      { label: "B：役に立てたい・実用したい", scores: { work: 3, management: 2, love: 1, reality: 1 } },
      { label: "C：誰かに認められたい", scores: { genius: 3, leadership: 2, love: 1 } },
      { label: "D：自分が生き延びるために必要だから", scores: { reality: 3, endurance: 2, work: 1, observer: 1 } }
    ]
  },
  {
    id: 46, layer: 2, weight: 2,
    text: "議論や討論の場でのあなたの姿勢は？",
    options: [
      { label: "A：構造的な矛盾・前提を指摘する", scores: { meta: 4, architect: 2, research: 1, philosophy: 1 } },
      { label: "B：具体的な解決策を出す", scores: { work: 3, management: 2, reality: 1, leadership: 1 } },
      { label: "C：全体を俯瞰して静観する", scores: { observer: 4, solitude: 2, meta: 1, philosopher: 1, philosophy: 1 } },
      { label: "D：感情的な調和・場の空気を読む", scores: { love: 3, reality: 2, leadership: 1, observer: 1 } }
    ]
  },
  {
    id: 47, layer: 2, weight: 2,
    text: "失敗に直面したとき、最も強く感じることは？",
    options: [
      { label: "A：なぜ失敗したかを解明したい", scores: { research: 3, meta: 3, architect: 1, expert: 1 } },
      { label: "B：次にどうすれば成功するかを考える", scores: { work: 3, endurance: 2, management: 1, genius: 1 } },
      { label: "C：しばらく落ち込むが回復する", scores: { endurance: 3, reality: 2, love: 1 } },
      { label: "D：失敗した自分への強い怒り", scores: { genius: 3, endurance: 2, philosophy: 1, revolution: 1 } }
    ]
  },
  {
    id: 48, layer: 2, weight: 2,
    text: "創造のプロセスとして近いのは？",
    options: [
      { label: "A：ゼロから構築する（白紙から考える）", scores: { creativity: 4, unique: 2, genius: 1, solitude: 1 } },
      { label: "B：既存を組み合わせ・改良する", scores: { architect: 3, management: 2, meta: 1, work: 1 } },
      { label: "C：衝動的に始めて後から整える", scores: { creativity: 3, freedom: 2, mystic: 1, endurance: 1 } },
      { label: "D：必要に迫られてから作る", scores: { work: 3, reality: 2, endurance: 2 } }
    ]
  },
  {
    id: 49, layer: 2, weight: 2,
    text: "「常識」に対するあなたの基本的な態度は？",
    options: [
      { label: "A：疑ってかかるのがデフォルト", scores: { unique: 4, revolution: 2, research: 1, philosophy: 1 } },
      { label: "B：根拠を確認してから従う", scores: { research: 3, meta: 2, reality: 1, expert: 1 } },
      { label: "C：大体は正しいと思って従う", scores: { reality: 3, work: 2, endurance: 1 } },
      { label: "D：常識より「機能するかどうか」で判断する", scores: { architect: 3, management: 2, meta: 1, work: 1 } }
    ]
  },
  {
    id: 50, layer: 2, weight: 2,
    text: "他者の評価・批判に対して、あなたはどう反応するか？",
    options: [
      { label: "A：内容を分析し、正しければ取り入れる", scores: { meta: 4, endurance: 1, research: 1, architect: 1 } },
      { label: "B：感情的に揺れるが、最終的には気にしない", scores: { endurance: 3, freedom: 2, reality: 1, love: 1 } },
      { label: "C：かなり気になり、長く引きずる", scores: { love: 2, endurance: 1, philosophy: 1 } },
      { label: "D：特定の人以外の評価はあまり気にしない", scores: { solitude: 3, genius: 2, unique: 1, expert: 1 } }
    ]
  },
  {
    id: 51, layer: 2, weight: 2,
    text: "「正しさ」と「勝つこと」が衝突したとき、あなたはどうするか？",
    options: [
      { label: "A：正しさを選ぶ。たとえ負けても", scores: { philosophy: 4, revolution: 2, genius: 1, endurance: 1 } },
      { label: "B：勝つ手段を探しながら正しさを保つ", scores: { management: 3, architect: 2, meta: 1, endurance: 1 } },
      { label: "C：現実的に「勝てる範囲」で動く", scores: { reality: 4, work: 2, endurance: 1 } },
      { label: "D：「正しさ」の定義から疑いなおす", scores: { philosophy: 3, unique: 2, meta: 1, research: 1 } }
    ]
  },
  {
    id: 52, layer: 2, weight: 2,
    text: "自分が強く惹かれる「タイプの人間」は？",
    options: [
      { label: "A：一つの道を極め続けている人", scores: { expert: 3, genius: 2, solitude: 1, endurance: 1 } },
      { label: "B：人を動かすカリスマがある人", scores: { leadership: 3, observer: 2, management: 1, revolution: 1 } },
      { label: "C：誰も見たことない発想をする人", scores: { unique: 4, creativity: 2, genius: 1, research: 1 } },
      { label: "D：どんな状況でもブレない人", scores: { endurance: 3, philosophy: 2, genius: 1, reality: 1 } }
    ]
  },
  {
    id: 53, layer: 2, weight: 2,
    text: "「未来」について考えるとき、何スケールで考えるか？",
    options: [
      { label: "A：自分の人生スケール（数十年）", scores: { reality: 3, management: 2, work: 1, endurance: 1 } },
      { label: "B：文明・社会スケール（数百年）", scores: { genius: 3, architect: 2, revolution: 1, observer: 1 } },
      { label: "C：宇宙・存在スケール（数十億年）", scores: { philosophy: 4, mystic: 2, unique: 1, observer: 1 } },
      { label: "D：あまり未来は考えない", scores: { freedom: 3, reality: 2, work: 1 } }
    ]
  },
  {
    id: 54, layer: 2, weight: 2,
    text: "「自分にとっての真実」はどうやって見つけるか？",
    options: [
      { label: "A：論理・証拠・検証で判断する", scores: { research: 4, meta: 2, expert: 1, architect: 1 } },
      { label: "B：直感・体感で判断する", scores: { mystic: 3, freedom: 2, creativity: 1, unique: 1 } },
      { label: "C：様々な視点を集めて統合する", scores: { architect: 3, observer: 2, meta: 1, management: 1 } },
      { label: "D：問いかけ続けることが答えだと思う", scores: { philosophy: 4, unique: 2, mystic: 1, research: 1 } }
    ]
  },
  {
    id: 55, layer: 2, weight: 2,
    text: "「チームの成功」と「自分の成長」、優先するのは？",
    options: [
      { label: "A：自分の成長が先。それがチームにも繋がる", scores: { genius: 3, expert: 2, endurance: 1, solitude: 1 } },
      { label: "B：チームの成功の中に自分の成長がある", scores: { leadership: 3, love: 2, management: 1, work: 1 } },
      { label: "C：状況による。どちらかに縛られない", scores: { meta: 3, freedom: 2, reality: 1 } },
      { label: "D：チームより個人の方が好きな働き方", scores: { solitude: 3, expert: 2, freedom: 1, unique: 1 } }
    ]
  },
  {
    id: 56, layer: 2, weight: 2,
    text: "あなたが「天才」と定義するのは？",
    options: [
      { label: "A：誰も到達していない境地に至った者", scores: { genius: 4, unique: 2, solitude: 1, philosophy: 1 } },
      { label: "B：多大な努力と再現性を持つ者", scores: { endurance: 3, work: 2, expert: 1, genius: 1 } },
      { label: "C：時代を変えた者（評価は後からでいい）", scores: { revolution: 3, genius: 2, architecture: 1, architect: 1 } },
      { label: "D：自分なりの定義がある", scores: { philosophy: 3, unique: 2, meta: 1, observer: 1 } }
    ]
  },
  {
    id: 57, layer: 2, weight: 2,
    text: "論理と感情、どちらを信頼するか？",
    options: [
      { label: "A：論理を優先するが、感情も情報として扱う", scores: { meta: 3, research: 2, architect: 1, observer: 1 } },
      { label: "B：感情こそが人間の本質だと思う", scores: { love: 3, mystic: 2, philosophy: 1, creativity: 1 } },
      { label: "C：状況によって使い分ける", scores: { meta: 3, reality: 2, management: 1 } },
      { label: "D：論理は便利なツールで、感情が指針", scores: { philosophy: 3, creativity: 2, freedom: 1, unique: 1 } }
    ]
  },
  {
    id: 58, layer: 2, weight: 2,
    text: "「知識」と「経験」、どちらを重視するか？",
    options: [
      { label: "A：まず知識・理論が必要", scores: { research: 3, expert: 2, meta: 1, architect: 1 } },
      { label: "B：経験が全て。動いてから考える", scores: { work: 3, reality: 2, endurance: 1, freedom: 1 } },
      { label: "C：知識と経験の循環が重要", scores: { meta: 3, architect: 2, genius: 1, research: 1 } },
      { label: "D：どちらにも限界がある", scores: { philosophy: 3, observer: 2, unique: 1, mystic: 1 } }
    ]
  },
  {
    id: 59, layer: 2, weight: 2,
    text: "「自分の限界」について、あなたはどう捉えているか？",
    options: [
      { label: "A：まだ見えていない・更新し続けるもの", scores: { genius: 4, endurance: 2, research: 1, philosophy: 1 } },
      { label: "B：ある程度把握している・そこで勝負する", scores: { meta: 3, work: 2, expert: 1, reality: 1 } },
      { label: "C：限界を超えることに強く動機づけられる", scores: { revolution: 3, endurance: 2, genius: 1, unique: 1 } },
      { label: "D：限界より「今できること」に集中する", scores: { reality: 4, work: 2, endurance: 1 } }
    ]
  },
  {
    id: 60, layer: 2, weight: 2,
    text: "「社会のルール」は、どこから来ると思うか？",
    options: [
      { label: "A：合意と慣習の積み重ね", scores: { reality: 3, management: 2, love: 1, observer: 1 } },
      { label: "B：権力者が作った仕組み", scores: { revolution: 3, observer: 2, unique: 1, philosophy: 1 } },
      { label: "C：人間の本質的な欲求の反映", scores: { research: 3, philosophy: 2, observer: 1, love: 1 } },
      { label: "D：設計可能・変更可能なシステム", scores: { architect: 4, meta: 2, revolution: 1, management: 1 } }
    ]
  },
  {
    id: 61, layer: 2, weight: 2,
    text: "「自分が死んだ後、何を残したいか」という問いへの答えは？",
    options: [
      { label: "A：思想・理論・作品", scores: { genius: 4, philosophy: 2, unique: 1, creativity: 1 } },
      { label: "B：組織・仕組み・社会への影響", scores: { management: 3, revolution: 2, architect: 1, leadership: 1 } },
      { label: "C：人々の記憶・繋がり", scores: { love: 4, leadership: 2, observer: 1 } },
      { label: "D：何も残さなくていい", scores: { philosophy: 3, freedom: 2, observer: 1, solitude: 1 } }
    ]
  },
  {
    id: 62, layer: 2, weight: 2,
    text: "自分のアイデアに強い確信を持ったとき、あなたはどうするか？",
    options: [
      { label: "A：反証できないか徹底的に検証する", scores: { research: 4, meta: 2, expert: 1, architect: 1 } },
      { label: "B：すぐに実行に移す", scores: { work: 3, revolution: 2, genius: 1, endurance: 1 } },
      { label: "C：人に話して反応を見る", scores: { leadership: 3, observer: 2, love: 1 } },
      { label: "D：温めておく。時期を待つ", scores: { observer: 3, management: 2, meta: 1, genius: 1 } }
    ]
  },
  {
    id: 63, layer: 2, weight: 2,
    text: "「理解されないこと」へのあなたの耐性は？",
    options: [
      { label: "A：高い。理解されなくても動じない", scores: { solitude: 4, genius: 2, philosophy: 1, unique: 1 } },
      { label: "B：そこそこ。説明を続ける気力はある", scores: { endurance: 3, leadership: 2, work: 1, genius: 1 } },
      { label: "C：辛い。理解を求め続ける", scores: { love: 3, endurance: 2, philosophy: 1 } },
      { label: "D：諦めて自分だけでやる", scores: { solitude: 3, expert: 2, endurance: 1, freedom: 1 } }
    ]
  },
  {
    id: 64, layer: 2, weight: 2,
    text: "「複雑さ」に対して、どう感じるか？",
    options: [
      { label: "A：複雑なものほど面白い", scores: { research: 3, architect: 2, meta: 1, unique: 1 } },
      { label: "B：複雑さを減らして単純化したくなる", scores: { management: 3, meta: 2, architect: 1, work: 1 } },
      { label: "C：複雑さに圧倒される・苦手", scores: { reality: 3, work: 2, endurance: 1 } },
      { label: "D：複雑さの中に隠れたパターンを探す", scores: { observer: 4, meta: 2, research: 1, mystic: 1 } }
    ]
  },
  {
    id: 65, layer: 2, weight: 2,
    text: "「退屈」に対してどれだけ耐えられるか？",
    options: [
      { label: "A：退屈を感じたことがほとんどない（常に考えている）", scores: { research: 3, philosophy: 2, genius: 1, solitude: 1 } },
      { label: "B：しばらくは耐えられるが、刺激を求める", scores: { endurance: 3, creativity: 2, freedom: 1 } },
      { label: "C：退屈は苦手。すぐ何かしてしまう", scores: { work: 3, reality: 2, love: 1 } },
      { label: "D：退屈な時間も大切だと思う", scores: { observer: 3, freedom: 2, meta: 1, philosophy: 1 } }
    ]
  },
  {
    id: 66, layer: 2, weight: 2,
    text: "「権威」に対するあなたの基本的な反応は？",
    options: [
      { label: "A：根拠・実績があれば従う", scores: { reality: 3, work: 2, endurance: 1, management: 1 } },
      { label: "B：疑って検証してから判断する", scores: { research: 3, meta: 2, unique: 1, observer: 1 } },
      { label: "C：基本的に懐疑的・従いたくない", scores: { revolution: 4, unique: 2, freedom: 1, philosophy: 1 } },
      { label: "D：権威より「機能するか」で判断する", scores: { architect: 3, management: 2, meta: 1, work: 1 } }
    ]
  },
  {
    id: 67, layer: 2, weight: 2,
    text: "「美しさ」を感じるのはどんな対象か？",
    options: [
      { label: "A：数式・論理・構造の完全性", scores: { architect: 3, research: 2, meta: 1, genius: 1 } },
      { label: "B：自然・生命・宇宙の摂理", scores: { mystic: 3, philosophy: 2, observer: 1, freedom: 1 } },
      { label: "C：人間の感情・物語・表現", scores: { love: 3, creativity: 2, observer: 1, philosophy: 1 } },
      { label: "D：機能と形が一致した設計", scores: { architect: 3, expert: 2, work: 1, meta: 1 } }
    ]
  },
  {
    id: 68, layer: 2, weight: 2,
    text: "「他人の痛み」への共感について、あなたは？",
    options: [
      { label: "A：強く感じる・引き受けてしまうこともある", scores: { love: 4, observer: 1, endurance: 1, philosophy: 1 } },
      { label: "B：理解はするが感情的に引きずらない", scores: { meta: 3, endurance: 2, observer: 1, reality: 1 } },
      { label: "C：共感より「どう助けられるか」を考える", scores: { management: 3, work: 2, love: 1, architect: 1 } },
      { label: "D：あまり共感できない・観察に留まる", scores: { observer: 4, solitude: 2, meta: 1, unique: 1 } }
    ]
  },
  {
    id: 69, layer: 2, weight: 2,
    text: "「自分の信念」はどのくらい変わるものだと思うか？",
    options: [
      { label: "A：証拠・論理があれば変わるべき", scores: { research: 3, meta: 2, reality: 1, architect: 1 } },
      { label: "B：核心は変わらないが外側は更新される", scores: { philosophy: 3, endurance: 2, genius: 1, meta: 1 } },
      { label: "C：一度決めたら変えない", scores: { endurance: 3, genius: 2, philosophy: 1, solitude: 1 } },
      { label: "D：信念自体を持つことに慎重", scores: { observer: 3, meta: 2, philosophy: 1, freedom: 1 } }
    ]
  },
  {
    id: 70, layer: 2, weight: 2,
    text: "「世界をより良くできる」と本気で信じているか？",
    options: [
      { label: "A：はい。そのために動いている", scores: { revolution: 4, genius: 2, endurance: 1, love: 1 } },
      { label: "B：信じているが、自分の役割は小さい", scores: { love: 3, reality: 2, work: 1, endurance: 1 } },
      { label: "C：懐疑的。でも諦めてはいない", scores: { observer: 3, endurance: 2, philosophy: 1, meta: 1 } },
      { label: "D：「より良い」の定義が問題だと思う", scores: { philosophy: 4, unique: 2, meta: 1, research: 1 } }
    ]
  },

  // ════════════════════════════════════════
  // LAYER III — 極限状況（Q71〜Q90）weight: 3
  // ════════════════════════════════════════

  {
    id: 71, layer: 3, weight: 3,
    text: "突然、社会インフラが全て崩壊した。電気・通信・流通が止まった。あなたは最初に何をするか？",
    options: [
      { label: "A：状況を分析し、生存に必要な情報を集める", scores: { research: 3, meta: 2, observer: 1, architect: 1 } },
      { label: "B：周囲の人間を集めてコミュニティを作る", scores: { leadership: 4, love: 2, management: 1, endurance: 1 } },
      { label: "C：まず自分と家族の安全・食料を確保する", scores: { reality: 4, endurance: 2, work: 1, love: 1 } },
      { label: "D：崩壊した構造を観察・記録する", scores: { observer: 4, solitude: 2, research: 1, unique: 1 } }
    ]
  },
  {
    id: 72, layer: 3, weight: 3,
    text: "信頼していた人に深く裏切られた。あなたの反応は？",
    options: [
      { label: "A：なぜそうなったか原因を分析する", scores: { meta: 4, observer: 2, research: 1, architect: 1 } },
      { label: "B：怒りを表明し、関係を切る", scores: { revolution: 3, endurance: 1, freedom: 1, unique: 1 } },
      { label: "C：しばらく引きずるが、また人を信じる", scores: { love: 3, endurance: 2, philosophy: 1, reality: 1 } },
      { label: "D：「そういうものだ」と受け入れて前に進む", scores: { reality: 4, solitude: 1, endurance: 1, observer: 1 } }
    ]
  },
  {
    id: 73, layer: 3, weight: 3,
    text: "あなたの信念と、生存が直接対立したとき（信念を守ると死ぬかもしれない）、どうするか？",
    options: [
      { label: "A：信念を貫く。それが自分の存在意義だ", scores: { philosophy: 4, genius: 2, revolution: 1, endurance: 1 } },
      { label: "B：生存を優先する。信念は生きていれば守れる", scores: { reality: 4, endurance: 2, work: 1, love: 1 } },
      { label: "C：第三の道を探す。二択に持ち込まれた時点で疑う", scores: { architect: 3, meta: 2, genius: 1, revolution: 1 } },
      { label: "D：その状況になるまで分からない", scores: { observer: 3, freedom: 2, philosophy: 1 } }
    ]
  },
  {
    id: 74, layer: 3, weight: 3,
    text: "一人で無人島に5年間閉じ込められるとしたら（必要な物資は十分ある）、どう過ごすか？",
    options: [
      { label: "A：この上ない研究・思索の時間として活用する", scores: { solitude: 5, research: 3, genius: 1, philosophy: 1 } },
      { label: "B：精神的に追い詰められる自信がある", scores: { love: 3, endurance: 1, reality: 1 } },
      { label: "C：サバイバル技術を極める", scores: { expert: 3, endurance: 3, work: 1, reality: 1 } },
      { label: "D：なんとか生き延びながら脱出を考える", scores: { reality: 4, work: 2, endurance: 1, architect: 1 } }
    ]
  },
  {
    id: 75, layer: 3, weight: 3,
    text: "圧倒的な権力を持つ不正な存在と対峙したとき、あなたはどうするか？",
    options: [
      { label: "A：正面から戦う。負けても抵抗する", scores: { revolution: 5, genius: 2, endurance: 1, philosophy: 1 } },
      { label: "B：内側から変えるための戦略を立てる", scores: { architect: 4, management: 2, meta: 1, genius: 1 } },
      { label: "C：記録・告発・情報公開で対抗する", scores: { observer: 4, research: 2, unique: 1, endurance: 1 } },
      { label: "D：自分の生存を優先し、機会を待つ", scores: { reality: 4, endurance: 2, management: 1, observer: 1 } }
    ]
  },
  {
    id: 76, layer: 3, weight: 3,
    text: "「自分が正しいと確信していること」を誰にも理解されない状況が10年続いたら？",
    options: [
      { label: "A：それでも続ける。理解されることより真理が重要", scores: { genius: 5, solitude: 3, philosophy: 1, endurance: 1 } },
      { label: "B：伝え方・表現を変えて理解を求め続ける", scores: { endurance: 3, leadership: 2, genius: 1, love: 1 } },
      { label: "C：自分が間違っているのかもと再検証する", scores: { meta: 4, research: 2, endurance: 1 } },
      { label: "D：疲れて諦める", scores: { reality: 3, endurance: 2, love: 1 } }
    ]
  },
  {
    id: 77, layer: 3, weight: 3,
    text: "「多くの人を救える」が「自分が大きな犠牲を払う」という選択が迫られたら？",
    options: [
      { label: "A：犠牲を選ぶ。それが正しい選択だと思う", scores: { love: 5, endurance: 2, philosophy: 1, genius: 1 } },
      { label: "B：犠牲の大きさと「救える人数」で考える", scores: { management: 3, meta: 2, architect: 1, reality: 1 } },
      { label: "C：第三の解を必死に探す", scores: { architect: 4, genius: 2, meta: 1, endurance: 1 } },
      { label: "D：まず自分が生き続けることを優先する", scores: { reality: 4, philosophy: 1, endurance: 1, observer: 1 } }
    ]
  },
  {
    id: 78, layer: 3, weight: 3,
    text: "自分が関わったプロジェクトが、予想外に「悪い方向」に使われた。あなたの責任意識は？",
    options: [
      { label: "A：強く感じる。何ができたか徹底的に考える", scores: { meta: 4, philosophy: 2, endurance: 1, genius: 1 } },
      { label: "B：責任はあるが、悪用した人間が問題だ", scores: { observer: 3, reality: 2, meta: 1, endurance: 1 } },
      { label: "C：意図していなかった。責任を感じるが限界がある", scores: { endurance: 3, love: 2, reality: 1, philosopher: 1, philosophy: 1 } },
      { label: "D：技術・知識に善悪はない。使う側の問題", scores: { unique: 3, research: 2, philosophy: 1, observer: 1 } }
    ]
  },
  {
    id: 79, layer: 3, weight: 3,
    text: "「自分のビジョン」を実現するために、他者の犠牲が必要になったとしたら？",
    options: [
      { label: "A：そのビジョンを諦める。人を犠牲にはできない", scores: { love: 4, philosophy: 2, endurance: 1, reality: 1 } },
      { label: "B：犠牲を最小化する方法を探し続ける", scores: { architect: 3, management: 2, meta: 1, endurance: 1 } },
      { label: "C：歴史的なビジョンなら、やむを得ない場合もある", scores: { genius: 3, revolution: 2, philosophy: 1, endurance: 1 } },
      { label: "D：その状況に至る前に手を打つ", scores: { meta: 3, endurance: 2, architect: 1, observer: 1 } }
    ]
  },
  {
    id: 80, layer: 3, weight: 3,
    text: "文明が崩壊した後の世界で、あなたは何をするか？",
    options: [
      { label: "A：新しい秩序・文明の設計を始める", scores: { architect: 5, genius: 2, revolution: 1, management: 1 } },
      { label: "B：生き延びた人々のコミュニティを守る", scores: { love: 4, leadership: 2, endurance: 1, reality: 1 } },
      { label: "C：崩壊の原因を記録・分析し未来に残す", scores: { observer: 4, research: 2, genius: 1, philosophy: 1 } },
      { label: "D：まず自分が生き延びることだけ考える", scores: { reality: 5, endurance: 2, work: 1 } }
    ]
  },
  {
    id: 81, layer: 3, weight: 3,
    text: "全ての記憶を失うか、全ての能力を失うか、選ぶとしたら？",
    options: [
      { label: "A：能力を失う。記憶こそが自分だ", scores: { philosophy: 4, love: 2, mystic: 1, observer: 1 } },
      { label: "B：記憶を失う。能力があれば再構築できる", scores: { endurance: 4, work: 2, genius: 1, reality: 1 } },
      { label: "C：どちらもあまりに辛い・選べない", scores: { love: 2, observer: 2, philosophy: 1, endurance: 1 } },
      { label: "D：「自分」の定義の問題だと思う", scores: { philosophy: 4, meta: 2, unique: 1, mystic: 1 } }
    ]
  },
  {
    id: 82, layer: 3, weight: 3,
    text: "自分の死が3ヶ月後に確定した。残りの時間、あなたは何をするか？",
    options: [
      { label: "A：研究・著作・記録を全力で残す", scores: { genius: 4, research: 2, endurance: 1, philosophy: 1 } },
      { label: "B：大切な人たちと過ごす", scores: { love: 5, reality: 1, freedom: 1, observer: 1 } },
      { label: "C：今まで出来なかったことを全部やる", scores: { freedom: 4, creativity: 2, unique: 1, endurance: 1 } },
      { label: "D：いつも通りに過ごす", scores: { endurance: 3, philosophy: 2, reality: 1, work: 1 } }
    ]
  },
  {
    id: 83, layer: 3, weight: 3,
    text: "「自分が間違っていた」と確信した瞬間、どう動くか？",
    options: [
      { label: "A：すぐに認めて修正する", scores: { meta: 4, endurance: 2, reality: 1, architect: 1 } },
      { label: "B：なぜ間違えたかを徹底的に調べる", scores: { research: 4, meta: 2, architect: 1, endurance: 1 } },
      { label: "C：認めるのに時間がかかる", scores: { endurance: 2, genius: 1, philosophy: 1, love: 1 } },
      { label: "D：本当に間違っているかをもう一度疑う", scores: { unique: 3, philosophy: 2, meta: 1, research: 1 } }
    ]
  },
  {
    id: 84, layer: 3, weight: 3,
    text: "あなたの「最大の恐怖」に最も近いのは？",
    options: [
      { label: "A：何も成し遂げられなかったという後悔", scores: { genius: 4, endurance: 2, philosophy: 1 } },
      { label: "B：大切な人を失うこと", scores: { love: 4, endurance: 2, reality: 1 } },
      { label: "C：自分が「何者か」分からなくなること", scores: { philosophy: 4, mystic: 2, unique: 1 } },
      { label: "D：自由を完全に奪われること", scores: { freedom: 4, revolution: 2, solitude: 1, unique: 1 } }
    ]
  },
  {
    id: 85, layer: 3, weight: 3,
    text: "世界を変えるチャンスが一度だけある。ただし、あなた自身は歴史に名を残せない。やるか？",
    options: [
      { label: "A：やる。名声より変革が重要", scores: { revolution: 5, love: 2, philosophy: 1, endurance: 1 } },
      { label: "B：やる。でも少し悔しい", scores: { revolution: 3, genius: 2, endurance: 1, love: 1 } },
      { label: "C：記録に残る形でやりたい", scores: { genius: 4, observer: 1, philosophy: 1, endurance: 1 } },
      { label: "D：本当に正しいかをまず検討する", scores: { meta: 3, philosophy: 2, research: 1, architect: 1 } }
    ]
  },
  {
    id: 86, layer: 3, weight: 3,
    text: "10年間一人で研究を続けた成果が、誰かに盗まれた。あなたはどうするか？",
    options: [
      { label: "A：法的・社会的に徹底抗戦する", scores: { endurance: 3, revolution: 2, management: 1, work: 1 } },
      { label: "B：悔しいが、次の研究を始める", scores: { endurance: 4, genius: 2, research: 1, solitude: 1 } },
      { label: "C：盗んだ側の動機・構造を分析する", scores: { observer: 4, meta: 2, research: 1, philosophy: 1 } },
      { label: "D：「自分が知っている」だけで十分だ", scores: { philosophy: 4, solitude: 2, genius: 1, freedom: 1 } }
    ]
  },
  {
    id: 87, layer: 3, weight: 3,
    text: "「完全な孤立（誰とも一切接触できない）」が1年間続くとしたら？",
    options: [
      { label: "A：問題ない。むしろ捗る", scores: { solitude: 6, research: 2, expert: 1, genius: 1 } },
      { label: "B：辛いが、乗り越えられると思う", scores: { endurance: 4, solitude: 1, reality: 1, work: 1 } },
      { label: "C：精神的に限界になると思う", scores: { love: 3, reality: 2, endurance: 1 } },
      { label: "D：その間に何かを作ることで生き延びる", scores: { creativity: 3, endurance: 2, work: 1, genius: 1 } }
    ]
  },
  {
    id: 88, layer: 3, weight: 3,
    text: "「あなたの信念が間違いだった」という圧倒的な証拠が出た。どうするか？",
    options: [
      { label: "A：受け入れて更新する。それが誠実だ", scores: { meta: 4, endurance: 2, reality: 1, research: 1 } },
      { label: "B：証拠自体を徹底的に検証する", scores: { research: 4, unique: 2, meta: 1, expert: 1 } },
      { label: "C：しばらく混乱するが、最終的には受け入れる", scores: { endurance: 3, reality: 2, love: 1 } },
      { label: "D：信念の「核心」は保持しつつ修正する", scores: { philosophy: 3, genius: 2, endurance: 1, meta: 1 } }
    ]
  },
  {
    id: 89, layer: 3, weight: 3,
    text: "自分が「正しいことをしている」と確信していても、全員が反対するなら？",
    options: [
      { label: "A：それでも進む。多数決が真実ではない", scores: { genius: 4, revolution: 3, philosophy: 1, endurance: 1 } },
      { label: "B：なぜ反対されるかを分析する", scores: { meta: 3, observer: 2, research: 1, architect: 1 } },
      { label: "C：説得できるまで動かない", scores: { leadership: 3, endurance: 2, love: 1, management: 1 } },
      { label: "D：全員が反対するなら自分が間違っている可能性を疑う", scores: { meta: 3, reality: 2, endurance: 1, observer: 1 } }
    ]
  },
  {
    id: 90, layer: 3, weight: 3,
    text: "消耗しきったとき（限界のとき）、あなたを動かすのは何か？",
    options: [
      { label: "A：信念・使命感", scores: { genius: 3, philosophy: 3, endurance: 1, revolution: 1 } },
      { label: "B：大切な人の存在", scores: { love: 4, endurance: 2, reality: 1 } },
      { label: "C：「諦めたくない」という感情", scores: { endurance: 4, revolution: 2, genius: 1 } },
      { label: "D：何も動かない。回復を待つ", scores: { reality: 3, observer: 2, endurance: 1, freedom: 1 } }
    ]
  },

  // ════════════════════════════════════════
  // LAYER IV — 深淵・世界観（Q91〜Q100）weight: 2
  // ════════════════════════════════════════

  {
    id: 91, layer: 4, weight: 2,
    text: "「この世界が本物かどうか分からない」という感覚を、あなたは持ったことがあるか？",
    options: [
      { label: "A：強くある。それが常態になっている", scores: { mystic: 5, philosophy: 3, unique: 1, solitude: 1 } },
      { label: "B：たまにある。思索として楽しんでいる", scores: { philosophy: 3, research: 2, meta: 1, unique: 1 } },
      { label: "C：そういう問いは意味がないと思う", scores: { reality: 4, work: 2, endurance: 1 } },
      { label: "D：怖くて考えないようにしている", scores: { endurance: 2, observer: 1, reality: 1 } }
    ]
  },
  {
    id: 92, layer: 4, weight: 2,
    text: "人類の文明は、最終的にどこへ向かうと思うか？",
    options: [
      { label: "A：超知性・テクノロジーとの融合", scores: { research: 3, architect: 2, genius: 1, unique: 1 } },
      { label: "B：崩壊と再生のサイクルを繰り返す", scores: { philosophy: 3, observer: 2, mystic: 1, reality: 1 } },
      { label: "C：精神・意識の深化", scores: { mystic: 4, philosophy: 2, genius: 1, unique: 1 } },
      { label: "D：分からない。それを知りたくて生きている", scores: { research: 3, genius: 2, philosophy: 1, freedom: 1 } }
    ]
  },
  {
    id: 93, layer: 4, weight: 2,
    text: "「宇宙に知的生命体が他にもいる」と思うか？",
    options: [
      { label: "A：確実にいると思う。問題は接触できるかだ", scores: { research: 3, architect: 2, meta: 1, reality: 1 } },
      { label: "B：いると思うが、交流は絶望的に難しい", scores: { observer: 3, philosophy: 2, endurance: 1, reality: 1 } },
      { label: "C：いたとして、それが人類にどう影響するかを考える", scores: { meta: 3, management: 2, architect: 1, observer: 1 } },
      { label: "D：その問い自体が自分の存在意義に関わる", scores: { mystic: 4, unique: 2, philosophy: 1, genius: 1 } }
    ]
  },
  {
    id: 94, layer: 4, weight: 2,
    text: "「意識とは何か」という問いについて、あなたの立場は？",
    options: [
      { label: "A：物質・神経の産物だと思う（唯物論的）", scores: { research: 3, reality: 2, expert: 1, meta: 1 } },
      { label: "B：科学では説明しきれない何かがあると思う", scores: { mystic: 4, philosophy: 2, unique: 1, observer: 1 } },
      { label: "C：問い自体が意識から来ている。答えは永遠にない", scores: { philosophy: 4, unique: 2, meta: 1, mystic: 1 } },
      { label: "D：考えたことがない・分からない", scores: { reality: 3, work: 2, endurance: 1 } }
    ]
  },
  {
    id: 95, layer: 4, weight: 2,
    text: "「神」という概念について、あなたは？",
    options: [
      { label: "A：存在を信じている（宗教的・哲学的に）", scores: { mystic: 4, philosophy: 2, unique: 1, love: 1 } },
      { label: "B：証拠がない以上、保留している", scores: { research: 3, meta: 2, reality: 1, observer: 1 } },
      { label: "C：「神」は人間が作った概念だと思う", scores: { unique: 3, philosophy: 2, research: 1, meta: 1 } },
      { label: "D：「神」という語を使わずに同じことを考えている", scores: { philosophy: 4, mystic: 2, unique: 1, genius: 1 } }
    ]
  },
  {
    id: 96, layer: 4, weight: 2,
    text: "もし「時間を巻き戻せる」としたら、どこに戻るか？",
    options: [
      { label: "A：戻らない。今が全ての積み重ねだ", scores: { philosophy: 3, endurance: 2, meta: 1, genius: 1 } },
      { label: "B：最大の失敗・後悔の場面", scores: { genius: 3, love: 2, endurance: 1, meta: 1 } },
      { label: "C：歴史上の重要な分岐点（個人ではなく文明の）", scores: { architect: 3, revolution: 2, genius: 1, observer: 1 } },
      { label: "D：「時間を巻き戻す」こと自体の意味を考えてしまう", scores: { philosophy: 4, observer: 2, mystic: 1, unique: 1 } }
    ]
  },
  {
    id: 97, layer: 4, weight: 2,
    text: "「人間である」ことの本質は何だと思うか？",
    options: [
      { label: "A：意識・内面的な体験を持つこと", scores: { philosophy: 4, mystic: 2, unique: 1, observer: 1 } },
      { label: "B：他者と繋がり、意味を共有すること", scores: { love: 3, observer: 2, philosophy: 1, architect: 1 } },
      { label: "C：問い続けること・探求すること", scores: { research: 3, genius: 2, philosophy: 1, unique: 1 } },
      { label: "D：生存し、子孫を残す生物であること", scores: { reality: 4, work: 2, endurance: 1 } }
    ]
  },
  {
    id: 98, layer: 4, weight: 2,
    text: "「全ての知識を持てる」が「全ての感情を失う」という選択、あなたは？",
    options: [
      { label: "A：知識を選ぶ。感情より真理だ", scores: { research: 4, solitude: 2, genius: 1, unique: 1 } },
      { label: "B：感情を選ぶ。それが人間だから", scores: { love: 4, philosophy: 2, reality: 1, observer: 1 } },
      { label: "C：選ばない。どちらも人間の構成要素だ", scores: { philosophy: 3, meta: 2, love: 1, architect: 1 } },
      { label: "D：「感情のない状態」が何をもたらすか知りたい", scores: { observer: 4, unique: 2, research: 1, mystic: 1 } }
    ]
  },
  {
    id: 99, layer: 4, weight: 2,
    text: "「この宇宙に、あなただけが意識を持っていたとしたら」という思考実験を聞いて、どう感じるか？",
    options: [
      { label: "A：それが真実かもしれないと、リアルに感じたことがある", scores: { mystic: 5, solitude: 2, philosophy: 1, unique: 1 } },
      { label: "B：面白い仮説として考察できる", scores: { research: 3, philosophy: 2, meta: 1, observer: 1 } },
      { label: "C：虚無感を感じる・考えたくない", scores: { love: 2, reality: 2, endurance: 1 } },
      { label: "D：そうであっても何も変わらない、今やることをやる", scores: { endurance: 3, reality: 2, work: 1, philosophy: 1 } }
    ]
  },
  {
    id: 100, layer: 4, weight: 2,
    text: "この診断を受けたあなたは、今、何を感じているか？",
    options: [
      { label: "A：かなり正確に捉えられている感覚がある", scores: { meta: 3, observer: 2, research: 1 } },
      { label: "B：面白かった。もっと深い問いを聞きたい", scores: { research: 3, unique: 2, genius: 1, freedom: 1 } },
      { label: "C：診断に全てを当てはめるのは無理だと思う", scores: { philosophy: 3, meta: 2, unique: 1, observer: 1 } },
      { label: "D：自分がどう分類されたか気になる", scores: { genius: 2, reality: 2, observer: 1 } }
    ]
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ▼ ここに Q101以降を追加できます
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
];
