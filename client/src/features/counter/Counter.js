// React Component that uses Redux State and Actions
// Now we can use the React-Redux hooks to let React components interact with the Redux store.
// We can read data from the store with useSelector, and dispatch actions using useDispatch.
// Create a src/features/counter/Counter.js file with a <Counter> component inside, then import
// that component into App.js and render it inside of <App>.

// Any time you click the "Increment" and "Decrement buttons:
// - The corresponding Redux action will be dispatched to the store
// - The counter slice reducer will see the actions and update its state
// - The <Counter> component will see the new state value from the store and re-render itself with the new data
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./counterSlice";

export function Counter() {
  // const count = useSelector((state) => state.counter.value);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
