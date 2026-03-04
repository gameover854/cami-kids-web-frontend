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
