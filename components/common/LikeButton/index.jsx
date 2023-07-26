import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  deleteComment,
  deleteReplyComment,
  updateComment,
  postReplyComment,  
  likeComment,
  //dislikeComment,  
} from "../../../api/FirestoreAPI";


import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import CommentList from "../Comments";
import CommentsCount from "../CommentsCount";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { 
  FaRegAngry,
  FaReply
 } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser, lngBtnFlag }) {
  const [likesCount, setLikesCount] = useState(0);  
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReplyCommentBox, setReplyShowCommentBox] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [lngBtn, setLngBtn] = useState(true);
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState(""); 
  const [editComment, setEditComment] = useState("");
  const [CommentNewID, setCommentNewID] = useState("");
  const [comments, setComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + (liked ? -1 : 1),
    }));
  };

  const EnableEditComment = (id) => {
    setEditComment(id);
  }
  
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const getReplyComment = (event, comment_data) => {
    let newComments = comments.map(el => (
      el.id == comment_data.id ? { ...el, comment: event.target.value } : el
    ));
    setReplyComment(event.target.value);
  };

  const addReplyComment = (commentId) => {
    postReplyComment(postId, replyComment, getCurrentTimeStamp("LLL"), currentUser?.name, commentId);
    setEditComment("");
    setReplyShowCommentBox(true);
  };  

  const openCommentInput = (event, commentId) => {
    setCommentNewID(commentId);
    setReplyShowCommentBox(false);
  }


  

  const getEditComment = (event, comment_data) => {
    let newComments = comments.map(el => (
      el.id == comment_data.id ? { ...el, comment: event.target.value } : el
    ))
    setComments(newComments)
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  const handleLikeComment = (userId, commentId) => {    
    likeComment(userId, commentId,false);
  };

  const handleDislikeComment = (userId, commentId) => {
    likeComment(userId, commentId,true);
  };

  const handleUpdateComment = (postId, commentId, updatedComment) => {
    EnableEditComment(commentId);
    updateComment(postId, commentId, updatedComment);
    setUpdatedComment("");
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
    setComment("");
  };

  const handleDeleteCommentReply = (commentId) => {
    deleteReplyComment(commentId);
    setComment("");
  };

  const handleEditTick = (postId, commentId, updatedComment) => {
    updateComment(postId, commentId, updatedComment);
    setEditComment('')
  }

  useMemo(() => {
    
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <div className="like-comment" style={{ paddingTop: 15 }}>
        <p className="likes-comment-inner">{likesCount} people reacted!</p>
        {lngBtn == true ?
          <p className="likes-comment-inner btnhindi" onClick={(event) => {
            setLngBtn(!lngBtn)
            lngBtnFlag(lngBtn)
          }}>See translation</p>
          :
          <p className="likes-comment-inner btnhindi" onClick={(event) => {
            setLngBtn(!lngBtn)
            lngBtnFlag(lngBtn)
          }}>See original</p>
        }
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Like ({likeCountMap.thumbsUp})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Angry ({likeCountMap.angry})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>
            Laugh ({likeCountMap.laugh})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{
                  (editComment == '' || editComment != comment.id) ?
                    (comment.comment) :
                    <input
                      onChange={(event) => getEditComment(event, comment)}
                      placeholder="Edit a Comment"
                      className={editComment == comment.id ? "comment-input" : 'comment'}
                      name="commentedit"
                      value={comment.comment}
                    />                
                }                
                </p>
                {currentUser && (
                  <div className="comment-actions">
                    {currentUser.name === comment.name && (
                      <>
                        {editComment == comment.id ?
                          <AiOutlineCheck
                            size={20}
                            color="#0a66c2"
                            onClick={() =>
                              handleEditTick(postId, comment.id, comment.comment)
                            }
                          />
                          : <AiOutlineEdit
                            size={20}
                            color="#0a66c2"
                            onClick={() =>
                              handleUpdateComment(postId, comment.id, comment.comment)
                            }
                          />}
                        <AiOutlineDelete
                          size={20}
                          color="#dc143c"
                          onClick={() =>
                            handleDeleteComment(comment.id)
                          }
                        />
                      </>
                    )}
                    {currentUser.name !== comment.name && (                      
                      <>
                        {comment.id === CommentNewID ?
                          <div>
                            <input
                              onChange={(event) => getReplyComment(event, comment)}
                              placeholder="Reply a Comment"
                              className="comment-input"
                              style={showReplyCommentBox ? { display: 'none' } : { display: 'block' }}
                              name="replyComment"
                              value={replyComment}
                            />
                          </div>
                          :
                          <></>
                        } 

                        {comment.id === CommentNewID ?
                          <AiOutlineCheck
                            size={20}
                            color="green"
                            title="Reply"
                            style={showReplyCommentBox ? { display: 'none' } : { display: 'block' }}
                            onClick={() =>
                              addReplyComment(comment.id)
                            }
                          />
                          :
                          <FaReply
                            size={20}
                            color="green"
                            title="Reply"
                            style={showReplyCommentBox ? { display: 'block' } : { display: 'block' }}
                            onClick={(event) => {
                              openCommentInput(event, comment.id)
                            }
                            }
                          />
                        }                        
                          
                      
                        <AiOutlineLike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleLikeComment(currentUser?.id, comment.id)
                          }
                        />
                        <AiOutlineDislike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleDislikeComment(currentUser?.id, comment.id)
                          }
                        />
                        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          <CommentsCount
                          userId={currentUser?.id}                      
                          commentsId={comment.id}
                        />
          </div>
         
                      </>
                    )}
                    <CommentList
                      userId={currentUser?.id}
                      currentUser={currentUser}
                      commentsId={comment.id}
                    />
                  </div>
                )}
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}










