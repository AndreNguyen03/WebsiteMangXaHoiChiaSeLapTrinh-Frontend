import { Button, TextInput } from "flowbite-react";
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
          Mật khẩu hiện tại
        </label>
        <TextInput
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordInputChange}
          placeholder="Nhập mật khẩu hiện tại"
        />
      </div>

      <div className="flex justify-end">
        <Link
          to="/ForgotPassword"
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-sm font-medium">
          Mật khẩu mới
        </label>
        <TextInput
          id="newPassword"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordInputChange}
          placeholder="Nhập mật khẩu mới"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Xác nhận mật khẩu mới
        </label>
        <TextInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordInputChange}
          placeholder="Xác nhận mật khẩu mới"
        />
      </div>

      <div className="mt-10">
        <Button
          type="submit"
          gradientMonochrome="lime"
          size="md"
          className="w-full text-white"
        >
          Cập nhật mật khẩu
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
