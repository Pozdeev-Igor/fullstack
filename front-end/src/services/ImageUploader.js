import React, {useState} from 'react';
import ImageUploading from "react-images-uploading";
import {Alert, Button, ButtonGroup} from "react-bootstrap";
import ajax from "./fetchServise";
import {useParams} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";

const ImageUploader = (props) => {
    const user = useUser();
    const {advertId} = useParams();
    const {
        maxNumber = 10,
        acceptType = ["jpeg", "jpg", "png"],
        maxFileSize = 5000000
    } = props;
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subCategoryId, setSubCategoryId] = useState(null);
    const [userId, setUserId] = useState(null);

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    const onError = () => {
        setImages([]);
    };
    const uploadFiles = () => {
        // document.getElementById("jsonprint").innerHTML = JSON.stringify(
        //     images,
        //     null,
        //     6
        // ).replace(/\n( *)/g, function (match, p1) {
        //     return "<br>" + "&nbsp;".repeat(p1.length);
        // });

        console.log(images);

        const reqBody = {
            title: title,
            description: description,
            subCategoryId: subCategoryId,
            userId: userId,
            files: images,
        }
        ajax(`/api/adverts/${advertId}`, "PUT", user.jwt, reqBody)

    };
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                onError={onError}
                maxNumber={maxNumber}
                acceptType={acceptType}
                maxFileSize={maxFileSize}
                dataURLKey="data_url"
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
                                        ? { backgroundColor: "#afafaf", color: "white" }
                                        : undefined
                                }
                            >
                                Choose a file or Drag it here
                            </div>

                            <div className="p-2" style={{ textAlign: "left" }}>
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
                                            style={{ width: "100%" }}
                                        />
                                        <div className="image-item__btn-wrapper mt-1">
                                            <ButtonGroup size="sm" style={{ width: "100%" }}>
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
                                    <hr />
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