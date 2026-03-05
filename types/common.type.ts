type Product = {
  id?: number;
  category_id?: number | null;
  collection_id?: number[];
  brand_id?: number | null;
  name: string;
  selling_price: number;
  compare_price?: number;
  is_active: boolean;
  description: string;
  category?: Category | null;
  attributes?: ProductAttribute;
  variants?: ProductVariant;
  images?: ProductImage;
  brand?: Brand | null;
  collections?: CollectionProduct[];
};

type Products = Product[];

type PayloadProduct = {
  product: Product;
  attributes?: ProductAttribute;
  variants?: ProductVariant;
  images?: ProductImage;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

type GetProductResponse = {
  products: Products;
  totalPage: number;
  totalProduct: number;
};

type GetProductByIdResponse = {
  product: Product;
};

type AttributeItem = {
  id?: number | string;
  name: string;
  values: string[];
  _count?: {
    values: number;
  };
};

type ProductAttribute = AttributeItem[];

type VariantItem = {
  id?: number | string;
  price: number;
  stock_quantity: number;
  combo: string;
  sku?: string;
  barcode?: string;
};

type ProductVariant = VariantItem[];

type Category = {
  id: number | null;
  name: string;
  parent_id?: number | null;
  children?: Categories;
  parent?: Category | null;
};

type Brands = Brand[];

type Brand = {
  id: number | null;
  name: string;
  slug?: string;
  logo?: string;
  description?: string;
  is_active?: boolean;
};

type Categories = Category[];

type Filters = {
  category_id?: number | null;
  is_active?: number | null;
  sort?: "asc" | "desc";
};

type IsActive = {
  id: number | null;
  name: string;
};

type ProductImage = Image[];

type Image = {
  id: number | string;
  url: string;
  is_main: boolean;
  public_id?: string;
  order?: number;
};

enum ACTION_UPDATE_IMAGE {
  PRIMARY = "PRIMARY",
  DELETE = "DELETE",
}

type Promotions = Promotion[];

type Promotion = {
  id: number;
  name: string;
  code: string;
  type: string;
  value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

type Collections = Collection[];

type Collection = {
  id: number | null;
  name: string;
  slug?: string;
  is_active?: boolean;
};

type CollectionProduct = {
  collection_id: number;
  product_id: number;
  collection: Collection;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

type SidebarItem = {
  id: number;
  icon: string;
  label: string;
  href: string;
  section: "main" | "manage" | "system";
};

type AdminBrandItem = {
  id: number;
  name: string;
  slug?: string | null;
  logo?: string | null;
  description?: string | null;
  is_active?: boolean;
};

type AdminCategoryItem = {
  id: number;
  name: string;
  parent_id: number | null;
  brand_id: number | null;
  children?: AdminCategoryItem[];
};

type AdminSimpleBrandItem = {
  id: number;
  name: string;
};

type AdminCollectionItem = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
};

type AdminPromotionType = "PERCENTAGE" | "FIXED_AMOUNT";

type PromotionCollectionLink = {
  collection_id: number;
  promotion_id: number;
  collection?: {
    id: number;
    name: string;
    slug: string;
  };
};

type AdminPromotionItem = {
  id: number;
  code: string;
  name: string;
  type: AdminPromotionType;
  value: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  collections?: PromotionCollectionLink[];
};

type AdminOrderListItem = {
  id: number;
  total_amount: number;
  shipping_address: string;
  status: string;
  created_at: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
  } | null;
  payment?: {
    id: number;
    amount: number;
    method: string;
    status: string;
    transaction_id: string | null;
  } | null;
};

type AdminOrderDetailItem = AdminOrderListItem & {
  items: Array<{
    id: number;
    quantity: number;
    price_at_purchase: number;
    variant?: {
      id: number;
      sku: string;
      product?: { id: number; name: string };
    };
  }>;
};

type AdminCustomerItem = {
  id: number;
  name?: string | null;
  email: string;
  phone?: string | null;
  _count?: { orders: number };
  created_at: string;
};

type AdminSettingForm = {
  store_name: string;
  support_email: string;
  support_phone: string;
  timezone: string;
  auto_cancel_hours: number;
  low_stock_threshold: number;
  allow_guest_checkout: boolean;
};

type AdminVariantDetail = {
  id: number;
  sku: string;
  barcode: string;
  price: number;
  stock_quantity: number;
  product?: {
    id: number;
    name: string;
    selling_price: number;
    is_active: boolean;
  };
  images?: Array<{
    id: number;
    url: string;
    is_main: boolean;
  }>;
  attributes?: Array<{
    value: {
      value: string;
      attribute?: {
        name: string;
      };
    };
  }>;
};
