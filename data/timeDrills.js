// ── TIME EXPRESSION DRILL DATA ──
// Categories used for tagging:
//   'point'      — specific clock time or calendar date (三時, 七月十四日)
//   'duration'   — explicit span of time (三時間, 三日間)
//   'relative'   — anchored to now (三日後, 来週, 明日)
//   'ambiguous'  — could be point OR duration depending on context (三日, 二日)
// `approx: true` flags items with ごろ / ぐらい / くらい layered on top.

const timeDrillItems = [
  // ── Clock times (point) ──
  { jp: '一時', reading: 'いちじ', en: '1 o\'clock', category: 'point' },
  { jp: '二時', reading: 'にじ', en: '2 o\'clock', category: 'point' },
  { jp: '三時', reading: 'さんじ', en: '3 o\'clock', category: 'point' },
  { jp: '四時', reading: 'よじ', en: '4 o\'clock', category: 'point', tricky: true, note: '四時 → よじ (not しじ / よんじ)' },
  { jp: '五時', reading: 'ごじ', en: '5 o\'clock', category: 'point' },
  { jp: '六時', reading: 'ろくじ', en: '6 o\'clock', category: 'point' },
  { jp: '七時', reading: 'しちじ', en: '7 o\'clock', category: 'point', tricky: true, note: '七時 → しちじ (preferred over ななじ)' },
  { jp: '八時', reading: 'はちじ', en: '8 o\'clock', category: 'point' },
  { jp: '九時', reading: 'くじ', en: '9 o\'clock', category: 'point', tricky: true, note: '九時 → くじ (not きゅうじ)' },
  { jp: '十時', reading: 'じゅうじ', en: '10 o\'clock', category: 'point' },
  { jp: '十一時', reading: 'じゅういちじ', en: '11 o\'clock', category: 'point' },
  { jp: '十二時', reading: 'じゅうにじ', en: '12 o\'clock', category: 'point' },
  { jp: '三時半', reading: 'さんじはん', en: '3:30', category: 'point' },
  { jp: '七時半', reading: 'しちじはん', en: '7:30', category: 'point' },
  { jp: '三時十五分', reading: 'さんじじゅうごふん', en: '3:15', category: 'point' },
  { jp: '九時四十五分', reading: 'くじよんじゅうごふん', en: '9:45', category: 'point' },
  { jp: '午前八時', reading: 'ごぜんはちじ', en: '8 AM', category: 'point' },
  { jp: '午後三時', reading: 'ごごさんじ', en: '3 PM', category: 'point' },
  { jp: '午後三時半', reading: 'ごごさんじはん', en: '3:30 PM', category: 'point' },
  { jp: '朝の七時', reading: 'あさのしちじ', en: '7 in the morning', category: 'point' },
  { jp: '夜の十時', reading: 'よるのじゅうじ', en: '10 at night', category: 'point' },
  { jp: '三時ごろ', reading: 'さんじごろ', en: 'around 3 o\'clock', category: 'point', approx: true },
  { jp: '九時ごろ', reading: 'くじごろ', en: 'around 9 o\'clock', category: 'point', approx: true },

  // ── Hour durations ──
  { jp: '一時間', reading: 'いちじかん', en: '1 hour', category: 'duration' },
  { jp: '二時間', reading: 'にじかん', en: '2 hours', category: 'duration' },
  { jp: '三時間', reading: 'さんじかん', en: '3 hours', category: 'duration' },
  { jp: '四時間', reading: 'よじかん', en: '4 hours', category: 'duration', tricky: true, note: '四時間 → よじかん' },
  { jp: '七時間', reading: 'しちじかん', en: '7 hours', category: 'duration' },
  { jp: '九時間', reading: 'くじかん', en: '9 hours', category: 'duration' },
  { jp: '一時間半', reading: 'いちじかんはん', en: '1.5 hours', category: 'duration' },
  { jp: '三時間ぐらい', reading: 'さんじかんぐらい', en: 'about 3 hours', category: 'duration', approx: true },
  { jp: '三十分ぐらい', reading: 'さんじゅっぷんぐらい', en: 'about 30 minutes', category: 'duration', approx: true },

  // ── Minute durations ──
  { jp: '五分', reading: 'ごふん', en: '5 minutes', category: 'duration', note: 'standalone usually means duration' },
  { jp: '十分', reading: 'じゅっぷん', en: '10 minutes', category: 'duration', tricky: true, note: '十分 → じゅっぷん / じっぷん (not じゅうふん)' },
  { jp: '十五分', reading: 'じゅうごふん', en: '15 minutes', category: 'duration' },
  { jp: '三十分', reading: 'さんじっぷん', en: '30 minutes', category: 'duration', tricky: true, note: '三十分 → さんじっぷん / さんじゅっぷん' },
  { jp: '四十五分', reading: 'よんじゅうごふん', en: '45 minutes', category: 'duration' },
  { jp: '五十分', reading: 'ごじっぷん', en: '50 minutes', category: 'duration' },
  { jp: '五分ぐらい', reading: 'ごふんぐらい', en: 'about 5 minutes', category: 'duration', approx: true },

  // ── Days (ambiguous: native readings can be date OR duration) ──
  { jp: '一日', reading: 'ついたち / いちにち', en: '1st of month / one day', category: 'ambiguous', tricky: true, note: 'ついたち = 1st of month; いちにち = one day' },
  { jp: '二日', reading: 'ふつか', en: '2nd / 2 days', category: 'ambiguous', tricky: true, note: 'ふつか — date or duration' },
  { jp: '三日', reading: 'みっか', en: '3rd / 3 days', category: 'ambiguous', tricky: true, note: 'みっか — date or duration' },
  { jp: '四日', reading: 'よっか', en: '4th / 4 days', category: 'ambiguous', tricky: true, note: 'よっか — date or duration' },
  { jp: '五日', reading: 'いつか', en: '5th / 5 days', category: 'ambiguous', tricky: true, note: 'いつか — same sound as 「いつか」(someday)' },
  { jp: '六日', reading: 'むいか', en: '6th / 6 days', category: 'ambiguous', tricky: true, note: 'むいか' },
  { jp: '七日', reading: 'なのか', en: '7th / 7 days', category: 'ambiguous', tricky: true, note: 'なのか' },
  { jp: '八日', reading: 'ようか', en: '8th / 8 days', category: 'ambiguous', tricky: true, note: 'ようか' },
  { jp: '九日', reading: 'ここのか', en: '9th / 9 days', category: 'ambiguous', tricky: true, note: 'ここのか' },
  { jp: '十日', reading: 'とおか', en: '10th / 10 days', category: 'ambiguous', tricky: true, note: 'とおか' },
  { jp: '十四日', reading: 'じゅうよっか', en: '14th / 14 days', category: 'ambiguous', tricky: true, note: 'じゅうよっか — keeps the よっか pattern' },
  { jp: '二十日', reading: 'はつか', en: '20th / 20 days', category: 'ambiguous', tricky: true, note: 'はつか — completely irregular' },
  { jp: '二十四日', reading: 'にじゅうよっか', en: '24th / 24 days', category: 'ambiguous', tricky: true, note: 'にじゅうよっか' },

  // ── Day durations (explicit) ──
  { jp: '二日間', reading: 'ふつかかん', en: '2 days (duration)', category: 'duration' },
  { jp: '三日間', reading: 'みっかかん', en: '3 days (duration)', category: 'duration' },
  { jp: '一週間', reading: 'いっしゅうかん', en: '1 week', category: 'duration' },
  { jp: '二週間', reading: 'にしゅうかん', en: '2 weeks', category: 'duration' },
  { jp: '三週間', reading: 'さんしゅうかん', en: '3 weeks', category: 'duration' },

  // ── Months (point / duration) ──
  { jp: '一月', reading: 'いちがつ', en: 'January', category: 'point' },
  { jp: '四月', reading: 'しがつ', en: 'April', category: 'point', tricky: true, note: '四月 → しがつ (not よんがつ)' },
  { jp: '七月', reading: 'しちがつ', en: 'July', category: 'point', tricky: true, note: '七月 → しちがつ (not なながつ)' },
  { jp: '九月', reading: 'くがつ', en: 'September', category: 'point', tricky: true, note: '九月 → くがつ (not きゅうがつ)' },
  { jp: '十二月', reading: 'じゅうにがつ', en: 'December', category: 'point' },
  { jp: '七月十四日', reading: 'しちがつじゅうよっか', en: 'July 14th', category: 'point' },
  { jp: '一ヶ月', reading: 'いっかげつ', en: '1 month', category: 'duration' },
  { jp: '三ヶ月', reading: 'さんかげつ', en: '3 months', category: 'duration' },
  { jp: '六ヶ月', reading: 'ろっかげつ', en: '6 months', category: 'duration' },

  // ── Year durations ──
  { jp: '一年', reading: 'いちねん', en: '1 year', category: 'duration' },
  { jp: '三年間', reading: 'さんねんかん', en: '3 years (duration)', category: 'duration' },
  { jp: '十年', reading: 'じゅうねん', en: '10 years', category: 'duration' },
  { jp: '一年中', reading: 'いちねんじゅう', en: 'all year long', category: 'duration' },

  // ── Relative (anchored to now) ──
  { jp: '今日', reading: 'きょう', en: 'today', category: 'relative' },
  { jp: '明日', reading: 'あした', en: 'tomorrow', category: 'relative' },
  { jp: '明後日', reading: 'あさって', en: 'day after tomorrow', category: 'relative' },
  { jp: '昨日', reading: 'きのう', en: 'yesterday', category: 'relative' },
  { jp: '一昨日', reading: 'おととい', en: 'day before yesterday', category: 'relative', tricky: true, note: 'おととい' },
  { jp: '今週', reading: 'こんしゅう', en: 'this week', category: 'relative' },
  { jp: '来週', reading: 'らいしゅう', en: 'next week', category: 'relative' },
  { jp: '先週', reading: 'せんしゅう', en: 'last week', category: 'relative' },
  { jp: '今月', reading: 'こんげつ', en: 'this month', category: 'relative' },
  { jp: '来月', reading: 'らいげつ', en: 'next month', category: 'relative' },
  { jp: '先月', reading: 'せんげつ', en: 'last month', category: 'relative' },
  { jp: '今年', reading: 'ことし', en: 'this year', category: 'relative', tricky: true, note: '今年 → ことし (not こんねん)' },
  { jp: '来年', reading: 'らいねん', en: 'next year', category: 'relative' },
  { jp: '去年', reading: 'きょねん', en: 'last year', category: 'relative' },
  { jp: '三日後', reading: 'みっかご', en: 'in 3 days', category: 'relative' },
  { jp: '三日前', reading: 'みっかまえ', en: '3 days ago', category: 'relative' },
  { jp: '五分後', reading: 'ごふんご', en: 'in 5 minutes', category: 'relative' },
  { jp: '十分後', reading: 'じゅっぷんご', en: 'in 10 minutes', category: 'relative' },
  { jp: '一時間前', reading: 'いちじかんまえ', en: '1 hour ago', category: 'relative' },
  { jp: '二時間後', reading: 'にじかんご', en: 'in 2 hours', category: 'relative' },
  { jp: '一週間後', reading: 'いっしゅうかんご', en: 'in 1 week', category: 'relative' },
  { jp: '三年後', reading: 'さんねんご', en: 'in 3 years', category: 'relative' },
  { jp: '来週の金曜日', reading: 'らいしゅうのきんようび', en: 'next Friday', category: 'relative' },
  { jp: '先週の月曜日', reading: 'せんしゅうのげつようび', en: 'last Monday', category: 'relative' },
];

