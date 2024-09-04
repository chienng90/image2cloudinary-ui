"use client";

import { useAuthenticationContext } from "@/components/Providers/AuthenticationProvider/AuthenticationContext";
import { emailValidate, passwordValidate, usernameValidate } from "@/helpers/validate";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SignUpForm {
  fullname: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailFormErrors, setEmailFormErrors] = useState("");
  const [passwordFormErrors, setPasswordFormErrors] = useState("");
  const [usernameFormErrors, setUsernameFormErrors] = useState("");

  const router = useRouter();

  const { register } = useAuthenticationContext()

  const validate = () => {
    const emailError = emailValidate(email)
    const passwordError = passwordValidate(password)
    const usernameError = usernameValidate(username)

    emailError && setEmailFormErrors(emailError)
    passwordError && setPasswordFormErrors(passwordError)
    usernameError && setUsernameFormErrors(usernameError)
    return !emailError && !passwordError && !usernameError
  }

  const onSubmit = async () => {
    if (!validate()) return 
    await register({
      email,
      password,
      fullname: username,
    });
  };

  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
      <div>
        <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
          <div className="h-auto w-[175px] pt-10 pb-5">
            <h1 className="text-2xl font-medium text-center">Social Media</h1>
          </div>
          <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
            <p>Sign up to see photos and videos from your friends.</p>
          </div>
          <div className="w-full px-10">
            <form
              action=""
              className="signInPageFormContainer"
              onSubmit={
                (e: any) => {}
              }
            >
              <label htmlFor="signInPageUserName">
                <input
                  className="w-full mt-1 border rounded-[3px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                  type="text"
                  id="signInPageUserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Full Name"
                />
              </label>
              {!!usernameFormErrors && (
                <p className="h-[30px] text-[10px] text-red-600">
                  {usernameFormErrors}
                </p>
              )}
              <label htmlFor="signInPageEmail">
                <input
                  className=" w-full mt-1 border rounded-[3px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                  type="email"
                  id="signInPageEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </label>
              {!!emailFormErrors && (
                <p className="h-[20px] pb-2 text-[10px] text-red-600">
                  {emailFormErrors}
                </p>
              )}
              <label htmlFor="signInPagePassword">
                <input
                  className="w-full mt-1 border rounded-[3px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                  type="password"
                  id="signInPagePassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </label>
              {!!passwordFormErrors && (
                <p className="h-[20px] text-[10px] text-red-600">
                  {passwordFormErrors}
                </p>
              )}
              <button
                className={`${
                  emailFormErrors === "" && passwordFormErrors === ""
                    ? "bg-[#0095f6]"
                    : "pointer-events-none cursor-default bg-[#abddff]"
                } my-5 w-full rounded-[4px] rounded-[8px] px-2 py-2 text-sm font-semibold text-white`}
                type="button"
                onClick={() => onSubmit()}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
          <p>Have an account?</p>
          <button
            className="ml-1 font-semibold text-[#0095f6]"
            type="button"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
