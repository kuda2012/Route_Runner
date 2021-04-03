import axios from "axios";
export function loggingInGoogle(tokenId) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup/google", {
        token_google: tokenId,
      });
      dispatch(googleTokenReceived(response.data.token_google));
    } catch (error) {
      localStorage.removeItem("token_google");
      console.log(error.response.data);
    }
  };
}
export function authTokenNormal(tokenId) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth_token", {
        token_normal: tokenId,
      });
      dispatch(normalTokenReceived(response.data.token_normal));
    } catch (error) {
      localStorage.removeItem("token_normal");
      console.log(error);
    }
  };
}
export function loggingInNormal(formData) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        formData
      );
      dispatch(normalTokenReceived(response.data.token_normal));
    } catch (error) {
      localStorage.removeItem("token_normal");
      alert(error.response.data.message);
    }
  };
}
export function signingUpNormal(formData) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        formData
      );
      dispatch(normalTokenReceived(response.data.token_normal));
    } catch (error) {
      localStorage.removeItem("token_normal");
      alert(error.response.data.message);
    }
  };
}
export function googleTokenReceived(token_google, loggedInGoogle = true) {
  return {
    type: "LOG_IN_GOOGLE",
    token_google,
    loggedInGoogle,
  };
}
export function normalTokenReceived(token_normal, loggedInNormal = true) {
  return {
    type: "LOG_IN_NORMAL",
    token_normal,
    loggedInNormal,
  };
}
export function logOut() {
  return {
    type: "LOG_OUT",
  };
}
