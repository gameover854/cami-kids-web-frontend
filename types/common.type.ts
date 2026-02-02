type Product = {
  id?: number;
  category_id?: number;
  collection_id: number[];
  brand_id?: number;
  name: string;
  selling_price: number;
  compare_price?: number;
  is_active: boolean;
  description: string;
  category?: Category;
  product_attributes?: ProductAttribute;
  product_variants?: ProductVariant;
  images?: Image[];
  brand?: Brand;
  collections?: Collections;
};

type Products = Product[];

type PayloadProduct = {
  product: Product;
  attributes: AttributeItem[];
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
type AttributeItem = {
  id?: string;
  name: string;
  values: string[];
  _count?: {
    values: number;
  };
};

type ProductAttribute = AttributeItem[];

type VariantItem = {
  id: string | undefined;
  price: number;
  stock_quantity: number;
  combo: string;
};

type ProductVariant = VariantItem[];

type Category = {
  id: number;
  name: string;
  parent_id: number;
  children: Categories;
  parent: Category;
};

type Brands = Brand[];

type Brand = {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  is_active: string;
};

type Categories = Category[];

type Filters = {
  category_id: number | null;
  is_active: number | null;
};

type IsActive = {
  id: number | null;
  name: string;
};

type ProductImage = Image[];

type Image = {
  id: string;
  url: string;
  is_main: Boolean;
  public_id?: string;
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
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
};
