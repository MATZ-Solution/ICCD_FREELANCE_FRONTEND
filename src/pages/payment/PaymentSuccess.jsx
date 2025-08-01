import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "../../../redux/slices/orderSlice";
import ICCDLoader from "../../component/loader";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const userDetails = useSelector((state) => state.user.userDetails);

  
  const fetchSessionAndProcessOrder = async (sessionId) => {
    try {
      // Fetch session data from Stripe
      const sessionResponse = await fetch(`http://localhost:2300/stripe/session?session_id=${sessionId}`);

      if (!sessionResponse.ok) {
        throw new Error(`Failed to fetch session: ${sessionResponse.status}`);
      }

      const sessionData = await sessionResponse.json();
      setData(sessionData);

      // Process order
      const orderData = {
        id: sessionData.id,
        customer_email: sessionData.customer_email,
        amount_total: sessionData.amount_total,
        payment_status: sessionData.payment_status,
        quantity: order.quantity,
        basePrice: order.basePrice,
        totalPrice: order.totalPrice,
        packageType: order.packageType,
        packageDescription: order.packageDescription,
        revisions: order.revisions,
        freelancer_id: order.freelancer_id,
        client_id: order.client_id,
        gig_id: order.gig_id,
        freelancer_client_id: order.freelancer_client_id
      };


      const orderResponse = await fetch("http://localhost:2300/stripe/process-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(`Order processing failed: ${orderResult.error || orderResponse.status}`);
      }

      // Show confirmation message
      if (orderResult.isNew) {
        setOrderStatus("✅ Payment confirmed and order saved successfully!");
      } else {
        setOrderStatus("ℹ️ Payment confirmed (order was already processed)");
      }

      dispatch(setOrderDetails({
        quantity: order.quantity,
        basePrice: order.basePrice,
        totalPrice: order.totalPrice,
        packageType: order.packageType,
        packageDescription: order.packageDescription,
        revisions: order.revisions,
        freelancer_id: order.freelancer_id,
        client_id: order.client_id,
        gig_id: order.gig_id,
      }));

    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect is called!")
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setError("Session ID not found in URL");
      setLoading(false);
      return;
    }

    fetchSessionAndProcessOrder(sessionId);
  }, []);
  // if (loading ) {
  //        return <ICCDLoader /> 
  //      }


  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>🔄 Processing Payment...</h1>
        <p>Please wait while we confirm your payment and save your order.</p>
        <div style={{ margin: '20px 0' }}>
          <div style={{
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>❌ Error</h1>
        <p>There was an error processing your payment:</p>
        <div style={{
          background: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '5px',
          padding: '15px',
          margin: '20px 0',
          color: '#c62828'
        }}>
          {error}
        </div>
        <p>Please contact support if this issue persists.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return <ICCDLoader />
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <h1>🎉 Payment Successful!</h1>

      {orderStatus && (
        <div style={{
          padding: '15px',
          marginBottom: '30px',
          backgroundColor: orderStatus.includes('successfully') ? '#e8f5e8' : '#e3f2fd',
          border: '1px solid ' + (orderStatus.includes('successfully') ? '#4caf50' : '#2196f3'),
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {orderStatus}
        </div>
      )}

      {data ? (
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '25px',
          borderRadius: '10px',
          textAlign: 'left',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Payment Details:</h3>
          <div style={{ lineHeight: '1.8' }}>
            <p><strong>📧 Email:</strong> {data.customer_email || 'Not provided'}</p>
            <p><strong>💰 Amount:</strong> ${data.amount_total ? (data.amount_total / 100).toFixed(2) : 'N/A'}</p>
            <p><strong>📊 Status:</strong> {data.payment_status || 'N/A'}</p>
            <p><strong>🔗 Session ID:</strong> <code style={{ background: '#eee', padding: '2px 6px', borderRadius: '3px' }}>{data.id || 'N/A'}</code></p>
          </div>
        </div>
      ) : (
        <p>No payment details available.</p>
      )}

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '12px 30px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Continue Shopping
        </button>
        <button
          onClick={() => window.print()}
          style={{
            padding: '12px 30px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
