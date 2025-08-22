import useBoolean from "hooks/useBoolean";
import useCallAPIState, { CALL_API_STATUS } from "hooks/UseCallAPIState";
import { isEmpty, set } from "lodash";
import {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import RangeSlider from "react-range-slider-input";
import { useSearchParams } from "react-router-dom";
import CategoryService from "services/CategoryService";
import "styles/products.filter.css";
import { twMerge } from "tailwind-merge";
import { Category } from "types/Category";

const RangePrice = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMinPrice = Number(searchParams.get("minPrice") ?? "0");
  const currentMaxPrice = Number(searchParams.get("maxPrice") ?? "0");

  const [value, setValue] = useState<number[]>([
    currentMinPrice,
    currentMaxPrice,
  ]);
  const [min, max] = value;

  useEffect(() => {
    if (min === currentMinPrice && max === currentMaxPrice) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setSearchParams((params) => {
        if (min === 0) {
          params.delete("minPrice");
        } else {
          params.set("minPrice", min.toString());
        }

        if (max === 0) {
          params.delete("maxPrice");
        } else {
          params.set("maxPrice", max.toString());
        }

        return params;
      });
    }, 500);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [min, max, currentMaxPrice, currentMinPrice, setSearchParams]);

  return (
    <div className="space-y-2">
      <p className="text-left text-gray-600 font-semibold">Khoảng giá</p>
      <div>
        <div className="flex items-center gap-2">
          <RangeSlider
            min={0}
            max={20000000}
            value={value as [number, number]}
            onInput={setValue}
          />
        </div>
        <div className="flex justify-between text-gray-500 mt-1">
          <span>{min.toLocaleString("vi-VN")} đ</span>
          <span>{max.toLocaleString("vi-VN")} đ</span>
        </div>
      </div>
    </div>
  );
};

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.getAll("category");
  const [categories, setCategories] = useCallAPIState<Category[]>({
    status: "idle",
    data: [],
  });

  const fetchCategories = useCallback(async () => {
    setCategories(CALL_API_STATUS.LOADING);
    const { payload, success } = await CategoryService.get();
    if (success) {
      setCategories(CALL_API_STATUS.SUCCESS, payload);
    }
  }, [setCategories]);

  const onCategoryClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const category = event.currentTarget.dataset.category as string;

      setSearchParams((params) => {
        const categories = [...params.getAll("category")];

        if (categories.includes(category)) {
          params.delete("category", category);
        } else {
          params.append("category", category);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="space-y-2">
      <p className="text-left text-gray-600 font-semibold">Danh mục</p>
      <ul>
        {categories.data.map((category) => (
          <li
            key={category.id}
            className="group flex items-center gap-x-1.5 py-1 text-gray-600 hover:text-gray-900 cursor-pointer"
            data-category={category.id}
            onClick={onCategoryClick}
          >
            <button className="block size-4 rounded border-gray-600 border-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={twMerge(
                  "group-hover:block hidden size-full",
                  currentCategory.includes(category.id.toString())
                    ? "block"
                    : "hidden"
                )}
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="capitalize">{category.name.toLowerCase()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SortBy: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByPrice = searchParams.get("price");

  const handleSortClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const sort = event.currentTarget.dataset.sort as string;
      if (sortByPrice === sort) {
        return;
      }

      if (sort === "clear") {
        setSearchParams((params) => {
          params.delete("price");
          return params;
        });
        return;
      }

      setSearchParams((params) => {
        params.set("price", sort);

        return params;
      });
    },
    [setSearchParams, sortByPrice]
  );

  return (
    <div className={twMerge("relative", className)} {...props}>
      <button className="peer focus:border-primary flex items-center justify-between text-left w-40 rounded border px-2 py-0.5 peer">
        <span>
          {isEmpty(sortByPrice)
            ? "Sắp xếp theo giá"
            : sortByPrice === "desc"
            ? "Giá Cao - Thấp"
            : "Giá Thấp - Cao"}
        </span>
        {sortByPrice === "desc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="size-4 fill-primary"
          >
            <path
              fillRule="evenodd"
              d="M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 7.5a.75.75 0 0 1 .75-.75h7.508a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5ZM14 7a.75.75 0 0 1 .75.75v6.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V7.75A.75.75 0 0 1 14 7ZM2 11.25a.75.75 0 0 1 .75-.75h4.562a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}

        {sortByPrice === "asc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="size-4 fill-primary"
          >
            <path
              fillRule="evenodd"
              d="M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 7.5a.75.75 0 0 1 .75-.75h6.365a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5ZM14 7a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02l-1.95-2.1v6.59a.75.75 0 0 1-1.5 0V9.66l-1.95 2.1a.75.75 0 1 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 14 7ZM2 11.25a.75.75 0 0 1 .75-.75H7A.75.75 0 0 1 7 12H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </button>

      <ul className="absolute hidden z-20 top-full w-full py-2 mt-2 rounded bg-white border peer-focus:block hover:block">
        <li
          data-sort="asc"
          onClick={handleSortClick}
          className="px-2 group flex items-center gap-x-1.5 text-gray-600 hover:text-primary cursor-pointer"
        >
          <p className="capitalize">Thấp - cao</p>
        </li>
        <li
          data-sort="desc"
          onClick={handleSortClick}
          className="px-2 group flex items-center gap-x-1.5 text-gray-600 hover:text-primary cursor-pointer"
        >
          <p className="capitalize">Cao - thấp</p>
        </li>
        <li
          data-sort="clear"
          onClick={handleSortClick}
          className="px-2 group flex items-center gap-x-1.5 text-gray-600 hover:text-primary cursor-pointer"
        >
          <p className="capitalize">Bỏ sắp xếp</p>
        </li>
      </ul>
    </div>
  );
};

const ProductFilter: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "w-56 h-fit space-y-5 p-5 shadow-gray-300 shadow-sm border mt-12",
        className
      )}
      {...props}
    >
      <div className="items-center gap-x-2 hidden md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        <p className="text-lg font-semibold text-gray-600">Bộ lọc tìm kiếm</p>
      </div>
      <CategoryFilter />
      <RangePrice />
    </div>
  );
};

export const ProductFilterMobile: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useBoolean(false);
  const currentIsMobile = useRef(isMobile);
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;

      if (currentIsMobile.current === isMobileView) {
        return;
      }

      currentIsMobile.current = isMobileView;
      setIsMobile(isMobileView);
    };

    // chạy 1 lần khi mount
    handleResize();

    // lắng nghe resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <>
      <button
        onClick={setIsOpen.toggle}
        className="w-fit flex items-center space-x-2 rounded border px-2 py-0.5"
      >
                <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        <span>Bộ Lọc</span>
      </button>
{isOpen ? (
  <div className="fixed inset-0 z-50 bg-black/30">
    <div className="fixed top-0 left-0 h-full w-72 max-w-full bg-white shadow-lg p-4 overflow-y-auto">
      {/* Header + nút đóng */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Bộ Lọc</h2>
        <button
          className="size-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          onClick={setIsOpen.off}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nội dung bộ lọc */}
      <ProductFilter className="mt-0 shadow-none border-none p-0" />
    </div>
  </div>
) : null}
    </>
  ) : null;
};

export default ProductFilter;
