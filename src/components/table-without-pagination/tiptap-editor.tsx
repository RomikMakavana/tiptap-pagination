"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {WithoutPagination} from "tiptap-table-plus";
import { editorContent } from "@/lib/contents/table-plus-without-pagination";
import { Toolbar } from "@/ui/editor/toolbar";

const {TableKitPlus } = WithoutPagination;

const TiptapEditor = ({onlyEditor}: {onlyEditor: boolean}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TableKitPlus
      // TableRow,
      // TableCell,
      // TableHeader,
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
      <Toolbar onlyEditor={onlyEditor} optionsList={["undo", "redo", "bold", "italic", "underline", "strikethrough", "heading", "table", "duplicate-table"]} editor={editor} />
      <div className="">
        <EditorContent
          editor={editor}
          className="w-full mb-5 mt-2 editor-container"
          id="editor"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
