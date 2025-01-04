import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constant";
import { updateGpt } from "../utils/chatGptSlice";
import { updateLangage } from "../utils/langSlice";
const Header = () => {
  const selectedLang = useSelector((store) => store.language.lang);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isChatgpt = useSelector((store) => store.chatgpt.value);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
        navigate("/error");
      });
  };
  const handleGpt = () => {
    dispatch1(updateGpt());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/broser");
      } else {
        navigate("/");
        dispatch(removeUser());
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleSelect = (e) => {
    dispatch2(updateLangage(e.target.value));
    console.log(e.target.value);
  };
  return (
    <div
      className={`fixed w-full top-0 z-10 flex justify-between items-center px-20 py-2 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md h-14" : "bg-gradient-to-b from-black"
      }`}
    >
      <img
        className={`transition-all duration-300 ${
          isScrolled ? "w-40 " : "w-52 "
        }`}
        src={LOGO}
        alt='logo'
      />
      {user && (
        <div className='flex gap-5 items-center'>
          <div>
            <select
              onChange={handleSelect}
              value={selectedLang}
              className='bg-black text-white p-2 border border-gray-400 rounded-lg'
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.abbreviation} value={lang.abbreviation}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGpt}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            onMouseLeave={() => setIsClicked(false)}
            className={`border border-black px-3 h-12 rounded-md bg-red-500 font-semibold text-white hover:bg-opacity-85 ${
              isClicked ? "scale-90" : "scale-100"
            }`}
          >
            {isChatgpt ? "Home" : "ChatGpt"}
          </button>
          <div className='group relative cursor-pointer py-2'>
            <div className='flex items-center space-x-5 px-4'>
              <a className='menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4 flex items-center'>
                <img className='h-9' src={user.photoURL} alt='User Avatar' />
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6 text-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </span>
              </a>
            </div>
            <div className='invisible absolute z-50 flex w-full flex-col bg-black py-1 px-1 text-gray-800 shadow-xl group-hover:visible bg-opacity-80'>
              <div className='my-2 flex border-b border-gray-100 py-1 font-semibold text-white hover:text-gray-400 md:mx-2 cursor-pointer items-center'>
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
                className='my-2 flex border-b border-gray-100 py-1 font-semibold text-white hover:text-gray-400 md:mx-2 cursor-pointer items-center'
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
        </div>
      )}
    </div>
  );
};

export default Header;
