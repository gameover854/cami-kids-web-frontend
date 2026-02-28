import Header from "@/components/layout/header";

export default function AdminPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-[#111618] dark:text-white">
                Tổng quan
              </h2>
              <p className="text-text-gray-200 dark:text-text-gray-100 text-base">
                Chào mừng trở lại, đây là tình hình kinh doanh hôm nay.
              </p>
            </div>
            <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
              <span className="material-symbols-outlined text-[18px] mr-2">
                download
              </span>
              Xuất báo cáo
            </button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Tổng doanh thu
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">500.000.000 ₫</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Tăng 12% so với tháng trước
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Đơn hàng
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">1.240</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Tăng 5% so với tháng trước
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Khách hàng mới
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">350</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Tăng 2% so với tháng trước
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Giá trị đơn trung bình
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">405.000 ₫</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Giảm 1% so với tháng trước
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white">
                Cảnh báo tồn kho
              </h3>
              <p className="text-sm text-text-gray-200 dark:text-text-gray-100 mt-1">
                Một số sản phẩm sắp hết hàng, vui lòng nhập thêm.
              </p>
            </section>

            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white">
                Sản phẩm bán chạy
              </h3>
              <p className="text-sm text-text-gray-200 dark:text-text-gray-100 mt-1">
                Theo dõi các sản phẩm có doanh thu tốt để ưu tiên tồn kho.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
