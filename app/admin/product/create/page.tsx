'use client'

import { createProduct } from "@/services/product.services";

export default function CreateProductPage() {
    async function create() {
        await createProduct({ data: 123 });
    }
    return (

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
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
                    <span>Sản phẩm</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-white font-medium">Thêm sản phẩm</span>
                </div>
                <div className="flex items-center gap-4 ml-auto">
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
            <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Thêm sản phẩm mới</h1>
                            <p className="text-[#9db2b9] text-sm">Điền thông tin chi tiết cho sản phẩm thời trang</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="px-5 h-10 rounded-lg bg-surface-dark text-[#9db2b9] text-sm font-bold border border-border-dark hover:text-white hover:bg-[#283539] transition-all">
                                Hủy bỏ
                            </button>
                            <div className="flex items-center justify-center gap-2 px-6 h-10 rounded-lg bg-primary text-background-dark text-sm font-bold hover:bg-[#3ec4f1] transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                <span onClick={create}>Lưu sản phẩm</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    Thông tin cơ bản
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#9db2b9] mb-1">Tên sản phẩm <span
                                            className="text-red-500">*</span></label>
                                        <input
                                            className="w-full rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary placeholder-[#9db2b9]/50"
                                            placeholder="Ví dụ: Áo Thun Polo Bé Trai Cotton" type="text" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#9db2b9] mb-1">Giá gốc
                                                (VNĐ)</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded-lg text-sm pl-3 pr-10 py-2.5 text-right font-medium focus:ring-1 focus:ring-primary"
                                                    placeholder="0" type="number" />
                                                <div
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <span className="text-[#9db2b9] text-xs">₫</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#9db2b9] mb-1">Mã SKU Mặc
                                                định</label>
                                            <div className="flex gap-2">
                                                <input
                                                    className="w-full rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary"
                                                    placeholder="SKU-001" type="text" />
                                                <button
                                                    className="px-3 py-2 bg-[#111618] border border-border-dark rounded-lg text-[#9db2b9] hover:text-white hover:border-primary transition-colors"
                                                    title="Tạo tự động">
                                                    <span className="material-symbols-outlined text-[20px]">autorenew</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#9db2b9] mb-1">Mô tả sản phẩm</label>
                                        <div
                                            className="rounded-lg border border-border-dark overflow-hidden bg-[#111618] focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                                            <div
                                                className="flex items-center gap-1 p-2 border-b border-border-dark bg-[#152025]">
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">format_bold</span></button>
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">format_italic</span></button>
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">format_underlined</span></button>
                                                <div className="w-px h-4 bg-border-dark mx-1"></div>
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">link</span></button>
                                                <button
                                                    className="p-1 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded"><span
                                                        className="material-symbols-outlined text-[18px]">image</span></button>
                                            </div>
                                            <textarea
                                                className="w-full border-none p-3 text-sm focus:ring-0 resize-y bg-transparent"
                                                placeholder="Nhập mô tả chi tiết về chất liệu, kiểu dáng..."
                                                rows={4}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">style</span>
                                        Biến thể sản phẩm
                                    </h2>
                                    <button
                                        className="text-primary text-sm font-bold hover:text-[#3ec4f1] flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        Thêm biến thể
                                    </button>
                                </div>
                                <div className="overflow-x-auto rounded-lg border border-border-dark">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr
                                                className="bg-[#152025] text-xs uppercase tracking-wider text-[#9db2b9] border-b border-border-dark">
                                                <th className="px-4 py-3 font-semibold w-1/6">Màu sắc</th>
                                                <th className="px-4 py-3 font-semibold w-1/6">Kích cỡ</th>
                                                <th className="px-4 py-3 font-semibold w-1/4">SKU <span
                                                    className="text-red-500">*</span></th>
                                                <th className="px-4 py-3 font-semibold text-right w-1/6">Giá bán <span
                                                    className="text-red-500">*</span></th>
                                                <th className="px-4 py-3 font-semibold text-right w-1/6">Tồn kho</th>
                                                <th className="px-4 py-3 font-semibold w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-dark bg-[#111618]">
                                            <tr>
                                                <td className="px-4 py-3 align-top">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            className="h-8 w-8 rounded cursor-pointer border-none bg-transparent p-0 flex-shrink-0"
                                                            type="color" value="#ef4444" />
                                                        <input
                                                            className="w-full min-w-[60px] rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                            type="text" value="Đỏ" />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <select
                                                        className="w-full min-w-[70px] rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary">
                                                        <option>XS</option>
                                                        <option>S</option>
                                                        <option selected={true}>M</option>
                                                        <option>L</option>
                                                        <option>XL</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        required={true} type="text" value="AT-DIN-RED-M" />
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        type="number" value="150000" />
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        min="0" type="number" value="50" />
                                                </td>
                                                <td className="px-4 py-3 align-top text-right">
                                                    <button
                                                        className="text-[#9db2b9] hover:text-red-400 p-1 bg-surface-dark rounded hover:bg-[#283539] transition-colors"><span
                                                            className="material-symbols-outlined text-[20px]">delete</span></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 align-top">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            className="h-8 w-8 rounded cursor-pointer border-none bg-transparent p-0 flex-shrink-0"
                                                            type="color" value="#3b82f6" />
                                                        <input
                                                            className="w-full min-w-[60px] rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                            type="text" value="Xanh" />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <select
                                                        className="w-full min-w-[70px] rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary">
                                                        <option>XS</option>
                                                        <option>S</option>
                                                        <option>M</option>
                                                        <option selected={true}>L</option>
                                                        <option>XL</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        type="text" value="AT-DIN-BLU-L" />
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        required type="number" value="150000" />
                                                </td>
                                                <td className="px-4 py-3 align-top">
                                                    <input
                                                        className="w-full rounded px-2 py-1 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                                        min="0" type="number" value="32" />
                                                </td>
                                                <td className="px-4 py-3 align-top text-right">
                                                    <button
                                                        className="text-[#9db2b9] hover:text-red-400 p-1 bg-surface-dark rounded hover:bg-[#283539] transition-colors"><span
                                                            className="material-symbols-outlined text-[20px]">delete</span></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="p-3 bg-[#111618] border-t border-border-dark flex justify-center">
                                        <button
                                            className="text-sm text-[#9db2b9] hover:text-primary flex items-center gap-1 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                            Thêm nhanh dòng mới
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">imagesmode</span>
                                    Hình ảnh sản phẩm
                                </h2>
                                <div
                                    className="border-2 border-dashed border-border-dark rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-[#111618] cursor-pointer group">
                                    <div
                                        className="bg-surface-dark p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                                    </div>
                                    <p className="text-white font-medium text-sm">Kéo thả hình ảnh vào đây hoặc click để chọn
                                    </p>
                                    <p className="text-[#9db2b9] text-xs mt-1">Hỗ trợ JPG, PNG, WEBP. Tối đa 5MB/ảnh.</p>
                                </div>
                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div
                                        className="relative group aspect-square rounded-lg border-2 border-primary overflow-hidden bg-[#111618]">
                                        <img alt="Product Image" className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Ei6li-VXZbwLWbO-hLipU9tGzSC_lsRINbTEpAkwPeBZpoQLLDZfvM5Ig5ZB2nB-h2UJuC9Jw76TAnvpDL4Bwb9gv1jNn0NL5Z-2QA2jg-XLsVsg-eKDUzWaXMPu89oAuuqPpviEYrTp3qUYhgyMfcKqC-tdYEQ19cdrpCAVxhBZUaR6BUefQrW0zbqfCU-NxXejkSee5fl04qLrYGIp26nWE-sGeL3hK38K0GOf-rhVB5LwmQLoRKp0jSEDNON0pqpYluDZiiIa" />
                                        <div
                                            className="absolute top-2 left-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                            Ảnh chính</div>
                                        <button
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                        <div
                                            className="absolute inset-x-0 bottom-0 bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex justify-center cursor-move">
                                            <span
                                                className="material-symbols-outlined text-white text-[16px]">drag_handle</span>
                                        </div>
                                    </div>
                                    <div
                                        className="relative group aspect-square rounded-lg border border-border-dark overflow-hidden bg-[#111618] hover:border-[#9db2b9] transition-colors">
                                        <img alt="Product Image"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeCFHPHTIlwj8Kt6iJvGdY5lEnr7hJPinO-NzXnnoQrTGjFNArSa8pb6uYeEx2qFmGg7MQO9muajCboj4QDVqsyNYfSDWuR2QEijdk6L2oKabWFeASu9nimeij9THgJ_ayoArZ9331kI5gckhmE6W-bc5YvSZ_cL_pSRuWzakp-FNqqm62uvak5eUCfZRvV-O6bRCCB_z8GOftAuSWiDPEO_V_9q20vROT1muc9xtbrp08gSYedQrQIWbO4YFJ5nV2xNm6OZtuqkqe" />
                                        <button
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                        <div
                                            className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex justify-center gap-2">
                                            <button className="text-xs text-white hover:text-primary underline">Đặt làm
                                                chính</button>
                                        </div>
                                    </div>
                                    <div
                                        className="relative group aspect-square rounded-lg border border-border-dark overflow-hidden bg-[#111618] hover:border-[#9db2b9] transition-colors">
                                        <img alt="Product Image"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDJNK9os0IdPlUmjX4MATjlClUc6mLFQ_OwJ5qUyMXIXB0Bhmv_kMkB1P_QMvBCNUnbJWC_ngvJP2E9wO4EmfTH-d1Z5eobIjxjDIPTux4CEBeIsakNhQluqVTPjXaaoOcJylcDqo7Y0Yu5xpaD0U1XvTTv01x0f2ul-3FYpSJ6_A2YBgAnmtQtfgl0fIF2VGKw2nfgRV_hiEzubgJgjzd1sl67NzmBK7F3iEsEU1sulIeQ6OVb3f32Xsqb3m2cV1VLGIM8QD-Empz" />
                                        <button
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                        <div
                                            className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex justify-center gap-2">
                                            <button className="text-xs text-white hover:text-primary underline">Đặt làm
                                                chính</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="flex flex-col gap-6">
                            <section
                                className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm sticky top-24">
                                <h2 className="text-lg font-bold text-white mb-4">Tổ chức</h2>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between pb-4 border-b border-border-dark">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">Trạng thái</span>
                                            <span className="text-xs text-[#9db2b9]">Cho phép bán</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input checked className="sr-only peer" type="checkbox" value="" />
                                            <div
                                                className="w-11 h-6 bg-[#283539] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500">
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#9db2b9] mb-1">Danh mục</label>
                                        <select
                                            className="w-full rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary">
                                            <option value="">-- Chọn danh mục --</option>
                                            <optgroup label="Bé Trai">
                                                <option value="bt-ao">Bé Trai / Áo Thun</option>
                                                <option value="bt-quan">Bé Trai / Quần</option>
                                            </optgroup>
                                            <optgroup label="Bé Gái">
                                                <option value="bg-vay">Bé Gái / Váy Đầm</option>
                                                <option value="bg-ao">Bé Gái / Áo</option>
                                            </optgroup>
                                            <option value="phukien">Phụ kiện</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#9db2b9] mb-1">Bộ sưu tập</label>
                                        <div className="relative">
                                            <div
                                                className="flex items-center gap-1 flex-wrap p-2 border border-border-dark rounded-t-lg bg-[#111618]">
                                                <span
                                                    className="bg-primary/20 text-primary text-xs px-2 py-1 rounded flex items-center gap-1">Back
                                                    to School <button className="hover:text-white">×</button></span>
                                                <input
                                                    className="flex-1 bg-transparent border-none text-sm p-1 focus:ring-0 min-w-[50px]"
                                                    placeholder="Tìm bộ sưu tập..." type="text" />
                                            </div>
                                            <div
                                                className="max-h-40 overflow-y-auto border border-border-dark border-t-0 rounded-b-lg bg-[#111618] p-2 space-y-1">
                                                <label
                                                    className="flex items-center gap-2 p-1.5 hover:bg-surface-dark rounded cursor-pointer">
                                                    <input
                                                        className="rounded border-border-dark bg-transparent text-primary focus:ring-primary"
                                                        type="checkbox" />
                                                    <span className="text-sm text-white">Hàng Mới Về</span>
                                                </label>
                                                <label
                                                    className="flex items-center gap-2 p-1.5 hover:bg-surface-dark rounded cursor-pointer">
                                                    <input
                                                        className="rounded border-border-dark bg-transparent text-primary focus:ring-primary"
                                                        type="checkbox" />
                                                    <span className="text-sm text-white">Bộ Sưu Tập Mùa Hè</span>
                                                </label>
                                                <label
                                                    className="flex items-center gap-2 p-1.5 hover:bg-surface-dark rounded cursor-pointer bg-surface-dark/50">
                                                    <input checked
                                                        className="rounded border-border-dark bg-transparent text-primary focus:ring-primary"
                                                        type="checkbox" />
                                                    <span className="text-sm text-white">Back to School</span>
                                                </label>
                                                <label
                                                    className="flex items-center gap-2 p-1.5 hover:bg-surface-dark rounded cursor-pointer">
                                                    <input
                                                        className="rounded border-border-dark bg-transparent text-primary focus:ring-primary"
                                                        type="checkbox" />
                                                    <span className="text-sm text-white">Giảm giá Flash Sale</span>
                                                </label>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#9db2b9] mt-1">Chọn một hoặc nhiều bộ sưu tập.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}