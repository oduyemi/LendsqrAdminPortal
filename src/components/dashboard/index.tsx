import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts/Dashboard";
import { useUsers } from "../../features/users/hooks/use-user";
import { MoreVertical, SlidersHorizontal } from "lucide-react";
import "../../styles/home.scss";
import { UserStats } from "./UserStats";


type StatusProps = {
  type: "active" | "inactive" | "pending" | "blacklisted";
};

const Status: React.FC<StatusProps> = ({ type }) => (
  <span className={`status ${type}`}>{type}</span>
);

export const Dashboard = () => {
  const { data, isLoading } = useUsers(1, 10);
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/adimn/users/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="page-header">
          <h4>Users</h4>
        </div>

        {/* Stats */}
        <UserStats />

        {/* Table */}
        <div className="table-container">
          <div className="table-header">
            <div>Organization</div>
            <div>Username</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Date Joined</div>
            <div>Status</div>
            <div></div>
          </div>

          {/* Filter Row */}
          <div className="table-filters">
            {Array.from({ length: 6 }).map((_, i) => (
              <button key={i}>
                <SlidersHorizontal size={14} /> Filter
              </button>
            ))}
          </div>

          {/* Rows */}
          <div className="table-body">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data?.data.map((user) => (
                <div
                  className="table-row"
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div>{user.organization}</div>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>{user.phone}</div>
                  <div>{user.dateJoined}</div>
                  <div>
                    <Status type={user.status} />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={16} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="table-footer">
            <span>Showing 1–10 of 100</span>
            <div className="pagination">
              <button onClick={() => navigate("?page=prev")}>Prev</button>
              <button className="active">1</button>
              <button onClick={() => navigate("?page=2")}>2</button>
              <button onClick={() => navigate("?page=3")}>3</button>
              <button onClick={() => navigate("?page=next")}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
