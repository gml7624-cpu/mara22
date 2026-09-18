import React, { useState } from 'react';
import { SauceRecipe, BrothType } from '../types';
import { Search, Heart, Copy, Check, Sliders, Sparkles, Flame, Soup, Award, Info, ChevronDown, ChevronUp, Play, ExternalLink, Youtube } from 'lucide-react';
import { sound } from '../utils/sound';

import imgGunhee from '../assets/images/sauce_gunhee_bowl_1789708911102.jpg';
import imgZhmajang from '../assets/images/sauce_zhmajang_bowl_1789708924657.jpg';
import imgOilGarlic from '../assets/images/sauce_oil_garlic_1789708937450.jpg';
import imgPonzu from '../assets/images/sauce_ponzu_bowl_1789708958469.jpg';
import imgSauceBarStation from '../assets/images/haidilao_sauce_bar_station_1789709609215.jpg';
import imgSauceIngredientsGuide from '../assets/images/sauce_ingredients_guide_1789709621889.jpg';

interface SauceCatalogProps {
  recipes: SauceRecipe[];
  onLoadIntoDiy: (recipe: SauceRecipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDeleteCustomRecipe?: (id: string) => void;
}

export const SauceCatalog: React.FC<SauceCatalogProps> = ({
  recipes,
  onLoadIntoDiy,
  favorites,
  onToggleFavorite,
  onDeleteCustomRecipe,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBroth, setSelectedBroth] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showVisualGuide, setShowVisualGuide] = useState<boolean>(true);

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      recipe.recommendPairing.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBroth =
      selectedBroth === 'all' ||
      recipe.broths.includes(selectedBroth as BrothType);

    const matchesOrigin =
      selectedOrigin === 'all' || recipe.originType === selectedOrigin;

