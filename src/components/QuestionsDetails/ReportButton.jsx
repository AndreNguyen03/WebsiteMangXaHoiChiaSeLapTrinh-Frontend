import React, { useState, useEffect } from "react";
import { Flag } from "lucide-react";
import axios from "axios";

const ReportButton = ({ auth, onClick, isReported }) => {
  const [Reported, setReported] = useState(isReported);

  useEffect(() => {
    setReported(isReported);
  }, [isReported]);

  return (
    <div>
      {" "}
      {auth.isAuthenticated && (
        <button disabled={Reported} onClick={onClick}>
          <Flag fill={Reported ? "red" : "transparent"} />
        </button>
      )}
    </div>
  );
};

export default ReportButton;
