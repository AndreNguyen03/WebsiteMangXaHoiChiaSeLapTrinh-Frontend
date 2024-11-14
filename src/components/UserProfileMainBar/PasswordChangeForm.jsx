import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const PasswordChangeForm = ({
  passwordData,
  handlePasswordInputChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handlePasswordChange} className="mt-4 space-y-2">
      <div className="space-y-2">
        <label htmlFor="currentPassword" className="text-sm font-medium">
          Current Password
        </label>
        <TextInput
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordInputChange}
          placeholder="Enter current password"
        />
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-sm font-medium">
          New Password
        </label>
        <TextInput
          id="newPassword"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordInputChange}
          placeholder="Enter new password"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm New Password
        </label>
        <TextInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordInputChange}
          placeholder="Confirm new password"
        />
      </div>

      <div className="mt-10">
        <Button
          type="submit"
          gradientMonochrome="lime"
          size="md"
          className="w-full text-white"
        >
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
