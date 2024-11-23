import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const FiberForm = () => {

    const [details, setDetails] = useState("");

    const [errorMessage, setErrorMessage] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); // For success messages
    const navigate = useNavigate();


    const schema = z.object({
        employee_name: z.string().min(7, {message:"Type full name"}),
        office_address: z.string().min(7,{message:"Address requires a minimum of 3 letters"}),
        mobile: z.number().gte(9, {message:"Mobile number should start with 0"}),
        fiber: z.number().gte(9, {message:"Fiber number should start with 0"}),
        sex: z.union([z.literal('Male'), z.literal('Female')]),
        email: z.string().email({ message: "Invalid email address" }),
        identification: z.union([z.literal('Drivers License'), z.literal('Passport'), z.literal('National ID')]),
        id_number: z.number().gte(9, {message:"ID number is required"}),
        name_address: z.string().min(3, {message:"Employer Information requires a minimum of 3 letters"}),
        designation: z.string().min(3, {message:"Designation requires a minimum of 3 letters"}),
        device: z.string().min(3, {message:"Device type is required"}),
        device_cost: z.string().min(3, {message:"Device cost is required"}),
        deduction: z.string().min(3, {message:"Deduction is required"}),
        declaration: z.literal(true,{
            errorMap: () => ({ message: "You must select and accept Declaration." }),
        }),
       
    
    })


    const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(schema)});


 

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log('Form submitted:', formData); 
    // Append form data to FormData object
    const data = new FormData();
    data.append('employee_name', formData.employee_name);
    data.append('office_address', formData.office_address);
    data.append('mobile', formData.mobile);
    data.append('fiber', formData.fiber);
    data.append('sex', formData.sex);
    data.append('identification', formData.identification);
    data.append('id_number', formData.id_number);
    data.append('name_address', formData.name_address);
    data.append('designation', formData.designation);
    data.append('device', formData.device);
    data.append('device_cost', formData.device_cost);
    data.append('deduction', formData.deduction);
    data.append('declaration', formData.declaration);
    data.append('email', formData.email);

    try {
      const response = await axios.post('http://localhost:5001/fiber', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);
      setSuccessMessage('Fiber Form submitted successfully!'); // Set success message
      setErrorMessage(null); // Clear any previous error
   // Redirect to homepage after a short delay
   setTimeout(() => {
    navigate('/');
  }, 1500); 
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
    <h2 className="text-black text-4xl font-extrabold">Fiber Submission</h2>
    <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
    <section className="py-10 my-auto dark:bg-surface-dark">
    <div className="lg:w-[100%] md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[100%] md:w-[90%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-white">
           
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Personal Details
                </h1>
                <form 
                value={details}
                onChange={e => setDetails(e.target.value)}
                onSubmit={handleSubmit(onSubmit)}>
                   
                   
                        <div>
                       
                        </div>
                     {/* Employee name */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="employee_name" className="mb-2 dark:text-black">Applicants Name:</label>
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
                        {/* Sex*/}
                        <div className="w-full  mb-4 mt-6">
                        <label htmlFor="sex" className="dark:text-black mb-2">Select Sex here:</label>
                            <select
                            {...register("sex")}
                            onChange={(e) => console.log(e.target.value)}
                                    className="w-full mt-2 text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                             
                        </div>
    
                    </div>   
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    
                        {/* Email Address */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="email" className="mb-2 dark:text-black">Email Address:</label>
                            <input type="email"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type email Here"
                                        {...register("email")}
                                    />
                                    {errors.email &&<em className="text-red-500">
                                    {errors.email.message}</em>}
                                    {errors.email?.type === "minLength" &&<em className="text-red-500">
                                        Email is required</em>}
                        </div>
                        {/* Office/Business Address */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="office_address" className="mb-2 dark:text-black">Residential Address:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter your office or business address here"
                                    {...register("office_address")}
                                    />
                                     {errors.office_address &&<em className="text-red-500">
                                    {errors.office_address.message}</em>}
                                    {errors.office_address?.type === "minLength" &&<em className="text-red-500">
                                        Address should be 7 or more characters</em>}
                        </div>
                    </div>
                      {/* Mobile Number */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="mobile" className="mb-2 dark:text-black">Mobile No.:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Phone number starting with 0"
                                    {...register("mobile", {valueAsNumber: true})}
                                    />
                                      {errors.mobile &&<em className="text-red-500">
                                    {errors.mobile.message}</em>}
                                    {errors.mobile?.type === "minLength" &&<em className="text-red-500">
                                        Mobile Number should be 9 characters</em>}
                        </div>
                         {/* Fiber Number */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="fiber" className="mb-2 dark:text-black">Fiber No.:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter Fiber number here"
                                    {...register("fiber", {valueAsNumber: true})}
                                    />
                                      {errors.fiber &&<em className="text-red-500">
                                    {errors.fiber.message}</em>}
                                    {errors.fiber?.type === "minLength" &&<em className="text-red-500">
                                        Fiber Number should be 9 characters</em>}
                        </div>
                    </div>
                    
                    {/* Identification */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                        <label htmlFor="identification" className="dark:text-black mb-2">Identification:</label>
                            <select
                            {...register("identification")}
                                    className="w-full text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Identification</option>
                                    <option value="Drivers License">Drivers License</option>
                                    <option value="National ID">National ID</option>
                                    <option value="Passport">Passport</option>
                                </select>
                              
                        </div>
                          {/* Identification Number */}
                          <div className="w-full  mb-4 ">
                            <label htmlFor="id_number" className="mb-2 dark:text-black">Identification No.:</label>
                            <input type="text"
                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter Identification number here"
                                    {...register("id_number", {valueAsNumber: true})}
                                    />
                                      {errors.id_number &&<em className="text-red-500">
                                    {errors.id_number.message}</em>}
                                    {errors.id_number?.type === "minLength" &&<em className="text-red-500">
                                        ID Number is required</em>}
                        </div>
                        
                    </div>
                    <h1
                    className=" mt-4 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Work Details
                </h1>
                 {/* Name & Address of Employer */}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="name_address" className="mb-2 dark:text-black">Name & Address of Employer:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("name_address")}
                                    />
                                    {errors.name_address &&<em className="text-red-500">
                                    {errors.name_address.message}</em>}
                                    {errors.name_address?.type === "minLength" &&<em className="text-red-500">
                                        Type full name</em>}
                        </div>
                        {/* Designation*/}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="designation" className="mb-2 dark:text-black">Designation:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("designation")}
                                    />
                                    {errors.designation &&<em className="text-red-500">
                                    {errors.designation.message}</em>}
                                    {errors.designation?.type === "minLength" &&<em className="text-red-500">
                                        Designation is required</em>}
                        </div>
    
                    </div>   
                    <h1
                    className=" mt-4 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Purchase Details
                </h1>
                 {/* Type of Device */}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="device" className="mb-2 dark:text-black">Type of Device:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type of Device"
                                        {...register("device")}
                                    />
                                    {errors.device &&<em className="text-red-500">
                                    {errors.device.message}</em>}
                                    {errors.device?.type === "minLength" &&<em className="text-red-500">
                                        Device type is required</em>}
                        </div>
                        {/* Total Cost of Device or Service (inclusive of 15% GST):*/}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="device_cost" className="mb-2 dark:text-black">Total Cost (inclusive of 15% GST):</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="SLE"
                                        {...register("device_cost")}
                                    />
                                    {errors.device_cost &&<em className="text-red-500">
                                    {errors.device_cost.message}</em>}
                                    {errors.device_cost?.type === "minLength" &&<em className="text-red-500">
                                        Total Cost is required</em>}
                        </div>
    
                    </div>   
                    {/* Monthly Deduction: [as per scheme]:*/}
                    <div className="w-full  mb-4 mt-6">
                            <label htmlFor="deduction" className="mb-2 dark:text-black">Monthly Deduction: [as per scheme]:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="SLE"
                                        {...register("deduction")}
                                    />
                                    {errors.deduction &&<em className="text-red-500">
                                    {errors.deduction.message}</em>}
                                    {errors.deduction?.type === "minLength" &&<em className="text-red-500">
                                        Deduction is required</em>}
                        </div>
                         {/* Declaration:*/}
                         <div className="w-full  mb-4 mt-6">
                        
<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full mt-6 mb-6">
    <div className="flex items-center h-5 mt-8 mb-8">
    <input htmlFor="declaration" id="declaration" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             {...register("declaration")}
        />
          {errors.declaration &&<em className="text-red-500">
            {errors.declaration.message}</em>}
    <div className="ms-2 text-sm mt-6 mb-6">
        <label htmlFor="helper-checkbox" className="font-medium text-orange-500">DECLARATION</label>
        
        <p id="helper-checkbox-text" className="text-xs font-normal text-black">
        I hereby confirm that I am applying for the Orange Fiber Power offer and certify that all the information provided by me above are true. I hereby authorize Orange SL to obtain verification of the information provided.
        </p>
    </div>
      
       
                                   
   
   
    </div>
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

export default FiberForm;
