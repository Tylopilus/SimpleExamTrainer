import React, { useEffect, useState } from 'react';
import Card from './card';
import data from '#src/questions/baking101.json';

export interface IData {
  question: string;
  options: string[];
  answers: string[];
}

export function App(): JSX.Element {
  const [answer, setAnswer] = useState<{
    [key: number]: boolean;
  }>({});
  const [score, setScore] = useState<number>(0);
  const [calculated, setCalculated] = useState<boolean>(false);

  useEffect(() => {
    console.log(`score is: ' ${score}`);
  }, [score]);

  function clickHandler() {
    Object.keys(answer).forEach((_, index) => {
      if (!answer[index]) {
        setScore((oldScore) => oldScore + 1);
      }
    });

    console.log(answer);
    setCalculated(true);
  }
  return (
    <div className="container mx-auto font-sans antialiased">
      <h1 className="mt-4 text-3xl text-center">{data.title}</h1>
      <div className="mt-8 space-y-4">
        {data.questions?.map((d, index) => (
          <Card
            selection={(res: boolean) => {
              // console.log(index, res);
              // setAnswer((oldanswer) => [...oldanswer, res]);
              setAnswer((oldAnswer) => ({ ...oldAnswer, [index]: res }));
            }}
            data={d}
            number={index}
            key={index}
            calculated={calculated}
          />
        ))}
      </div>
      {calculated && (
        <div className="block mx-auto mt-4 text-2xl text-center">
          Your score is: {score}/{data.questions.length}
        </div>
      )}
      <button
        className="block px-4 py-2 mx-auto mt-4 bg-blue-200 border border-blue-300 rounded-lg hover:bg-blue-100 disabled:opacity-10"
        onClick={clickHandler}
        type="button"
        disabled={calculated}
      >
        Check Answers
      </button>
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </div>
  );
}
