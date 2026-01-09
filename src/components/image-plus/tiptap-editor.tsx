"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { ImagePlus } from "tiptap-image-plus";  
import { editorContent } from "@/lib/contents/image-plus-content";
import { Toolbar } from "@/ui/editor/toolbar";

const TiptapEditor = ({onlyEditor}: {onlyEditor: boolean}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      ImagePlus.configure({
        containerStyle: {
          background: "linear-gradient(90deg,rgba(30, 88, 117, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
          padding: "25px",
          borderRadius: "10px",
        },
      }),
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-5",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }


  return (
    <div className="">
      <Toolbar onlyEditor={onlyEditor} optionsList={["undo", "redo", "bold", "italic", "underline", "strikethrough", "heading", "image"]} editor={editor} />
      <div className="">
        <EditorContent
          editor={editor}
          className="w-full border mb-5 mt-2 editor-container"
          id="editor"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
