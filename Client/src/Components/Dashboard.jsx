
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, RefreshCcw, AlertCircle } from "lucide-react";

// ✅ Fixed BASE_URL logic
const BASE_URL = import.meta.env.VITE_BASE_URL || 
  (import.meta.env.PROD 
    ? "https://crypto-deploy-1.onrender.com"  // Production URL
    : "http://localhost:8005");               // Development URL

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const navigate = useNavigate();

  // Debug log to check URL
  useEffect(() => {
    console.log("🔍 Using BASE_URL:", BASE_URL);
    console.log("🔍 Environment:", import.meta.env.PROD ? "PRODUCTION" : "DEVELOPMENT");
  }, []);

  // Fetch data from API
  const fetchData = async (token) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📡 Fetching from:", `${BASE_URL}/api/get-texts`);

      const response = await fetch(`${BASE_URL}/api/get-texts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        credentials: 'include', // ✅ Added for CORS
      });

      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

      const result = await response.json();
      setContent(result.texts || result || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Verify authentication
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        console.log("🔐 Authenticating with:", `${BASE_URL}/api/auth/me`);
        
        const response = await fetch(`${BASE_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include', // ✅ Added for CORS
        });

        const data = await response.json();

        if (!response.ok || !data.data?.user) {
          throw new Error(data.message || "Authentication failed");
        }

        setUser(data.data.user);
        fetchData(token);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    verifyAuth();
  }, [navigate]);

  // Delete Text
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(id);

      console.log("🗑️ Deleting:", `${BASE_URL}/api/delete-text/${id}`);

      const response = await fetch(`${BASE_URL}/api/delete-text/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        credentials: 'include', // ✅ Added for CORS
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        alert("Failed to delete: Invalid server response");
        return;
      }

      if (response.ok) {
        setContent((prev) => prev.filter((item) => (item._id || item.id) !== id));
      } else {
        alert(result.error || result.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(`Error deleting: ${err.message}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Debug Info (remove in production) */}
      <div className="mb-2 text-xs text-gray-500">
        API URL: {BASE_URL} | Environment: {import.meta.env.PROD ? "PROD" : "DEV"}
      </div>

      {/* Header with buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
        <div className="flex gap-2">
          {/* Refresh Button */}
          <button
            onClick={() => fetchData(localStorage.getItem("token"))}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-950 disabled:opacity-50"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>

          {/* Change Password Button */}
          <button
            onClick={() => navigate("/login?mode=changePassword")}
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Change Password
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
        </div>
      ) : content.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {content.map((item) => {
                const id = item._id || item.id;
                const text = item.content || item.text || String(item);

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={deleteLoading === id}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {deleteLoading === id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-500">No content available</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;