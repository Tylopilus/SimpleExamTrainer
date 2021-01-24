import isEqual from 'lodash.isequal';
import React, { useEffect, useState } from 'react';

import { IData } from '#components/App/App';

export function Card(props: {
  data: IData;
  number: number;
  selection: (score: boolean) => void;
  calculated: boolean;
}): JSX.Element {
  const { data, number, selection, calculated } = props;

  const [incorrect, setIncorrect] = useState(false);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    selection(incorrect);
  }, [incorrect]);

  useEffect(() => {
    const res: string[] = [];
    Object.keys(selected).forEach((key) => {
      if (selected[key]) res.push(key);
    });
    setIncorrect(!isEqual(res, data.answers));
  }, [selected]);

  return (
    <div className="max-w-lg p-4 mx-auto bg-blue-200 border rounded-lg">
      <h1
        className={`text-xl font-bold
          ${calculated && incorrect ? 'text-red-500' : 'text-black'}`}
      >
        Question #{number + 1}:
      </h1>
      <pre className="pb-2 mt-2 font-sans whitespace-pre-wrap border-b border-gray-200 ">
        {data.question}
      </pre>
      <div className="mt-4 space-y-4">
        {data.options.map((sol, index) => (
          <div
            className={`flex items-center 
              ${
                calculated && data.answers.indexOf(index.toString()) >= 0
                  ? 'text-green-500'
                  : ''
              }`}
            key={index}
          >
            {data.answers.length > 1 ? (
              <input
                type="checkbox"
                id={index.toString() + number}
                name={data.question}
                value={sol}
                onClick={(e: React.SyntheticEvent<HTMLInputElement>) => {
                  setSelected((oldSelect) => ({
                    ...oldSelect,
                    [index]: (e.target as HTMLInputElement).checked,
                  }));
                }}
              />
            ) : (
              <input
                type="radio"
                id={index.toString() + number}
                name={data.question}
                value={sol}
                onClick={(e) =>
                  setSelected({
                    [index]: (e.target as HTMLInputElement).checked,
                  })
                }
              />
            )}

            <label htmlFor={index.toString() + number} className="ml-2">
              <pre className="font-sans whitespace-pre-wrap">{sol}</pre>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
