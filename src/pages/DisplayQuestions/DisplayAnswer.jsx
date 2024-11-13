import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";

const DisplayAnswer = ({ question }) => {
  return (
    <div>
      {question.answers?.map((ans) => (
        <div className="display-answer" key={ans.userID}>
          <p>{ans.answerBody}</p>
          <div className="question-action-user">
            <div>
              <button type="button">Share</button>
              <button type="button">Delete</button>
            </div>
            <div>
              <p>answered {ans.answeredOn}</p>
              <Link to={`/User/${ans.userID}`} className="user-link">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="xs"
                />
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
