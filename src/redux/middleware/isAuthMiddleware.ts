import { removeUser, setUser } from '../users/slice';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const authListenerMiddleware = createListenerMiddleware();

let userLoggedIn = false;

authListenerMiddleware.startListening({
  actionCreator: setUser,
  effect: (action) => {
    if (!userLoggedIn) {
      toast.success(`Nice to see you ${action.payload.email}`);
      userLoggedIn = true;
    }
  },
});

authListenerMiddleware.startListening({
  actionCreator: removeUser,
  effect: () => {
    userLoggedIn = false;
  },
});
