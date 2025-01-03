import React from "react";
import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/broser");
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/");
        dispatch(removeUser());
      }
    });
    return () => unsubscribe(); // when my component will unmount
  }, []);

  return (
    <div className='absolute w-full pr-20  pl-32 bg-gradient-to-b from-black z-10  flex justify-between  items-center'>
      <img className='w-60' src={LOGO} alt='logo'></img>
      {user && (
        <div class='group relative cursor-pointer py-2'>
          <div class='flex items-center  space-x-5  px-4'>
            <a
              class='menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4 flex items-center'
              onClick=''
            >
              <img
                className='h-9 '
                src={user.photoURL}
                //   src='https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e'
              ></img>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='h-6 w-6 text-white'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </a>
          </div>

          <div class='invisible absolute z-50 flex w-full flex-col bg-black py-1 px-1 text-gray-800 shadow-xl group-hover:visible bg-opacity-80'>
            <div class='my-2 flex border-b border-gray-100 py-1 font-semibold text-white hover:text-gray-400 md:mx-2 cursor-pointer items-center '>
              <svg
                className='h-5 w-5 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5.121 17.804A10 10 0 1019.78 3.22a10 10 0 00-14.657 14.584L3 21l2.121-3.196z'
                />
              </svg>
              Account
            </div>
            <div
              class='my-2 flex border-b border-gray-100 py-1 font-semibold text-white hover:text-gray-400 md:mx-2 cursor-pointer items-center '
              onClick={handleSignOut}
            >
              <svg
                className='h-5 w-5 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 16l-4-4m0 0l-4-4m4 4h.01M7 8h10M7 12h10M7 16h10'
                />
              </svg>
              Sign Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
