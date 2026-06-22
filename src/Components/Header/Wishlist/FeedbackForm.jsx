import { useState } from 'react';

const FeedbackForm = ({ order, existingRating, existingReview, onSubmitFeedback, onBack }) => {
  const [rating, setRating] = useState(existingRating || 0);
  const [review, setReview] = useState(existingReview || '');
  const [hoverRating, setHoverRating] = useState(0);
  const [exchangeRequested, setExchangeRequested] = useState(false);
  const [exchangeReason, setExchangeReason] = useState('');

  const canExchange = (orderDate, orderStatus) => {
    if (orderStatus !== 'Delivered') return false;
    const days = (new Date() - new Date(orderDate)) / (1000 * 60 * 60 * 24);
    return days <= 3;
  };

  const daysLeft = order ? Math.max(0, 3 - Math.floor((new Date() - new Date(order.date)) / (1000 * 60 * 60 * 24))) : 0;
  const isExchangeAllowed = order && canExchange(order.date, order.status);

  const handleSubmit = () => {
    if (rating === 0) {
      alert('⚠️ Please select a rating!');
      return;
    }
    onSubmitFeedback(order.id, rating, review);
  };

  const handleExchange = () => {
    const reason = prompt('Exchange Reason:\n1. Size issue\n2. Color issue\n3. Damaged product\n4. Wrong item\n5. Other');
    if (reason) {
      setExchangeReason(reason);
      setExchangeRequested(true);
      alert(`🔄 Exchange request submitted for ${order.id}!`);
    }
  };

  if (!order) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>Loading...</p>
      <button onClick={onBack} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#007bff', 
          cursor: 'pointer', 
          marginBottom: '20px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← Back to Orders
      </button>
      
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>
        {existingRating > 0 ? '✏️ Edit Feedback' : '⭐ Write Feedback'}
      </h2>

      {/* Product Info */}
      <div style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '12px', marginBottom: '25px' }}>
        <img src={order.image} alt="Product" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Order ID: {order.id}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Placed on: {order.date}</div>
          <div style={{ fontSize: '16px', color: '#28a745', fontWeight: 'bold' }}>₱{order.total}</div>
        </div>
      </div>

      {/* Star Rating */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px', display: 'block' }}>Your Rating ⭐</label>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <span 
              key={star} 
              onClick={() => setRating(star)} 
              onMouseEnter={() => setHoverRating(star)} 
              onMouseLeave={() => setHoverRating(0)}
              style={{ 
                fontSize: '48px', 
                cursor: 'pointer', 
                color: (hoverRating >= star || rating >= star) ? '#ffc107' : '#e4e5e9',
                transition: 'color 0.2s'
              }}
            >★</span>
          ))}
        </div>
        {rating > 0 && <div style={{ color: '#28a745', marginTop: '10px', fontSize: '13px' }}>You selected {rating} star{rating > 1 ? 's' : ''}</div>}
      </div>

      {/* Review Text */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px', display: 'block' }}>Your Review 📝</label>
        <textarea 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
          placeholder="Share your experience with this product..." 
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            minHeight: '100px', 
            marginTop: '5px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }} 
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{review.length} characters</div>
      </div>

      {/* Exchange Policy */}
      <div style={{ marginBottom: '25px', padding: '15px', background: '#fff3cd', borderRadius: '12px', border: '1px solid #ffeeba' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#856404' }}>🔄 Exchange Policy (3 Days Return Window)</div>
        {order.status === 'Delivered' ? (
          isExchangeAllowed ? (
            !exchangeRequested ? (
              <button 
                onClick={handleExchange} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                🔄 Request Exchange ({daysLeft} days left)
              </button>
            ) : (
              <div style={{ background: '#28a745', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                ✅ Exchange Requested - {exchangeReason}
              </div>
            )
          ) : (
            <div style={{ color: '#dc3545', textAlign: 'center', padding: '10px' }}>
              ⏰ Exchange period expired (Only 3 days from delivery)
            </div>
          )
        ) : (
          <div style={{ color: '#666', textAlign: 'center', padding: '10px' }}>
            📦 Exchange available only after order is delivered
          </div>
        )}
      </div>

      {/* Submit Button - Yellow like Write Review */}
      <button 
        onClick={handleSubmit} 
        style={{ 
          width: '100%', 
          padding: '12px', 
          background: '#ffc107', 
          border: 'none', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          marginBottom: '15px',
          color: '#333'
        }}
      >
        {existingRating > 0 ? '✨ Update Feedback ✨' : '⭐ Submit Feedback →'}
      </button>

      {/* Info Note */}
      <div style={{ 
        marginTop: '15px', 
        padding: '12px', 
        background: '#e3f2fd', 
        borderRadius: '8px', 
        fontSize: '12px', 
        textAlign: 'center',
        color: '#0056b3'
      }}>
        💡 Your feedback helps other customers make better buying decisions!
      </div>
    </div>
  );
};

export default FeedbackForm;