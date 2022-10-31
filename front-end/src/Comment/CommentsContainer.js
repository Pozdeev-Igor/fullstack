import React, {useEffect, useRef, useState} from 'react';
import Comment from "./Comment";
import {MDBBtn, MDBTextArea, MDBTypography} from "mdb-react-ui-kit";
import {Row} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import {useInterval} from "../util/useInterval";
import dayjs from "dayjs";
import ajax from "../services/fetchServise";

const CommentsContainer = (props) => {

    const user = useUser();
    const {advertId} = props

    const clearInput = () => {
        window.location.reload()
    };

    const childToParent = (commentFromChild) => {
        setData(false)
        setCommentFromChild(commentFromChild)
        let answersCopy;
        if (commentFromChild.advert) {
            answersCopy = {
                text: `${commentFromChild.createdBy.name}, `,
                commentId: commentFromChild.id != null ? parseInt(commentFromChild.id) : null,
                user: user.jwt,
            };
        } else if (commentFromChild.comment) {
            setData(false)
            answersCopy = {
                text: `${commentFromChild.createdBy.name}, `,
                commentId: commentFromChild.comment.id != null ? parseInt(commentFromChild.comment.id) : null,
                user: user.jwt,
            };
        }
        setAnswer(answersCopy);
    }

    const emptyComment = {
        id: null,
        text: "",
        advertId: advertId != null ? parseInt(advertId) : null,
        user: user.jwt,
        createdDate: null,
    };

    const emptyAnswer = {
        id: null,
        text: "",
        commentId: null,
        user: user.jwt,
        createdDate: null,
    };

    const [commentFromChild, setCommentFromChild] = useState(null);

    const [comment, setComment] = useState(emptyComment);
    const [answer, setAnswer] = useState(emptyAnswer);

    const [comments, setComments] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState(true);

    useInterval(() => {
        updateCommentTimeDisplay();
    }, 1000 * 5);

    function updateCommentTimeDisplay() {
        const commentsCopy = [...comments];
        commentsCopy.forEach(
            (comment) => (comment.createdDate = dayjs(comment.createdDate))
        );
        formatComments(commentsCopy);
    };

    function handleEditComment(commentData) {
        if (commentData.advert) {
            const commentCopy = {
                id: commentData.id,
                text: commentData.text,
                advertId: advertId != null ? parseInt(advertId) : null,
                user: user.jwt,
                createdDate: commentData.createdDate,
            };
            setComment(commentCopy);
        } else {
            setData(false);
            const answerCopy = {
                id: commentData.id,
                text: commentData.text,
                commentId: commentData.comment.id != null ? parseInt(commentData.comment.id) : null,
                user: user.jwt,
                createdDate: commentData.createdDate,
            };
            setComment(answerCopy);
        }
    }

    function handleDeleteComment(commentData) {
        if (commentData.comment) {
            ajax(`/api/comments/answer/${commentData.id}`, 'DELETE', user.jwt).then((msg) => {
                const answersCopy = [...answers];
                let i = answersCopy.findIndex((answer) => answer.id === commentData.id);
                answersCopy.splice(i, 1);
                formatComments(answersCopy);
            })
        } else {
            ajax(`/api/comments/${commentData}`, "delete", user.jwt).then((msg) => {
                const commentsCopy = [...comments];
                const i = commentsCopy.findIndex((comment) => comment.id === commentData);
                commentsCopy.splice(i, 1);
                formatComments(commentsCopy);
            });
        }
    };

    function formatComments(commentsCopy) {
        commentsCopy.forEach((comment) => {
            if (typeof comment.createDate === "string") {
                comment.createDate = dayjs(comment.createDate);
            }
        });
        setComments(commentsCopy);
    };

    function formatAnswers(answersCopy) {
        answersCopy.forEach((answer) => {
            if (typeof answer.createDate === "string") {
                answer.createDate = dayjs(answer.createDate);
            }
        });
        setAnswers(answersCopy);
    };

    useEffect(() => {
        ajax(
            `/api/comments?advertId=${advertId}`,
            "get",
            user.jwt,
            null
        ).then((commentsData) => {
            formatComments(commentsData);
        });
        }, [comment, answer, handleEditComment, handleDeleteComment]);


    function updateAnswer(value) {
        const answerCopy = {...answer};
        answerCopy.text = value;
        setAnswer(answerCopy);
    }

    function updateComment(value) {
        const commentCopy = {...comment}
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function submitComment() {
        if (comment.id) {
            ajax(`/api/comments/${comment.id}`, "put", user.jwt, comment).then(
                (d) => {
                    const commentsCopy = [...comments];
                    const i = commentsCopy.findIndex((comment) => comment.id === d.id);
                    commentsCopy[i] = d;
                    formatComments(commentsCopy);
                    setComment(emptyComment);
                }
            );
        } else {
            ajax("/api/comments", "post", user.jwt, comment).then((d) => {
                const commentsCopy = [...comments];
                commentsCopy.push(d);
                formatComments(commentsCopy);
                setComment(emptyComment);
            });
        }
    }

    function submitAnswer() {
        if (comment.id) {
            ajax(`/api/comments/answer/${comment.id}`, "put", user.jwt, comment).then(
                (d) => {
                    const answersCopy = [...answers];
                    const i = answersCopy.findIndex((answer) => answer.id === d.id);
                    answersCopy[i] = d;
                    formatComments(answersCopy);
                    setComment(emptyAnswer);
                }
            );
        } else {
            ajax("/api/comments/answer", "post", user.jwt, answer).then((d) => {
                const answersCopy = [...answers];
                answersCopy.push(d);
                formatComments(answersCopy);
                setAnswer(emptyAnswer);
            });
        }
        setData(true)
        setCommentFromChild(null);
    }

    return (
        <>
            <MDBTypography tag='div' className='display-5 pb-3 mt-5 mb-3 border-bottom'>
                Comments
            </MDBTypography>
            <Row>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        commentData={comment}
                        emitDeleteComment={handleDeleteComment}
                        emitEditComment={handleEditComment}
                        childToParent={childToParent}
                        formatAnswers={formatAnswers}
                        answers={answers}
                        comments={comments}/>
                ))}
            </Row>
            <Row className="py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
                <div className="d-flex flex-start w-100">
                    <MDBTextArea
                        label='Message'
                        id='textAreaExample'
                        rows={4}
                        style={{backgroundColor: '#fff'}}
                        wrapperClass="w-100"
                        onChange={
                            (e) => {
                                commentFromChild ?
                                    updateAnswer(e.target.value)
                                    :
                                    updateComment(e.target.value)
                            }}
                        value={
                            commentFromChild ?
                                answer.text
                                :
                                comment.text}
                    />
                </div>
                <div className="float-end mt-2 pt-1">
                    <MDBBtn size="sm" className="me-1" onClick={
                        data ?
                            submitComment
                            :
                            submitAnswer
                    }
                    >Post comment</MDBBtn>
                    <MDBBtn outline size="sm" onClick={clearInput}>Cancel</MDBBtn>
                </div>
            </Row>
        </>
    );
};

export default CommentsContainer;