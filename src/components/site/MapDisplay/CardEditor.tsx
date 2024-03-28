"use client";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "react-quill-image-uploader";
import { useEffect, useRef } from "react";
import "quill-magic-url";
import { useCardStore } from "@/store/cards";

export default function CardEditor() {
  const { setAnswer } = useCardStore();
  const { quill, quillRef, Quill } = useQuill({
    modules: { magicUrl: true },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const answer = quill.root.innerHTML;
        setAnswer(answer);
      });
    }
  }, [quill, setAnswer]);

  if (Quill && !quill) {
    // For execute this line only once.
    const MagicUrl = require("quill-magic-url").default; // Install with 'yarn add quill-magic-url'
    Quill.register("modules/magicUrl", MagicUrl);
  }

  return (
    <div className="w-full h-[200px] md:h-[320px] lg:h-[350px ]">
      <div ref={quillRef} />
    </div>
  );
}
