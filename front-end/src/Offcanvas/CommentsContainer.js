import React, {useEffect, useState} from 'react';
import Comment from "../Comment/Comment";
import {
    MDBBtn,
    MDBCardImage,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
    MDBTextArea, MDBTypography
} from "mdb-react-ui-kit";
import {ModalFooter, Row} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import {useInterval} from "../util/useInterval";
import dayjs from "dayjs";
import ajax from "../services/fetchServise";

const CommentsContainer = (props) => {
    const user = useUser();
    const {
        // show, handleClose, handleShow,
        advertId
    } = props

    const emptyComment = {
        id: null,
        text: "",
        advertId: advertId != null ? parseInt(advertId) : null,
        user: user.jwt,
        createdDate: null,
    };

    const [comment, setComment] = useState(emptyComment);
    const [comments, setComments] = useState([]);

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

    function handleEditComment(commentId) {
        const i = comments.findIndex((comment) => comment.id === commentId);
        const commentCopy = {
            id: comments[i].id,
            text: comments[i].text,
            advertId: advertId != null ? parseInt(advertId) : null,
            user: user.jwt,
            createdDate: comments[i].createdDate,
        };
        setComment(commentCopy);
    }

    function handleDeleteComment(commentId) {
        // TODO: send DELETE request to server
        ajax(`/api/comments/${commentId}`, "delete", user.jwt).then((msg) => {
            const commentsCopy = [...comments];
            const i = commentsCopy.findIndex((comment) => comment.id === commentId);
            commentsCopy.splice(i, 1);
            formatComments(commentsCopy);
        });
    };

    function formatComments(commentsCopy) {
        commentsCopy.forEach((comment) => {
            if (typeof comment.createDate === "string") {
                console.log(
                    "BEFORE Converting string date to dayjs date",
                    comment.createdDate
                );
                comment.createDate = dayjs(comment.createDate);
                console.log(
                    "AFTER Converting string date to dayjs date",
                    comment.createdDate
                );
            }
        });
        setComments(commentsCopy);
    };

    useEffect(() => {
        ajax(
            `/api/comments?assignmentId=${advertId}`,
            "get",
            user.jwt,
            null
        ).then((commentsData) => {
            formatComments(commentsData);
        });
    }, [comment]);

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
                        emitEditComment={handleEditComment}/>
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
                        onChange={(e) => updateComment(e.target.value)}
                        value={comment.text}
                    />
                </div>
                <div className="float-end mt-2 pt-1">
                    <MDBBtn size="sm" className="me-1" onClick={submitComment}>Post comment</MDBBtn>
                    {/*<MDBBtn outline size="sm" onClick={handleClose}>Cancel</MDBBtn>*/}
                </div>
            </Row>
        </>


    );
};

export default CommentsContainer;