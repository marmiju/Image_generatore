import { useContext } from "react";
import { downloadImage } from "../../../utils/downloadImage";
import { PageContext } from "../../apiContext/pageContext";

const DownloadButton = ({ url, filename }) => {
    const { downloades, setdownload } = useContext(PageContext)


    return (
        <button
            className="text-xl cursor-pointer px-4"
            onClick={() => {
                downloadImage(url, filename);
                //  if already in downloaded
                if (!downloades.includes(url)) {
                    setdownload((prev) => [url, ...prev]);
                }
            }}
            type="button"
        >
            ↓
        </button>
    );
};

export default DownloadButton;
