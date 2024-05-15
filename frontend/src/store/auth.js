import { reactive, toRefs } from 'vue';

const state = reactive({
  user: null,
});

export const setUser = (user) => {
  console.log('Setting user:', user);
  state.user = user;
};


export const useUser = () => {
  return toRefs(state);
};

export const clearUser = () => {
  state.user.value = null;
};

export default {
  state,
  setUser,
  useUser,
  clearUser,
};
