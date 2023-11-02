import React, { useState,useCallback,useEffect,useRef } from 'react'

function PassGenerator() {
    const[length,setLength]=useState(8)
    const[noAllowed,setNoAllowed]=useState(false)
    const[charAllowed,setCharAllowed]=useState(false)
    const[password,setPassword]=useState("")

    //ref hook
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback( ()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(noAllowed){
            str+="0123456789"
        }
        if(charAllowed){
            str+="~!@#$%^&*(){}[]`="
        }
        for(let i=1;i<=length;i++){
            let char = Math.floor(Math.random() * str.length +1)
            pass += str.charAt(char)
        }
        setPassword(pass)
    } ,[length,noAllowed,charAllowed,setPassword])

    useEffect(()=>{
        passwordGenerator()
    },[length,noAllowed,charAllowed,passwordGenerator])

    const copyPassToClip = useCallback(()=>{
        passwordRef.current?.select();
        //to select any range of input 
        // passwordRef.current?.setSelectionRange(0,3)
        window.navigator.clipboard.writeText(password)
    },[password])
  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
            <h1 className='text-white text-center my-3'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}></input>
                <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassToClip}>copy</button>
            </div>
            <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                    <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}></input>
                    <label>Length: {length}</label>
                </div>

                <div className='flex items-center gap-x-1'>
                    <input type='checkbox' defaultChecked={noAllowed} id="numberInput"  className='cursor-pointer' onChange={()=>{setNoAllowed((prev)=>!prev);}}></input>
                    <label for='numberInput'>Numbers</label>
                </div>

                <div className='flex items-center gap-x-1'>
                    <input type='checkbox' defaultChecked={charAllowed} id="charInput"  className='cursor-pointer' onChange={()=>{setCharAllowed((prev)=>!prev);}}></input>
                    <label for='charInput'>Characters</label>
                </div>

            </div>
        </div>
    </>
  )
}

export default PassGenerator