import React from "react";
import { ClockLoader } from "react-spinners";

function CustomClockLoader() {
  return (
    <div className="col-span-12 row-span-full flex items-center justify-center w-[calc(100vw-2rem)] md:w-[calc(100vw-20rem)] h-[calc(100vh-8rem)]">
      <ClockLoader color="white" size={150} margin={5} />
    </div>
  );
}

export default CustomClockLoader;
