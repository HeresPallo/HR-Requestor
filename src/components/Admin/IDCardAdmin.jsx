import { useEffect, useState } from 'react';

const IDCardAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/idcard');
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
      <h1 className="text-2xl font-bold mb-4">ID Card Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Card Type</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Employee level </th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">ID Card Image</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.cardtype}</td>
                <td className="border px-4 py-2">{item.department}</td>
                <td className="border px-4 py-2">{item.employee_name}</td>
                <td className="border px-4 py-2">{item.level}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">
                  <img
                    src={item.image}
                    alt={`${item.name}'s ID Card`}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IDCardAdmin;
