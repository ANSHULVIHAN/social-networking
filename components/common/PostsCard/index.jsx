import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => handleDeletePost(posts.id)}
            />
          </div>
        ) : null}

        <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : null}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        visible={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  );
}












/*import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => handleDeletePost(posts.id)}
            />
          </div>
        ) : null}

        <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : null}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        visible={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  );
}







/*import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => handleDeletePost(posts.id)}
            />
          </div>
        ) : null}

        <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : null}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        visible={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  );
}
*/