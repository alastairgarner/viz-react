import { useEffect, useState, useRef } from "react";
import { MutableRefObject } from "react";

// https://wattenberger.com/blog/react-and-d3

// interface SavedCallback extends MutableRefObject<undefined> {
//   current?: Function;
// }

const useInterval = (callback: Function, delay: number) => {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef<Function | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const generateDataset = () => {
  return Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
};

export const RandomCircles = () => {
  const [dataset, setDataset] = useState(generateDataset());

  useInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);

  return (
    <svg viewBox="0 0 100 50">
      {dataset.map(([x, y], i) => (
        <circle cx={x} cy={y} r="3" fill="pink" />
      ))}
    </svg>
  );
};
