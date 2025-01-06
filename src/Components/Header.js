import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constant";
import { removeGptMovieResult, updateGpt } from "../utils/chatGptSlice";
import { updateLangage } from "../utils/langSlice";

const Header = () => {
  const selectedLang = useSelector((store) => store.language.lang);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isChatgpt = useSelector((store) => store.chatgpt.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

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
  useEffect(() => {
    if (!isChatgpt) {
      dispatch3(removeGptMovieResult());
    }
  }, [isChatgpt, dispatch3]);

  return (
    <div
      className={`fixed w-full top-0 z-10 flex justify-between items-center px-5 py-2 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md h-14" : "bg-gradient-to-b from-black"
      }`}
    >
      <img
        className={`transition-all duration-300 ${
          isScrolled ? "w-20 sm:w-40 " : "w-24 sm:w-52 "
        }`}
        src={LOGO}
        alt='logo'
      />
      {user && (
        <div className='flex items-center gap-5 lg:gap-5'>
          {/* Mobile menu toggle */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>

          {/* Language selector and ChatGPT button */}
          <div className='hidden lg:flex gap-5 items-center'>
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
          </div>

          {/* User Avatar and SignOut Button */}
          <div className='relative cursor-pointer group '>
            <div className='flex items-center gap-4'>
              <img
                className=' h-5 sm:h-9 rounded-full'
                src={user.photoURL}
                alt='User Avatar'
              />
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
            </div>

            <div className='absolute invisible group-hover:visible w-48 bg-black py-2 px-3 text-gray-800 shadow-xl bg-opacity-90 rounded-md left-auto right-0'>
              <div className='flex items-center gap-3 py-2 font-semibold text-white hover:text-gray-400 cursor-pointer'>
                {/* Account Icon */}
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 14v4H8v-4m4 0V6m0 8h-4M3 3h18'
                  />
                </svg>
                <span>Account</span>
              </div>
              <div
                className='flex items-center gap-3 py-2 font-semibold text-white hover:text-gray-400 cursor-pointer'
                onClick={handleSignOut}
              >
                {/* Sign Out Icon */}
                <svg
                  className='h-5 w-5'
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
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Updated mobile menu without Sign Out */}
      {isMenuOpen && (
        <div className='lg:hidden fixed top-14 left-0 right-0 bg-black text-white p-5'>
          <div className='flex flex-col gap-4'>
            <select
              onChange={(e) => {
                handleSelect(e);
                setIsMenuOpen(false);
              }}
              value={selectedLang}
              className='bg-black text-white p-2 border border-gray-400 rounded-lg'
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.abbreviation} value={lang.abbreviation}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                handleGpt();
                setIsMenuOpen(false);
              }}
              className='border border-black px-3 h-12 rounded-md bg-red-500 font-semibold text-white'
            >
              {isChatgpt ? "Home" : "ChatGpt"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
