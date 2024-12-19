import axios from "axios";

const BASE_URL = "http://localhost:5114/api";

export const fetchComments = async (postId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/Comment/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add JWT token in the request
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
