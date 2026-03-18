
"use client";

import Header from "@/components/layout/header";
import { PAYMENT_METHODS } from "@/constants/order";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { createCustomer, getCustomer } from "@/services/customer.services";
import { createOrder } from "@/services/order.services";
import { getProduct, getProductById } from "@/services/product.services";
import { formatVND } from "@/utils/formatCurrency";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sileo } from "sileo";

const PAYMENT_METHOD_LABELS: Record<(typeof PAYMENT_METHODS)[number], string> = {
  COD: "Tiền mặt",
  BANK_TRANSFER: "Chuyển khoản",
  MOMO: "Ví MoMo",
  VNPAY: "VNPay",
  CREDIT_CARD: "Thẻ",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export default function PosPage() {
  const [products, setProducts] = useState<PosProductItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brands>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedBrandId, setSelectedBrandId] = useState<number | "">("");
  const [cartItems, setCartItems] = useState<PosCartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [variantOptions, setVariantOptions] = useState<PosVariantItem[]>([]);
  const [showVariantPicker, setShowVariantPicker] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerResults, setCustomerResults] = useState<AdminCustomerItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomerItem | null>(null);
  const [isCustomerSearching, setIsCustomerSearching] = useState(false);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [customerSearchError, setCustomerSearchError] = useState<string | null>(null);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [newCustomerErrors, setNewCustomerErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("Tại quầy");
  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_METHODS)[number]>("COD");
  const [, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [stockWarnings, setStockWarnings] = useState<Record<number, boolean>>({});

  const filters = useMemo<Filters>(() => {
    return {
      category_id: selectedCategoryId ? [Number(selectedCategoryId)] : null,
      brand_id: selectedBrandId ? [Number(selectedBrandId)] : null,
      keyword: keyword.trim() || undefined,
    };
  }, [keyword, selectedBrandId, selectedCategoryId]);

  const loadFilters = useCallback(async () => {
    const [categoryRes, brandRes] = await Promise.all([getCategory(), getBrand()]);
    setCategories(categoryRes.data.categories);
    setBrands(brandRes.data.brands);
  }, []);

  const loadProducts = useCallback(async () => {
    const res = await getProduct(1, 12, filters);
    setProducts(res.data.products);
  }, [filters]);

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const query = customerPhone.trim();
    if (query.length < 2) {
      setCustomerResults([]);
      setShowCreateCustomer(false);
      setCustomerSearchError(null);
      setNewCustomerForm({ name: "", email: "", phone: "" });
      setNewCustomerErrors({});
      return undefined;
    }

    const timer = window.setTimeout(async () => {
      setIsCustomerSearching(true);
      setCustomerSearchError(null);
      try {
        const res = await getCustomer(1, 5, query);
        setCustomerResults(res?.data?.customers || []);
      } catch (error) {
        console.error("Customer search failed", error);
        setCustomerSearchError("Không thể tìm khách hàng.");
      } finally {
        setIsCustomerSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [customerPhone]);

  const handleSelectCustomer = (customer: AdminCustomerItem) => {
    setSelectedCustomer(customer);
    setCustomerName(customer.name || "");
    setCustomerPhone(customer.phone || "");
    setCustomerResults([]);
    setShowCreateCustomer(false);
    setCustomerSearchError(null);
    setNewCustomerErrors({});
  };

  const handleCreateCustomer = async () => {
    const nameValue = newCustomerForm.name.trim();
    const emailValue = newCustomerForm.email.trim();
    const phoneValue = newCustomerForm.phone.trim().replace(/\s+/g, "");
    const nextErrors: {
      name?: string;
      email?: string;
      phone?: string;
    } = {};

    if (!emailValue) {
      nextErrors.email = "Email là bắt buộc.";
    } else if (!EMAIL_REGEX.test(emailValue)) {
      nextErrors.email = "Email không hợp lệ.";
    }

    if (!phoneValue) {
      nextErrors.phone = "Số điện thoại là bắt buộc.";
    } else if (!PHONE_REGEX.test(phoneValue)) {
      nextErrors.phone = "Số điện thoại không hợp lệ.";
    }

    setNewCustomerErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsCreatingCustomer(true);
    setCustomerSearchError(null);
    const createPromise = createCustomer({
      name: nameValue || undefined,
      email: emailValue,
      phone: phoneValue || undefined,
    });
    sileo.promise(createPromise, {
      loading: {
        title: "Đang chờ",
        description: "Đang tạo khách hàng...",
      },
      success: {
        title: "Thành công",
        description: "Tạo khách hàng mới thành công.",
      },
      error: (err) => {
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status === 409) {
          return {
            title: "Thất bại",
            description: "Email đã tồn tại. Vui lòng dùng email khác.",
          };
        }
        return {
          title: "Thất bại",
          description: "Không thể tạo khách hàng.",
        };
      },
    });
    try {
      const res = await createPromise;
      const created = res?.data?.customer as AdminCustomerItem | undefined;
      if (created) {
        handleSelectCustomer(created);
      }
      setShowCreateCustomer(false);
      setNewCustomerForm({ name: "", email: "", phone: "" });
      setNewCustomerErrors({});
    } catch (error) {
      console.error("Create customer failed", error);
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setCustomerSearchError("Email đã tồn tại. Vui lòng dùng email khác.");
      } else {
        setCustomerSearchError("Không thể tạo khách hàng.");
      }
    } finally {
      setIsCreatingCustomer(false);
    }
  };

  const buildVariantCombo = (variant: ProductDetailVariant) => {
    if (!variant.attributes?.length) return variant.sku || "Biến thể";
    const values = variant.attributes
      .map((attr) => attr.value?.value)
      .filter(Boolean) as string[];
    return values.join(" / ") || variant.sku || "Biến thể";
  };

  const openVariantPicker = async (productId: number) => {
    setMessage(null);
    const loadingId = sileo.info({
      title: "Đang chờ",
      description: "Đang tải chi tiết sản phẩm...",
      duration: null,
    });
    try {
      const res = await getProductById(productId);
      const product = res.data.product;
      setSelectedProduct(product);
      const options: PosVariantItem[] =
        product.variants?.map((variant) => ({
          id: Number(variant.id),
          sku: variant.sku || "N/A",
          price: variant.price,
          stock_quantity: variant.stock_quantity,
          combo: buildVariantCombo(variant),
        })) || [];
      setVariantOptions(options);
      if (options.length === 1) {
        handleAddToCart(product, options[0]);
      } else {
        setShowVariantPicker(true);
      }
    } catch (error) {
      console.error("Failed to load product detail", error);
      setMessage("Không thể tải chi tiết sản phẩm.");
      sileo.error({
        title: "Thất bại",
        description: "Không thể tải chi tiết sản phẩm.",
      });
    } finally {
      sileo.dismiss(loadingId);
    }
  };
  const handleAddToCart = (product: ProductDetail, variant: PosVariantItem) => {
    setShowVariantPicker(false);
    setSelectedProduct(null);
    setVariantOptions([]);
    if (variant.stock_quantity <= 0) {
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variant_id === variant.id);
      if (existing) {
        if (existing.quantity + 1 > variant.stock_quantity) {
          setStockWarnings((prevWarnings) => ({ ...prevWarnings, [variant.id]: true }));
          return prev;
        }
        return prev.map((item) =>
          item.variant_id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          variant_id: variant.id,
          product_id: product.id,
          name: product.name,
          sku: variant.sku,
          price: variant.price,
          quantity: 1,
          stock: variant.stock_quantity,
          combo: variant.combo,
        },
      ];
    });
  };

  const updateQuantity = (variantId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.variant_id !== variantId) return item;
          const nextQuantity = item.quantity + delta;
          if (delta < 0 && nextQuantity <= item.stock) {
            setStockWarnings((prevWarnings) => {
              if (!prevWarnings[variantId]) return prevWarnings;
              const next = { ...prevWarnings };
              delete next[variantId];
              return next;
            });
          }
          if (nextQuantity > item.stock) {
            setStockWarnings((prevWarnings) => ({
              ...prevWarnings,
              [variantId]: true,
            }));
            return item;
          }
          if (nextQuantity < 1 || nextQuantity > item.stock) return item;
          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (variantId: number) => {
    setCartItems((prev) => prev.filter((item) => item.variant_id !== variantId));
    setStockWarnings((prevWarnings) => {
      if (!prevWarnings[variantId]) return prevWarnings;
      const next = { ...prevWarnings };
      delete next[variantId];
      return next;
    });
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const handleCheckout = async () => {
    setMessage(null);
    if (cartItems.length === 0) {
      setMessage("Giỏ hàng đang trống.");
      return;
    }
    setIsSubmitting(true);
    const checkoutPromise = createOrder({
      items: cartItems.map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
      })),
      shipping_address: shippingAddress || "Tại quầy",
      user_id: selectedCustomer?.id ?? null,
      customer_name: selectedCustomer?.name || customerName || null,
      customer_phone: selectedCustomer?.phone || customerPhone || null,
      payment: {
        amount: subtotal,
        method: paymentMethod,
        status: "SUCCESS",
      },
    });
    sileo.promise(checkoutPromise, {
      loading: {
        title: "Đang chờ",
        description: "Đang xử lý thanh toán...",
      },
      success: {
        title: "Thành công",
        description: "Thanh toán thành công.",
      },
      error: {
        title: "Thất bại",
        description: "Không thể thanh toán. Vui lòng kiểm tra tồn kho.",
      },
    });
    try {
      await checkoutPromise;
      setCartItems([]);
      setStockWarnings({});
      setCustomerName("");
      setCustomerPhone("");
      setSelectedCustomer(null);
      setCustomerResults([]);
      setShippingAddress("Tại quầy");
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2 relative">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
                POS - Thanh toán đơn hàng
              </h1>
              <p className="text-text-gray-100 text-base">
                Tạo đơn nhanh tại quầy và xử lý thanh toán
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg border-1 border-border-gray text-text-gray-200 text-sm font-bold cursor-pointer hover:ring-1"
                onClick={() => {
                  setCartItems([]);
                  setMessage(null);
                  setStockWarnings({});
                  setSelectedCustomer(null);
                  setCustomerResults([]);
                  setShowCreateCustomer(false);
                  setCustomerSearchError(null);
                  setNewCustomerForm({ name: "", email: "", phone: "" });
                  setNewCustomerErrors({});
                  sileo.success({
                    title: "Thành công",
                    description: "Đã tạo đơn hàng mới.",
                  });
                }}
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                <span>Tạo đơn mới</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-gray-100">
                      search
                    </span>
                    <input
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm"
                      placeholder="Tìm theo tên sản phẩm, SKU hoặc barcode"
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                    />
                  </div>
                  <select
                    className="w-full md:w-56 rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                    value={selectedCategoryId}
                    onChange={(event) =>
                      setSelectedCategoryId(event.target.value ? Number(event.target.value) : "")
                    }
                  >
                    <option value="">Danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id ?? 0} value={category.id ?? ""}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full md:w-56 rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                    value={selectedBrandId}
                    onChange={(event) =>
                      setSelectedBrandId(event.target.value ? Number(event.target.value) : "")
                    }
                  >
                    <option value="">Thương hiệu</option>
                    {brands.map((brand) => (
                      <option key={brand.id ?? 0} value={brand.id ?? ""}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-xl border border-border-gray dark:border-border-dark p-4 flex flex-col gap-3 bg-white/70 dark:bg-[#1a2230]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-lg p-1 border border-border-gray">
                          <Image
                            alt={product.name}
                            src={product.images?.[0]?.url ?? "/item_example.png"}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-primary font-semibold text-sm">{product.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-gray-100">
                          {formatVND(product.selling_price)} VNĐ
                        </span>
                      </div>
                      <button
                        className="w-full h-9 rounded-lg bg-background-primary text-background-dark text-sm font-semibold hover:opacity-90"
                        onClick={() => openVariantPicker(product.id)}
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  ))}
                  {products.length === 0 ? (
                    <div className="col-span-full text-center text-sm text-text-gray-100">
                      Không có sản phẩm phù hợp.
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-4">
                <h2 className="text-lg font-semibold text-text-gray-200">Giỏ hàng</h2>
                {message ? (
                  <div className="mt-3 rounded-lg border border-border-gray bg-white/70 dark:bg-[#1a2230] px-3 py-2 text-xs text-text-gray-200">
                    {message}
                  </div>
                ) : null}
                <div className="mt-4 space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.variant_id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border-gray dark:border-border-dark p-3 bg-white/70 dark:bg-[#1a2230]"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text-gray-200">{item.name}</p>
                        <p className="text-xs text-text-gray-100">
                          {item.combo} • SKU: {item.sku}
                        </p>
                        <p className="text-xs text-text-gray-100">
                          {formatVND(item.price)} VNĐ
                        </p>
                        {stockWarnings[item.variant_id] ? (
                          <p className="mt-1 text-xs text-red-400">
                            Sản phẩm không khả dụng do tồn kho không đủ.
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="size-7 rounded border border-border-gray text-text-gray-200"
                            onClick={() => updateQuantity(item.variant_id, -1)}
                          >
                            -
                          </button>
                          <span className="text-sm text-text-gray-200">{item.quantity}</span>
                          <button
                            className="size-7 rounded border border-border-gray text-text-gray-200"
                            onClick={() => updateQuantity(item.variant_id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-xs text-red-400 hover:text-red-300"
                          onClick={() => removeItem(item.variant_id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 ? (
                    <div className="text-xs text-text-gray-100 italic">
                      Chưa có sản phẩm trong giỏ.
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-4 space-y-4">
                <h2 className="text-lg font-semibold text-text-gray-200">Thông tin khách</h2>
                <input
                  className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                  type="text"
                  placeholder="Tên khách hàng"
                  value={customerName}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                    if (selectedCustomer) setSelectedCustomer(null);
                  }}
                />
                <input
                  className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                  type="search"
                  inputMode="tel"
                  placeholder="Số điện thoại"
                  value={customerPhone}
                  onChange={(event) => {
                    setCustomerPhone(event.target.value);
                    if (selectedCustomer) setSelectedCustomer(null);
                  }}
                />
                <div className="space-y-2">
                  {selectedCustomer ? (
                    <div className="text-xs text-text-gray-100">
                      Đã chọn:{" "}
                      <span className="text-text-gray-200 font-semibold">
                        {selectedCustomer.name || "Khách hàng"}
                      </span>{" "}
                      ({selectedCustomer.phone || "-"})
                    </div>
                  ) : null}
                  {!selectedCustomer && customerPhone.trim().length >= 2 ? (
                    <div className="rounded-lg border border-border-gray dark:border-border-dark bg-white/70 dark:bg-[#1a2230] p-2 text-xs text-text-gray-100">
                      {isCustomerSearching ? <div>Đang tìm khách hàng...</div> : null}
                      {!isCustomerSearching && customerResults.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {customerResults.map((customer) => (
                            <button
                              key={customer.id}
                              type="button"
                              className="flex items-center justify-between rounded-md px-2 py-1 text-left hover:bg-hover"
                              onClick={() => handleSelectCustomer(customer)}
                            >
                              <span className="text-text-gray-200">
                                {customer.name || "Khách hàng"} -{" "}
                                {customer.phone || "Không có số"}
                              </span>
                              <span className="text-text-gray-100">{customer.email}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                      {!isCustomerSearching && customerResults.length === 0 ? (
                        <div className="flex items-center justify-between gap-2">
                          <span>Không tìm thấy khách hàng phù hợp.</span>
                          <button
                            type="button"
                            className="text-primary hover:opacity-80"
                            onClick={() => {
                              setShowCreateCustomer(true);
                              setNewCustomerForm({
                                name: customerName.trim(),
                                email: "",
                                phone: customerPhone.trim(),
                              });
                              setNewCustomerErrors({});
                            }}
                          >
                            Tạo khách hàng mới
                          </button>
                        </div>
                      ) : null}
                      {customerSearchError ? (
                        <div className="mt-2 text-red-400">{customerSearchError}</div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                {showCreateCustomer ? (
                  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-background-light dark:bg-background-dark border border-border-gray dark:border-border-dark p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-text-gray-200">
                          Tạo khách hàng mới
                        </h3>
                        <button
                          type="button"
                          className="text-text-gray-100 hover:text-text-gray-200"
                          onClick={() => setShowCreateCustomer(false)}
                        >
                          Đóng
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <input
                          className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2"
                          placeholder="Tên khách hàng"
                          value={newCustomerForm.name}
                          onChange={(event) =>
                            setNewCustomerForm((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                        />
                        {newCustomerErrors.name ? (
                          <div className="text-xs text-red-400">{newCustomerErrors.name}</div>
                        ) : null}
                        <input
                          className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2"
                          placeholder="Email"
                          value={newCustomerForm.email}
                          onChange={(event) =>
                            setNewCustomerForm((prev) => ({
                              ...prev,
                              email: event.target.value,
                            }))
                          }
                        />
                        {newCustomerErrors.email ? (
                          <div className="text-xs text-red-400">{newCustomerErrors.email}</div>
                        ) : null}
                        <input
                          className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2"
                          placeholder="Số điện thoại"
                          value={newCustomerForm.phone}
                          onChange={(event) =>
                            setNewCustomerForm((prev) => ({
                              ...prev,
                              phone: event.target.value,
                            }))
                          }
                        />
                        {newCustomerErrors.phone ? (
                          <div className="text-xs text-red-400">{newCustomerErrors.phone}</div>
                        ) : null}
                      </div>
                      {customerSearchError ? (
                        <div className="text-sm text-red-400">{customerSearchError}</div>
                      ) : null}
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          className="rounded-lg px-3 py-2 text-sm font-semibold border border-border-gray text-text-gray-200 hover:ring-1"
                          onClick={() => setShowCreateCustomer(false)}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="rounded-lg px-3 py-2 text-sm font-semibold bg-background-primary text-background-dark hover:opacity-90 disabled:opacity-60"
                          disabled={isCreatingCustomer}
                          onClick={handleCreateCustomer}
                        >
                          Lưu khách hàng
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                <input
                  className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                  placeholder="Địa chỉ giao hàng"
                  value={shippingAddress}
                  onChange={(event) => setShippingAddress(event.target.value)}
                />
              </div>

              <div className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-4 space-y-3">
                <h2 className="text-lg font-semibold text-text-gray-200">Thanh toán</h2>
                <div className="flex items-center justify-between text-sm text-text-gray-100">
                  <span>Tạm tính</span>
                  <span>{formatVND(subtotal)} VNĐ</span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-gray-100">
                  <span>Giảm giá</span>
                  <span>0 VNĐ</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-text-gray-200">
                  <span>Tổng cộng</span>
                  <span>{formatVND(subtotal)} VNĐ</span>
                </div>
                <select
                  className="w-full rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark text-text-gray-200 text-sm px-3 py-2.5"
                  value={paymentMethod}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value as (typeof PAYMENT_METHODS)[number])
                  }
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {PAYMENT_METHOD_LABELS[method]}
                    </option>
                  ))}
                </select>
                <button
                  className="w-full h-11 rounded-lg bg-background-primary text-background-dark text-sm font-semibold hover:opacity-90"
                  onClick={handleCheckout}
                >
                  Thanh toán
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      {showVariantPicker && selectedProduct ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-background-light dark:bg-background-dark border border-border-gray dark:border-border-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-gray-200">Chọn biến thể</h3>
              <button
                className="text-text-gray-100 hover:text-text-gray-200"
                onClick={() => setShowVariantPicker(false)}
              >
                Đóng
              </button>
            </div>
            <div className="space-y-3">
              {variantOptions.map((variant) => (
                <button
                  key={variant.id}
                  className="w-full flex items-center justify-between rounded-lg border border-border-gray dark:border-border-dark px-3 py-2 text-sm text-text-gray-200 hover:bg-hover"
                  onClick={() => handleAddToCart(selectedProduct, variant)}
                >
                  <span>
                    {variant.combo} • {variant.sku}
                  </span>
                  <span className="text-text-gray-100">
                    {formatVND(variant.price)} VNĐ • Tồn {variant.stock_quantity}
                  </span>
                </button>
              ))}
              {variantOptions.length === 0 ? (
                <p className="text-sm text-text-gray-100">Không có biến thể.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
