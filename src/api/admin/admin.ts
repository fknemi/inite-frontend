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

// Get Instagram Users
// Get  Reports

// ADMIN
// Ban User
// Ban Instagram User
// Unban User
// Unban Instagram User

export const getUsers = async () => {
  try {
    const req = await instance.post("/admin/get/users");
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};
export const getInstagramUsers = async () => {
  try {
    const req = await instance.post("/admin/instagram/get/users");
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};

export const getReports = async () => {
  try {
  } catch {}
};

export const banUser = async (username: string) => {
  try {
    const req = await instance.post("/admin/user/ban/", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false };
    }
    return { isSuccess: false, wasAuthorized: true };
  }
  return { isSuccess: false, wasAuthorized: false };
};
export const unbanUser = async (username: string) => {
  try {
    const req = await instance.post("/admin/user/unban/", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false };
    }
    return { isSuccess: false, wasAuthorized: true };
  }
  return { isSuccess: false, wasAuthorized: true };
};
export const banInstagramUser = async (username: string) => {
  try {
    const req = await instance.post("/admin/instagram/user/ban", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false };
    }
    return { isSuccess: false, wasAuthorized: true };
  }
  return { isSuccess: false, wasAuthorized: true };
};
export const unbanInstagramUser = async (username: string) => {
  try {
    const req = await instance.post("/admin/instagram/user/unban", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false };
    }
    return { isSuccess: false, wasAuthorized: true };
  }
  return { isSuccess: false, wasAuthorized: true };
};
