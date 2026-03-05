"use client";

import { uploadMutiple } from "@/services/upload.services";
import { convertToBase64, validateImage } from "@/utils/validateImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type UseProductFormParams = {
  initialProduct?: Product;
};

const defaultProduct: Product = {
  name: "",
  selling_price: 0,
  compare_price: 0,
  description: "",
  category_id: null,
  collection_id: [],
  brand_id: null,
  is_active: false,
};

export default function useProductForm(params?: UseProductFormParams) {
  const skipNextRegenerate = useRef(false);

  const [dataProduct, setDataProduct] = useState<Product>(
    params?.initialProduct ?? defaultProduct,
  );
  const [dataAttribute, setDataAttribute] = useState<ProductAttribute>([]);
  const [dataVariant, setDataVariant] = useState<ProductVariant>([]);
  const [dataImage, setDataImage] = useState<ProductImage>([]);

  const generateVariants = (attributes: ProductAttribute) => {
    const variants: ProductVariant = [];
    const attributeValues = attributes
      .filter((item) => item.values.length > 0)
      .map((item) => item.values);

    if (attributeValues.length === 0) return variants;

    const combo = attributeValues.reduce(
      (before, after) =>
        before.flatMap((left) =>
          after.map((right) => (left ? `${left} / ${right}` : right)),
        ),
      [""],
    );

    for (const item of combo) {
      variants.push({
        id: uuidv4(),
        price: 0,
        stock_quantity: 0,
        combo: item,
      });
    }

    return variants;
  };

  useEffect(() => {
    if (skipNextRegenerate.current) {
      skipNextRegenerate.current = false;
      return;
    }
    setDataVariant(generateVariants(dataAttribute));
  }, [dataAttribute]);

  const setInitialFormData = useCallback(
    ({
      product,
      attributes,
      variants,
      images,
    }: {
      product: Product;
      attributes: ProductAttribute;
      variants: ProductVariant;
      images: ProductImage;
    }) => {
      skipNextRegenerate.current = true;
      setDataProduct(product);
      setDataAttribute(attributes);
      setDataVariant(variants);
      setDataImage(images);
    },
    [],
  );

  const handleAddAttribute = () => {
    setDataAttribute((prev) => [...prev, { id: uuidv4(), name: "", values: [] }]);
  };

  const handleRemoveAttribute = (attributeId: string | number) => {
    setDataAttribute((prev) => prev.filter((item) => item.id !== attributeId));
  };

  const handleAttributeName = (attributeId: string | number, attributeName: string) => {
    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeId ? { ...item, name: attributeName } : item,
      ),
    );
  };

  const handleAddAttributeItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
    attributeItemId: string | number,
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
    attributeItemId: string | number,
    attributeItemValue: string,
  ) => {
    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeItemId
          ? {
              ...item,
              values: item.values.filter((value) => value !== attributeItemValue),
            }
          : item,
      ),
    );
  };

  const handleVariantNumber = (
    value: number,
    variantItemId: string | number,
    type: "price" | "stock_quantity",
  ) => {
    setDataVariant((prev) =>
      prev.map((item) =>
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

  const handleUpdateImage = (imageId: string | number, action: ACTION_UPDATE_IMAGE) => {
    if (action === ACTION_UPDATE_IMAGE.PRIMARY) {
      setDataImage((images) =>
        images.map((image) =>
          image.id === imageId
            ? { ...image, is_main: true }
            : { ...image, is_main: false },
        ),
      );
      return;
    }
    setDataImage((images) => images.filter((image) => image.id !== imageId));
  };

  const handleCheckCollections = (checked: boolean, collectionId: string) => {
    const id = Number(collectionId);
    setDataProduct((prev) => {
      const collectionIds = prev.collection_id ?? [];
      return {
        ...prev,
        collection_id: checked
          ? [...collectionIds, id]
          : collectionIds.filter((item) => item !== id),
      };
    });
  };

  const buildPayload = (): PayloadProduct => ({
    product: {
      name: dataProduct.name,
      selling_price: Number(dataProduct.selling_price || 0),
      compare_price: Number(dataProduct.compare_price || 0),
      description: dataProduct.description,
      category_id: dataProduct.category_id ?? null,
      brand_id: dataProduct.brand_id ?? null,
      collection_id: dataProduct.collection_id ?? [],
      is_active: Boolean(dataProduct.is_active),
    },
    attributes: dataAttribute.filter((item) => item.name && item.values.length > 0),
    variants: dataVariant,
    images: dataImage,
  });

  return {
    dataProduct,
    setDataProduct,
    dataAttribute,
    dataVariant,
    dataImage,
    setInitialFormData,
    handleAddAttribute,
    handleRemoveAttribute,
    handleAttributeName,
    handleAddAttributeItem,
    handleRemoveAttributeItem,
    handleVariantNumber,
    handleUploadImage,
    handleUpdateImage,
    handleCheckCollections,
    buildPayload,
  };
}
