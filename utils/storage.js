import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MIM_TODO_TASKS';

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.log('Save Error:', error);
  }
};

export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Load Error:', error);
    return [];
  }
};