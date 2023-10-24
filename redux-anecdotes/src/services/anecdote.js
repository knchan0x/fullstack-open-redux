import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, asObject(anecdote));
  return response.data;
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);

  return response.data;
};

export default { getAll, create, update };
