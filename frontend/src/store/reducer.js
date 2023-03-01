const initialState = {
  token: "",
  username: "",
  displayName: "",
  loginState: 'ready',
  snackbarMessage: '',
  books: [],
  authors: [],
  selectedBook : {},
  selectedAuthor: {},
  authorsModuleTab: 'create',
  booksModuleTab: 'create',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loginState: 'loading', token: "" };
    case 'LOGIN_SUCCESS':
      return { ...state, loginState: 'success', token: action.payload.token, username: action.payload.username, displayName: action.payload.displayName };
    case 'LOGIN_FAILURE':
      return { ...state, loginState: 'failed', token: "", snackbarMessage: action.payload };
    case 'LOGOUT':
      return { ...state, loginState: 'ready', token: "", username: "", displayName: "" };
    case 'GET_BOOKS':
      return { ...state, books: action.payload };
    case 'GET_AUTHORS':
      return { ...state, authors: action.payload };
    case 'SELECT_BOOK':
      return { ...state, selectedBook: action.payload };
    case 'SELECT_AUTHOR':
      return { ...state, selectedAuthor: action.payload };
    case 'SELECT_CREATE_AUTHOR_TAB':
      return { ...state, authorsModuleTab: "create" };
    case 'SELECT_EDIT_AUTHOR_TAB':
      return { ...state, authorsModuleTab: "edit" };
    case 'SELECT_CREATE_BOOK_TAB':
      return { ...state, booksModuleTab: "create" };
    case 'SELECT_EDIT_BOOK_TAB':
      return { ...state, booksModuleTab: "edit" };
    case 'SELECT_LAST_AUTHOR':
      return { ...state, selectedAuthor: state.authors[state.authors.length]}
    case 'SELECT_LAST_BOOK':
      return { ...state, selectedBook: state.book[state.books.length]}
    default:
      return state;
  }
}

export default userReducer;