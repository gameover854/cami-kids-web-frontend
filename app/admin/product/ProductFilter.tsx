"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import type { Dispatch, SetStateAction } from "react";

export default function ProductFilter({
  categories,
  isActive,
  selectedCategory,
  setSelectedCategory,
  selectedIsActive,
  setSelectedIsActive,
  keyword,
  setKeyword,
}: {
  categories: Category[];
  isActive: IsActive[];
  selectedCategory: Category | undefined;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
  selectedIsActive: IsActive | undefined;
  setSelectedIsActive: Dispatch<SetStateAction<IsActive>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="dark:bg-background-dark bg-background-light rounded-xl border-1 border-border-gray p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
      <div className="relative w-full lg:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-text-gray-100">search</span>
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border-1 border-border-gray rounded-lg leading-5 dark:bg-background-dark bg-background-light dark:text-text-light text-text-gray-200 placeholder-placeholder focus:outline-none focus:ring-1 hover:ring-1 text-sm"
          placeholder="Tim kiem ten san pham"
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <div className="relative group">
          <div className="flex h-10 items-center gap-2 border-1 border-border-gray rounded-lg dark:bg-background-dark bg-background-light pl-4 pr-8 text-sm font-medium dark:text-text-gray-200 text-text-gray-200 hover:ring-1 transition-all">
            {selectedCategory ? (
              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <p>Danh muc:</p>
                <ListboxButton className="cursor-pointer">
                  {selectedCategory.name}
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 dark:fill-text-light fill-text-gray-200/60"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions anchor="bottom" className="focus:outline-none">
                  {categories.map((category) => (
                    <ListboxOption
                      key={category.id}
                      value={category}
                      className="group flex cursor-pointer border-1 border-boder-gray items-center gap-2 px-3 py-1.5 select-none dark:bg-background-dark bg-background-gray data-focus:bg-hover text-gray-200"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                      <div className="text-sm/6 text-white">{category.name}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            ) : (
              "Chua co du lieu"
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="flex h-10 items-center gap-2 border-1 border-border-gray rounded-lg dark:bg-background-dark bg-background-light pl-4 pr-8 text-sm font-medium dark:text-text-gray-200 text-text-gray-200 hover:ring-1 transition-all">
            <p>Trang thai:</p>
            {selectedIsActive ? (
              <Listbox value={selectedIsActive} onChange={setSelectedIsActive}>
                <ListboxButton className="cursor-pointer">
                  {selectedIsActive.name}
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 dark:fill-text-light fill-text-gray-200/60"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions anchor="bottom" className="focus:outline-none">
                  {isActive.map((status) => (
                    <ListboxOption
                      key={status.id}
                      value={status}
                      className="group flex cursor-pointer border-1 border-boder-gray items-center gap-2 px-3 py-1.5 select-none dark:bg-background-dark bg-background-gray data-focus:bg-hover text-gray-200"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                      <div className="text-sm/6 text-white">{status.name}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            ) : (
              "Chua co du lieu"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
