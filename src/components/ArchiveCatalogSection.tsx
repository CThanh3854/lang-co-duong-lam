import {useMemo, useState} from 'react';
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import {
  MUSEUM_ARTIFACTS,
  type ArtifactCategory,
  type MuseumArtifact,
} from '../data/duongLamArchive';
import {ArtifactImage} from './ArtifactImage';

interface ArchiveCatalogSectionProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onInspectArtifact: (artifact: MuseumArtifact) => void;
}

const CATEGORIES: ArtifactCategory[] = [
  'Tất cả',
  'Kiến trúc làng',
  'Tín ngưỡng & Tôn giáo',
  'Di tích Danh nhân',
  'Dân sinh & Phi vật thể',
];

export function ArchiveCatalogSection({
  savedIds,
  onToggleSave,
  onInspectArtifact,
}: ArchiveCatalogSectionProps) {
  const [category, setCategory] = useState<ArtifactCategory>('Tất cả');
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredArtifacts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MUSEUM_ARTIFACTS.filter((item) => {
      const matchCategory = category === 'Tất cả' || item.category === category;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.accessionNumber.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.period.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <section id="kho-luu-tru" className="border-b border-[#E5DFD3] bg-[#FBF9F5] py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 border-b border-[#E5DFD3] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#8C3B1A]">
              Danh mục Hồ sơ Hiện vật & Di sản
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] text-balance sm:text-4xl">
              Kho lưu trữ Di sản Đường Lâm
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
              Tra cứu hồ sơ kiểm kê từng công trình kiến trúc, di tích danh nhân và tri thức dân gian theo mã lưu trữ, chất liệu và niên đại.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="flex border border-[#E5DFD3] bg-[#F5F1EA] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Hiển thị dạng lưới trưng bày"
                className={`inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 ${
                  viewMode === 'grid'
                    ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Lưới trưng bày</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Hiển thị dạng bảng kiểm kê"
                className={`inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 ${
                  viewMode === 'table'
                    ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Bảng kiểm kê</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`min-h-[38px] border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                      : 'border-[#E5DFD3] bg-[#FFFFFF] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên di tích, chất liệu, năm..."
              aria-label="Tìm kiếm trong kho lưu trữ di sản"
              className="min-h-[40px] w-full border border-[#D6CEBE] bg-[#FFFFFF] pl-9 pr-3 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#8C3B1A] focus:outline-none"
            />
          </div>
        </div>

        {/* Results */}
        {filteredArtifacts.length === 0 ? (
          <div className="mt-10 border border-[#E5DFD3] bg-[#F5F1EA] p-10 text-center">
            <p className="font-serif text-lg font-medium text-[#1C1917]">
              Không tìm thấy hồ sơ phù hợp với từ khóa "{query}"
            </p>
            <p className="mt-1 text-sm text-[#57534E]">
              Thử xóa bộ lọc hoặc tìm theo tên thôn (Mông Phụ, Cam Lâm, Đông Sàng) hoặc chất liệu (đá ong, gỗ lim).
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('Tất cả');
                setQuery('');
              }}
              className="mt-4 inline-flex min-h-[40px] items-center border border-[#1C1917] bg-[#FFFFFF] px-4 py-2 text-xs font-medium text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FBF9F5]"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArtifacts.map((artifact) => {
              const saved = savedIds.includes(artifact.id);
              return (
                <article
                  key={artifact.id}
                  className="flex flex-col justify-between border border-[#E5DFD3] bg-[#FFFFFF] transition-colors duration-150 hover:border-[#B6AC99]"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onInspectArtifact(artifact)}
                      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#EBE6DF] bg-[#EBE6DF]">
                        <ArtifactImage
                          src={artifact.imageUrl}
                          alt={artifact.title}
                          fallbackTitle={artifact.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="p-5 pb-3">
                        <div className="flex items-center gap-2 text-xs text-[#57534E]">
                          <span className="font-mono tabular-nums text-[#8C3B1A]">
                            {artifact.accessionNumber}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{artifact.category}</span>
                        </div>

                        <h3 className="mt-2 font-serif text-xl font-semibold text-[#1C1917] group-hover:text-[#8C3B1A] transition-colors">
                          {artifact.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-[#57534E] tabular-nums">
                          {artifact.period}
                        </p>
                        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#44403C]">
                          {artifact.summary}
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#EBE6DF] px-5 py-3.5">
                    <button
                      type="button"
                      onClick={() => onInspectArtifact(artifact)}
                      className="inline-flex min-h-[36px] items-center gap-1 text-xs font-medium text-[#1C1917] hover:text-[#8C3B1A]"
                    >
                      <span>Xem hồ sơ</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleSave(artifact.id)}
                      aria-label={saved ? `Bỏ lưu ${artifact.title}` : `Lưu ${artifact.title} vào sổ tay`}
                      className={`inline-flex min-h-[36px] items-center gap-1.5 border px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                        saved
                          ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                          : 'border-[#E5DFD3] bg-[#FBF9F5] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
                      }`}
                    >
                      {saved ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Đã lưu</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Lưu</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto border border-[#E5DFD3] bg-[#FFFFFF]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E5DFD3] bg-[#F5F1EA] text-xs uppercase tracking-wider text-[#57534E]">
                  <th className="px-4 py-3 font-medium">Mã lưu trữ</th>
                  <th className="px-4 py-3 font-medium">Tên di tích / hiện vật</th>
                  <th className="px-4 py-3 font-medium">Niên đại</th>
                  <th className="px-4 py-3 font-medium">Địa điểm</th>
                  <th className="px-4 py-3 font-medium">Chất liệu</th>
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DF]">
                {filteredArtifacts.map((artifact) => (
                  <tr key={artifact.id} className="hover:bg-[#FBF9F5]">
                    <td className="px-4 py-3.5 font-mono text-xs tabular-nums text-[#8C3B1A] whitespace-nowrap">
                      {artifact.accessionNumber}
                    </td>
                    <td className="px-4 py-3.5 font-serif font-semibold text-[#1C1917]">
                      {artifact.title}
                    </td>
                    <td className="px-4 py-3.5 text-xs tabular-nums text-[#44403C]">
                      {artifact.period}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#44403C]">{artifact.location}</td>
                    <td className="px-4 py-3.5 text-xs text-[#57534E]">{artifact.material}</td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onInspectArtifact(artifact)}
                        className="inline-flex min-h-[34px] items-center gap-1 border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1 text-xs font-medium text-[#1C1917] hover:border-[#8C3B1A] hover:text-[#8C3B1A]"
                      >
                        <span>Mở hồ sơ</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
