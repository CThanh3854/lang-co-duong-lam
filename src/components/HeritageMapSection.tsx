import {useMemo, useState} from 'react';
import {ArrowUpRight, Compass, MapPin} from 'lucide-react';
import {
  HERITAGE_MAP_NODES,
  MUSEUM_ARTIFACTS,
  type HeritageMapNode,
  type MuseumArtifact,
} from '../data/duongLamArchive';
import {ArtifactImage} from './ArtifactImage';

interface HeritageMapSectionProps {
  onInspectArtifact: (artifact: MuseumArtifact) => void;
}

type RouteFilter = 'all' | 'mong-phu' | 'cam-lam' | 'dong-sang';

export function HeritageMapSection({onInspectArtifact}: HeritageMapSectionProps) {
  const [routeFilter, setRouteFilter] = useState<RouteFilter>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(HERITAGE_MAP_NODES[2].id);

  const visibleNodes = useMemo(
    () =>
      routeFilter === 'all'
        ? HERITAGE_MAP_NODES
        : HERITAGE_MAP_NODES.filter((n) => n.routeGroup === routeFilter),
    [routeFilter],
  );

  const activeNode: HeritageMapNode = useMemo(
    () =>
      visibleNodes.find((n) => n.id === selectedNodeId) ??
      visibleNodes[0] ??
      HERITAGE_MAP_NODES[0],
    [visibleNodes, selectedNodeId],
  );

  const activeArtifact = useMemo(
    () =>
      MUSEUM_ARTIFACTS.find((a) => a.id === activeNode.artifactId) ?? MUSEUM_ARTIFACTS[0],
    [activeNode],
  );

  return (
    <section id="ban-do-di-san" className="border-b border-[#E5DFD3] bg-[#FBF9F5] py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 border-b border-[#E5DFD3] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#8C3B1A]">
              Không gian Phân bố Thực địa
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] text-balance sm:text-4xl">
              Bản đồ Di sản Làng cổ Đường Lâm
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
              Sơ đồ phân bố các cụm di tích xác thực tại ba khu vực trọng tâm: cụm Đất Hai Vua (thôn Cam Lâm), trung tâm kiến trúc đá ong (thôn Mông Phụ) và cổ tự Chùa Mía (thôn Đông Sàng).
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 border border-[#E5DFD3] bg-[#F5F1EA] p-1">
            {[
              {id: 'all', label: 'Toàn vùng di sản'},
              {id: 'mong-phu', label: 'Thôn Mông Phụ'},
              {id: 'cam-lam', label: 'Thôn Cam Lâm'},
              {id: 'dong-sang', label: 'Thôn Đông Sàng'},
            ].map((tab) => {
              const active = routeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRouteFilter(tab.id as RouteFilter)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Interactive Architectural / Topographic SVG Map */}
          <div className="relative overflow-hidden border border-[#E5DFD3] bg-[#F5F1EA] p-4 lg:col-span-7">
            <div className="mb-3 flex items-center justify-between text-xs text-[#57534E]">
              <span className="flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-[#8C3B1A]" aria-hidden="true" />
                <span>Sơ đồ định hướng Xã Đường Lâm · TX. Sơn Tây</span>
              </span>
              <span className="font-mono tabular-nums">21°09′27″B · 105°27′42″Đ</span>
            </div>

            <div className="relative aspect-[16/11] w-full border border-[#DFD7C8] bg-[#FBF9F5]">
              <svg
                viewBox="0 0 800 550"
                className="h-full w-full"
                role="img"
                aria-label="Sơ đồ phân bố di tích Làng cổ Đường Lâm"
              >
                {/* Background Terrain Contours (Đồi Cấm & Triền đồi Xứ Đoài) */}
                <path
                  d="M0,190 Q180,145 310,210 T560,150 T800,190 L800,0 L0,0 Z"
                  fill="#F3EDE2"
                />
                <path
                  d="M40,120 Q160,70 280,125 T420,115"
                  fill="none"
                  stroke="#DED4C2"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M360,310 C420,250 560,255 610,330 C645,385 570,470 460,460 C370,452 325,365 360,310 Z"
                  fill="#EFE8DA"
                  stroke="#D6CEBE"
                  strokeWidth="1.5"
                />

                {/* Village Connecting Roads */}
                <path
                  d="M170,130 L270,190 L416,264 L490,305 L655,242"
                  fill="none"
                  stroke="#D6CEBE"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M416,264 L432,395 L544,363"
                  fill="none"
                  stroke="#D6CEBE"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Hamlet Region Labels */}
                <text x="140" y="74" className="fill-[#78716C] text-[12px] font-medium tracking-widest uppercase">
                  Khu vực Thôn Cam Lâm (Đồi Cấm)
                </text>
                <text x="415" y="232" className="fill-[#78716C] text-[12px] font-medium tracking-widest uppercase">
                  Trung tâm Thôn Mông Phụ
                </text>
                <text x="585" y="195" className="fill-[#78716C] text-[12px] font-medium tracking-widest uppercase">
                  Thôn Đông Sàng
                </text>

                {/* Compass Rose North Arrow */}
                <g transform="translate(745, 55)">
                  <circle cx="0" cy="0" r="20" fill="#FBF9F5" stroke="#D6CEBE" strokeWidth="1" />
                  <path d="M0,-13 L4,3 L0,0 L-4,3 Z" fill="#8C3B1A" />
                  <path d="M0,13 L4,3 L0,0 L-4,3 Z" fill="#A8A29E" />
                  <text x="0" y="-24" textAnchor="middle" className="fill-[#57534E] text-[10px] font-mono">
                    Bắc
                  </text>
                </g>
              </svg>

              {/* Interactive Heritage Pins */}
              {HERITAGE_MAP_NODES.map((node, index) => {
                const isVisible = visibleNodes.some((v) => v.id === node.id);
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      if (!isVisible) setRouteFilter('all');
                      setSelectedNodeId(node.id);
                    }}
                    style={{left: `${node.x}%`, top: `${node.y}%`}}
                    aria-label={`${node.name} - ${node.hamlet}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium shadow-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#8C3B1A] ${
                      !isVisible
                        ? 'opacity-30 border-[#D6CEBE] bg-[#FBF9F5] text-[#78716C]'
                        : isSelected
                          ? 'z-20 scale-105 border-[#8C3B1A] bg-[#8C3B1A] text-[#FBF9F5]'
                          : 'z-10 border-[#1C1917]/30 bg-[#FFFFFF] text-[#1C1917] hover:border-[#8C3B1A]'
                    }`}
                  >
                    <span className="font-mono text-[11px] tabular-nums">{index + 1}</span>
                    <span className="hidden sm:inline whitespace-nowrap">{node.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
              <span>Nhấp vào từng điểm di tích trên sơ đồ để đối chiếu hồ sơ trưng bày.</span>
              <span className="font-mono tabular-nums">{visibleNodes.length} / {HERITAGE_MAP_NODES.length} di tích đang hiển thị</span>
            </div>
          </div>

          {/* Adjacent Monument Info Panel */}
          <div className="flex flex-col justify-between border border-[#E5DFD3] bg-[#FFFFFF] p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
                <span className="flex items-center gap-1.5 font-medium text-[#8C3B1A]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{activeNode.hamlet}</span>
                </span>
                <span className="font-mono tabular-nums">{activeNode.year}</span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917]">
                {activeNode.name}
              </h3>

              <div className="mt-4 aspect-[4/3] w-full overflow-hidden border border-[#EBE6DF] bg-[#EBE6DF]">
                <ArtifactImage
                  src={activeArtifact.imageUrl}
                  alt={activeArtifact.title}
                  fallbackTitle={activeArtifact.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#44403C]">
                {activeNode.shortNote}
              </p>

              <dl className="mt-4 divide-y divide-[#EBE6DF] border-t border-[#EBE6DF] text-xs">
                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#57534E]">Mã lưu trữ</dt>
                  <dd className="font-mono tabular-nums text-[#1C1917]">
                    {activeArtifact.accessionNumber}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-[#57534E] shrink-0">Chất liệu chính</dt>
                  <dd className="text-right text-[#1C1917]">{activeArtifact.material}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EBE6DF]">
              <button
                type="button"
                onClick={() => onInspectArtifact(activeArtifact)}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 border border-[#1C1917] bg-[#1C1917] px-4 py-2 text-xs font-medium text-[#FBF9F5] transition-colors duration-150 hover:bg-[#8C3B1A] hover:border-[#8C3B1A] focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
              >
                <span>Mở hồ sơ di tích & chú giải đầy đủ</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
