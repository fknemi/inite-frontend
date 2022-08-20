import instance from "../axios";

export const fetchInstagramUser = async (username: string) => {
  try {
    const req = await instance.post("/instagram/user/get", {
      username,
    });
    if ((req as any).status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch (err: any) {
    return { isSuccess: false, data: {} };
  }

  return { isSuccess: false, data: {} };
};
export const addInstagramUser = async (instagramUser: any) => {
  try {
    const req = await instance.post("/instagram/user/add", {
      ...instagramUser,
    });
    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};

export const getInstagramUserMedia = async (username: string) => {
  try {
    const req = await instance.post("/instagram/user/get/media", {
      username,
    });
    if ((req as any).status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: [] };
  }
  return { isSuccess: false, data: [] };
};
export const fetchRecentChanges = async (instagramUser: any) => {
  try {
    const req = await instance.post("/instagram/get/recent", {
      ...instagramUser,
    });
    if ((req as any).status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};
