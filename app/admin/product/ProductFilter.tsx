"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SelectOption = {
  id: number;
  name: string;
  displayName?: string;
  depth?: number;
};

type MultiSelectBoxProps = {
  label: string;
  options: SelectOption[];
  selectedIds: number[];
  onChange: (next: number[]) => void;
  placeholder?: string;
};

function MultiSelectBox({
  label,
  options,
  selectedIds,
  onChange,
  placeholder,
}: MultiSelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const keyword = search.trim().toLowerCase();
    return options.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [options, search]);

  const selectedNames = useMemo(() => {
    if (selectedIds.length === 0) return "Tất cả";
    const map = new Map(options.map((item) => [item.id, item.name]));
    const names = selectedIds.map((id) => map.get(id)).filter(Boolean) as string[];
    if (names.length <= 2) return names.join(", ");
    return `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
  }, [options, selectedIds]);

  return (
    <div ref={containerRef} className="relative w-full lg:w-auto">
      <button
        type="button"
        className="flex h-10 items-center gap-2 border-1 border-border-gray rounded-lg dark:bg-background-dark bg-background-light pl-4 pr-10 text-sm font-medium dark:text-text-gray-200 text-text-gray-200 hover:ring-1 transition-all w-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}:</span>
        <span className="truncate">{selectedNames}</span>
        <span className="material-symbols-outlined absolute right-3 text-[18px] text-text-gray-100">
          expand_more
        </span>
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full min-w-[220px] rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark p-2 shadow-lg">
          <input
            className="w-full rounded border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-2 text-sm outline-none focus:ring-1"
            placeholder={placeholder || "Tìm kiếm"}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="mt-2 max-h-52 overflow-y-auto space-y-1">
            {filteredOptions.map((item) => {
              const checked = selectedIds.includes(item.id);
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-2 rounded px-2 py-1 text-sm text-text-gray-200 hover:bg-background-gray/60 dark:hover:bg-surface-dark"
                  style={
                    item.depth
                      ? { paddingLeft: `${8 + item.depth * 12}px` }
                      : undefined
                  }
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        onChange(selectedIds.filter((id) => id !== item.id));
                      } else {
                        onChange([...selectedIds, item.id]);
                      }
                    }}
                  />
                  <span>{item.displayName ?? item.name}</span>
                </label>
              );
            })}
            {filteredOptions.length === 0 ? (
              <p className="text-xs text-text-gray-100 px-2 py-1">Không có dữ liệu</p>
            ) : null}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-text-gray-100">
            <button type="button" className="hover:text-text-gray-200" onClick={() => onChange([])}>
              Xóa lọc
            </button>
            <button type="button" className="hover:text-text-gray-200" onClick={() => setOpen(false)}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ProductFilter({
  categories,
  isActive,
  brands,
  selectedCategoryIds,
  setSelectedCategoryIds,
  selectedStatusIds,
  setSelectedStatusIds,
  selectedBrandIds,
  setSelectedBrandIds,
  keyword,
  setKeyword,
}: {
  categories: Category[];
  isActive: IsActive[];
  brands: Brands;
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (next: number[]) => void;
  selectedStatusIds: number[];
  setSelectedStatusIds: (next: number[]) => void;
  selectedBrandIds: number[];
  setSelectedBrandIds: (next: number[]) => void;
  keyword: string;
  setKeyword: (value: string) => void;
}) {
  const categoryOptions = useMemo(() => {
    const buildOptions = (items: Category[], depth: number): SelectOption[] => {
      return items.flatMap((item) => {
        const options: SelectOption[] = [];
        if (typeof item.id === "number") {
          options.push({
            id: item.id,
            name: item.name,
            displayName: item.name,
            depth,
          });
        }
        if (Array.isArray(item.children) && item.children.length > 0) {
          options.push(...buildOptions(item.children, depth + 1));
        }
        return options;
      });
    };

    return buildOptions(categories, 0);
  }, [categories]);
  const statusOptions = useMemo(
    () =>
      isActive
        .filter((item) => typeof item.id === "number")
        .map((item) => ({ id: item.id as number, name: item.name })),
    [isActive],
  );
  const brandOptions = useMemo(
    () =>
      brands
        .filter((item) => typeof item.id === "number")
        .map((item) => ({ id: item.id as number, name: item.name })),
    [brands],
  );

  return (
    <div className="dark:bg-background-dark bg-background-light rounded-xl border-1 border-border-gray p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <MultiSelectBox
          label="Thương hiệu"
          options={brandOptions}
          selectedIds={selectedBrandIds}
          onChange={setSelectedBrandIds}
          placeholder="Tìm thương hiệu"
        />
        <MultiSelectBox
          label="Danh mục"
          options={categoryOptions}
          selectedIds={selectedCategoryIds}
          onChange={setSelectedCategoryIds}
          placeholder="Tìm danh mục"
        />
        <MultiSelectBox
          label="Trạng thái"
          options={statusOptions}
          selectedIds={selectedStatusIds}
          onChange={setSelectedStatusIds}
          placeholder="Tìm trạng thái"
        />
      </div>

      <div className="relative w-full lg:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-text-gray-100">search</span>
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border-1 border-border-gray rounded-lg leading-5 dark:bg-background-dark bg-background-light dark:text-text-light text-text-gray-200 placeholder-placeholder focus:outline-none focus:ring-1 hover:ring-1 text-sm"
          placeholder="Tìm kiếm tên sản phẩm"
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
    </div>
  );
}
