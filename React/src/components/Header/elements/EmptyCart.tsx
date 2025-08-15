const EmptyCart = () => {
    return (
        <div className="p-5 space-y-2">
            <img
                className="w-32 block mx-auto"
                alt="No items"
                src="/images/cart-empty.png"
            />
            <p className="text-sm text-center text-gray-500">Không có mục nào</p>
        </div>
    );
};

export default EmptyCart;