import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const getCourse = async (courseId) => {
  const course = await axios.get(url + "courses/" + courseId);
  return course.data.data;
};
