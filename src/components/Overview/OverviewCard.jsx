import { Link } from "react-router-dom";
const OverviewCard = () => {
    return (
        <div className="max-w-2xl mb-8 mx-auto text-center">
        <h2 className="text-black text-4xl font-extrabold">Welcome to the HR Request App</h2>
        <p className="text-gray-800 text-sm mt-4 leading-relaxed"></p>
   
        <div
  className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row">

  <div className="flex flex-col mx-auto text-center p-6">
    <p className="mb-4 text-black text-2xl">
      Your Digital gateway to all requests for the HR Department:
    </p>
    <ul className="flex-row text-orange-500 text-xl">
    <Link to="/nextofkin"><li>Next of Kin</li></Link>
    <Link to="/phoneclaim"><li>Phone Claim</li></Link>
    <Link to="/insurance"><li>Medical Insurance</li></Link>
    <Link to="/fiber"><li>Fiber Offer</li></Link>
    <Link to="/idcard"><li>ID Cards</li></Link>
    </ul>
    
  </div>
</div>
 </div>
    );
};

export default OverviewCard;
