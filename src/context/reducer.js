const reducer = (state, action) => {
  console.log("reducer check =>>", action);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("user", action.payload.data.user.id);
      localStorage.setItem("isAdmin",action.payload.data.user.isAdmin);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        user: action.payload.data.user,
        isAdmin:action.payload.data.user.isAdmin,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
       
      };
    default:
      return state;
  }
};

export default reducer;
