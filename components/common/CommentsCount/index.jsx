import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {	
	getLikesByComment,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import {
	AiOutlineDelete,
} from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { PiSmileyAngryFill } from "react-icons/pi";
import { BiLaugh } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import {
	FaRegAngry,
	FaReply
} from "react-icons/fa";


export default function CommentCount({ userId, commentsId }) {
	let navigate = useNavigate();
	const [LikesCommentCount, setLikesCommentCount] = useState(0);

	useMemo(() => {
		getLikesByComment(userId, commentsId, setLikesCommentCount)
	}, [userId, commentsId]);

	return (
		<p>({LikesCommentCount})</p>
	);
} 