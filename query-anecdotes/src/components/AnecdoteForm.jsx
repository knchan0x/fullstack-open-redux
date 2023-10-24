import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../requests";

import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, id: getId(), votes: 0 },
      {
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(["anecdotes"]);
          queryClient.setQueryData(
            ["anecdotes"],
            anecdotes.concat(newAnecdote)
          );
          dispatch({
            type: "SET_MESSAGE",
            payload: `anecdote '${content}' created`,
          });
          setTimeout(() => {
            dispatch({
              type: "CLEAN_MESSAGE",
            });
          }, 5000);
        },
        onError: (error) => {
          dispatch({
            type: "SET_MESSAGE",
            payload: `${error.response.data.error}`,
          });
          setTimeout(() => {
            dispatch({
              type: "CLEAN_MESSAGE",
            });
          }, 5000);
        }
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
