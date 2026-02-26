import { formatVND } from "@/utils/formatCurrency";
import Link from "next/link";

export default function ProductTable({
  products,
  remove,
}: {
  products: Product[];
  remove: (id: number) => void;
}) {
  return (
    <div className="dark:bg-background-dark rounded-xl border dark:border-border-gray overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark text-xs uppercase tracking-wider text-text-gray-100">
              <th className="px-6 py-4 font-semibold w-12">
                <input
                  className="rounded bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                  type="checkbox"
                />
              </th>
              <th className="px-6 py-4 font-semibold">Sản phẩm</th>
              <th className="px-6 py-4 font-semibold">Thương hiệu</th>
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
                className="group hover:bg-hover transition-colors"
                key={item.id}
              >
                <td className="px-6 py-4">
                  <input
                    className="rounded bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-4"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/product/${item.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg p-1 border border-border-gray relative group-hover:border-primary/50 transition-colors">
                        <img
                          alt="Green dinosaur t-shirt thumbnail"
                          className="w-full h-full object-cover rounded"
                          src={item.images?.at(-1)?.url ?? "/item_example.png"}
                        />
                      </div>
                      <div>
                        <p className="text-text-gray-100 font-medium text-sm">
                          {item.name}
                        </p>
                        <p className="text-text-gray-100 text-xs mt-0.5">
                          ID:{item.id}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs bold text-text-gray-100">
                      {item.brand ? item.brand.name : "Không có thương hiệu"}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background-gray text-text-light border border-border-gray">
                    {item.category?.parent
                      ? item.category?.parent.name + " / "
                      : ""}{" "}
                    {item.category?.name ?? "Không có danh mục"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-text-gray-200 font-medium text-sm">
                    {formatVND(item.selling_price)}{" "}
                  </p>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {item.attributes?.length ? (
                      item.attributes.map((attr) => (
                        <p className="text-xs text-text-gray-100" key={attr.id}>
                          {attr._count?.values} - {attr.name}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs text-text-gray-100 italic">
                        Không có biến thể
                      </p>
                    )}
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
                      className="p-1.5 text-text-gray-100 hover:text-white hover:bg-[#283539] rounded-lg transition-colors cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-text-gray-100 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Xóa"
                      onClick={() => remove(Number(item.id))}
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
      <div className="dark:bg-background-dark px-6 py-4 border-t border-border-dark flex items-center justify-between">
        <div className="text-sm text-text-gray-100">
          Hiển thị <span className="font-medium ">1</span> đến{" "}
          <span className="font-medium ">5</span> trong{" "}
          <span className="font-medium">{products.length}</span> kết
          quả
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            Trước
          </button>
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            1
          </button>
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            2
          </button>
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            3
          </button>
          <span className="text-text-gray-100 px-1">...</span>
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            8
          </button>
          <button className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled transition-colors">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
