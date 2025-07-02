
export const generateImage = async (data) => {
    const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.prompt)}?width=${data.width}&height=${data.height}&seed=${data.seed}&model=${data.model}`;
    console.log(image)
    return image;
};
