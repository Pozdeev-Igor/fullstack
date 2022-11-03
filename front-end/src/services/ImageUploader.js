import React, {useEffect, useState} from 'react';
import ImageUploading from "react-images-uploading";
import {Alert, Button, ButtonGroup} from "react-bootstrap";
import ajax from "./fetchServise";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import {MDBIcon} from "mdb-react-ui-kit";
import Resizer from "react-image-file-resizer";

const ImageUploader = (props) => {
    const user = useUser();
    const navigate = useNavigate();
    const {advertId} = useParams();
    const {
        maxNumber = 10,
        acceptType = ["jpeg", "jpg", "png"],
        maxFileSize = 5000000,
        title, description, subCategoryId, price
    } = props;
    const [images, setImages] = useState([]);
    const [result, setResult] = useState([]);


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

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);

    };

    useEffect(() => {
        Array.from(images).forEach( file => resizeFile(file.file).then(f => {
        setResult((result) => result.concat(f))
        }))
        setResult(result => [])
    }, [images])

    const onError = () => {
        setImages([]);


    };
    const uploadFiles = async () => {
        const reqBody = {
            title: title,
            description: description,
            price: price,
            subCategoryId: parseInt(subCategoryId),
            images: result.map((img) => img),
        }
        await ajax(`/api/adverts/${advertId}`, "POST", user.jwt, reqBody)
        navigate('/');
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={(e) => onChange(e)}
                onError={onError}
                maxNumber={maxNumber}
                acceptType={acceptType}
                maxFileSize={maxFileSize}
                dataURLKey="data_url"
                type="file"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                      errors
                  }) => (
                    <>
                        {errors && (
                            <Alert variant="danger text-start">
                                <ul>
                                    {errors.maxNumber && (
                                        <li>Нельзя загружать больше чем 10 фотографий</li>
                                    )}
                                    {errors.acceptType && (
                                        <li>Разрешенные форматы фотографий: "jpeg", "jpg", "png"</li>
                                    )}
                                    {errors.maxFileSize && (
                                        <li>Файл должен весить меньше 5 МБ</li>
                                    )}
                                </ul>
                            </Alert>
                        )}

                        <div className="upload__image-wrapper">
                            <div
                                className="upload-container"
                                {...dragProps}
                                onClick={onImageUpload}
                                style={
                                    isDragging
                                        ? {backgroundColor: "#afafaf", color: "white"}
                                        : undefined
                                }
                            >
                                <MDBIcon far icon="file-image"/>
                            </div>

                            <div className="p-2" style={{textAlign: "left"}}>
                                {imageList.map((image, index) => (
                                    <div
                                        key={index}
                                        className="image-item  "
                                        style={{
                                            width: "150px",
                                            marginRight: "10px",
                                            display: "inline-block"
                                        }}
                                    >
                                        <img
                                            src={image["data_url"]}
                                            alt=""
                                            style={{width: "100%"}}
                                        />
                                        <div className="image-item__btn-wrapper mt-1">
                                            <ButtonGroup size="sm" style={{width: "100%"}}>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => onImageUpdate(index)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => onImageRemove(index)}
                                                >
                                                    Remove
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {images.length > 0 && (
                                <>
                                    <hr/>
                                    <div className="text-start p-2">
                                        <Button onClick={uploadFiles} variant="success">
                                            Upload
                                        </Button>{" "}
                                        <Button onClick={onImageRemoveAll} variant="danger">
                                            Remove All Images
                                        </Button>
                                    </div>
                                    <pre className="text-start" id="jsonprint"></pre>
                                </>
                            )}
                        </div>
                    </>
                )}
            </ImageUploading>
        </div>
    );
};

export default ImageUploader;