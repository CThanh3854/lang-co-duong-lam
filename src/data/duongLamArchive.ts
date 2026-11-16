export type ArtifactCategory =
  | 'Tất cả'
  | 'Kiến trúc làng'
  | 'Tín ngưỡng & Tôn giáo'
  | 'Di tích Danh nhân'
  | 'Dân sinh & Phi vật thể';

export interface ArchitecturalHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  label: string;
  detail: string;
}

export interface MuseumArtifact {
  id: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  category: Exclude<ArtifactCategory, 'Tất cả'>;
  hallId: string;
  period: string;
  yearSort: number;
  location: string;
  material: string;
  dimensionsOrScale: string;
  conservationStatus: string;
  provenance: string;
  sourceCitation: string;
  imageUrl: string;
  imageCaption: string;
  summary: string;
  curatorialEssay: string[];
  footnotes: string[];
  hotspots: ArchitecturalHotspot[];
}

export interface ExhibitionHall {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  curatorialStatement: string;
  featuredArtifactId: string;
  artifactIds: string[];
}

export interface HeritageMapNode {
  id: string;
  artifactId: string;
  name: string;
  hamlet: string;
  year: string;
  x: number;
  y: number;
  routeGroup: 'mong-phu' | 'cam-lam' | 'dong-sang';
  shortNote: string;
}

export interface ChronologyMilestone {
  id: string;
  eraGroup: 'Thế kỷ VIII – X' | 'Thế kỷ XVI – XVII' | 'Thế kỷ XVIII – XIX' | 'Thế kỷ XX – XXI';
  yearLabel: string;
  title: string;
  location: string;
  description: string;
  relatedArtifactId?: string;
}

const IMG_GATE = '/src/assets/images/duong_lam_gate_hero_1794830405192.jpg';
const IMG_DINH = '/src/assets/images/mong_phu_communal_house_1794830406462.jpg';
const IMG_CHUA_MIA = '/src/assets/images/chua_mia_pagoda_statues_1794830406746.jpg';
const IMG_ANCIENT_HOUSE = '/src/assets/images/duong_lam_ancient_house_1794830408277.jpg';
const IMG_NGO_QUYEN = '/src/assets/images/ngo_quyen_mausoleum_1794830409089.jpg';

export const VILLAGE_METADATA = {
  institutionName: 'Bảo tàng Số Làng cổ Đường Lâm',
  administrativeLocation: 'Phường Sơn Tây, Thành phố Hà Nội (địa bàn xã Đường Lâm, TX. Sơn Tây cũ)',
  coordinates: '21°09′27″B 105°27′42″Đ',
  ancientHamlets: ['Mông Phụ', 'Đông Sàng', 'Cam Thịnh', 'Đoài Giáp', 'Cam Lâm'],
  nationalDecision: 'Quyết định số 77/2005/QĐ-BVHTT ngày 28/11/2005',
  unescoRecognition: 'Giải thưởng Bảo tồn Di sản Văn hóa UNESCO Châu Á - Thái Bình Dương (2013)',
};

export const EXHIBITION_HALLS: ExhibitionHall[] = [
  {
    id: 'hall-1',
    indexLabel: 'Phòng I',
    title: 'Đá ong Xứ Đoài & Không gian Cổng làng',
    subtitle: 'Cấu trúc phòng thủ và ranh giới cộng đồng thế kỷ XVI',
    curatorialStatement:
      'Bước qua cổng làng Mông Phụ dựng năm 1533, du khách tiếp cận lớp vỏ vật chất đặc trưng nhất của Đường Lâm: đá ong khai thác tại chỗ kết hợp đường gạch nghiêng hình xương cá dẫn vào trung tâm quần cư.',
    featuredArtifactId: 'cong-mong-phu',
    artifactIds: ['cong-mong-phu', 'gieng-co-tuong-nep'],
  },
  {
    id: 'hall-2',
    indexLabel: 'Phòng II',
    title: 'Đình Mông Phụ & Cổ tự Chùa Mía',
    subtitle: 'Kiến trúc gỗ lim 1533 và kho tàng 287 pho tượng cổ',
    curatorialStatement:
      'Không gian trưng bày đối chiếu hai thiết chế tinh thần trụ cột của người dân Đường Lâm: ngôi đình thờ Tản Viên Sơn Thánh mang dấu ấn nhà sàn Việt – Mường và Chùa Mía lưu giữ hệ thống tượng đất luyện sơn son thếp vàng.',
    featuredArtifactId: 'dinh-mong-phu',
    artifactIds: ['dinh-mong-phu', 'chua-mia'],
  },
  {
    id: 'hall-3',
    indexLabel: 'Phòng III',
    title: 'Đất Hai Vua & Khí tiết Danh nhân',
    subtitle: 'Phùng Hưng, Ngô Quyền và Thám hoa Giang Văn Minh',
    curatorialStatement:
      'Đường Lâm được sử sách gọi là vùng đất "một ấp hai vua" — quê hương Bố Cái Đại Vương Phùng Hưng và Tiền Ngô Vương Ngô Quyền, đồng thời hun đúc khí tiết ngoại giao của Thám hoa Giang Văn Minh.',
    featuredArtifactId: 'lang-ngo-quyen',
    artifactIds: ['lang-ngo-quyen', 'den-phung-hung', 'nha-tho-giang-van-minh'],
  },
  {
    id: 'hall-4',
    indexLabel: 'Phòng IV',
    title: 'Nếp nhà Cổ 1649 & Sinh kế Làng truyền thống',
    subtitle: 'Kỹ thuật dựng nhà gỗ xoan – mít và nghề ủ tương nếp',
    curatorialStatement:
      'Phòng trưng bày dân sinh tái hiện cấu trúc "nội tự ngoại khách" trong ngôi nhà cổ niên đại 1649 của dòng họ Nguyễn Văn tại Mông Phụ cùng chum tương nếp phơi nắng trên sân gạch Bát Tràng.',
    featuredArtifactId: 'nha-co-1649',
    artifactIds: ['nha-co-1649', 'gieng-co-tuong-nep'],
  },
];

