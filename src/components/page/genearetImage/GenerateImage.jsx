import { useState, useEffect, useRef, useContext } from 'react';
import Input from '../../inputfield/Input';
import send from '../../../../public/send.svg'
import { generateImage } from '../../../../lib/GenerateImage';
import DownloadButton from '../../button/DownloadButton';
import { PageContext } from '../../../apiContext/pageContext';

const aspectRatios = [
    { label: '1:1', width: 1024, height: 1024 },
    { label: '16:9', width: 1280, height: 720 },
    { label: '3:4', width: 768, height: 1024 },
];

const GenerateImage = () => {

    const [prompt, setPrompt] = useState('')
    const [model, setModel] = useState('flux');
    const [size, setSize] = useState({ width: 1024, height: 1024 });
    const [activeRatio, setActiveRatio] = useState('1:1');
    const [seed, setSeed] = useState(Math.floor(Math.random() * 100000))
    const latestImageRef = useRef(null);

    const { images, setImages } = useContext(PageContext)




    useEffect(() => {
        const matched = aspectRatios.find(
            (r) => r.width === Number(size.width) && r.height === Number(size.height)
        );
        setActiveRatio(matched ? matched.label : null);
    }, [size]);

    // Handle manual input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSize((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };
    // submit form 
    const submitForm = async (e) => {
        e.preventDefault()
        if (!prompt) {
            alert('please provide prompt')
            return
        }

        const promptData = {
            prompt,
            model,
            seed,
            width: size.width,
            height: size.height,
        }
        setSeed(Math.floor(Math.random() * 100000))
        try {
            const image = await generateImage(promptData);
            const newImage = { url: image, loaded: false };
            latestImageRef.current = image;
            setImages(prev => [newImage, ...prev].slice(0, 8));
            console.log('generate image ', image)

        } catch (err) {
            throw new Error('Something went wrong!')
        }

    }


    const handleRatioClick = (ratio) => {
        setSize({ width: ratio.width, height: ratio.height })
    }

    return (
        <div className="max-w-[1200px] mx-auto grid  items-center">
            <form onSubmit={submitForm} className="space-x-2 space-y-4">
                {/* prompt field */}
                <div className='flex space-x-1'>
                    <Input
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        editable={true} placeholder={'enter prompts'} type={'search'} />
                    <button type='submit' className='w-10 h-10 border bg-slate-200 rounded p-2'><img src={send} alt="" /></button>
                </div>

                {/* advance option */}
                <div className="bg-slate-100 grid space-y-4 p-4 rounded">
                    <p>• Advance Option</p>

                    <div className="flex space-x-4">
                        <div >
                            <p>Model</p>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="border border-slate-400 rounded"
                            >
                                <option value="flux">flux</option>
                                <option value="turbo">turbo</option>
                                <option value="gptimage">gptimage</option>
                            </select>
                        </div>

                        <Input
                            name="seed"
                            disabled={true}
                            value={seed}
                        />

                        <Input
                            name="width"
                            type="text"
                            value={size.width}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex space-x-4">
                        <Input
                            name="height"
                            type="text"
                            value={size.height}
                            onChange={handleInputChange}
                        />

                        <div className="grid min-w-[200px] items-center">
                            <p>Ratio</p>
                            <div className="space-x-4">
                                {aspectRatios.map((ratio) => (
                                    <button
                                        key={ratio.label}
                                        type="button"
                                        onClick={() => handleRatioClick(ratio)}
                                        className={`p-2 border rounded ${activeRatio === ratio.label
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white border-gray-400'
                                            }`}
                                    >
                                        {ratio.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* result */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mt-10 ">
                {
                    images ?

                        images.map((imageObj, index) => (
                            <div key={index} className="relative w-full  flex justify-center  ">
                                {!imageObj.loaded && (
                                    <div className="absolute inset-0 opacity-90 flex items-center justify-center min-h-44 bg-gray-200 rounded">
                                        <p className="text-sm text-gray-600 ">loading...</p>
                                    </div>
                                )}
                                <img
                                    className={`rounded relative flex transition-opacity max-h-64  duration-500 ${imageObj.loaded ? 'opacity-100' : 'opacity-0'}`}
                                    src={imageObj.url}
                                    alt={`image-${index}`}
                                    onLoad={() => {


                                        setImages(prevImages =>
                                            prevImages.map((img, i) =>
                                                i === index ? { ...img, loaded: true } : img
                                            )
                                        );
                                    }}
                                />
                                {
                                    imageObj.loaded && <div className='absolute bottom-0 right-0 flex items-center justify-center rounded-tl-2xl backdrop-blur-md border-l border-t border-white text-white bg-black/20 '>
                                        <DownloadButton url={imageObj.url} filename={`genereted-${index + 1}`} />
                                    </div>
                                }

                            </div>
                        ))

                        : <p>no image generate yet</p>
                }
            </div>



        </div>
    );
};

export default GenerateImage;
