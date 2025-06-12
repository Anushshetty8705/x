import Addbox from './Addbox';
import React from 'react';
import Link from 'next/link';
export const metadata = {
  title: "Xtrack-Userpage",
  description: "tarck your expense",
icons: {
    icon: [
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};

const userpage = ({ params }) => {


  return (
    <>
      <nav className="nav bg-blue-950/40 rounded-2xl relative  text-white px-8 py-4 flex justify-between items-center w-full">

        <div className='font-semibold flex  justify-center items-center'>
          <img className='coi' width={40} src="./logo.gif" alt="" />

          <span className="t11 text-blue-300 text-4xl">
            X<span className="t22 text-white text-2xl">Track</span>
          </span>
        </div>


        <div className="nav t2 user flex items-center gap-10">
          <span className="text-lg params">Welcome {params.username}</span>
          <Link href={"/"}>
            <button
              type="button"
              className=" bu3 text-white text-lg bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2"
            >
              Log Out
            </button>
          </Link>
        </div>
      </nav>
        <Addbox username={params.username} />



    </>
  );
};

export default userpage;
