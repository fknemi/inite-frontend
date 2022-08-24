import instance from "../axios";
export const adminLogin = async (username: string, password: string) => {
  try {
    const req = await instance.post("/admin/login", {
      username,
      password,
    });
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};

export const fetchAdmin = async () => {
  try {
    const req = await instance.post("/admin/get");
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};
export const logout = () => {
  localStorage.removeItem("admin");
  localStorage.removeItem("loggedInAt");
};
