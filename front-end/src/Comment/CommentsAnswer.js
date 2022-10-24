import React, {useEffect, useState} from 'react';
import {MDBIcon} from "mdb-react-ui-kit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const CommentsAnswer = (props) => {
    const {id, createdDate, createdBy, text, commentId} = props.answersData
    const {decodedJwt, childToParent, emitEditComment, emitDeleteComment} = props;
    const [answerRelativeTime, setAnswerRelativeTime] = useState("");


    useEffect(() => {
        updateAnswerRelativeTime();
    }, [createdDate]);

    function updateAnswerRelativeTime() {
        if (createdDate) {
            dayjs.extend(relativeTime);
            if (typeof createdDate === "string")
                setAnswerRelativeTime(dayjs(createdDate).fromNow());
            else {
                setAnswerRelativeTime(createdDate.fromNow());
            }
        }
    }

    return (
        // {id = props.answersData}
        <div className="d-flex flex-start mt-4">
            <a className="me-5" href="#">
            </a>

            <div className="flex-grow-1 flex-shrink-1">
                <div className="shadow-4-strong p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1 text-primary">
                            {createdBy.name}
                        </p>
                        <cite>
                            <span
                                className="small text-muted">• {answerRelativeTime ? `${answerRelativeTime}` : ""} •</span>
                        </cite>
                    </div>
                    <p className="small mb-0">
                        {text}
                    </p>
                    <div className="d-flex justify-content-start" style={{backgroundColor: "whitesmoke"}}>
                        <span className="text-muted" style={{cursor: "pointer", marginLeft: "30px"}} onClick={() => {
                            childToParent(props.answersData)
                            window.scrollTo(0, 1800)
                        }}>
                            <MDBIcon fas icon="reply fa-xs"/>
                            <span className="small"> reply</span>
                        </span>
                        {decodedJwt.sub === createdBy.username ?
                            (
                                <>
                                    <span className="text-muted"
                                          style={{cursor: "pointer", marginLeft: "30px"}}
                                          onClick={() => {
                                              emitEditComment(props.answersData)
                                              window.scrollTo(0, 1800)
                                          }}
                                    >
                                    <MDBIcon fas icon="pen fa-xs"/>
                                    <span className="small"> edit</span>
                                     </span>
                                    <span className="text-muted"
                                          style={{cursor: "pointer", marginLeft: "30px"}}
                                          onClick={() => {
                                              emitDeleteComment(props.answersData)
                                          }}
                                    >
                                    <MDBIcon fas icon="trash-alt fa-xs"/>
                                    <span className="small"> delete</span>
                                </span>
                                </>
                            ) :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsAnswer;