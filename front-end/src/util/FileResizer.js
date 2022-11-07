import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            584,
            1080,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export default resizeFile;