import SingleStack from "../Images/SingleStack.png";
import CopperPortDownPNG from "../Images/CopperPortDown.png";
import CopperPortUpPNG from "../Images/CopperPortUp.png";
import CopperPortErrPNG from "../Images/CopperPortErr.png";
import VcPortUpPNG from "../Images/VcPortUp.png";
import FiberPortDownPNG from "../Images/FiberPortDown.png";
import FiberPortUpPNG from "../Images/FiberPortUp.png";
import FiberPortErrPNG from "../Images/FiberPortErr.png";
import FiberTest from "../Images/fiber.png";
import FiberUpTest from "../Images/fiberUp.png";

export const CopperPortDown = () => {
  return <img width="25" height="25" src={CopperPortDownPNG} alt="Port Down" />;
};

export const CopperPortUp = () => {
  return <img width="25" height="25" src={CopperPortUpPNG} alt="Port Up" />;
};

export const CopperPortErr = () => {
  return (
    <img width="25" height="25" src={CopperPortErrPNG} alt="ethernet-off" />
  );
};

export const VcpPortUp = () => {
  return <img width="25" height="25" src={VcPortUpPNG} alt="sorting-arrows" />;
};

export const FiberPortUp = () => {
  return (
    <img
      className="mt-1"
      width="25"
      height="25"
      src={FiberUpTest}
      alt="rounded-square"
    />
  );
};

export const SRXPortUP = () => {
  return (
    <img
      className="mt-1"
      width="25"
      height="25"
      src={FiberPortUpPNG}
      alt="rounded-square"
    />
  );
};
export const SRXPortDown = () => {
  return (
    <img
      className="mt-1"
      width="25"
      height="25"
      src={FiberPortDownPNG}
      alt="rounded-square"
    />
  );
};

export const FiberPortDown = () => {
  return (
    <img
      className="mt-1"
      width="25"
      height="25"
      src={FiberTest}
      alt="rounded-square"
    />
  );
};

export const FiberPortErr = () => {
  return (
    <img width="25" height="25" src={FiberPortErrPNG} alt="rounded-square" />
  );
};

export const SingleSWA = () => {
  return <img width="48" height="48" src={SingleStack} alt="SingleStack" />;
};
