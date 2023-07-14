import React,{useState,useEffect} from 'react'

export default function useLocalStorage(key,value) {
    const PREFIX="whatsapp-clone"
    const keyPair=PREFIX+key
    const [id,setId]=useState(()=>{
        const val=localStorage.getItem(keyPair)
        if (val==null){return value}
        return JSON.parse(val)
    })
    useEffect(()=>{
        localStorage.setItem(keyPair,JSON.stringify(id))
    },[keyPair,id])    
  return [id,setId]
}
