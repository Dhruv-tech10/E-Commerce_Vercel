import { useState } from 'react';
import Bride from '../../src/assets/Img/Beauty decor/Bride7.jpg';
import Bride1 from '../../src/assets/Img/Beauty decor/Bride10.jpg';

const User = ({ navigateToFeedback, ratings: externalRatings, reviews: externalReviews }) => {
  const orders = [
    { id: "#06133454676", date: "20 July 2024", total: "6,663", status: "Delivered", image: Bride },
    { id: "#06133454677", date: "18 July 2024", total: "2,199", status: "Shipped", image: Bride1 },
    { id: "#06133454678", date: "15 July 2024", total: "1,299", status: "Processing", image: Bride },
    { id: "#06133454679", date: "10 July 2024", total: "3,499", status: "Delivered", image: Bride1 },
    { id: "#06133454680", date: "05 July 2024", total: "4,999", status: "Shipped", image: Bride },
    { id: "#06133454681", date: "01 July 2024", total: "1,899", status: "Processing", image: Bride1 },
    { id: "#06133454682", date: "28 June 2024", total: "5,599", status: "Delivered", image: Bride },
    { id: "#06133454683", date: "25 June 2024", total: "899", status: "Shipped", image: Bride1 }
  ];
  const [cancelledOrders, setCancelledOrders] = useState({});
  const [ratings, setRatings] = useState(externalRatings || {});
  const [reviews, setReviews] = useState(externalReviews || {});
  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Cancel Order ${orderId}?`)) {
      setCancelledOrders(prev => ({ ...prev, [orderId]: true }));
      alert(`Order ${orderId} cancelled!`);
    }
  };
  const canCancel = (status) => status === 'Processing' || status === 'Shipped';
  const StarDisplay = ({ rating }) => (
    <div style={{ display: 'flex', gap: '3px', marginTop: '5px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} style={{ fontSize: '16px', color: star <= rating ? '#ffc107' : '#e4e5e9' }}>★</span>
      ))}
    </div>
  );
  const OrderCard = ({ order }) => {
    const isCancelled = cancelledOrders[order.id];
    const showCancel = canCancel(order.status);
    const hasRating = (ratings[order.id] || 0) > 0;
    const reviewText = reviews[order.id] || '';
    if (isCancelled) {
      return (
        <div style={{ flex: '1', minWidth: '250px', border: '1px solid #dc3545', borderRadius: '12px', padding: '20px', background: '#fff5f5' }}>
          <img src={order.image} alt="Product" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', display: 'block', margin: '0 auto 15px' }} />
          <p><span>Order ID:</span> <strong>{order.id}</strong></p>
          <p><span>Placed on:</span> {order.date}</p>
          <p><span>Total:</span> <strong style={{ color: '#28a745', fontSize: '20px' }}>₱{order.total}</strong></p>
          <span style={{ background: '#dc3545', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>❌ CANCELLED</span>
          <button style={{ width: '100%', marginTop: '15px', padding: '8px', background: 'white', border: '1px solid #007bff', color: '#007bff', borderRadius: '20px', cursor: 'pointer' }}>View Details →</button>
        </div>
      );
    }
    return (
      <div style={{ flex: '1', minWidth: '250px', border: '1px solid #ddd', borderRadius: '12px', padding: '20px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <img src={order.image} alt="Product" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', display: 'block', margin: '0 auto 15px' }} />
        <p><span>Order ID:</span> <strong>{order.id}</strong></p>
        <p><span>Placed on:</span> {order.date}</p>
        <p><span>Total:</span> <strong style={{ color: '#28a745', fontSize: '20px' }}>₱{order.total}</strong></p>
        <span style={{
          background: order.status === 'Delivered' ? '#28a745' : order.status === 'Shipped' ? '#007bff' : '#ffc107',
          color: order.status === 'Processing' ? '#333' : 'white',
          padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'inline-block'
        }}>{order.status}</span>
        {order.status === 'Delivered' && (
          <div style={{ marginTop: '12px' }}>
            {hasRating ? (
              <>
                <StarDisplay rating={ratings[order.id]} />
                {reviewText && <p style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}> "{reviewText}"</p>}
                <button 
                  onClick={() => navigateToFeedback(order, ratings[order.id], reviews[order.id])} 
                  style={{ fontSize: '12px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', marginTop: '5px' }}
                >
                   Edit Review
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigateToFeedback(order, 0, '')} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: '#ffc107', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#333',
                  marginTop: '8px',
                  marginBottom: '8px'
                }}
              >
                Write Review
              </button>
            )}
          </div>
        )}
        <div style={{ marginTop: order.status === 'Delivered' ? '10px' : '15px' }}>
          <button 
            style={{ 
              width: '100%',
              padding: '10px', 
              background: 'white', 
              border: '1px solid #007bff', 
              color: '#007bff', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              marginBottom: showCancel ? '10px' : '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#007bff';
            }}
          >
            View Details  </button>
          {showCancel && (
            <button 
              onClick={() => handleCancelOrder(order.id)} 
              style={{ 
                width: '100%',
                padding: '10px', 
                background: '#FFD700', 
                border: 'none', 
                color: '#8B4513', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >Cancel</button>
          )}
        </div>
        {showCancel && <p style={{ fontSize: '10px', color: '#8B4513', textAlign: 'center', marginTop: '8px' }}>💫 Golden cancel available</p>}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '15px', textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '10px' }}> My Orders</h1>
        <p style={{ opacity: 0.9 }}>⭐ Rate products |  Golden Cancel Button</p>
      </div>
      <h3 style={{ marginBottom: '20px', color: '#333' }}> Recent Orders</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {orders.slice(0, 4).map((order, idx) => <OrderCard key={idx} order={order} />)}
      </div>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Previous Orders</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {orders.slice(4, 8).map((order, idx) => <OrderCard key={idx} order={order} />)}
      </div>
    </div>
  );
};

export default User;