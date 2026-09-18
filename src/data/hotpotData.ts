import { SauceRecipe, IngredientItem, SecretHack, AvailableIngredient } from '../types';
import imgGunhee from '../assets/images/sauce_gunhee_bowl_1789708911102.jpg';
import imgZhmajang from '../assets/images/sauce_zhmajang_bowl_1789708924657.jpg';
import imgOilGarlic from '../assets/images/sauce_oil_garlic_1789708937450.jpg';
import imgPonzu from '../assets/images/sauce_ponzu_bowl_1789708958469.jpg';

export const BROTH_INFO = [
  {
    id: 'mala',
    name: '청유 / 우지 마라 홍탕 (麻辣红汤)',
    tagline: '얼얼하고 화끈한 사천 훠궈의 정수',
    description: '화자오(산초)와 건고추, 우지(또는 식물성 청유)로 볶아낸 진하고 알싸한 붉은 탕.',
    recommendSauces: ['건희 소스', '충칭 참기름 마늘 소스', '극강의 마장 소스'],
    bestPairings: ['소 천엽', '차돌박이', '푸주', '분모자', '오리창자'],
    proTip: '참기름+다진마늘 소스를 곁들이면 참기름이 위장을 부드럽게 코팅해 속쓰림을 막아줍니다.',
    themeColor: 'from-rose-600/30 to-red-950/40 border-rose-500/40'
  },
  {
    id: 'clear',
    name: '삼계 / 사골 백탕 (清汤/白汤)',
    tagline: '깊고 담백한 영양 가득 보양 육수',
    description: '닭뼈와 돈골, 대추, 구기자, 인삼 등을 장시간 우려내어 맑고 깊은 감칠맛을 내는 육수.',
    recommendSauces: ['황금 즈마장 소스', '해물 특제 폰즈 간장', '스위트칠리 믹스'],
    bestPairings: ['양고기', '새우완자', '알배추', '단호박', '칼국수'],
    proTip: '해산물과 채소를 먼저 넣어 채수를 우리면 국물이 한층 시원해집니다.',
    themeColor: 'from-amber-600/20 to-stone-900/40 border-amber-500/30'
  },
  {
    id: 'tomato',
    name: '새콤달콤 토마토탕 (番茄汤)',
    tagline: '남녀노소 누구나 반하는 감칠맛 폭발 탕',
    description: '잘 익은 토마토를 듬뿍 넣어 새콤하면서도 진한 감칠맛으로 마니아층이 두터운 탕.',
    recommendSauces: ['원어스 건희 소스', '크리미 참깨 소스', '다진마늘 칠리 소스'],
    bestPairings: ['유부새우완자', '우삼겹', '옥수수면', '두부피', '날달걀 죽'],
    proTip: '식사 마지막에 토마토탕 국물에 밥과 계란을 풀어 끓이는 계란죽은 필수 코스입니다!',
    themeColor: 'from-orange-600/25 to-red-900/30 border-orange-500/40'
  },
  {
    id: 'mushroom',
    name: '영지 버섯 버섯탕 (菌汤)',
    tagline: '은은한 버섯 향과 깔끔한 풍미',
    description: '표고, 노루궁뎅이, 송이 등 다양한 버섯을 우려내어 채식주의자도 극찬하는 감미로운 육수.',
    recommendSauces: ['고수 듬뿍 특제 소스', '해선간장 청양고추 소스', '전통 즈마장'],
    bestPairings: ['모둠 버섯', '유부', '소고기 샤브', '물만두', '청경채'],
    proTip: '고기를 넣기 전, 맑은 첫 버섯 국물을 한 그릇 떠서 국물 본연의 향을 먼저 음미해보세요.',
    themeColor: 'from-emerald-700/25 to-stone-900/40 border-emerald-500/30'
  },
  {
    id: 'shabu',
    name: '정통 샤브샤브 다시마 가쓰오 육수',
    tagline: '원재료의 본연의 맛을 극대화하는 정갈함',
    description: '완도산 다시마와 훈연 가쓰오부시로 깔끔하고 맑게 우려낸 클래식 샤브 육수.',
    recommendSauces: ['폰즈 유자 소스', '고소한 참깨 드레싱', '칠리 마늘 믹스'],
    bestPairings: ['한우 설깃/목심', '숙주나물', '표고버섯', '생칼국수', '죽 재료'],
    proTip: '물이 끓어오를 때 소고기를 한 장씩 펄럭이며 살짝만 익혀 드세요.',
    themeColor: 'from-blue-600/20 to-slate-900/40 border-blue-500/30'
  }
];

