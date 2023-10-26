"use client";
import { useEffect, useState } from "react";
import { CountryData } from "../(components)/GetCountry";
import CountryCard from "../(components)/CountryCard";

export default function Page() {
  const [countries, setCountries] = useState<Record<string, CountryData>>({});
  useEffect(() => {
    if (!window.localStorage.getItem("countries")) {
      return;
    }
    const countries = JSON.parse(
      window.localStorage.getItem("countries") || ""
    );

    console.log(countries);
    setCountries(countries);
  }, []);
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold text-white">Saved</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {Object.keys(countries).map((country) => (
          <CountryCard key={country} {...countries[country]} />
        ))}
      </div>
    </div>
  );
}
