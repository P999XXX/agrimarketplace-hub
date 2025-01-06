import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SignUpSuccessDialogProps {
  isOpen: boolean;
}

export const SignUpSuccessDialog = ({ isOpen }: SignUpSuccessDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-2xl">Thank You!</h3>
            <p className="text-gray-600">
              Your registration was successful. Please check your email to verify your account.
            </p>
            <p className="text-sm text-gray-500">
              You can close this window now.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};