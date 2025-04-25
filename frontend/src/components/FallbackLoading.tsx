import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
};
function FallbackLoading() {
  return (
    <div className="`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-60 flex justify-center items-center bg-opacity-90 backdrop-blur-lg">
      <MoonLoader
        cssOverride={override}
        color={"#3800A7"}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default FallbackLoading;
