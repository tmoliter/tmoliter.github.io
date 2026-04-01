const timePhrases = [
  // ── MINUTES ──
  { jp: '五分後に来てください。', en: 'Please come in 5 minutes.', tricky: false },
  { jp: '十分で終わります。', en: 'I will finish in 10 minutes.', tricky: true, note: '十分 → じゅっぷん / じっぷん (not じゅうふん)' },
  { jp: 'あと十分で映画が始まります。', en: 'The movie starts in 10 more minutes.', tricky: true, note: '十分 → じゅっぷん (10 minutes, unrelated to 十分「enough」)' },
  { jp: '三十分ぐらいかかります。', en: 'It takes about 30 minutes.', tricky: true, note: '三十分 → さんじっぷん or さんじゅっぷん' },
  { jp: '四十五分後に着きます。', en: 'I will arrive in 45 minutes.', tricky: false },
  { jp: '五十分ぐらいバスに乗ります。', en: 'I ride the bus for about 50 minutes.', tricky: false },
  { jp: '三十分前に食べました。', en: 'I ate 30 minutes ago.', tricky: false },

  // ── HOURS ──
  { jp: '二時間待ちました。', en: 'I waited for 2 hours.', tricky: false },
  { jp: '一時間半で着きます。', en: 'I will arrive in an hour and a half.', tricky: false },
  { jp: '三時間ぐらい寝ました。', en: 'I slept for about 3 hours.', tricky: false },
  { jp: '一時間後に戻ります。', en: 'I will be back in 1 hour.', tricky: false },
  { jp: '二時間前に薬を飲みました。', en: 'I took medicine 2 hours ago.', tricky: false },

  // ── DAYS (irregular native readings) ──
  { jp: '一日中勉強しました。', en: 'I studied all day long.', tricky: false },
  { jp: '二日間旅行しました。', en: 'I traveled for 2 days.', tricky: true, note: '二日 → ふつか (not にか)' },
  { jp: '三日間風邪で休みました。', en: 'I took 3 days off with a cold.', tricky: true, note: '三日 → みっか' },
  { jp: '四日間出張でした。', en: 'I was on a business trip for 4 days.', tricky: true, note: '四日 → よっか' },
  { jp: '五日間旅行しました。', en: 'I traveled for 5 days.', tricky: true, note: '五日 → いつか — same reading as 「いつか」(someday)' },
  { jp: '六日間雨が続きました。', en: 'The rain continued for 6 days.', tricky: true, note: '六日 → むいか' },
  { jp: '七日間咳が止まりませんでした。', en: 'My cough did not stop for 7 days.', tricky: true, note: '七日 → なのか' },
  { jp: '八日間かかりました。', en: 'It took 8 days.', tricky: true, note: '八日 → ようか' },
  { jp: '九日間入院しました。', en: 'I was hospitalized for 9 days.', tricky: true, note: '九日 → ここのか' },
  { jp: '十日間休みました。', en: 'I rested for 10 days.', tricky: true, note: '十日 → とおか' },
  { jp: '二十日間海外にいました。', en: 'I was abroad for 20 days.', tricky: true, note: '二十日 → はつか' },
  { jp: '二日後に結果がわかります。', en: 'The results will be known in 2 days.', tricky: true, note: '二日 → ふつか' },
  { jp: '一日おきに薬を飲んでいます。', en: 'I take medicine every other day.', tricky: false },

  // ── WEEKS ──
  { jp: '一週間後に結果が出ます。', en: 'The results come out in one week.', tricky: false },
  { jp: '三週間かかりました。', en: 'It took three weeks.', tricky: false },
  { jp: '二週間ぶりに会いました。', en: 'We met for the first time in two weeks.', tricky: false },

  // ── MONTHS ──
  { jp: '三か月前に引っ越しました。', en: 'I moved three months ago.', tricky: false },
  { jp: '六ヶ月間日本語を勉強しました。', en: 'I studied Japanese for 6 months.', tricky: false },
  { jp: '二か月後に試験があります。', en: 'There is an exam in two months.', tricky: false },

  // ── YEARS & ぶり ──
  { jp: '二十年ぶりに会いました。', en: 'We met for the first time in 20 years.', tricky: false },
  { jp: '五年ぶりに帰省しました。', en: 'I went home for the first time in 5 years.', tricky: false },
  { jp: '三年間海外で働きました。', en: 'I worked abroad for 3 years.', tricky: false },
  { jp: '一年ぶりに雪が降りました。', en: 'Snow fell for the first time in a year.', tricky: false },
  { jp: '十年後の自分を想像してください。', en: 'Please imagine yourself 10 years from now.', tricky: false },
  { jp: '五年間ずっと同じ会社で働いています。', en: 'I have been working at the same company for 5 years.', tricky: false },
  { jp: '一年中忙しかったです。', en: 'I was busy all year long.', tricky: false },

  // ── MIXED ──
  { jp: '四十分後にバスが来ます。', en: 'The bus comes in 40 minutes.', tricky: false },
  { jp: '三十分後にまた電話します。', en: 'I will call again in 30 minutes.', tricky: false },
];