export const MUSEUM_ARTIFACTS: MuseumArtifact[] = [
  {
    id: 'cong-mong-phu',
    accessionNumber: 'DL-1533-CG',
    title: 'Cổng làng Mông Phụ',
    subtitle: 'Kiến trúc "thượng gia hạ kiều" bằng đá ong và gỗ lim',
    category: 'Kiến trúc làng',
    hallId: 'hall-1',
    period: 'Năm 1533 (Triều Mạc Đăng Doanh)',
    yearSort: 1533,
    location: 'Đầu thôn Mông Phụ, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Đá ong tự nhiên, gạch cổ, gỗ lim, ngói mũi hài',
    dimensionsOrScale: 'Cấu trúc 2 tầng: vòm cổng đi dưới nền đá ong và vọng lâu bằng gỗ phía trên',
    conservationStatus: 'Cổng làng cổ duy nhất còn nguyên vẹn trong quần thể di tích Đường Lâm',
    provenance: 'Hồ sơ Di tích Quốc gia Làng cổ Đường Lâm (QĐ 77/2005/QĐ-BVHTT)',
    sourceCitation: 'Cục Di sản Văn hóa; Ban Quản lý Di tích Làng cổ Đường Lâm',
    imageUrl: IMG_GATE,
    imageCaption: 'Hình 1. Cổng làng Mông Phụ bên gốc đa cổ thụ và đường gạch dẫn vào trung tâm thôn Mông Phụ.',
    summary:
      'Cổng làng Mông Phụ được xây dựng năm 1533 theo lối kiến trúc "thượng gia hạ kiều" (trên là nhà, dưới là lối đi), tạo nên biểu tượng chuyển tiếp giữa đồng ruộng bên ngoài và không gian cư trú khép kín bên trong lũy tre làng.',
    curatorialEssay: [
      'Khác với nhiều cổng làng đồng bằng Bắc Bộ chỉ xây kiểu tam quan gạch vữa thời Nguyễn, cổng làng Mông Phụ giữ được kết cấu đặc trưng của thế kỷ XVI với thân cổng xây bằng những khối đá ong đục đẽo vuông vức, kết dính chắc chắn mà không phô trương trang trí rườm rà.',
      'Phần trên cổng là gác gỗ mái ngói rêu phong đóng vai trò trạm quan sát an ninh cho làng xưa. Bên cạnh cổng là cây đa cổ thụ tạo thành chỉnh thể "cây đa – cổng làng" dẫn thẳng theo trục đường lát gạch vào sân đình Mông Phụ.',
    ],
    footnotes: [
      'Niên đại khởi dựng năm 1533 được đối chiếu đồng thời với thời điểm xây dựng Đình Mông Phụ dưới triều Mạc Đăng Doanh.',
      'Đá ong Xứ Đoài có đặc tính mềm khi mới khai thác dưới lòng đất và cứng dần khi tiếp xúc với không khí, giúp tường cổng bền vững qua gần năm thế kỷ.',
    ],
    hotspots: [
      {
        id: 'hs-gate-1',
        xPercent: 50,
        yPercent: 25,
        label: 'Vọng lâu mái ngói (Thượng gia)',
        detail: 'Tầng gác gỗ phía trên mái ngói mũi hài cổ, xưa là nơi tuần phiên canh gác bảo vệ an ninh cho thôn Mông Phụ.',
      },
      {
        id: 'hs-gate-2',
        xPercent: 34,
        yPercent: 68,
        label: 'Khối xây đá ong Xứ Đoài',
        detail: 'Đá ong khai thác tại địa phương giàu oxit sắt, tạo sắc nâu sẫm đặc trưng và điều hòa nhiệt độ tự nhiên.',
      },
      {
        id: 'hs-gate-3',
        xPercent: 80,
        yPercent: 48,
        label: 'Cây đa đầu làng',
        detail: 'Cổ thụ hàng trăm năm tuổi che bóng mát trước cổng, xác lập ranh giới không gian thiêng và sinh hoạt cộng đồng.',
      },
    ],
  },
  {
    id: 'dinh-mong-phu',
    accessionNumber: 'DL-1533-DM',
    title: 'Đình Mông Phụ',
    subtitle: 'Công trình trung tâm thờ Tản Viên Sơn Thánh — Di tích Quốc gia năm 1984',
    category: 'Tín ngưỡng & Tôn giáo',
    hallId: 'hall-2',
    period: 'Khởi dựng 1533 · Trùng tu 1858 · Bảo tồn 2006–2008',
    yearSort: 1533,
    location: 'Trung tâm thôn Mông Phụ, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Gỗ lim, đá ong, gạch Bát Tràng, ngói mũi hài',
    dimensionsOrScale: 'Tổng diện tích khuôn viên khoảng 1.800 m²; Đại đình 5 gian 2 chái kiểu chữ "Công" (工)',
    conservationStatus: 'Xếp hạng Di tích lịch sử - văn hóa cấp Quốc gia năm 1984; tu bổ Việt Nam – Nhật Bản (2006–2008)',
    provenance: 'Thờ Tản Viên Sơn Thánh làm Thành hoàng làng; lưu giữ hoành phi vua Thành Thái ban',
    sourceCitation: 'Bảo tàng Lịch sử Quốc gia; Hồ sơ tu bổ di sản Việt Nam – Nhật Bản',
    imageUrl: IMG_DINH,
    imageCaption: 'Hình 2. Tòa Đại đình Mông Phụ với mái đao cong vút, sân gạch Bát Tràng và tường bao đá ong.',
    summary:
      'Tọa lạc trên khu đất cao nhất của làng theo thế "tựa sơn đạp thủy", Đình Mông Phụ kết hợp kiến trúc đình làng Bắc Bộ với dấu ấn nhà sàn truyền thống Việt – Mường.',
    curatorialEssay: [
      'Tên gọi Mông Phụ được giải thích qua vị trí địa hình giữa hai quả đồi Mông Sơn và Khúc Phụ. Toàn bộ quần thể rộng khoảng 1.800 m² gồm Nghi môn, sân lát gạch Bát Tràng, hai dãy Tả mạc – Hữu mạc mỗi nhà 5 gian, Đại đình và Hậu cung xếp theo bố cục chữ "Công" (工), bên phải có nhà Xích hậu.',
      'Đại đình gồm 5 gian 2 chái với bộ khung gỗ lim đồ sộ. Các đầu dư, kẻ hiên chạm khắc tinh xảo đề tài tứ linh (long, ly, quy, phượng) và tứ quý (tùng, cúc, trúc, mai). Hai bên hông đình có hai giếng cổ được ví như "mắt rồng" của làng. Trong đình còn lưu giữ bức hoành phi bốn chữ "Dũng cảm khả thưởng" do vua Thành Thái ban năm Thành Thái thứ 18.',
    ],
    footnotes: [
      'Đình khởi dựng năm 1533 (triều Mạc Đăng Doanh) và được trùng tu mở rộng quy mô lớn vào năm 1858 dưới triều vua Tự Đức.',
      'Giai đoạn 2006–2008, công trình được tu bổ khoa học trong khuôn khổ hợp tác bảo tồn di sản giữa Việt Nam và các chuyên gia Nhật Bản.',
    ],
    hotspots: [
      {
        id: 'hs-dinh-1',
        xPercent: 48,
        yPercent: 32,
        label: 'Bộ mái đao cong & chạm khắc đầu đao',
        detail: 'Mái lợp ngói mũi hài cổ độ dốc lớn, góc đao vút lên thanh thoát mang phong cách kiến trúc thế kỷ XIX.',
      },
      {
        id: 'hs-dinh-2',
        xPercent: 52,
        yPercent: 56,
        label: 'Hệ cột gỗ lim & hoành phi',
        detail: 'Không gian Đại đình 5 gian 2 chái lưu giữ bức hoành phi "Dũng cảm khả thưởng" triều vua Thành Thái.',
      },
      {
        id: 'hs-dinh-3',
        xPercent: 25,
        yPercent: 78,
        label: 'Sân đình lát gạch Bát Tràng',
        detail: 'Mặt sân rộng thoáng lát gạch Bát Tràng cổ, là nơi diễn ra lễ hội làng và sinh hoạt hương ước truyền thống.',
      },
    ],
  },
  {
    id: 'chua-mia',
    accessionNumber: 'DL-1632-SM',
    title: 'Chùa Mía (Sùng Nghiêm Tự)',
    subtitle: 'Ngôi cổ tự lưu giữ 287 pho tượng nghệ thuật tại thôn Đông Sàng',
    category: 'Tín ngưỡng & Tôn giáo',
    hallId: 'hall-2',
    period: 'Cội nguồn thời Trần · Hưng công trùng tu năm 1632',
    yearSort: 1632,
    location: 'Triền đồi đá ong, thôn Đông Sàng, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Gỗ lim, đá ong, đất luyện sơn son thếp vàng, đồng đúc',
    dimensionsOrScale: 'Quần thể bố cục chữ "Mục"; bảo tồn 287 pho tượng (6 đồng, 107 gỗ, 174 đất luyện)',
    conservationStatus: 'Di tích lịch sử - văn hóa cấp Quốc gia; hệ thống tượng cổ được bảo tồn nguyên trạng',
    provenance: 'Bà Chúa Mía (cung phi Ngô Thị Ngọc Diệu) hưng công tôn tạo năm 1632 thời chúa Trịnh Tráng',
    sourceCitation: 'Văn bia Chùa Mía; Cục Di sản Văn hóa Việt Nam',
    imageUrl: IMG_CHUA_MIA,
    imageCaption: 'Hình 3. Điện thờ Chùa Mía với hệ thống tượng Phật bằng gỗ và đất luyện sơn son thếp vàng thế kỷ XVII.',
    summary:
      'Chùa Mía là một trong những ngôi chùa lưu giữ nhiều tượng cổ có giá trị nghệ thuật nhất tại Việt Nam, nổi bật với kỹ thuật tạo tác tượng đất luyện truyền thống.',
    curatorialEssay: [
      'Từ một ngôi miếu nhỏ có nguồn gốc từ thời Trần, năm 1632 dưới triều Lê Trung Hưng, cung phi Ngô Thị Ngọc Diệu — được nhân dân tôn kính gọi là Bà Chúa Mía — đã đứng ra hưng công cùng nhân dân tổng Cam Giá dựng lại ngôi đại tự khang trang. Hệ thống văn bia ghi rõ các đợt xây thêm tiền đường năm 1750 và gác chuông năm 1843.',
      'Giá trị đặc biệt nhất của Chùa Mía nằm ở 287 pho tượng cổ, gồm 6 pho tượng đồng, 107 pho tượng gỗ và 174 pho tượng đất luyện làm từ hỗn hợp mật mía, vôi, giấy bản, thạch cao và rễ cây si rồi sơn son thếp vàng. Bên cạnh các kiệt tác như tượng Tuyết Sơn, Bát Bộ Kim Cương và Quan Âm, chùa còn lưu giữ quả chuông đồng đúc năm 1745 (đời Lê Cảnh Hưng) và khánh đồng năm 1846 (đời Thiệu Trị).',
    ],
    footnotes: [
      'Bố cục kiến trúc chữ "Mục" khép kín gồm Tam quan, Gác chuông, Bái đường, Chính điện, Thượng điện, nhà Tổ và hành lang.',
      'Tháp Cửu phẩm Liên hoa và nhiều hạng mục tiếp tục được tu bổ qua các năm 1853, 1916, 1928, 1963 và 1993.',
    ],
    hotspots: [
      {
        id: 'hs-chua-1',
        xPercent: 60,
        yPercent: 45,
        label: 'Tượng đất luyện sơn son thếp vàng',
        detail: '174/287 pho tượng được chế tác từ đất luyện trộn mật mía, vôi, giấy bản, thạch cao — kỹ nghệ điêu khắc dân gian đỉnh cao.',
      },
      {
        id: 'hs-chua-2',
        xPercent: 34,
        yPercent: 44,
        label: 'Hệ thống tượng gỗ thế kỷ XVII',
        detail: '107 pho tượng gỗ chạm khắc tinh tế, phản ánh phong cách tạo hình Phật giáo thời Lê Trung Hưng.',
      },
      {
        id: 'hs-chua-3',
        xPercent: 18,
        yPercent: 52,
        label: 'Cửa gỗ bức bàn & không gian cổ tự',
        detail: 'Ánh sáng tự nhiên hắt qua cánh cửa gỗ tạo độ tương phản dịu nhẹ, bảo vệ lớp sơn thếp khỏi nắng gắt.',
      },
    ],
  },
  {
    id: 'nha-co-1649',
    accessionNumber: 'DL-1649-NH',
    title: 'Nhà cổ ông Nguyễn Văn Hùng',
    subtitle: 'Nếp nhà 5 gian 2 dĩ niên đại 1649 qua 12 thế hệ sinh sống',
    category: 'Dân sinh & Phi vật thể',
    hallId: 'hall-4',
    period: 'Hoàn thành năm 1649 (Thời Lê Trung Hưng)',
    yearSort: 1649,
    location: 'Thôn Mông Phụ, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Gỗ xoan, gỗ mít, tường đá ong, ngói ta',
    dimensionsOrScale: 'Nhà chính 5 gian 2 dĩ; sân gạch và tường rào đá ong bố cục "nội tự ngoại khách"',
    conservationStatus: 'Bảo tồn nguyên vẹn; góp phần nhận Giải thưởng Bảo tồn Di sản UNESCO Châu Á - Thái Bình Dương (2013)',
    provenance: 'Văn tự chữ Hán (bản văn cúng cầu an) lưu giữ tại gia đình, được Viện Hán Nôm dịch nghĩa',
    sourceCitation: 'Viện Nghiên cứu Hán Nôm; Hồ sơ Giải thưởng UNESCO Asia-Pacific Heritage 2013',
    imageUrl: IMG_ANCIENT_HOUSE,
    imageCaption: 'Hình 4. Ngôi nhà cổ gỗ xoan – mít tại Đường Lâm với tường đá ong và hàng chum ủ tương nếp ngoài sân.',
    summary:
      'Được xác định niên đại chính xác năm 1649 nhờ văn bản chữ Hán lưu truyền trong dòng họ, ngôi nhà là minh chứng sống động cho kiến trúc dân gian Việt Nam tồn tại liên tục qua 12 thế hệ.',
    curatorialEssay: [
      'Không giống các công trình bảo tàng hóa tách rời đời sống, ngôi nhà cổ của gia đình ông Nguyễn Văn Hùng tại thôn Mông Phụ vẫn là nơi sinh hoạt thường nhật của con cháu đời thứ 12. Ba gian giữa dành cho việc thờ cúng tổ tiên ("nội tự"), còn hai gian bên và phần hiên rộng mở dùng tiếp khách và sinh hoạt gia đình ("ngoại khách").',
      'Hệ khung nhà chế tác chủ yếu bằng gỗ xoan ngâm và gỗ mít địa phương kết hợp tường bao đá ong giúp điều hòa khí hậu nóng ẩm miền Bắc. Ngoài sân gạch Bát Tràng là hàng chục chum sành ủ tương nếp truyền thống — nét văn hóa ẩm thực gắn bó mật thiết với không gian nhà cổ Đường Lâm.',
    ],
    footnotes: [
      'Niên đại năm 1649 được khẳng định qua bản văn cúng cầu an bằng chữ Hán lưu trên ban thờ, đã được Viện Hán Nôm thẩm định và dịch nghĩa.',
      'Cùng với một số công trình tiêu biểu tại Đường Lâm, ngôi nhà được vinh danh tại Giải thưởng Bảo tồn Di sản văn hóa UNESCO khu vực Châu Á - Thái Bình Dương năm 2013.',
    ],
    hotspots: [
      {
        id: 'hs-house-1',
        xPercent: 52,
        yPercent: 38,
        label: 'Kết cấu gỗ xoan – gỗ mít 5 gian 2 dĩ',
        detail: 'Khung cột kèo mộng gỗ truyền thống không dùng đinh sắt, bền vững qua hơn 370 năm.',
      },
      {
        id: 'hs-house-2',
        xPercent: 20,
        yPercent: 45,
        label: 'Tường rào đá ong khép kín',
        detail: 'Tường rào xây bằng đá ong mộc giữ thế phong thủy "tụ thủy sinh tài" cho khuôn viên.',
      },
      {
        id: 'hs-house-3',
        xPercent: 24,
        yPercent: 78,
        label: 'Sân chum tương nếp truyền thống',
        detail: 'Chum sành đặt ở nơi đón nắng tốt nhất trong sân để lên men tương nếp Đường Lâm.',
      },
    ],
  },
  {
    id: 'lang-ngo-quyen',
    accessionNumber: 'DL-0938-NQ',
    title: 'Đền và Lăng Vua Ngô Quyền',
    subtitle: 'Di tích tưởng niệm Tiền Ngô Vương (898 – 944) tại thôn Cam Lâm',
    category: 'Di tích Danh nhân',
    hallId: 'hall-3',
    period: 'Thế kỷ X · Trùng tu 1821 & 1874 · Tôn tạo 2013',
    yearSort: 938,
    location: 'Đồi Cấm, thôn Cam Lâm, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Đá xanh, đá ong, gạch cổ, gỗ lim',
    dimensionsOrScale: 'Quần thể gồm nhà bia, đền thờ chính và khu lăng mộ trên triền đồi Cam Lâm',
    conservationStatus: 'Di tích lịch sử Quốc gia; được Nhà nước và nhân dân trùng tu tôn tạo năm 2013',
    provenance: 'Thờ Tiền Ngô Vương Ngô Quyền — người làm nên chiến thắng Bạch Đằng năm 938',
    sourceCitation: 'Văn bia tại Lăng Ngô Quyền; Đại Việt Sử Ký Toàn Thư',
    imageUrl: IMG_NGO_QUYEN,
    imageCaption: 'Hình 5. Nhà bia và Đền thờ Tiền Ngô Vương Ngô Quyền ẩn mình dưới tán cổ thụ thôn Cam Lâm.',
    summary:
      'Nằm trên vùng đồi thoáng đãng tại thôn Cam Lâm, Lăng và Đền thờ Ngô Quyền là nơi tưởng niệm vị anh hùng dân tộc chấm dứt hơn một nghìn năm Bắc thuộc bằng chiến thắng Bạch Đằng năm 938.',
    curatorialEssay: [
      'Ngô Quyền (898–944) sinh ra tại Đường Lâm, xuất thân từ dòng họ hào trưởng vùng đất Phong Châu – Giao Châu. Năm 938, ông chỉ huy trận thủy chiến trên sông Bạch Đằng đánh tan quân Nam Hán, xưng vương và đóng đô ở Cổ Loa, mở ra kỷ nguyên độc lập tự chủ lâu dài cho dân tộc Việt.',
      'Khu lăng mộ và đền thờ tại thôn Cam Lâm được nhân dân lập dựng từ sau khi ông băng hà, trải qua các lần trùng tu lớn vào năm Minh Mạng thứ 2 (1821) và năm Tự Đức thứ 27 (1874) theo ghi nhận trên văn bia. Hàng năm, lễ hội tưởng niệm tại đây thu hút đông đảo hậu duệ và khách hành hương cả nước.',
    ],
    footnotes: [
      'Tấm bia đá "Tiền Ngô Vương Lăng" đặt trong nhà bia mái cong phía trước khu lăng mộ ghi rõ công đức và các đợt tu tạo thời Nguyễn.',
      'Năm 2013, dự án tu bổ, tôn tạo quần thể đền và lăng Ngô Quyền được triển khai để bảo vệ cảnh quan và kiến trúc gốc.',
    ],
    hotspots: [
      {
        id: 'hs-nq-1',
        xPercent: 25,
        yPercent: 56,
        label: 'Nhà bia Tiền Ngô Vương Lăng',
        detail: 'Bia đá dựng trên lưng rùa ghi lại thân thế, chiến công Bạch Đằng (938) và lịch sử trùng tu năm 1821, 1874.',
      },
      {
        id: 'hs-nq-2',
        xPercent: 58,
        yPercent: 40,
        label: 'Điện thờ chính mái chồng diêm',
        detail: 'Kiến trúc tôn nghiêm nằm trên thế đất cao dựa lưng vào đồi Cấm, hướng ra cánh đồng Cam Lâm.',
      },
    ],
  },
  {
    id: 'den-phung-hung',
    accessionNumber: 'DL-0791-PH',
    title: 'Đền thờ Bố Cái Đại Vương Phùng Hưng',
    subtitle: 'Thờ thủ lĩnh cuộc khởi nghĩa thế kỷ VIII (761 – 802) tại Cam Lâm',
    category: 'Di tích Danh nhân',
    hallId: 'hall-3',
    period: 'Sắc phong 1285 · Bia thời Lê 1473 · Trùng tu 1889',
    yearSort: 791,
    location: 'Thôn Cam Lâm, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Đá ong, gỗ lim, gạch cổ, ngói ta',
    dimensionsOrScale: 'Khuôn viên đền gồm nghi môn, tả hữu mạc, đại bái và hậu cung thời Nguyễn',
    conservationStatus: 'Di tích lịch sử Quốc gia, bảo lưu hệ thống sắc phong và bia đá cổ',
    provenance: 'Triều đình phong kiến ban sắc phong từ các năm 1285, 1287, 1312; bia đá năm 1473',
    sourceCitation: 'Hệ thống sắc phong lưu trữ tại đền; Hồ sơ Di tích Đường Lâm',
    imageUrl: IMG_NGO_QUYEN,
    imageCaption: 'Hình 6. Không gian kiến trúc thờ phụng danh nhân tại cụm di tích thôn Cam Lâm, Đường Lâm.',
    summary:
      'Đền thờ Phùng Hưng tôn vinh vị hào trưởng Đường Lâm lãnh đạo nhân dân đánh đuổi chính quyền đô hộ nhà Đường vào cuối thế kỷ VIII, được nhân dân tôn xưng là Bố Cái Đại Vương.',
    curatorialEssay: [
      'Phùng Hưng (761–802) là vị anh hùng mở đầu truyền thống quật khởi của vùng đất Đường Lâm. Sau khi giành thắng lợi giải phóng phủ thành Tống Bình, ông trị vì đất nước một thời gian ngắn trước khi qua đời và được nhân dân tôn kính gọi là Bố Cái Đại Vương (cha mẹ của dân).',
      'Dù năm khởi dựng ban đầu của ngôi đền tại Cam Lâm chưa xác định chính xác từng năm, hệ thống sắc phong cổ từ các năm 1285, 1287, 1312 cùng tấm bia đá lập năm 1473 thời Lê khẳng định bề dày thờ tự liên tục qua nhiều triều đại. Diện mạo kiến trúc hiện nay mang dấu ấn đợt trùng tu toàn diện vào năm 1889 (đời vua Thành Thái).',
    ],
    footnotes: [
      'Cùng với Đền và Lăng Ngô Quyền cách đó không xa, Đền Phùng Hưng tạo thành cụm di tích "Đất Hai Vua" độc nhất vô nhị tại Việt Nam.',
    ],
    hotspots: [
      {
        id: 'hs-ph-1',
        xPercent: 52,
        yPercent: 45,
        label: 'Dấu ấn kiến trúc trùng tu năm 1889',
        detail: 'Hệ khung gỗ và tường bao đá ong được định hình hoàn chỉnh dưới triều vua Thành Thái.',
      },
    ],
  },
  {
    id: 'nha-tho-giang-van-minh',
    accessionNumber: 'DL-1845-GV',
    title: 'Nhà thờ Thám hoa Giang Văn Minh',
    subtitle: 'Từ đường xây dựng năm 1845 tôn vinh vị sứ thần "bất nhục quân mệnh"',
    category: 'Di tích Danh nhân',
    hallId: 'hall-3',
    period: 'Xây dựng năm 1845 (Triều Thiệu Trị)',
    yearSort: 1845,
    location: 'Thôn Mông Phụ, xã Đường Lâm, TX. Sơn Tây, Hà Nội',
    material: 'Đá ong Xứ Đoài, gỗ xoan – lim, ngói mũi hài',
    dimensionsOrScale: 'Bố cục kiểu chữ "Nhị" (二) gồm tiền đường và hậu đường bằng đá ong',
    conservationStatus: 'Di tích lịch sử văn hóa được bảo tồn nguyên vẹn tại thôn Mông Phụ',
    provenance: 'Thờ Thám hoa Giang Văn Minh (1573–1638); niên đại 1845 ghi trên bia đá tại từ đường',
    sourceCitation: 'Văn bia Nhà thờ Thám hoa Giang Văn Minh; Cổng thông tin Làng cổ Đường Lâm',
    imageUrl: IMG_ANCIENT_HOUSE,
    imageCaption: 'Hình 7. Nếp nhà truyền thống tường đá ong tại thôn Mông Phụ gắn với không gian thờ tự dòng họ Giang.',
    summary:
      'Xây dựng năm 1845 để tưởng niệm Thám hoa Giang Văn Minh (1573–1638) — người đã hiên ngang đối đáp trước triều đình nhà Minh bằng vế đối bất hủ "Đằng Giang tự cổ huyết do hồng".',
    curatorialEssay: [
      'Giang Văn Minh (1573–1638) đỗ Thám hoa khoa Mậu Thìn (1628) dưới triều Lê Thần Tông. Năm 1637, ông được cử làm Chánh sứ sang Yên Kinh (Bắc Kinh) bang giao với nhà Minh. Trước vế đối thách thức của vua Minh ("Đồng trụ chí kim đài dĩ lục" — Cột đồng đến nay rêu đã xanh), ông đã ứng khẩu đáp lại: "Đằng Giang tự cổ huyết do hồng" (Sông Bạch Đằng từ xưa máu còn đỏ), nhắc lại chiến công đánh bại quân xâm lược phương Bắc của Ngô Quyền, Lê Hoàn, Trần Hưng Đạo.',
      'Vua Minh tức giận sát hại ông tại Yên Kinh năm 1638, nhưng khâm phục khí phách của vị sứ thần nên cho ướp xác đưa linh cữu về nước. Vua Lê Thần Tông truy tặng ông danh hiệu "Sứ bất nhục quân mệnh" (Sứ thần không làm nhục mệnh vua). Năm 1845, con cháu và địa phương dựng nhà thờ bằng đá ong theo kiểu chữ Nhị tại Mông Phụ.',
    ],
    footnotes: [
      'Bia đá hiện còn lưu giữ tại từ đường ghi nhận năm khởi công xây dựng chính thức là năm 1845 (triều vua Thiệu Trị).',
    ],
    hotspots: [
      {
        id: 'hs-gv-1',
        xPercent: 56,
        yPercent: 42,
        label: 'Không gian thờ tự kiểu chữ Nhị',
        detail: 'Tiền đường và hậu đường xây bằng tường đá ong dày, lưu giữ câu đối ca ngợi khí tiết sứ thần năm 1638.',
      },
    ],
  },
  {
    id: 'gieng-co-tuong-nep',
    accessionNumber: 'DL-VT-TN',
    title: 'Giếng cổ Đá ong & Nghệ thuật ủ Tương nếp',
    subtitle: 'Di sản dân sinh và ẩm thực truyền thống vùng Xứ Đoài',
    category: 'Dân sinh & Phi vật thể',
    hallId: 'hall-1',
    period: 'Truyền thống lâu đời của cư dân Đường Lâm',
    yearSort: 1700,
    location: 'Thôn Mông Phụ, Đông Sàng và các thôn cổ Đường Lâm',
    material: 'Đá ong tự nhiên, chum sành, gạo nếp cái hoa vàng, đỗ tương, muối',
    dimensionsOrScale: 'Hệ thống giếng cổ nằm rải rác các xóm; quy trình ủ tương phơi nắng tự nhiên nhiều tháng',
    conservationStatus: 'Đang được cộng đồng cư dân duy trì thực hành hàng ngày trong đời sống làng cổ',
    provenance: 'Tri thức dân gian bản địa Xứ Đoài gắn với không gian nhà cổ và giếng làng',
    sourceCitation: 'Hồ sơ Văn hóa Phi vật thể Làng cổ Đường Lâm',
    imageUrl: IMG_ANCIENT_HOUSE,
    imageCaption: 'Hình 8. Chum sành ủ tương nếp dưới nắng Xứ Đoài trong sân gạch nhà cổ Đường Lâm.',
    summary:
      'Bên cạnh kiến trúc đá ong, Đường Lâm lưu giữ mạch sống phi vật thể qua hệ thống giếng cổ nước ngọt quanh năm và nghề ủ tương nếp, làm chè lam, kẹo dồi đặc trưng.',
    curatorialEssay: [
      'Mỗi cụm xóm ở Đường Lâm đều gắn với một chiếc giếng cổ xây bằng đá ong kè sát mặt đất. Nhờ tầng đá ong lọc tự nhiên, nước giếng trong mát quanh năm không cạn, là nguồn nước chính dùng trong sinh hoạt và chế biến tương nếp của người dân.',
      'Nghề làm tương nếp Đường Lâm đòi hỏi sự tỉ mỉ từ khâu đồ xôi nếp lên mốc vàng, rang đỗ tương chín đều đến ngâm nước muối giếng cổ trong chum sành phơi ngoài sân gạch. Song hành cùng tương nếp là chè lam dẻo thơm hương gừng và kẹo dồi giòn bùi — những thức quà mộc mạc phản ánh tri thức nông nghiệp lâu đời của vùng đất Xứ Đoài.',
    ],
    footnotes: [
      'Ngoài tương nếp và chè lam, ẩm thực truyền thống Đường Lâm còn nổi tiếng với thịt quay đòn lá ổi và gà Mía.',
    ],
    hotspots: [
      {
        id: 'hs-tn-1',
        xPercent: 25,
        yPercent: 76,
        label: 'Chum sành ủ tương nếp',
        detail: 'Tương được phơi nắng ngoài sân gạch Bát Tràng để lên men tự nhiên, tạo vị ngọt đậm đặc trưng.',
      },
    ],
  },
];

