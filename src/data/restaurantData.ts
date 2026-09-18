import { RestaurantItem } from '../types/restaurant';

export const POPULAR_HOTPOT_RESTAURANTS: RestaurantItem[] = [
  {
    id: 'hdl_gangnam',
    name: '하이디라오 서초강남점',
    category: 'haidilao',
    categoryLabel: '하이디라오 플래그십',
    rating: 4.8,
    reviewCount: 3840,
    address: '서울특별시 서초구 서초대로77길 54 에이프로스퀘어 2층',
    distanceKm: 0.8,
    lat: 37.5015,
    lng: 127.0255,
    priceRange: '인당 35,000 ~ 55,000원',
    businessHours: '매일 10:00 - 익일 05:00 (심야 영업)',
    phone: '02-534-3668',
    tag: '최고의 서비스 & 쿵푸 수타면 퍼포먼스 & 28종 소스바',
    highlights: ['건희 소스 제조 가능', '쿵푸 수타면 퍼포먼스 쇼', '무료 네일아트 & 키즈룸', '유부 새우완자 지원'],
    signatureMenus: [
      { name: '4색 탕 (홍탕/토마토/백탕/버섯)', price: '25,000원', description: '취향별로 골라먹는 4분할 시그니처 탕 베이스' },
      { name: '특제 쿵푸 수타면 (쇼 포함)', price: '3,900원', description: '테이블 바로 앞에서 춤추며 면을 늘려 탕에 퐁당 넣어주는 시그니처 쇼' },
      { name: '특선 새우완자 (샤화)', price: '9,900원', description: '생새우 100% 탱글한 완자 (유부 주머니 속에 넣어 익혀먹는 꿀팁 필수)' },
      { name: '소 특선 천엽 (마오두)', price: '12,000원', description: '7초의 미학! 칠상팔하로 살짝 데쳐 먹는 사천 훠궈의 정수' }
    ],
    sauceBarFeature: '즈마장, 스위트칠리, 소고기볶음장, 버섯소스, 고수, 참기름, 다진마늘, 파 등 28종 무제한 & 신선한 계절 과일/죽 제공',
    reviews: [
      {
        id: 'r1',
        author: '훠궈러버',
        rating: 5,
        date: '2026.09.12',
        comment: '쿵푸 수타면 시켰는데 K-POP에 맞춰 현란하게 춤추면서 면 뽑아주셔서 분위기 최고였어요! 건희 소스에 토마토탕 조합은 무조건입니다.',
        recommendedSauceOrMenu: '쿵푸 수타면 + 원어스 건희 소스 + 토마토탕'
      },
      {
        id: 'r2',
        author: '마라킬러',
        rating: 5,
        date: '2026.09.08',
        comment: '참기름 마늘장 듬뿍 만들어서 천엽 7초 데쳐 찍어먹는 맛에 매주 옵니다. 심야까지 영업해서 퇴근하고 오기 좋아요.',
        recommendedSauceOrMenu: '참기름 마늘 홍탕 소스'
      }
    ]
  },
  {
    id: 'rotary_hongdae',
    name: '회전훠궈 샤브앤팟 홍대점',
    category: 'rotary',
    categoryLabel: '회전식 훠궈 전문',
    rating: 4.7,
    reviewCount: 1320,
    address: '서울특별시 마포구 와우산로23길 18 1층',
    distanceKm: 1.4,
    lat: 37.5532,
    lng: 126.9248,
    priceRange: '접시당 1,000 ~ 3,500원 (혼밥 강추)',
    businessHours: '매일 11:30 - 23:00 (라스트오더 22:15)',
    phone: '02-332-7889',
    tag: '1인 1팟 회전식 훠궈 & 컨베이어 벨트 가성비 맛집',
    highlights: ['1인 개별 인덕션 팟', '컨베이어 벨트 신선 식재료', '혼밥 좌석 완비', 'DIY 소스바 무료'],
    signatureMenus: [
      { name: '1인 싱글 마라 & 백탕 냄비', price: '5,000원', description: '혼자서도 두 가지 국물을 즐기는 반반 팟' },
      { name: '컬러 플레이트 식재료 (소고기/완자/분모자)', price: '1,000원 ~ 3,000원', description: '컨베이어 벨트에서 원하는 만큼 골라 집는 회전식' },
      { name: '바삭 링롱롤 (튀긴 유부말이)', price: '2,000원', description: '국물에 3초 담가 먹는 극강의 바삭촉촉 식감' }
    ],
    sauceBarFeature: '14가지 핵심 소스바 (즈마장, 마늘, 고추기름, 폰즈, 청양고추, 땅콩가루, 산초유 등 알찬 구성)',
    reviews: [
      {
        id: 'r3',
        author: '혼밥마스터',
        rating: 5,
        date: '2026.09.15',
        comment: '퇴근길에 혼자 훠궈 먹고 싶을 때 최고예요. 접시 색깔별로 골라먹는 재미가 쏠쏠하고 소스바도 깔끔합니다.',
        recommendedSauceOrMenu: 'K-칠리 마늘 소스 + 분모자'
      }
    ]
  },
  {
    id: 'hdl_myeongdong',
    name: '하이디라오 명동점',
    category: 'haidilao',
    categoryLabel: '하이디라오 지점',
    rating: 4.7,
    reviewCount: 3120,
    address: '서울특별시 중구 남대문로 78 1층',
    distanceKm: 2.3,
    lat: 37.5644,
    lng: 126.9818,
    priceRange: '인당 35,000 ~ 50,000원',
    businessHours: '매일 10:00 - 익일 03:00',
    phone: '02-6361-8260',
    tag: '글로벌 인기 지점 & 넓은 좌석 & 수타면 시연',
    highlights: ['수타면 쇼 상시 진행', '외국인 친화 다국어 태블릿', '완벽한 30종 소스바', '유부새우완자 지원'],
    signatureMenus: [
      { name: '특제 쿵푸 수타면', price: '3,900원', description: '하이디라오 마스터의 찰진 수타면 공연' },
      { name: '청유 마라 홍탕 + 삼계 백탕', price: '18,000원', description: '깊은 맛의 보양 닭 육수와 화끈한 마라탕의 콤비' },
      { name: '우삼겹 & 롤 양고기 모둠', price: '15,000원', description: '신선한 마블링의 훠궈 전용 육류' }
    ],
    sauceBarFeature: '30종 이상의 토핑 및 디저트바, 흑식초, 부추꽃장, 삭힌두부(푸루), 볶은 땅콩 완비',
    reviews: [
      {
        id: 'r5',
        author: '훠궈선생',
        rating: 5,
        date: '2026.09.05',
        comment: '북경식 즈마장에 부추꽃장이랑 삭힌 홍두부 살짝 섞어서 양고기 찍어먹어보세요. 수타면은 토마토탕에 넣으면 최고입니다.',
        recommendedSauceOrMenu: '정통 북경식 황금 즈마장 + 수타면'
      }
    ]
  },
  {
    id: 'rotary_gangnam_pot',
    name: '스시앤팟 회전 샤브샤브 강남역점',
    category: 'rotary',
    categoryLabel: '회전식 훠궈 & 샤브',
    rating: 4.6,
    reviewCount: 980,
    address: '서울특별시 강남구 테헤란로1길 28 지하 1층',
    distanceKm: 0.9,
    lat: 37.4988,
    lng: 127.0282,
    priceRange: '점심 15,900원 / 저녁 22,900원',
    businessHours: '매일 11:00 - 22:00',
    phone: '02-555-1290',
    tag: '레일 위를 달리는 60여 가지 샤브 재료',
    highlights: ['끝없이 돌아가는 회전 레일', '마라탕 / 가쓰오 / 훠궈 육수 선택', '초밥 & 튀김 뷔페 겸비'],
    signatureMenus: [
      { name: '무제한 회전 레일 샤브 코스', price: '22,900원', description: '레일 위의 모든 완자, 고기, 채소를 무한으로' },
      { name: '사천 마라 육수', price: '기본 선택', description: '알싸한 화자오가 들어간 얼큰 훠궈 육수' }
    ],
    sauceBarFeature: '스위트 칠리, 즈마장, 참깨 드레싱, 청양고추, 간장 폰즈',
    reviews: [
      {
        id: 'r6',
        author: '회전러버',
        rating: 4.5,
        date: '2026.09.02',
        comment: '레일에서 먹고 싶은 꼬치랑 완자 쏙쏙 집어먹는 재미가 있어요. 크리미 참깨 소스랑 궁합 짱!',
        recommendedSauceOrMenu: '스위트 크리미 참깨 소스'
      }
    ]
  },
  {
    id: 'shabu_myeongdong',
    name: '채선당 자연한가득 프리미엄 샤브',
    category: 'shabu',
    categoryLabel: '정통 샤브샤브',
    rating: 4.6,
    reviewCount: 1920,
    address: '서울특별시 중구 명동길 26 3층',
    distanceKm: 2.1,
    lat: 37.5636,
    lng: 126.9842,
    priceRange: '평일 17,900원 / 주말 21,900원 (무한리필)',
    businessHours: '매일 11:00 - 21:30',
    phone: '02-778-4500',
    tag: '친환경 무한리필 쌈채소 & 샤브샤브',
    highlights: ['유기농 쌈채소 무제한', '칼국수 & 영양죽 셀프 코너', '라이스페이퍼 월남쌈', '유자 폰즈 소스'],
    signatureMenus: [
      { name: '소고기 샤브샤브 뷔페 코스', price: '18,900원', description: '신선한 소고기와 제철 채소 무제한 제공' },
      { name: '얼큰 버섯 샤브', price: '19,900원', description: '칼칼하고 시원한 한국식 얼큰 육수 샤브' },
      { name: '셀프 날달걀 참기름 영양죽', price: '기본 포함', description: '샤브 국물에 끓이는 고소한 죽' }
    ],
    sauceBarFeature: '유자 칠리소스, 흑임자 참깨 드레싱, 와사비 간장 폰즈, 청양고추 다대기',
    reviews: [
      {
        id: 'r4',
        author: '건강식단',
        rating: 4.5,
        date: '2026.09.10',
        comment: '채소가 정말 신선하고 폰즈 간장 소스에 청양고추 팍팍 넣어서 소고기랑 월남쌈 싸먹으면 끝도 없이 들어갑니다.',
        recommendedSauceOrMenu: '특제 폰즈 간장 + 월남쌈'
      }
    ]
  },
  {
    id: 'shabu_sukyung',
    name: '수경 1인 샤브 & 편백찜',
    category: 'shabu',
    categoryLabel: '1인 샤브샤브',
    rating: 4.8,
    reviewCount: 840,
    address: '서울특별시 강남구 역삼로 180 1층',
    distanceKm: 1.2,
    lat: 37.4942,
    lng: 127.0365,
    priceRange: '13,000 ~ 19,000원 (깔끔한 1인상)',
    businessHours: '평일 11:00 - 21:30 (브레이크타임 15:00-17:00)',
    phone: '02-567-9912',
    tag: '정갈한 편백찜과 맑은 가쓰오 1인 샤브',
    highlights: ['위생적인 개인 냄비', '직접 담근 유자 폰즈', '들깨 칼국수 제공'],
    signatureMenus: [
      { name: '소고기 야채 1인 샤브', price: '13,900원', description: '신선한 10종 야채와 우목심' },
      { name: '편백 해물 샤브 세트', price: '18,900원', description: '편백나무 찜기에서 쪄낸 고기와 샤브샤브' }
    ],
    sauceBarFeature: '수제 유자 폰즈 소스, 칠리소스, 고소한 참깨 들깨 소스',
    reviews: [
      {
        id: 'r7',
        author: '깔끔한점심',
        rating: 5,
        date: '2026.08.29',
        comment: '유자 폰즈 소스가 진짜 상큼해서 고기랑 야채가 질리지 않고 싹 들어갑니다. 매장도 엄청 청결해요.',
        recommendedSauceOrMenu: '상큼 해물 특제 폰즈 간장 소스'
      }
    ]
  }
];
