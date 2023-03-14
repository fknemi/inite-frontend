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
    const req = await instance.get("/admin");
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

export const getUsers = async () => {
  try {
    const req = await instance.get("/admin/get/users");
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
    const req = await instance.get("/admin/instagram/get/users");
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
    const req = await instance.get("/admin/get/reports");

    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};

export const banUser = async (username: string) => {
  try {
    const req = await instance.put("/admin/user/ban/", {
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
    const req = await instance.put("/admin/user/unban/", {
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
    const req = await instance.put("/admin/instagram/user/ban", {
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
    const req = await instance.put("/admin/instagram/user/unban", {
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
