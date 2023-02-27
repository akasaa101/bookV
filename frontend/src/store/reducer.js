const initialState = {
  token: "",
  loginState: 'ready',
  snackbarMessage: '',
  books: [],
  authors: [],
  selectedBook : {},
  selectedAuthor: {}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loginState: 'loading', token: "" };
    case 'LOGIN_SUCCESS':
      return { ...state, loginState: 'success', token: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loginState: 'failed', token: "", snackbarMessage: action.payload };
    case 'LOGOUT':
      return { ...state, loginState: 'ready', token: "" };
    case 'GET_BOOKS':
      return { ...state, books: action.payload };
    case 'GET_AUTHORS':
      return { ...state, authors: action.payload };
    case 'SELECT_BOOK':
      return { ...state, selectedBook: action.payload };
    case 'SELECT_AUTHOR':
      return { ...state, selectedAuthor: action.payload };
    default:
      return state;
  }
}

export default userReducer;