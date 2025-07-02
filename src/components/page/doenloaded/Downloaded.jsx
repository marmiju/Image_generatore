import { useContext } from 'react';
import { PageContext } from '../../../apiContext/pageContext';

const Downloaded = () => {
    const { downloades } = useContext(PageContext)
    console.log("downloads", downloades)

    return (
        <div className='max-w-[1200px] mx-auto '>
            <p>download images</p>
            {
                downloades && downloades.length !== 0 ?
                    <div className='mt-10 grid grid-cols-3 gap-2 items-center'>
                        {
                            downloades.map((image, idx) => (
                                <img key={idx} src={image} alt='downloaded image' />
                            ))
                        }
                    </div>
                    : <p className='bg-gray-200'>No image download yet</p>
            }
        </div>
    );
};

export default Downloaded;