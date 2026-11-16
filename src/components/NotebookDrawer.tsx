import {useEffect} from 'react';
import {ArrowUpRight, Printer, Trash2, X} from 'lucide-react';
import {MUSEUM_ARTIFACTS, type MuseumArtifact} from '../data/duongLamArchive';

interface NotebookDrawerProps {
  open: boolean;
  savedIds: string[];
  notesById: Record<string, string>;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onInspectArtifact: (artifact: MuseumArtifact) => void;
}

export function NotebookDrawer({
  open,
  savedIds,
  notesById,
  onClose,
  onRemove,
  onUpdateNote,
  onInspectArtifact,
}: NotebookDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const savedArtifacts = savedIds
    .map((id) => MUSEUM_ARTIFACTS.find((a) => a.id === id))
    .filter((a): a is MuseumArtifact => Boolean(a));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sổ tay tham quan cá nhân"
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col border-l border-[#D6CEBE] bg-[#FBF9F5] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#E5DFD3] px-6 py-4 no-print">
          <div>
            <p className="text-xs font-medium tracking-wider uppercase text-[#8C3B1A]">
              Sổ tay Nghiên cứu & Tham quan
            </p>
            <h2 className="mt-0.5 font-serif text-xl font-semibold text-[#1C1917]">
              Hồ sơ đã lưu ({savedArtifacts.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng sổ tay"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center border border-[#D6CEBE] bg-[#FFFFFF] text-[#1C1917] hover:border-[#1C1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {savedArtifacts.length === 0 ? (
            <div className="border border-[#E5DFD3] bg-[#F5F1EA] p-8 text-center">
              <p className="font-serif text-lg font-medium text-[#1C1917]">
                Sổ tay tham quan hiện chưa có hồ sơ nào
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                Nhấn nút "Lưu vào sổ tay" tại phòng trưng bày hoặc kho lưu trữ để lập danh mục nghiên cứu riêng về các di tích Làng cổ Đường Lâm.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedArtifacts.map((artifact) => (
                <li
                  key={artifact.id}
                  className="border border-[#E5DFD3] bg-[#FFFFFF] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs tabular-nums text-[#8C3B1A]">
                        {artifact.accessionNumber}
                      </span>
                      <h3 className="mt-0.5 font-serif text-lg font-semibold text-[#1C1917]">
                        {artifact.title}
                      </h3>
                      <p className="text-xs text-[#57534E]">{artifact.location}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(artifact.id)}
                      aria-label={`Xóa ${artifact.title} khỏi sổ tay`}
                      className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-[#E5DFD3] text-[#57534E] hover:border-[#8C3B1A] hover:text-[#8C3B1A] no-print"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor={`note-${artifact.id}`}
                      className="block text-xs font-medium text-[#57534E]"
                    >
                      Ghi chú thực địa / học tập
                    </label>
                    <textarea
                      id={`note-${artifact.id}`}
                      rows={2}
                      value={notesById[artifact.id] ?? ''}
                      onChange={(e) => onUpdateNote(artifact.id, e.target.value)}
                      placeholder="Ghi lại chi tiết kiến trúc hoặc câu hỏi nghiên cứu..."
                      className="mt-1 w-full border border-[#E5DFD3] bg-[#FBF9F5] p-2.5 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:border-[#8C3B1A] focus:outline-none"
                    />
                  </div>

                  <div className="mt-3 flex justify-end no-print">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onInspectArtifact(artifact);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#8C3B1A] hover:underline"
                    >
                      <span>Mở hồ sơ đầy đủ</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {savedArtifacts.length > 0 && (
          <div className="border-t border-[#E5DFD3] bg-[#F5F1EA] px-6 py-4 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 border border-[#1C1917] bg-[#1C1917] px-4 py-2 text-xs font-medium text-[#FBF9F5] hover:bg-[#8C3B1A] hover:border-[#8C3B1A]"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>In phiếu tổng hợp tham quan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
