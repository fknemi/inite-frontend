import instance from "../axios";
export const getUserDetails = async (isOwner: boolean, username: string) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false, data: {} };
  }
  try {
    const req = await instance.post("/owner/user/details", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true, data: req.data };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false, data: {} };
    }
    return { isSuccess: false, wasAuthorized: true, data: {} };
  }
  return { isSuccess: false, wasAuthorized: true, data: {} };
};

export const getInstagramUserDetails = async (
  isOwner: boolean,
  username: string
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false, data: {} };
  }
  try {
    const req = await instance.post("/owner/instagram/user/details", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true, data: req.data };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false, data: {} };
    }
    return { isSuccess: false, wasAuthorized: true, data: {} };
  }
  return { isSuccess: false, wasAuthorized: true, data: {} };
};

export const deleteInstagramUser = async (
  isOwner: boolean,
  deleteMedia: boolean | undefined,
  username: string
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  if (deleteMedia === undefined) {
    return { isSuccess: false, wasAuthorized: true };
  }
  try {
    const req = await instance.put("/owner/instagram/user/delete", {
      username,
      deleteMedia,
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

export const deleteInstagramUserMedia = async (
  isOwner: boolean,
  deleteMedia: boolean | undefined,
  username: string
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  if (deleteMedia === undefined) {
    return { isSuccess: false, wasAuthorized: true };
  }
  try {
    const req = await instance.put("/owner/instagram/user/media/delete", {
      username,
    });
    console.log("====================================");
    console.log(req);
    console.log("====================================");
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

export const deleteUser = async (
  isOwner: boolean,
  username: string,
  deleteMedia: boolean
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  if (!deleteMedia) {
    return { isSuccess: false, wasAuthorized: true };
  }
  try {
    const req = await instance.put("/owner/user/delete", {
      username,
      deleteMedia,
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

export const deleteUserMedia = async (isOwner: boolean, username: string) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  try {
    const req = await instance.put("/owner/user/media/delete", {
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

export const getLogs = async () => {
  try {
    const req = await instance.get("/owner/get/logs");

    if (req.status === 200) {
      return { isSuccess: true, wasAuthorized: true, data: req.data };
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      return { isSuccess: false, wasAuthorized: false, data: {} };
    }
    return { isSuccess: false, wasAuthorized: true, data: {} };
  }
  return { isSuccess: false, wasAuthorized: true, data: {} };
};

export const resetUserPassword = async (
  isOwner: boolean,
  username: string,
  email = ""
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  try {
    const req = await instance.put("/owner/user/account/reset/password", {
      username,
      email,
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

export const promoteAdmin = async (
  isOwner: boolean,
  username: string,
  email: string
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  if (!email || !username) {
    return { isSuccess: false, wasAuthorized: true };
  }
  try {
    const req = await instance.put("/owner/promote/admin", {
      username,
      email,
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

export const removeAdmin = async (
  isOwner: boolean,
  username: string,
  email: string
) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  if (!email || !username) {
    return { isSuccess: false, wasAuthorized: true };
  }
  try {
    const req = await instance.put("/owner/remove/admin", {
      username,
      email,
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

export const getReadReports = async () => {
  try {
    const req = await instance.get("/owner/get/read/reports");

    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};

export const socket_DeleteReport = async (isOwner: boolean, id: string) => {
  if (!isOwner) {
    return { isSuccess: false, wasAuthorized: false };
  }
  try {
  } catch {}
};
