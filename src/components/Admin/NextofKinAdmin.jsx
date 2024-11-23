import { useEffect, useState } from 'react';

const NextofKinAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/nextofkin');
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
      <h1 className="text-2xl font-bold mb-4">Next of Kin Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Employee Number</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Relationship</th>
              <th className="border px-4 py-2">Date of Birth</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.employee_number}</td>
                <td className="border px-4 py-2">{item.nok_type}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.relationship}</td>
                <td className="border px-4 py-2">{new Date(item.date_of_birth).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{item.phone_number}</td>
                <td className="border px-4 py-2">
                  <img
                    src={item.image_path}
                    alt={`${item.name}'s NOK`}
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

export default NextofKinAdmin;
