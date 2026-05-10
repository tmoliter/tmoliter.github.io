// English → Japanese sentence translation practice
// Each entry: [id, english, japanese]
const e2jSentences = [
  [1, "I have to study Japanese every day.", "毎日日本語を勉強しないといけません。"],
  [2, "I have to get up early tomorrow.", "明日は早く起きないといけないんです。"],
  [3, "Here, you have to take off your shoes.", "ここで靴を脱がないといけません。"],
  [4, "Is it okay to take a picture here?", "ここで写真を撮ってもいいですか？"],
  [5, "You can eat in this room.", "この部屋で食べてもいいです。"],
  [6, "Can I use your phone?", "スマホを使ってもいいですか？"],
  [7, "You can't smoke here.", "ここでタバコを吸ったらだめです。"],
  [8, "You can't swim in this river.", "この川で泳いだらだめです。"],
  [9, "Don't touch that, okay?", "それを触ったらだめですよ。"],
  [10, "I ate breakfast and went to school.", "朝ご飯を食べて、学校に行きました。"],
  [11, "I'll call you after I arrive at the station.", "駅に着いてから、電話します。"],
  [12, "Please eat after washing your hands.", "手を洗ってから、食べてください。"],
  [13, "After work is over, let's go out for a drink.", "仕事が終わってから、飲みに行きましょう。"],
  [14, "If it rains tomorrow, I'll stay home.", "明日雨が降ったら、家にいます。"],
  [15, "If you go to Fukuoka, please try motsunabe.", "福岡に行ったら、もつ鍋を食べてみてください。"],
  [16, "When you get to the station, let me know.", "駅に着いたら、教えてください。"],
  [17, "If I have time tomorrow, I'll call you.", "明日、時間があったら電話します。"],
  [18, "I think it'll rain tomorrow.", "明日は雨が降ると思います。"],
  [19, "I think this shop's ramen is the best.", "この店のラーメンが一番おいしいと思います。"],
  [20, "I don't think he'll come.", "彼は来ないと思います。"],
  [21, "Why were you late?", "どうして遅れたんですか？"],
  [22, "I have a fever, so I can't go today.", "熱があるから、今日は行けないんです。"],
  [23, "Actually, I'm looking for a bigger size.", "もっと大きいサイズを探しているんです。"],
  [24, "Tomorrow I'm going to see a movie with a friend.", "明日、友達と映画を見に行きます。"],
  [25, "I went to Tenjin to buy souvenirs.", "天神にお土産を買いに行きました。"],
  [26, "Want to go eat ramen together?", "一緒にラーメンを食べに行きませんか？"],
  [27, "The book I read yesterday was really interesting.", "昨日読んだ本はとても面白かったです。"],
  [28, "The person sitting over there is my teacher.", "あそこに座っている人は先生です。"],
  [29, "The ramen I ate in Hakata was the most delicious.", "博多で食べたラーメンが一番おいしかったです。"],
  [30, "I'm looking for the bag I bought last year.", "去年買ったかばんを探しています。"],
  [31, "It's raining now.", "今、雨が降っています。"],
  [32, "My older brother lives in Tokyo.", "兄は東京に住んでいます。"],
  [33, "He's married.", "彼は結婚しています。"],
  [34, "Do you know Tanaka-san?", "田中さんを知っていますか？"],
  [35, "My little sister is doing her homework right now.", "妹は今、宿題をしています。"],
  [36, "I want to talk about Japanese culture.", "日本の文化について話したいです。"],
  [37, "I'm reading a book about Fukuoka.", "福岡についての本を読んでいます。"],
  [38, "Let's discuss this problem together.", "この問題について、みんなで話しましょう。"],
  [39, "Would you like something to drink?", "何か飲みますか？"],
  [40, "I haven't eaten anything today.", "今日は何も食べていません。"],
  [41, "I can eat anything.", "何でも食べられます。"],
  [42, "Please ask me anything.", "何でも聞いてください。"],
  [43, "There's nothing in the fridge.", "冷蔵庫には何もありません。"],
  [44, "Is there something you want to ask?", "何か聞きたいことがありますか？"],

  // ── によって (depending on / by means of / by [agent]) ──
  [45, "The plan changes depending on the weather.", "天気によって、計画が変わります。"],
  [46, "Customs vary by country.", "習慣は国によって違います。"],
  [47, "This was made by a famous artist.", "これは有名なアーティストによって作られました。"],

  // ── にとって (for / from the perspective of) ──
  [48, "For me, family is the most important.", "私にとって、家族が一番大切です。"],
  [49, "For travelers, this map is very useful.", "旅行者にとって、この地図はとても便利です。"],
  [50, "For her, this is her first trip to Japan.", "彼女にとって、これは初めての日本旅行です。"],

  // ── として (as [a role / identity]) ──
  [51, "I work as an engineer.", "エンジニアとして働いています。"],
  [52, "I came to Japan as a tourist.", "観光客として日本に来ました。"],
  [53, "As a friend, I want to tell you this.", "友達として、これを言いたいです。"],

  // ── 残りやらないといけないことは〜ことです (what I still have to do is …) ──
  [54, "What I still have to do is pack my luggage.", "残りやらないといけないことは荷物をまとめることです。"],
  [55, "What I still have to do is buy souvenirs.", "残りやらないといけないことはお土産を買うことです。"],

  // ── 〜すぎて、〜できない (too X to Y) ──
  [56, "It's too spicy, I can't eat it.", "辛すぎて、食べられません。"],
  [57, "It's too expensive, I can't buy it.", "高すぎて、買えません。"],
  [58, "I'm too tired to think.", "疲れすぎて、考えられません。"],

  // ── できるだけ [adverb] (as [adverb] as possible) ──
  [59, "Please come as early as possible.", "できるだけ早く来てください。"],
  [60, "Please speak as slowly as possible.", "できるだけゆっくり話してください。"],
  [61, "I want to study as much as possible.", "できるだけたくさん勉強したいです。"]
];
