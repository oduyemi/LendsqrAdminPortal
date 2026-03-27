import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/Dashboard";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users.service";
import { GeneralDetails } from "./tabs/GeneralDetails";
import { Documents } from "./tabs/Documents";
import { BankDetails } from "./tabs/BankDetails";
import { Loans } from "./tabs/Loans";
import { Savings } from "./tabs/Savings";
import { AppSystem } from "./tabs/AppSystem";
import "../../styles/user-details.scss";

export const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General Details");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
  });

  if (isLoading) {
    return (
      <div className="skeleton-table">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-row" />
        ))}
      </div>
    );
  }

  if (!user) return <div>User not found</div>;

  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "General Details":
        return <GeneralDetails user={user} />;
      case "Documents":
        return <Documents />;
      case "Bank Details":
        return <BankDetails user={user} />;
      case "Loans":
        return <Loans />;
      case "Savings":
        return <Savings />;
      case "App and System":
        return <AppSystem />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="user-details-page">
        {/* Top Bar */}
        <div className="top-bar">
          <span className="back" onClick={() => navigate("/admin/users")}>
            ← Back to Users
          </span>

          <div className="actions">
            <button className="blacklist">Blacklist User</button>
            <button className="activate">Activate User</button>
          </div>
        </div>

        <h4 className="page-title">User Details</h4>

        {/* Profile */}
        <div className="profile-card">
          <div className="left">
            <div className="avatar">
              {user.username.charAt(0)}
            </div>

            <div>
              <h5>{user.username}</h5>
              <span>{user.id}</span>
            </div>
          </div>

          <div className="divider" />

          <div className="tier">
            <span>User’s Tier</span>
            <div className="stars">★ ★ ★</div>
          </div>

          <div className="divider" />

          <div className="balance">
            <h5>₦{(Math.random() * 500000).toFixed(2)}</h5>
            <span>{user.phone} / Providus Bank</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="details-card">{renderTab()}</div>
      </div>
    </DashboardLayout>
  );
};
