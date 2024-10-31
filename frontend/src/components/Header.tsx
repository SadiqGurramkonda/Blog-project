import { useEffect, useRef } from "react";
import { Button } from "./Auth";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/blogs";

export const Header = () => {
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const userDetails:any = useRecoilValue(currentUserState);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      //@ts-ignore
      dropdownRef.current.classList.toggle("hidden");
    }
  };

  const handleClickOutside = (e: any) => {
    if (
      dropdownRef.current &&
      //@ts-ignore
      !dropdownRef.current.contains(e.target) &&
      avatarRef.current &&
      //@ts-ignore
      !avatarRef.current.contains(e.target)
    ) {
      //@ts-ignore
      dropdownRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-between px-2 py-2 border-b">
        <div className="flex flex-col justify-center font-black text-xl">
          <Link to={"/blogs"}>MEDIUM</Link>
        </div>
        <div className="flex">
          <div className="mr-8">
            <Link to={"/publish"}>
              <Button onClick={() => {}} label="Create" />
            </Link>
          </div>
          <div className="flex flex-col justify-center relative">
            <button onClick={toggleDropdown} ref={avatarRef}>
              <Avatar name="SDQ" size="big"></Avatar>
            </button>
            {
              <div
                ref={dropdownRef}
                id="dropdownAvatar"
                className="absolute right-0 z-10  mt-72 bg-gray-800  divide-y divide-gray-700 rounded-lg shadow-sm w-44 hidden"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{userDetails.username}</div>
                  <div className="font-medium truncate">{userDetails.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <li>
                    <Link
                      to="/blogs"
                      className="block px-4 py-2 hover:bg-gray-600 text-gray-300 hover:text-white"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myBlogs"
                      className="block px-4 py-2  hover:bg-gray-600 text-gray-300 hover:text-white"
                    >
                      My Blogs
                    </Link>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 text-gray-300 hover:text-white"
                    >
                      Earnings
                    </a>
                  </li> */}
                </ul>
                <div className="py-2 min-w-full">
                  <Link to={"signin"}>
                    <button
                      className="block px-4 py-2 text-sm min-w-full text-left  hover:bg-gray-600 text-gray-300 hover:text-white"
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                      >
                      Sign out
                    </button>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
