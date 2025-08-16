import { createContext, useState } from "react";

export const WeatherData = createContext({})

export const WeatherDataProvider = ({ children }) => {

    const [data, setData] = useState({})

    return (
        <WeatherData.Provider value={[data, setData]}>
            {children}
        </WeatherData.Provider>
    )


}