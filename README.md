# Simple data fetching
In order to fetch the data, you need to pass a Promise returning function as a first argument to usePromise hook. It will return you back response related payload such as resolved data, request status or the error if it exists.

resolve option is used to initiate data fetching when component mounts.

```javascript
import React from "react";
import { usePromise } from "promise-hook";

const Movies = () => {
  const { isLoading, data } = usePromise(fetchMovies, { resolve: true });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {data.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

const fetchMovies = () =>
  fetch(`http://your-amazing-api.com/movies`).then(res => res.json());```
