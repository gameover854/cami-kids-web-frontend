import { formatVND } from "@/utils/formatCurrency";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#152025] border-b border-border-dark text-xs uppercase tracking-wider text-[#9db2b9]">
              <th className="px-6 py-4 font-semibold w-12">
                <input
                  className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                  type="checkbox"
                />
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
            {products.map((item) => (
              <tr
                className="group hover:bg-[#1f2b30] transition-colors"
                key={item.id}
              >
                <td className="px-6 py-4">
                  <input
                    className="rounded border-[#9db2b9] bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-[#111618] p-1 border border-border-dark relative group-hover:border-primary/50 transition-colors">
                      <img
                        alt="Green dinosaur t-shirt thumbnail"
                        className="w-full h-full object-cover rounded"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Ei6li-VXZbwLWbO-hLipU9tGzSC_lsRINbTEpAkwPeBZpoQLLDZfvM5Ig5ZB2nB-h2UJuC9Jw76TAnvpDL4Bwb9gv1jNn0NL5Z-2QA2jg-XLsVsg-eKDUzWaXMPu89oAuuqPpviEYrTp3qUYhgyMfcKqC-tdYEQ19cdrpCAVxhBZUaR6BUefQrW0zbqfCU-NxXejkSee5fl04qLrYGIp26nWE-sGeL3hK38K0GOf-rhVB5LwmQLoRKp0jSEDNON0pqpYluDZiiIa"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-[#9db2b9] text-xs mt-0.5">
                        ID:{item.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111618] text-[#9db2b9] border border-border-dark">
                    {item.category?.name ?? "Không có danh mục"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-white font-medium text-sm">
                    {formatVND(item.original_price)}{" "}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-[#9db2b9]">
                      {item.product_attributes?.length
                        ? item.product_attributes.map(
                            (attr) => `${attr._count.values}  ${attr.name}`
                          )
                        : "Không có biến thể"}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                      <span className="size-1.5 rounded-full bg-gray-400 animate-pulse"></span>
                      Không hoạt động
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 text-[#9db2b9] hover:text-white hover:bg-[#283539] rounded-lg transition-colors cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-[#9db2b9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#152025] px-6 py-4 border-t border-border-dark flex items-center justify-between">
        <div className="text-sm text-[#9db2b9]">
          Hiển thị <span className="font-medium text-white">1</span> đến{" "}
          <span className="font-medium text-white">5</span> trong{" "}
          <span className="font-medium text-white">{products.length}</span> kết
          quả
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white disabled:opacity-50 transition-colors">
            Trước
          </button>
          <button className="px-3 py-1 rounded bg-primary text-background-dark font-bold text-sm">
            1
          </button>
          <button className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">
            2
          </button>
          <button className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">
            3
          </button>
          <span className="text-[#9db2b9] px-1">...</span>
          <button className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">
            8
          </button>
          <button className="px-3 py-1 rounded border border-border-dark text-[#9db2b9] text-sm hover:bg-[#283539] hover:text-white transition-colors">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
