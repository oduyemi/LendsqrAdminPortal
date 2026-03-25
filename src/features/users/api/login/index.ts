export interface LoginPayload {
  email: string;
  password: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginUser = async (
  data: LoginPayload
): Promise<{ email: string; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!emailRegex.test(data.email)) {
        return reject(new Error("Invalid email format"));
      }

      if (data.password.length < 6) {
        return reject(new Error("Password must be at least 6 characters"));
      }

      // Mock success
      resolve({
        email: data.email,
        token: "mock-jwt-token",
      });
    }, 1500);
  });
};