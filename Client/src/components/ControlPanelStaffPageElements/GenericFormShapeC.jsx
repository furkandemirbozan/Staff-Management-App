import React from "react";

function GenericFormShapeC() {
  return (
    <div
      className="hidden xl:flex flex-col col-span-full sm:col-span-2 xl:col-span-2 bg-transparent rounded-xl"
      style={{
        backgroundImage: "url('https://i.pinimg.com/564x/31/f4/bc/31f4bcd96b665afc07db1f858191ce4f.jpg')",
        backgroundSize: "cover", // "contain", "cover", or specific size like "100% 100%"
        backgroundPosition: "center", // "center", "top", "bottom", etc.
        backgroundRepeat: "no-repeat", // "no-repeat", "repeat", or "repeat-x/y"
        width: "200px", // Set width as per requirement
        height: "200px", // Set height as per requirement
      }}
    ></div>
  );
}

export default GenericFormShapeC;
