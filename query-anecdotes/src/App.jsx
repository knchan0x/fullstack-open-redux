import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, updateAnecdote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  NotificationContextProvider,
  useNotificationDispatch,
} from "./NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({ mutationFn: updateAnecdote });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(["anecdotes"]);
          queryClient.setQueryData(
            ["anecdotes"],
            anecdotes.map((anecdote) =>
              anecdote.id === newAnecdote.id ? newAnecdote : anecdote
            )
          );
        },
      }
    );
    dispatch({
      type: "SET_MESSAGE",
      payload: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAN_MESSAGE",
      });
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
