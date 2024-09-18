import React from "react";
import { useParams } from "react-router-dom";

export default function ViewShow() {
  const params = useParams();
  console.log(params);

  return (
    <main>
      <p></p>
    </main>
  );
}
