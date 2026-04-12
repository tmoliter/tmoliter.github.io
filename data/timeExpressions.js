// English → Japanese: Time & Frequency Expressions
// Each entry: [id, english, japanese, register]
// register: "polite" (です/ます) or "casual" (plain form)
const timeExpressionSentences = [
  // ── FREQUENCY: every X ──
  [1, "I go to the dentist every two weeks.", "二週間に一回、歯医者に行ってる。", "casual"],
  [2, "I go to the gym three times a week.", "週に三回、ジムに通っています。", "polite"],
  [3, "I call my parents once a month.", "月に一回、親に電話してる。", "casual"],
  [4, "About once a year, I travel abroad.", "年に一回くらい、海外旅行をします。", "polite"],
  [5, "I do laundry about twice a week.", "洗濯は週に二回くらいするよ。", "casual"],
  [6, "The garbage truck comes three times a week.", "ゴミ収集車は週に三回来ます。", "polite"],
  [7, "I get a health checkup once a year.", "年に一回、健康診断を受けてる。", "casual"],
  [8, "I take a break about once every hour.", "一時間に一回くらい休憩を取ります。", "polite"],
  [9, "I change my phone about once every two years.", "二年に一回くらいスマホ変えるかな。", "casual"],
  [10, "Once every three months, I get a haircut.", "三ヶ月に一回、髪を切ります。", "polite"],

  // ── FREQUENCY: every day / most days / nearly every ──
  [11, "Most days, I eat breakfast at home.", "たいてい、朝ごはんは家で食べるよ。", "casual"],
  [12, "Nearly every Tuesday, I have a meeting.", "ほぼ毎週火曜日に会議があります。", "polite"],
  [13, "I go to the convenience store almost every day.", "ほぼ毎日コンビニ行ってるわ。", "casual"],
  [14, "Every morning, I drink a glass of water.", "毎朝、水を一杯飲みます。", "polite"],
  [15, "She practices piano for an hour every day.", "彼女は毎日一時間ピアノを練習してるよ。", "casual"],
  [16, "Nearly every morning, I take the same train.", "ほぼ毎朝、同じ電車に乗っています。", "polite"],
  [17, "He goes jogging every Saturday morning.", "彼は毎週土曜の朝、ジョギングしてる。", "casual"],
  [18, "Every summer, we go to the beach.", "毎年夏に海に行きます。", "polite"],
  [19, "Every weekend, I try to cook something new.", "毎週末、新しい料理を作ってみてる。", "casual"],
  [20, "I usually wake up at 6 every day.", "たいてい毎日六時に起きます。", "polite"],

  // ── FREQUENCY: every other / every X days ──
  [21, "I study Japanese every other day.", "一日おきに日本語を勉強してる。", "casual"],
  [22, "I water the plants every three days.", "三日おきに植物に水をやっています。", "polite"],
  [23, "Every other week, we have a team meeting.", "二週間に一回、チームのミーティングがある。", "casual"],
  [24, "I brush my teeth three times a day.", "一日に三回歯を磨きます。", "polite"],
  [25, "I take this medicine twice a day.", "この薬は一日に二回飲んでる。", "casual"],
  [26, "I check my email several times a day.", "一日に何回もメールをチェックしています。", "polite"],

  // ── FREQUENCY: たまに / 時々 / めったに ──
  [27, "I occasionally watch a movie on Friday nights.", "たまに金曜の夜に映画を見るよ。", "casual"],
  [28, "I rarely eat out on weekdays.", "平日はめったに外食しません。", "polite"],
  [29, "I sometimes forget things when I'm busy.", "忙しいと時々もの忘れるんだよね。", "casual"],
  [30, "I hardly ever stay up past midnight.", "めったに夜中の十二時過ぎまで起きていません。", "polite"],
  [31, "I sleep in on Sundays most of the time.", "日曜はたいてい遅くまで寝てる。", "casual"],
  [32, "I've been going to the gym five times a week lately.", "最近、週に五回ジムに通っています。", "polite"],

  // ── たびに (each time / every time) ──
  [33, "Each time I go to work, I buy coffee.", "仕事に行くたびに、コーヒー買っちゃう。", "casual"],
  [34, "Every time it rains, the train is late.", "雨が降るたびに、電車が遅れます。", "polite"],
  [35, "Every time I see that movie, I cry.", "あの映画を見るたびに、泣いちゃうんだよね。", "casual"],
  [36, "Every time I eat spicy food, my stomach hurts.", "辛いものを食べるたびに、お腹が痛くなります。", "polite"],
  [37, "Every time I visit Kyoto, I eat the same ramen.", "京都に行くたびに、同じラーメン食べてる。", "casual"],
  [38, "Every time I go to that store, they're having a sale.", "あの店に行くたびに、セールをやっています。", "polite"],
  [39, "Every time I listen to this song, I think of my hometown.", "この曲を聞くたびに、故郷を思い出す。", "casual"],
  [40, "Every time we meet, we end up talking about the same things.", "会うたびに、同じ話をしてしまいます。", "polite"],

  // ── TIME-RELATIVE: X hours/minutes after/before ──
  [41, "Two hours after eating, I go for a walk.", "食べてから二時間後に、散歩に行く。", "casual"],
  [42, "Three hours after taking the medicine, I felt better.", "薬を飲んでから三時間後に、気分がよくなりました。", "polite"],
  [43, "One hour after lunch, I always get sleepy.", "昼ごはんの一時間後、いつも眠くなるんだよね。", "casual"],
  [44, "Thirty minutes before the test, I reviewed my notes.", "テストの三十分前に、ノートを見直しました。", "polite"],
  [45, "About ten minutes before the meeting, everyone gathered.", "会議の十分前くらいに、みんな集まった。", "casual"],
  [46, "About thirty minutes after dinner, I take a walk.", "夕食の三十分後くらいに、散歩に行きます。", "polite"],
  [47, "Fifteen minutes after arriving at work, I check my schedule.", "会社に着いてから十五分後に、スケジュール確認してる。", "casual"],
  [48, "Two days before the trip, I started packing.", "旅行の二日前に、荷物を詰め始めました。", "polite"],
  [49, "Five minutes before class, the teacher arrives.", "授業の五分前に先生来るよ。", "casual"],
  [50, "I clean the house about once every two weeks.", "二週間に一回くらい家の掃除をしています。", "polite"],
];
