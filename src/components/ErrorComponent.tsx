type Props = {
  error: Error | null;
};

export default function ErrorComponent({ error }: Props) {
  return <div>{error?.message}</div>;
}
