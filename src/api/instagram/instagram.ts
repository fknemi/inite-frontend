import instance from "../axios";

export const fetchInstagramUser = async (username: string) => {
  try {
    const req = await instance.post("/instagram/user/get", {
      username,
    });
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch (err) {
    let status = (err as { [key: string]: { [key: string]: string | number } })
      .response.status;
    if (status === 404) {
      return { isSuccess: false, data: {}, _message: "User Does Not Exist" };
    }
    return { isSuccess: false, data: {} };
  }

  return { isSuccess: false, data: {} };
};

export const getInstagramUserMedia = async (username: string) => {
  try {
    const req = await instance.post("/instagram/user/get/media", {
      username,
    });
    if (req.status === 200) {
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
    if (req.status === 200) {
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};
