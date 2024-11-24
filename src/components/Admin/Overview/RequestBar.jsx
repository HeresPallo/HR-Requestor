import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const RequestBar = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  // Map form names to their respective admin routes
  const adminRoutes = {
    'Next of Kin': '/admin/nextofkin',
    'Phone Claim': '/admin/phoneclaim',
    'Insurance Form': '/admin/insurance',
    'ID Card': '/admin/idcard',
    'Fiber Submission': '/admin/fiber',
  };

  const handleNavigate = (formName) => {
    const route = adminRoutes[formName];
    if (route) {
      navigate(route); // Navigate to the correct admin page
    } else {
      console.error('No admin page defined for this form.');
    }
  };

  // Fetch new requests dynamically
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5001/requests?status=pending');
        const data = await response.json();
        setRequests(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests(); // Call fetchRequests on component mount
  }, []); // Empty dependency array ensures this runs once on mount

  

  return (
    <div className="w-[1036px] h-auto bg-white rounded-xl shadow p-6 my-4 mx-4">
    <div className="text-black text-base font-bold font-['Helvetica75'] mb-4">Requests</div>
    <div className="overflow-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-black">
            <th className="text-white border-b border-gray-300 px-4 py-2">Form Name</th>
            <th className="text-white border-b border-gray-300 px-4 py-2">Date Created</th>
            <th className="text-white border-b border-gray-300 px-4 py-2">Address Request</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.form_name}</td>
              <td>{new Date(request.created_at).toLocaleString()}</td>
              <td><button 
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mb-2"
              onClick={() => handleNavigate(request.form_name)}
              >Request</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default RequestBar;
