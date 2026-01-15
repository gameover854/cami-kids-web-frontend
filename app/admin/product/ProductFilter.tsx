"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductFilter({
  categories,
  isActive,
  selectedCategory,
  setSelectedCategory,
  selectedIsActive,
  setSelectedIsActive,
}: {
  categories: Category[];
  isActive: IsActive[];
  selectedCategory: Category | undefined;
  setSelectedCategory: any;
  selectedIsActive: IsActive | undefined;
  setSelectedIsActive: any;
}) {
  return (
    <div className="bg-surface-dark rounded-xl border border-border-dark p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
      {/* <!-- Search --> */}

      <div className="relative w-full lg:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-[#9db2b9]">
            search
          </span>
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-[#111618] text-white placeholder-[#9db2b9] focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          placeholder="Tìm kiếm tên sản phẩm, mã SKU..."
          type="text"
        />
      </div>
      {/* <!-- Filter Chips --> */}
      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <div className="relative group">
          <div className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] pl-4 pr-8 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
            {selectedCategory ? (
              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <p> Danh mục: </p>
                <ListboxButton className="cursor-pointer">
                  {selectedCategory.name}
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions anchor="bottom" className="focus:outline-none">
                  {categories.map((category) => (
                    <ListboxOption
                      key={category.id}
                      value={category}
                      className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 select-none bg-[#111618] data-focus:bg-white/60"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                      <div className="text-sm/6 text-white">
                        {category.name}
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            ) : (
              "Chưa có dữ liệu"
            )}
          </div>
        </div>
        <div className="relative group">
          <div className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] pl-4 pr-8 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
            <p>Trạng thái: </p>
            {selectedIsActive ? (
              <Listbox value={selectedIsActive} onChange={setSelectedIsActive}>
                <ListboxButton className="cursor-pointer">
                  {selectedIsActive.name}
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions anchor="bottom" className="focus:outline-none">
                  {isActive.map((status) => (
                    <ListboxOption
                      key={status.id}
                      value={status}
                      className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 select-none bg-[#111618] data-focus:bg-white/60"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                      <div className="text-sm/6 text-white">{status.name}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            ) : (
              "Chưa có dữ liệu"
            )}
          </div>
        </div>
        <div className="relative group">
          <button className="flex h-10 items-center gap-2 rounded-lg bg-[#111618] px-4 text-sm font-medium text-white hover:ring-1 hover:ring-primary/50 transition-all">
            <span>Giá: Tất cả</span>
            <span className="material-symbols-outlined text-[18px] text-[#9db2b9]">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
