// English → Japanese adjective conjugation drill (i-adj + na-adj).
// Each entry: [id, english, japanese]
// "(polite)" tag in English means use the です/でした form.
// No tag = plain/dictionary form.
const adjectiveSentences = [
  // ── i-adjective: 寒い (full matrix) ──
  [1, "It's cold.", "寒い。"],
  [2, "It's cold. (polite)", "寒いです。"],
  [3, "It's not cold.", "寒くない。"],
  [4, "It's not cold. (polite)", "寒くないです。"],
  [5, "It was cold.", "寒かった。"],
  [6, "It was cold. (polite)", "寒かったです。"],
  [7, "It wasn't cold.", "寒くなかった。"],
  [8, "It wasn't cold. (polite)", "寒くなかったです。"],

  // ── i-adjective: 暑い ──
  [9, "It's hot.", "暑い。"],
  [10, "It's hot. (polite)", "暑いです。"],
  [11, "It's not hot.", "暑くない。"],
  [12, "It was hot.", "暑かった。"],
  [13, "It was hot. (polite)", "暑かったです。"],
  [14, "It wasn't hot.", "暑くなかった。"],

  // ── i-adjective: 高い ──
  [15, "It's expensive.", "高い。"],
  [16, "It was expensive.", "高かった。"],
  [17, "It's not expensive.", "高くない。"],
  [18, "It wasn't expensive.", "高くなかった。"],
  [19, "It's expensive. (polite)", "高いです。"],

  // ── i-adjective: おいしい ──
  [20, "It's delicious.", "おいしい。"],
  [21, "It was delicious.", "おいしかった。"],
  [22, "It's not delicious.", "おいしくない。"],
  [23, "It wasn't delicious.", "おいしくなかった。"],

  // ── i-adjective: 難しい ──
  [24, "It's hard.", "難しい。"],
  [25, "It was hard.", "難しかった。"],
  [26, "It's not hard.", "難しくない。"],
  [27, "It wasn't hard.", "難しくなかった。"],

  // ── i-adjective: 忙しい ──
  [28, "He's busy.", "彼は忙しい。"],
  [29, "He was busy.", "彼は忙しかった。"],
  [30, "He's not busy.", "彼は忙しくない。"],
  [31, "He wasn't busy.", "彼は忙しくなかった。"],

  // ── i-adjective: 面白い / 楽しい ──
  [32, "The book is interesting.", "本は面白い。"],
  [33, "The book was interesting.", "本は面白かった。"],
  [34, "The book isn't interesting.", "本は面白くない。"],
  [35, "It was fun.", "楽しかった。"],
  [36, "It wasn't fun.", "楽しくなかった。"],

  // ── i-adjective: with subjects ──
  [37, "Today is cold.", "今日は寒い。"],
  [38, "Today was cold.", "今日は寒かった。"],
  [39, "Yesterday wasn't hot.", "昨日は暑くなかった。"],
  [40, "The food is delicious.", "料理はおいしい。"],
  [41, "The food was delicious.", "料理はおいしかった。"],
  [42, "The food wasn't delicious.", "料理はおいしくなかった。"],
  [43, "The test was hard.", "テストは難しかった。"],
  [44, "This room is small.", "この部屋は小さい。"],
  [45, "That car is new.", "あの車は新しい。"],

  // ── irregular いい ──
  [46, "It's good.", "いい。"],
  [47, "It was good.", "良かった。"],
  [48, "It's not good.", "良くない。"],
  [49, "It wasn't good.", "良くなかった。"],
  [50, "The weather is good.", "天気がいい。"],
  [51, "The weather was good.", "天気が良かった。"],
  [52, "The weather isn't good.", "天気が良くない。"],
  [53, "The weather wasn't good.", "天気が良くなかった。"],

  // ── na-adjective: 静か (full matrix) ──
  [54, "It's quiet.", "静かだ。"],
  [55, "It's quiet. (polite)", "静かです。"],
  [56, "It's not quiet.", "静かじゃない。"],
  [57, "It's not quiet. (polite)", "静かじゃないです。"],
  [58, "It was quiet.", "静かだった。"],
  [59, "It was quiet. (polite)", "静かでした。"],
  [60, "It wasn't quiet.", "静かじゃなかった。"],
  [61, "It wasn't quiet. (polite)", "静かじゃなかったです。"],

  // ── na-adjective: 元気 ──
  [62, "She's energetic.", "彼女は元気だ。"],
  [63, "She's energetic. (polite)", "彼女は元気です。"],
  [64, "She was energetic.", "彼女は元気だった。"],
  [65, "She's not energetic.", "彼女は元気じゃない。"],
  [66, "She wasn't energetic.", "彼女は元気じゃなかった。"],

  // ── na-adjective: きれい ──
  [67, "The room is clean.", "部屋はきれいだ。"],
  [68, "The room was clean.", "部屋はきれいだった。"],
  [69, "The room isn't clean.", "部屋はきれいじゃない。"],
  [70, "The room wasn't clean.", "部屋はきれいじゃなかった。"],

  // ── na-adjective: 親切 ──
  [71, "He's kind.", "彼は親切だ。"],
  [72, "He was kind.", "彼は親切だった。"],
  [73, "He's not kind.", "彼は親切じゃない。"],
  [74, "He wasn't kind.", "彼は親切じゃなかった。"],

  // ── na-adjective: 便利 ──
  [75, "It's convenient.", "便利だ。"],
  [76, "It was convenient.", "便利だった。"],
  [77, "It's not convenient.", "便利じゃない。"],
  [78, "It wasn't convenient.", "便利じゃなかった。"],

  // ── na-adjective: 有名 ──
  [79, "He's famous.", "彼は有名だ。"],
  [80, "He was famous.", "彼は有名だった。"],
  [81, "He's not famous.", "彼は有名じゃない。"],

  // ── na-adjective: 暇 / 大変 ──
  [82, "I'm free today.", "今日は暇だ。"],
  [83, "I was free yesterday.", "昨日は暇だった。"],
  [84, "I'm not free today.", "今日は暇じゃない。"],
  [85, "It's tough.", "大変だ。"],
  [86, "It was tough.", "大変だった。"],
  [87, "Work is tough.", "仕事は大変だ。"],

  // ── i-adj modifying a noun ──
  [88, "It's a cold day.", "寒い日だ。"],
  [89, "He's a busy person.", "忙しい人だ。"],
  [90, "It's an interesting book.", "面白い本だ。"],
  [91, "It's a small room.", "小さい部屋だ。"],
  [92, "It's a new car.", "新しい車だ。"],
  [93, "It's a cheap restaurant.", "安いレストランだ。"],

  // ── na-adj modifying a noun (na linker) ──
  [94, "It's a quiet room.", "静かな部屋だ。"],
  [95, "He's a kind person.", "親切な人だ。"],
  [96, "It's a famous restaurant.", "有名なレストランだ。"],
  [97, "It's a convenient place.", "便利な所だ。"],
  [98, "It's a clean room.", "きれいな部屋だ。"],
  [99, "He's a serious student.", "まじめな学生だ。"],

  // ── te-form linking (i: ～くて / na: ～で) ──
  [100, "It's cold and dark.", "寒くて暗い。"],
  [101, "It's cheap and delicious.", "安くておいしい。"],
  [102, "It's small and old.", "小さくて古い。"],
  [103, "It's quiet and clean.", "静かできれいだ。"],
  [104, "He's kind and famous.", "彼は親切で有名だ。"],
  [105, "It's convenient and cheap.", "便利で安い。"],

  // ── adverbial: i → ～く / na → ～に ──
  [106, "Please come early.", "早く来てください。"],
  [107, "He runs fast.", "彼は速く走る。"],
  [108, "Please write big.", "大きく書いてください。"],
  [109, "Please speak quietly.", "静かに話してください。"],
  [110, "Please write neatly.", "きれいに書いてください。"],

  // ── becoming: ～くなる / ～になる ──
  [111, "It got cold.", "寒くなった。"],
  [112, "It got hot.", "暑くなった。"],
  [113, "It got expensive.", "高くなった。"],
  [114, "It got quiet.", "静かになった。"],
  [115, "He became famous.", "彼は有名になった。"],
  [116, "The room became clean.", "部屋はきれいになった。"]
];
