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

export const selectLastAuthor = () => ({
  type: 'SELECT_LAST_AUTHOR',
});
export const selectLastBook = () => ({
  type: 'SELECT_LAST_BOOK',
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
export const openCreateAuthorTab = () => ({
  type: 'SELECT_CREATE_AUTHOR_TAB'
});
export const openEditAuthorTab = () => ({
  type: 'SELECT_EDIT_AUTHOR_TAB'
});
export const openCreateBookTab = () => ({
  type: 'SELECT_CREATE_BOOK_TAB'
});
export const openEditBookTab = () => ({
  type: 'SELECT_EDIT_BOOK_TAB'
});

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

export const postAuthor = (name) => {
  return async (dispatch) => {
    return axios.post('http://127.0.0.1:4000/authors', { name } )
      .then(response => {
        if(response.status===201){
          dispatch(getAuthors());
          dispatch(selectAuthor(response.data.author))
          }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const putAuthor = (id, name) => {
  return async (dispatch) => {
    return axios.put('http://127.0.0.1:4000/authors/'+id , { name } )
      .then(response => {
        if(response.status===200)
          dispatch(getAuthors());
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const postBook = (token, authorId, title, description, isbn) => {
  return async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const data = { authorId, title, description, isbn };
    return axios.post('http://127.0.0.1:4000/books', data, config )
      .then(response => {
        if(response.status===201){
          dispatch(getBooks());
          dispatch(selectBook(response.data.book))
          }
      })
      .catch(error => {
        throw(error);
      });
  };
};