// ── Phase 3: Micro-embedding sentences ──
// Short sentences where the time expression is the entire focus.
const timeDrillMicroSentences = [
  { jp: '三時に行きます。', en: 'I will go at 3.', category: 'point' },
  { jp: '三時間待ちました。', en: 'I waited for 3 hours.', category: 'duration' },
  { jp: '三日後に出発します。', en: 'I depart in 3 days.', category: 'relative' },
  { jp: '七月に引っ越します。', en: 'I am moving in July.', category: 'point' },
  { jp: '五分後に始まります。', en: 'It starts in 5 minutes.', category: 'relative' },
  { jp: '十分かかりました。', en: 'It took 10 minutes.', category: 'duration' },
  { jp: '来週会いましょう。', en: 'Let\'s meet next week.', category: 'relative' },
  { jp: '昨日電話しました。', en: 'I called yesterday.', category: 'relative' },
  { jp: '半時間休みます。', en: 'I will rest for half an hour.', category: 'duration' },
  { jp: '九時に起きました。', en: 'I woke up at 9.', category: 'point' },
  { jp: '二日間休みました。', en: 'I rested for 2 days.', category: 'duration' },
  { jp: '一年中暑いです。', en: 'It is hot all year long.', category: 'duration' },
  { jp: '六ヶ月勉強しました。', en: 'I studied for 6 months.', category: 'duration' },
  { jp: '明日来ます。', en: 'I will come tomorrow.', category: 'relative' },
  { jp: '先月卒業しました。', en: 'I graduated last month.', category: 'relative' },
];

