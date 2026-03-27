import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useAuthStore } from "../../store/use-auth";
import { useNavigate } from "react-router-dom";
import "../../styles/header.scss";
import { LogOut } from "lucide-react";

interface Props {
  toggleSidebar: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ toggleSidebar }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header">
      {/* Left */}
      <div className="header-left">
        <Menu className="menu-icon" onClick={toggleSidebar} />

        <div className="search-box">
          <input type="text" placeholder="Search for anything" />
          <button className="px-5 py-3">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="header-right">
        <span className="docs">Docs</span>

        <Bell className="icon" />

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="avatar" />
          <span>Adedeji</span>

          {/* Logout */}
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </div>
  );
};


