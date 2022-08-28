import React, { useEffect, useState } from "react";

export default function Input() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log(data);
  });

  return (
    <div>
          <input onClick={(e) => setData(e.target.files[0])} type="file"></input>
          <img src={data} alt="data"></img>
    </div>
  );
}
