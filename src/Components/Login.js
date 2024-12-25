import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [authError, setAuthError] = useState("");
  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
    setAuthError("");
  };
  // console.log("isSignIn state:", isSignIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i, "Invalid email Format")
        .required("Required"),
      name: isSignIn
        ? Yup.string().notRequired()
        : Yup.string().required("Required"),
      password: isSignIn
        ? Yup.string().required("Password Required")
        : Yup.string()
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .matches(/[^\w]/, "Password requires a symbol")
            .required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (!isSignIn) {
        //signup
        console.log("signup logic");
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: values.name,
              photoURL: "https://avatars.githubusercontent.com/u/152771807?v=4",
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
                setAuthError("");
                navigate("/broser");

                // ...
              })
              .catch((error) => {
                // An error occurred
                setAuthError(error.message);
                // ...
              });

            // ...
          })
          .catch((error) => {
            const errorCode = error.code.split("auth/")[1];
            setAuthError(errorCode);

            // ..
          });
      } else {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setAuthError("");
            navigate("/broser");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code.split("auth/")[1];
            setAuthError(errorCode);
          });
      }
      setSubmitting(false);
    },
  });
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='
https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IN-en-20241216-TRIFECTA-perspective_915a9055-68ad-4e81-b19a-442f1cd134dc_medium.jpg'
          alt='bg-img'
        ></img>
      </div>
      <div className='relative flex justify-center items-center '>
        <div
          className='h-[600px] w-[450px] bg-black bg-opacity-85  mt-36   shadow-lg shadow-stone-700 flex flex-col px-20'
          onClick={(e) => e.stopPropagation()}
        >
          <span className='font-bold text-4xl  pb-8 text-white pt-16'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </span>
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className='flex flex-col text-left w-[280px] gap-1 '
            >
              {isSignIn ? (
                ""
              ) : (
                <div>
                  <input
                    className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 w-[290px] text-white mb-4 ${
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
                className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 w-[290px] text-white ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-600 "
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
                <div className='text-red-600 text-sm'>
                  {formik.errors.email}
                </div>
              ) : null}

              <input
                className={`h-14 rounded-md border bg-zinc-900 bg-opacity-60 pl-5 mt-4 w-[290px] text-white  ${
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
                className={` mt-5 rounded-md h-9 bg-red-600 text-white w-[290px] ${
                  formik.isSubmitting ? "cursor-not-allowed" : " "
                }`}
                disabled={formik.isSubmitting}
              >
                {isSignIn ? "Sign In " : "Sign Up"}
              </button>
              {isSignIn ? (
                <div className='flex flex-col'>
                  <p className='text-gray-400 text-center w-[290px] mt-4'>OR</p>
                  <button className='h-9 bg-gray-500 bg-opacity-40 hover:bg-opacity-30 text-white w-[290px] mt-4'>
                    use a sign in code
                  </button>
                  <a
                    href='#'
                    className='text-white text-center hover:underline border-gray-400  mt-4'
                  >
                    Forget Password?
                  </a>{" "}
                </div>
              ) : (
                <div></div>
              )}
              <div>
                {isSignIn ? (
                  <p className='text-gray-400 mt-4'>
                    New to Netflix ?{" "}
                    <span
                      onClick={handleSignUp}
                      className='hover:underline  text-white'
                    >
                      Sign Up Now
                    </span>
                  </p>
                ) : (
                  <p className='text-gray-400 mt-4'>
                    Already have an Account ?{" "}
                    <span
                      onClick={handleSignUp}
                      className='hover:underline  text-white'
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
    </div>
  );
};

export default Login;
