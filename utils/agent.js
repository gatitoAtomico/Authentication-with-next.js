import axios from "axios";
import { setCookie } from "cookies-next";

export const refreshToken = async (rfToken) => {
  console.log("refresh token function");
  return axios
    .post(`${process.env.NEXT_PUBLIC_BASEURL}/api/refreshJwt`, {
      refreshToken: rfToken,
    })
    .then((res) => res.data.jwtToken);
};

let axiosInstance;
/**
 * @returns {axios}
 */
function getAxiosInstance(jwt, rfToken) {
  console.log("axios instance");
  if (!axiosInstance) {
    console.log("this is the jwt", jwt);
    console.log("this is the rfToken", rfToken);
    axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASEURL}/api`,
      headers: {
        authorization: `Bearer ${jwt ? jwt : ""}`,
      },
    });
    axiosInstance.interceptors.response.use(undefined, async (err) => {
      if (err.response.status === 403) {
        //create new jwt token based on refresh token, have to create new endpoint for that
        console.log("jwt token is expired");
        let jwtToken = await refreshToken(rfToken);

        // setCookie("jwt", jwtToken);
        //window.localStorage.setItem("jwt", response.data.jwtToken);
        axiosInstance.defaults.headers["authorization"] = `Bearer ${jwtToken}`;
        err.config.headers["authorization"] = `Bearer ${jwtToken}`;
        // err.config.baseURL = undefined;
        return axios.request(err.config);
      }
      return Promise.reject(err);
    });
  }
  return axiosInstance;
}

export default {
  getUser: (jwt, rfToken) => {
    return getAxiosInstance(jwt, rfToken).get("/auth/analysisAutomation");
  },
  getPokemon: (jwt, rfToken) => {
    return getAxiosInstance(jwt, rfToken).get("/auth/analysisAutomation");
  },
};
