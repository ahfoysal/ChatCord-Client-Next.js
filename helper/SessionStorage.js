// Get data from sessionStorage
export const getDataFromSessionStorage = (key) => {
    try {
      const value = sessionStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Set data to sessionStorage
  export const setDataToSessionStorage = (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      sessionStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  
  // Remove data from sessionStorage
  export const removeDataFromSessionStorage = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  