import {useEffect, useState} from 'react';
import {Bookmark, BookmarkCheck, X, ZoomIn, ZoomOut} from 'lucide-react';
import {type MuseumArtifact} from '../data/duongLamArchive';
import {ArtifactImage} from './ArtifactImage';

interface ArtifactModalProps {
  artifact: MuseumArtifact | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
}

export function ArtifactModal({
  artifact,
  isSaved,
  onClose,
  onToggleSave,
}: ArtifactModalProps) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({x: 50, y: 50});

  useEffect(() => {
    setZoomed(false);
    setOrigin({x: 50, y: 50});
  }, [artifact]);

  useEffect(() => {
    if (!artifact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artifact, onClose]);

  if (!artifact) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-artifact-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/70 p-4 backdrop-blur-xs sm:p-6 no-print"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-[#D6CEBE] bg-[#FBF9F5] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#E5DFD3] bg-[#FBF9F5]/95 px-6 py-4 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-xs text-[#57534E]">
            <span className="font-mono tabular-nums text-[#8C3B1A]">
              {artifact.accessionNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>{artifact.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleSave(artifact.id)}
              className={`inline-flex min-h-[38px] items-center gap-1.5 border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isSaved
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                  : 'border-[#D6CEBE] bg-[#FFFFFF] text-[#1C1917] hover:border-[#1C1917]'
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

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng hồ sơ hiện vật"
              className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center border border-[#D6CEBE] bg-[#FFFFFF] text-[#1C1917] hover:border-[#1C1917]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Artwork Viewer */}
            <div className="lg:col-span-6">
              <div
                onMouseMove={(e) => {
                  if (!zoomed) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setOrigin({
                    x: Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)),
                    y: Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100)),
                  });
                }}
                className={`relative aspect-[4/3] w-full overflow-hidden border border-[#E5DFD3] bg-[#EBE6DF] ${
                  zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setZoomed((z) => !z)}
              >
                <ArtifactImage
                  src={artifact.imageUrl}
                  alt={artifact.title}
                  fallbackTitle={artifact.title}
                  zoomScale={zoomed ? 2 : 1}
                  originPercent={origin}
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-[#E5DFD3] bg-[#FBF9F5]/90 px-2.5 py-1 text-xs font-medium text-[#1C1917]">
                  {zoomed ? (
                    <>
                      <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Thu nhỏ 1×</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Phóng to 2×</span>
                    </>
                  )}
                </span>
              </div>
              <p className="mt-2.5 font-serif text-xs italic text-[#57534E]">
                {artifact.imageCaption}
              </p>

              {/* Accession Metadata Grid */}
              <dl className="mt-6 divide-y divide-[#E5DFD3] border-t border-b border-[#E5DFD3] text-sm">
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Mã lưu trữ</dt>
                  <dd className="col-span-2 font-mono tabular-nums text-[#1C1917]">
                    {artifact.accessionNumber}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Niên đại</dt>
                  <dd className="col-span-2 tabular-nums text-[#1C1917]">{artifact.period}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Vị trí thực tế</dt>
                  <dd className="col-span-2 text-[#1C1917]">{artifact.location}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Chất liệu</dt>
                  <dd className="col-span-2 text-[#1C1917]">{artifact.material}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Quy mô</dt>
                  <dd className="col-span-2 text-[#1C1917]">{artifact.dimensionsOrScale}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Bảo tồn</dt>
                  <dd className="col-span-2 text-[#1C1917]">{artifact.conservationStatus}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#57534E]">Nguồn tư liệu</dt>
                  <dd className="col-span-2 text-[#57534E]">{artifact.sourceCitation}</dd>
                </div>
              </dl>
            </div>

            {/* Right Curatorial Essay */}
            <div className="lg:col-span-6">
              <h2
                id="modal-artifact-title"
                className="font-serif text-3xl font-semibold text-[#1C1917] text-balance"
              >
                {artifact.title}
              </h2>
              <p className="mt-1.5 text-sm font-medium text-[#8C3B1A]">{artifact.subtitle}</p>

              <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-[#292524]">
                <p className="font-medium text-[#1C1917]">{artifact.summary}</p>
                {artifact.curatorialEssay.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {artifact.footnotes.length > 0 && (
                <div className="mt-8 border-t border-[#E5DFD3] pt-5">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[#57534E]">
                    Chú thích & Khảo chứng
                  </h3>
                  <ol className="mt-3 space-y-2 text-xs leading-relaxed text-[#57534E]">
                    {artifact.footnotes.map((note, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="font-mono tabular-nums text-[#8C3B1A]">[{idx + 1}]</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-8 border-t border-[#E5DFD3] pt-5">
                <p className="text-xs text-[#57534E]">
                  Xuất xứ hồ sơ: <span className="text-[#1C1917]">{artifact.provenance}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
