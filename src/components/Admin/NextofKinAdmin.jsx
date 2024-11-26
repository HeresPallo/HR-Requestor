import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';

const NextofKinAdmin = () => {
  
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/nextofkin');
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
    axios.get('http://localhost:5001/nextofkin/')
      .then(response => setSubmissions(response.data))
      .catch(error => console.error('Error fetching submissions:', error));
  }, []);

  const handleExportToPDF = async (item) => {
    console.log("Exporting PDF for:", item);
    const doc = new jsPDF();

       // Add a logo at the top
  const logo = "/LOGO-Signature-Master-Right-White_RGB_EN.png"; // Replace with your logo's path
  const logoImage = await fetch(logo)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
  doc.addImage(logoImage, "PNG", 10, 10, 40, 20); // Adjust position and size


    doc.setFontSize(16);
    doc.text("Next of Kin Submission", 105, 20, { align: "center" }); // Center title
  
    
    // Add styled and underlined row data
  doc.setFontSize(12);
  const rowData = [
    { label: "Employee Name", value: item.employee_name },
    { label: "Employee Number", value: item.employee_number },
    { label: "Type", value: item.nok_type },
    { label: "Next of Kin Name", value: item.name },
    { label: "Address", value: item.address },
    { label: "Relationship", value: item.relationship },
    { label: "Date of Birth", value: item.date_of_birth },
    { label: "Phone", value: item.phone_number },
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

   // Set an initial Y position for the content
 let currentY = 150; // Start position for content

 // Define constants for the signature box dimensions
 const boxWidth = 60; // Width of each box
 const boxHeight = 20; // Height of each box
 const gap = 15; // Space between boxes
 
 // Adjust dynamic positioning for the signature boxes
 const boxYTop = currentY + 80; // Add space after the last row
 
 // Box positions
 const firstBoxX = 20; // X position for the first box
 const secondBoxX = firstBoxX + boxWidth + gap; // X position for the second box
 
 
 // Draw top row boxes
 doc.rect(firstBoxX, boxYTop, boxWidth, boxHeight); // First box
 doc.rect(secondBoxX, boxYTop, boxWidth, boxHeight); // Second box
 
 
 // Add titles below the boxes
 doc.setFontSize(10);
 doc.text("Employee Signature", firstBoxX + 5, boxYTop + boxHeight + 10);
 doc.text("Date", secondBoxX + 5, boxYTop + boxHeight + 10);
 
  
   // Add Image
  if (item.image_path) {
    const imageUrl = `http://localhost:5001/${item.image_path}`; // Prepend the base URL
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const fileExtension = imageUrl.split('.').pop().toLowerCase();
      const imageType = fileExtension === 'png' ? 'PNG' : 'JPEG';

      doc.addImage(image, imageType, 20, yPosition, 50, 50); // Add image below details
      yPosition += 60; // Space for the image
      doc.save(`${item.employee_name}_nextofkin_submission.pdf`); // Save the PDF
    };

    image.onerror = () => {
      console.error("Error loading image:", imageUrl);
      doc.text("Image not available.", 20, yPosition);
      doc.save(`${item.employee_name}_nextofkin_submission.pdf`);
    };
  } else {
    doc.text("Image not available.", 20, yPosition);
    doc.save(`${item.employee_name}_nextofkin_submission.pdf`);
  }
  };


  // Handle the "Complete" button click
  const handleComplete = async (id) => {
    try {
      // Send the PATCH request to mark the submission as complete
      await axios.patch(`http://localhost:5001/nextofkin/${id}/complete`);

      // Remove the completed submission from the state (to remove it from the table)
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error completing submission:', error);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Next of Kin Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto bg-white w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Employee Number</th>
              <th className="border text-white px-4 py-2">Type</th>
              <th className="border text-white px-4 py-2">Name</th>
              <th className="border text-white px-4 py-2">Address</th>
              <th className="border text-white px-4 py-2">Relationship</th>
              <th className="border text-white px-4 py-2">Date of Birth</th>
              <th className="border text-white px-4 py-2">Phone</th>
              <th className="border text-white px-4 py-2">Image</th>
              <th className="border text-white px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          
          {submissions.map(submission => (
              <tr key={submission.id} className="text-center">
                <td className="border border-black px-4 py-2">{submission.employee_number}</td>
                <td className="border border-black px-4 py-2">{submission.nok_type}</td>
                <td className="border border-black px-4 py-2">{submission.name}</td>
                <td className="border border-black px-4 py-2">{submission.address}</td>
                <td className="border border-black px-4 py-2">{submission.relationship}</td>
                <td className="border border-black px-4 py-2">{new Date(submission.date_of_birth).toLocaleDateString()}</td>
                <td className="border border-black px-4 py-2">{submission.phone_number}</td>
                <td className="border border-black px-4 py-2">
                  <img
                    src={submission.image_path}
                    alt={`${submission.name}'s NOK`}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">
                
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mb-4"
        onClick={() => handleExportToPDF(submission)}
      >
        Export
      </button>
      <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
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

export default NextofKinAdmin;
