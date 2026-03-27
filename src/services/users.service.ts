import { getMockUsers } from "../features/users/api/mock/users";
import type { User } from "../features/users/api/mock/users";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface GetUsersParams {
  page?: number;
  limit?: number;
  organization?: string;
  search?: string;
  status?: string;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}



export const getUsers = async ({
  page = 1,
  limit = 10,
  organization,
  search = "",
  status,
}: GetUsersParams): Promise<GetUsersResponse> => {
  await delay(500);

  const allUsers = getMockUsers();
  let filteredUsers = allUsers;

  if (organization) {
    filteredUsers = filteredUsers.filter(
      (user) => user.organization === organization
    );
  }

  filteredUsers = filteredUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? user.status === status : true;

    return matchesSearch && matchesStatus;
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filteredUsers.slice(start, end),
    total: filteredUsers.length,
    page,
    limit,
  };
};

export const getUserById = async (id: string): Promise<User | null> => {
  await delay(300);

  const users = getMockUsers();

  return users.find((user) => user.id === id) || null;
};