
import ForgotID from "./ForgotID";
import IDCardForm from "./IDCardForm";

const IDCard = () => {

    return (
        <div className="grid gap-4 bg-gray-200 min-h-screen justify-center items-center ">
        <div className="mt-24"><ForgotID/></div>
        <div className="mt-8"><IDCardForm/></div>
        
            
        </div>
    );
};

export default IDCard;
