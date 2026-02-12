"use client";
import Header from "@/components/layout/header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Jane",
    },
  ]);

  useEffect(() => {
    const newUser = users.map((user) => {
      return { ...user, age: 10 };
    });
    console.log("--->useEffect run sau khi html render<---");
    setUsers(
      users.map((user) => {
        return { ...user, age: 10 };
      }),
    );
  }, []);

  console.log("--->users<---", users);
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark">
      <Header />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Danh mục Sản phẩm
              </h2>
              <p className="text-text-secondary mt-1">
                Quản lý cấu trúc phân loại cho cửa hàng thời trang trẻ em.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg shadow-primary/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Thêm danh mục
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background-dark border border-border-dark rounded-xl p-5 flex items-center justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-text-secondary text-sm font-medium mb-1">
                  Tổng danh mục
                </p>
                <p className="text-3xl font-bold text-white">124</p>
                <div className="flex items-center mt-2 text-green-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-[16px] mr-0.5">
                    trending_up
                  </span>
                  <span>+2 mới tuần này</span>
                </div>
              </div>
              <div className="size-12 rounded-lg bg-background-dark/50 flex items-center justify-center text-primary border border-border-dark">
                <span className="material-symbols-outlined">folder</span>
              </div>
            </div>
            <div className="bg-background-dark border border-border-dark rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">
                  Danh mục hiển thị
                </p>
                <p className="text-3xl font-bold text-white">118</p>
                <div className="flex items-center mt-2 text-text-secondary text-xs font-medium">
                  <span>6 danh mục ẩn</span>
                </div>
              </div>
              <div className="size-12 rounded-lg bg-background-dark/50 flex items-center justify-center text-green-500 border border-border-dark">
                <span className="material-symbols-outlined">visibility</span>
              </div>
            </div>
            <div className="bg-background-dark border border-border-dark rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">
                  Tổng sản phẩm
                </p>
                <p className="text-3xl font-bold text-white">4,520</p>
                <div className="flex items-center mt-2 text-primary text-xs font-medium">
                  <span className="material-symbols-outlined text-[16px] mr-0.5">
                    trending_up
                  </span>
                  <span>+150 sản phẩm mới</span>
                </div>
              </div>
              <div className="size-12 rounded-lg bg-background-dark/50 flex items-center justify-center text-purple-400 border border-border-dark">
                <span className="material-symbols-outlined">checkroom</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[500px]">
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-background-dark border border-border-dark rounded-xl overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-border-dark flex justify-between items-center bg-background-dark/30">
                  <h3 className="font-semibold text-white">Cây thư mục</h3>
                  <button className="text-text-secondary hover:text-white p-1 rounded hover:bg-white/5">
                    <span className="material-symbols-outlined text-[20px]">
                      filter_list
                    </span>
                  </button>
                </div>
                <div className="p-2 overflow-y-auto flex-1">
                  <div className="group flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mb-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
                    <span
                      className="material-symbols-outlined text-[20px] font-variation-filled"
                      style={{ fontVariationSettings: "FILL " }}
                    >
                      folder
                    </span>
                    <span className="text-sm font-medium truncate">
                      Thời trang Bé trai
                    </span>
                  </div>

                  <div className="ml-4 pl-2 border-l border-border-dark flex flex-col gap-1 mb-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg text-white hover:bg-white/5 cursor-pointer">
                      <span className="material-symbols-outlined text-[20px] text-text-secondary">
                        chevron_right
                      </span>
                      <span className="text-sm">Áo thun &amp; Polo</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-white hover:bg-white/5 cursor-pointer bg-white/5 font-medium">
                      <span className="material-symbols-outlined text-[20px] text-text-secondary">
                        chevron_right
                      </span>
                      <span className="text-sm">Quần Short &amp; Jeans</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 cursor-pointer">
                      <span className="material-symbols-outlined text-[20px] text-text-secondary">
                        chevron_right
                      </span>
                      <span className="text-sm">Đồ bộ mặc nhà</span>
                    </div>
                  </div>

                  <div className="group flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 mb-1 cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      folder
                    </span>
                    <span className="text-sm font-medium truncate">
                      Thời trang Bé gái
                    </span>
                  </div>
                  <div className="group flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 mb-1 cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      folder
                    </span>
                    <span className="text-sm font-medium truncate">
                      Phụ kiện &amp; Giày dép
                    </span>
                  </div>
                  <div className="group flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 mb-1 cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                    <span className="material-symbols-outlined text-[20px]">
                      folder
                    </span>
                    <span className="text-sm font-medium truncate">
                      Sơ sinh (0-24M)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-background-dark border border-border-dark rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                <div className="p-4 border-b border-border-dark flex flex-wrap items-center justify-between gap-4 bg-background-dark/30">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <span className="text-text-secondary">Đang xem:</span>
                    <span>Thời trang Bé trai / Quần Short &amp; Jeans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2">
                      <option>Tất cả trạng thái</option>
                      <option>Hiển thị</option>
                      <option>Đang ẩn</option>
                    </select>
                    <div className="h-8 w-[1px] bg-border-dark mx-1"></div>
                    <button
                      className="text-text-secondary hover:text-white transition-colors"
                      title="Reload"
                    >
                      <span className="material-symbols-outlined">refresh</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-secondary uppercase bg-background-dark border-b border-border-dark">
                      <tr>
                        <th className="p-4 w-4" scope="col">
                          <div className="flex items-center">
                            <input
                              className="w-4 h-4 text-primary bg-background-dark border-border-dark rounded focus:ring-primary focus:ring-2"
                              id="checkbox-all"
                              type="checkbox"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th className="px-6 py-3" scope="col">
                          Danh mục con
                        </th>
                        <th className="px-6 py-3" scope="col">
                          Slug (Đường dẫn)
                        </th>
                        <th className="px-6 py-3 text-center" scope="col">
                          Sản phẩm
                        </th>
                        <th className="px-6 py-3 text-center" scope="col">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-right" scope="col">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-dark">
                      <tr className="bg-background-dark hover:bg-background-dark/50 transition-colors group">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              className="w-4 h-4 text-primary bg-background-dark border-border-dark rounded focus:ring-primary focus:ring-2"
                              id="checkbox-1"
                              type="checkbox"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="h-10 w-10 rounded-lg bg-cover bg-center border border-border-dark flex-shrink-0"
                              data-alt="Dark blue denim fabric texture"
                              style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCT0yK8OLrZ-QEcwfOF-DxPBkIHpqVXPzwzVV8PDbYjWcyOgV-p8RDwaEHUaDPMpPHrAGdf0qlaIDlY5jAXiJur2jkRFtrh0igpUTajbn4dYvdzoi0NWg507PaOpyTkwLqG53QFFqHOxFsqFbl4vgCvJArXmygvcNQpswTFCdkUfPwx35zVEB3vsOs6ZGlJM4-cGObSS4tMNx9o_PrZLVy3ot-E7I3fO22S781_97WE9_tL2JOvBxX5-0I9T92xSjeYXqVqZRtxX7cv")`,
                              }}
                            ></div>
                            <div>
                              <div className="text-base font-semibold text-white">
                                Quần Jeans Dài
                              </div>
                              <div className="font-normal text-xs text-text-secondary">
                                Cập nhật: 2 giờ trước
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-background-dark border border-border-dark text-xs font-mono">
                            /quan-jeans-dai
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-primary/20">
                            45
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              className="sr-only peer"
                              type="checkbox"
                              value=""
                            />
                            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="font-medium text-primary hover:underline p-1.5 hover:bg-primary/10 rounded"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button
                              className="font-medium text-red-500 hover:underline p-1.5 hover:bg-red-500/10 rounded"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-background-dark hover:bg-background-dark/50 transition-colors group">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              className="w-4 h-4 text-primary bg-background-dark border-border-dark rounded focus:ring-primary focus:ring-2"
                              id="checkbox-2"
                              type="checkbox"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="h-10 w-10 rounded-lg bg-cover bg-center border border-border-dark flex-shrink-0"
                              data-alt="Light khaki shorts texture"
                              style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCz4ea0FgJQeRuZve-fplnfob-RX-U41SNEdZm6lRqjIIe_6efaXRFjLvvw7DTmiPWBMKeqkOsEMxGJje3-ptBl_Vt-yRsrwR1s-edsfNuMMS1n81AAb11c7eXdlZR0Ie-eRsd1CdpXOH93IWsukcy6v9ZvoJ6T90jYgE39MQVFMqKcEZxOGdB4oYIFDK7ZIiB7IsXugttcrlHoiBO7fKoBjFLOzt3lmL-rkBbg1pEaMoutaL_N6IYv_9MRaIFP0yuPXPv6vvKNHpaq")`,
                              }}
                            ></div>
                            <div>
                              <div className="text-base font-semibold text-white">
                                Quần Short Kaki
                              </div>
                              <div className="font-normal text-xs text-text-secondary">
                                Cập nhật: 1 ngày trước
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-background-dark border border-border-dark text-xs font-mono">
                            /quan-short-kaki
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-primary/20">
                            32
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              className="sr-only peer"
                              type="checkbox"
                              value=""
                            />
                            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="font-medium text-primary hover:underline p-1.5 hover:bg-primary/10 rounded"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button
                              className="font-medium text-red-500 hover:underline p-1.5 hover:bg-red-500/10 rounded"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      <tr className="bg-background-dark hover:bg-background-dark/50 transition-colors group">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              className="w-4 h-4 text-primary bg-background-dark border-border-dark rounded focus:ring-primary focus:ring-2"
                              id="checkbox-3"
                              type="checkbox"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="h-10 w-10 rounded-lg bg-cover bg-center border border-border-dark flex-shrink-0"
                              data-alt="Soft gray cotton fabric pattern"
                              style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCU4ogxLdfUeOSAKk87ve1rjWJ6COWZvUVMeIbXyghXmYdqApl2K-2b-yJWgYGteXFckFy4PgbM7pwK5_F5ewC6NAsja_DIrZ1YM_wscvBIcxEnVDZZ5Wb3-VOvz-7vYA1UmW6uWyOynljCD6ye86sa_U-c2iW4pgAXUBgX2-wKpX3YBD5pxpSaYcwDxgfoGZr6upLauifHwMPIBRp7zzh26-lQIrvJdaVmwQowi3cBXRR6KDedz_-NFyrOItyiTPdGt3ooc9iiDJgU")`,
                              }}
                            ></div>
                            <div>
                              <div className="text-base font-semibold text-white">
                                Quần Nỉ Thể Thao
                              </div>
                              <div className="font-normal text-xs text-text-secondary">
                                Cập nhật: 3 ngày trước
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-background-dark border border-border-dark text-xs font-mono">
                            /quan-ni-sport
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full border border-primary/20">
                            18
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              className="sr-only peer"
                              type="checkbox"
                              value=""
                            />
                            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="font-medium text-primary hover:underline p-1.5 hover:bg-primary/10 rounded"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button
                              className="font-medium text-red-500 hover:underline p-1.5 hover:bg-red-500/10 rounded"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-background-dark hover:bg-background-dark/50 transition-colors group">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              className="w-4 h-4 text-primary bg-background-dark border-border-dark rounded focus:ring-primary focus:ring-2"
                              id="checkbox-4"
                              type="checkbox"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="h-10 w-10 rounded-lg bg-cover bg-center border border-border-dark flex-shrink-0"
                              data-alt="Blue denim shorts pattern"
                              style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY-TdNJ1zQVu0ESXCUe2huTxvOIrYDdYfa_mZ4q4ZbThKaJetN2lXlk4ZxulK7pyl_mz8sBhBDm1UJK7gAsJDsy6wdwtkKIJvCu_cXPa2CQqdCuBZK6xK5XPB7haDYnYc2-Vg30_b2IitnooPyoRTfoBasFz3nRXhCWx0PySHQZxupXncn4bULGceD2TYCtnP6EhmsrBrGLAuMgclMEMWd9Hz90wRaKxmSB6Wzjk-doo1Uve6Qw3hSWbm7zG9uhiBOKmFsW7e7naq-")`,
                              }}
                            ></div>
                            <div>
                              <div className="text-base font-semibold text-white">
                                Quần Short Jeans
                              </div>
                              <div className="font-normal text-xs text-text-secondary">
                                Cập nhật: 1 tuần trước
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-background-dark border border-border-dark text-xs font-mono">
                            /quan-short-jeans
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-gray-700/50 text-text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-600">
                            0
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              className="sr-only peer"
                              type="checkbox"
                              value=""
                            />
                            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="font-medium text-primary hover:underline p-1.5 hover:bg-primary/10 rounded"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button
                              className="font-medium text-red-500 hover:underline p-1.5 hover:bg-red-500/10 rounded"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-border-dark flex items-center justify-between bg-background-dark/30 mt-auto">
                  <span className="text-sm text-text-secondary">
                    Hiển thị{" "}
                    <span className="font-semibold text-white">1-4</span> trong
                    số <span className="font-semibold text-white">12</span> danh
                    mục
                  </span>
                  <div className="inline-flex items-center -space-x-px">
                    <button className="px-3 py-2 ml-0 leading-tight text-text-secondary bg-background-dark border border-border-dark rounded-l-lg hover:bg-gray-700 hover:text-white">
                      <span className="sr-only">Previous</span>
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_left
                      </span>
                    </button>
                    <button className="px-3 py-2 leading-tight text-white bg-primary border border-primary hover:bg-primary/90 hover:text-white">
                      1
                    </button>
                    <button className="px-3 py-2 leading-tight text-text-secondary bg-background-dark border border-border-dark hover:bg-gray-700 hover:text-white">
                      2
                    </button>
                    <button className="px-3 py-2 leading-tight text-text-secondary bg-background-dark border border-border-dark hover:bg-gray-700 hover:text-white">
                      3
                    </button>
                    <button className="px-3 py-2 leading-tight text-text-secondary bg-background-dark border border-border-dark rounded-r-lg hover:bg-gray-700 hover:text-white">
                      <span className="sr-only">Next</span>
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
