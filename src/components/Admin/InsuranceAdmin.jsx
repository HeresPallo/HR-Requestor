import { useEffect, useState } from 'react';

const InsuranceAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/insurance');
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
      <h1 className="text-2xl font-bold mb-4">Insurance Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Employer</th>
              <th className="border px-4 py-2">Applicant Name</th>
              <th className="border px-4 py-2">Applicant Address</th>
              <th className="border px-4 py-2">Date Of Birth</th>
              <th className="border px-4 py-2">Sex</th>
              <th className="border px-4 py-2">Mobile Number</th>
              <th className="border px-4 py-2">Dependent Selected</th>
              <th className="border px-4 py-2">Dependent Date Of Birth</th>
              <th className="border px-4 py-2">Dependent Image</th>
              <th className="border px-4 py-2">Declaration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.employer}</td>
                <td className="border px-4 py-2">{item.applicant}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.date_of_birth}</td>
                <td className="border px-4 py-2">{item.sex}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">{item.dependent}</td>
                <td className="border px-4 py-2">{item.d_date}</td>
                <td className="border px-4 py-2">
                  <img
                    src={item.image}
                    alt={`${item.name}'s Insurance`}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{item.declaration ? "Yes" : "No"}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceAdmin;
