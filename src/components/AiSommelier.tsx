import React, { useState } from 'react';
import { Sparkles, Send, Loader2, ChefHat, Check, AlertCircle, Utensils } from 'lucide-react';
import { SauceRecipe } from '../types';
import { sound } from '../utils/sound';

interface AiSommelierProps {
  onLoadIntoDiy: (recipe: SauceRecipe) => void;
  onSaveToCatalog: (recipe: SauceRecipe) => void;
}

interface AiResult {
  sauceName: string;
  sauceConcept: string;
  flavorProfile: {
    nutty: number;
    spicy: number;
    savory: number;
    mala: number;
    sweet: number;
  };
  recipe: Array<{
    ingredient: string;
    amount: string;
    tip?: string;
  }>;
  eatingOrderTips: string[];
  secretHack: string;
  recommendedBroth: string;
}

export const AiSommelier: React.FC<AiSommelierProps> = ({
  onLoadIntoDiy,
  onSaveToCatalog,
}) => {
  const [prompt, setPrompt] = useState('');
  const [brothType, setBrothType] = useState('홍탕 + 백탕');
  const [preference, setPreference] = useState('고소하고 적당히 매콤한 맛');
  const [excluded, setExcluded] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const quickPrompts = [
    {
      title: '🌶️ 맵찔이를 위한 하이디라오 구원 소스',
      prompt: '매운 걸 잘 못 먹는 맵찔이인데 하이디라오에서 홍탕이나 토마토탕을 맛있게 즐길 수 있는 안 맵고 달콤고소한 소스 추천해줘',
      broth: '토마토탕 & 백탕',
      pref: '달콤하고 극강으로 고소한 맛 (안 맵게)',
    },
    {
      title: '🔥 혓바닥 마비! 사천 정통 얼얼 고수 소스',
      prompt: '마라 홍탕 마니아입니다. 화자오 얼얼함과 고수 풍미를 극대화하고 천엽을 찍어먹을 최강의 소스를 알려줘',
      broth: '사천 마라 홍탕',
      pref: '화자오유 듬뿍 얼얼하고 알싸한 맛',
    },
    {
      title: '🏠 집에서 샤브샤브 밀키트 먹을 때 냉장고 소스',
      prompt: '집에서 소고기 샤브샤브를 해먹는데 즈마장이 없어요. 진간장, 참기름, 다진마늘, 설탕, 땅콩버터로 만들 수 있는 비법 비율 알려줘',
      broth: '맑은 샤브샤브 육수',
      pref: '담백하고 짭조름한 감칠맛',
    },
    {
      title: '🍅 토마토탕 매니아 전용 유부완자 꿀조합',
      prompt: '토마토탕에 유부와 새우완자, 분모자를 가장 맛있게 먹을 수 있는 최적의 소스 궁합과 식사 꿀팁 추천해줘',
      broth: '토마토탕',
      pref: '단짠칠리와 즈마장의 조화',
    },
  ];

  const handleApplyQuickPrompt = (item: typeof quickPrompts[0]) => {
    setPrompt(item.prompt);
    setBrothType(item.broth);
    setPreference(item.pref);
    sound.playScoop();
  };

  const handleRecommend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    setSaved(false);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || '나에게 맞는 최고의 훠궈 소스와 꿀팁을 추천해줘',
          brothType,
          preference,
          excludedIngredients: excluded || '없음',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'AI 응답 오류');
      }

      setResult(data);
      sound.playChime();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || '추천 생성 중 오류가 발생했습니다.');
      // Fallback result for reliable user experience
      setResult({
        sauceName: '하이디라오 골든 건희 소스 플러스',
        sauceConcept: '즈마장의 녹진함에 스위트 칠리와 마늘, 참기름을 황금 비율로 배합한 불패 레시피',
        flavorProfile: { nutty: 5, spicy: 3, savory: 4, mala: 2, sweet: 3 },
        recipe: [
          { ingredient: '즈마장 (땅콩 참깨 소스)', amount: '1 스푼', tip: '진하게 베이스 잡기' },
          { ingredient: '스위트 칠리 소스', amount: '2.5 스푼', tip: '달콤 감칠맛 핵심' },
          { ingredient: '다진 마늘', amount: '0.5 스푼' },
          { ingredient: '다진 파', amount: '0.5 스푼' },
          { ingredient: '볶음 땅콩가루', amount: '1 티스푼', tip: '식감 살리기' },
          { ingredient: '참기름', amount: '0.5 티스푼' },
          { ingredient: '고추기름', amount: '0.5 티스푼' },
        ],
        eatingOrderTips: [
          '첫 점은 토마토탕 국물을 소고기 소보로+파 위에 한국자 부어 애피타이저로 음미하세요.',
          '유부에 새우완자를 가득 채워 토마토탕 또는 백탕에 3분간 익힌 뒤 이 소스에 푹 찍어 드세요.',
          '마무리로 쿵푸 수타면을 주문해 특제 소스 반 스푼을 비벼 드시면 환상적입니다.',
        ],
        secretHack: '소스를 섞기 전에 즈마장과 칠리를 먼저 부드럽게 개어준 뒤 땅콩가루를 올리면 크런치함이 살아납니다.',
        recommendedBroth: '마라 홍탕 & 토마토탕',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!result) return;
    sound.playChime();

    const newRecipe: SauceRecipe = {
      id: `ai_${Date.now()}`,
      name: result.sauceName,
      subtitle: result.sauceConcept,
      originType: 'custom',
      originLabel: 'AI 맞춤 소믈리에',
      badge: 'AI 추천 레시피',
      broths: ['mala', 'tomato', 'clear'],
      flavor: {
        nutty: result.flavorProfile.nutty || 4,
        spicy: result.flavorProfile.spicy || 3,
        savory: result.flavorProfile.savory || 4,
        mala: result.flavorProfile.mala || 2,
        sweet: result.flavorProfile.sweet || 3,
        tangy: 2,
      },
      ingredients: result.recipe.map((r, i) => ({
        ingredientId: `ai_ing_${i}`,
        name: r.ingredient,
        amount: r.amount,
        spoons: parseFloat(r.amount) || 1,
        tip: r.tip,
      })),
      proTip: result.secretHack,
      recommendPairing: result.recommendedBroth,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    onSaveToCatalog(newRecipe);
    setSaved(true);
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold border border-orange-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>海底捞 AI 调料师 • Gemini 훠궈 셰프 & 소믈리에</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight break-keep">
            내 취향과 육수에 맞춘 <span className="text-[#FF4A23]">AI 맞춤 소스 처방전</span>
          </h1>
          <p className="mt-3 text-zinc-500 text-sm sm:text-base leading-relaxed break-keep">
            방문할 훠궈 매장이나 오늘 끓일 육수, 맵기 선호도, 기피 재료를 알려주시면
            하이디라오 1급 셰프 수준의 스푼 단위 배합과 비장의 식재료 꿀조합을 즉시 추천해 드립니다.
          </p>
        </div>
      </div>

      {/* Quick Prompt Cards */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-zinc-500">
          💡 자주 묻는 인기 추천 질문 (클릭 시 자동 입력):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyQuickPrompt(item)}
              className="text-left p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-[#FF4A23]/60 hover:shadow-xs transition-all text-xs space-y-1 group cursor-pointer"
            >
              <div className="font-bold text-zinc-900 group-hover:text-[#FF4A23] transition-colors break-keep">
                {item.title}
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2 break-keep leading-relaxed">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleRecommend}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 space-y-6 shadow-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Broth Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-900">
              오늘 먹을 육수
            </label>
            <input
              type="text"
              value={brothType}
              onChange={(e) => setBrothType(e.target.value)}
              placeholder="예: 마라 홍탕 + 토마토탕"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
            />
          </div>

          {/* Flavor Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-900">
              맛 취향
            </label>
            <input
              type="text"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="예: 맵찔이라 달콤고소하게 / 마늘과 고수 듬뿍"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
            />
          </div>

          {/* Excluded Ingredients */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-900">
              제외/알레르기 재료
            </label>
            <input
              type="text"
              value={excluded}
              onChange={(e) => setExcluded(e.target.value)}
              placeholder="예: 고수 제외 / 땅콩 알레르기 있음"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
            />
          </div>
        </div>

        {/* Detailed user situation query */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-900">
            구체적인 요청 사항 또는 질문
          </label>
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="예: 하이디라오 처음 방문하는 친구들과 가는데 호불호 없는 소스랑 꼭 시켜야 할 재료 팁 알려줘!"
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4A23]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>AI 소믈리에가 황금 조합을 계산 중...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 shrink-0" />
              <span>맞춤 소스 & 꿀팁 추천받기</span>
            </>
          )}
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 space-y-6 shadow-xs animate-fade-in">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 break-keep">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80">
            <div>
              <span className="text-xs font-bold text-[#FF4A23] uppercase tracking-wider flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                AI 추천 황금 소스
              </span>
              <h2 className="text-2xl font-black text-zinc-900 mt-1 break-keep">
                {result.sauceName}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 break-keep leading-relaxed">
                {result.sauceConcept}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveResult}
                className="px-4 py-2.5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                {saved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{saved ? '도감에 저장됨!' : '내 도감에 저장'}</span>
              </button>
            </div>
          </div>

          {/* Spoon Recipe Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              🥣 스푼 단위 정확한 배합 비율
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {result.recipe.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-zinc-900 text-xs break-keep">
                      {item.ingredient}
                    </div>
                    {item.tip && (
                      <div className="text-[11px] text-zinc-500 break-keep mt-0.5">{item.tip}</div>
                    )}
                  </div>
                  <span className="font-extrabold text-[#FF4A23] bg-white px-2.5 py-1 rounded-lg border border-zinc-200 text-xs whitespace-nowrap shrink-0 shadow-2xs">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Eating Sequence Tips */}
          {result.eatingOrderTips && result.eatingOrderTips.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#FF4A23]" />
                셰프의 재료 투하 순서 & 식사 팁
              </h3>
              <div className="space-y-1.5">
                {result.eatingOrderTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-200/80 break-keep leading-relaxed"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FF4A23] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secret Hack */}
          {result.secretHack && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 break-keep leading-relaxed">
              <span className="font-bold text-amber-800">💡 비장의 셰프 꿀팁: </span>
              <span>{result.secretHack}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
