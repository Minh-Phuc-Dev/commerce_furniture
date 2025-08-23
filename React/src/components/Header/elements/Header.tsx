import Cart from "components/Header/elements/Cart";
import Order from "components/Header/elements/Order";
import { ChangeEvent, useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") ?? ""
  );

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleOnSubmit = useCallback(
    (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate(`/products?search=${event.target.dataset.search}`);
    },
    [navigate]
  );

  return (
    <div className="max-w-1200 w-full mx-auto py-2 flex items-center xl:px-0 px-5">
      <Link to="/">
        <img className="h-12" src="/images/logo.png" alt="logo" />
      </Link>
      <div className="grow px-5">
        <form
          className="flex mx-auto w-full rounded overflow-hidden"
          data-search={search}
          style={
            {
                maxWidth: '600px'
            }
          }
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            value={search}
            onChange={handleOnChange}
            className="w-full rounded-sm border border-gray-300 px-3 py-2"
          />
          <button
            className="bg-primary text-white px-3 py-2 whitespace-nowrap "
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 sm:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="hidden sm:inline">Tìm kiếm</span>
           
          </button>
        </form>
      </div>
      <div className="flex space-x-4">
        <Order />
        <Cart />
        <Link className="hover:text-primary hidden sm:block" to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Header;
