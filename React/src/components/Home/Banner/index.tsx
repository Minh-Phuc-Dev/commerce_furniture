"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div
            className="bg-cover bg-no-repeat bg-center py-36 relative"
            style={{
                backgroundImage: "url('/images/banner-bg.jpg')"
            }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.h1
                    className="xl:text-6xl md:text-5xl text-4xl text-gray-800 font-medium mb-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Bộ sưu tập tốt nhất cho <br className="hidden sm:block" /> trang trí nhà
                </motion.h1>


                <motion.p
                    className="text-base text-gray-600 leading-6"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Khám phá những thiết kế tinh tế và hiện đại, <br className="hidden sm:block" />
                    mang đến không gian sống đầy cảm hứng và phong cách.
                </motion.p>


                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <Link
                        to="/products"
                        className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition"
                    >
                        Mua ngay
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
