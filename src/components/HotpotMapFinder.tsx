import React, { useState, useMemo } from 'react';
import { POPULAR_HOTPOT_RESTAURANTS } from '../data/restaurantData';
import { RestaurantItem } from '../types/restaurant';
import noodleDanceImg from '../assets/images/haidilao_noodle_dance_1789708714928.jpg';
import {
  MapPin,
  Navigation,
  Star,
  Phone,
  Clock,
  ExternalLink,
  Sparkles,
  Compass,
  DollarSign
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HotpotMapFinderProps {
  onSelectSauceShortcut: (sauceNameKeyword: string) => void;
}

export const HotpotMapFinder: React.FC<HotpotMapFinderProps> = ({
  onSelectSauceShortcut,
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string }>({
    lat: 37.4979,
    lng: 127.0276,
    name: '서울 강남·서초 권역',
  });

  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('기준 위치(서울 중심) 기준 거리순으로 정렬되었습니다.');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeRestaurant, setActiveRestaurant] = useState<RestaurantItem>(
    POPULAR_HOTPOT_RESTAURANTS[0]
  );
  const [activeDetailTab, setActiveDetailTab] = useState<'menus' | 'sauce' | 'reviews'>('menus');

  // Request actual Geolocation
  const handleRequestLocation = () => {
    sound.playScoop();
    if (!navigator.geolocation) {
      setLocationStatus('브라우저가 위치 정보를 지원하지 않아 기본 서울 권역으로 유지합니다.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('내 현재 GPS 위치를 확인하는 중입니다...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: '내 현재 위치',
        });
        setLocationStatus('현재 위치를 반영하여 가까운 순서대로 정렬되었습니다.');
        sound.playChime();
      },
      () => {
        setIsLocating(false);
        setLocationStatus('위치 권한을 불러올 수 없어 서울 주요 훠궈 권역 기준으로 안내합니다.');
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // Haversine distance calculator
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  // Filtered & sorted restaurants
  const sortedRestaurants = useMemo(() => {
    return POPULAR_HOTPOT_RESTAURANTS.map((item) => {
      const dist = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        item.lat,
        item.lng
      );
      return {
        ...item,
        distanceKm: dist,
      };
    })
      .filter((item) => {
        if (selectedCategory === 'all') return true;
        return item.category === selectedCategory;
      })
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [userLocation, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF4A23] text-xs font-bold mb-3 border border-orange-200/80">
              <Compass className="w-3.5 h-3.5 text-[#FF4A23]" />
              <span>HOTPOT RADAR • 내 주변 훠궈·샤브 스팟 큐레이션</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              내 주변 훠궈 & 회전 샤브샤브 맛집 지도
            </h1>
            <p className="mt-2 text-zinc-500 text-sm sm:text-base leading-relaxed">
              하이디라오 전 지점부터 가성비 좋은 회전식 훠궈, 정통 일식 1인 샤브샤브 매장까지
              실시간 지도 위치, 대표 메뉴, 소스 셀프바 구성 정보를 한눈에 확인하세요.
            </p>
          </div>

          {/* Location button */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
            <button
              onClick={handleRequestLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? '위치 측정 중...' : '내 현재 위치로 재정렬'}</span>
            </button>
            <span className="text-[11px] text-zinc-400 max-w-xs text-left lg:text-right">
              {locationStatus}
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: '전체 매장' },
            { id: 'haidilao', label: '하이디라오 (Haidilao)' },
            { id: 'rotary', label: '회전식 훠궈 / 1인 팟' },
            { id: 'shabu', label: '정통 샤브샤브' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playScoop();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FF4A23] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80 border border-zinc-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* HAIDILAO NOODLE DANCE CULINARY FEATURE SPOTLIGHT */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 border border-zinc-200 shadow-xs">
            <img
              src={noodleDanceImg}
              alt="하이디라오 쿵푸 수타면 퍼포먼스"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF4A23] text-white font-black text-[10px] tracking-wide uppercase inline-block mb-1 shadow-xs">
                HAIDILAO SIGNATURE
              </span>
              <p className="text-sm text-white font-black">
                하이디라오 특제 쿵푸 수타면(捞面)
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-[#FF4A23]" />
              <span>하이디라오 방문 시 절대 놓치면 안 되는 시그니처</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 leading-snug">
              테이블 바로 앞에서 펼쳐지는 쿵푸 수타면 퍼포먼스
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              하이디라오에서 ‘특제면’(수타면, 약 3,500원)을 주문하면 전담 면 마스터가 신나는 음악과 함께
              테이블 앞에서 반죽을 공중으로 날리며 현란한 퍼포먼스를 선보인 후 원하는 탕에 즉석에서 면을 넣어줍니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <span className="text-amber-800 font-bold text-xs block mb-1">💡 추천 육수 조합</span>
                <p className="text-[12px] text-amber-900 leading-relaxed">
                  토마토탕이나 마라 홍탕에 넣었을 때 쫄깃한 면발에 양념이 깊게 배어들어 가장 맛있습니다.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/60">
                <span className="text-[#FF4A23] font-bold text-xs block mb-1">💡 맛있게 먹는 소스 조합</span>
                <p className="text-[12px] text-orange-950 leading-relaxed">
                  ‘원어스 건희 소스’에 익힌 수타면을 비벼 먹으면 극상의 비빔면이 완성됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STORE EXPLORER: MAP + LIST + DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map & Restaurant List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real Google Map Embed */}
          <div className="relative h-72 rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xs">
            <iframe
              title={`Google Map - ${activeRestaurant.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer"
              src={`https://maps.google.com/maps?q=${activeRestaurant.lat},${activeRestaurant.lng}&hl=ko&z=15&output=embed`}
            />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-900 border border-zinc-200 shadow-2xs flex items-center gap-1.5 pointer-events-auto">
                <MapPin className="w-3.5 h-3.5 text-[#FF4A23]" />
                <span>{activeRestaurant.name}</span>
              </span>
              <span className="bg-[#FF4A23] text-white font-black text-[11px] px-2.5 py-1 rounded-xl shadow-xs pointer-events-auto">
                약 {activeRestaurant.distanceKm} km
              </span>
            </div>
          </div>

          {/* Restaurant List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
              <span className="font-bold text-zinc-900">매장 목록 ({sortedRestaurants.length}곳)</span>
              <span>거리순 정렬</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {sortedRestaurants.map((shop) => {
                const isSelected = activeRestaurant.id === shop.id;
                return (
                  <button
                    key={shop.id}
                    onClick={() => {
                      sound.playScoop();
                      setActiveRestaurant(shop);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#FF4A23] shadow-xs ring-1 ring-[#FF4A23]/30'
                        : 'bg-white border-zinc-200/80 text-zinc-600 hover:border-[#FF4A23]/50 hover:text-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                            {shop.categoryLabel}
                          </span>
                          <span className="text-xs font-black text-zinc-900">{shop.name}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF4A23] shrink-0" />
                          <span className="line-clamp-1">{shop.address}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-orange-50 text-[#FF4A23] border border-orange-200/80 font-bold text-xs font-mono">
                          {shop.distanceKm} km
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-500 mt-1 justify-end font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{shop.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Restaurant Full Details (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-6">
          {/* Store Title & Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF4A23] border border-orange-200/80">
                  {activeRestaurant.categoryLabel}
                </span>
                <span className="text-xs text-zinc-400">
                  거리: <strong className="text-zinc-800">{activeRestaurant.distanceKm} km</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 break-keep">
                {activeRestaurant.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 break-keep">
                {activeRestaurant.tag}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeRestaurant.name + ' ' + activeRestaurant.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white font-bold text-xs transition-colors shadow-xs whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Google Maps 길찾기</span>
              </a>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-2.5 text-zinc-900">
              <MapPin className="w-4 h-4 text-[#FF4A23] shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-400 block mb-0.5">상세 주소</span>
                <span className="font-medium break-keep">{activeRestaurant.address}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-2.5 text-zinc-900">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-400 block mb-0.5">영업 시간</span>
                <span className="font-medium">{activeRestaurant.businessHours}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-2.5 text-zinc-900">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-400 block mb-0.5">전화번호</span>
                <span className="font-medium">{activeRestaurant.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-2.5 text-zinc-900">
              <DollarSign className="w-4 h-4 text-[#FF4A23] shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-400 block mb-0.5">예산대</span>
                <span className="font-medium">{activeRestaurant.priceRange}</span>
              </div>
            </div>
          </div>

          {/* Features pills */}
          <div>
            <span className="text-xs font-bold text-zinc-900 block mb-2">
              매장 편의 & 특장점:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeRestaurant.highlights.map((f: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-600 border border-zinc-200/70 text-xs font-medium"
                >
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation: Menus vs Sauce vs Reviews */}
          <div className="pt-2">
            <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-2">
              {[
                { id: 'menus', label: '대표 시그니처 메뉴' },
                { id: 'sauce', label: '소스 셀프바 구성' },
                { id: 'reviews', label: '방문자 꿀팁 & 리뷰' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveDetailTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDetailTab === t.id
                      ? 'bg-[#FF4A23] text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mt-4">
              {activeDetailTab === 'menus' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeRestaurant.signatureMenus.map((menu, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-900">{menu.name}</span>
                        <span className="font-mono font-bold text-[#FF4A23]">
                          {menu.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        {menu.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === 'sauce' && (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 text-xs">
                      소스 바 특징: {activeRestaurant.name}
                    </span>
                    <button
                      onClick={() => onSelectSauceShortcut(activeRestaurant.category === 'haidilao' ? '건희' : '즈마장')}
                      className="px-3 py-1.5 rounded-xl bg-[#FF4A23] hover:bg-[#E03915] text-white text-[11px] font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      어울리는 소스 레시피 보기
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {activeRestaurant.sauceBarFeature}
                  </p>
                </div>
              )}

              {activeDetailTab === 'reviews' && (
                <div className="space-y-2.5">
                  {activeRestaurant.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="font-bold text-zinc-900">{r.author}</span>
                        <span className="text-[11px] font-mono">{r.date}</span>
                      </div>
                      <p className="text-zinc-600 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
