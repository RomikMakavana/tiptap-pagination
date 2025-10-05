"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import { PaginationTable } from "tiptap-table-plus";
import { ImagePlus } from "tiptap-image-plus";
import { editorContent } from "@/lib/editor-content";
import { Toolbar } from "./editor/toolbar";
import { PaginationPlus, PAGE_SIZES } from "tiptap-pagination-plus";

const { TablePlus, TableRowPlus, TableCellPlus, TableHeaderPlus } =
  PaginationTable;

const TiptapEditor = ({ onlyEditor }: { onlyEditor: boolean }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TablePlus,
      TableRowPlus,
      TableCellPlus,
      TableHeaderPlus,
      ListItem,
      ImagePlus.configure({
        containerStyle: {
          background:
            "linear-gradient(90deg,rgba(30, 88, 117, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
          padding: "25px",
          borderRadius: "10px",
        },
      }),
      PaginationPlus.configure({
        pageGap: 20,
        pageBreakBackground: "hsl(var(--background))",
        pageHeaderHeight: 25,
        pageFooterHeight: 25,
        footerRight: "Made with ❤️ by Romik",
        footerLeft: "Page {page}",
        headerLeft: "Header Left",
        headerRight: "Header Right",
        contentMarginTop: 30,
        contentMarginBottom: 30,
        ...PAGE_SIZES.A4,
        marginTop: 76,
        marginBottom: 76,
      }),
    ],
    // content: editorContentLong,
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px]",
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
      <Toolbar
        onlyEditor={onlyEditor}
        optionsList={[
          "undo",
          "redo",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "heading",
          "list",
          "image",
          "table",
          "duplicate-table",
          "blockquote",
          "print",
          "page-size",
        ]}
        editor={editor}
      />
      <div className="overflow-x-auto" id="printableArea">
        <EditorContent editor={editor} id="editor" className="w-full mb-5 mt-2" />
      </div>
    </div>
  );
};

export default TiptapEditor;
