"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  async function onSubmit({ password, username }: FormValues) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, username }),
    });

    if (res.status !== 200) {
      console.log("Error");
      return;
    }

    res.headers.forEach((value, key) => {
      console.log(key, value);
    });

    const json = await res.json();
    setCookie("token", json.token, { maxAge: 60 * 60 * 24 * 7 });
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-white">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label htmlFor="username">Username</label>
        <input
          className="text-black"
          placeholder="MyUsername"
          {...register("username")}
        />
        <p className="text-red-400">
          {errors.username && errors.username.message}
        </p>
        <label htmlFor="password">Password</label>
        <input
          className="text-black"
          type="password"
          placeholder="MyPassword"
          {...register("password")}
        />
        <p className="text-red-400">
          {errors.password && errors.password.message}
        </p>
        <button type="submit">Sign in / Sign Up</button>
      </form>
    </div>
  );
}
