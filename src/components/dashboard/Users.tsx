import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/Dashboard";
import { MoreVertical, SlidersHorizontal } from "lucide-react";
import { UserStats } from "./UserStats";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users.service";
import type { User } from "../users/api/mock/users";
import "../../styles/users.scss";

const Status = ({ type }: { type: string }) => (
  <span className={`status ${type}`}>{type}</span>
);

export const Users: React.FC = () => {
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [filterPosition, setFilterPosition] = useState({ left: 0 });
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from mock API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers({ page: 1, limit: 10 });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="page-header">
          <h4>Users</h4>
        </div>

        <UserStats />

        <div className="table-container">
          {/* HEADER */}
          <div className="table-header">
            {[
              "Organization",
              "Username",
              "Email",
              "Phone Number",
              "Date Joined",
              "Status",
            ].map((title, i) => (
              <div key={i} className="th">
                <span>{title}</span>
                <SlidersHorizontal
                  size={14}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = (e.target as HTMLElement).getBoundingClientRect();

                    setFilterPosition({
                      left: rect.left - 260,
                    });
                    setShowFilter((prev) => !prev);
                  }}
                />
              </div>
            ))}
            <div></div>
          </div>

          {/* FILTER */}
          {showFilter && (
            <div className="filter-popover" style={{ left: filterPosition.left }}>
              <div className="filter-grid">
                <div className="form-group">
                  <label>Organization</label>
                  <select>
                    <option>Select</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input placeholder="User" />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input placeholder="Email" />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input type="date" />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input placeholder="Phone" />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select>
                    <option>Select</option>
                  </select>
                </div>
              </div>

              <div className="filter-actions">
                <button className="reset">Reset</button>
                <button className="apply">Filter</button>
              </div>
            </div>
          )}

          {/* ROWS */}
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            users.map((user, i) => (
              <div className="table-row" key={user.id}>
                <div>{user.organization}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.dateJoined}</div>
                <div>
                  <Status type={user.status} />
                </div>

                <div className="menu">
                  <MoreVertical
                    onClick={() =>
                      setActiveMenu((prev) => (prev === i ? null : i))
                    }
                  />

                  {activeMenu === i && (
                    <div className="dropdown">
                      {/* Navigate to /admin/users/:id */}
                      <div
                        onClick={() => {
                          navigate(`/admin/users/${user.id}`);
                        }}
                      >
                        View Details
                      </div>

                      <div>Blacklist User</div>
                      <div>Activate User</div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* FOOTER */}
          <div className="table-footer">
            <span>Showing {users.length} users</span>

            <div className="pagination">
              <button>{"<"}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>{">"}</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};