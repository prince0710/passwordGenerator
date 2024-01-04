import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenarator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
      str += "!@#$%^&*(){}~`.|?"
    }

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

      const copyPasswordToClipboard = useCallback(()=>{ passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,999); window.navigator.clipboard.writeText(password)}, [password])

    useEffect(() => {passwordGenarator()}, [length, numberAllowed, characterAllowed,passwordGenarator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8    text-yellow-400 bg-gray-700'>
      <h1 className='text-3xl text-center text-yellow-400 my-3 mb-5 mt-0 underline'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 text-black text-lg'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
          <div className='flex text-lg gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min = {8}
                max = {100}
                value={length}
                className='cursor-pointer'
                onChange={(e)=>{setLength(e.target.value)}}
                />
                <label>Length: {length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked = {numberAllowed}
                id='numberInput'
                onChange = {() => {
                  setNumberAllowed((prev) => !prev )
                }}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked = {numberAllowed}
                id='characterInput'
                onChange = {() => {
                  setCharacterAllowed((prev) => !prev )
                }}
                />
                <label htmlFor="characterInput">Character</label>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
