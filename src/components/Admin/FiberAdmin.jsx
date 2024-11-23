import { useEffect, useState } from 'react';

const FiberAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/fiber');
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
      <h1 className="text-2xl font-bold mb-4">Fiber Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Residential Address</th>
              <th className="border px-4 py-2">Mobile No.</th>
              <th className="border px-4 py-2">Fiber No.</th>
              <th className="border px-4 py-2">Sex</th>
              <th className="border px-4 py-2">Email Address</th>
              <th className="border px-4 py-2">Identification</th>
              <th className="border px-4 py-2">Identification No.</th>
              <th className="border px-4 py-2">Name & Address of Employer</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Type of Device</th>
              <th className="border px-4 py-2">Total Cost (inclusive of 15% GST)</th>
              <th className="border px-4 py-2">Monthly Deduction: [as per scheme]</th>
              <th className="border px-4 py-2">Declaration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.employee_name}</td>
                <td className="border px-4 py-2">{item.sex}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">{item.fiber}</td>
                <td className="border px-4 py-2">{item.sex}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.identification}</td>
                <td className="border px-4 py-2">{item.id_number}</td>
                <td className="border px-4 py-2">{item.name_address}</td>
                <td className="border px-4 py-2">{item.designation}</td>
                <td className="border px-4 py-2">{item.device}</td>
                <td className="border px-4 py-2">{item.device_cost}</td>
                <td className="border px-4 py-2">{item.deduction}</td>
                <td className="border px-4 py-2">{item.declaration ? "Yes" : "No"}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FiberAdmin;
