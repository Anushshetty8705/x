'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
const SignPage = () => {
  const router = useRouter();
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [Phone, setPhone] = useState('')
  const [usererror, setusererror] = useState('')
  const [passwerror, setpasswerror] = useState('')
  const [emailerror, setemailerror] = useState('')
  const [phoneerror, setphoneerror] = useState('')
  const [ispassword, setispassword] = useState(false)
  const handleuser = (e) => {
    const value = e.target.value;
    setusername(value)
    if (value.length < 8) {
      setusererror("* Username must be 8 characters")
    }
    else {
      setusererror("")
    }
  }
  const handlepass = (e) => {
    const value = e.target.value;
    setpassword(value)
    if (value.length < 8) {
      setpasswerror("* Password must be 8 characters")
    }
    else {
      setpasswerror("")
    }
  }
  const handleemail = (e) => {
    const value = e.target.value;
    setemail(value)
    if (value.length < 8) {
      setemailerror("* Email must be 8 characters")
    }
    else {
      setemailerror("")
    }
  }

  const showpassword = () => {
    if (!ispassword) {
      setispassword(true)
    }
    else {
      setispassword(false)
    }
  }

  const handlephone = (e) => {
    const value = e.target.value;
    setPhone(value)

      if (isNaN(value)) {
    setphoneerror("* Enter a valid number");
  } else if (value.length !== 10) {
    setphoneerror("* Number must be exactly 10 digits");
  } else {
    setphoneerror("");
  }
  }



  const handlesigin = (e) => {
    e.preventDefault();

    let valid = true;

    if (username.length === 0) {
      setusererror("* Username is required to sign up");
      valid = false;
    }
    if (password.length === 0) {
      setpasswerror("* Password is required to sign up");
      valid = false;
    }

    if (email.length === 0) {
      setemailerror("* Email is required to sign up");
      valid = false;
    }

    if (Phone.length === 0) {
      setphoneerror("* Phone No is required to sign up");
      valid = false;
    }
    else if (isNaN(Phone)) {
      setphoneerror("* Enter valid number");
      valid = false;
    }
    if (!valid) return; // stop if any validation fails

    // If all valid, proceed with toast and redirect
    const toastId = toast.loading('Signing.....', {
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
      "username": username,
      "password": password,
      "phone":Phone,
      "email":email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/sign", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        toast.dismiss(toastId);

    if (result.error === "false") {
      toast.success('Signing successfully!', {
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
      router.push(`/`);
    } else {
      toast.error(result.message || "Signup failed", {
        icon: '😔',
        style: {
          fontSize: '18px',
          borderRadius: '10px',
          background: '#990000 ',
          color: '#fff',
          fontWeight: '600',
          padding: '12px 24px',
        },
      });
    }
      })
      .catch((error) => console.error(error));

  
  };


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container box w-150 good mx-auto bg-blue-900/20 mt-8 rounded-4xl ">
        <div className="items-center flex flex-col logo">
          <div className="t t4 my-3 flex">
            <img className='coin' width={80} src="./logo.gif" alt="" />
            <span className="text-blue-300  t1 text-6xl ">
              X<span className="text-white  t2 font-semibold text-3xl">Track</span>
            </span>

          </div>
        </div>
        <div className="logo">
          <div className="t m logo text-white text-lg mx-15 mb-2">Enter your username</div>
          <input
            className="input m logo text-white ml-20 w-4/5 mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type='text'
            placeholder="Enter username"
            value={username}
            onChange={(e) => handleuser(e)}
          />
          <div className='error text-red-500 w-80  font-medium ml-22 mb-1'>{usererror}

          </div>
          <div className="t m logo text-white text-lg mx-15 mb-2">Enter your Password</div>
          <div className="relative">
            <input
              className="input m logo text-white ml-20 w-4/5 mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
              type={ispassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => handlepass(e)}
            />
            <img className='view invert-75 absolute top-2 left-[85%]' width={32} src={ispassword ? './view.png' : './hide.png'} alt="" onClick={() => showpassword()} />
          </div>
          <div className='error text-red-500 w-80  font-medium ml-22 mb-1'>{passwerror}</div>
          <div className="t m logo text-white text-lg mx-15 mb-3">Enter your Phone Number</div>
          <input
            className="input m logo text-white ml-20 w-4/5 mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type="text"
            placeholder="Enter Phone Number"
            value={Phone}
            onChange={(e) => handlephone(e)}

          />
          <div className='error text-red-500 w-80  font-medium ml-22 mb-1'>{phoneerror}</div>

          <div className="t m logo text-white text-lg mx-15 mb-2">Enter your Email</div>
          <input
            className="input m logo text-white ml-20 w-4/5 mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleemail(e)}


          />
          <div className='error text-red-500 w-80  font-medium ml-22 mb-5'>{emailerror}</div>

          <div className="flex items-center justify-center">
            <button
              onClick={(e) => handlesigin(e)}
              type="button"
              className="bu bu1  text-white text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2 text-center ml-8 me-2 mb-8"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPage;
