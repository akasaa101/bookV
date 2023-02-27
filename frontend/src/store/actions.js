import axios from 'axios';

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});

export const loginSuccess = (token) => ({
  type: 'LOGIN_SUCCESS',
  payload: token
});

export const loginFailure = (message) => ({
  type: 'LOGIN_FAILURE',
  payload: message
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const selectBook = (book) => ({
  type: 'SELECT_BOOK',
  payload: book
});

export const selectAuthor = (author) => ({
  type: 'SELECT_AUTHOR',
  payload: author
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    return axios.post('http://127.0.0.1:4000/login', { username, password })
      .then(response => {
        dispatch(loginSuccess(response.data.token));
      })
      .catch(error => {
        dispatch(loginFailure(error.message));
        throw(error);
      });
  };
};

export const registerUser = (username, displayName, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    return axios.post('http://127.0.0.1:4000/register', { username, displayName, password })
      .then(response => {
        dispatch(loginSuccess(response.data.token));
      })
      .catch(error => {
        dispatch(loginFailure());
        throw(error);
      });
  };
};


export const getBooks = () => {
  return async (dispatch) => {
    return axios.get('http://127.0.0.1:4000/books')
      .then(response => {
        dispatch({
          type: 'GET_BOOKS',
          payload: response.data.books
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getAuthors = () => {
  return async (dispatch) => {
    return axios.get('http://127.0.0.1:4000/authors')
      .then(response => {
        dispatch({
          type: 'GET_AUTHORS',
          payload: response.data.authors
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};