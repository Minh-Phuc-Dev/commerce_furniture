const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-16 pb-12 border-t border-gray-100">
            <div className="max-w-1200 mx-auto ">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8 xl:px-0 px-5">

                    <div className="space-y-8 xl:col-span-1">
                        <img className="w-20" src="/images/logo.png" alt="Company name"/>
                        <p className="text-gray-500 text-base">
                            House Luxury là thương hiệu nội thất với mẫu mã hiện đại, phù hợp nhiều không gian sống. Cam kết chất lượng và giá trị lâu dài.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-red-400 tracking-wider uppercase">
                                    DỊCH VỤ
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Chính Sách Bán Hàng
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Giao Hàng & Lắp Đặt
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Bảo Hành & Đổi Trả
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Tư Vấn Sản Phẩm
                                    </a>
                                </div>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-red-400 tracking-wider uppercase">
                                    HỖ TRỢ
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Câu Hỏi Thường Gặp
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Hướng Dẫn Mua Hàng
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Chính Sách Bảo Mật
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Liên Hệ
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-red-400 tracking-wider uppercase">
                                    CÔNG TY
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Giới Thiệu
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Tin Tức
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Tuyển Dụng
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Hệ Thống Cửa Hàng
                                    </a>
                                </div>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-red-400 tracking-wider uppercase">
                                    ĐIỀU KHOẢN
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Điều Khoản Sử Dụng
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Chính Sách Riêng Tư
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Quy Định Thanh Toán
                                    </a>
                                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                                        Chính Sách Bản Quyền
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;