import { useContext } from 'react';
import { PageContext } from '../../apiContext/pageContext';
import GenerateImage from './genearetImage/GenerateImage';
import Downloaded from './doenloaded/Downloaded';

const Page = () => {
    const {page} = useContext(PageContext)
    return (
        <div>
            {page === 'generate' && <GenerateImage/>}
            {page === 'downloaded' && <Downloaded/> }
        </div>
    );
};

export default Page;