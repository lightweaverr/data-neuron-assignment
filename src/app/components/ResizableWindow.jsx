"use client";

import "./resizable.css";
import { ResizableBox } from "react-resizable";
import UserForm from "./UserForm";
import Image from "next/image";

const ResizableWindow = () => {
  return (
    <div className="h-screen overflow-hidden">
      <ResizableBox
        className="relative bg-slate-300 "
        width={Infinity}
        height={500}
        axis="both"
        minConstraints={[100, 300]}
        maxConstraints={[6000, 600]}
        handleSize={[20, 20]}
        resizeHandles={["s"]}
      >
        <UserForm />
      </ResizableBox>

      <div className="flex justify-between">
        <ResizableBox
          className="rb-2 relative "
          width={1600}
          height={600}
          axis="both"
          minConstraints={[100, 100]}
          handleSize={[20, 20]}
          resizeHandles={["e"]}
        >
          <div className="m-2">
            <Image
              src="/img-0.jpg"
              alt="Your Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </ResizableBox>

        <ResizableBox
          className="rb-3 relative"
          width={1600}
          height={600}
          axis="both"
          minConstraints={[100, 100]}
          handleSize={[20, 20]}
          resizeHandles={["w"]}
        >
          <div className="m-2">
            <Image
              src="/img-1.jpg"
              alt="Your Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </ResizableBox>
      </div>
    </div>
  );
};

export default ResizableWindow;