// ── Phase 4: Time-first listening pressure ──
// Sentences where the time expression hits early. Tag the type, then reconstruct meaning.
const timeDrillFrontLoaded = [
  { jp: '午後三時半に会議があります。', en: 'There is a meeting at 3:30 PM.', timeExp: '午後三時半', category: 'point' },
  { jp: '来週の火曜日にテストがあります。', en: 'There is a test next Tuesday.', timeExp: '来週の火曜日', category: 'relative' },
  { jp: '二時間ぐらい勉強しました。', en: 'I studied for about 2 hours.', timeExp: '二時間ぐらい', category: 'duration' },
  { jp: '三日後に結果がわかります。', en: 'The results will be known in 3 days.', timeExp: '三日後', category: 'relative' },
  { jp: '四時にお茶を飲みましょう。', en: 'Let\'s have tea at 4.', timeExp: '四時', category: 'point' },
  { jp: '一週間ぐらい旅行しました。', en: 'I traveled for about a week.', timeExp: '一週間ぐらい', category: 'duration' },
  { jp: '七月十四日に花火大会があります。', en: 'There is a fireworks festival on July 14th.', timeExp: '七月十四日', category: 'point' },
  { jp: '昨日の夜友達と食事しました。', en: 'I had dinner with a friend last night.', timeExp: '昨日の夜', category: 'relative' },
  { jp: '三十分後に駅で会いましょう。', en: 'Let\'s meet at the station in 30 minutes.', timeExp: '三十分後', category: 'relative' },
  { jp: '半年間日本に住んでいました。', en: 'I lived in Japan for half a year.', timeExp: '半年間', category: 'duration' },
  { jp: '来月の二十日に引っ越します。', en: 'I am moving on the 20th of next month.', timeExp: '来月の二十日', category: 'relative' },
  { jp: '九時ごろまで仕事をしていました。', en: 'I was working until around 9.', timeExp: '九時ごろ', category: 'point' },
  { jp: '二週間前に風邪をひきました。', en: 'I caught a cold 2 weeks ago.', timeExp: '二週間前', category: 'relative' },
  { jp: '三ヶ月かかりました。', en: 'It took 3 months.', timeExp: '三ヶ月', category: 'duration' },
  { jp: '明後日の朝出発します。', en: 'I depart the morning of the day after tomorrow.', timeExp: '明後日の朝', category: 'relative' },
];

