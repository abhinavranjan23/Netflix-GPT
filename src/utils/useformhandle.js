import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

const useFormHandle = () => {
  const dispatch = useDispatch();
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
                // navigate("/broser");

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
            // navigate("/broser");
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
  return { formik, isSignIn, authError, handleSignUp };
};
export default useFormHandle;
