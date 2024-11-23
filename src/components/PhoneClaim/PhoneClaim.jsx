import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const PhoneClaim = () => {

    const [details, setDetails] = useState("");

    const [errorMessage, setErrorMessage] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); // For success messages
    const navigate = useNavigate();


 
    const schema = z.object({
        employee_name: z.string().min(7, {message:"Type full name"}),
        department: z.union([
            z.literal('CEO’s Office'),
            z.literal('Commercial'), 
            z.literal('Customer Experience'), 
            z.literal('Finance'), 
            z.literal('Foundation'), 
            z.literal('General Secretary'), 
            z.literal('Governance, Internal Control and Audit'), 
            z.literal('Human Resource'), 
            z.literal('IT'), 
            z.literal('Networks'), 
            z.literal('Orange Money'), 
            z.literal('Procurement and Logistics'), 
            z.literal('Programs'), 
            z.literal('Strategy, Transformation and Marketing'), 
            z.literal('Wholesale and Roaming'), 
            ]),
        payment: z.string().min(3, {message:"Purpose of payment is required"}),
        date: z.string().min(3, {message:"Date is required"}),
        band: z.union([
            z.literal('Band 6 (€150) (officers / Senior Officers)'),
            z.literal('Band 5 (€300) (Managers / Asst. Managers)'), 
            z.literal('Band 4 (€400)  (Senior Managers A&B)'), 
            z.literal('Band 3 (€500)  (Directors / Deputy Directors)'), 
            z.literal('Band 2 (€600) (CEO)'), 
            ]),

    
    })


    const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(schema)});


 

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log('Form submitted:', formData); 
    // Append form data to FormData object
    const data = new FormData();
    data.append('employee_name', formData.employee_name);
    data.append('department', formData.department);
    data.append('payment', formData.payment);
    data.append('date', formData.date);
    data.append('band', formData.band);

    try {
      const response = await axios.post('http://localhost:5001/phoneclaim', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);
      setSuccessMessage('Phone Claim submitted successfully!'); // Set success message
      setErrorMessage(null); // Clear any previous error
  //  Redirect to homepage after a short delay
   setTimeout(() => {
    navigate('/');// Redirect to home page
  }, 1500); // 3 seconds delay
} catch (error) {
  console.error('Error submitting form:', error);
  if (error.response && error.response.data && error.response.data.error) {
    setErrorMessage(error.response.data.error); // Set error message from backend
  } else {
    setErrorMessage('An unexpected error occurred. Please try again later.');
  }
}
};



  return (

    <div className="max-w-2xl w-full mb-8 mx-auto text-center">
    <h2 className="text-black text-4xl font-extrabold">Phone Claim Form</h2>
    <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
    <section className="py-10 my-auto dark:bg-surface-dark">
    <div className="lg:w-[100%] md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[100%] md:w-[90%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-white">
           
            <div className="">
                
                <form 
                value={details}
                onChange={e => setDetails(e.target.value)}
                onSubmit={handleSubmit(onSubmit)}>
                   
                   
                        <div>
                       
                        </div>
                     {/* Employee name */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="employee_name" className="mb-2 dark:text-black">Employee Name:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("employee_name")}
                                    />
                                    {errors.employee_name &&<em className="text-red-500">
                                    {errors.employee_name.message}</em>}
                                    {errors.employee_name?.type === "minLength" &&<em className="text-red-500">
                                        Type full name</em>}
                        </div>
                        {/* Department*/}
                        <div className="w-full  mb-4 mt-6">
                        <label htmlFor="department" className="dark:text-black mb-2"> Department:</label>
                            <select
                            {...register("department")}
                            onChange={(e) => console.log(e.target.value)}
                                    className="w-full mt-2 text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Department</option>
                                    <option value="CEO's Office">CEO's Office</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Customer Experience">Customer Experience</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Foundation">Foundation</option>
                                    <option value="General Secretary">General Secretary</option>
                                    <option value="Governance, Internal Control and Audit">Governance, Internal Control and Audit</option>
                                    <option value="Human Resource">Human Resource</option>
                                    <option value="IT">IT</option>
                                    <option value="Networks">Networks</option>
                                    <option value="Orange Money">Orange Money</option>
                                    <option value="Procurement & Logistics">Procurement & Logistics</option>
                                    <option value="Programs">Programs</option>
                                    <option value="Strategy, Transformation and Marketing">Strategy, Transformation and Marketing</option>
                                    <option value="Wholesale and Roaming">Wholesale and Roaming</option>
                                </select>
                             
                        </div>
    
                    </div>   
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    
                        {/* Purpose of Payment */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="payment" className="mb-2 dark:text-black">Purpose of Payment:</label>
                            <input type="payment"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type purpose Here"
                                        {...register("payment")}
                                    />
                                    {errors.payment &&<em className="text-red-500">
                                    {errors.payment.message}</em>}
                                    {errors.payment?.type === "minLength" &&<em className="text-red-500">
                                        Purpose is required</em>}
                        </div>
                        
                    </div>
                       {/* Date  */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full mb-4 mt-6">
                            <label htmlFor="date" className="dark:text-black mb-2">Date Of Application</label>
                            <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black bg-white"  type="date"
                                   id="date"  {...register("date")}/>
                        </div>
                    </div>
                    
                    {/* Handset Benefit by Band */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full mb-4 mt-6">
                        <label htmlFor="band" className="dark:text-black mb-2">Handset Benefit by Band - please select:</label>
                            <select
                            {...register("band")}
                                    className="w-full text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Band</option>
                                    <option value="Band 6 (€150) (officers / Senior Officers)">Band 6 (€150) (officers / Senior Officers) </option>
                                    <option value="Band 5 (€300) (Managers / Asst. Managers)">Band 5 (€300) (Managers / Asst. Managers)</option>
                                    <option value="Band 4 (€400)  (Senior Managers A&B)">Band 4 (€400)  (Senior Managers A&B)</option>
                                    <option value="Band 3 (€500)  (Directors / Deputy Directors)">Band 3 (€500)  (Directors / Deputy Directors)</option>
                                    <option value="Band 2 (€600) (CEO)">Band 2 (€600) (CEO)</option>
                                </select>
                              
                        </div>
                          
                        
                    </div>
                  
                    <div className="w-full rounded-lg bg-orange-500 mt-4 text-white text-lg font-semibold">
                        <button type="submit" className="w-full p-4">Submit</button>
                    </div>
                </form>
                 {/* Display error message if it exists */}
      {errorMessage && (
        <div className="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}
         {/* Display success message if exists */}
         {successMessage && (
        <div className="success-message" style={{ color: 'green' }}>
          {successMessage}
        </div>
      )}
            </div>
        </div>
    </div>
</section>
</div>
  )
}

export default PhoneClaim;
