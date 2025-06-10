import { useFetch } from "./hooks/useFetch";
import type { Product } from "./types/product.type";

const URL = "https://dummyjson.com/products/115";

function App() {
  const { data: product, error, loading } = useFetch<Product>(URL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(product.price * 82);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl space-y-8 mt-15">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="w-full h-80 sm:h-96 rounded-lg overflow-hidden shadow-md">
            <img
              loading="lazy"
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="border-b pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-blue-700">
                {formattedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ₹
                    {(
                      product.price *
                      82 *
                      (1 + product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <div
              className={`text-sm font-medium ${
                product.availabilityStatus === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.availabilityStatus}
            </div>

            <div className="flex gap-4 pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors cursor-pointer">
                Add to Cart
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition-colors cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong className="text-gray-800">Brand:</strong>{" "}
                {product.brand}
              </p>
              <p>
                <strong className="text-gray-800">Category:</strong>{" "}
                {product.category}
              </p>
              <p>
                <strong className="text-gray-800">Stock:</strong>{" "}
                {product.stock} units
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong className="text-gray-800">SKU:</strong> {product.sku}
              </p>
              <p>
                <strong className="text-gray-800">Tags:</strong>{" "}
                {product.tags.join(", ")}
              </p>
              <p>
                <strong className="text-gray-800">Min. Order:</strong>{" "}
                {product.minimumOrderQuantity}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Specifications</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Width:</strong> {product.dimensions.width} cm
              </p>
              <p>
                <strong>Height:</strong> {product.dimensions.height} cm
              </p>
              <p>
                <strong>Depth:</strong> {product.dimensions.depth} cm
              </p>
              <p>
                <strong>Weight:</strong> {product.weight} kg
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Policies</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Shipping:</strong> {product.shippingInformation}
              </p>
              <p>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {product.returnPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">
          Customer Reviews ({product.reviews.length})
        </h2>

        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{review.reviewerName}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong className="text-gray-800">Barcode:</strong>{" "}
            {product.meta.barcode}
          </p>
          <p>
            <strong className="text-gray-800">Created:</strong>{" "}
            {new Date(product.meta.createdAt).toLocaleString()}
          </p>
          <p>
            <strong className="text-gray-800">Updated:</strong>{" "}
            {new Date(product.meta.updatedAt).toLocaleString()}
          </p>
        </div>
        {product.meta.qrCode && (
          <div className="bg-white p-2 rounded border">
            <img
              src={product.meta.qrCode}
              alt="QR Code"
              className="w-24 h-24"
            />
            <p className="text-xs text-center mt-1 text-gray-500">
              Scan to view
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
