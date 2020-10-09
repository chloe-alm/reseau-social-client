const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
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
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
