export default function AdminPage() {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-black tracking-tight text-[#111618] dark:text-white">Tổng quan</h2>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base">Chào mừng trở lại, đây là
                                tình hình kinh doanh hôm nay.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                className="p-2 rounded-lg bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button
                                className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                                <span className="material-symbols-outlined text-[18px] mr-2">download</span>
                                Xuất báo cáo
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div
                            className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Tổng doanh
                                    thu
                                </p>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold tracking-tight">500.000.000 ₫</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <span
                                    className="text-[#0bda57] font-semibold bg-[#0bda57]/10 px-1.5 py-0.5 rounded text-xs flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                    12%
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs ml-1">so với tháng
                                    trước</span>
                            </div>
                        </div>

                        <div
                            className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Đơn hàng</p>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold tracking-tight">1.240</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <span
                                    className="text-[#0bda57] font-semibold bg-[#0bda57]/10 px-1.5 py-0.5 rounded text-xs flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                    5%
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs ml-1">so với tháng
                                    trước</span>
                            </div>
                        </div>

                        <div
                            className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Khách hàng
                                    mới
                                </p>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold tracking-tight">350</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <span
                                    className="text-[#0bda57] font-semibold bg-[#0bda57]/10 px-1.5 py-0.5 rounded text-xs flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                    2%
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs ml-1">so với tháng
                                    trước</span>
                            </div>
                        </div>

                        <div
                            className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Giá trị TB
                                    đơn
                                </p>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold tracking-tight">405.000 ₫</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <span
                                    className="text-[#fa5f38] font-semibold bg-[#fa5f38]/10 px-1.5 py-0.5 rounded text-xs flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_down</span>
                                    1%
                                </span>
                                <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs ml-1">so với tháng
                                    trước</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div
                            className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-[#111618] dark:text-white">Hiệu suất bán hàng</h3>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Doanh thu theo tuần
                                        (Tháng
                                        10)</p>
                                </div>
                                <select
                                    className="bg-transparent text-sm font-medium text-primary border-none focus:ring-0 cursor-pointer">
                                    <option>Tháng này</option>
                                    <option>Tháng trước</option>
                                </select>
                            </div>
                            <div className="relative h-[240px] w-full">
                                {/* <svg className="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 478 150">
                                    <defs>
                                        <lineargradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stop-color="#13b6ec" stop-opacity="0.2"></stop>
                                            <stop offset="100%" stop-color="#13b6ec" stop-opacity="0"></stop>
                                        </lineargradient>
                                    </defs>
                                    <!-- Area Fill -->
                                    <path
                                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z"
                                        fill="url(#chartGradient)"></path>
                                    <!-- Stroke Line -->
                                    <path
                                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                                        fill="none" stroke="#13b6ec" stroke-linecap="round" stroke-width="3"></path>
                                </svg> */}
                            </div>
                            <div className="flex justify-between mt-4 px-2">
                                <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">Tuần
                                    1</span>
                                <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">Tuần
                                    2</span>
                                <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">Tuần
                                    3</span>
                                <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">Tuần
                                    4</span>
                            </div>
                        </div>
                        <div
                            className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-1">Top danh mục</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">Phân loại theo số
                                    lượng
                                    bán</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Bé trai</span>
                                        <span className="text-primary font-bold">45%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Bé gái</span>
                                        <span className="text-purple-500 font-bold">35%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Phụ kiện</span>
                                        <span className="text-orange-500 font-bold">15%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Sơ sinh</span>
                                        <span className="text-teal-500 font-bold">5%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '5%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

                        <div
                            className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div
                                className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-red-50 dark:bg-red-900/10">
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined">warning</span>
                                    Cảnh báo tồn kho
                                </h3>
                                <button className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Xem tất cả</button>
                            </div>
                            <div className="p-0">
                                <div
                                    className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="h-12 w-12 rounded-lg bg-cover bg-center mr-4 flex-shrink-0"
                                        data-alt="Small thumbnail of a blue denim jacket"
                                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpjJa4Cn4xdr4-6WujZoiiagOyzcxPAp95K7zbMwB_FkoZ861yaKXLYnfIKLq0Wghbssr24OLvFgq6wY98WxCIIhl5Jxn1D1213m1XP3XL7Aezg5Saa78NqY9UNB_xvtZoqZrPHjcxgalTc7bZkUfHKmQfIEmoczTgjLIpDYVBT7HpSHfZCgmZbigHN3iHqDMHP0A_nhqcNkfbafUjnf9kopar_swaTSqE32zipiKDik9UQ_TldLCP6cJAdsN0sOmSAWdmZI1vytUB");` }}>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate text-[#111618] dark:text-white">Áo khoác Denim (Size
                                            4)
                                        </h4>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Mã: SP-0012</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-red-500">Còn 2 cái</p>
                                        <button className="text-xs text-primary font-medium hover:underline">Nhập hàng</button>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="h-12 w-12 rounded-lg bg-cover bg-center mr-4 flex-shrink-0"
                                        data-alt="Small thumbnail of a pink dress"
                                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2yVCq_iVlLiyNhQkhTUSPkNL4iDvRXE_KSxnFd_p35VtqQYUBJCatbWlejZQV59AxvF5b_VkezXc37D8PvqyAJj9iyAIWW1gW81QV9Lpl48CHjCM1vwSt-pjMU-ddKS-22XOarby7X_r6yfZIGxNdwFTe9YFkxTMH51jZUCf5UOefgqYky6jZDuNQbkcdg7te8ErJuPgfYWoHJgaQssuQ_BAxsYkRlgzFuJWeYJfhB5jPrjcneMd-EbyabmHw5Uq-sJCbRwdHgYkL");` }}>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate text-[#111618] dark:text-white">Váy hoa nhí (Size 2)
                                        </h4>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Mã: SP-0034</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-red-500">Còn 5 cái</p>
                                        <button className="text-xs text-primary font-medium hover:underline">Nhập hàng</button>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center p-4 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="h-12 w-12 rounded-lg bg-cover bg-center mr-4 flex-shrink-0"
                                        data-alt="Small thumbnail of yellow sneakers"
                                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvl1JE8ExVbCrozrGoiK1KSdfULo6NncbtUXefIRMMXyKSGTAiTe7I5bktn4PWivsntqL0ikkR8CV57rR5Ur9NXAT9ywBv09y1zwBLYUAuDDH3i3R9aNbw1o5Uuh9GrQUMGl-oQM20_CkuVU-Lb24sb4i4F8hUTJGk1c5795wanQkPx7c_eQ1vykO2mEqXFRN3mP0q4NdL3Fbf26pWE-0itvhvLiK7mLtLgt74kqPBAJxSH620zZIgodlt723qWCSXkqPKfrWo1zPY");'` }}>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate text-[#111618] dark:text-white">Giày thể thao vàng
                                            (Size
                                            30)</h4>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Mã: SP-0089</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-red-500">Còn 1 cái</p>
                                        <button className="text-xs text-primary font-medium hover:underline">Nhập hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#111618] dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500">star</span>
                                    Sản phẩm bán chạy
                                </h3>
                                <button className="text-xs font-bold text-primary hover:underline">Báo cáo chi tiết</button>
                            </div>
                            <div className="p-0">

                                <div
                                    className="grid grid-cols-12 px-4 py-3 bg-background-light dark:bg-background-dark/50 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                                    <div className="col-span-7">Sản phẩm</div>
                                    <div className="col-span-3 text-right">Đã bán</div>
                                    <div className="col-span-2 text-right">Doanh thu</div>
                                </div>

                                <div
                                    className="grid grid-cols-12 px-4 py-3 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="col-span-7 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-md bg-cover bg-center"
                                            data-alt="Thumbnail of a cute teddy bear t-shirt"
                                            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuByGV8jreQWFPyA-zZsfubHZ-mxsS6rNuVDuh7fa8QpcsyFnhpoO6vRNp5Gk5IZ7TAspjqDwoRAkzT-LwjXn-AmjUzXCi3Q2VnipeKF1p5Zpg9SBtAef5abAi4qdwUhPQyEXvQA6ImwsXIm66MRBTOpyACUHSRiG4MlISMe0Cna8KHC6wvlNq9YXNEv8fVjr_uan7wtyrC3ziqPj59MfKzuzbzRK4Ay4b1gV-DWWJDv7zytgI4IgPlKMn452Eu8u-dUqdv60eeM-5-D");'` }}>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-[#111618] dark:text-white">Áo thun Gấu Teddy</p>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">150.000 ₫</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-right text-sm font-semibold text-[#111618] dark:text-white">245</div>
                                    <div
                                        className="col-span-2 text-right text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        36tr</div>
                                </div>

                                <div
                                    className="grid grid-cols-12 px-4 py-3 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="col-span-7 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-md bg-cover bg-center"
                                            data-alt="Thumbnail of a set of baby pajamas"
                                            style={{ backgroundImage: `'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzdBBYVneRZ8e0RFuPaYc5jQLS1fXIG_tW25gNjOPEQ4VIH2Rl55WkCgB7HFfyF1ynnj7nxMhzrM6HnC6qlC2oGgWB1nRh86Epgc_Q7YwwMPmuXI-3UNKCB8zZ4wN4ke3C5VyZsgI6WVKvgTUjIq4PQnb7LqVWt4r4KXE3uVlOykO4VuXVan2GpY8ZhSQoX3Zg99kVa0YvaEKjP9gT9F2P4jT3y6h2iffeFn8atif42tkaOZeMbVqBYbuDiGucn_Q1YC8PlquMl81v");` }}>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-[#111618] dark:text-white">Bộ đồ ngủ Cotton</p>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">200.000 ₫</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-right text-sm font-semibold text-[#111618] dark:text-white">189</div>
                                    <div
                                        className="col-span-2 text-right text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        37tr</div>
                                </div>

                                <div
                                    className="grid grid-cols-12 px-4 py-3 items-center hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                    <div className="col-span-7 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-md bg-cover bg-center"
                                            data-alt="Thumbnail of a dinosaur patterned hat"
                                            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ3kDCGxlZVefcZoXXpFqzACRWdbbqHforeDjZJ9Cw4fr92tuHql1ODClgOytuP_5KXV09YzRmImmQAtPvaOv2wjvGRjPnDLq6nkakytTx4SOmCpYJaYnMarI_nV1h_Xgw2dtL7vnNcG8UhiYVg3YXOeXGKygSMAAXMvis7L8kiDfwppDmmOXAXET49JJakTJVESh0BX_RlHsrmCPjyXq94aWHODLqCx_98kfY_mnkcowY7Z-4Gxjh4Sbg37cq2d_QJExE2ks8adHH");` }}>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-[#111618] dark:text-white">Mũ Khủng Long</p>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">95.000 ₫</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-right text-sm font-semibold text-[#111618] dark:text-white">156</div>
                                    <div
                                        className="col-span-2 text-right text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        14tr</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}