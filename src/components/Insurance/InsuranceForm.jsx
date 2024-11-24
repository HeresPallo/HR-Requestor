import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const InsuranceForm = () => {

    const [details, setDetails] = useState("");

    const [image, setImage] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); // For success messages
    const navigate = useNavigate();



    const schema = z.object({
  employer: z.string().min(1, { message: "Employer is required" }),
  applicant: z.string().min(1, { message: "Applicant name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  date_of_birth: z.string().min(1, { message: "Date is required" }),
  sex: z.enum(["Male", "Female"], { message: "Sex must be either 'Male' or 'Female'" }),
  mobile: z.number().gte(9, {message:"Mobile number should start with 0"}),
  dependent: z.union([z.literal('Spouse'), z.literal('Dependent')]),
  dependent_name: z.string().min(7, {message:"Type full name"}),
  d_date: z.string().min(1, { message: "Dependent date is required" }),
  declaration: z.literal(true,{
    errorMap: () => ({ message: "You must select and accept Declaration." }),
}),
//   Ensure the images are file objects
//   image: z.instanceof(File, { message: "Image is required" }),
//   image_two: z.optional(z.instanceof(File)),
//   image_three: z.optional(z.instanceof(File)),
//   image_four: z.optional(z.instanceof(File)),
    
    })


    const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(schema)});

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Capture the selected image file
        
      };


 

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log('Form submitted:', formData); 
    // Append form data to FormData object
    const data = new FormData();
    data.append('employer', formData.employer);
    data.append('applicant', formData.applicant);
    data.append('address', formData.address);
    data.append('date_of_birth', formData.date_of_birth);
    data.append('sex', formData.sex);
    data.append('mobile', formData.mobile);
    data.append('dependent', formData.dependent);
    data.append('dependent_name', formData.dependent_name);
    data.append('d_date', formData.d_date);
    data.append('declaration', formData.declaration);
    if (image) {
        data.append('image', image);
      }
     
      // Use this to log each key-value pair in FormData
for (let [key, value] of data.entries()) {
    console.log(key, value);
  }
    try {
      const response = await axios.post('http://localhost:5001/insurance/', data, {
        headers: { 'Content-Type': 'multipart/form-data', },
      });
      console.log('Response:', response.data);
      setSuccessMessage('Insurance Form submitted successfully!'); // Set success message
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
    <h2 className="text-black text-4xl font-extrabold">Medical Insurance Form</h2>
    <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
    <section className="py-10 my-auto dark:bg-surface-dark">
    <div className="lg:w-[100%] md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[100%] md:w-[90%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-white">
           
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Membership Form
                </h1>
                <form 
                value={details}
                onChange={e => setDetails(e.target.value)}
                onSubmit={handleSubmit(onSubmit)}>
                   
                   
                        <div>
                       
                        </div>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                         {/* Employer */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="employer" className="mb-2 dark:text-black">Employer:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("employer")}
                                    />
                                    {errors.employer &&<em className="text-red-500">
                                    {errors.employer.message}</em>}
                                    {errors.employer?.type === "minLength" &&<em className="text-red-500">
                                        Type Employer name</em>}
                        </div>
                          {/* Applicant Name */}
                          <div className="w-full  mb-4 mt-6">
                            <label htmlFor="applicant" className="mb-2 dark:text-black">Applicant Name:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("applicant")}
                                    />
                                    {errors.applicant &&<em className="text-red-500">
                                    {errors.applicant.message}</em>}
                                    {errors.applicant?.type === "minLength" &&<em className="text-red-500">
                                        Applicant name required</em>}
                        </div>
    
                    </div>   
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                          {/* Applicant Address */}
                          <div className="w-full  mb-4 mt-6">
                            <label htmlFor="address" className="mb-2 dark:text-black">Applicant Address:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter your address here"
                                    {...register("address")}
                                    />
                                     {errors.address &&<em className="text-red-500">
                                    {errors.address.message}</em>}
                                    {errors.address?.type === "minLength" &&<em className="text-red-500">
                                        Address should be 7 or more characters</em>}
                        </div>
                          {/* Date Of Birth */}
                          <div className="w-full mb-4 mt-6">
                            <label htmlFor="date_of_birth" className="dark:text-black mb-2">Date Of Birth</label>
                            <input className=" mt-2 text-grey p-4 w-full border-2 border-black rounded-lg dark:text-black bg-white"   type="date"
                                   id="date_of_birth"  {...register("date_of_birth")}/>
                        </div>
                    </div>
                     
                    
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
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
                          {/* Mobile Number */}
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
                    </div>
                    {/* Work Details */}
                    <h1
                    className=" mt-4 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Dependents Details
                </h1>
                <p
                    className=" mt-4 font-normal font-serif mb-2 dark:text-black">
                    Note: Only 1 Spouse and not more than 4 dependants under the age of 18 years should be included in the plan.
                </p>
                {/* Dependent Block*/}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                       {/* Select Dependent*/}
                       <div className="w-full  mb-4 mt-6">
                        <label htmlFor="dependent" className="dark:text-black mb-2">Select Dependent here:</label>
                            <select
                            {...register("dependent")}
                            onChange={(e) => console.log(e.target.value)}
                                    className="w-full mt-2 text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Dependent</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Dependent">Dependent</option>
                                </select>
                             
                        </div>
                         {/* Dependent Date Of Birth */}
                         <div className="w-full mb-4 mt-6">
                            <label htmlFor="d_date" className="dark:text-black mb-2">Dependent Date Of Birth</label>
                            <input className=" mt-2 text-grey p-4 w-full border-2 border-black rounded-lg dark:text-black bg-white"   type="date"
                                   id="d_date"  {...register("d_date")}/>
                        </div>
                        </div>   
                         {/* Dependent Name */}
                         <div className="w-full  mb-4 mt-6">
                            <label htmlFor="dependent_name" className="mb-2 dark:text-black">Dependent Name:</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Full name here"
                                        {...register("dependent_name")}
                                    />
                                    {errors.dependent_name &&<em className="text-red-500">
                                    {errors.dependent_name.message}</em>}
                                    {errors.dependent_name?.type === "minLength" &&<em className="text-red-500">
                                        Type Dependents name</em>}
                        </div>
                        {/* Dependent Image Upload */}
                        <div className="w-full  mb-4 mt-6 justify-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="image">Upload Dependent Image</label>
                        <input 
                        className=" flex w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-white focus:outline-none dark:bg-black dark:placeholder-white" 
                        id="image" 
                        type="file"
                        onChange={handleImageChange}                

                        />
                        </div>

                         
                   
                         {/* Declaration:*/}
                         <div className="w-full  mb-4 mt-6">
                        
<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 w-full justify-center">
    <div className="flex items-center h-5 mt-8 mb-8">
    <input htmlFor="declaration" id="declaration" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             {...register("declaration")}
        />
          {errors.declaration &&<em className="text-red-500">
            {errors.declaration.message}</em>}
    <div className="ms-2 text-sm mt-6 mb-6 ">
        <label htmlFor="helper-checkbox" className="font-medium text-orange-500">DECLARATION</label>
        
        <p id="helper-checkbox-text" className="text-xs font-normal text-black">
        I declare that all information provided is true, accurate and correct.
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

export default InsuranceForm;
