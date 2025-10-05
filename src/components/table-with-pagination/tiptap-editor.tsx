"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { editorContent } from "@/lib/contents/table-plus-with-pagination";
import { Toolbar } from "@/ui/editor/toolbar";
import { PaginationTable } from "tiptap-table-plus";
import { PAGE_SIZES, PaginationPlus } from "tiptap-pagination-plus";

const { TableCellPlus, TableHeaderPlus, TableRowPlus, TablePlus } = PaginationTable;

const TiptapEditor = ({onlyEditor}: {onlyEditor: boolean}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TablePlus.configure({
        resizeHandleStyle: {
          background: "gray",
        },
      }),
      TableRowPlus,
      TableCellPlus,
      TableHeaderPlus,
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
      <Toolbar onlyEditor={onlyEditor} optionsList={["undo", "redo", "bold", "italic", "underline", "strikethrough", "heading", "table", "page-size", "print"]} editor={editor} />
      <div className="overflow-x-auto" id="printableArea">
        <EditorContent
          editor={editor}
          className="w-full mb-5 mt-2"
          id="editor"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
