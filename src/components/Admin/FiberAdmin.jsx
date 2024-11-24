import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';


const FiberAdmin = () => {
  // const [data, setData] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/fiber');
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
      axios.get('http://localhost:5001/fiber/')
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
    doc.text("ORANGE (SL) STAFF FIBER OFFER APPLICATION FORM", 20, 40);
  
    // Add styled and underlined row data
  doc.setFontSize(12);
  const rowData = [
    { label: "Employee Name", value: item.employee_name },
    { label: "Sex", value: item.sex },
    { label: "Date of Birth", value: item.date_of_birth },
    { label: "Mobile", value: item.mobile },
    { label: "Fiber", value: item.fiber },
    { label: "Email", value: item.email },
    { label: "Identification", value: item.identification },
    { label: "ID Number", value: item.id_number },
    { label: "Name & Address", value: item.name_address },
    { label: "Designation", value: item.designation },
    { label: "Device", value: item.device },
    { label: "Device Cost", value: item.device_cost },
    { label: "Deduction", value: item.deduction },
    { label: "Declaration", value: item.declaration ? "Yes" : "No" },
  ];

  let yPosition = 60; // Starting Y position for row data
  rowData.forEach((row) => {
    // Print the label in bold
    doc.setFont("helvetica", "bold");
    doc.text(`${row.label}:`, 20, yPosition);

    // Print the value normally
    doc.setFont("helvetica", "normal");
    doc.text(`${row.value}`, 60, yPosition);

    // Draw underline for the value
    const textWidth = doc.getTextWidth(row.value); // Measure the text width
    doc.line(60, yPosition + 1, 60 + textWidth, yPosition + 1); // Underline

    yPosition += 10; // Move to the next row
  });


   // Add signature section at the bottom of the page
  const pageHeight = doc.internal.pageSize.height; // A4 height
  const boxYTop = pageHeight - 80; // Top row Y position
  const boxYBottom = pageHeight - 45; // Bottom row Y position

  const boxWidth = 60; // Width of each box
  const boxHeight = 20; // Height of each box
  const gap = 15; // Space between boxes

  // Box positions
  const firstBoxX = 20; // X position for the first box
  const secondBoxX = firstBoxX + boxWidth + gap; // X position for the second box

    // Bottom row box position
    const thirdBoxX = 20; // Centered under the top row boxes

// Draw top row boxes
doc.rect(firstBoxX, boxYTop, boxWidth, boxHeight); // First box
doc.rect(secondBoxX, boxYTop, boxWidth, boxHeight); // Second box

// Draw bottom row box
doc.rect(thirdBoxX, boxYBottom, boxWidth, boxHeight); // Third box

  // Add titles below the boxes
  doc.setFontSize(10);
  doc.text("Applicant Signature", firstBoxX + 5, boxYTop + boxHeight + 10);
  doc.text("Line Manager Signature", secondBoxX + 5, boxYTop + boxHeight + 10);
  doc.text("HR Manager Signature", thirdBoxX + 5, boxYTop + boxHeight + 45);


  
    // Download the PDF
    doc.save(`${item.employee_name}_details.pdf`);
  };

    // Handle the "Complete" button click
    const handleComplete = async (id) => {
      try {
        // Send the PATCH request to mark the submission as complete
        await axios.patch(`http://localhost:5001/fiber/${id}/complete`);
  
        // Remove the completed submission from the state (to remove it from the table)
        setSubmissions(submissions.filter(submission => submission.id !== id));
      } catch (error) {
        console.error('Error completing submission:', error);
      }
    };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fiber Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Employee Name</th>
              <th className="border text-white px-4 py-2">Residential Address</th>
              <th className="border text-white px-4 py-2">Mobile No.</th>
              <th className="border text-white px-4 py-2">Fiber No.</th>
              <th className="border text-white px-4 py-2">Sex</th>
              <th className="border text-white px-4 py-2">Date of Birth</th>
              <th className="border text-white px-4 py-2">Email Address</th>
              <th className="border text-white px-4 py-2">Identification</th>
              <th className="border text-white px-4 py-2">Identification No.</th>
              <th className="border text-white px-4 py-2">Name & Address of Employer</th>
              <th className="border text-white px-4 py-2">Designation</th>
              <th className="border text-white px-4 py-2">Type of Device</th>
              <th className="border text-white px-4 py-2">Total Cost (inclusive of 15% GST)</th>
              <th className="border text-white px-4 py-2">Monthly Deduction: [as per scheme]</th>
              <th className="border text-white px-4 py-2">Declaration</th>
            </tr>
          </thead>
          <tbody>
          {submissions.map(submission => (
              <tr key={submission.id} className="text-center">
                <td className="border border-black px-4 py-2">{submission.employee_name}</td>
                <td className="border border-black px-4 py-2">{submission.sex}</td>
                <td className="border border-black px-4 py-2">{submission.mobile}</td>
                <td className="border border-black px-4 py-2">{submission.fiber}</td>
                <td className="border border-black px-4 py-2">{submission.sex}</td>
                <td className="border border-black px-4 py-2">{submission.date_of_birth}</td>
                <td className="border border-black px-4 py-2">{submission.email}</td>
                <td className="border border-black px-4 py-2">{submission.identification}</td>
                <td className="border border-black px-4 py-2">{submission.id_number}</td>
                <td className="border border-black px-4 py-2">{submission.name_address}</td>
                <td className="border border-black px-4 py-2">{submission.designation}</td>
                <td className="border border-black px-4 py-2">{submission.device}</td>
                <td className="border border-black px-4 py-2">{submission.device_cost}</td>
                <td className="border border-black px-4 py-2">{submission.deduction}</td>
                <td className="border border-black px-4 py-2">{submission.declaration ? "Yes" : "No"}</td>
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

export default FiberAdmin;
