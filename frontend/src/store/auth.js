import { reactive, toRefs } from 'vue';

const state = reactive({
  user: null,
});

// Initialize user state from local storage or session storage
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
  state.user = storedUser;
}

export const setUser = (user) => {
  console.log('Setting user:', user);
  state.user = user;
  // Save user information to local storage or session storage
  localStorage.setItem('user', JSON.stringify(user));
};

export const useUser = () => {
  return toRefs(state);
};

export const clearUser = () => {
  state.user = null;
  // Clear user information from local storage or session storage
  localStorage.removeItem('user');
};

export default {
  state,
  setUser,
  useUser,
  clearUser,
};
