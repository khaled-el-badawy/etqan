import React, { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Makita Drill",
    brand: "Makita",
    price: 1200,
    description: "مثقاب قوي مناسب للأعمال الشاقة",
    stock: 5,
    rating: 4.5,
    images: [
      "/images/product1.png",
      "/images/product2.png",
      "/images/product3.png",
    ],
  };

  const comments = [
    { id: 1, user: "Ahmed", text: "منتج ممتاز جدًا 🔥", rating: 5 },
    { id: 2, user: "Sara", text: "جودته كويسة بس السعر عالي شوية", rating: 4 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Images */}
        <div>
          <img
            src={product.images[selectedImage]}
            alt="product"
            className="w-full rounded-2xl shadow"
          />

          <div className="flex gap-3 mt-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl cursor-pointer border ${
                  selectedImage === i ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-500">Brand: {product.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          {/* Price */}
          <h3 className="text-xl text-green-600 mt-3">
            {product.price} EGP
          </h3>

          {/* Stock */}
          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">
                متوفر ({product.stock})
              </span>
            ) : (
              <span className="text-red-600">غير متوفر</span>
            )}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl">
              <FaShoppingCart /> Add to Cart
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-xl">
              <FaHeart /> Favorite
            </button>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-700">
            {product.description}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">التقييمات</h3>

        {comments.map((c) => (
          <div key={c.id} className="border p-3 rounded-xl mb-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{c.user}</span>

              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {c.rating}
              </span>
            </div>

            <p className="text-gray-600 mt-2">{c.text}</p>
          </div>
        ))}

        {/* Add Comment */}
        <div className="mt-5">
          <textarea
            placeholder="اكتب رأيك..."
            className="w-full border rounded-xl p-3"
          />

          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl">
            إضافة تقييم
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">منتجات مشابهة</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border p-3 rounded-xl">
              <img src="/images/product1.png" alt="" />
              <p className="mt-2">منتج {item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}