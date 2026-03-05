import Image from "next/image";
import Link from "next/link";
import { formatVND } from "@/utils/formatCurrency";

export default function ProductTable({
  products,
  remove,
  page,
  limit,
  totalProduct,
  totalPage,
  onChangePage,
}: ProductTableProps) {
  const start = totalProduct === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProduct);

  const pages = [] as number[];
  const from = Math.max(1, page - 1);
  const to = Math.min(totalPage, page + 1);
  for (let i = from; i <= to; i += 1) pages.push(i);

  return (
    <div className="dark:bg-background-dark rounded-xl border dark:border-border-gray overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark text-xs uppercase tracking-wider text-text-gray-100">
              <th className="px-6 py-4 font-semibold">San pham</th>
              <th className="px-6 py-4 font-semibold">Thuong hieu</th>
              <th className="px-6 py-4 font-semibold">Danh muc</th>
              <th className="px-6 py-4 font-semibold text-right">Gia ban</th>
              <th className="px-6 py-4 font-semibold text-center">Bien the</th>
              <th className="px-6 py-4 font-semibold">Trang thai</th>
              <th className="px-6 py-4 font-semibold text-right">Thao tac</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {products.map((item) => (
              <tr className="group hover:bg-hover transition-colors" key={item.id}>
                <td className="px-6 py-4">
                  <Link href={`/admin/product/${item.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg p-1 border border-border-gray relative group-hover:border-primary/50 transition-colors">
                        <Image
                          alt="Product thumbnail"
                          className="w-full h-full object-cover rounded"
                          src={item.images?.at(0)?.url ?? "/item_example.png"}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="text-text-gray-100 font-medium text-sm">{item.name}</p>
                        <p className="text-text-gray-100 text-xs mt-0.5">ID:{item.id}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center text-xs text-text-gray-100">
                  {item.brand ? item.brand.name : "Khong co"}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background-gray text-text-light border border-border-gray">
                    {item.category?.parent ? `${item.category.parent.name} / ` : ""}
                    {item.category?.name ?? "Khong co"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-text-gray-200 font-medium text-sm">
                  {formatVND(item.selling_price)}
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
                      <p className="text-xs text-text-gray-100 italic">Khong co bien the</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Hoat dong
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                      Khong hoat dong
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Link
                      className="p-1.5 text-text-gray-100 hover:text-white hover:bg-[#283539] rounded-lg transition-colors cursor-pointer"
                      title="Chinh sua"
                      href={`/admin/product/${item.id}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </Link>
                    <button
                      className="p-1.5 text-text-gray-100 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Xoa"
                      onClick={() => remove(Number(item.id))}
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-sm text-text-gray-100" colSpan={7}>
                  Khong co san pham phu hop bo loc.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="dark:bg-background-dark px-6 py-4 border-t border-border-dark flex items-center justify-between">
        <div className="text-sm text-text-gray-100">
          Hien thi <span className="font-medium">{start}</span> den <span className="font-medium">{end}</span> trong <span className="font-medium">{totalProduct}</span> ket qua
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled:opacity-50 transition-colors"
            disabled={page <= 1}
            onClick={() => onChangePage(page - 1)}
          >
            Truoc
          </button>

          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 rounded border text-sm transition-colors ${
                pageNumber === page
                  ? "border-primary text-white bg-primary/20"
                  : "border-border-gray text-text-gray-100 hover:bg-background-gray hover:text-white"
              }`}
              onClick={() => onChangePage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded border border-border-gray text-text-gray-100 text-sm hover:bg-background-gray hover:text-white disabled:opacity-50 transition-colors"
            disabled={page >= totalPage || totalPage === 0}
            onClick={() => onChangePage(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
