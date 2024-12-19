import { useState } from "react";
import { Button, TextInput, Toast } from "flowbite-react";

const ProfileForm = ({ formData, handleInputChange, handleProfileUpdate }) => {
  return (
    <form onSubmit={handleProfileUpdate} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Tên đăng nhập
        </label>
        <TextInput
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Nhập tên đăng nhập"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="avatar" className="text-sm font-medium">
          Avatar URL
        </label>
        <TextInput
          id="avatar"
          name="gravatar" // Đồng bộ với formData.gravatar
          type="text" // Sử dụng type phù hợp
          value={formData.gravatar}
          onChange={handleInputChange}
          placeholder="Nhập avatar URL"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <TextInput
          disabled
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Nhập email"
        />
      </div>

      <Button
        gradientMonochrome="lime"
        type="submit"
        className="w-full text-white"
      >
        Lưu thay đổi
      </Button>
    </form>
  );
};

export default ProfileForm;
