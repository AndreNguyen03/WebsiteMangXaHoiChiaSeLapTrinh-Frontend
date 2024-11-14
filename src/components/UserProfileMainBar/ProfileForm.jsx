import { useState } from "react";
import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Toast } from "flowbite-react";

const ProfileForm = ({ formData, handleInputChange, handleProfileUpdate }) => {
  return (
    <form onSubmit={handleProfileUpdate} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <TextInput
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="displayName" className="text-sm font-medium">
          Display Name
        </label>
        <TextInput
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          placeholder="Enter display name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <TextInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
        />
      </div>

      <Button
        gradientMonochrome="lime"
        type="submit"
        className="w-full text-white"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileForm;
