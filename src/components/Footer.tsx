import {VILLAGE_METADATA} from '../data/duongLamArchive';

export function Footer() {
  return (
    <footer className="bg-[#F5F1EA] py-12 text-sm text-[#57534E]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-[#DFD7C8] pb-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-lg font-semibold text-[#1C1917]">
              {VILLAGE_METADATA.institutionName}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-[#57534E]">
              Không gian trưng bày điện tử giới thiệu di sản vật thể và phi vật thể tại {VILLAGE_METADATA.administrativeLocation}. Toàn bộ địa danh, niên đại và thông số di tích đều đối chiếu từ hồ sơ xếp hạng Di tích Quốc gia (77/2005/QĐ-BVHTT) và tư liệu văn bia địa phương.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[#1C1917]">
              Danh mục khu vực
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a href="#tong-quan" className="hover:text-[#8C3B1A]">
                  Tổng quan di sản
                </a>
              </li>
              <li>
                <a href="#phong-trung-bay" className="hover:text-[#8C3B1A]">
                  Phòng trưng bày điện tử
                </a>
              </li>
              <li>
                <a href="#ban-do-di-san" className="hover:text-[#8C3B1A]">
                  Bản đồ thực địa Đường Lâm
                </a>
              </li>
              <li>
                <a href="#bien-nien-su" className="hover:text-[#8C3B1A]">
                  Biên niên sử thế kỷ VIII – XXI
                </a>
              </li>
              <li>
                <a href="#kho-luu-tru" className="hover:text-[#8C3B1A]">
                  Kho lưu trữ hiện vật
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[#1C1917]">
              Thông tin địa danh thực
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div>
                <dt className="text-[#78716C]">Đơn vị hành chính</dt>
                <dd className="text-[#1C1917]">{VILLAGE_METADATA.administrativeLocation}</dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Tọa độ trung tâm</dt>
                <dd className="font-mono tabular-nums text-[#1C1917]">
                  {VILLAGE_METADATA.coordinates}
                </dd>
              </div>
              <div>
                <dt className="text-[#78716C]">Vinh danh UNESCO</dt>
                <dd className="text-[#1C1917]">Châu Á - Thái Bình Dương (2013)</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-[#78716C] sm:flex-row sm:items-center sm:justify-between">
          <p>Bảo tàng Số Làng cổ Đường Lâm — Tư liệu di sản Xứ Đoài</p>
          <p>Dữ liệu lịch sử kiểm chứng · Không hư cấu</p>
        </div>
      </div>
    </footer>
  );
}
