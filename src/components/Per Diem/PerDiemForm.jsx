import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const PerDiemForm = () => {
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
        depart_date: z.string().min(3, {message:"date requires a minimum of 3 letters"}),
        return_date: z.string().min(3, {message:"date requires a minimum of 3 letters"}),
        purpose: z.string().min(3, {message:"Type purpose of trip"}),
        level: z.union([
            z.literal('Le 350 Temporary Employees'),
            z.literal('Le 550 Asst. Managers & Below'), 
            z.literal('Le 750 Senior Managers & Managers - Cash Advance'), 
            z.literal('Le 1,000 Directors / Deputy Directors - Cash Advance'), 
            z.literal('Le 1,500 CEO - Cash Advance'), 
            ]),
        filing_date: z.string().min(3, {message:"date requires a minimum of 3 letters"}),
        travel_names: z.string().min(3, {message:"Type names of all traveling"}),
        purpose_two: z.string().min(3, {message:"Type purpose of trip"}),
        mode: z.union([
            z.literal('Vehicle'),
            z.literal('Plane'), 
            z.literal('Sea Vessel'), 
            ]),
        route_from: z.string().min(1, {message:"Route From is required"}),
        est_depart: z.string().min(3, {message:"Estimated Departure Date is required"}),
        route_via: z.string().min(1, {message:"Route Via is required"}),
        destination: z.string().min(1, {message:"Destination is required"}),
        est_arrival: z.string().min(1, {message:"Estimated Arrival is required"}),
        mobile: z.number().gte(9, {message:"Mobile number should start with 0"}),
        return_names: z.string().min(3, {message:"Return names are required"}),
        est_depart2: z.string().min(3, {message:"Estimated Departure Date is required"}),
        est_arrival2: z.string().min(3, {message:"Estimated Arrival is required"}),
        sign_date: z.string().min(3, {message:"Date is required"}),
        total_days: z.number().gte(1, {message:"Total Days is required"}),
        amount_total: z.number().gte(1, {message:"Total Amount is required"}),
        
        
       
    
    })


    const {register, handleSubmit, watch, formState:{errors}} = useForm({resolver: zodResolver(schema)});
    const [total_days, setTotalDays] = useState(0); // Updated to total_days
    const [amount_total, setTotalAmount] = useState(0); // Updated to amount_total
  
    const calculateTotal = () => {
      const departDate = new Date(watch('depart_date'));
      const returnDate = new Date(watch('return_date'));
      const level = watch('level');
  
      if (departDate && returnDate && departDate <= returnDate && level) {
        const perDiemRate = parseFloat(level.split(' ')[1].replace(/Le|,/g, '').trim()); // Extract amount from level string
        const days = Math.ceil((returnDate - departDate) / (1000 * 60 * 60 * 24)) + 1; // Include departure day
        setTotalDays(days);
        setTotalAmount(days * perDiemRate);
      } else {
        setTotalDays(0);
        setTotalAmount(0);
      }
    };

 

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log('Form submitted:', formData); 
    
    // Append form data to FormData object
    const data = new FormData();
    data.append('employee_name', formData.employee_name);
    data.append('department', formData.department);
    data.append('depart_date', formData.depart_date);
    data.append('return_date', formData.return_date);
    data.append('purpose', formData.purpose);
    data.append('level', formData.level);
    data.append('filing_date', formData.filing_date);
    data.append('travel_names', formData.travel_names);
    data.append('purpose_two', formData.purpose_two);
    data.append('mode', formData.mode);
    data.append('route_from', formData.route_from);
    data.append('est_depart', formData.est_depart);
    data.append('route_via', formData.route_via);
    data.append('destination', formData.destination);
    data.append('est_arrival', formData.est_arrival);
    data.append('mobile', formData.mobile);
    data.append('return_names', formData.return_names);
    data.append('est_depart2', formData.est_depart2);
    data.append('est_arrival2', formData.est_arrival2);
    data.append('sign_date', formData.sign_date);
    data.append('total_days', formData.total_days);
    data.append('amount_total', formData.amount_total);

    // console.log(totalDays, totalAmount);
    

    try {
      const response = await axios.post('http://localhost:5001/perdiem', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);
      setSuccessMessage('Per Diem submitted successfully!'); // Set success message
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
    <h2 className="text-black text-4xl font-extrabold">Per Diem Submission</h2>
    <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
    <section className="py-10 my-auto dark:bg-surface-dark">
    <div className="lg:w-[100%] md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[100%] md:w-[90%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-white">
           
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
               
                </h1>
                <form 
                value={details}
                onChange={calculateTotal}
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
                           {/* Depart Date */}
                          <div className="w-full">
                            <label htmlFor="depart_date" className="dark:text-black mb-2">Departure Date</label>
                            <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                                   id="depart_date"  {...register("depart_date")}/>
                        </div>
                          {/* Return Date */}
                          <div className="w-full">
                            <label htmlFor="return_date" className="dark:text-black mb-2">Return Date</label>
                            <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                                   id="return_date"  {...register("return_date")}/>
                        </div>
                        </div>
                         {/* Purpose of Trip */}
                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            {/* Purpose of Trip */}
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="purpose" className="mb-2 dark:text-black">Purpose of Trip:</label>
                            <input type="purpose"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type purpose Here"
                                        {...register("purpose")}
                                    />
                                    {errors.purpose &&<em className="text-red-500">
                                    {errors.purpose.message}</em>}
                                    {errors.purpose?.type === "minLength" &&<em className="text-red-500">
                                        Purpose is required</em>}
                        </div>
                        </div>
                        {/* LEvel & Address */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    
                        {/* LEvel */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full mb-4 mt-6">
                        <label htmlFor="level" className="dark:text-black mb-2">Employee Level:</label>
                            <select
                            {...register("level")}
                                    className="w-full text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Band</option>
                                    <option value="Le 1,500 CEO - Cash Advance">Le 1,500 CEO - Cash Advance </option>
                                    <option value="Le 1,000 Directors / Deputy Directors - Cash Advance">Le 1,000 Directors / Deputy Directors - Cash Advance</option>
                                    <option value="Le 750 Senior Managers & Managers - Cash Advance">Le 750 Senior Managers & Managers - Cash Advance</option>
                                    <option value="Le 550 Asst. Managers & Below">Le 550 Asst. Managers & Below</option>
                                    <option value="Le 350 Temporary Employees">Le 350 Temporary Employees</option>
                                </select>
                              
                        </div>
                          
                    </div>
                    </div>
                    <h1
                    className=" mt-4 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                    Travel Information
                </h1>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    
                    {/* Date of Filing */}
                       <div className="w-full  mb-4 mt-6">
                       <label htmlFor="filing_date" className="dark:text-black mb-2">Date of Filing </label>
                       <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                              id="filing_date"  {...register("filing_date")}/>
                   </div>
                      {/* Name(s) of persons travelling */}
                      <div className="w-full  mb-4 mt-6">
                            <label htmlFor="travel_names" className="mb-2 dark:text-black">Names of persons travelling:</label>
                            <input type="travel_names"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type Names Here"
                                        {...register("travel_names")}
                                    />
                                    {errors.travel_names &&<em className="text-red-500">
                                    {errors.travel_names.message}</em>}
                                    {errors.travel_names?.type === "minLength" &&<em className="text-red-500">
                                        Trave Names are required</em>}
                        </div>
                   
               </div>
                      {/* Purpose 2 and modes of transportation */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                         {/* Purpose of Trip 2 */}
                         <div className="w-full  mb-4 mt-6">
                            <label htmlFor="purpose_two" className="mb-2 dark:text-black">Purpose of Trip:</label>
                            <input type="purpose_two"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type Purpose Here"
                                        {...register("purpose_two")}
                                    />
                                    {errors.purpose_two &&<em className="text-red-500">
                                    {errors.purpose_two.message}</em>}
                                    {errors.purpose_two?.type === "minLength" &&<em className="text-red-500">
                                        Purpose is required</em>}
                        </div>
                         {/* Mode of Transportation */}
                         <div className="w-full mb-4 mt-6">
                        <label htmlFor="mode" className="dark:text-black mb-2">Select Mode of Transportation:</label>
                            <select
                            {...register("mode")}
                                    className="w-full mt-2 text-white border-2 rounded-lg p-4 pl-2 pr-2 dark:text-white dark:border-orange-500 dark:bg-orange-500"  >
                                    <option disabled value="">Select Mode of Transportation</option>
                                    <option value="Vehicle">Vehicle </option>
                                    <option value="Plane">Plane</option>
                                    <option value="Sea Vessel">Sea Vessel</option>
                                </select>
                              
                        </div>
                    </div>
                    
                    {/* Route from and etd */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                          {/* Route from*/}
                          <div className="w-full  mb-4 ">
                            <label htmlFor="route_from" className="mb-2 dark:text-black">Route From:</label>
                            <input type="text"
                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter destination start point here"
                                    {...register("route_from")}
                                    />
                                      {errors.route_from &&<em className="text-red-500">
                                    {errors.route_from.message}</em>}
                                    {errors.route_from?.type === "minLength" &&<em className="text-red-500">
                                        Route from is required</em>}
                        </div>
                           
                    {/* Estimated Time of Departure */}
                       <div className="w-full">
                       <label htmlFor="est_depart" className="dark:text-black mb-2">Estimated Time of Departure </label>
                       <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                              id="est_depart"  {...register("est_depart")}/>
                   </div>
                    </div>
                      {/* Via */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                          {/* Route via*/}
                          <div className="w-full  mb-4 ">
                            <label htmlFor="route_via" className="mb-2 dark:text-black">Route Via:</label>
                            <input type="text"
                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter destination start point here"
                                    {...register("route_via")}
                                    />
                                      {errors.route_via &&<em className="text-red-500">
                                    {errors.route_via.message}</em>}
                                    {errors.route_via?.type === "minLength" &&<em className="text-red-500">
                                        Route via is required</em>}
                        </div>
                
                    </div>
                    {/* Route destination and etd */}
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                          {/* Route destination*/}
                          <div className="w-full  mb-4 ">
                            <label htmlFor="destination" className="mb-2 dark:text-black">Destination:</label>
                            <input type="text"
                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Enter destination start point here"
                                    {...register("destination")}
                                    />
                                      {errors.destination &&<em className="text-red-500">
                                    {errors.destination.message}</em>}
                                    {errors.destination?.type === "minLength" &&<em className="text-red-500">
                                        Route to is required</em>}
                        </div>
                           
                    {/* Estimated Time of Arrival */}
                       <div className="w-full">
                       <label htmlFor="est_arrival" className="dark:text-black mb-2">Estimated Time of Arrival </label>
                       <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                              id="est_arrival"  {...register("est_arrival")}/>
                   </div>
                    </div>
                 {/* Mobile */}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                 <div className="w-full  mb-4 mt-6">
                            <label htmlFor="mobile" className="mb-2 dark:text-black">Contact No.:</label>
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
                    <h1
                    className=" mt-4 lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                   Return Trip
                </h1>
                 {/* Return*/}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                         {/* Name(s) of persons returning */}
                      <div className="w-full  mb-4 mt-6">
                            <label htmlFor="return_names" className="mb-2 dark:text-black">Names of persons returning:</label>
                            <input type="return_names"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-black dark:bg-white"
                                    placeholder="Type Names Here"
                                        {...register("return_names")}
                                    />
                                    {errors.return_names &&<em className="text-red-500">
                                    {errors.return_names.message}</em>}
                                    {errors.return_names?.type === "minLength" &&<em className="text-red-500">
                                        Purpose is required</em>}
                        </div>
                     </div>   
                    
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    {/* Estimated Time of Departure */}
                    <div className="w-full">
                       <label htmlFor="est_depart2" className="dark:text-black mb-2">Estimated Time of Departure </label>
                       <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                              id="est_depart2"  {...register("est_depart2")}/>
                   </div>
                    {/* Estimated Time of arrival */}
                    <div className="w-full">
                       <label htmlFor="est_arrival2" className="dark:text-black mb-2">Estimated Time of Arrival </label>
                       <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600 bg-white"  type="date"
                              id="est_arrival2"  {...register("est_arrival2")}/>
                   </div>
                   
                        </div>
                            {/* Date  */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full mb-4 mt-6">
                            <label htmlFor="sign_date" className="dark:text-black mb-2">Date Of Application</label>
                            <input className="text-grey p-4 w-full border-2 rounded-lg dark:text-black bg-white"  type="date"
                                   id="sign_date"  {...register("sign_date")}/>
                        </div>
                    </div>

                     {/* Return*/}
                 <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                         {/* total days */}
                         <div className="w-full  mb-4 mt-6">
                         <label>Total Days:</label>
    <input
      type="number"
      name="total_days"
      value={total_days}
      readOnly
      className="readonly-input"
      {...register("total_days", {valueAsNumber: true})}
    />
                        </div>
                         {/* total amount */}
                         <div className="w-full  mb-4 mt-6">
                         <label>Total Amount:</label>
    <input
      type="number"
      name="amount_total"
      value={amount_total}
      readOnly
      className="readonly-input"
      {...register("amount_total", {valueAsNumber: true})}
    />
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

export default PerDiemForm;
