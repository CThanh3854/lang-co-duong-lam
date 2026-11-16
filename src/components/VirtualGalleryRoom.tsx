import {useEffect, useMemo, useState} from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Expand,
  Eye,
  EyeOff,
  MapPin,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  EXHIBITION_HALLS,
  MUSEUM_ARTIFACTS,
  type ArchitecturalHotspot,
  type MuseumArtifact,
} from '../data/duongLamArchive';
import {ArtifactImage} from './ArtifactImage';

interface VirtualGalleryRoomProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onInspectArtifact: (artifact: MuseumArtifact) => void;
}

export function VirtualGalleryRoom({
  savedIds,
  onToggleSave,
  onInspectArtifact,
}: VirtualGalleryRoomProps) {
  const [activeHallId, setActiveHallId] = useState(EXHIBITION_HALLS[0].id);
  const activeHall = useMemo(
    () => EXHIBITION_HALLS.find((h) => h.id === activeHallId) ?? EXHIBITION_HALLS[0],
    [activeHallId],
  );

  const hallArtifacts = useMemo(
    () =>
      activeHall.artifactIds
        .map((id) => MUSEUM_ARTIFACTS.find((a) => a.id === id))
        .filter((a): a is MuseumArtifact => Boolean(a)),
    [activeHall],
  );

  const [selectedArtifactId, setSelectedArtifactId] = useState(activeHall.featuredArtifactId);
  const currentArtifact = useMemo(
    () =>
      hallArtifacts.find((a) => a.id === selectedArtifactId) ??
      hallArtifacts[0] ??
      MUSEUM_ARTIFACTS[0],
    [hallArtifacts, selectedArtifactId],
  );

  const [zoomLevel, setZoomLevel] = useState<1 | 1.75 | 2.5>(1);
  const [origin, setOrigin] = useState({x: 50, y: 50});
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<ArchitecturalHotspot | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    setSelectedArtifactId(activeHall.featuredArtifactId);
    setZoomLevel(1);
    setOrigin({x: 50, y: 50});
    setActiveHotspot(null);
    stopSpeech();
  }, [activeHall]);

  useEffect(() => {
    setZoomLevel(1);
    setOrigin({x: 50, y: 50});
    setActiveHotspot(currentArtifact.hotspots[0] ?? null);
    stopSpeech();
  }, [currentArtifact]);

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  function stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }

  function handleToggleSpeech() {
    if (!speechSupported) return;
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    window.speechSynthesis.cancel();
    const text = `${currentArtifact.title}. ${currentArtifact.period}. ${currentArtifact.summary} ${currentArtifact.curatorialEssay[0] ?? ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.96;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function handleSelectHotspot(hs: ArchitecturalHotspot) {
    setActiveHotspot(hs);
    setOrigin({x: hs.xPercent, y: hs.yPercent});
    if (zoomLevel === 1) {
      setZoomLevel(1.75);
    }
  }

  function handleCycleZoom() {
    setZoomLevel((prev) => {
      if (prev === 1) return 1.75;
      if (prev === 1.75) return 2.5;
      setOrigin({x: 50, y: 50});
      return 1;
    });
  }

  function handleImageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (zoomLevel === 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
    setOrigin({x, y});
  }

  const isSaved = savedIds.includes(currentArtifact.id);

  return (
    <section id="phong-trung-bay" className="border-b border-[#E5DFD3] bg-[#F5F1EA]/45 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Heading & Hall Selector */}
        <div className="flex flex-col gap-6 border-b border-[#E5DFD3] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#8C3B1A]">
              Không gian Trưng bày Điện tử
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] text-balance sm:text-4xl">
              Bốn Phòng Triển lãm Chuyên đề
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
              Chọn từng phòng trưng bày để quan sát chi tiết kiến trúc, điểm chú giải kỹ thuật và nghe thuyết minh tư liệu lịch sử Đường Lâm.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Chọn phòng trưng bày"
            className="flex flex-wrap gap-1.5 border border-[#E5DFD3] bg-[#EBE6DF]/60 p-1"
          >
            {EXHIBITION_HALLS.map((hall) => {
              const active = hall.id === activeHall.id;
              return (
                <button
                  key={hall.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveHallId(hall.id)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#8C3B1A] ${
                    active
                      ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {hall.indexLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curatorial Intro & Artifact Switcher inside Active Hall */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <span className="font-mono uppercase tracking-wider text-[#8C3B1A]">{activeHall.indexLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeHall.subtitle}</span>
            </div>
            <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#1C1917]">
              {activeHall.title}
            </h3>
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-[#44403C]">
              {activeHall.curatorialStatement}
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wider uppercase text-[#57534E]">
              Hiện vật trong phòng ({hallArtifacts.length})
            </p>
            <div className="mt-2.5 flex flex-col gap-2">
              {hallArtifacts.map((artifact) => {
                const selected = artifact.id === currentArtifact.id;
                return (
                  <button
                    key={artifact.id}
                    type="button"
                    onClick={() => setSelectedArtifactId(artifact.id)}
                    className={`flex min-h-[44px] w-full items-center justify-between gap-3 border px-4 py-2.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#8C3B1A] ${
                      selected
                        ? 'border-[#8C3B1A] bg-[#FFFFFF] text-[#1C1917]'
                        : 'border-[#E5DFD3] bg-[#FBF9F5] text-[#57534E] hover:border-[#C7BDA9] hover:text-[#1C1917]'
                    }`}
                  >
                    <span className="truncate text-sm font-medium">{artifact.title}</span>
                    <span className="font-mono text-xs tabular-nums text-[#57534E] shrink-0">
                      {artifact.accessionNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Interactive Gallery Stage */}
        <div className="mt-8 grid grid-cols-1 gap-8 border border-[#E5DFD3] bg-[#FFFFFF] p-4 sm:p-6 lg:grid-cols-12">
          {/* Left 7 cols: Interactive Viewer */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBE6DF] pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs text-[#57534E]">
                <span className="font-mono tabular-nums text-[#1C1917]">
                  Tỷ lệ {zoomLevel}×
                </span>
                <span aria-hidden="true">·</span>
                <span>{zoomLevel > 1 ? 'Di chuột để soi chi tiết' : 'Nhấp điểm chú giải trên ảnh'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHotspots((v) => !v)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 border border-[#E5DFD3] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0 hover:border-[#1C1917] focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
                >
                  {showHotspots ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Ẩn điểm chú giải</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Hiện điểm chú giải</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCycleZoom}
                  className="inline-flex min-h-[36px] items-center gap-1.5 border border-[#E5DFD3] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0 hover:border-[#1C1917] focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
                >
                  {zoomLevel === 2.5 ? (
                    <>
                      <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Thu về 1×</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Phóng to</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onInspectArtifact(currentArtifact)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 border border-[#E5DFD3] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0 hover:border-[#1C1917] focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Hồ sơ đầy đủ</span>
                </button>
              </div>
            </div>

            {/* Artwork Frame */}
            <div
              onMouseMove={handleImageMouseMove}
              className={`relative aspect-[4/3] w-full overflow-hidden border border-[#E5DFD3] bg-[#EBE6DF] ${
                zoomLevel > 1 ? 'cursor-crosshair' : ''
              }`}
            >
              <ArtifactImage
                src={currentArtifact.imageUrl}
                alt={currentArtifact.title}
                fallbackTitle={currentArtifact.title}
                zoomScale={zoomLevel}
                originPercent={origin}
                className="h-full w-full object-cover"
              />

              {/* Hotspot Markers (only visible at 1x or centered) */}
              {showHotspots &&
                zoomLevel === 1 &&
                currentArtifact.hotspots.map((hs, idx) => {
                  const isActive = activeHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => handleSelectHotspot(hs)}
                      aria-label={`Xem chú giải: ${hs.label}`}
                      style={{left: `${hs.xPercent}%`, top: `${hs.yPercent}%`}}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border font-mono text-xs font-semibold tabular-nums shadow-sm transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C3B1A] ${
                        isActive
                          ? 'border-[#FBF9F5] bg-[#8C3B1A] text-[#FBF9F5]'
                          : 'border-[#1C1917] bg-[#FBF9F5]/95 text-[#1C1917]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
            </div>

            <p className="mt-2.5 font-serif text-xs italic text-[#57534E]">
              {currentArtifact.imageCaption}
            </p>

            {/* Active Hotspot Callout Box */}
            {currentArtifact.hotspots.length > 0 && (
              <div className="mt-4 border-t border-[#EBE6DF] pt-4">
                <div className="flex flex-wrap gap-2">
                  {currentArtifact.hotspots.map((hs, idx) => {
                    const active = activeHotspot?.id === hs.id;
                    return (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => handleSelectHotspot(hs)}
                        className={`min-h-[36px] border px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                          active
                            ? 'border-[#8C3B1A] bg-[#8C3B1A]/10 text-[#8C3B1A]'
                            : 'border-[#E5DFD3] bg-[#FBF9F5] text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        <span className="font-mono mr-1.5 tabular-nums">{idx + 1}.</span>
                        {hs.label}
                      </button>
                    );
                  })}
                </div>
                {activeHotspot && (
                  <p className="mt-3 text-sm leading-relaxed text-[#44403C]">
                    <span className="font-semibold text-[#1C1917]">{activeHotspot.label}: </span>
                    {activeHotspot.detail}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right 5 cols: Museum Placard & Narration */}
          <div className="flex flex-col justify-between border-t border-[#EBE6DF] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-[#57534E]">
                <span className="font-mono tabular-nums tracking-wider text-[#8C3B1A]">
                  MÃ HỒ SƠ: {currentArtifact.accessionNumber}
                </span>
                <span>{currentArtifact.category}</span>
              </div>

              <h4 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917] text-balance">
                {currentArtifact.title}
              </h4>
              <p className="mt-1 text-sm text-[#57534E]">{currentArtifact.subtitle}</p>

              <dl className="mt-5 divide-y divide-[#EBE6DF] border-t border-b border-[#EBE6DF] text-sm">
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Niên đại</dt>
                  <dd className="col-span-2 text-[#1C1917] tabular-nums">{currentArtifact.period}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Vị trí</dt>
                  <dd className="col-span-2 flex items-start gap-1.5 text-[#1C1917]">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C3B1A]" aria-hidden="true" />
                    <span>{currentArtifact.location}</span>
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Chất liệu</dt>
                  <dd className="col-span-2 text-[#1C1917]">{currentArtifact.material}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Quy mô</dt>
                  <dd className="col-span-2 text-[#1C1917]">{currentArtifact.dimensionsOrScale}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-xs font-medium tracking-wider uppercase text-[#57534E]">
                  Diễn giải trưng bày
                </p>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#44403C]">
                  {currentArtifact.summary}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#EBE6DF] pt-5">
              {speechSupported && (
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`inline-flex min-h-[40px] items-center gap-2 border px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#8C3B1A] ${
                    isSpeaking
                      ? 'border-[#8C3B1A] bg-[#8C3B1A] text-[#FBF9F5]'
                      : 'border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:border-[#1C1917]'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Dừng thuyết minh</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5 text-[#8C3B1A]" aria-hidden="true" />
                      <span>Nghe thuyết minh</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => onToggleSave(currentArtifact.id)}
                className={`inline-flex min-h-[40px] items-center gap-2 border px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#8C3B1A] ${
                  isSaved
                    ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                    : 'border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917] hover:border-[#1C1917]'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Đã lưu vào sổ tay</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Lưu vào sổ tay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
