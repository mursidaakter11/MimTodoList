
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'MIM_TODO_USERS';
const SESSION_KEY = 'MIM_TODO_SESSION';

const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@mimtodo.com',
  password: '123456',
};

export const initializeAuth = async () => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);

    if (!users) {
      await AsyncStorage.setItem(
        USERS_KEY,
        JSON.stringify([demoUser])
      );
    }
  } catch (error) {
    console.log('Initialize Error:', error);
  }
};

export const signup = async (name, email, password) => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    const users = data ? JSON.parse(data) : [demoUser];

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: 'Email already registered!',
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password,
    };

    users.push(newUser);

    await AsyncStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};

export const login = async (email, password) => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    const users = data ? JSON.parse(data) : [demoUser];

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password!',
      };
    }

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    return {
      success: true,
      user: session,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Login failed!',
    };
  }
};

export const getSession = async () => {
  try {
    const session = await AsyncStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};
