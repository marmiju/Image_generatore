export const downloadImage = async (url,filename) => {
        if (typeof window !== 'undefined') {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro download`);
                }
                const blob = await response.blob();

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);


                URL.revokeObjectURL(link.href);

            } catch (error) {
                console.error('Error during download:', error);
                alert('Could not download the file. Please check the URL or try again later.');
            }
        }
    };