import { FC, Fragment, ReactNode } from 'react';
import { Link } from "react-router-dom";

type Breadcrumb = {
    label: ReactNode,
    to: string
}


const Breadcrumb: FC<{ items?: { to: string, label: ReactNode }[] }> = ({ items = [] }) => {
    return (
        <div className="py-4 container flex gap-3 items-center">
            <Link to="/" className="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path
                        d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
                    />
                    <path
                        d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                    />
                </svg>
            </Link>
            {
                items.map(
                    (
                        { to, label }, index) => (
                        <Fragment key={index}>
                            <span className="text-sm text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <Link to={to} className="text-gray-600 font-medium">{label}</Link>
                        </Fragment>
                    )
                )
            }

        </div>
    );
};

export default Breadcrumb;