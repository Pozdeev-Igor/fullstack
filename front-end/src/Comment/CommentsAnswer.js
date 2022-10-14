import React from 'react';
import {MDBIcon} from "mdb-react-ui-kit";

const CommentsAnswer = () => {
    return (
        <div className="d-flex flex-start mt-4">
            <a className="me-5" href="#">
            </a>

            <div className="flex-grow-1 flex-shrink-1">
                <div className="shadow-4-strong p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1 text-primary">
                            Simona Disa{" "}
                        </p>
                        <cite>
                            <span className="small text-muted">• 3 hours ago •</span>
                        </cite>
                    </div>
                    <p className="small mb-0">
                        letters, as opposed to using 'Content here,
                        content here', making it look like readable
                        English.
                    </p>
                    <div className="d-flex justify-content-evenly">
                        <a href="#!">
                            <MDBIcon fas icon="reply fa-xs"/>
                            <span className="small"> reply</span>
                        </a>
                        <a href="#!">
                            <MDBIcon fas icon="pen fa-xs"/>
                            <span className="small"> edit</span>
                        </a>
                        <a href="#!">
                            <MDBIcon fas icon="trash-alt fa-xs"/>
                            <span className="small"> delete</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsAnswer;