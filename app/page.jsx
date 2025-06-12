'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';

import Image from 'next/image';


export default function Home() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const router = useRouter();
  const [error, seterror] = useState('')
  const [passwerror, setpasswerror] = useState('')
  const [ispassword, setispassword] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        toast('Lets start ', {

          style: {
            fontSize: '20px',
            borderRadius: '10px',
            background: 'blue',
            color: '#fff',
          },
          icon: '😊',
        });
      }, 100); // Avoid hydration mimdatch
    }
  }, []);
  const handlechangeuse = (e) => {
    const value = e.target.value
    setusername(value)
    if (value.length < 8) {
      seterror("* Username must be 8 charcters")
    }
    else {
      seterror("")
    }
  }
  const handlechangepass = (e) => {
    const value = e.target.value
    setpassword(value)
    if (value.length < 8) {
      setpasswerror("* Password must be 8 charcters")
    }
    else {
      setpasswerror("")
    }
  }


  const handleLogin = () => {
    let valid = true;

    if (username.length === 0) {
      seterror("* Username is required to login");
      valid = false;
    }

    if (password.length === 0) {
      setpasswerror("* Password is required to login");
      valid = false;
    }

    if (!valid) {
      toast.error('Please fill all fields', {
        icon: '😔',
        style: {
          fontSize: '18px',
          borderRadius: '10px',
          background: '#990000',
          color: '#fff',
          fontWeight: '600',
          padding: '12px 24px',
        },
      });
      return;
    }

    const toastId = toast.loading('Logging in...', {
      icon: '⏳',
      style: {
        fontSize: '20px',
        borderRadius: '10px',
        background: 'blue',
        color: '#fff',
        fontWeight: '600',
        padding: '12px 24px',
      },
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/login", requestOptions) // update endpoint here
      .then((response) => response.json())
      .then((result) => {
          console.log("Login API Response:", result);
        toast.dismiss(toastId);

        if (result.error === false) {
          setusername('');
          setpassword('');
          seterror('');
          setpasswerror('');
          toast.success('Login successful!', {
            icon: '✅',
            style: {
              fontSize: '18px',
              borderRadius: '10px',
              background: '#22c55e',
              color: '#fff',
              fontWeight: '600',
              padding: '12px 24px',
            },
          });
          router.push(`/${username}`); // or home page
        } else {
          toast.error(result.message || "Login failed", {
            icon: '😔',
            style: {
              fontSize: '18px',
              borderRadius: '10px',
              background: '#990000',
              color: '#fff',
              fontWeight: '600',
              padding: '12px 24px',
            },
          });
        }
      })
      .catch((error) => {
        toast.dismiss(toastId);
        console.error(error);
        toast.error("Server error");
      });
  };

  const showpassword = () => {
    if (!ispassword) {
      setispassword(true)
    }
    else {
      setispassword(false)
    }
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="  flex ">
        <Image
          className="rounded-3xl relative  hide bg-blue-900/20  my-auto mx-35 h-[82vh]"
          src="/home.png"
          width={500}
          height={500}
          alt="home"
        />
        <div className=' box p-10 rounded-3xl relative  m-20 mr-35  flex items-center justify-center flex-col bg-blue-900/20'>
          <div className="logo mb-10 flex">
            <img className="coin" width={80} src="./logo.gif" alt="" />
            <span className="t1 text-blue-300 text-6xl ">
              X<span className="t2 text-white font-semibold  text-3xl">Track</span>
            </span>

          </div>
          <div className="mb-10 t text-center">
            <span className="t text-white text-2xl ">
              "Every rupee counts — <span className=" t text-blue-300">let’s track it wisely"</span>
            </span>
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <input
              className="input logo text-white w-full rounded-xl mb-3 focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => handlechangeuse(e)}
            />
            <div className='error text-red-500 w-80  font-medium mb-5 mr-30'>{error}</div>
            <div className='relative w-full'>
              <input
                className="input i1 logo  text-white  w-full mb-3 rounded-xl focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
                type={ispassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => handlechangepass(e)}
              />

              <img className='lview  invert-75  absolute top-2 left-98' width={32} src={ispassword ? './view.png' : './hide.png'} alt="" onClick={() => showpassword()} />
            </div>

            <div className='error text-red-500 w-80  font-medium mb-5 mr-30'>{passwerror}</div>

          </div>
          <div className="items-center justify-center flex flex-col ">
            <button
              onClick={(e) => handleLogin(e)}
              type="button"
              className=" bu logo text-white  text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center me-2 mb-10 "
            >
              Log In
            </button>
            <div className="ti logo w-full">
              <span className='text-white t text-xl ml-8 opacity-60 '>To Join <span className='t text-blue-300 t text-3xl'>X</span><span className='text-white text-xl t'>Track </span>family</span>
              <Link href={"/sign"}> <button
                type="button"
                className="bu bu1 logo text-white text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center ml-4 me-2 mb-2"  >
                Sign In
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