export const CURATED_SAUCE_RECIPES: SauceRecipe[] = [
  {
    id: 'keonhee_original',
    name: '원어스 건희 소스 (전설의 하이디라오 1위)',
    subtitle: 'SNS를 뒤흔든 하이디라오 공식 인증 황금 비율',
    originType: 'haidilao',
    originLabel: '하이디라오 시그니처',
    badge: '인기 1위',
    imageUrl: imgGunhee,
    visualDescription: '달콤한 스위트칠리와 고소한 즈마장이 블렌딩된 윤기 흐르는 주황빛 소스 위에 다진 마늘과 파, 고소한 땅콩 분태가 듬뿍 얹어진 비주얼',
    broths: ['mala', 'tomato', 'clear', 'mushroom'],
    flavor: { nutty: 5, spicy: 3, savory: 5, mala: 2, sweet: 4, tangy: 1 },
    ingredients: [
      { ingredientId: 'sweet_chili', name: '스위트칠리 소스', amount: '2.5 스푼', spoons: 2.5, tip: '달콤매콤의 중심' },
      { ingredientId: 'zhmajang', name: '즈마장(땅콩참깨소스)', amount: '1 스푼', spoons: 1, tip: '고소한 밸런스' },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'scallion', name: '다진 파', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'chili_oil', name: '고추기름', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'peanut_powder', name: '땅콩 가루', amount: '1 스푼', spoons: 1, tip: '바삭하고 고소한 식감' },
      { ingredientId: 'beef_sauce', name: '소고기 볶음소스', amount: '반 스푼', spoons: 0.5, tip: '감칠맛 폭발' },
      { ingredientId: 'sugar', name: '설탕', amount: '0.3 스푼', spoons: 0.3 },
      { ingredientId: 'sesame_seed', name: '볶은 참깨', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'chili_powder', name: '고춧가루', amount: '반 스푼', spoons: 0.5 }
    ],
    proTip: '잘 저어준 뒤 고기, 완자, 분모자 가리지 않고 듬뿍 찍어 드세요. 실패가 없는 만능 소스입니다!',
    recommendPairing: '소고기 차돌박이, 새우완자, 분모자, 토마토탕'
  },
  {
    id: 'chongqing_garlic_oil',
    name: '충칭식 참기름 마늘 홍탕킬러 소스',
    subtitle: '사천 훠궈 골목의 100년 전통 위장 보호 소스',
    originType: 'traditional',
    originLabel: '사천 전통식',
    badge: '마라탕/홍탕 필수',
    imageUrl: imgOilGarlic,
    visualDescription: '황금빛 순수 참기름 베이스에 알싸하게 빻은 생마늘과 송송 썬 청양고추, 파가 듬뿍 담긴 사천 정통 기름장',
    broths: ['mala'],
    flavor: { nutty: 4, spicy: 2, savory: 4, mala: 1, sweet: 1, tangy: 2 },
    ingredients: [
      { ingredientId: 'sesame_oil', name: '참기름', amount: '3 스푼', spoons: 3, tip: '기름을 듬뿍 넣어야 위장이 보호됩니다' },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '1.5 스푼', spoons: 1.5, tip: '마늘 풍미 극대화' },
      { ingredientId: 'scallion', name: '다진 파', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'oyster_sauce', name: '굴소스', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'black_vinegar', name: '중국 흑식초(진초)', amount: '1 티스푼', spoons: 0.3, tip: '기름진 맛 싹 잡아줌' },
      { ingredientId: 'salt', name: '소금 / 조미료', amount: '한 꼬집', spoons: 0.1 },
      { ingredientId: 'coriander', name: '고수 (취향껏)', amount: '1 스푼', spoons: 1 }
    ],
    proTip: '팔펄 끓는 마라 홍탕에서 건진 뜨거운 고기와 천엽을 참기름 소스에 푹 담그면 온도가 즉시 식으면서 고소함이 폭발합니다.',
    recommendPairing: '소 천엽(마오두), 오리창자, 마라 홍탕 소고기'
  },
  {
    id: 'classic_zhmajang_beijing',
    name: '정통 북경식 황금 즈마장 소스',
    subtitle: '진득하고 녹진한 고소함의 절대강자',
    originType: 'traditional',
    originLabel: '북경 둥라이순 스타일',
    badge: '양고기 찰떡궁합',
    imageUrl: imgZhmajang,
    visualDescription: '볶은 참깨와 땅콩을 곱게 갈아 만든 걸쭉하고 크리미한 베이지색 즈마장에 신선한 고수와 땅콩 가루가 곁들여진 전통 비주얼',
    broths: ['clear', 'mala', 'mushroom'],
    flavor: { nutty: 5, spicy: 1, savory: 4, mala: 0, sweet: 2, tangy: 1 },
    ingredients: [
      { ingredientId: 'zhmajang', name: '즈마장(참깨땅콩장)', amount: '2 스푼', spoons: 2, tip: '묵직한 베이스' },
      { ingredientId: 'furu', name: '삭힌 홍두부(푸루)', amount: '1 티스푼', spoons: 0.3, tip: '짭조름한 깊은 감칠맛' },
      { ingredientId: 'leek_flower', name: '부추꽃장(지우차이화)', amount: '반 스푼', spoons: 0.5, tip: '북경식 정통의 킥' },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'sesame_oil', name: '참기름', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'sugar', name: '설탕', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'coriander', name: '다진 고수/파', amount: '1 스푼', spoons: 1 }
    ],
    proTip: '너무 뻑뻑하면 맑은 백탕 육수를 1숟가락 넣어서 부드럽게 풀어서 저어주세요.',
    recommendPairing: '양고기 슬라이스, 배추, 언두부'
  },
  {
    id: 'korean_chili_garlic',
    name: '한국인 입맛 맞춤 K-칠리 마늘 소스',
    subtitle: '느끼함 제로! 매콤달콤 알싸한 마늘 폭탄',
    originType: 'k-style',
    originLabel: '한국인 픽',
    badge: '대중적 호불호 제로',
    imageUrl: imgGunhee,
    visualDescription: '붉은 스위트칠리에 칼칼한 청양고추와 다진 마늘, 볶은 참깨가 어우러진 한국식 매콤달콤 소스',
    broths: ['tomato', 'mala', 'clear', 'shabu'],
    flavor: { nutty: 2, spicy: 4, savory: 4, mala: 1, sweet: 4, tangy: 2 },
    ingredients: [
      { ingredientId: 'sweet_chili', name: '스위트 칠리소스', amount: '2 스푼', spoons: 2 },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '1 스푼', spoons: 1, tip: '한국인의 마늘 양' },
      { ingredientId: 'hot_pepper', name: '청양고추 다진 것', amount: '1 스푼', spoons: 1, tip: '칼칼한 끝맛' },
      { ingredientId: 'soy_sauce', name: '해선간장', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'peanut_powder', name: '땅콩 분태', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'lemon_juice', name: '레몬즙 / 식초', amount: '0.3 스푼', spoons: 0.3 }
    ],
    proTip: '훠궈 향신료가 낯선 입문자에게 가장 먼저 추천하는 안전하고 맛있는 소스입니다.',
    recommendPairing: '우삼겹, 소고기 목심, 어묵완자, 유부'
  },
  {
    id: 'citrus_soy_shabu',
    name: '상큼 해물 특제 폰즈 간장 소스',
    subtitle: '해산물과 샤브샤브의 담백함을 살려주는 깔끔함',
    originType: 'rotary',
    originLabel: '회전샤브 & 해물',
    badge: '해산물/야채 특화',
    imageUrl: imgPonzu,
    visualDescription: '맑은 간장에 레몬 슬라이스와 쪽파, 다진 고추를 띄워 산뜻하고 개운한 일식 샤브 스타일',
    broths: ['shabu', 'clear', 'mushroom'],
    flavor: { nutty: 1, spicy: 2, savory: 4, mala: 0, sweet: 2, tangy: 5 },
    ingredients: [
      { ingredientId: 'soy_sauce', name: '해선간장(샤브간장)', amount: '2.5 스푼', spoons: 2.5 },
      { ingredientId: 'black_vinegar', name: '식초 / 레몬즙', amount: '1.5 스푼', spoons: 1.5, tip: '상큼함 폭발' },
      { ingredientId: 'scallion', name: '다진 파', amount: '1.5 스푼', spoons: 1.5 },
      { ingredientId: 'hot_pepper', name: '다진 청양고추', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'wasabi', name: '와사비', amount: '1 티스푼', spoons: 0.2 }
    ],
    proTip: '오징어, 새우, 조개 등 해산물이나 숙주, 알배추를 찍어 먹으면 비린내 없이 끝없이 들어갑니다.',
    recommendPairing: '새우, 관자, 주꾸미, 소고기 샤브샤브, 버섯'
  },
  {
    id: 'mala_fire_bomb',
    name: '마라 화자오 고추폭탄 소스',
    subtitle: '사천 현지의 혓바닥이 마비되는 얼얼한 매운맛',
    originType: 'traditional',
    originLabel: '사천 익스트림',
    badge: '맵고수 전용',
    imageUrl: imgOilGarlic,
    visualDescription: '진한 붉은 고추기름과 얼얼한 화자오유(마유)에 다진 마늘과 고춧가루가 듬뿍 들어간 강렬한 붉은빛',
    broths: ['mala'],
    flavor: { nutty: 2, spicy: 5, savory: 4, mala: 5, sweet: 1, tangy: 1 },
    ingredients: [
      { ingredientId: 'chili_oil', name: '고추기름', amount: '2 스푼', spoons: 2 },
      { ingredientId: 'huajiao_oil', name: '화자오유(마유)', amount: '1 스푼', spoons: 1, tip: '얼얼함의 끝' },
      { ingredientId: 'hot_pepper', name: '태국고추/청양고추', amount: '1.5 스푼', spoons: 1.5 },
      { ingredientId: 'chili_powder', name: '고춧가루', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'soy_sauce', name: '간장', amount: '1 스푼', spoons: 1 }
    ],
    proTip: '마유(화자오유)는 혀가 얼얼해지는 특유의 마(麻)한 맛을 내므로 한 방울씩 취향껏 추가하세요.',
    recommendPairing: '소곱창, 소양, 깐양, 목이버섯, 분모자'
  },
  {
    id: 'creamy_sesame_nutty',
    name: '스위트 크리미 참깨 소스 (샤브집 스타일)',
    subtitle: '고소하고 달콤 부드러운 일식 샤브 & 마라탕 조합',
    originType: 'rotary',
    originLabel: '회전훠궈 인기',
    badge: '아이들도 좋아하는 맛',
    imageUrl: imgZhmajang,
    visualDescription: '부드럽고 크리미한 참깨 마요 베이스에 고소한 땅콩가루와 볶은 통깨가 소복이 올라간 비주얼',
    broths: ['shabu', 'clear', 'tomato'],
    flavor: { nutty: 5, spicy: 0, savory: 3, mala: 0, sweet: 4, tangy: 2 },
    ingredients: [
      { ingredientId: 'zhmajang', name: '참깨 드레싱 / 즈마장', amount: '2 스푼', spoons: 2 },
      { ingredientId: 'peanut_powder', name: '땅콩가루', amount: '1.5 스푼', spoons: 1.5 },
      { ingredientId: 'mayo', name: '마요네즈', amount: '반 스푼', spoons: 0.5, tip: '극상의 크리미함' },
      { ingredientId: 'sugar', name: '설탕 또는 올리고당', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'sesame_seed', name: '볶은 깨', amount: '1 스푼', spoons: 1 }
    ],
    proTip: '마라탕 국물이 너무 매울 때 찍어 먹으면 매운맛을 즉각 중화해 주는 꿀조합입니다.',
    recommendPairing: '돼지고기 샤브, 떡, 고구마당면, 마라탕'
  },
  {
    id: 'coriander_lover',
    name: '고수 러버 전용 프레시 허브 소스',
    subtitle: '고수의 은은한 풍미와 오일이 어우러진 산뜻한 맛',
    originType: 'haidilao',
    originLabel: '하이디라오 매니아',
    badge: '고수파 극찬',
    imageUrl: imgPonzu,
    visualDescription: '신선한 초록빛 다진 고수가 듬뿍 올라간 향긋하고 산뜻한 허브 간장 소스',
    broths: ['clear', 'mushroom', 'mala'],
    flavor: { nutty: 3, spicy: 2, savory: 4, mala: 1, sweet: 1, tangy: 3 },
    ingredients: [
      { ingredientId: 'coriander', name: '다진 고수', amount: '3 스푼', spoons: 3, tip: '아끼지 말고 듬뿍' },
      { ingredientId: 'garlic', name: '다진 마늘', amount: '1 스푼', spoons: 1 },
      { ingredientId: 'sesame_oil', name: '참기름', amount: '1.5 스푼', spoons: 1.5 },
      { ingredientId: 'soy_sauce', name: '해선간장', amount: '1.5 스푼', spoons: 1.5 },
      { ingredientId: 'black_vinegar', name: '식초', amount: '반 스푼', spoons: 0.5 },
      { ingredientId: 'sesame_seed', name: '볶은 참깨', amount: '반 스푼', spoons: 0.5 }
    ],
    proTip: '고수 잎이 기름과 간장에 절여지면서 씁쓸함이 줄어들고 향긋함만 남습니다.',
    recommendPairing: '소고기 슬라이스, 표고버섯, 배추'
  }
];

