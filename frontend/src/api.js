import { createContext } from "react";
import { apiBaseUrl as ENDPOINT } from "./const";

export const ApiContext = createContext();

const getToken = () => `Bearer ${localStorage.getItem("token")}`;

/**
 * Wrapper class to make API calls
 */
export default class API {
  userPasswordChange(token, uid, newpassword) {
    return fetch(`${ENDPOINT}/user/passwordchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        token: token,
        newpassword: newpassword,
      }),
    });
  }

  /**
   * Fetches the user profile from the backend endpoint
   * @param {string} uid
   * @returns {Promise}
   */
  userProfile(uid, token) {
    return fetch(`${ENDPOINT}/user/profile?uid=${uid}&token=${token}`);
  }

  postUserProfile(uid, token, userData) {
    console.log("called");
    console.log(userData);
    return fetch(`${ENDPOINT}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        token: token,
        userData: userData,
      }),
    });
  }

  userNotifications(token) {
    return fetch(`${ENDPOINT}/user/notifications?token=${token}`);
  }

  userNotificationsClear(token) {
    return fetch(`${ENDPOINT}/user/notifications/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
  }

  /**
   * Calls the login endpoint
   * @param {string} username
   * @param {string} password
   * @returns {Promise}
   */
  authLogin(username, password) {
    return fetch(`${ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  }
  /**
   * Logs out and invalidates a given token
   * @param {string} token
   * @returns {Promise}
   */
  authLogout(token) {
    return fetch(`${ENDPOINT}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
  }
  /**
   * Calls the register endpoint
   * @param {string} username
   * @param {string} password
   * @returns {Promise}
   */
  authRegister(username, password) {
    return fetch(`${ENDPOINT}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  }

  authDelete(token) {
    return fetch(`${ENDPOINT}/auth/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
  }
  /**
   *
   * @param {string} token // Token of the user uploading
   * @param {File} file // File object of the file
   */
  fileUpload(token, file) {
    const formData = new FormData();
    formData.append("upload", file);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        token: token,
      },
    };
    return fetch(`${ENDPOINT}/file/upload`, options);
  }

  fileDownload(token, fid) {
    return fetch(`${ENDPOINT}/file/download?token=${token}&fid=${fid}`);
  }

  /**
   *
   * @param {int} type
   *          description: The type of call being made;
   *          0. Information overview of stock;
   *          1. Current price of stock(s);
   *          2. History of one stock not intraday;
   *          3. History of one stock intraday
   * @param {string} stocks
   *          description: The symbol of the stock or stocks
   * @param {string} interval
   *          description: The interval needed;
   *          For not intraday, options are daily, weekly, monthly;
   *          For intraday, options are 1min, 5min, 15min
   * @param {string} start
   *          description: The start of the time from when to get data;
   *          For not intraday, format is string as YYYY-MM-DD;
   *          For intraday, format is string as YYYY-MM-DD HH:MM
   */
  stocksInfo(type, stocks, interval, start) {
    let queryStr = `${ENDPOINT}/stocks/info?type=${type}&stocks=${stocks}`;
    if (start !== null) {
      queryStr = queryStr + `&start=${start}`;
    }
    if (interval !== null) {
      queryStr = queryStr + `&interval=${interval}`;
    }
    return fetch(queryStr);
  }

  userPortfoliosOpen(pid, token) {
    return fetch(`${ENDPOINT}/user/portfolios/open?token=${token}&pid=${pid}`);
  }

  getCelebrityDiscover() {
    return fetch(`${ENDPOINT}/celebrity/discover`);
  }

  friendsPortfolios(token, uid) {
    return fetch(`${ENDPOINT}/friends/portfolios?token=${token}&uid=${uid}`);
  }

  postCelebrityFollow(token, isFollow, celebUid) {
    return fetch(`${ENDPOINT}/celebrity/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        isFollow: isFollow,
        celebUid: celebUid,
      }),
    });
  }

  postCelebrityMakeRequest(token, info, fids) {
    return fetch(`${ENDPOINT}/celebrity/makerequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        info: info,
        fids: fids,
      }),
    });
  }

  getAdminCelebrityRequests(token) {
    let queryStr = `${ENDPOINT}/admin/celebrity/requests?token=${token}`;
    return fetch(queryStr);
  }

  postAdminCelebrityHandlerequest(token, approve, rid) {
    return fetch(`${ENDPOINT}/admin/celebrity/handlerequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        approve: approve,
        rid: rid,
      }),
    });
  }

  adminUserDelete(token, uid) {
    return fetch(`${ENDPOINT}/admin/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        uid: uid,
      }),
    });
  }

  rankingsPerformance(token, uid) {
    return fetch(`${ENDPOINT}/rankings/performance?token=${token}&uid=${uid}`);
  }

  post(path, options) {
    return fetch(`${ENDPOINT}/${path}`, {
      ...options,
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
  }

  get(path, options) {
    return fetch(`${ENDPOINT}/${path}`, {
      ...options,
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
  }

  delete(path, options) {
    return fetch(`${ENDPOINT}/${path}`, {
      ...options,
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
  }
}
