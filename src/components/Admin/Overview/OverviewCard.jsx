import PropTypes from "prop-types";


const OverviewAdminCard = ({ title, count, date }) => {


    return (

<div className="w-[329px] h-[139px] p-6 bg-white rounded-xl shadow flex-col justify-start items-start gap-6 inline-flex my-4 mx-4">
    <div className="self-stretch justify-between items-start inline-flex">
        <div className="text-[#232323] text-base font-bold font-['Helvetica75'] leading-normal">{title}</div>
        <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative">
            </div>
        </div>
    </div>
    <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-[#232323] text-2xl font-semibold font-['Inter'] leading-[33.60px]">{count}</div>
        <div className="flex-col justify-start items-end gap-1 inline-flex">
            <div className="justify-start items-center gap-1 inline-flex">
                <div className="w-3.5 h-3.5 justify-center items-center flex">
                    <div className="w-3.5 h-3.5 relative">
                    </div>
                </div>
                <div className="text-[#232323] text-xs font-xs "> Last request Date:{date}</div>
                
            </div>
            
        </div>
    </div>
</div>
    )
};

// PropTypes validation
OverviewAdminCard.propTypes = {
    title: PropTypes.string.isRequired, // Ensure `title` is a required string
    count: PropTypes.string.isRequired, // Ensure `count` is a required number
    date: PropTypes.string.isRequired,
   
  };

export default OverviewAdminCard;