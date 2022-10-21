import React, {useEffect, useState} from 'react';
import {MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import jwt_decode from "jwt-decode";
import {useUser} from "../UserProvider/UserProvider";
import CommentsAnswer from "./CommentsAnswer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import ajax from "../services/fetchServise";

const Comment = (props) => {
    const user = useUser();
    const decodedJwt = jwt_decode(user.jwt);
    const {id, createdDate, createdBy, text} = props.commentData;
    const {
        emitEditComment,
        emitDeleteComment,
        childToParent,
        formatAnswers,
        comments
    } = props;
    const [commentRelativeTime, setCommentRelativeTime] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [answers, setAnswers] = useState([]);

    // const data = props.commentData;

    // const handleReply = () => {
    //     setIsReplyClicked(true);
    // }

    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
        // console.log(props.commentData)
    }

    useEffect(() => {
        updateCommentRelativeTime();
    }, [createdDate]);

    function updateCommentRelativeTime() {
        if (createdDate) {
            dayjs.extend(relativeTime);
            if (typeof createdDate === "string")
                setCommentRelativeTime(dayjs(createdDate).fromNow());
            else {
                // console.log(createdDate);
                // console.log(createdDate.fromNow());
                setCommentRelativeTime(createdDate.fromNow());
            }
        }
    }

    useEffect(() => {
        ajax(
            `/api/comments/answer?commentId=${id}`,
            "get",
            user.jwt,
            null
        ).then((answersData) => {
            formatAnswers(answersData);
            setAnswers(answersData)
            console.log(answers)
        });
    }, []);

    return (
        <MDBRow>
            <MDBCol>
                <div className="d-flex flex-start">
                    <div className="flex-grow-1 flex-shrink-1">
                        <div className="shadow-4-strong p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1 text-primary">
                                    {`${createdBy.name}`}
                                </p>
                                <cite>
                                    <span className="small text-muted">
                                        • {commentRelativeTime ? `${commentRelativeTime}` : ""} •</span>
                                </cite>
                            </div>
                            <p className="small mb-2">
                                {text}
                            </p>
                            <div className="d-flex justify-content-start me-5" style={{backgroundColor: "whitesmoke"}}>
                                <span className="text-muted" style={{cursor: "pointer", marginLeft:"30px"}} onClick={() => {
                                    childToParent(props.commentData)
                                }}>
                                    <MDBIcon fas icon="reply fa-xs"/>
                                    <span className="small"> reply</span>
                                </span>
                                {showAnswer === false ?
                                    <span className="text-primary" style={{cursor: "pointer", marginLeft:"30px"}}
                                          onClick={handleShowAnswer}>
                                    <MDBIcon far icon="caret-square-down fa-xs"/>
                                    <span className="small"> open</span>
                                </span>
                                    :
                                    <span className="text-muted" style={{cursor: "pointer", marginLeft:"30px"}}
                                          onClick={handleShowAnswer}>
                                    <MDBIcon far icon="caret-square-up fa-xs"/>
                                    <span className="small"> close</span>
                                </span>
                                }

                                {decodedJwt.sub === createdBy.username ?
                                        (
                                            <>
                                                <span className="text-muted"
                                                      style={{cursor: "pointer", marginLeft:"30px"}}
                                                      onClick={() => emitEditComment(id)}>
                                        <MDBIcon fas icon="pen fa-xs"/>
                                        <span className="small"> edit</span>
                                    </span>
                                                <span className="text-muted"
                                                      style={{cursor: "pointer", marginLeft:"30px"}}
                                                      onClick={() => emitDeleteComment(id)}
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
                        {showAnswer ?
                            comments.map((comment) => (
                                answers.map((answer) => (
                                    answer.comment.id === comment.id ?
                                        <CommentsAnswer
                                            key={answer.id}
                                            answersData={answer}
                                            decodedJwt={decodedJwt}/>
                                        :
                                        null
                                ))
                                // id === answer.comment.id?
                                // :
                                // null
                            ))
                            :
                            null

                        }
                        <div className="d-flex flex-start mt-4">
                            <a className="me-5" href="#">
                            </a>
                        </div>
                    </div>
                </div>
            </MDBCol>
        </MDBRow>
    );
};

export default Comment;