// ── Phase 5: Density bursts ──
// Stack related forms back-to-back for rapid-fire reps.
const timeDrillBursts = [
  {
    theme: 'Three with different counters',
    items: [
      { jp: '三時', en: '3 o\'clock' },
      { jp: '三時半', en: '3:30' },
      { jp: '三時間', en: '3 hours' },
      { jp: '三日', en: '3rd / 3 days' },
      { jp: '三日後', en: 'in 3 days' },
      { jp: '三週間', en: '3 weeks' },
      { jp: '三ヶ月', en: '3 months' },
      { jp: '三年', en: '3 years' },
    ],
  },
  {
    theme: 'Time march (relative)',
    items: [
      { jp: '今日', en: 'today' },
      { jp: '明日', en: 'tomorrow' },
      { jp: '明後日', en: 'day after tomorrow' },
      { jp: '来週', en: 'next week' },
      { jp: '来月', en: 'next month' },
      { jp: '来年', en: 'next year' },
    ],
  },
  {
    theme: 'Past sweep',
    items: [
      { jp: '昨日', en: 'yesterday' },
      { jp: '一昨日', en: 'day before yesterday' },
      { jp: '先週', en: 'last week' },
      { jp: '先月', en: 'last month' },
      { jp: '去年', en: 'last year' },
    ],
  },
  {
    theme: 'Irregular date readings (1–10)',
    items: [
      { jp: '一日', en: 'ついたち — 1st' },
      { jp: '二日', en: 'ふつか — 2nd / 2 days' },
      { jp: '三日', en: 'みっか — 3rd / 3 days' },
      { jp: '四日', en: 'よっか — 4th / 4 days' },
      { jp: '五日', en: 'いつか — 5th / 5 days' },
      { jp: '六日', en: 'むいか — 6th / 6 days' },
      { jp: '七日', en: 'なのか — 7th / 7 days' },
      { jp: '八日', en: 'ようか — 8th / 8 days' },
      { jp: '九日', en: 'ここのか — 9th / 9 days' },
      { jp: '十日', en: 'とおか — 10th / 10 days' },
    ],
  },
  {
    theme: 'Clock precision',
    items: [
      { jp: '一時', en: '1:00' },
      { jp: '一時十五分', en: '1:15' },
      { jp: '一時半', en: '1:30' },
      { jp: '一時四十五分', en: '1:45' },
      { jp: '二時', en: '2:00' },
    ],
  },
  {
    theme: 'AM / PM clock',
    items: [
      { jp: '午前八時', en: '8 AM' },
      { jp: '午後一時', en: '1 PM' },
      { jp: '午前十時', en: '10 AM' },
      { jp: '午後七時', en: '7 PM' },
      { jp: '朝の六時', en: '6 in the morning' },
      { jp: '夜の十一時', en: '11 at night' },
    ],
  },
  {
    theme: 'Approximation (ごろ vs ぐらい)',
    items: [
      { jp: '三時ごろ', en: 'around 3 o\'clock (point)' },
      { jp: '三時間ぐらい', en: 'about 3 hours (duration)' },
      { jp: '五分ぐらい', en: 'about 5 minutes (duration)' },
      { jp: '九時ごろ', en: 'around 9 (point)' },
      { jp: '一週間ぐらい', en: 'about a week (duration)' },
    ],
  },
  {
    theme: 'Tricky kunyomi months',
    items: [
      { jp: '一月', en: 'いちがつ — January' },
      { jp: '四月', en: 'しがつ — April' },
      { jp: '七月', en: 'しちがつ — July' },
      { jp: '九月', en: 'くがつ — September' },
      { jp: '十月', en: 'じゅうがつ — October' },
    ],
  },
  {
    theme: '〜後 / 〜前 sweep',
    items: [
      { jp: '五分後', en: 'in 5 minutes' },
      { jp: '一時間後', en: 'in 1 hour' },
      { jp: '三日後', en: 'in 3 days' },
      { jp: '一週間後', en: 'in 1 week' },
      { jp: '三日前', en: '3 days ago' },
      { jp: '二週間前', en: '2 weeks ago' },
      { jp: '一年前', en: '1 year ago' },
    ],
  },
];
