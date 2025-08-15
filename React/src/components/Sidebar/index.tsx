import {Link, useLocation} from "react-router-dom";
import {twMerge} from "tailwind-merge";


const Sidebar = () => {
    const {pathname} = useLocation()
    return (
        <nav
            className="h-full border-r w-60 flex-shrink-0 flex flex-col space-y-2 overflow-y-hidden"
        >
            <div
                className="h-fit flex-none border-b p-2 pl-4"
                style={
                    {
                        height: "var(--layout-header-height)"
                    }
                }
            >
                <Link
                    to="/dashboard"
                >
                    <img
                        className="h-full"
                        src="/images/logo.png"
                        alt="logo"
                    />
                </Link>

            </div>
            <ul className="list-none overflow-y-scroll">
                <li
                    className={
                        twMerge(
                            "border-l-2.5 p-2 rounded-sm transition-all duration-200",
                            pathname === "/dashboard" ? "border-primary text-primary" : "border-transparent text-secondary opacity-80"
                        )
                    }
                >
                    <Link
                        to="/dashboard"
                        className="flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/>
                        </svg>


                        <span
                            className="font-medium text-sm"
                        >
                            Tổng quan
                        </span>

                    </Link>
                </li>
                <li
                    className={
                        twMerge(
                            "border-l-2.5 p-2 rounded-sm transition-all duration-200",
                            pathname === "/dashboard/orders" ? "border-primary text-primary" : "border-transparent text-secondary opacity-80"
                        )
                    }
                >
                    <Link
                        to="/dashboard/orders"
                        className="flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"/>
                        </svg>

                        <span
                            className="font-medium text-sm"
                        >
                            Đơn hàng
                        </span>

                    </Link>
                </li>
                <li
                    className={
                        twMerge(
                            "border-l-2.5 p-2 rounded-sm transition-all duration-200",
                            pathname === "/dashboard/categories" ? "border-primary text-primary" : "border-transparent text-secondary opacity-80"
                        )
                    }
                >
                    <Link
                        to="/dashboard/categories"
                        className="flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M19.77 11.25h-4.04c-2.01 0-2.98-.89-2.98-2.73V3.98c0-1.84.98-2.73 2.98-2.73h4.04c2.01 0 2.98.89 2.98 2.73v4.53c0 1.85-.98 2.74-2.98 2.74Zm-4.04-8.5c-1.34 0-1.48.38-1.48 1.23v4.53c0 .86.14 1.23 1.48 1.23h4.04c1.34 0 1.48-.38 1.48-1.23V3.98c0-.86-.14-1.23-1.48-1.23h-4.04ZM19.77 22.75h-4.04c-2.01 0-2.98-.98-2.98-2.98v-4.04c0-2.01.98-2.98 2.98-2.98h4.04c2.01 0 2.98.98 2.98 2.98v4.04c0 2-.98 2.98-2.98 2.98Zm-4.04-8.5c-1.18 0-1.48.3-1.48 1.48v4.04c0 1.18.3 1.48 1.48 1.48h4.04c1.18 0 1.48-.3 1.48-1.48v-4.04c0-1.18-.3-1.48-1.48-1.48h-4.04ZM8.27 11.25H4.23c-2.01 0-2.98-.89-2.98-2.73V3.98c0-1.84.98-2.73 2.98-2.73h4.04c2.01 0 2.98.89 2.98 2.73v4.53c0 1.85-.98 2.74-2.98 2.74Zm-4.04-8.5c-1.34 0-1.48.38-1.48 1.23v4.53c0 .86.14 1.23 1.48 1.23h4.04c1.34 0 1.48-.38 1.48-1.23V3.98c0-.86-.14-1.23-1.48-1.23H4.23ZM8.27 22.75H4.23c-2.01 0-2.98-.98-2.98-2.98v-4.04c0-2.01.98-2.98 2.98-2.98h4.04c2.01 0 2.98.98 2.98 2.98v4.04c0 2-.98 2.98-2.98 2.98Zm-4.04-8.5c-1.18 0-1.48.3-1.48 1.48v4.04c0 1.18.3 1.48 1.48 1.48h4.04c1.18 0 1.48-.3 1.48-1.48v-4.04c0-1.18-.3-1.48-1.48-1.48H4.23Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span
                            className="font-medium text-sm"
                        >
                            Danh mục
                        </span>

                    </Link>
                </li>
                <li
                    className={
                        twMerge(
                            "border-l-2.5 p-2 rounded-sm transition-all duration-200",
                            pathname === "/dashboard/products" ? "border-primary text-primary" : "border-transparent text-secondary opacity-80"
                        )
                    }
                >
                    <Link
                        to="/dashboard/products"
                        className="flex items-center space-x-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.30902 1C2.93025 1 2.58398 1.214 2.41459 1.55279L1.05279 4.27639C1.01807 4.34582 1 4.42238 1 4.5V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V4.5C14 4.42238 13.9819 4.34582 13.9472 4.27639L12.5854 1.55281C12.416 1.21403 12.0698 1.00003 11.691 1.00003L7.5 1.00001L3.30902 1ZM3.30902 2L7 2.00001V4H2.30902L3.30902 2ZM8 4V2.00002L11.691 2.00003L12.691 4H8ZM7.5 5H13V13H2V5H7.5ZM5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H9.5C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7H5.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span
                            className="font-medium text-sm"
                        >
                            Sản phẩm
                        </span>
                    </Link>
                </li>


            </ul>
        </nav>
    );
};

export default Sidebar