export const AVAILABLE_INGREDIENTS: AvailableIngredient[] = [
  // 베이스
  {
    id: 'zhmajang',
    name: '즈마장 (참깨·땅콩장)',
    shortName: '즈마장',
    category: 'base',
    categoryLabel: '베이스',
    color: 'bg-amber-800/40 text-amber-200 border-amber-600/40',
    flavorImpact: { nutty: 4, savory: 2 },
    appearance: '걸쭉하고 녹진한 베이지·황토색 크림장',
    description: '볶은 참깨와 볶은 땅콩을 맷돌처럼 곱게 갈아 만든 중국 훠궈의 절대적인 베이스 소스입니다.',
    usageTip: '1~2스푼을 담아 베이스로 잡고, 너무 뻑뻑할 때는 맑은 육수를 반 스푼 넣어 부드럽게 풀어주세요.'
  },
  {
    id: 'sweet_chili',
    name: '스위트칠리 소스',
    shortName: '스위트칠리',
    category: 'base',
    categoryLabel: '베이스',
    color: 'bg-red-800/40 text-red-200 border-red-600/40',
    flavorImpact: { sweet: 3, spicy: 2, tangy: 1 },
    appearance: '반투명한 주황빛에 붉은 고추 조각이 콕콕 박힌 달콤한 소스',
    description: '달콤함과 은은한 매콤함이 어우러져 하이디라오 ‘건희 소스’의 황금비율을 만들어내는 핵심 재료입니다.',
    usageTip: '즈마장과 2:1 또는 2.5:1 비율로 섞으면 매콤달콤 고소한 불패의 맛이 탄생합니다.'
  },
  {
    id: 'soy_sauce',
    name: '해선간장 (샤브 특제간장)',
    shortName: '해선간장',
    category: 'base',
    categoryLabel: '베이스',
    color: 'bg-stone-800/40 text-stone-200 border-stone-600/40',
    flavorImpact: { savory: 4, tangy: 1 },
    appearance: '맑고 윤기 흐르는 짙은 갈색 액상 간장',
    description: '일반 양조간장보다 덜 짜고 은은한 단맛과 해산물 감칠맛이 가미된 훠궈·샤브샤브 전용 맛간장입니다.',
    usageTip: '흑식초, 다진 파, 청양고추와 섞어 해산물이나 담백한 소고기를 찍어 드세요.'
  },
  {
    id: 'beef_sauce',
    name: '소고기 볶음소스 (우육장)',
    shortName: '우육장(소고기장)',
    category: 'base',
    categoryLabel: '베이스',
    color: 'bg-amber-950/50 text-amber-100 border-amber-700/40',
    flavorImpact: { savory: 4, spicy: 1, sweet: 1 },
    appearance: '다진 소고기 알갱이가 고추기름에 볶아진 붉은 갈색 만능장',
    description: '하이디라오 셀프바의 명물로, 잘게 다진 소고기와 향신채를 기름에 볶아 진한 감칠맛과 씹는 맛을 줍니다.',
    usageTip: '토마토탕 국물을 소고기 소스+파가 담긴 그릇에 부어 애피타이저 수프로 즐기면 극락입니다.'
  },
  
  // 오일류
  {
    id: 'sesame_oil',
    name: '순수 참기름',
    shortName: '참기름',
    category: 'oil',
    categoryLabel: '오일 & 유지',
    color: 'bg-yellow-800/40 text-yellow-200 border-yellow-600/40',
    flavorImpact: { nutty: 3, savory: 1 },
    appearance: '맑고 맑은 황금빛 고소한 기름',
    description: '사천 훠궈에서 가장 중요한 위장 보호제입니다. 끓는 홍탕에서 건진 재료의 온도를 낮추고 캡사이신을 감쌉니다.',
    usageTip: '그릇 바닥에 2~3스푼 듬뿍 붓고 다진 마늘 1스푼을 섞는 것이 사천 정통 기름장(유접)의 정석입니다.'
  },
  {
    id: 'chili_oil',
    name: '고추기름 (라유)',
    shortName: '고추기름',
    category: 'oil',
    categoryLabel: '오일 & 유지',
    color: 'bg-rose-800/40 text-rose-200 border-rose-600/40',
    flavorImpact: { spicy: 4 },
    appearance: '선명하고 붉은빛의 매콤한 향미유',
    description: '고춧가루와 향신료를 달군 기름에 우려내어 칼칼하고 깔끔한 매운 풍미를 돋웁니다.',
    usageTip: '소스에 붉은 윤기와 칼칼함을 얹고 싶을 때 1스푼 추가하세요.'
  },
  {
    id: 'huajiao_oil',
    name: '화자오유 (얼얼한 마유)',
    shortName: '화자오유(마유)',
    category: 'oil',
    categoryLabel: '오일 & 유지',
    color: 'bg-orange-800/40 text-orange-200 border-orange-600/40',
    flavorImpact: { mala: 5, spicy: 2 },
    appearance: '연한 황록색 또는 맑은 주황빛의 찌릿한 산초 기름',
    description: '사천 화자오(초피/산초)를 우려낸 오일로, 입안이 찌릿찌릿 마비되는 특유의 마(麻)한 맛의 원천입니다.',
    usageTip: '소량으로도 혓바닥이 마비되므로, 처음에는 서너 방울 또는 반 티스푼부터 시작하세요.'
  },
  
  // 신선 야채/향신채
  {
    id: 'garlic',
    name: '다진 마늘',
    shortName: '다진 마늘',
    category: 'fresh',
    categoryLabel: '신선 채소/허브',
    color: 'bg-lime-900/40 text-lime-200 border-lime-600/40',
    flavorImpact: { spicy: 2, savory: 2 },
    appearance: '촉촉하게 곱게 빻은 크림빛 생마늘',
    description: '한국인에게 절대 빠질 수 없는 소스의 뼈대. 잡내를 없애고 알싸한 감칠맛을 폭발시킵니다.',
    usageTip: '어떤 소스든 기본 반 스푼에서 1스푼은 넣어주는 것이 한국인 입맛에 가장 잘 맞습니다.'
  },
  {
    id: 'scallion',
    name: '송송 썬 대파·쪽파',
    shortName: '대파·쪽파',
    category: 'fresh',
    categoryLabel: '신선 채소/허브',
    color: 'bg-emerald-900/40 text-emerald-200 border-emerald-600/40',
    flavorImpact: { savory: 1, tangy: 1 },
    appearance: '송송 썰어놓은 아삭하고 신선한 초록·흰빛 대파',
    description: '신선한 채즙과 파 향으로 소스의 기름진 맛을 산뜻하게 중화해 줍니다.',
    usageTip: '소스 맨 위에 소복이 올려 고기와 함께 듬뿍 집어 드세요.'
  },
  {
    id: 'coriander',
    name: '다진 고수 (샹차이)',
    shortName: '고수(샹차이)',
    category: 'fresh',
    categoryLabel: '신선 채소/허브',
    color: 'bg-green-900/40 text-green-200 border-green-600/40',
    flavorImpact: { tangy: 2 },
    appearance: '잘게 다진 싱그러운 초록빛 고수 잎과 줄기',
    description: '중국 본토 훠궈의 화룡점정. 특유의 상쾌하고 이국적인 허브 향이 고기의 풍미를 극대화합니다.',
    usageTip: '고수 초보자는 반 숟갈부터, 마니아는 2스푼 이상 듬뿍 넣어 비벼 드세요.'
  },
  {
    id: 'hot_pepper',
    name: '다진 청양고추 / 베트남고추',
    shortName: '청양고추',
    category: 'fresh',
    categoryLabel: '신선 채소/허브',
    color: 'bg-red-900/40 text-red-200 border-red-600/40',
    flavorImpact: { spicy: 5 },
    appearance: '송송 다진 매콤한 초록·붉은 생고추',
    description: '느끼함을 단번에 날려버리는 칼칼한 생고추의 매운맛입니다.',
    usageTip: '해선간장이나 즈마장에 1스푼 넣으면 뒷맛이 깔끔하게 떨어집니다.'
  },
  
  // 감칠맛/장류
  {
    id: 'oyster_sauce',
    name: '굴소스',
    shortName: '굴소스',
    category: 'sauce',
    categoryLabel: '양념 & 조미',
    color: 'bg-stone-900/50 text-stone-200 border-stone-600/40',
    flavorImpact: { savory: 4, sweet: 1 },
    appearance: '진득하고 윤기 흐르는 짙은 암갈색 농축 소스',
    description: '굴을 농축 발효하여 깊은 감칠맛과 은은한 단맛을 품은 소스의 밸런서입니다.',
    usageTip: '반 스푼 정도 넣으면 소스 전체에 입체적인 감칠맛이 살아납니다.'
  },
  {
    id: 'black_vinegar',
    name: '중국 흑식초 (진초·천추)',
    shortName: '흑식초',
    category: 'sauce',
    categoryLabel: '양념 & 조미',
    color: 'bg-zinc-800/40 text-zinc-200 border-zinc-600/40',
    flavorImpact: { tangy: 4 },
    appearance: '커피처럼 짙은 흑갈색의 훈연 발효 식초',
    description: '수수를 발효해 깊은 훈연향과 부드러운 산미를 지닌 중국 전통 식초로 일반 사과식초보다 덜 찌르고 풍미가 깊습니다.',
    usageTip: '마라 홍탕 소스나 만두, 당면을 먹을 때 1티스푼 넣으면 기름진 맛이 사라집니다.'
  },
  {
    id: 'sugar',
    name: '백설탕',
    shortName: '설탕',
    category: 'sauce',
    categoryLabel: '양념 & 조미',
    color: 'bg-slate-700/40 text-slate-200 border-slate-500/40',
    flavorImpact: { sweet: 4 },
    appearance: '반짝이는 고운 흰색 당 결정',
    description: '짠맛과 매운맛의 날카로운 모서리를 둥글게 깎아 조화롭게 묶어주는 마법의 조미료입니다.',
    usageTip: '0.3~0.5스푼 살짝 넣어주면 매운 소스도 맛이 한층 고급스러워집니다.'
  },
  {
    id: 'furu',
    name: '삭힌 홍두부 (푸루 腐乳)',
    shortName: '홍두부(푸루)',
    category: 'sauce',
    categoryLabel: '양념 & 조미',
    color: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
    flavorImpact: { savory: 4, nutty: 1 },
    appearance: '붉은 누룩에 삭힌 크리미한 붉은 큐브 형태의 발효 두부장',
    description: '‘중국의 블루치즈’라 불리며, 짭조름하고 녹진한 깊은 발효 풍미로 양고기 훠궈에 필수적인 식재료입니다.',
    usageTip: '1티스푼을 즈마장에 넣고 으깨어 섞으면 전문 셰프의 깊은 맛이 납니다.'
  },
  {
    id: 'leek_flower',
    name: '부추꽃장 (지우차이화 韭菜花)',
    shortName: '부추꽃장',
    category: 'sauce',
    categoryLabel: '양념 & 조미',
    color: 'bg-teal-900/40 text-teal-200 border-teal-600/40',
    flavorImpact: { savory: 3, tangy: 1 },
    appearance: '올리브빛 은은한 초록색 페이스트',
    description: '부추의 어린 꽃봉오리를 소금에 절여 만든 북경식 정통 소스로 짭조름하면서도 부추 특유의 상쾌한 감칠맛이 있습니다.',
    usageTip: '정통 북경식 즈마장 소스에 반 스푼 넣으면 양고기 누린내를 완벽히 잡아줍니다.'
  },
  
  // 토핑/크런치
  {
    id: 'peanut_powder',
    name: '볶은 땅콩가루 (분태)',
    shortName: '땅콩가루',
    category: 'topping',
    categoryLabel: '토핑 & 크런치',
    color: 'bg-amber-700/40 text-amber-100 border-amber-500/40',
    flavorImpact: { nutty: 4 },
    appearance: '거칠게 빻아 고소한 황금빛 땅콩 가루',
    description: '소스에 바삭바삭 씹히는 크런치한 식감과 극강의 고소함을 더해줍니다.',
    usageTip: '1~2스푼 넉넉히 넣어 고기를 찍을 때 땅콩 분태가 듬뿍 묻어나오게 하세요.'
  },
  {
    id: 'sesame_seed',
    name: '볶은 통참깨',
    shortName: '통참깨',
    category: 'topping',
    categoryLabel: '토핑 & 크런치',
    color: 'bg-yellow-700/40 text-yellow-100 border-yellow-500/40',
    flavorImpact: { nutty: 3 },
    appearance: '노릇노릇 잘 볶아진 고소한 통깨',
    description: '톡톡 터지는 고소한 향미로 소스의 비주얼과 마무리 향을 완성합니다.',
    usageTip: '소스 표면에 반 스푼 흩뿌려 마무리하세요.'
  },
  {
    id: 'chili_powder',
    name: '고춧가루',
    shortName: '고춧가루',
    category: 'topping',
    categoryLabel: '토핑 & 크런치',
    color: 'bg-red-700/40 text-red-100 border-red-500/40',
    flavorImpact: { spicy: 4 },
    appearance: '입자가 고운 선명한 붉은 고춧가루',
    description: '기름 소스나 즈마장에 섞여 묵직하고 은은하게 퍼지는 한국식 칼칼함을 담당합니다.',
    usageTip: '매콤함을 좋아하는 분은 반 스푼 넣어 색감과 칼칼함을 살려보세요.'
  }
];

