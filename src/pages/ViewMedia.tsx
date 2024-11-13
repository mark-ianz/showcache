import { useParams } from "react-router-dom"

type Props = {}

export default function ViewMedia({}: Props) {
  const { type, id } = useParams ();

  

  console.log(type,id)
  return (
    <div>ViewMedia</div>
  )
}