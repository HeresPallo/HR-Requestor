import { useEffect, useState } from 'react';

const PhoneClaimAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/phoneclaim');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Phone Claim Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Purpose of Payment</th>
              <th className="border px-4 py-2">Application Date</th>
              <th className="border px-4 py-2">Handset Benefit by Band</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.employee_name}</td>
                <td className="border px-4 py-2">{item.department}</td>
                <td className="border px-4 py-2">{item.payment}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.band}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneClaimAdmin;
