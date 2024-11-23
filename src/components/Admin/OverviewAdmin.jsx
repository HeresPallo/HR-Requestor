import { useEffect, useState } from 'react';
import axios from 'axios';
import OverviewAdminCard from './Overview/OverviewCard';
import RequestBar from './Overview/RequestBar';

const OverviewAdmin = () => {
  const [data, setData] = useState({
    next_of_kin_count: 0,
    phone_claim_count: 0,
    insurance_count: 0,
    fiber_count: 0,
    id_cards_count: 0,
    total_requests: 0,
  });

  const [requestDates, setRequestDates] = useState([]);

  useEffect(() => {
    // Fetch total requests data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/totalrequests");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching total requests:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    
      const fetchRequestDates = async () => {
        try {
          const response = await fetch("http://localhost:5001/requestdates/");
          const requestData = await response.json();
          console.log("API Response:", requestData);
    
          setData((prevData) => ({
            ...prevData,
            next_of_kin_date:
              requestData.find((req) => req.requestdates === "nextofkinsubmissions")?.last_request_date
                ? new Date(requestData.find((req) => req.requestdates === "nextofkinsubmissions")?.last_request_date).toLocaleDateString()
                : "No Date",
            phone_claim_date:
              requestData.find((req) => req.requestdates === "phoneclaim")?.last_request_date
                ? new Date(requestData.find((req) => req.requestdates === "phoneclaim")?.last_request_date).toLocaleDateString()
                : "No Date",
            insurance_date:
              requestData.find((req) => req.requestdates === "insurance")?.last_request_date
                ? new Date(requestData.find((req) => req.requestdates === "insurance")?.last_request_date).toLocaleDateString()
                : "No Date",
            fiber_date:
              requestData.find((req) => req.requestdates === "fibersubmissions")?.last_request_date
                ? new Date(requestData.find((req) => req.requestdates === "fibersubmissions")?.last_request_date).toLocaleDateString()
                : "No Date",
            id_cards_date:
              requestData.find((req) => req.requestdates === "idcard")?.last_request_date
                ? new Date(requestData.find((req) => req.requestdates === "idcard")?.last_request_date).toLocaleDateString()
                : "No Date",
          }));
        } catch (error) {
          console.error("Error fetching request dates:", error);
        }
      };
      
    
      fetchRequestDates();
    }, []);

    useEffect(() => {
      console.log("Updated Data:", data);
    }, [data]);

  return (
    <div>
     <OverviewAdminCard
     title={"Next of Kin Requests"}
      count = {data.next_of_kin_count}
      date={data.next_of_kin_date}
     
     />
       <OverviewAdminCard
       title={"Phone Claim Requests"}
       count={data.phone_claim_count}
       date={data.phone_claim_date}
     />
       <OverviewAdminCard
       title={"Insurance Requests"}
       count={data.insurance_count} 
       date={data.insurance_date}
       
     />
       <OverviewAdminCard
       title={"Fiber Requests"}
       count={data.fiber_count}
       date={data.fiber_date}
       
     />
      <OverviewAdminCard
       title={"ID Card Requests"}
       count={data.id_cards_count} 
       date={data.insurance_date}
       
     />
     <RequestBar/>
    </div>
  );
};

export default OverviewAdmin;
