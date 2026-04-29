import { useState } from "react";

export default function ProductCard({ product, cart, setCart }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const count = cart[product.id] || 0;
  

  const images = product.images;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const addToCart = () => {
  setCart(prev => ({
    ...prev,
    [product.id]: (prev[product.id] || 0) + 1
  }));
};

const removeFromCart = () => {
  setCart(prev => {
    const newCart = { ...prev };

    if (newCart[product.id] === 1) {
      delete newCart[product.id];
    } else {
      newCart[product.id] -= 1;
    }

    return newCart;
  });
};

  return (
    <div className="card">
      {/* IMAGE */}
      <div className="card-image">
        <img src={images[currentImage]} alt={product.model} />

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button className="arrow left" onClick={prevImage}>
              ‹
            </button>
            <button className="arrow right" onClick={nextImage}>
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentImage ? "dot active" : "dot"}
              />
            ))}
          </div>
        )}

        {/* SPECIAL OFFER */}
        {product.isSpecialOffer && (
          <div className="badge">Special Offer</div>
        )}

        {/* FAVORITE */}
        <button
          className="favorite"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* INFO */}
      <div className="card-body">
        <p className="brand">{product.make}</p>
        <h4 className="model">{product.model}</h4>
        <p className="price">
          ${product.price.toLocaleString()}
        </p>

        {/* CART */}
        {count === 0 ? (
          <button onClick={addToCart}>Add to Cart</button>
         ) : (
        <div>
          <button onClick={removeFromCart}>-</button>
          <span>{count} in cart</span>
          <button onClick={addToCart}>+</button>
        </div>
      )}
      </div>
    </div>
  );
}