/*
import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  deleteComment,
 // likeComment,
 // dislikeComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + (liked ? -1 : 1),
    }));
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  const handleLikeComment = (postId, commentId) => {
    likeComment(postId, commentId);
  };

  const handleDislikeComment = (postId, commentId) => {
    dislikeComment(postId, commentId);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reacted!</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Like ({likeCountMap.thumbsUp})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Angry ({likeCountMap.angry})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>
            Laugh ({likeCountMap.laugh})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.id}>
                <p className="name">{comment.name}</p>
                <p className="comment">{comment.comment}</p>
                {currentUser && (
                  <div className="comment-actions">
                    {currentUser.name === comment.name && (
                      <>
                        <AiOutlineEdit
                          size={20}
                          color="#0a66c2"
                          onClick={() =>
                            handleUpdateComment(postId, comment.id, updatedComment)
                          }
                        />
                        <AiOutlineDelete
                          size={20}
                          color="#dc143c"
                          onClick={() =>
                            handleDeleteComment(comment.id)
                          }
                        />
                      </>
                    )}
                    {currentUser.name !== comment.name && (
                      <>
                        <AiOutlineLike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleLikeComment(postId, comment.id)
                          }
                        />
                        <AiOutlineDislike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleDislikeComment(postId, comment.id)
                          }
                        />
                      </>
                    )}
                  </div>
                )}
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}











/*
import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  deleteComment,
  //updateComment,
  likeComment,
  dislikeComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [comments, setComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + (liked ? -1 : 1),
    }));
  };

  const EnableEditComment = (id) => {
    setEditComment(id);
  }
  
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  const handleLikeComment = (postId, commentId) => {
    likeComment(postId, commentId);
  };

  const handleDislikeComment = (postId, commentId) => {
    dislikeComment(postId, commentId);
  };

  const handleUpdateComment = (postId, commentId, updatedComment) => {
    EnableEditComment(commentId);
    updateComment(postId, commentId, updatedComment);
    setUpdatedComment("");
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reacted!</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Like ({likeCountMap.thumbsUp})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Angry ({likeCountMap.angry})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>
            Laugh ({likeCountMap.laugh})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{
                (editComment=='') ?                                                
                (comment.comment) : 
                <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment.comment}
          />           
                
                }
                
                
                </p>
                {currentUser && (
                  <div className="comment-actions">
                    {currentUser.name === comment.name && (
                      <>
                        <AiOutlineEdit
                          size={20}
                          color="#0a66c2"
                          onClick={() =>
                            handleUpdateComment(postId, comment.id, updatedComment)
                          }
                        />
                        <AiOutlineDelete
                          size={20}
                          color="#dc143c"
                          onClick={() =>
                            handleDeleteComment(comment.id)
                          }
                        />
                      </>
                    )}
                    {currentUser.name !== comment.name && (
                      <>
                        <AiOutlineLike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleLikeComment(postId, comment.id)
                          }
                        />
                        <AiOutlineDislike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleDislikeComment(postId, comment.id)
                          }
                        />
                      </>
                    )}
                  </div>
                )}
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}







/*
import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  //deleteComment,
  //updateComment,
  //likeComment,
 // dislikeComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + (liked ? -1 : 1),
    }));
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  const handleLikeComment = (postId, commentId) => {
    likeComment(postId, commentId);
  };

  const handleDislikeComment = (postId, commentId) => {
    dislikeComment(postId, commentId);
  };

  const handleUpdateComment = (postId, commentId, updatedComment) => {
    updateComment(postId, commentId, updatedComment);
    setUpdatedComment("");
  };

  const handleDeleteComment = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reacted!</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Like ({likeCountMap.thumbsUp})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Angry ({likeCountMap.angry})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>
            Laugh ({likeCountMap.laugh})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{comment.comment}</p>
                {currentUser && (
                  <div className="comment-actions">
                    {currentUser.name === comment.name && (
                      <>
                        <AiOutlineEdit
                          size={20}
                          color="#0a66c2"
                          onClick={() =>
                            handleUpdateComment(postId, comment.id, updatedComment)
                          }
                        />
                        <AiOutlineDelete
                          size={20}
                          color="#dc143c"
                          onClick={() =>
                            handleDeleteComment(postId, comment.id)
                          }
                        />
                      </>
                    )}
                    {currentUser.name !== comment.name && (
                      <>
                        <AiOutlineLike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleLikeComment(postId, comment.id)
                          }
                        />
                        <AiOutlineDislike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleDislikeComment(postId, comment.id)
                          }
                        />
                      </>
                    )}
                  </div>
                )}
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}









/*import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
 deleteComment,
  updateComment,
  likeComment,
  dislikeComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [updatedComment, setUpdatedComment] = useState("");

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + (liked ? -1 : 1),
    }));
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  const handleLikeComment = (postId, commentId) => {
    likeComment(postId, commentId);
  };

  const handleDislikeComment = (postId, commentId) => {
    dislikeComment(postId, commentId);
  };

  const handleUpdateComment = (postId, commentId, updatedComment) => {
    updateComment(postId, commentId, updatedComment);
    setUpdatedComment("");
  };

  const handleDeleteComment = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reacted!</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Like ({likeCountMap.thumbsUp})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>
            Angry ({likeCountMap.angry})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>
            Laugh ({likeCountMap.laugh})
          </p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{comment.comment}</p>
                {currentUser && (
                  <div className="comment-actions">
                    {currentUser.name === comment.name && (
                      <>
                        <AiOutlineEdit
                          size={20}
                          color="#0a66c2"
                          onClick={() =>
                            handleUpdateComment(postId, comment.commentId, updatedComment)
                          }
                        />
                        <AiOutlineDelete
                          size={20}
                          color="#dc143c"
                          onClick={() =>
                            handleDeleteComment(postId, comment.commentId)
                          }
                        />
                      </>
                    )}
                    {currentUser.name !== comment.name && (
                      <>
                        <AiOutlineLike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleLikeComment(postId, comment.commentId)
                          }
                        />
                        <AiOutlineDislike
                          size={20}
                          color="black"
                          onClick={() =>
                            handleDislikeComment(postId, comment.commentId)
                          }
                        />
                      </>
                    )}
                  </div>
                )}
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}






/*

import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCountMap, setLikeCountMap] = useState({
    thumbsUp: 0,
    love: 0,
    angry: 0,
    laugh: 0,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = (reaction) => {
    likePost(userId, postId, liked);
    setLiked((prevState) => !prevState);
    setLikeCountMap((prevMap) => ({
      ...prevMap,
      [reaction]: prevMap[reaction] + 1,
    }));
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reaction!</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div
          className="likes-comment-inner"
          onClick={() => handleLike("thumbsUp")}
        >
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Like ({likeCountMap.thumbsUp})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("love")}
        >
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love ({likeCountMap.love})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("angry")}
        >
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Angry ({likeCountMap.angry})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => handleLike("laugh")}
        >
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>Laugh ({likeCountMap.laugh})</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{comment.comment}</p>
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}






/*import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people reaction !</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Like</p>
        </div>

        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Love</p>
        </div>

        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}
          <p className={liked ? "red" : "pink"}>Angry</p>
        </div>

        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}
          <p className={liked ? "yellow" : "pink"}>Laugh</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "yellow" : "brown"}
          />
          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="all-comments" key={comment.timeStamp}>
                <p className="name">{comment.name}</p>
                <p className="comment">{comment.comment}</p>
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}







/*import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import {FaLaughBeam} from "react-icons/Fa"
import {FaRegAngry} from "react-icons/Fa";




export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleLike = () => {
    likePost(userId, postId, liked);
  };
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };
  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);
  return (
    <div className="like-container">
      <p>{likesCount} people reaction !</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">



        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="pink" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <p className={liked ? "red" : "pink"}>Like</p>
        </div>



        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiOutlineHeart size={30} color="red" />
          ) : (
            <AiFillHeart size={30} />
          )}

          <p className={liked ? "red" : "pink"}>Love</p>
        </div>



        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <PiSmileyAngryFill size={30} color="purple" />
          ) : (
            <FaRegAngry size={30} />
          )}

          <p className={liked ? "red" : "pink"}>Angry</p>
        </div>


        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BiLaugh size={30} color="yellow" />
          ) : (
            <FaLaughBeam size={30} />
          )}

          <p className={liked ? "yellow" : "pink"}>Laugh</p>
        </div>






        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "yellow" : "brown"}
            />
          }

          <p className={showCommentBox ? "red" : "green"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>

                  <p className="timestamp">{comment.timeStamp}</p>
                 }
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}








/*
import React, { useMemo, useState } from "react";
import { likePost, getLikesByUser, postComment, getComments } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState({
    like: 0,
    heart: 0,
    angry: 0,
    laugh: 0,
  });
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = (type) => {
    // Update the local state first to provide immediate feedback to the user.
    setActiveIcon(activeIcon === type ? null : type);

    // Calculate the new like status based on the current state and the clicked type.
    const newLikeStatus = activeIcon === type ? false : true;

    // Make a single API call to update the like status.
    likePost(userId, postId, newLikeStatus);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, (liked) => {
      if (liked) setActiveIcon("like");
      else setActiveIcon(null);
    }, (likes) => {
      setLikesCount(likes);
    });

    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount.like} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>

     <div className="like-comment">




        <div className="likes-comment-inner" onClick={() => handleLike("like")}>
          {activeIcon === "like" ? (
            <AiFillHeart size={30} color="purple" />
          ) : (
            <AiOutlineLike color="pink" size={30} />
          )}
          <p className={activeIcon === "like" ? "purple" : "black"}>{likesCount.like}</p>
        </div>

        <div className="likes-comment-inner" onClick={() => handleLike("heart")}>
          {activeIcon === "heart" ? (
            <AiFillHeart size={30} color="purple" />
          ) : (
            <AiOutlineHeart color="pink" size={30} />
          )}
          <p className={activeIcon === "heart" ? "purple" : "black"}>{likesCount.heart}</p>
        </div>

        <div className="likes-comment-inner" onClick={() => handleLike("angry")}>
          {activeIcon === "angry" ? (
            <PiSmileyAngryFill size={30} color="red" />
          ) : (
            <PiSmileyAngryFill color="pink" size={30} />
          )}
          <p className={activeIcon === "angry" ? "red" : "black"}>{likesCount.angry}</p>
        </div>

        <div className="likes-comment-inner" onClick={() => handleLike("laugh")}>
          {activeIcon === "laugh" ? (
            <BiLaugh size={30} color="orange" />
          ) : (
            <BiLaugh size={30} color="pink" />
          )}
          <p className={activeIcon === "laugh" ? "orange" : "black"}>{likesCount.laugh}</p>
        </div>

        <div className="likes-comment-inner" onClick={() => setShowCommentBox(!showCommentBox)}>
          {<AiOutlineComment size={30} color={showCommentBox ? "purple" : "pink"} />}
          <p className={showCommentBox ? "purple" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="view"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments" key={comment.id}>
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>
                  <p className="timestamp">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}


*/









