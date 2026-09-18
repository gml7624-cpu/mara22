import { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { SauceCatalog } from './components/SauceCatalog';
import { TasteMatcher } from './components/TasteMatcher';
import { DiySauceBar } from './components/DiySauceBar';
import { HotpotMapFinder } from './components/HotpotMapFinder';
import { IngredientTimerGuide } from './components/IngredientTimerGuide';
import { BrothGuide } from './components/BrothGuide';
import { AiSommelier } from './components/AiSommelier';
import { CURATED_SAUCE_RECIPES } from './data/hotpotData';
import { SauceRecipe } from './types';
import { Flame, Soup, Heart } from 'lucide-react';
import { sound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('sauces');
  
  // Custom & Curated recipes
  const [recipes, setRecipes] = useState<SauceRecipe[]>(() => {
    try {
      const saved = localStorage.getItem('hotpot_custom_recipes');
      if (saved) {
        const parsed: SauceRecipe[] = JSON.parse(saved);
        return [...parsed, ...CURATED_SAUCE_RECIPES];
      }
    } catch {
      // Ignore parse error
    }
    return CURATED_SAUCE_RECIPES;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hotpot_favorites');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return ['keonhee_original'];
  });

  // Preset recipe loaded into DIY bar
  const [diyPreset, setDiyPreset] = useState<SauceRecipe | null>(null);

  // Sync custom recipes to localStorage
  const saveCustomRecipe = (recipe: SauceRecipe) => {
    setRecipes((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      const updated = [recipe, ...filtered];
      const customs = updated.filter((r) => r.isCustom);
      try {
        localStorage.setItem('hotpot_custom_recipes', JSON.stringify(customs));
      } catch {
        // Storage full or restricted
      }
      return updated;
    });
  };

  const deleteCustomRecipe = (id: string) => {
    sound.playScoop();
    setRecipes((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      const customs = updated.filter((r) => r.isCustom);
      try {
        localStorage.setItem('hotpot_custom_recipes', JSON.stringify(customs));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const toggleFavorite = (id: string) => {
    sound.playScoop();
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      try {
        localStorage.setItem('hotpot_favorites', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleLoadIntoDiy = (recipe: SauceRecipe) => {
    sound.playScoop();
    setDiyPreset(recipe);
    setActiveTab('diy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrothForSauces = (_brothId: string) => {
    sound.playScoop();
    setActiveTab('sauces');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSauceShortcut = (_sauceKeyword: string) => {
    sound.playScoop();
    setActiveTab('sauces');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const customRecipesCount = recipes.filter((r) => r.isCustom).length;

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#18181B] flex flex-col font-sans selection:bg-[#FF4A23] selection:text-white">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          sound.playScoop();
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedSaucesCount={customRecipesCount}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'sauces' && (
          <SauceCatalog
            recipes={recipes}
            onLoadIntoDiy={handleLoadIntoDiy}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onDeleteCustomRecipe={deleteCustomRecipe}
          />
        )}

        {activeTab === 'matcher' && (
          <TasteMatcher
            onLoadIntoDiy={handleLoadIntoDiy}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'diy' && (
          <DiySauceBar
            initialRecipe={diyPreset}
            onSaveRecipe={(recipe) => {
              saveCustomRecipe(recipe);
            }}
          />
        )}

        {activeTab === 'map' && (
          <HotpotMapFinder
            onSelectSauceShortcut={handleSelectSauceShortcut}
          />
        )}

        {activeTab === 'cooking' && <IngredientTimerGuide />}

        {activeTab === 'broths' && (
          <BrothGuide onSelectBrothForSauces={handleSelectBrothForSauces} />
        )}

        {activeTab === 'ai' && (
          <AiSommelier
            onLoadIntoDiy={handleLoadIntoDiy}
            onSaveToCatalog={(recipe) => {
              saveCustomRecipe(recipe);
            }}
          />
        )}
      </main>

      {/* Footer: Trendy Hotpot Club Community & Curation Footer */}
      <footer className="border-t border-zinc-200/80 bg-white text-zinc-600 py-12 mt-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF4A23] text-white flex items-center justify-center font-black shadow-md shadow-orange-950/20">
                <Flame className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <div className="font-extrabold text-zinc-900 text-base flex items-center gap-2">
                  <span>HOTPOT CLUB</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-zinc-200 font-bold">
                    훠궈 아카이브
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  하이디라오 & 훠궈·샤브샤브 덕후들을 위한 실전 소스 & 꿀조합 백서
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-medium">#건희소스_2스푼</span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-medium">#새우완자_유부주머니</span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-medium">#토마토리조또</span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-medium">#회전훠궈_맛집</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF4A23]">검증된 황금 레시피 {recipes.length}종</span>
              <span>•</span>
              <span>인기 SNS 꿀조합 & 7초 타이머 실시간 제공</span>
            </div>
            <p className="text-zinc-500">
              Made with passion for hot pot lovers everywhere 🍲
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
