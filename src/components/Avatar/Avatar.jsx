import React from "react";

const Avatar = ({ gravatar }) => {
  return (
    <img
      src={gravatar}
      alt="https://placehold.co/600x400.png"
      class="relative inline-block size-12 rounded-full object-cover object-center"
    />
  );
};

export default Avatar;
