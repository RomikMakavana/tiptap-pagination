import {
  Bold,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  Redo,
  Strikethrough,
  Trash2,
  Undo,
  UnderlineIcon,
  ListOrdered,
  List,
  Quote,
  TableIcon,
  Copy,
  Printer,
  Settings,
} from "lucide-react";
import SponsorWork from "../sponsor-work";
import { Button } from "../button";
import { Editor } from "@tiptap/react";
import { ToolbarOptions } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { PAGE_SIZES, type PageSize } from "tiptap-pagination-plus";
import { cn } from "@/lib/utils";
import { HeaderFooter } from "./header-footer";
import { useState } from "react";

export const Toolbar = ({
  onlyEditor,
  optionsList,
  editor,
  className,
}: {
  onlyEditor: boolean;
  optionsList: ToolbarOptions[];
  editor: Editor;
  className?: string;
}) => {
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 4, withHeaderRow: true })
      .run();
  };

  const insertImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };
  const duplicateColumn = () => {
    editor.chain().focus().duplicateColumn().run();
  };

  const duplicateRow = () => {
    editor.chain().focus().duplicateRow(true).run(); // @ts-ignore
  };

  const pageOptions: { label: string; value: PageSize }[] = [
    { label: "A4", value: {...PAGE_SIZES.A4, marginTop: 76, marginBottom: 76} },
    { label: "A3", value: {...PAGE_SIZES.A3, marginTop: 76, marginBottom: 76} },
    { label: "A5", value: PAGE_SIZES.A5 },
    { label: "Letter", value: PAGE_SIZES.LETTER },
    { label: "Legal", value: PAGE_SIZES.LEGAL },
    { label: "Tabloid", value: PAGE_SIZES.TABLOID },
  ];

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let size = pageOptions.find((size) => size.label === event.target.value);
    if(size) editor.chain().focus().updatePageSize(size.value).run();
  };

  const [open, setOpen] = useState(false);

  return (
    <div className={cn("sticky top-0 z-[10] pt-8 toolbar-container max-w-4xl mx-auto", className)}>
      {onlyEditor ? <> </> : <SponsorWork />}
      <div className="border rounded-lg shadow-sm p-2 bg-muted/90 backdrop-blur-md flex justify-between">
        <div className="flex flex-wrap gap-1">
          <div className="flex flex-wrap gap-0.5">
            {optionsList.includes("undo") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo className="h-4 w-4" />
              </Button>
            )}
            {optionsList.includes("redo") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo className="h-4 w-4" />
              </Button>
            )}

            <div className="border-l mx-0.5" />
            {optionsList.includes("heading") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={editor.isActive("heading", { level: 1 })}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            )}
            {optionsList.includes("heading") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor.isActive("heading", { level: 2 })}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="border-l mx-0.5" />
          {optionsList.includes("bold") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
            >
              <Bold className="h-4 w-4" />
            </Button>
          )}
          {optionsList.includes("italic") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
          )}
          {optionsList.includes("underline") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
          )}
          {optionsList.includes("strikethrough") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          )}
          {optionsList.includes("list") && (
            <>
              <div className="border-l mx-0.5" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </>
          )}
          {optionsList.includes("blockquote") && (
            <>
              <div className="border-l mx-0.5" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive("blockquote")}
              >
                <Quote className="h-4 w-4" />
              </Button>
            </>
          )}
          {optionsList.includes("table") && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={insertTable}
                isActive={editor.isActive("table")}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
              {editor.isActive("table") && (
                <>
                  {optionsList.includes("duplicate-table") && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={duplicateColumn}
                        className="text-xs"
                      >
                        <Copy className="h-4 w-4" /> &nbsp; Column
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={duplicateRow}
                        className="text-xs"
                      >
                        <Copy className="h-4 w-4" /> &nbsp; Row
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addColumnBefore}
                    className="text-xs"
                  >
                    ←Col
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addColumnAfter}
                    className="text-xs"
                  >
                    Col→
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addRowBefore}
                    className="text-xs"
                  >
                    ↑Row
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addRowAfter}
                    className="text-xs"
                  >
                    Row↓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={deleteTable}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </>
          )}
          {optionsList.includes("image") && (
            <>
              <div className="border-l mx-0.5" />
              <Button
                variant="ghost"
                size="sm"
                onClick={insertImage}
                isActive={editor.isActive("imagePlus")}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              {editor.isActive("imagePlus") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().deleteSelection().run()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>

        {optionsList.includes("header-footer") && (<>
          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            <Settings className="h-4 w-4" /> &nbsp; Header & Footer
          </Button>
          <HeaderFooter open={open} onChange={setOpen} editor={editor} />
        </>
        )}


        <div>
          {optionsList.includes("print") && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="ghost" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50">
                  <Dialog.Content className="fixed top-1/2 left-1/2 max-w-[450px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
                    <Dialog.Title className="text-lg font-bold">
                      Print Page
                    </Dialog.Title>
                    <Dialog.Description className="mt-2">
                      This is only a page print (without header and footer), not
                      an exported document. Do you want to continue?
                    </Dialog.Description>
                    <div className="mt-4 flex justify-end gap-3">
                      <Dialog.Close asChild>
                        <Button variant="outline" size="lg">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => window.print()}
                      >
                        Print
                      </Button>
                    </div>
                  </Dialog.Content>
                </Dialog.Overlay>
              </Dialog.Portal>
            </Dialog.Root>
          )}
          {optionsList.includes("page-size") && (
            <select onChange={handlePageSizeChange}>
              {pageOptions.map((size, index) => (
                <option key={index} value={size.label}>
                  {size.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