export const INGREDIENT_COOKING_GUIDE: IngredientItem[] = [
  {
    id: 'beef_thin',
    name: '차돌박이 / 우삼겹 / 소고기 슬라이스',
    shortName: '차돌박이·소고기',
    category: 'meat',
    cookTimeSeconds: 15,
    cookTimeLabel: '10 ~ 15초',
    quickTip: '칠상팔하(七上八下)! 붉은 기가 사라지면 즉시 건지기',
    proGuide: '고기를 젓가락으로 잡고 끓는 육수에 7~8번 살랑살랑 흔들어 익힙니다. 너무 오래 담가두면 단백질이 수축하여 퍽퍽해집니다.',
    warning: '국물 속에 방치하면 질겨지고 고기의 육즙이 전부 빠져나갑니다.'
  },
  {
    id: 'lamb_slice',
    name: '양고기 슬라이스 (롤 양고기)',
    shortName: '양고기 슬라이스',
    category: 'meat',
    cookTimeSeconds: 20,
    cookTimeLabel: '15 ~ 20초',
    quickTip: '즈마장 소스 또는 마라 홍탕과 환상의 찰떡궁합',
    proGuide: '양고기 특유의 풍미는 즈마장(땅콩참깨소스)이나 삭힌 홍두부(푸루)와 만났을 때 감칠맛이 극대화됩니다.',
  },
  {
    id: 'beef_tripe',
    name: '소 천엽 (마오두 毛肚)',
    shortName: '소 천엽(마오두)',
    category: 'meat',
    cookTimeSeconds: 7,
    cookTimeLabel: '7초의 미학',
    quickTip: '정확히 7초! 8초 넘어가면 타이어처럼 질겨짐',
    proGuide: '사천 훠궈의 주인공입니다. 젓가락을 놓지 말고 끓는 홍탕 가장자리에서 7초간 흔들어 오독오독 씹히는 식감을 즐기세요. 참기름 마늘 소스에 푹 찍어 먹는 것이 정석!',
    warning: '냄비에 풀어놓고 잊어버리면 절대 안 됩니다.'
  },
  {
    id: 'duck_intestine',
    name: '오리 창자 (야창 鸭肠)',
    shortName: '오리 창자(야창)',
    category: 'meat',
    cookTimeSeconds: 12,
    cookTimeLabel: '10 ~ 15초',
    quickTip: '꼬들꼬들 쫄깃한 식감의 절정',
    proGuide: '끓는 국물에 살짝 넣었다 뺐다를 반복하여 살짝 오그라들 때 건져냅니다. 아삭한 콩나물이나 배추와 함께 싸먹으면 일품입니다.'
  },
  {
    id: 'shrimp_paste',
    name: '새우 완자 (샤화 虾滑)',
    shortName: '새우 완자(샤화)',
    category: 'seafood',
    cookTimeSeconds: 180,
    cookTimeLabel: '2 ~ 3분',
    quickTip: '국물 위로 동동 떠오르면 완벽하게 익은 신호!',
    proGuide: '숟가락에 참기름을 살짝 묻힌 후 한입 크기로 떼어 넣거나, 짤주머니로 유부 주머니 속에 짜넣어 익히면 극락의 맛입니다.',
  },
  {
    id: 'fried_tofu_skin',
    name: '튀긴 롤 유부 (링롱롤 / 샹링주안 响铃卷)',
    shortName: '튀긴 롤 유부',
    category: 'tofu',
    cookTimeSeconds: 3,
    cookTimeLabel: '단 3초!',
    quickTip: '국물에 3초만 담갔다 빼서 겉바속촉 즐기기',
    proGuide: '홍탕이나 토마토탕에 단 3초만 퐁당 담갔다 꺼내면 겉은 바삭함이 남아있고 속은 국물을 가득 머금어 한입 베어 물 때 육즙이 팡 터집니다.'
  },
  {
    id: 'fuzhu_tofu',
    name: '푸주 & 건두부 & 포두부',
    shortName: '푸주·포두부',
    category: 'tofu',
    cookTimeSeconds: 120,
    cookTimeLabel: '2분',
    quickTip: '말랑하게 풀어지면서 육수가 스며들 때가 타이밍',
    proGuide: '푸주는 콩 단백질의 농축체로 국물의 풍미를 진하게 흡수합니다. 식감이 쫄깃해질 때까지 2분가량 푹 끓여주세요.'
  },
  {
    id: 'fen_mo_ja',
    name: '분모자 당면 & 뉴진면',
    shortName: '분모자·뉴진면',
    category: 'noodle',
    cookTimeSeconds: 180,
    cookTimeLabel: '3 ~ 4분',
    quickTip: '불투명한 흰색에서 반투명하고 말랑해질 때 건지기',
    proGuide: '가래떡처럼 쫀득한 분모자는 토마토탕이나 마라 홍탕에 푹 졸여 건희 소스에 찍어 먹으면 쫀득한 젤리 같은 환상의 식감을 선사합니다.',
    warning: '바닥에 눌어붙지 않도록 가끔 저어주세요.'
  },
  {
    id: 'chinese_glass_noodle',
    name: '중국 넓적당면 (콴펀)',
    shortName: '중국 넓적당면',
    category: 'noodle',
    cookTimeSeconds: 240,
    cookTimeLabel: '3 ~ 4분',
    quickTip: '투명해지고 미끄러지듯 유연해지면 섭취',
    proGuide: '전분 성분이 국물을 탁하게 만들 수 있으므로 가급적 고기와 채소를 다 즐긴 식사 후반부에 넣는 것이 맑은 국물을 유지하는 비결입니다.'
  },
  {
    id: 'napa_cabbage',
    name: '알배추 & 청경채 & 숙주',
    shortName: '알배추·청경채',
    category: 'veg',
    cookTimeSeconds: 60,
    cookTimeLabel: '40 ~ 60초',
    quickTip: '식사 초반에 넣어 천연 채수 우려내기',
    proGuide: '배추의 심지 부분은 처음에 넣어 국물에 자연스러운 단맛을 더하고, 잎사귀는 살짝 아삭할 때 건져내어 고기와 함께 싸서 드세요.'
  },
  {
    id: 'enoki_woodear',
    name: '팽이버섯 & 목이버섯',
    shortName: '팽이버섯·목이버섯',
    category: 'veg',
    cookTimeSeconds: 90,
    cookTimeLabel: '1분 ~ 1분 30초',
    quickTip: '국물 흡수력 1등! 차돌박이로 감싸 먹기',
    proGuide: '팽이버섯을 얇은 차돌박이로 돌돌 말아 꼬치처럼 익혀 먹는 레시피는 모든 훠궈 매니아들이 극찬하는 필승 조합입니다.'
  }
];

