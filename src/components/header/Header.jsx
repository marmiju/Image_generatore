import React, { useContext } from 'react';
import { PageContext } from '../../apiContext/pageContext';

const Header = () => {
    const {page,setPage} = useContext(PageContext)
    console.log(page)
    return (
        <header className='text-black bg-white flex flex-row justify-between max-w-[1280px] mx-auto p-2'>
            <p className='text-2xl'>Ai Image generation</p>
            <div className='flex space-x-2'>
                <button
                onClick={()=>setPage('generate')}
                 className={`cursor-pointer ${page==='generate' ? 'text-blue-600' : ''}`}>generate image</button>
                <button
                onClick={()=> setPage('downloaded')}
                 className={`cursor-pointer ${page==='downloaded' ? 'text-blue-600' : ''}`}>downloaded</button>
            </div>
        </header>
    );
};

export default Header;