export const HERITAGE_MAP_NODES: HeritageMapNode[] = [
  {
    id: 'node-phung-hung',
    artifactId: 'den-phung-hung',
    name: 'Đền Phùng Hưng',
    hamlet: 'Thôn Cam Lâm',
    year: 'TK VIII · Trùng tu 1889',
    x: 24,
    y: 23,
    routeGroup: 'cam-lam',
    shortNote: 'Thờ Bố Cái Đại Vương Phùng Hưng (761–802), lưu sắc phong 1285.',
  },
  {
    id: 'node-ngo-quyen',
    artifactId: 'lang-ngo-quyen',
    name: 'Đền & Lăng Ngô Quyền',
    hamlet: 'Đồi Cấm, Cam Lâm',
    year: 'TK X · Tu tạo 1874',
    x: 34,
    y: 34,
    routeGroup: 'cam-lam',
    shortNote: 'Khu lăng mộ Tiền Ngô Vương — chiến thắng Bạch Đằng 938.',
  },
  {
    id: 'node-cong-lang',
    artifactId: 'cong-mong-phu',
    name: 'Cổng làng Mông Phụ',
    hamlet: 'Đầu thôn Mông Phụ',
    year: '1533',
    x: 52,
    y: 48,
    routeGroup: 'mong-phu',
    shortNote: 'Cổng làng cổ duy nhất còn nguyên vẹn, kiểu thượng gia hạ kiều.',
  },
  {
    id: 'node-dinh-mong-phu',
    artifactId: 'dinh-mong-phu',
    name: 'Đình Mông Phụ',
    hamlet: 'Trung tâm Mông Phụ',
    year: '1533 · Trùng tu 1858',
    x: 61,
    y: 55,
    routeGroup: 'mong-phu',
    shortNote: 'Diện tích ~1.800 m², thờ Tản Viên Sơn Thánh, Di tích QG 1984.',
  },
  {
    id: 'node-nha-co-1649',
    artifactId: 'nha-co-1649',
    name: 'Nhà cổ Nguyễn Văn Hùng',
    hamlet: 'Thôn Mông Phụ',
    year: '1649',
    x: 68,
    y: 66,
    routeGroup: 'mong-phu',
    shortNote: 'Nhà gỗ xoan – mít 5 gian 2 dĩ tồn tại qua 12 thế hệ.',
  },
  {
    id: 'node-giang-van-minh',
    artifactId: 'nha-tho-giang-van-minh',
    name: 'Nhà thờ Giang Văn Minh',
    hamlet: 'Thôn Mông Phụ',
    year: '1845',
    x: 54,
    y: 72,
    routeGroup: 'mong-phu',
    shortNote: 'Tưởng niệm vị Thám hoa đi sứ khí tiết "Đằng Giang tự cổ huyết do hồng".',
  },
  {
    id: 'node-chua-mia',
    artifactId: 'chua-mia',
    name: 'Chùa Mía (Sùng Nghiêm Tự)',
    hamlet: 'Thôn Đông Sàng',
    year: '1632',
    x: 82,
    y: 44,
    routeGroup: 'dong-sang',
    shortNote: 'Bảo tồn 287 pho tượng cổ cùng chuông đồng 1745 và khánh đồng 1846.',
  },
];

