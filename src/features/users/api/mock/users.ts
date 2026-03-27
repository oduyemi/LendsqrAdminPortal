export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
}

const firstNames = [
  "Grace", "Michael", "David", "Esther", "Samuel", "Ali", "Chinemerem",
  "Daniel", "Aisha", "Ibrahim", "Chioma", "Tunde", "Chizoba", "Ogechi"
];

const lastNames = [
  "Effiom", "Okafor", "Balogun", "Adeyemi", "Olawale",
  "Ibrahim", "Okeke", "Danladi", "Eze", "Adebayo"
];

const randomName = () => {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);
  return { first, last, full: `${first} ${last}` };
};

const organizations = ["Lendsqr", "Lendstar", "Irorun"];

const statuses: UserStatus[] = [
  "active",
  "inactive",
  "pending",
  "blacklisted",
];

const randomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomDate = () => {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date().getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const randomPhone = () =>
  `0${Math.floor(7000000000 + Math.random() * 999999999)}`;


export const users: User[] = Array.from({ length: 1500 }).map((_, i) => {
    const name = randomName();
  
    return {
      id: `${i + 1}`,
      organization: randomItem(organizations),
      username: name.full,
      email: `${name.first.toLowerCase()}${i + 1}@test.com`,
      phone: randomPhone(),
      dateJoined: randomDate(),
      status: randomItem(statuses),
    };
  });


  let cachedUsers: User[] | null = null;

export const getMockUsers = (): User[] => {
  if (!cachedUsers) {
    cachedUsers = Array.from({ length: 1500 }).map((_, i) => {
      const name = randomName();

      return {
        id: `${i + 1}`,
        organization: randomItem(organizations),
        username: name.full,
        email: `${name.first.toLowerCase()}${i + 1}@test.com`,
        phone: randomPhone(),
        dateJoined: randomDate(),
        status: randomItem(statuses),
      };
    });
  }

  return cachedUsers;
};