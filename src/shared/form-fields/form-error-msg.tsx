// components/ui/form/FormErrorMessage.tsx

interface FormErrorMsgProps {
  message?: string;
}

export default function FormErrorMsg({ message }: FormErrorMsgProps) {
  if (!message) return null;

  return <p className="text-red-500 text-sm mt-1">{message}</p>;
}
