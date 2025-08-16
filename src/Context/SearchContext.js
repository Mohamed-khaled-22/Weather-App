import { createContext, useState } from "react";

export const SearchTitleContext = createContext([]);

export const SearchTitleProvider = ({ children }) => {
    // Initialize searchTitle with a default value from localStorage or a default string
    const [searchTitle, setSearchTitle] = useState(localStorage.getItem('searchTitle') || 'cairo')
    return (
        <SearchTitleContext.Provider value={[searchTitle, setSearchTitle]}>
            {children}
        </SearchTitleContext.Provider>
    )
}


