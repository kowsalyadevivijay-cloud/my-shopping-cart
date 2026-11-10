import { useCart } from "../context/CartContext";

function Cart() {
    const { cart, removeFromCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return <p className="empty-cart-message">Your Cart is Empty</p>;
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            
            <div className="cart-items">
                {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.title} width={60} />
                        <p className="item-title">{item.title}</p>
                        <p className="item-qty">Qty: {item.quantity}</p>
                        <p className="item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button 
                            className="remove-btn" 
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            </div>
        </div>
    );
}

export default Cart;