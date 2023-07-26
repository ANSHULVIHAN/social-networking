import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { Button, Modal } from "antd";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModel";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  //console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
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
          src={
            Object.values(currentProfile).length === 0
              ? currentUser.imageLink
              : currentProfile?.imageLink
          }
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
      <div className="profile-card">
        {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <HiOutlinePencil  className="edit-icon" color="red" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            {currentUser.id === location?.state?.id ? (
              <img
                className="profile-image"
                onClick={() => setModalOpen(true)}
                src={
                  Object.values(currentProfile).length === 0
                    ? currentUser.imageLink
                    : currentProfile?.imageLink
                }
                alt="pic"
              />
            ) : (
              <img
                className="profile-image"
                onClick={() => setImageModal(true)}
                src={
                  Object.values(currentProfile).length === 0
                    ? currentUser.imageLink
                    : currentProfile?.imageLink
                }
                alt="pic"
              />
            )}
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
              (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, `}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}










/*import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModel";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <HiOutlinePencil  className="edit-icon" color="red" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="pic"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city   || currentProfile?.country ) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, `}                      
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}





/*import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,

} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData, }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  return isConnected || currentUser.id === posts.userID ? (
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
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}

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
      ) : (
        <></>
      )}
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
        open={imageModal}
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
  ) : (
    <></>
  );
}

*/