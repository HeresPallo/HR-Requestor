import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const NOKForm = () => {
  const form = useRef();

    const [details, setDetails] = useState("");

    const [picture, setPicture] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); // For success messages
    const navigate = useNavigate();

    const user = "/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg";

    const schema = z.object({
        number: z.string().min(7, {message:"ID requires a minimum of 7 numbers"}),
        name: z.string().min(3, {message:"Name requires a minimum of 3 letters"}),
        address: z.string().min(7,{message:"Address requires a minimum of 3 letters"}),
        contact: z.number().gte(9, {message:"Phone number should start with 0"}),
        date: z.string().min(3, {message:"date requires a minimum of 3 letters"}),
        nok_type: z.union([z.literal('Primary'), z.literal('Secondary')]),
        relationship: z.union([z.literal('Spouse'), z.literal('Child'),z.literal('Parent'),z.literal('Sibling'),z.literal('Other')]),
    
    })


    const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(schema)});


      // Handle image change
  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log('Form submitted:', formData); 
    // Append form data to FormData object
    const data = new FormData();
    data.append('employee_number', formData.number);
    data.append('nok_type', formData.nok_type);
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('relationship', formData.relationship);
    data.append('date_of_birth', formData.date);
    data.append('phone_number', formData.contact);
    if (picture) data.append('image', picture);

    try {
      const response = await axios.post('http://localhost:5001/nextofkin', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      setSuccessMessage('Next of Kin information submitted successfully!'); // Set success message
      setErrorMessage(null); // Clear any previous error

      emailjs
      .sendForm('service_5jyk8f5', 'template_3q2razj', form.current, {
        publicKey: 'JWh12OzIRvSrjKy7t',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
   // Redirect to homepage after a short delay
   setTimeout(() => {
    navigate('/');// Redirect to home page
  }, 3000); // 3 seconds delay
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

    <div className="max-w-2xl mb-8 mx-auto text-center">
    <h2 className="text-black text-4xl font-extrabold">Next of Kin Submission</h2>
      {/* Display success message if exists */}
      {successMessage && (
        <div className="success-message" style={{ color: 'green' }}>
          {successMessage}
        </div>
      )}
    <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
    <section className="py-10 my-auto dark:bg-surface-dark">
    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-white">
           
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Upload Picture Below
                </h1>
                <form 
                ref={form}
                value={details}
                onChange={e => setDetails(e.target.value)}
                onSubmit={handleSubmit(onSubmit)}>
                   
                    <div
                        className=" flex-col w-full h-full justify-center rounded-md mb-4">
                        <div className="mx-auto flex-col items-center w-[141px] h-[141px]">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                         <img className="inline-block py-2.5 mb-5 rounded-md"  src={
                                picture
                                    ? URL.createObjectURL(picture)
                                    : user
                            } alt="" />
                            </div>
                            <label htmlFor='image' className='grid text-xs'>
                
                    </label>
                        <input className="w-32 mt-4 text-white text-lg font-semibold" type="file" onChange={handleImageChange} id="image"/>
                        
                        </div>
                        <div>
                       
                        </div>
                     {/* Employee number */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="number" className="mb-2 dark:text-black">Employee Number</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type ID Number Here"
                                        {...register("number")}
                                    />
                                    {errors.number &&<em className="text-red-500">
                                    {errors.number.message}</em>}
                                    {errors.number?.type === "minLength" &&<em className="text-red-500">
                                        ID requires a minimum of 7 numbers</em>}
                        </div>
                        {/* Type*/}
                        <div className="w-full  mb-4 mt-6">
                        <label htmlFor="nok_type" className="dark:text-black mb-2">Select Type here</label>
                            <select
                            {...register("nok_type")}
                            onChange={(e) => console.log(e.target.value)}
                                    className="w-full mt-2 text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Next of Kin Type</option>
                                    <option value="Primary">Primary</option>
                                    <option value="Secondary">Secondary</option>
                                    
                                </select>
                             
                        </div>
    
                    </div>   
                   {/* Employee number */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    
                        {/* Full Name */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="name" className="mb-2 dark:text-black">Full Name</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type Name Here"
                                        {...register("name")}
                                    />
                                    {errors.name &&<em className="text-red-500">
                                    {errors.name.message}</em>}
                                    {errors.name?.type === "minLength" &&<em className="text-red-500">
                                        Name should be 3 or more characters</em>}
                        </div>
                        {/* Address */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="address" className="mb-2 dark:text-black">Address</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type Address Here"
                                    {...register("address")}
                                    />
                                     {errors.address &&<em className="text-red-500">
                                    {errors.address.message}</em>}
                                    {errors.address?.type === "minLength" &&<em className="text-red-500">
                                        Address should be 7 or more characters</em>}
                        </div>
                    </div>
                    {/* Relationship */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                        <label htmlFor="relationship" className="dark:text-black mb-2">Relationship</label>
                            <select
                            {...register("relationship")}
                                    className="w-full text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Relationship</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Child">Child</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Other">Other</option>
                                </select>
                              
                        </div>
                         {/* Date Of Birth */}
                        <div className="w-full">
                            <label htmlFor="date" className="dark:text-black mb-2">Date Of Birth</label>
                            <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 bg-white"  type="date"
                                   id="date"  {...register("date")}/>
                        </div>
                        
                    </div>
                       {/* Contact */}
                       <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="contact" className="mb-2 dark:text-black">Contact No.</label>
                            <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Phone number starting with 0"
                                    {...register("contact", {valueAsNumber: true})}
                                    />
                                      {errors.contact &&<em className="text-red-500">
                                    {errors.contact.message}</em>}
                                    {errors.contact?.type === "minLength" &&<em className="text-red-500">
                                        Phone Number should be 9 characters</em>}
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

export default NOKForm;
