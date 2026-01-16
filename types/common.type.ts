type Product = {
  id?: number ;
  category_id?: number;
  promotion_id?: number;
  name: string;
  original_price: number;
  compare_price?: number;
  is_active: boolean;
  description: string;
  category?: Category;
  product_attributes?: ProductAttribute;
  product_variants?: ProductVariant;
};

type Products = Product[];

type PayloadProduct = {
  product: Product;
  attribute: AttributeItem[];
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
