import { createContext } from "react";

export const MessageContext = createContext({});

export const initState = {
  type: '',
  title: '',
  content: ''
}

export const MessageReducer = (state, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return {
        ...action.payload
      }
    case 'CLEAR_MESSAGE':
      return {
        ...initState
      }  
    default:
      return state;
  }
}

export function handleSuccessMessage(dispatch, res) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '成功',
      content: res.data.message
    }
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }, 3000);
}

export function handleErrorMessage(dispatch, error) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      content: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join('、')
        : error?.response?.data?.message
    }
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }, 3000);  
}

export function checkoutErrorMessage(dispatch, error) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      content: error?.response?.data?.message
    }
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }, 3000);
}