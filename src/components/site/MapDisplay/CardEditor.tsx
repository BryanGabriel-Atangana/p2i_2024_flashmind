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
    const MagicUrl = require("quill-magic-url").default;
    Quill.register("modules/magicUrl", MagicUrl);
  }

  function imageHandler() {
    var range = quill?.getSelection();
    var value = prompt("please copy paste the image url here.");
    if (value) {
      quill?.insertEmbed(range!.index, "image", value, Quill.sources.USER);
    }
  }
  return (
    <div className="w-full h-[200px] md:h-[320px] lg:h-[350px ]">
      <div ref={quillRef} />
    </div>
  );
}
