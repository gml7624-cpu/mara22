import React from 'react';
import { Flame, Soup, Sliders, Timer, Sparkles, BookOpen, Compass, MapPin } from 'lucide-react';

export type TabType = 'sauces' | 'matcher' | 'diy' | 'map' | 'cooking' | 'broths' | 'ai';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  savedSaucesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedSaucesCount,
}) => {
  const navItems = [
    {
      id: 'sauces' as TabType,
      label: '황금 소스 도감',
      icon: Soup,
      badge: 'TOP 24',
    },
    {
      id: 'matcher' as TabType,
      label: '취향 큐레이터',
      icon: Compass,
      badge: 'PICK',
    },
    {
      id: 'diy' as TabType,
      label: 'DIY 소스 바',
      icon: Sliders,
      badge: savedSaucesCount > 0 ? `${savedSaucesCount}` : 'MY',
    },
    {
      id: 'map' as TabType,
      label: '주변 훠궈 지도',
      icon: MapPin,
      badge: null,
    },
    {
      id: 'cooking' as TabType,
      label: '재료 타이머 & 꿀팁',
      icon: Timer,
      badge: '7초룰',
    },
    {
      id: 'broths' as TabType,
      label: '5대 육수 가이드',
      icon: BookOpen,
      badge: null,
    },
    {
      id: 'ai' as TabType,
      label: 'AI 소믈리에',
      icon: Sparkles,
      badge: 'AI',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0E0E11]/95 backdrop-blur-xl text-white shadow-xl border-b border-zinc-800/80">
      {/* Trendy Top Live Ticker Bar */}
      <div className="bg-[#141418] text-zinc-300 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            <span className="flex items-center gap-1 font-display font-black text-[#D4F63D] bg-[#D4F63D]/10 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase shrink-0 border border-[#D4F63D]/30">
              <Flame className="w-3 h-3 fill-current text-[#FF3815]" />
              HOTPOT CLUB ⚡
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="whitespace-nowrap text-zinc-300 font-semibold hidden md:inline">
              웨이팅 2시간 뚫고 소스 망치면 유죄! 실패 없는 틱톡 떡상 소스 치트키 🍲
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] overflow-x-auto scrollbar-none shrink-0">
            <button
              onClick={() => onTabChange('sauces')}
              className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-[#FF3815] text-zinc-300 hover:text-white transition-all cursor-pointer font-bold shrink-0"
            >
              🔥 #건희소스
            </button>
            <button
              onClick={() => onTabChange('cooking')}
              className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-[#FF3815] text-zinc-300 hover:text-white transition-all cursor-pointer font-bold shrink-0"
            >
              🦐 #유부_새우완자
            </button>
            <button
              onClick={() => onTabChange('cooking')}
              className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-[#D4F63D] text-zinc-300 hover:text-black transition-all cursor-pointer font-bold shrink-0 hidden sm:inline-block"
            >
              ⏱️ #천엽은_딱7초
            </button>
            <button
              onClick={() => onTabChange('map')}
              className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-[#FF3815] text-zinc-300 hover:text-white transition-all cursor-pointer font-bold shrink-0"
            >
              📍 #하이디라오_지도
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Trendy Streetwear Brand Logo */}
          <div 
            onClick={() => onTabChange('sauces')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#FF3815] via-[#FF5500] to-[#FFAA00] text-white flex items-center justify-center font-black shadow-lg shadow-red-950/50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-200 border border-white/20">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F63D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4F63D] border-2 border-[#0E0E11]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand font-black text-xl sm:text-2xl tracking-tighter text-white group-hover:text-[#D4F63D] transition-colors italic">
                  HOTPOT CLUB
                </span>
                <span className="text-[10px] font-display font-black px-2 py-0.5 rounded-full bg-[#D4F63D] text-[#0E0E11] tracking-wider uppercase border border-white/10 shadow-xs">
                  ARCHIVE ⚡
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:flex items-center gap-1.5 font-medium">
                <span>훠궈 중독자들의 소스 아카이브 & 실전 꿀조합 치트키</span>
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`relative flex items-center gap-1.5 px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF3815] text-white shadow-lg shadow-red-950/40 font-black translate-y-[-1px]'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/90'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  />
                  <span className="whitespace-nowrap break-keep">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-display font-black px-1.5 py-0.2 rounded-full whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-black text-[#D4F63D]'
                          : 'bg-[#D4F63D] text-[#0E0E11]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile & Tablet Navigation Bar */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2.5 gap-1.5 scrollbar-none border-t border-zinc-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF3815] text-white shadow-md font-black'
                    : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 border border-zinc-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-black text-[#D4F63D]' : 'bg-[#D4F63D] text-[#0E0E11]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
