import {useState} from 'react';
import {Bookmark, Menu, X} from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenNotebook: () => void;
}

const NAV_LINKS = [
  {href: '#tong-quan', label: 'Tổng quan'},
  {href: '#phong-trung-bay', label: 'Phòng trưng bày'},
  {href: '#ban-do-di-san', label: 'Bản đồ di sản'},
  {href: '#bien-nien-su', label: 'Biên niên sử'},
  {href: '#kho-luu-tru', label: 'Kho lưu trữ'},
];

export function Header({savedCount, onOpenNotebook}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5DFD3] bg-[#FBF9F5]/95 backdrop-blur-sm no-print">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#tong-quan"
          className="font-serif text-lg font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C3B1A]"
        >
          Bảo tàng Số Đường Lâm
        </a>

        <nav aria-label="Điều hướng chính" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 border-b border-transparent py-1 transition-colors duration-150 hover:border-[#8C3B1A] hover:text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C3B1A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenNotebook}
            className="inline-flex min-h-[40px] items-center gap-2 border border-[#1C1917] bg-[#1C1917] px-4 py-2 text-xs font-medium text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#8C3B1A] hover:border-[#8C3B1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C3B1A]"
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sổ tay tham quan</span>
            <span className="font-mono tabular-nums text-[#EBE6DF]">({savedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Đóng danh mục điều hướng' : 'Mở danh mục điều hướng'}
            aria-expanded={mobileOpen}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#E5DFD3] text-[#1C1917] lg:hidden focus-visible:outline-2 focus-visible:outline-[#8C3B1A]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Điều hướng di động"
          className="border-t border-[#E5DFD3] bg-[#FBF9F5] px-6 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center border-b border-[#EBE6DF] text-sm font-medium text-[#1C1917] hover:text-[#8C3B1A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
