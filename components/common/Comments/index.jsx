import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	getReplyComments,
	deleteReplyComment,
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


export default function CommentList({ userId, commentsId, currentUser }) {
	let navigate = useNavigate();
	const [commentsReply, setCommentsReply] = useState([]);

	const handleDeleteCommentReply = (commentId) => {
		deleteReplyComment(commentId);
	};

	useMemo(() => {
		getReplyComments(commentsId, (setCommentsReplyS) => {
			if (setCommentsReplyS != "") {
				setCommentsReply(setCommentsReplyS);
			} else {
				setCommentsReply([]);
			}

		});
	}, [userId, commentsId]);



	return (
		commentsReply?.length > 0 ? (
			commentsReply.map((recomment) => (
				<div className="all-comments" key={recomment.timeStamp} >
					<p className="name">{recomment.name}</p>
					<p className="comment" style={{ margin: 0 }}>
						{recomment.comment}
					
					{currentUser.name === recomment.name && (
						<AiOutlineDelete
							size={15}
							color="#dc143c"
							style={{float: 'right'}}
							onClick={() =>
								handleDeleteCommentReply(recomment.id)
							}
						/>
					)}
					</p>
					<p className="timestamp">{recomment.timeStamp}</p>
				</div>
			))
		) : (
			<></>
		)
	);
}