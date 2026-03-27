import { useNavigate } from "react-router-dom";
import { Users, UserCheck, CreditCard, PiggyBank } from "lucide-react";
import "../../styles/home.scss";

const StatCard = ({ title, value, icon, variant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users?filter=${title.toLowerCase().replace(/ /g, "_")}`);
  };

  return (
    <div className={`card-box ${variant}`} onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="card-icon">{icon}</div>
      <h6>{title}</h6>
      <h4>{value}</h4>
    </div>
  );
};



export const UserStats = () => {

  return (
        <div className="cards">
            <StatCard title="USERS" value="500" icon={<Users size={18} />} variant="purple" />
            <StatCard title="ACTIVE USERS" value="353" icon={<UserCheck size={18} />} variant="blue" />
            <StatCard title="USERS WITH LOANS" value="95" icon={<CreditCard size={18} />} variant="orange" />
            <StatCard title="USERS WITH SAVINGS" value="52" icon={<PiggyBank size={18} />} variant="pink" />
        </div>
  );
};
