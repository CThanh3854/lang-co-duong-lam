import {useMemo, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {
  CHRONOLOGY_MILESTONES,
  MUSEUM_ARTIFACTS,
  type ChronologyMilestone,
  type MuseumArtifact,
} from '../data/duongLamArchive';

interface ChronologySectionProps {
  onInspectArtifact: (artifact: MuseumArtifact) => void;
}

type EraFilter = 'Tất cả' | ChronologyMilestone['eraGroup'];

const ERA_FILTERS: EraFilter[] = [
  'Tất cả',
  'Thế kỷ VIII – X',
  'Thế kỷ XVI – XVII',
  'Thế kỷ XVIII – XIX',
  'Thế kỷ XX – XXI',
];

export function ChronologySection({onInspectArtifact}: ChronologySectionProps) {
  const [eraFilter, setEraFilter] = useState<EraFilter>('Tất cả');

  const filteredMilestones = useMemo(
    () =>
      eraFilter === 'Tất cả'
        ? CHRONOLOGY_MILESTONES
        : CHRONOLOGY_MILESTONES.filter((m) => m.eraGroup === eraFilter),
    [eraFilter],
  );

  return (
    <section id="bien-nien-su" className="border-b border-[#E5DFD3] bg-[#F5F1EA]/55 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 border-b border-[#E5DFD3] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#8C3B1A]">
              Dòng thời gian Lịch sử
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] text-balance sm:text-4xl">
              Biên niên sử Đường Lâm (Thế kỷ VIII – XXI)
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
              Các mốc niên đại trọng yếu được đối chiếu từ văn bia, sắc phong cổ, tư liệu Viện Hán Nôm và hồ sơ xếp hạng Di tích Quốc gia.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 border border-[#E5DFD3] bg-[#EBE6DF]/60 p-1">
            {ERA_FILTERS.map((era) => {
              const active = eraFilter === era;
              return (
                <button
                  key={era}
                  type="button"
                  onClick={() => setEraFilter(era)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {era}
                </button>
              );
            })}
          </div>
        </div>

        <ol className="mt-8 divide-y divide-[#E5DFD3] border-b border-[#E5DFD3]">
          {filteredMilestones.map((item) => {
            const linkedArtifact = item.relatedArtifactId
              ? MUSEUM_ARTIFACTS.find((a) => a.id === item.relatedArtifactId)
              : undefined;
            return (
              <li
                key={item.id}
                className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-baseline lg:gap-8"
              >
                <div className="lg:col-span-3">
                  <span className="font-mono text-base font-medium tabular-nums text-[#8C3B1A]">
                    {item.yearLabel}
                  </span>
                  <p className="mt-1 text-xs text-[#57534E]">
                    {item.eraGroup} · {item.location}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#44403C]">
                    {item.description}
                  </p>
                </div>

                <div className="lg:col-span-2 lg:text-right">
                  {linkedArtifact && (
                    <button
                      type="button"
                      onClick={() => onInspectArtifact(linkedArtifact)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0 hover:border-[#8C3B1A] hover:text-[#8C3B1A]"
                    >
                      <span>Xem di tích</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
