import { createContext, useState } from "react"


export const DataContext = createContext();

export const DataContextHandler=({children})=>{

    const [data,setdata] = useState({})

    return(
        <DataContext.Provider value={{data,setdata}}>{children}</DataContext.Provider>
    )
}