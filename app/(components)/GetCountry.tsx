"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CountryCard from "./CountryCard";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const schema = z.object({
  country: z.string(),
});

type FormValues = z.infer<typeof schema>;

type Currency = {
  name: string;
  symbol: string;
};

type CurrencyCode = string;

export type CountryData = {
  name: string;
  currencies?: Record<CurrencyCode, Currency>;
  population?: number;
  exchangeRates?: Record<CurrencyCode, number>;
};

export default function GetCountry() {
  const [searches, setSearches] = useState<CountryData[]>([]);
  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    console.log(data);
    const response = await fetch(
      `http://localhost:3000/api/name/${data.country}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      }
    );

    const json: CountryData = await response.json();
    console.log(json);
    setSearches([...searches, json]);
    reset();
  }

  function saveCountry(country: CountryData) {
    if (!window.localStorage.getItem("countries")) {
      window.localStorage.setItem(
        "countries",
        JSON.stringify({ [country.name]: country })
      );
    }
    const countries = JSON.parse(
      window.localStorage.getItem("countries") || ""
    );
    window.localStorage.setItem(
      "countries",
      JSON.stringify({ ...countries, [country.name]: country })
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold text-white">Get Country</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="countryName">Country name</label>
        <input
          className="text-black"
          id="countryName"
          type="text"
          {...register("country")}
        />
        <button type="submit">Send</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {searches.map((search) => (
          <div
            className="flex flex-col gap-4 justify-between"
            key={search.name}
          >
            <CountryCard {...search} />
            <button
              className="text-lg p-4 bg-green-200 hover:bg-green-100 rounded-lg text-black"
              onClick={() => saveCountry(search)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
