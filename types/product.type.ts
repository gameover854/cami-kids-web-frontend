type Product = {
    category_id: number | undefined;
    promotion_id: number | undefined;
    name: string;
    original_price: number | undefined;
    compare_price: number | undefined;
    is_active: boolean;
    description: string;
}

type PayloadProduct = {
    product: Product,
    attribute: AttributeItem[]
}

type AttributeItem = {
    id: string,
    name: string,
    values: string[]
}

type ProductAttribute = AttributeItem[]

type VariantItem = {
    id: string,
    price: number,
    stock_quantity: number,
    combo: string
}

type ProductVariant = VariantItem[]