export const CHRONOLOGY_MILESTONES: ChronologyMilestone[] = [
  {
    id: 'm-761',
    eraGroup: 'Thế kỷ VIII – X',
    yearLabel: '761 – 802',
    title: 'Bố Cái Đại Vương Phùng Hưng',
    location: 'Thôn Cam Lâm',
    description:
      'Người anh hùng đất Đường Lâm lãnh đạo cuộc khởi nghĩa chống chính quyền đô hộ nhà Đường, giải phóng thành Tống Bình và được nhân dân suy tôn là Bố Cái Đại Vương.',
    relatedArtifactId: 'den-phung-hung',
  },
  {
    id: 'm-938',
    eraGroup: 'Thế kỷ VIII – X',
    yearLabel: '898 – 944',
    title: 'Tiền Ngô Vương Ngô Quyền & Chiến thắng Bạch Đằng (938)',
    location: 'Thôn Cam Lâm',
    description:
      'Vị vua sinh ra tại Đường Lâm đánh bại quân Nam Hán trên sông Bạch Đằng năm 938, mở ra thời kỳ độc lập tự chủ lâu dài của nước Việt.',
    relatedArtifactId: 'lang-ngo-quyen',
  },
  {
    id: 'm-1533',
    eraGroup: 'Thế kỷ XVI – XVII',
    yearLabel: '1533',
    title: 'Khởi dựng Đình Mông Phụ & Cổng làng Mông Phụ',
    location: 'Thôn Mông Phụ',
    description:
      'Dưới triều vua Mạc Đăng Doanh, cư dân Mông Phụ khởi dựng ngôi đình thờ Tản Viên Sơn Thánh cùng cổng làng đá ong kiểu thượng gia hạ kiều.',
    relatedArtifactId: 'dinh-mong-phu',
  },
  {
    id: 'm-1573',
    eraGroup: 'Thế kỷ XVI – XVII',
    yearLabel: '1573 – 1638',
    title: 'Thám hoa Giang Văn Minh "Bất nhục quân mệnh"',
    location: 'Thôn Mông Phụ',
    description:
      'Đỗ Thám hoa năm 1628 và đi sứ nhà Minh năm 1637, ông hiên ngang ứng khẩu vế đối "Đằng Giang tự cổ huyết do hồng", bảo toàn quốc thể dù phải hy sinh tại Yên Kinh năm 1638.',
    relatedArtifactId: 'nha-tho-giang-van-minh',
  },
  {
    id: 'm-1632',
    eraGroup: 'Thế kỷ XVI – XVII',
    yearLabel: '1632',
    title: 'Bà Chúa Mía hưng công dựng lại Chùa Mía',
    location: 'Thôn Đông Sàng',
    description:
      'Cung phi Ngô Thị Ngọc Diệu cùng nhân dân tổng Cam Giá tôn tạo Sùng Nghiêm Tự với quy mô lớn, đặt nền móng cho hệ thống 287 pho tượng nghệ thuật.',
    relatedArtifactId: 'chua-mia',
  },
  {
    id: 'm-1649',
    eraGroup: 'Thế kỷ XVI – XVII',
    yearLabel: '1649',
    title: 'Hoàn thành Nhà cổ Nguyễn Văn Hùng',
    location: 'Thôn Mông Phụ',
    description:
      'Theo văn tự chữ Hán lưu trên ban thờ được Viện Hán Nôm dịch nghĩa, ngôi nhà 5 gian 2 dĩ gỗ xoan – mít hoàn thành vào năm 1649 và được truyền giữ qua 12 thế hệ.',
    relatedArtifactId: 'nha-co-1649',
  },
  {
    id: 'm-1745',
    eraGroup: 'Thế kỷ XVIII – XIX',
    yearLabel: '1745 – 1846',
    title: 'Bổ sung Tiền đường, Gác chuông và Pháp khí Chùa Mía',
    location: 'Thôn Đông Sàng',
    description:
      'Đúc chuông đồng năm 1745 (đời Lê Cảnh Hưng), dựng tiền đường năm 1750, xây gác chuông năm 1843 và đúc khánh đồng năm 1846 (đời Thiệu Trị).',
    relatedArtifactId: 'chua-mia',
  },
  {
    id: 'm-1845',
    eraGroup: 'Thế kỷ XVIII – XIX',
    yearLabel: '1845',
    title: 'Xây dựng Nhà thờ Thám hoa Giang Văn Minh',
    location: 'Thôn Mông Phụ',
    description:
      'Theo bia đá tại từ đường, công trình kiến trúc đá ong kiểu chữ Nhị được dựng lên dưới triều vua Thiệu Trị để thờ phụng danh nhân Giang Văn Minh.',
    relatedArtifactId: 'nha-tho-giang-van-minh',
  },
  {
    id: 'm-1858',
    eraGroup: 'Thế kỷ XVIII – XIX',
    yearLabel: '1858 – 1889',
    title: 'Đại trùng tu Đình Mông Phụ, Lăng Ngô Quyền và Đền Phùng Hưng',
    location: 'Mông Phụ & Cam Lâm',
    description:
      'Đình Mông Phụ trùng tu lớn năm 1858 (triều Tự Đức); Lăng Ngô Quyền tôn tạo năm 1874; Đền Phùng Hưng trùng tu toàn diện năm 1889 (triều Thành Thái).',
    relatedArtifactId: 'lang-ngo-quyen',
  },
  {
    id: 'm-2005',
    eraGroup: 'Thế kỷ XX – XXI',
    yearLabel: '1984 · 2005 · 2013',
    title: 'Di tích Quốc gia & Giải thưởng Bảo tồn UNESCO',
    location: 'Toàn xã Đường Lâm',
    description:
      'Đình Mông Phụ xếp hạng Di tích Quốc gia năm 1984; Làng cổ Đường Lâm trở thành ngôi làng cổ đầu tiên được xếp hạng Di tích lịch sử văn hóa Quốc gia theo QĐ 77/2005/QĐ-BVHTT (28/11/2005); nhận Giải thưởng UNESCO Châu Á - Thái Bình Dương năm 2013.',
    relatedArtifactId: 'cong-mong-phu',
  },
];