    return matchesSearch && matchesBroth && matchesOrigin;
  });

  const handleCopy = (recipe: SauceRecipe) => {
    sound.playScoop();
    const ingredientsList = recipe.ingredients
      .map((ing) => `- ${ing.name}: ${ing.amount}`)
      .join('\n');
    const text = `🍲 [${recipe.name}]\n${recipe.subtitle}\n\n[황금 비율 레시피]\n${ingredientsList}\n\n💡 꿀팁: ${recipe.proTip}\n✨ 추천 페어링: ${recipe.recommendPairing}`;
    navigator.clipboard.writeText(text);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBrothBadgeLabel = (type: BrothType) => {
    switch (type) {
      case 'mala':
        return '마라 홍탕';
      case 'clear':
        return '백탕/사골';
      case 'tomato':
        return '토마토탕';
      case 'mushroom':
        return '버섯탕';
      case 'shabu':
        return '샤브샤브';
    }
  };

  return (
    <div className="space-y-8">
      {/* Trendy Editorial Hero Section with Featured YouTube Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-72 h-72 bg-[#FF4A23]/5 rounded-full pointer-events-none blur-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Headline & Key Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold border border-orange-200/80">
              <Award className="w-3.5 h-3.5 text-[#FF4A23]" />
              <span>🔥 SNS & 유튜브 1,000만 뷰 검증 • 훠궈 소스 & 주문 실전 가이드</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              실패율 0% 훠궈 & 샤브<br className="hidden sm:inline" />
              <span className="text-[#FF4A23]"> 황금 배합 레시피</span>와 실전 가이드
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              트위터를 뒤흔든 전설의 <strong>원어스 건희 소스</strong>부터 마라 고수들의 사천 참기름 마늘장, 고소함 폭발 즈마장까지!
              첫 방문자도 당황하지 않도록 <strong>태블릿 주문법・추천 탕 조합・소스 바 배합・가격 꿀팁</strong>을 영상과 함께 완벽 정복해보세요.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 text-zinc-700 font-medium">
                <Flame className="w-3.5 h-3.5 text-[#FF4A23]" />
                <span>검증된 황금 레시피 <strong className="text-[#FF4A23] font-black">{recipes.length}종</strong> 수록</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 text-zinc-700 font-medium">
                <Sliders className="w-3.5 h-3.5 text-amber-600" />
                <span>원클릭 <strong>DIY 소스 바</strong> 비율 커스텀</span>
              </div>
              <div className="flex items-center gap-1.5 bg-orange-50/70 px-3.5 py-2 rounded-xl border border-orange-200/80 text-orange-950 font-medium">
                <Play className="w-3 h-3 text-[#FF4A23] fill-[#FF4A23]" />
                <span>실전 하이디라오 <strong>꿀팁 영상 연동</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Featured YouTube Video Embed Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 rounded-2xl p-3 border border-zinc-800 shadow-lg shadow-zinc-950/15 text-white">
              <div className="flex items-center justify-between px-1.5 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4A23] animate-pulse" />
                  <span className="text-[11px] font-bold text-zinc-200 tracking-wide uppercase flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    추천 실전 가이드 영상
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium border border-zinc-700">
                  총정리 영상
                </span>
              </div>

              {/* Responsive Video Container 16:9 */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/lTQ5Lwo30yM"
                  title="새벽2시 나혼자 하이디라오 총정리! 주문-소스-먹는법-메뉴판-가격"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Info Caption */}
              <div className="px-1.5 pt-2.5 pb-1 space-y-1">
                <div className="text-xs font-bold text-zinc-100 line-clamp-1">
                  새벽2시 나혼자 하이디라오🥢 주문・소스・먹는법 총정리
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>출처: 수코 sookoh</span>
                  <a
                    href="https://youtu.be/lTQ5Lwo30yM?si=5AlJMc0FFbkYsWYQ"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF4A23] hover:text-[#ff6a49] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>YouTube 열기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL SAUCE INGREDIENTS EXPLAINER */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#FF4A23]" />
            <h2 className="text-sm sm:text-base font-bold text-zinc-900">
              “이 소스는 어떤 맛인가요?” 대표 소스 4대 베이스 비주얼 가이드
            </h2>
          </div>
          <button
            onClick={() => setShowVisualGuide(!showVisualGuide)}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-[#FF4A23] transition-colors font-medium cursor-pointer"
          >
            <span>{showVisualGuide ? '가이드 접기' : '가이드 펼치기'}</span>
            {showVisualGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showVisualGuide && (
          <div className="space-y-6 pt-2">
            {/* Sauce Station Real Photo Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-50/80 p-5 sm:p-6 rounded-2xl border border-zinc-200/80">
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-video sm:aspect-4/3 bg-white border border-zinc-200 shadow-xs">
                <img
                  src={imgSauceBarStation}
                  alt="하이디라오 소스 셀프바 실물"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#FF4A23] text-white text-[10px] font-black shadow-xs">
                  매장 소스 바 실물
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4A23]">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>처음 가도 당황하지 않는 하이디라오 소스바 이용 팁</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-zinc-900">
                  어떤 소스를 골라야 할지 모를 땐 4대 기본 조합부터 시작하세요
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  매장 중앙의 소스 바에는 즈마장(참깨땅콩), 스위트칠리, 다진 마늘, 파, 고수, 참기름, 굴소스 등 20여 종이 비치되어 있습니다. 
                  가장 실패 없는 대표 4대 소스 볼의 완성 비주얼과 추천 페어링을 아래에서 확인하세요.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zinc-600">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 font-medium">
                    🥜 즈마장 = 북경식 고소함
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 font-medium">
                    🔥 참기름+마늘 = 사천 정통 위장보호
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 font-medium">
                    ✨ 칠리+즈마장 = 건희 소스
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Key Sauce Bowl Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Gunhee Sauce */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden flex flex-col hover:border-[#FF4A23]/50 transition-colors">
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={imgGunhee}
                    alt="원어스 건희 소스"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#FF4A23] text-white font-black text-[10px] shadow-xs">
                    인기 1위
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">건희 소스 (칠리+즈마장)</h3>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      달콤한 스위트칠리와 고소한 즈마장, 다진 마늘과 땅콩가루가 섞여 호불호 없이 가장 대중적입니다.
                    </p>
                  </div>
                  <span className="text-[10px] text-[#FF4A23] font-semibold block pt-1">
                    추천: 토마토탕, 차돌박이, 새우완자
                  </span>
                </div>
              </div>

              {/* 2. Zhimajiang */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden flex flex-col hover:border-[#FF4A23]/50 transition-colors">
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={imgZhmajang}
                    alt="정통 즈마장 소스"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-600 text-white font-black text-[10px] shadow-xs">
                    고소함 끝판왕
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">정통 즈마장 (참깨·땅콩)</h3>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      볶은 참깨와 땅콩을 곱게 갈아 만든 녹진한 크림장. 북경식 양고기 훠궈의 절대적인 기본 소스입니다.
                    </p>
                  </div>
                  <span className="text-[10px] text-amber-700 font-semibold block pt-1">
                    추천: 양고기, 언두부, 당면
                  </span>
                </div>
              </div>

              {/* 3. Sesame Oil & Garlic */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden flex flex-col hover:border-[#FF4A23]/50 transition-colors">
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={imgOilGarlic}
                    alt="충칭 참기름 마늘장"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-700 text-white font-black text-[10px] shadow-xs">
                    마라 홍탕 필수
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">사천식 참기름 마늘장</h3>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      참기름을 그릇에 듬뿍 붓고 다진 마늘과 굴소스를 넣습니다. 뜨거운 매운맛을 식히고 위장을 보호해 줍니다.
                    </p>
                  </div>
                  <span className="text-[10px] text-red-600 font-semibold block pt-1">
                    추천: 소 천엽(마오두), 오리창자, 홍탕
                  </span>
                </div>
              </div>

              {/* 4. Ponzu Soy */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden flex flex-col hover:border-[#FF4A23]/50 transition-colors">
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={imgPonzu}
                    alt="상큼 폰즈 간장 소스"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] shadow-xs">
                    깔끔·산뜻함
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">상큼 폰즈 특제 간장</h3>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      해선간장에 흑식초나 레몬즙, 다진 쪽파를 곁들인 맑고 청량한 소스로 담백함을 살려줍니다.
                    </p>
                  </div>
                  <span className="text-[10px] text-blue-600 font-semibold block pt-1">
                    추천: 해산물, 새우, 샤브 채소
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 space-y-4 shadow-xs">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="소스 이름, 재료(즈마장, 참기름, 마늘 등), 추천 페어링 검색..."
            className="w-full pl-11 pr-14 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4A23] focus:border-[#FF4A23] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-[#FF4A23] cursor-pointer"
            >
              초기화
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between pt-1">
          {/* Broth Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-zinc-500 font-bold mr-1 shrink-0">육수:</span>
            {[
              { id: 'all', label: '전체' },
              { id: 'mala', label: '홍탕(마라)' },
              { id: 'clear', label: '백탕/사골' },
              { id: 'tomato', label: '토마토탕' },
              { id: 'mushroom', label: '버섯탕' },
              { id: 'shabu', label: '샤브샤브' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedBroth(tab.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                  selectedBroth === tab.id
                    ? 'bg-[#FF4A23] text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 border border-zinc-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Style / Origin Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-zinc-500 font-bold mr-1 shrink-0">카테고리:</span>
            {[
              { id: 'all', label: '전체' },
              { id: 'haidilao', label: '하이디라오' },
              { id: 'traditional', label: '정통 사천/북경' },
              { id: 'k-style', label: 'K-스타일' },
              { id: 'rotary', label: '회전식/샤브' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedOrigin(tab.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                  selectedOrigin === tab.id
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 border border-zinc-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-zinc-200/80 shadow-xs p-6">
          <Soup className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <p className="text-zinc-900 font-bold break-keep">검색 조건에 맞는 소스 레시피가 없습니다.</p>
          <p className="text-xs text-zinc-500 mt-1 break-keep">다른 검색어를 입력하시거나 DIY 소스 바에서 직접 만들어보세요!</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBroth('all');
              setSelectedOrigin('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold border border-zinc-200 transition-colors cursor-pointer"
          >
            검색 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => {
            const isFavorite = favorites.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                id={`recipe-card-${recipe.id}`}
                className="bg-white rounded-3xl border border-zinc-200/80 hover:border-[#FF4A23]/60 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md group"
              >
                {/* Visual Image of the Sauce */}
                {recipe.imageUrl ? (
                  <div className="relative h-48 w-full bg-zinc-100 border-b border-zinc-200/80 overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-zinc-800 shadow-xs border border-white whitespace-nowrap">
                        {recipe.originLabel}
                      </span>
                      {recipe.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF4A23] text-white shadow-xs whitespace-nowrap">
                          {recipe.badge}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      aria-label="즐겨찾기"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-zinc-500 hover:text-[#FF4A23] shadow-xs transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite ? 'fill-[#FF4A23] text-[#FF4A23]' : 'text-zinc-400'
                        }`}
                      />
                    </button>
                    <div className="absolute bottom-2 left-4 right-4 text-[11px] text-white font-medium drop-shadow-sm line-clamp-2 break-keep">
                      {recipe.visualDescription || '완성 비주얼'}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-b border-zinc-200/80 flex items-center justify-between bg-zinc-50">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-zinc-800 border border-zinc-200 whitespace-nowrap">
                      {recipe.originLabel}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      aria-label="즐겨찾기"
                      className="p-1.5 text-zinc-400 hover:text-[#FF4A23] transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite ? 'fill-[#FF4A23] text-[#FF4A23]' : 'text-zinc-400'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Recipe Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 tracking-tight break-keep">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed break-keep">
                      {recipe.subtitle}
                    </p>
                  </div>

                  {/* Flavor Balance Indicator */}
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200/70 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-600 font-medium">
                      <span>맛의 밸런스</span>
                      <span className="text-zinc-400 font-mono">5점 척도</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
                      {[
                        { label: '고소함', val: recipe.flavor.nutty, color: 'bg-amber-500' },
                        { label: '매콤함', val: recipe.flavor.spicy, color: 'bg-[#FF4A23]' },
                        { label: '감칠맛', val: recipe.flavor.savory, color: 'bg-orange-500' },
                        { label: '얼얼함', val: recipe.flavor.mala, color: 'bg-purple-600' },
                        { label: '달콤함', val: recipe.flavor.sweet, color: 'bg-yellow-500' },
                      ].map((f) => (
                        <div key={f.label} className="space-y-1">
                          <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${f.color} rounded-full`}
                              style={{ width: `${(f.val / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-zinc-600 block font-medium whitespace-nowrap">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients Spoons List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
                      <span className="flex items-center gap-1">
                        <Soup className="w-3.5 h-3.5 text-[#FF4A23]" />
                        황금 스푼 배합 (테이블 기준)
                      </span>
                      <span className="text-[11px] text-zinc-400 font-normal whitespace-nowrap">
                        총 {recipe.ingredients.length}개 재료
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-800 whitespace-nowrap break-keep"
                        >
                          <span className="text-zinc-700 font-medium">{ing.name}</span>
                          <span className="font-bold text-[#FF4A23] bg-white px-1.5 py-0.5 rounded-md text-[11px] border border-zinc-200 shadow-2xs shrink-0">
                            {ing.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip Box */}
                  <div className="rounded-2xl bg-amber-50/70 p-3 border border-amber-200/60 text-xs text-amber-900 leading-relaxed break-keep">
                    <span className="font-bold mr-1 text-amber-800">💡 꿀조합 팁:</span>
                    <span>{recipe.proTip}</span>
                  </div>

                  {/* Pairing & Broth badges */}
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    <span className="text-[11px] text-zinc-400 font-medium mr-1 whitespace-nowrap">어울리는 탕:</span>
                    {recipe.broths.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60 font-medium whitespace-nowrap"
                      >
                        {getBrothBadgeLabel(b)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-zinc-50/80 border-t border-zinc-200/80 flex items-center gap-2">
                  <button
                    onClick={() => onLoadIntoDiy(recipe)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <Sliders className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap break-keep">셀프 소스 바에서 배합</span>
                  </button>

                  <button
                    onClick={() => handleCopy(recipe)}
                    title="레시피 복사"
                    className="flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200 cursor-pointer shadow-2xs"
                  >
                    {copiedId === recipe.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {recipe.isCustom && onDeleteCustomRecipe && (
                    <button
                      onClick={() => onDeleteCustomRecipe(recipe.id)}
                      title="삭제"
                      className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-zinc-500 hover:text-rose-600 transition-colors border border-zinc-200 text-xs font-bold cursor-pointer shadow-2xs"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
