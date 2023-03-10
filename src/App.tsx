import { number } from "prop-types";
import { useState, useEffect } from "react";
import "./App.css";

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await res.text();

  throw new Error("Auxilio!");
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getRandomNumberFromApi()
      .then((num) => setNumber(num))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div className="App App-header">
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Número Aleatorio: {number} </h2>
      )}
      {!isLoading && error && <h3>{error}</h3>}
    </div>
  );
};
