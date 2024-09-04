"use client";

import { useAuthenticationContext } from "@/components/Providers/AuthenticationProvider/AuthenticationContext";
import { emailValidate, passwordValidate } from "@/helpers/validate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFormErrors, setEmailFormErrors] = useState("");
  const [passwordFormErrors, setPasswordFormErrors] = useState("");

  const { login } = useAuthenticationContext();

  const validate = () => {
    const emailError = emailValidate(email)
    const passwordError = passwordValidate(password)

    emailError && setEmailFormErrors(emailError)
    passwordError && setPasswordFormErrors(passwordError)
    return !emailError && !passwordError
  }

  const onSubmit = async () => {
    if (!validate()) return 
    await login({
      email,
      password,
    });
  };

  return (
    <div>
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="relative hidden h-[590px] overflow-hidden lg:block">
            <Image
              priority
              src="/loginFrame.png"
              alt="instagram"
              height={635}
              width={465}
            />
            <picture>
              <img src="/loginFrame.png" alt="instagram" />
            </picture>
            <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative ">
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">
                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
                  <Image
                    src="/loginImg4.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] py-4">
              <h1 className="text-2xl font-medium text-center">Social Media</h1>
            </div>
            <div className="w-full px-5 sm:px-10">
              <form
                className="signInPageFormContainer"
                onSubmit={
                  (e: any) => {}
                }
              >
                <label htmlFor="signInPageEmail">
                  <input
                    className=" w-full min-w-[260px] border rounded-[3px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                {!!emailFormErrors && (
                  <p className="h-[20px] max-w-[260px] pb-2 text-[10px] text-red-600">
                    {emailFormErrors}
                  </p>
                )}
                <label htmlFor="signInPagePassword">
                  <input
                    className="w-full min-w-[260px] border mt-1 rounded-[3px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                {!!passwordFormErrors && (
                  <p className="h-[20px] max-w-[260px] text-[10px] text-red-600">
                    {passwordFormErrors}
                  </p>
                )}
                <button
                  className={`${
                    emailFormErrors === "" && passwordFormErrors === ""
                      ? "bg-[#0095f6]"
                      : "pointer-events-none cursor-default bg-[#abddff]"
                  } my-5 w-full rounded-[4px]  px-2 py-2 text-sm font-semibold text-white rounded-[8px]`}
                  type="button"
                  onClick={() => onSubmit()}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
          <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Do not have an account?</p>
            <button
              className="ml-1 font-semibold text-[#0095f6]"
              type="button"
              onClick={() => router.push("/sign-up")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
