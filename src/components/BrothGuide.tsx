import React from 'react';
import { BROTH_INFO } from '../data/hotpotData';
import { Sparkles, Utensils, Flame, ChevronRight } from 'lucide-react';

interface BrothGuideProps {
  onSelectBrothForSauces: (brothType: string) => void;
}

const BROTH_DISPLAY_NAMES: Record<string, string> = {
  mala: '마라 홍탕',
  clear: '사골 백탕',
  tomato: '토마토탕',
  mushroom: '버섯탕',
  shabu: '샤브 육수',
};

export const BrothGuide: React.FC<BrothGuideProps> = ({
  onSelectBrothForSauces,
}) => {
  return (
    <div className="space-y-10">
      {/* Editorial Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold border border-orange-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>海底捞 锅底全解 • 5대 명품 훠궈 & 샤브 육수 백과</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight break-keep">
            육수별 <span className="text-[#FF4A23]">최상의 궁합</span> 식재료와 비법
          </h1>
          <p className="mt-3 text-zinc-500 text-sm sm:text-base leading-relaxed break-keep">
            하이디라오 대표 청유 마라 홍탕부터 감칠맛 폭발 토마토탕, 깊은 풍미의 삼선 백탕, 버섯탕, 담백한 샤브 육수까지.
            육수의 특성에 맞춰 어떤 재료를 넣고 어떤 소스에 찍어야 100% 감칠맛을 끌어낼 수 있는지 확인하세요.
          </p>
        </div>
      </div>

      {/* Broths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {BROTH_INFO.map((broth) => (
          <div
            key={broth.id}
            className="rounded-3xl p-6 sm:p-8 bg-white border border-zinc-200/80 shadow-xs transition-all duration-300 hover:border-[#FF4A23]/50 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#FF4A23] uppercase tracking-wider">
                  {broth.tagline}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1 break-keep">
                  {broth.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed break-keep">
                  {broth.description}
                </p>
              </div>

              {/* Best Ingredients chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#FF4A23]" />
                  최적의 페어링 식재료
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {broth.bestPairings.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-50 text-zinc-700 border border-zinc-200/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Sauce Combinations */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FF4A23]" />
                  어울리는 추천 소스
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {broth.recommendSauces.map((sauce) => (
                    <span
                      key={sauce}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 text-[#FF4A23] border border-orange-200/80"
                    >
                      {sauce}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pro Chef Tip */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed break-keep">
                <span className="font-bold text-amber-800">💡 마스터 꿀팁: </span>
                {broth.proTip}
              </div>
            </div>

            {/* CTA button to explore matching sauces */}
            <button
              onClick={() => onSelectBrothForSauces(broth.id)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-50 hover:bg-orange-50 text-zinc-900 hover:text-[#FF4A23] text-xs font-bold border border-zinc-200 hover:border-orange-200 transition-all group cursor-pointer"
            >
              <span className="break-keep">{BROTH_DISPLAY_NAMES[broth.id] || broth.name} 전용 소스 보러가기</span>
              <ChevronRight className="w-4 h-4 text-[#FF4A23] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
