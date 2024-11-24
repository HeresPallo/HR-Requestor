import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';

const PhoneClaimAdmin = () => {
  // const [data, setData] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/phoneclaim');
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
    axios.get('http://localhost:5001/phoneclaim/')
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
    doc.text("ORANGE (SL) EMPLOYEE PHONE CLAIM FORM", 20, 40);

      // Add styled and underlined row data
  doc.setFontSize(12);
  const rowData = [
    { label: "Employee Name", value: item.employee_name },
    { label: "Department", value: item.department },
    { label: "Purpose of Payment", value: item.payment },
    { label: "Date of Application", value: item.date },
    { label: "Handset Benefit by Band", value: item.band },
  ];

  let yPosition = 60; // Starting Y position for row data
  rowData.forEach((row) => {
    // Print the label in bold
    doc.setFont("helvetica", "bold");
    doc.text(`${row.label}:`, 5, yPosition);

    // Print the value normally
    doc.setFont("helvetica", "normal");
    doc.text(`${row.value}`, 58, yPosition);

    // Draw underline for the value
    const textWidth = doc.getTextWidth(row.value); // Measure the text width
    doc.line(60, yPosition + 1, 60 + textWidth, yPosition + 1); // Underline

    yPosition += 10; // Move to the next row
  });


 // Set an initial Y position for the content
let currentY = 50; // Start position for content

// // Example: Loop to add rows (you might already have this)
// data.forEach((item, index) => {
//   doc.text(`Row ${index + 1}: ${item.someField}`, 20, currentY);
//   currentY += 10; // Increment Y for each row
// });

// Define constants for the signature box dimensions
const boxWidth = 60; // Width of each box
const boxHeight = 20; // Height of each box
const gap = 15; // Space between boxes

// Adjust dynamic positioning for the signature boxes
const boxYTop = currentY + 80; // Add space after the last row
const boxYBottom = boxYTop + boxHeight + 15; // Space between top and bottom rows

// Box positions
const firstBoxX = 20; // X position for the first box
const secondBoxX = firstBoxX + boxWidth + gap; // X position for the second box
const thirdBoxX = 20; // X position for the third box
const fourthBoxX = thirdBoxX + boxWidth + gap;

// Draw top row boxes
doc.rect(firstBoxX, boxYTop, boxWidth, boxHeight); // First box
doc.rect(secondBoxX, boxYTop, boxWidth, boxHeight); // Second box

// Draw bottom row boxes
doc.rect(thirdBoxX, boxYBottom, boxWidth, boxHeight); // Third box
doc.rect(fourthBoxX, boxYBottom, boxWidth, boxHeight); // Fourth box

// Add titles below the boxes
doc.setFontSize(10);
doc.text("Requestor Signature", firstBoxX + 5, boxYTop + boxHeight + 10);
doc.text("Authorized by Head of Department Signature", secondBoxX + 5, boxYTop + boxHeight + 10);
doc.text("Finance Approval", thirdBoxX + 5, boxYBottom + boxHeight + 10);
doc.text("HR Director Approval", fourthBoxX + 5, boxYBottom + boxHeight + 10);



  
    // Download the PDF
    doc.save(`${item.employee_name}_details.pdf`);
  };

 // Handle the "Complete" button click
 const handleComplete = async (id) => {
  try {
    // Send the PATCH request to mark the submission as complete
    await axios.patch(`http://localhost:5001/phoneclaim/${id}/complete`);

    // Remove the completed submission from the state (to remove it from the table)
    setSubmissions(submissions.filter(submission => submission.id !== id));
  } catch (error) {
    console.error('Error completing submission:', error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Phone Claim Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Employee Name</th>
              <th className="border text-white px-4 py-2">Department</th>
              <th className="border text-white px-4 py-2">Purpose of Payment</th>
              <th className="border text-white px-4 py-2">Application Date</th>
              <th className="border text-white px-4 py-2">Handset Benefit by Band</th>
            </tr>
          </thead>
          <tbody>
          {submissions.map(submission => (
              <tr key={submission.id} className="text-center">
                <td className="border border-black px-4 py-2">{submission.employee_name}</td>
                <td className="border border-black px-4 py-2">{submission.department}</td>
                <td className="border border-black px-4 py-2">{submission.payment}</td>
                <td className="border border-black px-4 py-2">{submission.date}</td>
                <td className="border border-black px-4 py-2">{submission.band}</td>
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

export default PhoneClaimAdmin;
