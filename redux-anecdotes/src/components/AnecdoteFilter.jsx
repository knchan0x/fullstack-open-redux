import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
