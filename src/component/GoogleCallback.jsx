import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/auth";
import { setUserDetails } from "../../redux/slices/userSlice";
import { setUserType } from "../../redux/slices/userType";
import ICCDLoader from './loader';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const errorParam = params.get("error");
    const errorDetails = params.get("details");

    // Handle OAuth errors
    if (errorParam) {
      console.error('Google OAuth Error:', errorParam);
      console.error('Error Details:', errorDetails);
      setError(errorDetails || errorParam);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            error: "Google authentication failed. Please try again." 
          } 
        });
      }, 3000);
      return;
    }

    // Handle successful authentication
    if (token) {
      try {
        // Decode JWT token
        const payload = JSON.parse(atob(token.split(".")[1]));
        
        // Validate payload
        if (!payload.userId || !payload.email) {
          throw new Error("Invalid token payload");
        }

        const user = { 
          id: payload.userId, 
          email: payload.email,
          name: payload.name || "" 
        };

        // Save JWT to localStorage
        setToken(token);

        // Save user in Redux
        dispatch(setUserDetails(user));
        dispatch(setUserType({ id: user.id, type: "client" }));

        // Redirect to client dashboard
        navigate("/client");
      } catch (err) {
        console.error('Token parsing error:', err);
        setError('Invalid authentication token. Please try again.');
        
        setTimeout(() => {
          navigate("/login", {
            state: { 
              error: "Authentication failed. Please try again." 
            }
          });
        }, 3000);
      }
    } else {
      // No token and no error - redirect to login
      console.warn('No token received from Google OAuth');
      navigate("/login");
    }
  }, [location.search, navigate, dispatch]);

  // Show error state
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ 
          color: '#e74c3c', 
          fontSize: '18px', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          Authentication Error
        </div>
        <div style={{ 
          color: '#555', 
          fontSize: '14px',
          marginBottom: '20px' 
        }}>
          {error}
        </div>
        <div style={{ color: '#888', fontSize: '12px' }}>
          Redirecting to login...
        </div>
      </div>
    );
  }

  // Show loader while processing
  return <ICCDLoader />;
};

export default GoogleCallback;