const Features = () => {
    return (
        <div className="max-w-1200 mx-auto py-16">
            <div className="lg:w-10/12 grid md:grid-cols-3 gap-3 lg:gap-6 mx-auto justify-center">
                <div
                    className="border-primary border rounded-sm px-8 lg:px-3 lg:py-6 py-4 flex justify-center items-center gap-5">
                    <img
                        src="/images/icons/delivery-van.svg"
                        className="lg:w-12 w-10 h-12 object-contain"
                        alt="delivery-van"
                    />
                    <div>
                        <h4 className="font-medium capitalize text-lg">Giao hàng miễn phí</h4>
                        <p className="text-gray-500 text-xs lg:text-sm">Miễn phí vận chuyển với đơn hàng từ 200$</p>
                    </div>
                </div>

                <div
                    className="border-primary border rounded-sm px-8 lg:px-3 lg:py-6 py-4 flex justify-center items-center gap-5">
                    <img
                        src="/images/icons/money-back.svg"
                        className="lg:w-12 w-10 h-12 object-contain"
                        alt="money-back"
                    />
                    <div>
                        <h4 className="font-medium capitalize text-lg">Hoàn tiền dễ dàng</h4>
                        <p className="text-gray-500 text-xs lg:text-sm">Hoàn tiền trong 30 ngày nếu không hài lòng</p>
                    </div>
                </div>

                <div
                    className="border-primary border rounded-sm px-8 lg:px-3 lg:py-6 py-4 flex justify-center items-center gap-5">
                    <img
                        src="/images/icons/service-hours.svg"
                        className="lg:w-12 w-10 h-12 object-contain"
                        alt="service-hours"
                    />
                    <div>
                        <h4 className="font-medium capitalize text-lg">Hỗ trợ 24/7</h4>
                        <p className="text-gray-500 text-xs lg:text-sm">Luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;