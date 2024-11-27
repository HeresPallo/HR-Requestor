import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';


const PerDiemAdmin = () => {
  // const [data, setData] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/perdiem');
        const result = await response.json();
        setSubmissions(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    // Fetch the submissions from the API
    useEffect(() => {
      axios.get('http://localhost:5001/perdiem/')
        .then(response => setSubmissions(response.data))
        .catch(error => console.error('Error fetching submissions:', error));
    }, []);

  const handleExportToPDF = async (item) => {
    const doc = new jsPDF();

     // Add a logo at the top
  const logo = "/LOGO-Signature-Master-Right-White_RGB_EN.png"; // Replace with your logo's path
  const logoImage = await fetch(logo)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
  doc.addImage(logoImage, "PNG", 10, 10, 40, 20); // Adjust position and size

  
    // Set title
    doc.setFontSize(16);
    doc.text("PER DIEM / TRAVEL ADVANCE FORM", 20, 40);
  
 // Helper function to add content to the PDF
 const addContent = (doc, content, yPosition) => {
    content.forEach((data) => {
      doc.text(`${data.label}: ${data.value}`, 10, yPosition);
      yPosition += 10; // Adjust spacing between lines
    });
    return yPosition;
  };

  // Page 1 content
  const page1Content = [
    { label: "Employee Name", value: item.employee_name },
    { label: "Department", value: item.department },
    { label: "Departure Date", value: item.depart_date },
    { label: "Return Date", value: item.return_date },
    { label: "Purpose of Trip", value: item.purpose },
    { label: "Employee Level", value: item.level },
    { label: "Total Days", value: item.total_days },
    { label: "Total Amount", value: item.amount_total },
  ];

  // Page 2 content
  const page2Content = [
    { label: "Filing Date", value: item.filing_date },
    { label: "Travel Names", value: item.travel_names },
    { label: "Purpose Two", value: item.purpose_two },
    { label: "Mode", value: item.mode },
    { label: "Route From", value: item.route_from },
    { label: "Estimated Departure", value: item.est_depart },
    { label: "Route Via", value: item.route_via },
    { label: "Destination", value: item.destination },
    { label: "Estimated Arrival", value: item.est_arrival },
    { label: "Mobile", value: item.mobile },
    { label: "Return Names", value: item.return_names },
    { label: "Estimated Departure 2", value: item.est_depart2 },
    { label: "Estimated Arrival 2", value: item.est_arrival2 },
    { label: "Sign Date", value: item.sign_date },

  ];

  // Add first page
  let yPosition = 50; // Start position on page 1
  yPosition = addContent(doc, page1Content, yPosition);

  // Add second page
  doc.addPage(); // Create a new page
  yPosition = 50; // Reset Y position for the new page
  addContent(doc, page2Content, yPosition);

   // Add a logo at the top
   const logo2 = "/LOGO-Signature-Master-Right-White_RGB_EN.png"; // Replace with your logo's path
   const logoImage2 = await fetch(logo2)
     .then((res) => res.blob())
     .then((blob) => URL.createObjectURL(blob));
   doc.addImage(logoImage2, "PNG", 10, 10, 40, 20); // Adjust position and size
 
    // Set title
    doc.setFontSize(16);
    doc.text("PER DIEM / TRAVEL ADVANCE FORM", 20, 40);
  
    // Download the PDF
    doc.save(`${item.employee_name}_details.pdf`);
  };

    // Handle the "Complete" button click
    const handleComplete = async (id) => {
      try {
        // Send the PATCH request to mark the submission as complete
        await axios.patch(`http://localhost:5001/perdiem/${id}/complete`);
  
        // Remove the completed submission from the state (to remove it from the table)
        setSubmissions(submissions.filter(submission => submission.id !== id));
        
      } catch (error) {
        console.error('Error completing submission:', error);
      }
    };

    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perdiem Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto bg-white w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Employee Name</th>
              <th className="border text-white px-4 py-2">Department</th>
              <th className="border text-white px-4 py-2">Departure Date</th>
              <th className="border text-white px-4 py-2">Return Date</th>
              <th className="border text-white px-4 py-2">Purpose of Trip</th>
              <th className="border text-white px-4 py-2">Employee Level</th>
              <th className="border text-white px-4 py-2">Date of Filing</th>
              <th className="border text-white px-4 py-2">Name(s) of persons travelling</th>
              <th className="border text-white px-4 py-2">Purpose of Trip 2 </th>
              <th className="border text-white px-4 py-2">Mode of Transportation</th>
              <th className="border text-white px-4 py-2">Route from</th>
              <th className="border text-white px-4 py-2">Estimated Time of Departure</th>
              <th className="border text-white px-4 py-2">Route Via</th>
              <th className="border text-white px-4 py-2">Route Destination</th>
              <th className="border text-white px-4 py-2">Estimated Time of Arrival</th>
              <th className="border text-white px-4 py-2">Contact Number</th>
              <th className="border text-white px-4 py-2">Name(s) of persons returning</th>
              <th className="border text-white px-4 py-2">Estimated Time of Departure</th>
              <th className="border text-white px-4 py-2">Estimated Time of Arrival</th>
              <th className="border text-white px-4 py-2">Date of Application</th>
              <th className="border text-white px-4 py-2">Total Days</th>
              <th className="border text-white px-4 py-2">Total Amount</th>
              <th className="border text-white px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {submissions.map(submission => (
              <tr key={submission.id} className="text-center">
                <td className="border border-black px-4 py-2">{submission.employee_name}</td>
                <td className="border border-black px-4 py-2">{submission.department}</td>
                <td className="border border-black px-4 py-2">{submission.depart_date}</td>
                <td className="border border-black px-4 py-2">{submission.return_date}</td>
                <td className="border border-black px-4 py-2">{submission.purpose}</td>
                <td className="border border-black px-4 py-2">{submission.level}</td>
                <td className="border border-black px-4 py-2">{submission.filing_date}</td>
                <td className="border border-black px-4 py-2">{submission.travel_names}</td>
                <td className="border border-black px-4 py-2">{submission.purpose_two}</td>
                <td className="border border-black px-4 py-2">{submission.mode}</td>
                <td className="border border-black px-4 py-2">{submission.route_from}</td>
                <td className="border border-black px-4 py-2">{submission.est_depart}</td>
                <td className="border border-black px-4 py-2">{submission.route_via}</td>
                <td className="border border-black px-4 py-2">{submission.destination}</td>
                <td className="border border-black px-4 py-2">{submission.est_arrival}</td>
                <td className="border border-black px-4 py-2">{submission.mobile}</td>
                <td className="border border-black px-4 py-2">{submission.return_names}</td>
                <td className="border border-black px-4 py-2">{submission.est_depart2}</td>
                <td className="border border-black px-4 py-2">{submission.est_arrival2}</td>
                <td className="border border-black px-4 py-2">{submission.sign_date}</td>
                <td className="border border-black px-4 py-2">{submission.total_days}</td>
                <td className="border border-black px-4 py-2">{submission.amount_total}</td>
                <td className="border px-4 py-2">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mb-4"
        onClick={() => handleExportToPDF(submission)}
      >
        Export
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


export default PerDiemAdmin;
