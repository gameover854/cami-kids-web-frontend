
import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="flex-1 flex flex-col  h-full bg-background-dark relative">
      {/* <!-- Top Navbar --> */}
      <header
        className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-white p-1">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[#9db2b9] text-sm">
          <span>Trang chủ</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-white font-medium">Sản phẩm</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:flex relative">
            <input
              className="bg-surface-dark border-none rounded-full h-9 pl-10 pr-4 text-sm text-white placeholder-[#9db2b9] focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80"
              placeholder="Tìm nhanh..." type="text" />
            <span
              className="material-symbols-outlined absolute left-3 top-2 text-[#9db2b9] text-[20px]">search</span>
          </div>
          <button
            className="relative p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">notifications</span>
            <span
              className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </button>
          <button
            className="p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>
      {/* <!-- Page Content Scrollable --> */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* <!-- Page Heading & Actions --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Quản lý Sản phẩm</h1>
              <p className="text-[#9db2b9] text-base">Danh sách và quản lý kho hàng thời trang trẻ em</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-surface-dark text-white text-sm font-bold border border-border-dark hover:bg-[#233339] transition-all">
                <span className="material-symbols-outlined text-[20px]">file_upload</span>
                <span>Xuất Excel</span>
              </button>
              <Link href="/admin/product/create">
                <button
                  className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary text-background-dark text-sm font-bold hover:bg-[#3ec4f1] transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span>Thêm sản phẩm</span>
                </button>
              </Link>
            </div>
          </div>
          {/* <!-- Filters & Toolbar --> */}
          <div
            className="bg-surface-dark rounded-xl border border-border-dark p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* <!-- Search --> */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#9db2b9]">search</span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-[#111618] text-white placeholder-[#9db2b9] focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="Tìm kiếm tên sản phẩm, mã SKU..." type="text" />
            </div>
            {/* <!-- Filter Chips --> */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative group">
                <button
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] px-4 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
                  <span>Danh mục: Tất cả</span>
                  <span className="material-symbols-outlined text-[18px] text-[#9db2b9]">expand_more</span>
                </button>
              </div>
              <div className="relative group">
                <button
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] px-4 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
                  <span>Trạng thái: Tất cả</span>
                  <span className="material-symbols-outlined text-[18px] text-[#9db2b9]">expand_more</span>
                </button>
              </div>
              <div className="relative group">
                <button
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] px-4 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
                  <span>Giá: Tất cả</span>
                  <span className="material-symbols-outlined text-[18px] text-[#9db2b9]">expand_more</span>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Product Table --> */}
          <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="bg-[#152025] border-b border-border-dark text-xs uppercase tracking-wider text-[#9db2b9]">
                    <th className="px-6 py-4 font-semibold w-12">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </th>
                    <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                    <th className="px-6 py-4 font-semibold">Danh mục</th>
                    <th className="px-6 py-4 font-semibold text-right">Giá bán</th>
                    <th className="px-6 py-4 font-semibold text-center">Biến thể</th>
                    <th className="px-6 py-4 font-semibold">Trạng thái</th>
                    <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {/* <!-- Row 1 --> */}
                  <tr className="group hover:bg-[#1f2b30] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                          <img alt="Green dinosaur t-shirt thumbnail"
                            className="w-full h-full object-cover rounded"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Ei6li-VXZbwLWbO-hLipU9tGzSC_lsRINbTEpAkwPeBZpoQLLDZfvM5Ig5ZB2nB-h2UJuC9Jw76TAnvpDL4Bwb9gv1jNn0NL5Z-2QA2jg-XLsVsg-eKDUzWaXMPu89oAuuqPpviEYrTp3qUYhgyMfcKqC-tdYEQ19cdrpCAVxhBZUaR6BUefQrW0zbqfCU-NxXejkSee5fl04qLrYGIp26nWE-sGeL3hK38K0GOf-rhVB5LwmQLoRKp0jSEDNON0pqpYluDZiiIa" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Áo Thun Khủng Long</p>
                          <p className="text-[#9db2b9] text-xs mt-0.5">SKU: AT-DIN-001</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                        Bé Trai / Áo Thun
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-medium text-sm">150.000 ₫</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-[#9db2b9]">3 Màu, 4 Size</p>
                        <div className="flex -space-x-1">
                          <div className="size-2 rounded-full bg-red-500 ring-1 ring-surface-dark">
                          </div>
                          <div className="size-2 rounded-full bg-blue-500 ring-1 ring-surface-dark">
                          </div>
                          <div className="size-2 rounded-full bg-green-500 ring-1 ring-surface-dark">
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Xóa">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* <!-- Row 2 --> */}
                  <tr className="group hover:bg-[#1f2b30] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                          <img alt="Floral pink dress thumbnail"
                            className="w-full h-full object-cover rounded"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeCFHPHTIlwj8Kt6iJvGdY5lEnr7hJPinO-NzXnnoQrTGjFNArSa8pb6uYeEx2qFmGg7MQO9muajCboj4QDVqsyNYfSDWuR2QEijdk6L2oKabWFeASu9nimeij9THgJ_ayoArZ9331kI5gckhmE6W-bc5YvSZ_cL_pSRuWzakp-FNqqm62uvak5eUCfZRvV-O6bRCCB_z8GOftAuSWiDPEO_V_9q20vROT1muc9xtbrp08gSYedQrQIWbO4YFJ5nV2xNm6OZtuqkqe" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Váy Hoa Nhí Hồng</p>
                          <p className="text-[#9db2b9] text-xs mt-0.5">SKU: VY-HOA-022</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                        Bé Gái / Váy
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-medium text-sm">220.000 ₫</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-[#9db2b9]">1 Màu, 5 Size</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-400"></span>
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Xóa">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* <!-- Row 3 --> */}
                  <tr className="group hover:bg-[#1f2b30] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                          <img alt="Blue denim jeans thumbnail"
                            className="w-full h-full object-cover rounded"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDJNK9os0IdPlUmjX4MATjlClUc6mLFQ_OwJ5qUyMXIXB0Bhmv_kMkB1P_QMvBCNUnbJWC_ngvJP2E9wO4EmfTH-d1Z5eobIjxjDIPTux4CEBeIsakNhQluqVTPjXaaoOcJylcDqo7Y0Yu5xpaD0U1XvTTv01x0f2ul-3FYpSJ6_A2YBgAnmtQtfgl0fIF2VGKw2nfgRV_hiEzubgJgjzd1sl67NzmBK7F3iEsEU1sulIeQ6OVb3f32Xsqb3m2cV1VLGIM8QD-Empz" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Quần Jeans Co Giãn</p>
                          <p className="text-[#9db2b9] text-xs mt-0.5">SKU: QJ-BASIC-005</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                        Unisex / Quần
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-medium text-sm">185.000 ₫</p>
                      <p className="text-[#9db2b9] line-through text-xs">200.000 ₫</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-[#9db2b9]">2 Màu, 6 Size</p>
                        <div className="flex -space-x-1">
                          <div className="size-2 rounded-full bg-blue-800 ring-1 ring-surface-dark">
                          </div>
                          <div className="size-2 rounded-full bg-slate-800 ring-1 ring-surface-dark">
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/30 text-slate-400 border border-slate-600/30">
                        <span className="size-1.5 rounded-full bg-slate-400"></span>
                        Hết hàng
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Xóa">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* <!-- Row 4 --> */}
                  <tr className="group hover:bg-[#1f2b30] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                          <img alt="Yellow windbreaker jacket thumbnail"
                            className="w-full h-full object-cover rounded"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOdEvmqYlkXFp5qQq3sU6OA83vYsWdTZiBVgxi-8ZBJZopH_ICBgcxpMnRkGLvbo2SEPJacu3qOxezuzVx7yvHZo3njvDtW34NxfMFTBFPn2yya8weD0G9UzVY6lqsiDjLOABNGnrUAGIrFhCY6OABiXh22F59Os5rY-HTRFgSf5sEKKT7nXu0A8Cl2J--s-RNUBQxG0lD-RcLhchAjsQMX_YBW0QDQ6BhsZD7dKT9ei2b2Mopz9Rz6QwQtgjBwIKWYSYLj1vUsZIF" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Áo Khoác Gió Vàng</p>
                          <p className="text-[#9db2b9] text-xs mt-0.5">SKU: AK-GIO-012</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                        Bé Trai / Áo Khoác
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-medium text-sm">350.000 ₫</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-[#9db2b9]">1 Màu, 4 Size</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#283539] text-[#9db2b9] border border-[#3e4c52]">
                        <span className="size-1.5 rounded-full bg-[#9db2b9]"></span>
                        Ẩn
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Xóa">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* <!-- Row 5 --> */}
                  <tr className="group hover:bg-[#1f2b30] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                        type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                          <img alt="Cute bear hat thumbnail"
                            className="w-full h-full object-cover rounded"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_vscYI__V6AjfFENECasWvoIFiDA51sGEdefRkQ4-HnBYUKIqxVCTpR_RPYj29HBR_r4YR5zOAbNNJ1wYEc-JmwYFX-2HdlJ6FLB5OqvKY1Wr2YFf5A5Dgn2RNoXiTY9bUccS2v4STi3-I37eCgq-ZGXCky7USu3Y0DTZQmX8F2aDrB5aBgsrWgNn4U0ElzIFg-500kc85QRWhcGF4Bpk2j5iDjqOl8_fc9GIeuhukDJPBLWBLDV8iSkiCrd4b-Hx-bUSLIVY1hoo" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Mũ Len Tai Gấu</p>
                          <p className="text-[#9db2b9] text-xs mt-0.5">SKU: PK-MU-099</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                        Phụ kiện
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-medium text-sm">95.000 ₫</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-[#9db2b9]">Free Size</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-400"></span>
                        Hoạt động
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
                          title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Xóa">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- Pagination --> */}
            <div className="bg-[#152025] px-6 py-4 border-t border-border-dark flex items-center justify-between">
              <div className="text-sm text-[#9db2b9]">
                Hiển thị <span className="font-medium text-white">1</span> đến <span
                  className="font-medium text-white">5</span> trong <span
                    className="font-medium text-white">48</span> kết quả
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white disabled:opacity-50 transition-colors">Trước</button>
                <button
                  className="px-3 py-1 rounded bg-primary text-background-dark font-bold text-sm">1</button>
                <button
                  className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">2</button>
                <button
                  className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">3</button>
                <span className="text-[#9db2b9] px-1">...</span>
                <button
                  className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">8</button>
                <button
                  className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">Sau</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