export const SECRET_HACKS: SecretHack[] = [
  {
    id: 'hack_tofu_shrimp',
    title: '유부 주머니 새우완자 폭탄',
    tag: '하이디라오 인기 1위',
    place: '하이디라오',
    summary: '네모 유부 속에 생 새우 완자를 꽉 채워 끓이는 궁극의 겉촉속탱 꿀팁',
    steps: [
      '소스 바에서 네모 유부와 새우완자(샤화)를 주문합니다.',
      '젓가락으로 유부 한쪽 면에 구멍을 살짝 뚫어 공간을 만듭니다.',
      '새우완자 튜브 입구를 유부 속에 넣고 80% 정도 빵빵하게 짜넣습니다.',
      '토마토탕 또는 홍탕에 넣고 3분간 끓인 뒤 건희 소스에 찍어 먹습니다.'
    ],
    chefTip: '유부가 국물을 스펀지처럼 빨아들이고 속의 새우가 탱글탱글하게 씹혀 황홀한 육즙을 자랑합니다!'
  },
  {
    id: 'hack_tomato_egg_risotto',
    title: '토마토탕 마법의 계란죽 / 리조또',
    tag: '식사 마무리 필수',
    place: '하이디라오',
    summary: '남은 토마토탕 육수로 만드는 고급 양식 부럽지 않은 토마토 계란죽',
    steps: [
      '고기와 재료를 다 먹고 남은 토마토탕을 약불로 줄입니다.',
      '건더기를 깨끗이 건져내고, 국물 3~4국자 정도만 남깁니다.',
      '공깃밥 1개를 넣고 주걱으로 으깨며 자작해질 때까지 2분간 저어줍니다.',
      '날달걀 2개를 풀어서 빙 두르고, 소스바에서 가져온 소고기소스 1스푼과 다진 파를 얹어 1분간 뜸을 들입니다.'
    ],
    chefTip: '치즈가 있다면 치즈를 한 장 얹어보세요. 웬만한 토마토 리조또보다 감칠맛이 진합니다.'
  },
  {
    id: 'hack_beef_enoki_roll',
    title: '차돌박이 팽이버섯 롤 & 깻잎 쌈',
    tag: '초간단 식감 천재',
    place: '집/밀키트',
    summary: '팽이버섯의 오독오독함과 차돌박이의 기름진 고소함의 완벽한 조화',
    steps: [
      '접시에 얇은 차돌박이나 우삼겹을 길게 펼칩니다.',
      '팽이버섯 한 줌(취향에 따라 깻잎 반 장 추가)을 고기 위에 올립니다.',
      '돌돌 말아서 끝부분이 풀리지 않도록 젓가락으로 잡습니다.',
      '끓는 홍탕이나 백탕에 넣고 20초간 익혀 한입에 넣습니다.'
    ],
    chefTip: '즈마장 소스나 K-칠리 마늘 소스에 푹 찍어 먹으면 고기만 먹을 때보다 느끼함이 싹 사라집니다.'
  },
  {
    id: 'hack_stomach_protection',
    title: '마라 홍탕 첫 입 위장 코팅 비법',
    tag: '속쓰림 방지',
    place: '회전훠궈',
    summary: '매운 훠궈를 먹고 다음 날 배탈 나지 않는 사천 현지인의 지혜',
    steps: [
      '훠궈 시작 전, 참기름 3스푼 + 다진 마늘 1스푼 소스를 넉넉히 만듭니다.',
      '빈속에 바로 매운 홍탕 국물을 떠먹지 않습니다.',
      '첫 2~3점의 고기는 홍탕에서 건진 후 참기름 소스에 완전히 적셔 먹습니다.',
      '차가운 참기름이 뜨거운 마라 기름의 온도를 낮추고 위벽에 얇은 유막을 형성해 줍니다.'
    ],
    chefTip: '홍탕 국물을 마시고 싶을 때는 백탕 육수를 1:1로 섞어 연하게 마시는 것이 좋습니다.'
  },
  {
    id: 'hack_clear_broth_order',
    title: '국물이 탁해지지 않는 투하 황금 순서',
    tag: '프로 먹방러 룰',
    place: '집/밀키트',
    summary: '전분으로 국물이 텁텁해지는 것을 방지하는 과학적인 순서',
    steps: [
      '1단계 [채수]: 알배추, 무, 대파, 버섯을 먼저 넣어 국물에 자연스러운 채수를 우려냅니다.',
      '2단계 [단백질]: 소고기, 양고기, 해산물을 칠상팔하로 익혀먹으며 고기 육수를 더합니다.',
      '3단계 [식감류]: 완자, 두부, 푸주, 옥수수 등을 여유롭게 익혀 즐깁니다.',
      '4단계 [전분류]: 감자, 연근, 분모자, 당면, 라면/칼국수는 반드시 마지막에 넣습니다!'
    ],
    chefTip: '감자나 당면을 초반에 넣으면 전분이 풀려 국물이 걸쭉해지고 냄비 바닥이 타버립니다.'
  }
];
