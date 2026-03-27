import { getUsers, getUserById } from "../users.service";
import * as mockModule from "../../features/users/api/mock/users";

const mockUsers = [
  {
    id: "1",
    username: "john",
    email: "john@test.com",
    organization: "OrgA",
    status: "active",
  },
  {
    id: "2",
    username: "jane",
    email: "jane@test.com",
    organization: "OrgB",
    status: "inactive",
  },
];

jest.spyOn(mockModule, "getMockUsers").mockReturnValue(mockUsers as any);

describe("Users Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("returns paginated users", async () => {
      const res = await getUsers({ page: 1, limit: 1 });

      expect(res.data).toHaveLength(1);
      expect(res.total).toBe(2);
      expect(res.page).toBe(1);
    });

    it("filters by organization", async () => {
      const res = await getUsers({ organization: "OrgA" });

      expect(res.data).toHaveLength(1);
      expect(res.data[0].organization).toBe("OrgA");
    });

    it("filters by search", async () => {
      const res = await getUsers({ search: "jane" });

      expect(res.data).toHaveLength(1);
      expect(res.data[0].username).toBe("jane");
    });

    it("filters by status", async () => {
      const res = await getUsers({ status: "inactive" });

      expect(res.data).toHaveLength(1);
      expect(res.data[0].status).toBe("inactive");
    });

    it("combines filters correctly", async () => {
      const res = await getUsers({
        organization: "OrgB",
        status: "inactive",
      });

      expect(res.data).toHaveLength(1);
      expect(res.data[0].username).toBe("jane");
    });
  });

  describe("getUserById", () => {
    it("returns a user if found", async () => {
      const user = await getUserById("1");

      expect(user).not.toBeNull();
      expect(user?.username).toBe("john");
    });

    it("returns null if user not found", async () => {
      const user = await getUserById("999");

      expect(user).toBeNull();
    });
  });
});