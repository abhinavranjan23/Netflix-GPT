import React from "react";
import useFormHandle from "../utils/useformhandle";
import Header from "./Header";
import { BACKGROUNDIMAGE } from "../utils/constant";

const Login = () => {
  const { formik, isSignIn, authError, handleSignUp } = useFormHandle();
  return (
    <div className='relative min-h-screen'>
      <Header />
      <div className='absolute inset-0'>
        <img
          src={BACKGROUNDIMAGE}
          alt='bg-img'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='relative flex justify-center items-center min-h-screen'>
        <div
          className='h-auto sm:w-[400px] w-[450px] bg-black bg-opacity-85 mt-16 sm:mt-24 px-8 sm:px-8 py-8 sm:py-5 shadow-lg shadow-stone-700 flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          <span className='font-bold text-3xl sm:text-2xl pb-8 text-white text-center'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </span>
          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col text-left gap-4 w-full'
          >
            {isSignIn ? (
              ""
            ) : (
              <div>
                <input
                  className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 w-full text-white ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-600"
                      : ""
                  } `}
                  id='name'
                  name='name'
                  type='name'
                  placeholder='Enter Your Full Name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-red-600 text-sm'>
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            )}

            <input
              className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 w-full mt-4 text-white ${
                formik.touched.email && formik.errors.email
                  ? "border-red-600"
                  : ""
              } `}
              id='email'
              name='email'
              type='email'
              placeholder='Email or Phone Number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-600 text-sm'>{formik.errors.email}</div>
            ) : null}

            <input
              className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 mt-4 w-full text-white  ${
                formik.touched.password && formik.errors.password
                  ? "border-red-600"
                  : ""
              }`}
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-600 text-sm'>
                {formik.errors.password}
              </div>
            ) : null}

            {authError ? (
              <div className='text-red-600 text-sm'>{authError}</div>
            ) : null}

            <button
              type='submit'
              className={`mt-5 rounded-md h-9 bg-red-600 text-white w-full ${
                formik.isSubmitting ? "cursor-not-allowed" : " "
              }`}
              disabled={formik.isSubmitting}
            >
              {isSignIn ? "Sign In " : "Sign Up"}
            </button>

            {isSignIn ? (
              <div className='flex flex-col mt-4'>
                <p className='text-gray-400 text-center'>OR</p>
                <button className='h-9 bg-gray-500 bg-opacity-40 hover:bg-opacity-30 text-white mt-4 w-full'>
                  Use a sign in code
                </button>
                <a
                  href='#'
                  className='text-white text-center hover:underline mt-4'
                >
                  Forgot Password?
                </a>
              </div>
            ) : null}

            <div className='mt-4 text-center text-gray-400'>
              {isSignIn ? (
                <p>
                  New to Netflix?{" "}
                  <span
                    onClick={handleSignUp}
                    className='hover:underline text-white cursor-pointer'
                  >
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already have an Account?{" "}
                  <span
                    onClick={handleSignUp}
                    className='hover:underline text-white cursor-pointer'
                  >
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
