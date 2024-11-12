import { isAxiosError } from "axios";

type Props = {
  error: Error | null;
};

export default function ErrorComponent({ error }: Props) {
  console.log("Error:", error?.stack);
  return (
    <p className="w-full">
      {isAxiosError(error)
        ? error?.response?.data?.status_message
        : error?.message}
    </p>
  );
}
