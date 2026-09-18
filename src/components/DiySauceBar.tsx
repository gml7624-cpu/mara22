import React, { useState, useMemo } from 'react';
import { AvailableIngredient, SauceRecipe, FlavorProfile } from '../types';
import { AVAILABLE_INGREDIENTS, CURATED_SAUCE_RECIPES } from '../data/hotpotData';
import { Plus, Minus, RotateCcw, Save, Sparkles, Check, Flame, Sliders, Info, HelpCircle, X, ChevronRight, Eye } from 'lucide-react';
import { sound } from '../utils/sound';

import imgSauceBarStation from '../assets/images/haidilao_sauce_bar_station_1789709609215.jpg';
import imgSauceIngredientsGuide from '../assets/images/sauce_ingredients_guide_1789709621889.jpg';

interface DiySauceBarProps {
  initialRecipe?: SauceRecipe | null;
  onSaveRecipe: (recipe: SauceRecipe) => void;
}

export const DiySauceBar: React.FC<DiySauceBarProps> = ({
  initialRecipe,
  onSaveRecipe,
}) => {
  // Map of ingredientId -> spoon count
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, number>>(() => {
    if (initialRecipe) {
      const init: Record<string, number> = {};
      initialRecipe.ingredients.forEach((ing) => {
        init[ing.ingredientId] = ing.spoons;
      });
      return init;
    }
    // Default starter: 1.5 spoon sweet chili + 1 spoon zhmajang + 0.5 garlic + 0.5 scallion + 0.5 peanut
    return {
      sweet_chili: 1.5,
      zhmajang: 1,
      garlic: 0.5,
      scallion: 0.5,
      peanut_powder: 0.5,
    };
  });

  const [customName, setCustomName] = useState(
    initialRecipe ? `${initialRecipe.name} (커스텀)` : '나만의 특제 황금 소스'
  );
  const [customNote, setCustomNote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Selected ingredient detail modal/drawer
  const [inspectingIngredient, setInspectingIngredient] = useState<AvailableIngredient | null>(null);
  const [showPhotoGuide, setShowPhotoGuide] = useState<boolean>(false);

  // Handle quantity modification
  const handleAmountChange = (id: string, delta: number) => {
    sound.playScoop();
    setSelectedAmounts((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, parseFloat((current + delta).toFixed(1)));
      if (updated === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: updated };
    });
  };

  const handleReset = () => {
    sound.playScoop();
    setSelectedAmounts({});
  };

  const loadTemplate = (recipe: SauceRecipe) => {
    sound.playScoop();
    const map: Record<string, number> = {};
    recipe.ingredients.forEach((ing) => {
      map[ing.ingredientId] = ing.spoons;
    });
    setSelectedAmounts(map);
    setCustomName(`${recipe.name} 변형`);
  };

  // Total Spoons in Bowl
  const totalSpoons = useMemo(() => {
    return Object.values(selectedAmounts).reduce((a, b) => a + b, 0);
  }, [selectedAmounts]);

  // Compute dynamic flavor profile based on active ingredients
  const calculatedFlavor: FlavorProfile = useMemo(() => {
    let nutty = 0;
    let spicy = 0;
    let savory = 0;
    let mala = 0;
    let sweet = 0;
    let tangy = 0;

    Object.entries(selectedAmounts).forEach(([id, spoons]) => {
      const ing = AVAILABLE_INGREDIENTS.find((i) => i.id === id);
      if (!ing || spoons <= 0) return;
      const weight = Math.min(spoons, 3);
      if (ing.flavorImpact.nutty) nutty += ing.flavorImpact.nutty * weight;
      if (ing.flavorImpact.spicy) spicy += ing.flavorImpact.spicy * weight;
      if (ing.flavorImpact.savory) savory += ing.flavorImpact.savory * weight;
      if (ing.flavorImpact.mala) mala += ing.flavorImpact.mala * weight;
      if (ing.flavorImpact.sweet) sweet += ing.flavorImpact.sweet * weight;
      if (ing.flavorImpact.tangy) tangy += ing.flavorImpact.tangy * weight;
    });

    const normalize = (v: number) => Math.min(5, Math.max(0, Math.round(v / 2.5)));

    return {
      nutty: normalize(nutty),
      spicy: normalize(spicy),
      savory: normalize(savory),
      mala: normalize(mala),
      sweet: normalize(sweet),
      tangy: normalize(tangy),
    };
  }, [selectedAmounts]);

  // Dynamic chef feedback message
  const chefFeedback = useMemo(() => {
    const hasZhmajang = (selectedAmounts['zhmajang'] || 0) > 0;
    const hasChili = (selectedAmounts['sweet_chili'] || 0) > 0;
    const hasGarlic = (selectedAmounts['garlic'] || 0) > 0;
    const hasSesameOil = (selectedAmounts['sesame_oil'] || 0) > 0;
    const hasMalaOil = (selectedAmounts['huajiao_oil'] || 0) > 0;
    const hasVinegar = (selectedAmounts['black_vinegar'] || 0) > 0;

    if (totalSpoons === 0) {
      return '재료를 선택하여 나만의 황금 소스 그릇을 채워보세요!';
    }
    if (hasZhmajang && hasChili && hasGarlic) {
      return '✨ [하이디라오 황금 밸런스] 즈마장의 고소함과 칠리의 단짠, 마늘의 알싸함이 완벽히 어우러집니다!';
    }
    if (hasSesameOil && hasGarlic && selectedAmounts['sesame_oil'] >= 2) {
      return '🔥 [사천 정통 위장 보호형] 듬뿍 넣은 참기름이 마라 홍탕의 자극을 부드럽게 감싸줍니다.';
    }
    if (hasMalaOil) {
      return '⚡ [사천 마니아 익스트림] 화자오유가 혀끝을 마비시키는 찌릿한 얼얼함을 선사합니다!';
    }
    if (hasVinegar && (selectedAmounts['soy_sauce'] || 0) > 0) {
      return '🥢 [산뜻한 해물 & 샤브형] 흑식초와 간장이 만나 기름진 고기와 해산물의 풍미를 살려줍니다.';
    }
    return '👍 개성 넘치는 나만의 커스텀 배합입니다. 맛의 밸런스를 확인해보세요!';
  }, [selectedAmounts, totalSpoons]);

  const handleSave = () => {
    if (totalSpoons === 0) return;
    sound.playChime();

    const ingredients = Object.entries(selectedAmounts).map(([id, spoons]) => {
      const ing = AVAILABLE_INGREDIENTS.find((i) => i.id === id);
      return {
        ingredientId: id,
        name: ing ? ing.name : id,
        amount: `${spoons} 스푼`,
        spoons,
      };
    });

    const newRecipe: SauceRecipe = {
      id: `custom_${Date.now()}`,
      name: customName || '나만의 커스텀 소스',
      subtitle: customNote || 'DIY 소스 바에서 직접 배합한 나만의 비법 레시피',
      originType: 'custom',
      originLabel: 'DIY 커스텀',
      badge: '내가 만든 레시피',
      broths: ['mala', 'tomato', 'clear'],
      flavor: calculatedFlavor,
      ingredients,
      proTip: chefFeedback,
      recommendPairing: '소고기 차돌박이, 유부, 완자',
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    onSaveRecipe(newRecipe);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const categories = [
    { id: 'all', label: '전체 재료' },
    { id: 'base', label: '베이스 장류' },
    { id: 'oil', label: '오일 & 향미유' },
    { id: 'fresh', label: '신선 채소·허브' },
    { id: 'sauce', label: '양념 & 조미' },
    { id: 'topping', label: '토핑 & 크런치' },
  ];

  const filteredIngredients = AVAILABLE_INGREDIENTS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Top Title & Templates - Trendy Mixology Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#FF4A23] text-xs font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>SAUCE MIXOLOGY LAB • 셀프 소스 바</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            내 입맛대로 조절하는 DIY 소스 믹솔로지
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            매장 셀프바처럼 원하는 재료를 스푼 단위로 담아 실시간 맛 밸런스를 확인하고 나만의 레시피를 저장하세요.
          </p>
        </div>

        {/* Buttons: Quick Starters + Photo Guide Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={() => setShowPhotoGuide(!showPhotoGuide)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-[#FF4A23] font-bold text-xs border border-orange-200/80 transition-all cursor-pointer shadow-2xs"
          >
            <Eye className="w-4 h-4 text-[#FF4A23]" />
            <span>{showPhotoGuide ? '소스 사진 가이드 접기' : '📸 생소한 소스 사진 가이드'}</span>
          </button>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-zinc-400 font-bold">인기 베이스:</span>
            {CURATED_SAUCE_RECIPES.slice(0, 3).map((template) => (
              <button
                key={template.id}
                onClick={() => loadTemplate(template)}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium border border-zinc-200 transition-colors cursor-pointer"
              >
                {template.name.split(' ')[0]} {template.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VISUAL SAUCE BAR STATION PHOTO & INGREDIENT EXPLAINER */}
      {showPhotoGuide && (
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#FF4A23] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                현장 가이드: “이 소스는 도대체 뭐예요?”
              </span>
              <h3 className="text-lg sm:text-xl font-black text-zinc-900 mt-1">
                하이디라오 셀프 소스 바 실물 사진 & 식재료 완벽 해설
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                처음 훠궈 집에 가면 즈마장, 푸루, 지우차이화, 천추 등 이름만 보고 당황하기 쉽습니다. 실물 모습과 맛의 역할을 미리 파악하세요.
              </p>
            </div>
            <button
              onClick={() => setShowPhotoGuide(false)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#FAF8F5] border border-[#E0D9CE] shadow-xs">
                <img
                  src={imgSauceBarStation}
                  alt="하이디라오 소스 셀프바 실물"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  📍 하이디라오 매장 셀프 소스 바 실제 전경
                </div>
              </div>
              <p className="text-[12px] text-[#5C564E] leading-relaxed">
                중앙에 놓인 대형 소스 바에서 스테인리스 보울에 담긴 20여 종의 재료를 취향껏 조합합니다.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#FAF8F5] border border-[#E0D9CE] shadow-xs">
                <img
                  src={imgSauceIngredientsGuide}
                  alt="훠궈 소스 대표 식재료 모음"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  🥣 즈마장, 칠리, 푸루, 파, 고수, 참기름 등 핵심 재료들
                </div>
              </div>
              <p className="text-[12px] text-[#5C564E] leading-relaxed">
                아래 카드 목록에서 각 재료의 상세 버튼 <span className="font-bold text-[#C8102E]">(?)</span>을 누르면 생김새와 꿀팁을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main DIY Layout: Left Ingredients Station + Right Mixing Bowl */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Ingredients Selection Station (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#FF4A23] text-white shadow-xs'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 border border-zinc-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Ingredient Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredIngredients.map((item) => {
              const count = selectedAmounts[item.id] || 0;
              return (
                <div
                  key={item.id}
                  id={`ingredient-${item.id}`}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    count > 0
                      ? 'bg-white border-[#FF4A23] shadow-xs ring-1 ring-[#FF4A23]/30'
                      : 'bg-white border-zinc-200/80 hover:border-[#FF4A23]/50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-zinc-900 break-keep">
                        {item.name}
                      </span>
                      {/* Info Button to inspect what this sauce is */}
                      <button
                        onClick={() => setInspectingIngredient(item)}
                        className="p-1 rounded-full text-zinc-400 hover:text-[#FF4A23] hover:bg-zinc-50 transition-colors cursor-pointer shrink-0"
                        title="이 재료 정보 및 생김새 보기"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 break-keep">
                      {item.appearance || item.description}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60 font-medium whitespace-nowrap">
                        {item.categoryLabel}
                      </span>
                      {count > 0 && (
                        <span className="text-xs font-black text-[#FF4A23] whitespace-nowrap">
                          {count} 스푼
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Plus Minus Controls */}
                  <div className="flex items-center gap-1 shrink-0 bg-zinc-100 p-1 rounded-xl border border-zinc-200/80">
                    <button
                      onClick={() => handleAmountChange(item.id, -0.5)}
                      disabled={count <= 0}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                      aria-label="감소"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-zinc-900">
                      {count > 0 ? count : '-'}
                    </span>
                    <button
                      onClick={() => handleAmountChange(item.id, 0.5)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-[#FF4A23] hover:bg-[#E03915] transition-colors cursor-pointer shadow-2xs"
                      aria-label="추가"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Virtual Mixing Bowl & Live Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200/80 shadow-xs space-y-5">
            {/* Header with clear button */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF4A23] flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  실시간 믹싱 보울
                </span>
                <h3 className="text-lg font-black text-zinc-900 mt-0.5">
                  총 계량: <span className="text-[#FF4A23]">{totalSpoons.toFixed(1)} 스푼</span>
                </h3>
              </div>

              {totalSpoons > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-[#FF4A23] transition-colors font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  비우기
                </button>
              )}
            </div>

            {/* Visual Bowl Simulation */}
            <div className="relative h-44 rounded-2xl bg-zinc-50 border border-zinc-200/80 overflow-hidden flex flex-col justify-end p-4 shadow-inner">
              {totalSpoons === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 text-xs">
                  <Flame className="w-8 h-8 text-zinc-300 mb-2" />
                  <span>왼쪽 소스 바에서 원하는 재료를 스푼으로 담아보세요.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-to-t from-[#FF4A23]/20 via-[#FF4A23]/10 to-amber-500/10 border border-[#FF4A23]/30 p-2.5 flex flex-wrap gap-1.5 items-end overflow-hidden">
                    {Object.entries(selectedAmounts).map(([id, spoons]) => {
                      const ing = AVAILABLE_INGREDIENTS.find((i) => i.id === id);
                      return (
                        <div
                          key={id}
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-zinc-800 border border-zinc-200 shadow-2xs whitespace-nowrap break-keep"
                        >
                          {ing?.shortName || ing?.name} {spoons}스푼
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Chef Feedback Bubble */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>{chefFeedback}</div>
            </div>

            {/* Dynamic Flavor Radar */}
            <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/70">
              <div className="text-xs font-bold text-zinc-900">예상 맛 밸런스 지수</div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { label: '고소함', val: calculatedFlavor.nutty, color: 'bg-amber-500' },
                  { label: '매콤함', val: calculatedFlavor.spicy, color: 'bg-[#FF4A23]' },
                  { label: '감칠맛', val: calculatedFlavor.savory, color: 'bg-orange-500' },
                  { label: '얼얼함', val: calculatedFlavor.mala, color: 'bg-purple-600' },
                  { label: '달콤함', val: calculatedFlavor.sweet, color: 'bg-yellow-500' },
                  { label: '산미/상큼', val: calculatedFlavor.tangy, color: 'bg-emerald-600' },
                ].map((f) => (
                  <div key={f.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-600">{f.label}</span>
                      <span className="font-bold text-zinc-900 font-mono">{f.val}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${f.color} rounded-full transition-all duration-300`}
                        style={{ width: `${(f.val / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Form */}
            <div className="space-y-2.5 pt-1">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="소스 이름 (예: 나의 특제 건희 즈마장)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
              />
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="한 줄 메모 (예: 토마토탕 먹을 때 최고)"
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
              />

              <button
                onClick={handleSave}
                disabled={totalSpoons === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-sm shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>도감에 저장 완료!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>나만의 레시피로 저장하기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Detailed Info for an individual sauce ingredient */}
      {inspectingIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-zinc-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF4A23] border border-orange-200/60">
                  {inspectingIngredient.categoryLabel}
                </span>
                <h3 className="text-xl font-black text-zinc-900 mt-1.5">
                  {inspectingIngredient.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingIngredient(null)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="font-bold text-zinc-500 block mb-1">👀 외형 및 특징:</span>
                <p className="text-zinc-900 font-medium leading-relaxed">
                  {inspectingIngredient.appearance || '매장 소스 바에 비치된 전용 재료'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="font-bold text-zinc-500 block mb-1">💡 소스에서의 역할 및 풍미:</span>
                <p className="text-zinc-600 leading-relaxed">
                  {inspectingIngredient.description}
                </p>
              </div>

              {inspectingIngredient.usageTip && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900">
                  <span className="font-bold text-amber-700 block mb-1">👨‍🍳 셰프의 활용 꿀팁:</span>
                  <p className="leading-relaxed">{inspectingIngredient.usageTip}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  handleAmountChange(inspectingIngredient.id, 1);
                  setInspectingIngredient(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                내 그릇에 +1스푼 담기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
