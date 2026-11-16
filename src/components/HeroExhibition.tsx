import {ArrowDownRight, Compass} from 'lucide-react';
import {VILLAGE_METADATA} from '../data/duongLamArchive';

interface HeroExhibitionProps {
  onEnterExhibition: () => void;
  onExploreMap: () => void;
}

export function HeroExhibition({onEnterExhibition, onExploreMap}: HeroExhibitionProps) {
  return (
    <section id="tong-quan" className="border-b border-[#E5DFD3] bg-[#FBF9F5]">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#57534E]">
                Triển lãm Di sản Điện tử · Làng cổ Đường Lâm · Phường Sơn Tây · Hà Nội
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#1C1917] text-balance sm:text-5xl">
                Làng cổ Đường Lâm: Ký ức Đá ong & Đất Hai Vua
              </h1>

              <p className="mt-6 max-w-prose text-base leading-[1.75] text-[#44403C] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#8C3B1A]">
                Là ngôi làng cổ đầu tiên ở Việt Nam được Bộ Văn hóa - Thông tin xếp hạng Di tích lịch sử văn hóa Quốc gia năm 2005, Đường Lâm lưu giữ gần như trọn vẹn cấu trúc quần cư cổ truyền của năm thôn cổ Mông Phụ, Đông Sàng, Cam Thịnh, Đoài Giáp và Cam Lâm trên vùng đất Xứ Đoài.
              </p>

              <p className="mt-4 max-w-prose text-[15px] leading-[1.7] text-[#57534E]">
                Không gian bảo tàng số trưng bày các công trình kiến trúc đá ong, gỗ lim, hệ thống 287 pho tượng Chùa Mía cùng tư liệu lịch sử xác thực về Bố Cái Đại Vương Phùng Hưng, Tiền Ngô Vương Ngô Quyền và Thám hoa Giang Văn Minh.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-[#E5DFD3]">
              <button
                type="button"
                onClick={onEnterExhibition}
                className="inline-flex min-h-[44px] items-center gap-2 bg-[#8C3B1A] px-6 py-2.5 text-sm font-medium text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#702D12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C3B1A]"
              >
                <span>Vào phòng trưng bày số</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreMap}
                className="inline-flex min-h-[44px] items-center gap-2 border border-[#D6CEBE] bg-[#F5F1EA] px-5 py-2.5 text-sm font-medium text-[#1C1917] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C3B1A]"
              >
                <Compass className="h-4 w-4 text-[#8C3B1A]" aria-hidden="true" />
                <span>Xem bản đồ thực địa</span>
              </button>
            </div>
          </div>

          <figure className="flex flex-col lg:col-span-6">
            <div className="relative flex-1 overflow-hidden border border-[#E5DFD3] bg-[#EBE6DF]">
              <img
                src="/src/assets/images/duong_lam_gate_hero_1794830405192.jpg"
                alt="Cổng làng Mông Phụ bằng đá ong và mái gỗ cổ tại Làng cổ Đường Lâm, Sơn Tây, Hà Nội"
                referrerPolicy="no-referrer"
                className="h-full min-h-[320px] w-full object-cover lg:h-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FBF9F5]">
                <span className="font-mono tabular-nums tracking-wider">DL-1533-CG</span>
                <span>Thôn Mông Phụ · Dựng năm 1533</span>
              </div>
            </div>
            <figcaption className="mt-2.5 font-serif text-xs italic text-[#57534E]">
              Hình 1 — Cổng làng Mông Phụ kiểu "thượng gia hạ kiều" xây dựng từ đá ong Xứ Đoài năm 1533, bên gốc đa đầu làng.
            </figcaption>
          </figure>
        </div>

        {/* 4-column Institutional Utility Strip */}
        <dl className="mt-12 grid grid-cols-1 border-t border-b border-[#E5DFD3] bg-[#F5F1EA]/70 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-[#E5DFD3] px-5 py-4 sm:border-r lg:border-b-0">
            <dt className="text-xs tracking-wider uppercase text-[#57534E]">Địa danh thực tế</dt>
            <dd className="mt-1 text-sm font-medium text-[#1C1917]">{VILLAGE_METADATA.administrativeLocation}</dd>
            <dd className="mt-0.5 font-mono text-xs tabular-nums text-[#57534E]">{VILLAGE_METADATA.coordinates}</dd>
          </div>

          <div className="border-b border-[#E5DFD3] px-5 py-4 lg:border-r lg:border-b-0">
            <dt className="text-xs tracking-wider uppercase text-[#57534E]">Xếp hạng Di tích Quốc gia</dt>
            <dd className="mt-1 text-sm font-medium text-[#1C1917] tabular-nums">28/11/2005 (Đón bằng 2006)</dd>
            <dd className="mt-0.5 font-mono text-xs text-[#57534E]">QĐ 77/2005/QĐ-BVHTT</dd>
          </div>

          <div className="border-b border-[#E5DFD3] px-5 py-4 sm:border-r sm:border-b-0">
            <dt className="text-xs tracking-wider uppercase text-[#57534E]">Vinh danh Quốc tế</dt>
            <dd className="mt-1 text-sm font-medium text-[#1C1917]">Giải thưởng Bảo tồn UNESCO</dd>
            <dd className="mt-0.5 font-mono text-xs tabular-nums text-[#57534E]">Châu Á - Thái Bình Dương · 2013</dd>
          </div>

          <div className="px-5 py-4">
            <dt className="text-xs tracking-wider uppercase text-[#57534E]">Năm thôn cổ tiêu biểu</dt>
            <dd className="mt-1 text-sm font-medium text-[#1C1917]">
              Mông Phụ · Đông Sàng · Cam Thịnh
            </dd>
            <dd className="mt-0.5 text-xs text-[#57534E]">Đoài Giáp · Cam Lâm</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
