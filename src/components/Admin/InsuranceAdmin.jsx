import { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import insuranceTemplate from '../../assets/insuranceTemplate';

const InsuranceAdmin = () => {
  const [submissions, setSubmissions] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5001/insurance');
  //       const result = await response.json();
  //       setSubmissions(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

    // Fetch the submissions from the API
    useEffect(() => {
      axios.get('http://localhost:5001/insurance/')
        .then(response => setSubmissions(response.data))
        .catch(error => console.error('Error fetching submissions:', error));
    }, []);

  const handleExportToPDF = async (item) => {
    try {
      // Load existing PDF template (converted to base64)
      const base64Template = insuranceTemplate;
      const existingPdfBytes = await fetch(base64Template).then((res) =>
        res.arrayBuffer()
      );

      
      // const { PDFDocument } = require("pdf-lib");
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { height } = firstPage.getSize();
     

      // Define text data to insert
      const rows = [
        { label: "Employer Name:", value: item.employer, x: 150, y: height - 150 },
      { label: "Applicant Name:", value: item.applicant, x: 250, y: height - 190 },
      { label: "Address:", value: item.address, x: 190, y: height - 230 },
      { label: "Date of Birth:", value: item.date_of_birth, x: 150, y: height - 270 },
      { label: "Sex:", value: item.sex, x: 310, y: height - 270 },
      { label: "Mobile Number:", value: item.mobile, x: 450, y: height - 270 },
      // { label: "Dependent Selected:", value: item.dependent, x: 50, y: height - 220 },
      { label: "Dependent Name:", value: item.dependent_name, x: 220, y: height - 370 },
      { label: "Dependent DOB:", value: item.d_date, x: 270, y: height - 405 },
      // { label: "Declaration:", value: item.declaration ? "I Declare" : "No Declaration", x: 50, y: height - 280 },
      ];

      // / Loop through rows and draw text at specified positions
    rows.forEach((row) => {
      firstPage.drawText(`${row.value}`, {
        x: row.x,
        y: row.y,
        size: 12,
      });
    });

     // Add a second page
     const secondPage = pdfDoc.addPage();
    //  const { width: secondPageWidth, height: secondPageHeight } = secondPage.getSize();

      // Embed an image if available
      if (item.image) {
        const imageBytes = await fetch(`http://localhost:5001/${item.image}`).then((res) =>
          res.arrayBuffer()
        );
        const image = await pdfDoc.embedJpg(imageBytes);
        secondPage.drawImage(image, { x: 100, y: 400, width: 300, height: 300 });
      }

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.applicant}_insurance_submission.pdf`;
      link.click();
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  // Handle the "Complete" button click
  const handleComplete = async (id) => {
    try {
      // Send the PATCH request to mark the submission as complete
      await axios.patch(`http://localhost:5001/insurance/${id}/complete`);

      // Remove the completed submission from the state (to remove it from the table)
      setSubmissions(submissions.filter(submission => submission.id !== id));
      
    } catch (error) {
      console.error('Error completing submission:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Insurance Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
              <th className="border text-white px-4 py-2">Employer</th>
              <th className="border text-white px-4 py-2">Applicant Name</th>
              <th className="border text-white px-4 py-2">Applicant Address</th>
              <th className="border text-white px-4 py-2">Date Of Birth</th>
              <th className="border text-white px-4 py-2">Sex</th>
              <th className="border text-white px-4 py-2">Mobile Number</th>
              <th className="border text-white px-4 py-2">Dependent Selected</th>
              <th className="border text-white px-4 py-2">Dependent Name</th>
              <th className="border text-white px-4 py-2">Dependent Date Of Birth</th>
              <th className="border text-white px-4 py-2">Declaration</th>
              
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="text-center">
                <td className="border border-black px-4 py-2">{submission.employer}</td>
                <td className="border border-black px-4 py-2">{submission.applicant}</td>
                <td className="border border-black px-4 py-2">{submission.address}</td>
                <td className="border border-black px-4 py-2">{submission.date_of_birth}</td>
                <td className="border border-black px-4 py-2">{submission.sex}</td>
                <td className="border border-black px-4 py-2">{submission.mobile}</td>
                <td className="border border-black px-4 py-2">{submission.dependent}</td>
                <td className="border border-black px-4 py-2">{submission.dependent_name}</td>
                <td className="border border-black px-4 py-2">{submission.d_date}</td>
                <td className="border border-black px-4 py-2">
                  {submission.declaration ? "I Declare" : "No Declaration"}
                </td>
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

export default InsuranceAdmin;
