import React, { useState, useMemo } from 'react';
import { CURATED_SAUCE_RECIPES } from '../data/hotpotData';
import { SauceRecipe, BrothType } from '../types';
import { Sliders, Check, Copy, RotateCcw, Utensils, ChefHat, Sparkles, ArrowRight, Soup } from 'lucide-react';
import { sound } from '../utils/sound';

interface TasteMatcherProps {
  onLoadIntoDiy: (recipe: SauceRecipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const TasteMatcher: React.FC<TasteMatcherProps> = ({
  onLoadIntoDiy,
}) => {
  // Taste sliders: 0 to 5 scale
  const [preferences, setPreferences] = useState({
    spicy: 3,   // 매운맛
    tangy: 2,   // 신맛 / 상큼함
    savory: 4,  // 감칠맛 / 짭조름함
    nutty: 4,   // 고소함 (땅콩, 참깨)
    sweet: 3,   // 달콤함
    mala: 2,    // 얼얼함 (마라, 화자오)
  });

  const [targetBroth, setTargetBroth] = useState<string>('any');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'sweet_chili',
    'zhmajang',
    'garlic',
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const ingredientChips = [
    { id: 'zhmajang', label: '즈마장 (땅콩·참깨장)' },
    { id: 'sweet_chili', label: '스위트 칠리' },
    { id: 'garlic', label: '다진 마늘' },
    { id: 'scallion', label: '다진 쪽파' },
    { id: 'sesame_oil', label: '순수 참기름' },
    { id: 'coriander', label: '생 고수 (샹차이)' },
    { id: 'soy_sauce', label: '해선간장' },
    { id: 'black_vinegar', label: '흑식초 / 레몬즙' },
    { id: 'peanut_powder', label: '땅콩 분태' },
    { id: 'hot_pepper', label: '청양고추' },
    { id: 'huajiao_oil', label: '화자오유 (산초유)' },
    { id: 'oyster_sauce', label: '굴소스' },
  ];

  const handleToggleIngredient = (id: string) => {
    sound.playScoop();
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    sound.playScoop();
    setPreferences({
      spicy: 3,
      tangy: 2,
      savory: 4,
      nutty: 4,
      sweet: 3,
      mala: 2,
    });
    setTargetBroth('any');
    setSelectedIngredients(['sweet_chili', 'zhmajang', 'garlic']);
  };

  const applyProfile = (type: string) => {
    sound.playScoop();
    if (type === 'balance_signature') {
      setPreferences({ spicy: 3, tangy: 1, savory: 5, nutty: 5, sweet: 4, mala: 2 });
      setSelectedIngredients(['sweet_chili', 'zhmajang', 'garlic', 'peanut_powder']);
      setTargetBroth('tomato');
    } else if (type === 'sichuan_classic') {
      setPreferences({ spicy: 5, tangy: 1, savory: 4, nutty: 3, sweet: 1, mala: 5 });
      setSelectedIngredients(['sesame_oil', 'garlic', 'huajiao_oil', 'hot_pepper']);
      setTargetBroth('mala');
    } else if (type === 'citrus_clean') {
      setPreferences({ spicy: 2, tangy: 5, savory: 4, nutty: 1, sweet: 2, mala: 0 });
      setSelectedIngredients(['soy_sauce', 'black_vinegar', 'scallion', 'hot_pepper']);
      setTargetBroth('shabu');
    } else if (type === 'creamy_mild') {
      setPreferences({ spicy: 0, tangy: 2, savory: 3, nutty: 5, sweet: 5, mala: 0 });
      setSelectedIngredients(['zhmajang', 'peanut_powder', 'sweet_chili']);
      setTargetBroth('clear');
    }
  };

  // Ranking calculation based on taste Euclidean distance + ingredient affinity
  const matchedRecipes = useMemo(() => {
    return CURATED_SAUCE_RECIPES.map((recipe) => {
      const diffSpicy = Math.abs(recipe.flavor.spicy - preferences.spicy);
      const diffTangy = Math.abs((recipe.flavor.tangy || 1) - preferences.tangy);
      const diffSavory = Math.abs(recipe.flavor.savory - preferences.savory);
      const diffNutty = Math.abs(recipe.flavor.nutty - preferences.nutty);
      const diffSweet = Math.abs(recipe.flavor.sweet - preferences.sweet);
      const diffMala = Math.abs(recipe.flavor.mala - preferences.mala);

      const totalDist =
        diffSpicy * 1.3 +
        diffTangy * 1.1 +
        diffSavory * 1.0 +
        diffNutty * 1.2 +
        diffSweet * 1.0 +
        diffMala * 1.3;

      const recipeIngIds = recipe.ingredients.map((i) => i.ingredientId);
      const matchingCount = selectedIngredients.filter((id) =>
        recipeIngIds.includes(id)
      ).length;
      const ingredientScore = matchingCount * 6;

      const brothBonus =
        targetBroth === 'any' || recipe.broths.includes(targetBroth as BrothType)
          ? 10
          : -15;

      let score = Math.round(100 - totalDist * 4 + ingredientScore + brothBonus);
      score = Math.max(50, Math.min(99, score));

      return {
        recipe,
        score,
      };
    }).sort((a, b) => b.score - a.score);
  }, [preferences, selectedIngredients, targetBroth]);

  const topMatch = matchedRecipes[0];
  const otherMatches = matchedRecipes.slice(1, 4);

  const handleCopy = (recipe: SauceRecipe) => {
    sound.playScoop();
    const ingredientsList = recipe.ingredients
      .map((ing) => `- ${ing.name}: ${ing.amount}`)
      .join('\n');
    const text = `🍲 [${recipe.name}]\n${recipe.subtitle}\n\n[황금 비율 레시피]\n${ingredientsList}\n\n💡 셰프 가이드: ${recipe.proTip}`;
    navigator.clipboard.writeText(text);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#FF4A23]/5 rounded-full pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold mb-3 border border-orange-200/80">
            <ChefHat className="w-3.5 h-3.5 text-[#FF4A23]" />
            <span>TASTE CURATOR • 미식 취향 맞춤 큐레이터</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            내 입맛에 딱 맞는 훠궈·샤브 소스 레시피 찾기
          </h1>
          <p className="mt-2.5 text-zinc-500 text-sm sm:text-base leading-relaxed">
            매운맛, 신맛(산미), 감칠맛, 고소함 등 선호하는 풍미와 좋아하는 식재료를 선택하세요.
            하이디라오 인기 건희 소스부터 충칭 참기름 마늘장, 산뜻한 폰즈까지 최적의 레시피를 매칭해 드립니다.
          </p>
        </div>

        {/* Preset profiles bar */}
        <div className="mt-6 pt-6 border-t border-zinc-200/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-zinc-500">대표적인 인기 취향 프로필:</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-zinc-400 hover:text-[#FF4A23] transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>슬라이더 초기화</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'balance_signature', label: '단짠고소 밸런스형', desc: '하이디라오 건희 소스 기준' },
              { id: 'sichuan_classic', label: '얼얼한 사천 마라형', desc: '참기름과 알싸한 마늘 중심' },
              { id: 'citrus_clean', label: '상큼한 폰즈 간장형', desc: '해산물과 채소 샤브 특화' },
              { id: 'creamy_mild', label: '순한 크리미 참깨형', desc: '매운맛 없는 부드러운 맛' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyProfile(p.id)}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#FF4A23] hover:bg-white text-left transition-all shadow-2xs cursor-pointer"
              >
                <div className="font-bold text-zinc-900 text-xs">{p.label}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel: Sliders & Ingredients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 space-y-5 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FF4A23]" />
              맛 강도 조절 (0~5단계)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              원하는 풍미의 단계를 슬라이더로 조절하시면 실시간으로 소스 배합이 매칭됩니다.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { key: 'spicy', label: '매운맛', note: '청양고추, 고추기름, 칠리소스' },
              { key: 'tangy', label: '신맛 / 상큼함', note: '흑식초, 레몬즙, 유자 폰즈' },
              { key: 'savory', label: '감칠맛 / 짭조름함', note: '해선간장, 굴소스, 볶음장' },
              { key: 'nutty', label: '고소함', note: '즈마장(참깨땅콩), 순수 참기름' },
              { key: 'sweet', label: '달콤함', note: '스위트칠리, 설탕' },
              { key: 'mala', label: '얼얼함 (마라)', note: '화자오유, 사천 산초' },
            ].map((f) => {
              const val = preferences[f.key as keyof typeof preferences];
              return (
                <div key={f.key} className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/70">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div>
                      <span className="font-bold text-zinc-800">{f.label}</span>
                      <span className="text-zinc-400 text-[11px] ml-2 font-medium">({f.note})</span>
                    </div>
                    <span className="font-bold text-[#FF4A23] bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-[11px] shadow-2xs font-mono">
                      {val === 0 ? '0 (안 느낌)' : `${val}단계`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={val}
                    onChange={(e) => {
                      sound.playScoop();
                      setPreferences((prev) => ({
                        ...prev,
                        [f.key]: parseInt(e.target.value, 10),
                      }));
                    }}
                    className="w-full h-2 bg-zinc-200 rounded-lg cursor-pointer accent-[#FF4A23]"
                  />
                </div>
              );
            })}
          </div>

          {/* Broth Selector */}
          <div className="pt-3 border-t border-zinc-200/80">
            <span className="text-xs font-bold text-zinc-900 block mb-2">
              함께 곁들일 육수:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'any', label: '모든 육수' },
                { id: 'mala', label: '마라 홍탕' },
                { id: 'tomato', label: '토마토탕' },
                { id: 'clear', label: '백탕/사골' },
                { id: 'mushroom', label: '버섯탕' },
                { id: 'shabu', label: '샤브샤브' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    sound.playScoop();
                    setTargetBroth(b.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    targetBroth === b.id
                      ? 'bg-[#FF4A23] text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 border border-zinc-200/60'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desired Ingredients (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Soup className="w-4 h-4 text-[#FF4A23]" />
              선호 식재료 선택
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              원하는 재료를 체크하시면 해당 재료가 포함된 소스 레시피를 우선 추천합니다.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {ingredientChips.map((chip) => {
                const isChecked = selectedIngredients.includes(chip.id);
                return (
                  <button
                    key={chip.id}
                    onClick={() => handleToggleIngredient(chip.id)}
                    className={`p-2.5 rounded-xl text-xs flex items-center justify-between border transition-all text-left cursor-pointer ${
                      isChecked
                        ? 'bg-orange-50 text-[#FF4A23] border-[#FF4A23] font-bold shadow-2xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{chip.label}</span>
                    {isChecked ? (
                      <Check className="w-3.5 h-3.5 text-[#FF4A23] shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded border border-zinc-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-500 space-y-1">
            <span className="font-bold text-zinc-800">💡 훠궈 소스 상식:</span>
            <p className="leading-relaxed">
              사천 정통 훠궈에서는 참기름+마늘이 기본이며, 하이디라오나 북경식에서는 즈마장(땅콩참깨장)이 중심이 됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED CHEF RESULT CARD WITH ACTUAL SAUCE IMAGE */}
      {topMatch && (
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF4A23] uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-500" />
            선택하신 맛 조건에 가장 최적화된 추천 레시피 (일치율 {topMatch.score}%)
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Sauce Image */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-square sm:aspect-auto sm:h-72">
              {topMatch.recipe.imageUrl ? (
                <img
                  src={topMatch.recipe.imageUrl}
                  alt={topMatch.recipe.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  <Soup className="w-16 h-16" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <span className="font-bold block mb-0.5">실제 완성 비주얼</span>
                <p className="text-[11px] text-white/90 line-clamp-2">
                  {topMatch.recipe.visualDescription || '신선한 식재료가 어우러진 황금 소스'}
                </p>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {topMatch.recipe.originLabel}
                  </span>
                  {topMatch.recipe.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF4A23] border border-orange-200/80">
                      {topMatch.recipe.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900">
                  {topMatch.recipe.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  {topMatch.recipe.subtitle}
                </p>
              </div>

              {/* Exact Spoons Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#FF4A23]" />
                  스푼 단위 황금 비율 배합:
                </span>
                <div className="flex flex-wrap gap-2">
                  {topMatch.recipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-800"
                    >
                      <span className="font-medium text-zinc-700">{ing.name}</span>
                      <span className="font-bold text-[#FF4A23] bg-white px-1.5 py-0.5 rounded-md text-[11px] border border-zinc-200 shadow-2xs">
                        {ing.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef pro tip */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold text-amber-800">💡 꿀조합 팁: </span>
                {topMatch.recipe.proTip} (추천 페어링: {topMatch.recipe.recommendPairing})
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onLoadIntoDiy(topMatch.recipe)}
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>DIY 소스 바에서 비율 조절하기</span>
                </button>

                <button
                  onClick={() => handleCopy(topMatch.recipe)}
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors border border-zinc-200 cursor-pointer"
                >
                  {copiedId === topMatch.recipe.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>레시피 텍스트 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Recommendations */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900">
          함께 추천하는 다른 소스 조합
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherMatches.map(({ recipe }) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 hover:border-[#FF4A23]/60 transition-colors flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {recipe.originLabel}
                  </span>
                </div>

                {recipe.imageUrl && (
                  <div className="h-28 w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/80">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h4 className="text-sm font-bold text-zinc-900">{recipe.name}</h4>
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {recipe.subtitle}
                </p>
              </div>

              <button
                onClick={() => onLoadIntoDiy(recipe)}
                className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-zinc-200 cursor-pointer"
              >
                <span>상세 레시피 확인</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
