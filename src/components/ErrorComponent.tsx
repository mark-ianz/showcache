type Props = {
  error: Error | null;
};

export default function ErrorPage({ error }: Props) {
  return <div>{error?.message}</div>;
}
