import { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import axios from 'axios';

const IDCardAdmin = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/idcard');
        const result = await response.json();
        setSubmissions(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

   // Fetch the submissions from the API
   useEffect(() => {
    axios.get('http://localhost:5001/idcard/')
      .then(response => setSubmissions(response.data))
      .catch(error => console.error('Error fetching submissions:', error));
  }, []);

  const handleExportToExcel = (selectedRow) => {
    // Prepare the data in the format you want to export
    const exportData = [
      {
      "Card Type": selectedRow.cardtype,
      "Department": selectedRow.department,
      "Employee Name": selectedRow.employee_name,
      "Employee Level": selectedRow.level,
      "Location": selectedRow.location,
      "ID Card Image": selectedRow.image,  // Assuming image path is in the data
    },
  ];
  
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
  
    // Create a new workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ID Card");
  
    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "id_card.xlsx");
  };

  // Handle the "Complete" button click
  const handleComplete = async (id) => {
    try {
      // Send the PATCH request to mark the submission as complete
      await axios.patch(`http://localhost:5001/idcard/${id}/complete`);

      // Remove the completed submission from the state (to remove it from the table)
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error completing submission:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ID Card Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Card Type</th>
              <th className="border text-white px-4 py-2">Department</th>
              <th className="border text-white px-4 py-2">Employee Name</th>
              <th className="border text-white px-4 py-2">Employee level </th>
              <th className="border text-white px-4 py-2">Location</th>
              <th className="border text-white px-4 py-2">ID Card Image</th>
              
            </tr>
          </thead>
          <tbody>
          {submissions.map(submission => (
              <tr key={submission} className="text-center">
                <td className="border border-black px-4 py-2">{submission.cardtype}</td>
                <td className="border border-black  px-4 py-2">{submission.department}</td>
                <td className="border border-black  px-4 py-2">{submission.employee_name}</td>
                <td className="border border-black  px-4 py-2">{submission.level}</td>
                <td className="border border-black  px-4 py-2">{submission.location}</td>
                <td className="border border-black  px-4 py-2">
                  <img
                    src={submission.image}
                    alt="ID Card" 
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mb-4"
        onClick={() => handleExportToExcel(submission)}>Export
      </button>
      <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mb-4"
          onClick={() => handleComplete(submission.id)}
        >
          Complete
        </button>
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
