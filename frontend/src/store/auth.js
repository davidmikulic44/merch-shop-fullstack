import { reactive, toRefs } from 'vue';
import axios from 'axios';

const state = reactive({
  user: null,
});

const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
  state.user = storedUser;
}

export const setUser = (user) => {
  state.user = user;
  localStorage.setItem('user', JSON.stringify(user));
};

export const useUser = () => {
  return toRefs(state);
};

export const clearUser = () => {
  state.user = null;
  localStorage.removeItem('user');
};

export const loginUser = async (email, password, router) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed: Invalid response");
    }

    const token = response.data.token;
    localStorage.setItem("token", token);
    const userInfoResponse = await axios.get(
      `http://localhost:3000/auth/user/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (userInfoResponse.status !== 200) {
      throw new Error("Login failed: Invalid user info response");
    }

    const userInfo = userInfoResponse.data;
    setUser(userInfo);
    router.push("/");

  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

export default {
  state,
  setUser,
  useUser,
  clearUser,
  loginUser,
};
