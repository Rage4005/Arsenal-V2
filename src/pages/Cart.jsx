import React, { useState, useEffect } from 'react';
import '../cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptTotals, setReceiptTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(items);
  }, []);

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const generateOrderId = () => {
    return 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setOrderId(generateOrderId());
    setOrderDate(new Date().toLocaleString());
    setReceiptItems([...cart]);
    setReceiptTotals({ subtotal, tax, total });
    setShowPayment(false);
    setShowReceipt(true);
    setCart([]);
    localStorage.setItem('cart', '[]');
  };

  const downloadReceipt = () => {
    const receiptContent = `Arsenal Game Store
Order Date: ${orderDate}
Buyer: Rage
Order ID: ${orderId}

Items:
${receiptItems.map(item => `${item.title} - $${parseFloat(item.price).toFixed(2)}`).join('\n')}

Subtotal: $${receiptTotals.subtotal.toFixed(2)}
Tax (10%): $${receiptTotals.tax.toFixed(2)}
Total: $${receiptTotals.total.toFixed(2)}

Thank you for shopping at Arsenal!`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Arsenal_Receipt_${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-grid">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <article key={index} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${parseFloat(item.price).toFixed(2)}</p>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(index)}>
                <i className="fas fa-trash"></i>
              </button>
            </article>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
          <p>Tax (10%): <span>${tax.toFixed(2)}</span></p>
          <p className="total">Total: <span>${total.toFixed(2)}</span></p>
        </div>
        {cart.length > 0 && (
          <button className="proceed-button" onClick={() => setShowPayment(true)}>
            Proceed to Payment
          </button>
        )}
      </div>

      {showPayment && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowPayment(false)}>&times;</span>
            <h2>Payment Details</h2>
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  maxLength="19" 
                  value={cardNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    let formatted = '';
                    for (let i = 0; i < val.length; i++) {
                      if (i > 0 && i % 4 === 0) formatted += ' ';
                      formatted += val[i];
                    }
                    setCardNumber(formatted);
                  }}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    maxLength="5" 
                    value={expiryDate}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 2) val = val.substr(0, 2) + '/' + val.substr(2);
                      setExpiryDate(val);
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" maxLength="3" required />
                </div>
              </div>
              <button type="submit" className="payment-button">Pay Now</button>
            </form>
          </div>
        </div>
      )}

      {showReceipt && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowReceipt(false)}>&times;</span>
            <div className="receipt">
              <h2>Purchase Receipt</h2>
              <div className="receipt-header">
                <p>Arsenal Game Store</p>
                <p>Order Date: <span>{orderDate}</span></p>
                <p>Buyer: Rage</p>
                <p>Order ID: <span>{orderId}</span></p>
              </div>
              <div className="receipt-items">
                {receiptItems.map((item, idx) => (
                    <div key={idx} className="receipt-item">
                        <span>{item.title}</span>
                        <span>${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                ))}
              </div>
              <div className="receipt-summary">
                 <p>Subtotal: <span>${receiptTotals.subtotal.toFixed(2)}</span></p>
                 <p>Tax (10%): <span>${receiptTotals.tax.toFixed(2)}</span></p>
                 <p className="total">Total: <span>${receiptTotals.total.toFixed(2)}</span></p>
              </div>
              <div className="receipt-footer">
                  <p>Thank you for shopping at Arsenal!</p>
                  <button className="download-button" onClick={downloadReceipt}>Download Receipt</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default Cart;
