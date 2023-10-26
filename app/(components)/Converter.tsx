import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Converter({
  rate,
  currency,
}: {
  rate: number;
  currency: string;
}) {
  const [result, setResult] = useState<{ input: number; result: number }>({
    input: 1,
    result: 1 * rate,
  });
  const { register, handleSubmit } = useForm<{
    amount: number;
    rate: number;
  }>();
  function onSubmit(data: { amount: number }) {
    console.log(data);
    setResult({ input: data.amount, result: data.amount * rate });
  }
  return (
    <div className="p-8 flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("amount")}
          type="number"
          placeholder="Amount in SEK"
        />
        <button type="submit">Convert</button>
      </form>
      <p>
        {result.input} SEK is {result.result} {currency}
      </p>
    </div>
  );
}
