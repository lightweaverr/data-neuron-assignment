"use client";

import Image from "next/image";
import { Resizable, ResizableBox } from "react-resizable";
import ResizableWindow from "./components/ResizableWindow";

export default function Home() {
  return (
    <div className="m-0">
      <ResizableWindow />
    </div>
  );
}
