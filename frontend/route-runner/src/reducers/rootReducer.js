const INITIAL_STATE = {
  token_google: "",
  token_normal: "",
  loggedInGoogle: false,
  loggedInNormal: false,
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN_GOOGLE":
      localStorage.setItem("token_google", action.token_google);
      return {
        ...state,
        loggedInGoogle: action.loggedInGoogle,
        token_google: action.token_google,
      };
    case "LOG_IN_NORMAL":
      localStorage.setItem("token_normal", action.token_normal);
      return {
        ...state,
        loggedInNormal: action.loggedInNormal,
        token_normal: action.token_normal,
      };
    case "LOG_OUT":
      localStorage.removeItem("token_google");
      localStorage.removeItem("token_normal");
      return {
        ...state,
        loggedInGoogle: false,
        loggedInNormal: false,
        token_google: "",
        token_normal: "",
      };
    default:
      return state;
  }
}

export { INITIAL_STATE, rootReducer };
