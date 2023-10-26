import { useForm } from "react-hook-form";
import { CountryData } from "./GetCountry";
import Converter from "./Converter";

export default function CountryCard({
  name,
  currencies,
  population,
  exchangeRates,
}: CountryData) {
  function convert(sek: number, rate: number) {
    return sek * rate;
  }
  const { register, handleSubmit, setValue } = useForm<{
    amount: number;
    rate: number;
    result: number;
  }>();

  async function onSubmit(data: {
    amount: number;
    rate: number;
    result: number;
  }) {
    console.log(data);
    data.result = convert(data.amount, data.rate);
  }

  return (
    <div className="text-white flex flex-col p-8 gap-4 rounded-lg border h-full">
      <h3 className="text-xl">{name}</h3>
      <p>Population: {population}</p>
      <div className="">
        Currencies:
        {currencies &&
          Object.keys(currencies).map((currency) => (
            <ul key={currency}>
              {currencies && currencies[currency] && (
                <li>
                  <p>Name: {currencies[currency].name}</p>
                  <p>Symbol: {currencies[currency].symbol}</p>
                  {exchangeRates && (
                    <p>Rate from SEK: {exchangeRates[currency]}</p>
                  )}
                </li>
              )}
              <p>Code: {currency}</p>
              {exchangeRates && (
                <Converter
                  rate={exchangeRates[currency] || 0}
                  currency={currency}
                />
              )}
            </ul>
          ))}
      </div>
    </div>
  );
}
