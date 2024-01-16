// src/utils/fetchModelOptions.js

const fetchModelOptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/management/model_list');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching model options failed:", error);
      throw error; // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
    }
  };
  
  export default fetchModelOptions;
  