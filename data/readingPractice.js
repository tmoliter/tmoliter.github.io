// Practical reading practice — signs, menus, instructions you'll actually
// encounter on a trip. Each entry has a category key, the text as it would
// appear, hiragana reading (may be empty for kana-only items), English
// meaning, and an optional context note.
const readingCategories = {
  transit:      "🚉 Transit",
  restaurant:   "🍜 Restaurant",
  fukuoka_food: "🍜 Fukuoka food",
  hotel:        "🏨 Hotel",
  onsen:        "♨ Onsen",
  warning:      "⚠ Sign",
  restroom:     "🚻 Restroom",
  money:        "💴 Money",
  shop:         "🛍 Shop",
  outdoors:     "🌲 Outdoors",
  medical:      "💊 Medical",
};

const readingPractice = [
  // ── Transit ──
  { id: 1,  cat: "transit", jp: "改札口", reading: "かいさつぐち", en: "Ticket gate", note: "Where you tap your IC card to enter or exit the station." },
  { id: 2,  cat: "transit", jp: "出口", reading: "でぐち", en: "Exit" },
  { id: 3,  cat: "transit", jp: "入口", reading: "いりぐち", en: "Entrance" },
  { id: 4,  cat: "transit", jp: "切符売り場", reading: "きっぷうりば", en: "Ticket counter / ticket office" },
  { id: 5,  cat: "transit", jp: "のりかえ", reading: "", en: "Transfer (between trains/lines)" },
  { id: 6,  cat: "transit", jp: "普通", reading: "ふつう", en: "Local train (stops at every station)" },
  { id: 7,  cat: "transit", jp: "急行", reading: "きゅうこう", en: "Express" },
  { id: 8,  cat: "transit", jp: "特急", reading: "とっきゅう", en: "Limited express" },
  { id: 9,  cat: "transit", jp: "各駅停車", reading: "かくえきていしゃ", en: "Stops at each station (= local)" },
  { id: 10, cat: "transit", jp: "始発", reading: "しはつ", en: "First train of the day / origin station" },
  { id: 11, cat: "transit", jp: "終電", reading: "しゅうでん", en: "Last train of the day" },
  { id: 12, cat: "transit", jp: "案内所", reading: "あんないじょ", en: "Information desk" },
  { id: 13, cat: "transit", jp: "番線", reading: "ばんせん", en: "Platform-number suffix", note: "e.g. 3番線 = Platform 3." },
  { id: 14, cat: "transit", jp: "西鉄", reading: "にしてつ", en: "Nishitetsu", note: "Fukuoka's local rail and bus operator." },
  { id: 15, cat: "transit", jp: "博多駅", reading: "はかたえき", en: "Hakata Station — Fukuoka's main hub" },
  { id: 16, cat: "transit", jp: "天神", reading: "てんじん", en: "Tenjin — Fukuoka's main shopping/entertainment district" },
  { id: 17, cat: "transit", jp: "終点", reading: "しゅうてん", en: "Last stop / end of the line" },
  { id: 18, cat: "transit", jp: "バス停", reading: "バスてい", en: "Bus stop" },
  { id: 19, cat: "transit", jp: "両替", reading: "りょうがえ", en: "Change machine (on buses, for breaking bills into coins)" },

  // ── Restaurant ──
  { id: 20, cat: "restaurant", jp: "定食", reading: "ていしょく", en: "Set meal (main + rice + soup + sides)" },
  { id: 21, cat: "restaurant", jp: "本日のおすすめ", reading: "ほんじつのおすすめ", en: "Today's recommendation" },
  { id: 22, cat: "restaurant", jp: "飲み放題", reading: "のみほうだい", en: "All-you-can-drink" },
  { id: 23, cat: "restaurant", jp: "食べ放題", reading: "たべほうだい", en: "All-you-can-eat" },
  { id: 24, cat: "restaurant", jp: "お通し", reading: "おとおし", en: "Cover charge / mandatory small appetizer", note: "Standard at izakaya — appears on the bill whether you ordered it or not." },
  { id: 25, cat: "restaurant", jp: "単品", reading: "たんぴん", en: "A la carte / single item (vs set)" },
  { id: 26, cat: "restaurant", jp: "大盛り", reading: "おおもり", en: "Large portion" },
  { id: 27, cat: "restaurant", jp: "並", reading: "なみ", en: "Regular size" },
  { id: 28, cat: "restaurant", jp: "税込", reading: "ぜいこみ", en: "Tax included" },
  { id: 29, cat: "restaurant", jp: "税別", reading: "ぜいべつ", en: "Tax not included" },
  { id: 30, cat: "restaurant", jp: "お会計", reading: "おかいけい", en: "The bill / check" },
  { id: 31, cat: "restaurant", jp: "持ち帰り", reading: "もちかえり", en: "Takeout" },
  { id: 32, cat: "restaurant", jp: "店内", reading: "てんない", en: "Dine in" },
  { id: 33, cat: "restaurant", jp: "営業中", reading: "えいぎょうちゅう", en: "Open (for business)" },
  { id: 34, cat: "restaurant", jp: "準備中", reading: "じゅんびちゅう", en: "Currently preparing — i.e. closed" },
  { id: 35, cat: "restaurant", jp: "定休日", reading: "ていきゅうび", en: "Regular weekly closing day" },
  { id: 36, cat: "restaurant", jp: "本日休業", reading: "ほんじつきゅうぎょう", en: "Closed today" },
  { id: 37, cat: "restaurant", jp: "満席", reading: "まんせき", en: "All seats taken / fully booked" },
  { id: 38, cat: "restaurant", jp: "食券", reading: "しょっけん", en: "Meal ticket", note: "You buy from a vending machine before sitting down — common at ramen shops." },
  { id: 39, cat: "restaurant", jp: "ご注文", reading: "ごちゅうもん", en: "Your order (server's word)" },
  { id: 40, cat: "restaurant", jp: "何名様", reading: "なんめいさま", en: "How many people?", note: "First thing host asks when you walk in." },
  { id: 41, cat: "restaurant", jp: "ご案内します", reading: "ごあんないします", en: "I'll show you to your seat" },

  // ── Fukuoka food ──
  { id: 42, cat: "fukuoka_food", jp: "博多ラーメン", reading: "はかたラーメン", en: "Hakata ramen — thin straight noodles in tonkotsu broth" },
  { id: 43, cat: "fukuoka_food", jp: "もつ鍋", reading: "もつなべ", en: "Motsu nabe — offal hot pot, Fukuoka specialty" },
  { id: 44, cat: "fukuoka_food", jp: "水炊き", reading: "みずたき", en: "Mizutaki — chicken hot pot, Fukuoka specialty" },
  { id: 45, cat: "fukuoka_food", jp: "明太子", reading: "めんたいこ", en: "Mentaiko — spicy cod roe, Fukuoka famous" },
  { id: 46, cat: "fukuoka_food", jp: "屋台", reading: "やたい", en: "Outdoor food stall", note: "Fukuoka has the most yatai in Japan — Nakasu and Tenjin riverside." },
  { id: 47, cat: "fukuoka_food", jp: "とんこつ", reading: "", en: "Pork-bone broth (basis of Hakata ramen)" },
  { id: 48, cat: "fukuoka_food", jp: "替え玉", reading: "かえだま", en: "Extra noodles in your existing broth", note: "Order this when noodles are gone but broth remains. Standard at Hakata ramen joints." },
  { id: 49, cat: "fukuoka_food", jp: "バリカタ", reading: "", en: "Very firm noodle texture", note: "Common ramen order. Order of firmness: ハリガネ > バリカタ > カタ > 普通 > やわ。" },

  // ── Hotel / Ryokan ──
  { id: 50, cat: "hotel", jp: "チェックイン", reading: "", en: "Check-in" },
  { id: 51, cat: "hotel", jp: "チェックアウト", reading: "", en: "Check-out" },
  { id: 52, cat: "hotel", jp: "フロント", reading: "", en: "Front desk" },
  { id: 53, cat: "hotel", jp: "朝食", reading: "ちょうしょく", en: "Breakfast" },
  { id: 54, cat: "hotel", jp: "夕食", reading: "ゆうしょく", en: "Dinner" },
  { id: 55, cat: "hotel", jp: "浴衣", reading: "ゆかた", en: "Yukata — light cotton robe", note: "Provided in ryokan rooms; can be worn around the property." },
  { id: 56, cat: "hotel", jp: "禁煙", reading: "きんえん", en: "No smoking" },
  { id: 57, cat: "hotel", jp: "喫煙", reading: "きつえん", en: "Smoking" },
  { id: 58, cat: "hotel", jp: "鍵", reading: "かぎ", en: "Key" },
  { id: 59, cat: "hotel", jp: "客室", reading: "きゃくしつ", en: "Guest room" },

  // ── Onsen ──
  { id: 60, cat: "onsen", jp: "大浴場", reading: "だいよくじょう", en: "Large public bath" },
  { id: 61, cat: "onsen", jp: "男湯", reading: "おとこゆ", en: "Men's bath" },
  { id: 62, cat: "onsen", jp: "女湯", reading: "おんなゆ", en: "Women's bath" },
  { id: 63, cat: "onsen", jp: "体を洗ってから入ってください", reading: "からだをあらってからはいってください", en: "Please wash your body before entering" },
  { id: 64, cat: "onsen", jp: "タトゥー禁止", reading: "タトゥーきんし", en: "No tattoos allowed" },
  { id: 65, cat: "onsen", jp: "貴重品", reading: "きちょうひん", en: "Valuables", note: "Sign near locker areas — 貴重品ロッカー = valuables locker." },

  // ── Caution / wayfinding ──
  { id: 66, cat: "warning", jp: "立入禁止", reading: "たちいりきんし", en: "No entry / keep out" },
  { id: 67, cat: "warning", jp: "注意", reading: "ちゅうい", en: "Caution" },
  { id: 68, cat: "warning", jp: "危険", reading: "きけん", en: "Danger" },
  { id: 69, cat: "warning", jp: "工事中", reading: "こうじちゅう", en: "Under construction" },
  { id: 70, cat: "warning", jp: "通行止め", reading: "つうこうどめ", en: "Road closed / no through traffic" },
  { id: 71, cat: "warning", jp: "故障中", reading: "こしょうちゅう", en: "Out of order" },
  { id: 72, cat: "warning", jp: "押す", reading: "おす", en: "Push" },
  { id: 73, cat: "warning", jp: "引く", reading: "ひく", en: "Pull" },
  { id: 74, cat: "warning", jp: "並んでお待ちください", reading: "ならんでおまちください", en: "Please line up and wait" },
  { id: 75, cat: "warning", jp: "足元注意", reading: "あしもとちゅうい", en: "Watch your step" },
  { id: 76, cat: "warning", jp: "頭上注意", reading: "ずじょうちゅうい", en: "Watch your head (low ceiling)" },

  // ── Restroom ──
  { id: 77, cat: "restroom", jp: "お手洗い", reading: "おてあらい", en: "Restroom (polite)" },
  { id: 78, cat: "restroom", jp: "男性", reading: "だんせい", en: "Men" },
  { id: 79, cat: "restroom", jp: "女性", reading: "じょせい", en: "Women" },
  { id: 80, cat: "restroom", jp: "多目的トイレ", reading: "たもくてきトイレ", en: "Accessible / multi-purpose restroom" },
  { id: 81, cat: "restroom", jp: "使用中", reading: "しようちゅう", en: "Occupied / in use" },
  { id: 82, cat: "restroom", jp: "空き", reading: "あき", en: "Vacant / empty" },

  // ── Money ──
  { id: 83, cat: "money", jp: "現金", reading: "げんきん", en: "Cash" },
  { id: 84, cat: "money", jp: "電子マネー", reading: "でんしマネー", en: "IC card / electronic money", note: "Suica, Pasmo, ICOCA, Sugoca (Fukuoka), etc. — all interoperable." },
  { id: 85, cat: "money", jp: "領収書", reading: "りょうしゅうしょ", en: "Formal receipt (for business expenses)" },
  { id: 86, cat: "money", jp: "レシート", reading: "", en: "Regular receipt" },
  { id: 87, cat: "money", jp: "自販機", reading: "じはんき", en: "Vending machine", note: "Short for 自動販売機 — everywhere in Japan." },

  // ── Shop ──
  { id: 88, cat: "shop", jp: "半額", reading: "はんがく", en: "Half price" },
  { id: 89, cat: "shop", jp: "セール", reading: "", en: "Sale" },
  { id: 90, cat: "shop", jp: "期間限定", reading: "きかんげんてい", en: "Limited time only" },
  { id: 91, cat: "shop", jp: "売り切れ", reading: "うりきれ", en: "Sold out" },
  { id: 92, cat: "shop", jp: "袋", reading: "ふくろ", en: "Bag", note: "Cashier will ask 袋いりますか? (Do you need a bag?) — usually costs ¥3-5." },
  { id: 93, cat: "shop", jp: "温め", reading: "あたため", en: "Warming up", note: "Convenience-store cashier asks if you want food microwaved: 温めますか?" },
  { id: 94, cat: "shop", jp: "ポイントカード", reading: "", en: "Points card", note: "Cashier will ask ポイントカードはお持ちですか? — answer 持っていません if no." },

  // ── Yakushima / outdoors ──
  { id: 95, cat: "outdoors", jp: "屋久島", reading: "やくしま", en: "Yakushima" },
  { id: 96, cat: "outdoors", jp: "縄文杉", reading: "じょうもんすぎ", en: "Jomon Sugi — the famous ancient cedar" },
  { id: 97, cat: "outdoors", jp: "登山道", reading: "とざんどう", en: "Hiking trail" },
  { id: 98, cat: "outdoors", jp: "登山口", reading: "とざんぐち", en: "Trailhead (entrance to a hiking trail)" },
  { id: 99, cat: "outdoors", jp: "入山届", reading: "にゅうざんとどけ", en: "Mountain-entry registration form" },
  { id: 100, cat: "outdoors", jp: "雨具", reading: "あまぐ", en: "Rain gear", note: "Yakushima is one of the wettest places in Japan — bring real rain gear." },
  { id: 101, cat: "outdoors", jp: "落石注意", reading: "らくせきちゅうい", en: "Watch for falling rocks" },
  { id: 102, cat: "outdoors", jp: "熊出没注意", reading: "くましゅつぼつちゅうい", en: "Bear sighting — caution", note: "Not Yakushima (no bears), but you'll see this on Honshu and Hokkaido trails." },

  // ── Medical ──
  { id: 103, cat: "medical", jp: "薬局", reading: "やっきょく", en: "Pharmacy" },
  { id: 104, cat: "medical", jp: "病院", reading: "びょういん", en: "Hospital" },
  { id: 105, cat: "medical", jp: "風邪薬", reading: "かぜぐすり", en: "Cold medicine" },
  { id: 106, cat: "medical", jp: "痛み止め", reading: "いたみどめ", en: "Painkiller" },
  { id: 107, cat: "medical", jp: "保険証", reading: "ほけんしょう", en: "Insurance card", note: "If you visit a clinic they'll ask 保険証はありますか? — say no if you're a tourist." },

  // ── Transit · IC cards ──
  { id: 108, cat: "transit", jp: "ICカード", reading: "アイシーカード", en: "IC card", note: "Tap to ride trains, buses, and pay at convenience stores. Buy at any major station ticket counter." },
  { id: 109, cat: "transit", jp: "チャージ", reading: "", en: "Charge / top up", note: "Verb: チャージする. Add cash to your IC card at any ticket machine." },
  { id: 110, cat: "transit", jp: "残高", reading: "ざんだか", en: "Remaining balance", note: "Shown on the gate display when you tap. 残高不足 (ざんだかぶそく) = insufficient balance." },
  { id: 111, cat: "transit", jp: "SUGOCA", reading: "スゴカ", en: "JR Kyushu's IC card", note: "Sold at JR Kyushu stations including Hakata. Works nationwide on most rail systems." },
  { id: 112, cat: "transit", jp: "nimoca", reading: "ニモカ", en: "Nishitetsu's IC card", note: "Sold at Nishitetsu stations. Works on Fukuoka subway, Nishitetsu trains/buses, plus nationally." },

  // ── Transit · Tickets ──
  { id: 113, cat: "transit", jp: "自動券売機", reading: "じどうけんばいき", en: "Automatic ticket vending machine", note: "Most major stations have an English mode — look for the language button top right." },
  { id: 114, cat: "transit", jp: "乗車券", reading: "じょうしゃけん", en: "Fare ticket", note: "Basic ride ticket. On limited express / shinkansen you also need a 特急券 (limited express ticket)." },
  { id: 115, cat: "transit", jp: "片道", reading: "かたみち", en: "One-way" },
  { id: 116, cat: "transit", jp: "往復", reading: "おうふく", en: "Round trip", note: "Often slightly cheaper than two one-ways." },
  { id: 117, cat: "transit", jp: "指定席", reading: "していせき", en: "Reserved seat", note: "On shinkansen and limited express. Costs extra but guarantees a specific seat." },
  { id: 118, cat: "transit", jp: "自由席", reading: "じゆうせき", en: "Non-reserved seat", note: "Cheaper, first-come first-served — you might stand on busy trains." },
  { id: 119, cat: "transit", jp: "一日乗車券", reading: "いちにちじょうしゃけん", en: "One-day pass", note: "Unlimited rides on the issuing line. Worth it for ~3+ trips in a day." },

  // ── Transit · On the train ──
  { id: 120, cat: "transit", jp: "次は", reading: "つぎは", en: "Next stop is …", note: "Standard announcement: 次は博多です = Next is Hakata." },
  { id: 121, cat: "transit", jp: "〜行き", reading: "〜ゆき", en: "Bound for …", note: "Read 「ゆき」 in announcements, 「いき」 in writing. 博多行き = bound for Hakata." },
  { id: 122, cat: "transit", jp: "まもなく", reading: "", en: "Shortly / momentarily", note: "Heard right before arrival: まもなく到着します = arriving shortly." },
  { id: 123, cat: "transit", jp: "優先席", reading: "ゆうせんせき", en: "Priority seat", note: "For elderly, pregnant, injured, those with small children. Avoid unless the car is empty." },
  { id: 124, cat: "transit", jp: "上り", reading: "のぼり", en: "Inbound (toward Tokyo)" },
  { id: 125, cat: "transit", jp: "下り", reading: "くだり", en: "Outbound (away from Tokyo)" },

  // ── Transit · Station operations ──
  { id: 126, cat: "transit", jp: "ホーム", reading: "", en: "Platform", note: "Loanword from English. Used in announcements; 番線 used on signage." },
  { id: 127, cat: "transit", jp: "精算機", reading: "せいさんき", en: "Fare-adjustment machine", note: "If you rode past your paid destination, settle the difference here before the gate." },
  { id: 128, cat: "transit", jp: "精算", reading: "せいさん", en: "Fare adjustment / settling up" },
  { id: 129, cat: "transit", jp: "コインロッカー", reading: "", en: "Coin lockers", note: "Every major station. ¥300–¥800 depending on size. Pay by coin or IC card." },

  // ── Transit · Bus ──
  { id: 130, cat: "transit", jp: "整理券", reading: "せいりけん", en: "Numbered fare slip", note: "On most city buses: take from a machine when boarding (back door), hand to the driver with your fare on exit (front door)." },
  { id: 131, cat: "transit", jp: "運賃", reading: "うんちん", en: "Fare", note: "Display board at the front of the bus shows current fare for each boarding number." },

  // ── Transit · Ferry ──
  { id: 132, cat: "transit", jp: "フェリー", reading: "", en: "Ferry" },
  { id: 133, cat: "transit", jp: "高速船", reading: "こうそくせん", en: "High-speed boat", note: "Faster Yakushima option from Kagoshima — ~2 hrs instead of ~4 by ferry." },
  { id: 134, cat: "transit", jp: "港", reading: "みなと", en: "Port / harbor" },
  { id: 135, cat: "transit", jp: "鹿児島港", reading: "かごしまこう", en: "Kagoshima Port", note: "Mainland departure point for Yakushima — both ferries and high-speed boats leave from here." },
  { id: 136, cat: "transit", jp: "宮之浦港", reading: "みやのうらこう", en: "Miyanoura Port", note: "Main port on Yakushima — most arrivals come here." },
  { id: 137, cat: "transit", jp: "欠航", reading: "けっこう", en: "Cancelled (boat / flight)", note: "Common for Yakushima boats during typhoon season — always check the morning of." },
  { id: 138, cat: "transit", jp: "運休", reading: "うんきゅう", en: "Service suspended", note: "Used for trains, buses, ferries — anything that's not running today." },
  { id: 139, cat: "transit", jp: "乗船券", reading: "じょうせんけん", en: "Boat / ferry ticket" },

  // ── Transit · Airport ──
  { id: 140, cat: "transit", jp: "空港", reading: "くうこう", en: "Airport" },
  { id: 141, cat: "transit", jp: "福岡空港", reading: "ふくおかくうこう", en: "Fukuoka Airport", note: "Famously close to the city — a 5-minute subway ride to Hakata Station." },
  { id: 142, cat: "transit", jp: "国際線", reading: "こくさいせん", en: "International (terminal / line)" },
  { id: 143, cat: "transit", jp: "国内線", reading: "こくないせん", en: "Domestic (terminal / line)" },
  { id: 144, cat: "transit", jp: "搭乗口", reading: "とうじょうぐち", en: "Boarding gate" },
  { id: 145, cat: "transit", jp: "搭乗券", reading: "とうじょうけん", en: "Boarding pass" },
  { id: 146, cat: "transit", jp: "手荷物", reading: "てにもつ", en: "Hand baggage / carry-on" },
  { id: 147, cat: "transit", jp: "預け荷物", reading: "あずけにもつ", en: "Checked baggage" },
  { id: 148, cat: "transit", jp: "入国審査", reading: "にゅうこくしんさ", en: "Immigration / passport control", note: "First stop after deplaning on arrival. Have your passport and any required forms ready." },
  { id: 149, cat: "transit", jp: "税関", reading: "ぜいかん", en: "Customs", note: "After immigration. Declaration form for goods over allowance — most travelers walk through." },

  // ── Transit · Delays & disruptions ──
  { id: 150, cat: "transit", jp: "遅延", reading: "ちえん", en: "Delay", note: "Posted on station boards: 遅延が発生しています = a delay is occurring." },
  { id: 151, cat: "transit", jp: "運転見合わせ", reading: "うんてんみあわせ", en: "Operations temporarily suspended", note: "From an incident, weather, etc. Look for 振替輸送 (ふりかえゆそう) — substitute transport on other lines, free with your ticket." },
];
