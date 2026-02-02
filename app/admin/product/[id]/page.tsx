"use client";

import Loading from "@/components/notification/loading";
import { createProduct } from "@/services/product.services";
import { uploadMutiple } from "@/services/upload.services";
import { convertToBase64, validateImage } from "@/utils/validateImage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  console.log("--->id<---", id);
  const [dataProduct, setDataProduct] = useState({
    name: "",
    selling_price: 0,
    compare_price: 0,
    description: "",
    category_id: undefined,
    promotion_id: undefined,
    is_active: false,
  });

  const [dataAttribute, setDataAttribute] = useState<ProductAttribute>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataImage, setDataImage] = useState<ProductImage>([]);
  const router = useRouter();

  const generateVariants = (dataAttribute: ProductAttribute) => {
    let variants: ProductVariant = [];
    let combo: string[] = [];
    const attributeValues = dataAttribute
      .filter((item) => item.values.length > 0)
      .map((item) => item.values);
    if (attributeValues.length === 0) return variants;
    if (attributeValues.length === 1) {
      for (let item of attributeValues[0]) {
        variants.push({
          id: uuidv4(),
          price: 0,
          stock_quantity: 0,
          combo: item,
        });
      }
      return variants;
    }

    combo = attributeValues.reduce((before, after) => {
      return before.flatMap((val_1) =>
        after.map((val_2) => (val_1 ? `${val_1} / ${val_2}` : val_2)),
      );
    });

    for (let item of combo) {
      variants.push({
        id: uuidv4(),
        price: 0,
        stock_quantity: 0,
        combo: item,
      });
    }

    return variants;
  };

  const [dataVariant, setDataVariant] = useState(() =>
    generateVariants(dataAttribute),
  );

  useEffect(() => {
    setDataVariant(generateVariants(dataAttribute));
  }, [dataAttribute]);

  const handleAddAttribute = () => {
    setDataAttribute([
      ...dataAttribute,
      { id: uuidv4(), name: "", values: [] },
    ]);
  };

  const handleRemoveAttribute = (attributeId: string) => {
    setDataAttribute(dataAttribute.filter((item) => item.id !== attributeId));
  };

  const handleAttributeName = (attributeId: string, attributeName: string) => {
    if (!attributeId) return;
    setDataAttribute(
      dataAttribute.map((item) =>
        item.id === attributeId ? { ...item, name: attributeName } : item,
      ),
    );
  };

  const handleAddAttributeItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
    attributeItemId: string,
  ) => {
    if (event.key !== "Enter") return;

    const value = String(event.currentTarget.value).trim();
    if (!value) return;

    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeItemId && !item.values.includes(value)
          ? { ...item, values: [...item.values, value] }
          : item,
      ),
    );

    event.currentTarget.value = "";
  };

  const handleRemoveAttributeItem = (
    attributeItemId: string,
    attributeItemValue: string,
  ) => {
    setDataAttribute(
      dataAttribute.map((item) =>
        item.id === attributeItemId
          ? {
              ...item,
              values: item.values.filter(
                (value) => value !== attributeItemValue,
              ),
            }
          : item,
      ),
    );
  };

  const handleVariantItem = (
    value: number,
    variantItemId: string,
    type: string,
  ) => {
    setDataVariant(
      dataVariant.map((item) =>
        item.id === variantItemId ? { ...item, [type]: value } : item,
      ),
    );
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const validFiles = Array.from(fileList).filter((file) =>
      validateImage(file.size, file.type),
    );

    if (validFiles.length === 0) return;

    try {
      const base64Files = await Promise.all(
        validFiles.map((file) => convertToBase64(file)),
      );

      const { data } = await uploadMutiple(base64Files as string[]);

      const newImages = data.map((image: Image) => ({
        id: uuidv4(),
        url: image.url,
        public_id: image.public_id,
        is_main: false,
      }));

      setDataImage((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      e.target.value = "";
    }
  };

  const handleUpdateImage = (imageId: string, action: string) => {
    switch (action) {
      case "PRIMARY":
        setDataImage((images) =>
          images.map((image) =>
            image.id === imageId
              ? { ...image, is_main: true }
              : { ...image, is_main: false },
          ),
        );
        break;

      case "DELETE":
        setDataImage((images) =>
          images.filter((image) => image.id !== imageId),
        );
        break;

      default:
        break;
    }
  };

  const parseData = (
    dataProduct: Product,
    dataAttribute: ProductAttribute,
    dataVariant: ProductVariant,
    dataImage: ProductImage,
  ) => {
    return {
      product: {
        name: dataProduct.name.toString(),
        selling_price: Number(dataProduct.selling_price),
        compare_price: Number(dataProduct.compare_price),
        description: String(dataProduct.description),
        category_id: Number(dataProduct.category_id),
        promotion_id: dataProduct.promotion_id,
        is_active: Boolean(dataProduct.is_active),
      },
      attributes: dataAttribute.filter(
        (item) => item.values.length > 0 && item.name.length > 0,
      ),
      variants: dataVariant,
      images: dataImage,
    };
  };

  async function create() {
    const payload = parseData(
      dataProduct,
      dataAttribute,
      dataVariant,
      dataImage,
    );
    console.log("--->payload<---", payload);
    try {
      setIsLoading(true);
      await createProduct(payload);
    } catch (error) {
      console.log("--->Error Create Product<---", error);
    } finally {
      setIsLoading(false);
    }
    router.push("/admin/product");
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-white p-1">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[#9db2b9] text-sm">
          <span>Trang chủ</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span>Sản phẩm</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-white font-medium">Thêm sản phẩm</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </button>
          <button className="p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Thêm sản phẩm mới
              </h1>
              <p className="text-[#9db2b9] text-sm">
                Điền thông tin chi tiết cho sản phẩm thời trang
              </p>
            </div>
            <div className="flex gap-3">
              <button className="cursor-pointer px-5 h-10 rounded-lg bg-surface-dark text-[#9db2b9] text-sm font-bold border border-border-dark hover:text-white hover:bg-[#283539] transition-all">
                Hủy bỏ
              </button>
              <div className="cursor-pointer flex items-center justify-center gap-2 px-6 h-10 rounded-lg bg-primary text-background-dark text-sm font-bold hover:bg-[#3ec4f1] transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">
                  save
                </span>
                <span onClick={create}>Lưu sản phẩm</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    info
                  </span>
                  Thông tin cơ bản
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                      Tên sản phẩm<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary placeholder-[#9db2b9]/50"
                      placeholder="Ví dụ: Áo Thun Polo Bé Trai Cotton"
                      type="text"
                      onChange={(e) => {
                        setDataProduct({
                          ...dataProduct,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                        Giá bán (VNĐ)
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg text-sm pl-3 pr-10 py-2.5 text-right font-medium focus:ring-1 focus:ring-primary"
                          placeholder="Nhập giá bán"
                          type="number"
                          onChange={(e) => {
                            setDataProduct({
                              ...dataProduct,
                              selling_price: Number(e.target.value),
                            });
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-[#9db2b9] text-xs">₫</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                        Giá so sánh (VNĐ)
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg text-sm pl-3 pr-10 py-2.5 text-right font-medium focus:ring-1 focus:ring-primary"
                          placeholder="Nhập giá so sánh"
                          type="number"
                          onChange={(e) => {
                            setDataProduct({
                              ...dataProduct,
                              compare_price: Number(e.target.value),
                            });
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-[#9db2b9] text-xs">₫</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                      Mô tả sản phẩm
                    </label>
                    <div className="rounded-lg border border-border-dark overflow-hidden bg-[#111618] focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <textarea
                        className="w-full border-none p-3 text-sm focus:ring-0 resize-y bg-transparent"
                        placeholder="Nhập mô tả chi tiết về chất liệu, kiểu dáng..."
                        rows={4}
                        onChange={(e) => {
                          setDataProduct({
                            ...dataProduct,
                            description: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    style
                  </span>
                  Biến thể sản phẩm
                </h2>
                <div className="space-y-4 mb-8">
                  {dataAttribute.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#111618] border border-border-dark rounded-lg p-4 relative group hover:border-border-dark/80 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="w-full md:w-1/4">
                          <label className="block text-xs font-medium text-[#9db2b9] mb-1.5">
                            Tên thuộc tính
                          </label>
                          <input
                            className="w-full rounded text-sm px-3 py-2 bg-surface-dark border border-border-dark focus:border-primary focus:ring-primary"
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleAttributeName(item.id!, e.target.value)
                            }
                          />
                        </div>
                        <div className="w-full md:w-3/4">
                          <label className="block text-xs font-medium text-[#9db2b9] mb-1.5">
                            Giá trị của thuộc tính
                          </label>
                          <div className="w-full min-h-[38px] rounded px-2 py-1.5 bg-surface-dark border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary flex flex-wrap gap-2 items-center">
                            {item.values.map((value, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-medium border border-primary/20"
                              >
                                {value}
                                <button
                                  className="cursor-pointer hover:text-white"
                                  onClick={(e) =>
                                    handleRemoveAttributeItem(item.id!, value)
                                  }
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    close
                                  </span>
                                </button>
                              </span>
                            ))}
                            <input
                              id={item.id}
                              className="bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-[#9db2b9]/50 min-w-[80px] flex-1"
                              placeholder="Nhập giá trị biến thể"
                              type="text"
                              onKeyDown={(e) =>
                                handleAddAttributeItem(e, item.id!)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="cursor-pointer absolute -top-2.5 -right-2.5 bg-surface-dark border border-border-dark text-[#9db2b9] hover:text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all"
                        title="Xóa thuộc tính"
                        id={item.id}
                        onClick={(e) => handleRemoveAttribute(item.id!)}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddAttribute}
                    className="cursor-pointer text-primary text-sm font-bold hover:text-[#3ec4f1] flex items-center gap-1.5 px-2 py-1 -ml-2 rounded hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      add
                    </span>
                    Thêm thuộc tính mới
                  </button>
                </div>
                <div className="border-t border-border-dark pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">
                      Danh sách biến thể đã sinh ({dataVariant.length})
                    </h3>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-border-dark">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#152025] text-xs uppercase tracking-wider text-[#9db2b9] border-b border-border-dark">
                          <th className="px-4 py-3 font-semibold">Biến thể</th>
                          <th className="px-4 py-3 font-semibold text-right w-1/5">
                            Giá bán <span className="text-red-500">*</span>
                          </th>
                          <th className="px-4 py-3 font-semibold text-right w-1/6">
                            Tồn kho <span className="text-red-500">*</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-dark bg-[#111618]">
                        {dataVariant.map((item) => (
                          <tr
                            className="hover:bg-surface-dark/50 transition-colors"
                            key={item.id}
                          >
                            <td className="px-4 py-3 align-middle">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[#9db2b9]">
                                  {item.combo}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <input
                                className="w-full rounded px-2 py-1.5 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  handleVariantItem(
                                    Number(e.target.value),
                                    item.id!,
                                    "price",
                                  )
                                }
                              />
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <input
                                className="w-full rounded px-2 py-1.5 text-sm text-right bg-surface-dark border-border-dark focus:border-primary focus:ring-primary"
                                min="0"
                                type="number"
                                value={item.stock_quantity}
                                onChange={(e) =>
                                  handleVariantItem(
                                    Number(e.target.value),
                                    item.id!,
                                    "stock_quantity",
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    imagesmode
                  </span>
                  Hình ảnh sản phẩm
                </h2>
                <div className="border-2 border-dashed border-border-dark rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-[#111618] cursor-pointer group">
                  <div className="bg-surface-dark p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      cloud_upload
                    </span>
                    <input
                      type="file"
                      name="uploadImage"
                      id="uploadImage"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </div>
                  <p className="text-white font-medium text-sm">
                    Kéo thả hình ảnh vào đây hoặc click để chọn
                  </p>
                  <p className="text-[#9db2b9] text-xs mt-1">
                    Hỗ trợ JPG, PNG, WEBP. Tối đa 5MB/ảnh.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {dataImage.map((image) => (
                    <div
                      className="relative group aspect-square rounded-lg border-2 border-primary overflow-hidden bg-[#111618]"
                      key={image.id}
                    >
                      <img
                        alt="Product Image"
                        className="w-full h-full object-cover"
                        src={image.url}
                      />
                      {image.is_main && (
                        <div className="absolute top-2 left-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          Ảnh chính
                        </div>
                      )}

                      <button
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                        onClick={(e) => handleUpdateImage(image.id, "DELETE")}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          close
                        </span>
                      </button>
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex justify-center gap-2">
                        <button
                          className="text-xs text-white hover:text-primary underline"
                          onClick={(e) =>
                            handleUpdateImage(image.id, "PRIMARY")
                          }
                        >
                          Đặt làm chính
                        </button>
                      </div>
                      {/* <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex justify-center cursor-move">
                        <span className="material-symbols-outlined text-white text-[16px]">
                          drag_handle
                        </span>
                      </div> */}
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="flex flex-col gap-6">
              <section className="bg-surface-dark rounded-xl border border-border-dark p-5 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-white mb-4">Tổ chức</h2>
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border-dark">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        Trạng thái
                      </span>
                      <span className="text-xs text-[#9db2b9]">
                        Cho phép bán
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        onChange={(e) =>
                          setDataProduct({
                            ...dataProduct,
                            is_active: Boolean(e.target.checked),
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-[#283539] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                      Danh mục
                    </label>
                    <select className="w-full rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary">
                      <option value="">-- Chọn danh mục --</option>
                      <optgroup label="Bé Trai">
                        <option value="bt-ao">Bé Trai / Áo Thun</option>
                        <option value="bt-quan">Bé Trai / Quần</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9db2b9] mb-1">
                      Bộ sưu tập
                    </label>
                    <div className="relative">
                      <div className="flex items-center gap-1 flex-wrap p-2 border border-border-dark rounded-t-lg bg-[#111618]">
                        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded flex items-center gap-1">
                          Back to School{" "}
                          <button className="hover:text-white">×</button>
                        </span>
                        <input
                          className="flex-1 bg-transparent border-none text-sm p-1 focus:ring-0 min-w-[50px]"
                          placeholder="Tìm bộ sưu tập..."
                          type="text"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto border border-border-dark border-t-0 rounded-b-lg bg-[#111618] p-2 space-y-1">
                        <label className="flex items-center gap-2 p-1.5 hover:bg-surface-dark rounded cursor-pointer">
                          <input
                            className="rounded border-border-dark bg-transparent text-primary focus:ring-primary"
                            type="checkbox"
                          />
                          <span className="text-sm text-white">
                            Hàng Mới Về
                          </span>
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-[#9db2b9] mt-1">
                      Chọn một hoặc nhiều bộ sưu tập.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        {isLoading && <Loading />}
      </main>
    </div>
  );
}
