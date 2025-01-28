import axios from "axios";

const fetchExternalData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export { fetchExternalData };
