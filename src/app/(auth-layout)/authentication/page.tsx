"use client";

import React, { useState } from "react";
import Input from "@/components/Input";

import { useForm, SubmitHandler } from "react-hook-form";

import axios from "axios";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Link from "next/link";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const [variant, setVariant] = useState("login");
  const [isLoading, setIsLoading] = useState(true);

  const toggleVariant = () => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      variant === "login"
        ? {
            email: "",
            password: "",
          }
        : {
            name: "",
            email: "",
            password: "",
          },
  });

  const onSubmit: SubmitHandler<FormData> = async (info) => {
    if (variant === "register") {
      try {
        setIsLoading(!isLoading);
        await axios.post("/api/auth/registerUser", info);
        setIsLoading(!isLoading);
        router.push("/dashboard");
      } catch (error) {
        console.log("axios error: ", error);
      }
    }
    let res;
    if (variant === "login") {
      setIsLoading(!isLoading);
      res = await signIn("Credentials", {
        ...info,
        redirect: false,
      });
      if (res && res.ok) {
        setIsLoading(!isLoading);
        router.push("/dashboard");
      } else {
        console.log("Invalid credentials.");
      }
    }
  };

  return (
    <>
      <div className="relative h-screen w-full bg-[url('/images/authBg.jpg')] bg-no-repeat bg-center bg-fixed bg-cover overflow-y-auto">
        <div className="bg-black/50 w-full h-full">
          <nav className="px-12 py-5">
            <Link href="/">
              <div>
                <svg
                  viewBox="0 0 111 30"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="default-ltr-cache-1d568uk ev1dnif2 h-12"
                  fill="#E50914"
                >
                  <g>
                    <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
                  </g>
                </svg>
              </div>
            </Link>
          </nav>
          <div className="px-12 py-5 flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-lg rounded-md w-full">
              <h2 className="text-white text-[2.3rem] mb-8 font-semibold">
                {variant === "login" ? "Sign In" : "Create an account"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  {variant === "register" && (
                    <>
                      <Input
                        {...register("name", {
                          required: "Username is required",
                          validate: (value: string | undefined) => {
                            if (!value || value.length < 2) {
                              return "Username must be more than 1 character.";
                            }
                            return true;
                          },
                        })}
                        error={errors.name?.message}
                        id="name"
                        type="text"
                        label="Name"
                      />
                    </>
                  )}
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      validate: (value: string | undefined) => {
                        if (
                          !value ||
                          !value.match(
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                          )
                        ) {
                          return "Invalid email format.";
                        }
                        return true;
                      },
                    })}
                    error={errors.email?.message}
                    id="email"
                    type="email"
                    label="Email"
                  />
                  <Input
                    {...register("password", {
                      required: "Password is required",
                      validate: (value: string | undefined) => {
                        if (
                          !value ||
                          value.length < 8 ||
                          value.length > 20 ||
                          !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
                        ) {
                          return "Password must be between 8 and 20 character with at least one special";
                        }
                        return true;
                      },
                    })}
                    error={errors.password?.message}
                    id="password"
                    type="password"
                    label="Password"
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                  >
                    {variant === "login" ? (
                      isLoading ? (
                        "Login"
                      ) : (
                        <span className="loader">. . .</span>
                      )
                    ) : isLoading ? (
                      "Register"
                    ) : (
                      <span className="loader">. . .</span>
                    )}
                  </button>
                </div>
                <p className="text-neutral-500 mt-12">
                  {variant === "login"
                    ? "First time using Netflix?"
                    : "Already have an account?"}
                  <span
                    className="text-white ml-1 hover:underline cursor-pointer"
                    onClick={toggleVariant}
                  >
                    {variant === "register" ? " Sign In" : " Create an account"}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
