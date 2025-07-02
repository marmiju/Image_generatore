import { createContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
    const [page, setPage] = useState('generate');
    const [downloades, setdownload] = useState([])
    // 
    const [images, setImages] = useState([])

    
    return (
        <PageContext.Provider value={{ page, setPage, downloades,setdownload,images,setImages}}>
            {children}
        </PageContext.Provider>
    );
};

export { PageContext, PageProvider };
