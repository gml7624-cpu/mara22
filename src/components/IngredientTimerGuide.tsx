import React, { useState, useEffect } from 'react';
import { INGREDIENT_COOKING_GUIDE, SECRET_HACKS } from '../data/hotpotData';
import { IngredientItem, SecretHack } from '../types';
import { Timer, Play, Pause, RotateCcw, Flame, AlertTriangle, Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/sound';

export const IngredientTimerGuide: React.FC = () => {
  // Timer State
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientItem>(
    INGREDIENT_COOKING_GUIDE[0]
  );
  const [timeLeft, setTimeLeft] = useState<number>(INGREDIENT_COOKING_GUIDE[0].cookTimeSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  // Filter category
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setTimerFinished(true);
            sound.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const selectTimerItem = (item: IngredientItem) => {
    setSelectedIngredient(item);
    setTimeLeft(item.cookTimeSeconds);
    setIsRunning(true);
    setTimerFinished(false);
    sound.playScoop();
  };

  const togglePlay = () => {
    if (timerFinished) {
      setTimeLeft(selectedIngredient.cookTimeSeconds);
      setTimerFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimerFinished(false);
    setTimeLeft(selectedIngredient.cookTimeSeconds);
  };

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'meat', label: '육류 & 내장' },
    { id: 'seafood', label: '해산물 & 완자' },
    { id: 'tofu', label: '두부 & 푸주' },
    { id: 'noodle', label: '당면 & 수타면' },
    { id: 'veg', label: '채소 & 버섯' },
  ];

  const filteredIngredients = INGREDIENT_COOKING_GUIDE.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    if (mins > 0) {
      return `${mins}분 ${secs < 10 ? '0' : ''}${secs}초`;
    }
    return `${secs}초`;
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold border border-orange-200/80 mb-3">
            <ChefHat className="w-3.5 h-3.5 text-[#FF4A23]" />
            <span>HOTPOT LAB • 훠궈 200% 즐기는 식재료 미학</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            재료 활용 <span className="text-[#FF4A23]">시크릿 꿀팁</span> & 실시간 익힘 타이머
          </h1>
          <p className="mt-3 text-zinc-500 text-sm sm:text-base leading-relaxed">
            훠궈는 어떤 순서로 넣고, 얼마나 익히느냐에 따라 식감과 육수의 맛이 결정됩니다.
            소 천엽 7초의 미학(칠상팔하 七上八下)부터 유부 새우완자, 토마토 계란죽, 그리고 눈앞에서 펼쳐지는 특제 쿵푸 수타면까지 마스터하세요.
          </p>
        </div>
      </div>

      {/* SECTION 1: Interactive Live Hot Pot Timer */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200/80">
          <div>
            <span className="text-xs font-bold text-[#FF4A23] uppercase tracking-wider flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-[#FF4A23]" />
              실시간 칠상팔하(七上八下) 타이머
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1">
              {selectedIngredient.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              권장 시간: <strong className="text-[#FF4A23]">{selectedIngredient.cookTimeLabel}</strong> ({selectedIngredient.quickTip})
            </p>
          </div>

          {/* Big Timer Display & Controls */}
          <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
            <div className="text-center min-w-[120px]">
              <div
                className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                  timerFinished
                    ? 'text-emerald-600 animate-bounce'
                    : isRunning
                    ? 'text-[#FF4A23]'
                    : 'text-zinc-900'
                }`}
              >
                {formatSeconds(timeLeft)}
              </div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                {timerFinished ? '익힘 완료! 지금 드세요' : isRunning ? '보글보글 익는 중' : '대기 중'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                id="timer-play-btn"
                className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                  timerFinished
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-[#FF4A23] hover:bg-[#E03915] text-white'
                }`}
              >
                {timerFinished ? (
                  <RotateCcw className="w-5 h-5" />
                ) : isRunning ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>

              <button
                onClick={resetTimer}
                aria-label="타이머 리셋"
                className="p-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 border border-zinc-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Click Timer Buttons */}
        <div className="pt-6">
          <div className="text-xs text-zinc-500 font-bold mb-3">
            ⏱️ 식재료를 클릭하면 타이머가 즉시 시작됩니다:
          </div>
          <div className="flex flex-wrap gap-2">
            {INGREDIENT_COOKING_GUIDE.map((item) => {
              const isSelected = selectedIngredient.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => selectTimerItem(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF4A23] text-white shadow-xs scale-105'
                      : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80 border border-zinc-200/60'
                  }`}
                >
                  <span className="whitespace-nowrap break-keep">{item.shortName || item.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shrink-0 ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-white text-zinc-500 border border-zinc-200'
                    }`}
                  >
                    {item.cookTimeSeconds < 60 ? `${item.cookTimeSeconds}초` : `${Math.floor(item.cookTimeSeconds / 60)}분`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: The Secret Gourmet Hacks */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#FF4A23] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            고수들의 시크릿 레시피
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
            맛을 2배로 끌어올리는 비장의 조합 & 재료 꿀팁
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECRET_HACKS.map((hack) => (
            <div
              key={hack.id}
              className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs hover:border-[#FF4A23]/50 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF4A23] border border-orange-200/80">
                    {hack.tag}
                  </span>
                  <span className="text-[11px] text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200">
                    {hack.place}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                  {hack.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {hack.summary}
                </p>

                {/* Step instructions */}
                <div className="mt-4 space-y-2">
                  {hack.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-900">
                      <span className="w-4 h-4 rounded-full bg-zinc-100 text-[#FF4A23] border border-zinc-200 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-snug text-zinc-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef tip highlight */}
              <div className="pt-3 bg-amber-50/70 -mx-6 -mb-6 p-4 rounded-b-3xl border-t border-amber-200/60 text-xs text-amber-900">
                <span className="font-bold text-amber-800">💡 꿀맛 포인트: </span>
                {hack.chefTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Detailed Ingredient Encyclopedia */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF4A23] text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              재료별 마스터 가이드
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
              식재료별 최적 익힘법 & 주의사항
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#FF4A23] text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80 border border-zinc-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIngredients.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-[#FF4A23]/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-zinc-900">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-extrabold text-[#FF4A23]">
                      권장 시간: {item.cookTimeLabel}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => selectTimerItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-[#FF4A23] text-zinc-800 hover:text-white border border-zinc-200 hover:border-[#FF4A23] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Timer className="w-3.5 h-3.5" />
                  타이머 시작
                </button>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {item.proGuide}
              </p>

              {item.warning && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50/70 border border-red-200/80 text-xs text-red-700">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{item.warning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
