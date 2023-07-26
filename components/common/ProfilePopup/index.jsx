// ProfilePopup.js
// ProfilePopup.js

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
     
      <p className="headline">{currentUser?.headline}</p>
      <div className="but1">
      <Button
       
        title="Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button  title="Log out" onClick={onLogout}   />
      </div>
    </div>
  );
}











/*
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
     
      <p className="headline">{currentUser?.headline}</p>
      <div className="but1">
      <Button
       
        title="Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button  title="Log out" onClick={onLogout}   />
      </div>
    </div>
  );
}






/*import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">

      <p className="headline">{currentUser?.headline}</p>
      <Button
      className="buton"
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button className="buton" title="Log out" onClick={onLogout} />
    </div>
  );
}







/*import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
     
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
};
*/