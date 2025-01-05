import { PasswordInput } from "./PasswordInput";

interface ConfirmPasswordInputProps {
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ConfirmPasswordInput = ({
  confirmPassword,
  onChange,
}: ConfirmPasswordInputProps) => {
  return (
    <PasswordInput
      id="confirmPassword"
      label="Confirm Password"
      value={confirmPassword}
      onChange={onChange}
      placeholder="Confirm your password"
    />
  );
};