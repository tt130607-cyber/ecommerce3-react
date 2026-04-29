import products from "../data/products";

export default function Cart({ cart, setCart, setPageType }) {
  const cartItems = Object.keys(cart);

  const add = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const remove = (id) => {
    setCart(prev => {
      const newCart = { ...prev };

      if (newCart[id] === 1) {
        delete newCart[id];
      } else {
        newCart[id] -= 1;
      }

      return newCart;
    });
  };

  const deleteItem = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const subtotal = cartItems.reduce((sum, id) => {
    const product = products.find(p => p.id === Number(id));
    return sum + product.price * cart[id];
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <button onClick={() => setPageType("tv")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map(id => {
        const product = products.find(p => p.id === Number(id));

        return (
          <div key={id} style={{ marginBottom: "20px" }}>
            <h3>{product.make} {product.model}</h3>

            <p>${product.price} × {cart[id]}</p>

            <div>
              <button onClick={() => remove(id)}>-</button>
              <span> {cart[id]} </span>
              <button onClick={() => add(id)}>+</button>
            </div>

            <p>Item total: ${(product.price * cart[id]).toFixed(2)}</p>

            <button onClick={() => deleteItem(id)}>
              Remove item
            </button>
          </div>
        );
      })}

      <hr />

      <h2>Subtotal: ${subtotal.toFixed(2)}</h2>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>Shipping: Calculated at checkout</p>
      <h2>Total: ${total.toFixed(2)}</h2>

      <button>Proceed to Checkout</button>

      <button onClick={() => setPageType("tv")}>
        Back to Shopping
      </button>
    </div>
  );
}