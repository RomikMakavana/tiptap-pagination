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
  MoreVertical,
  X,
  EllipsisVertical,
} from "lucide-react";
import SponsorWork from "../sponsor-work";
import { Button } from "../button";
import { Editor } from "@tiptap/react";
import { ToolbarOptions } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { PAGE_SIZES } from "tiptap-pagination-plus";
import { cn } from "@/lib/utils";
import { HeaderFooter } from "./header-footer";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FooterClickEvent, HeaderClickEvent, PageNumber, PageSize } from "tiptap-pagination-plus";

type ToolbarItem = {
  key: string;
  show: boolean;
  render?: () => React.ReactNode;
  children?: ToolbarItem[];
};

type ToolbarProps = {
  onlyEditor: boolean;
  optionsList: ToolbarOptions[];
  editor: Editor;
  className?: string;
}

 export type ToolbarRef = {
  onHeaderClick: HeaderClickEvent;
  onFooterClick: FooterClickEvent;
}

export const Toolbar = forwardRef<ToolbarRef, ToolbarProps>(({
  onlyEditor,
  optionsList,
  editor,
  className,
}, ref) => {
  // ========================================================================
  // 1. ACTIONS
  // ========================================================================
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

  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();
  const duplicateColumn = () => editor.chain().focus().duplicateColumn().run();
  const duplicateRow = () => {
    // @ts-ignore
    editor.chain().focus().duplicateRow(true).run();
  };

  const pageOptions: { label: string; value: PageSize }[] = [
    { label: "A4", value: { ...PAGE_SIZES.A4, marginTop: 76, marginBottom: 76 } },
    { label: "A3", value: { ...PAGE_SIZES.A3, marginTop: 76, marginBottom: 76 } },
    { label: "A5", value: PAGE_SIZES.A5 },
    { label: "Letter", value: PAGE_SIZES.LETTER },
    { label: "Legal", value: PAGE_SIZES.LEGAL },
    { label: "Tabloid", value: PAGE_SIZES.TABLOID },
  ];

  const [openHeaderFooter, setOpenHeaderFooter] = useState(false);
  const [pageNumber, setPageNumber] = useState<PageNumber | null>(null);
  useEffect(() => {
    if(!openHeaderFooter) {
      setPageNumber(null);
    }
  }, [openHeaderFooter]);

  const handleHeaderFooterClick = useCallback((params: { event: MouseEvent, pageNumber: PageNumber }) => {
    setPageNumber(params.pageNumber);
    setOpenHeaderFooter(true);
  }, [setOpenHeaderFooter]);

  useImperativeHandle(ref, () => ({
    onHeaderClick: handleHeaderFooterClick,
    onFooterClick: handleHeaderFooterClick,
  }));

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let size = pageOptions.find((size) => size.label === event.target.value);
    if (size) editor.chain().focus().updatePageSize(size.value).run();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ========================================================================
  // 2. TOOLBAR ITEMS DEFINITION
  // ========================================================================
  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        key: "undo",
        show: optionsList.includes("undo"),
        render: () => (
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "redo",
        show: optionsList.includes("redo"),
        render: () => (
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="h-4 w-4" />
          </Button>
        ),
      },
      { key: "sep-1", show: true, render: () => <div className="border-l mx-0.5 h-4" /> },
      {
        key: "heading-1",
        show: optionsList.includes("heading"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "heading-2",
        show: optionsList.includes("heading"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        ),
      },
      { key: "sep-2", show: true, render: () => <div className="border-l mx-0.5 h-4" /> },
      {
        key: "bold",
        show: optionsList.includes("bold"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "italic",
        show: optionsList.includes("italic"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "underline",
        show: optionsList.includes("underline"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "strike",
        show: optionsList.includes("strikethrough"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "bullet-list",
        show: optionsList.includes("list"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "ordered-list",
        show: optionsList.includes("list"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "blockquote",
        show: optionsList.includes("blockquote"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </Button>
        ),
      },
      {
        key: "image",
        show: optionsList.includes("image"),
        render: () => (
          <>
            <Button
              variant="ghost"
              size="sm"
              isActive={editor.isActive("imagePlus")}
              onClick={insertImage}
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
        ),
      },
      {
        key: "table",
        show: optionsList.includes("table"),
        render: () => (
          <Button
            variant="ghost"
            size="sm"
            isActive={editor.isActive("table")}
            onClick={insertTable}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        ),
        children: [
          {
            key: "table-duplicate-column",
            show: optionsList.includes("duplicate-table") && editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={duplicateColumn}>
                <Copy className="h-4 w-4" /> Col
              </Button>
            ),
          },
          {
            key: "table-duplicate-row",
            show: optionsList.includes("duplicate-table") && editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={duplicateRow}>
                <Copy className="h-4 w-4" /> Row
              </Button>
            ),
          },
          {
            key: "table-add-col-before",
            show: editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={addColumnBefore}>
                ←Col
              </Button>
            ),
          },
          {
            key: "table-add-col-after",
            show: editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={addColumnAfter}>
                Col→
              </Button>
            ),
          },
          {
            key: "table-add-row-before",
            show: editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={addRowBefore}>
                ↑Row
              </Button>
            ),
          },
          {
            key: "table-add-row-after",
            show: editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-xs" onClick={addRowAfter}>
                Row↓
              </Button>
            ),
          },
          {
            key: "table-delete",
            show: editor.isActive("table"),
            render: () => (
              <Button variant="ghost" size="sm" className="text-destructive" onClick={deleteTable}>
                <Trash2 className="h-4 w-4" />
              </Button>
            ),
          },
        ],
      },
    ],
    [
      optionsList,
      editor,
      insertImage,
      insertTable,
      duplicateColumn,
      duplicateRow,
      addColumnBefore,
      addColumnAfter,
      addRowBefore,
      addRowAfter,
      deleteTable,
    ]
  );

  const getItem = (key: string) => toolbarItems.find(item => item.key === key);

  // ========================================================================
  // 3. DESKTOP RESIZING LOGIC
  // ========================================================================
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const calculate = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const moreButtonWidth = 42; 
      const gap = 4;
      let totalNeededWidth = 0;
      const itemWidths: number[] = [];
      for (let i = 0; i < ghostItemRefs.current.length; i++) {
        const el = ghostItemRefs.current[i];
        if (!el) { itemWidths.push(0); continue; }
        const width = el.offsetWidth;
        itemWidths.push(width);
        totalNeededWidth += width;
        if (i < ghostItemRefs.current.length - 1) totalNeededWidth += gap;
      }
      if (totalNeededWidth <= containerWidth) { setVisibleCount(null); return; }
      const availableSpace = containerWidth - moreButtonWidth;
      let currentUsedWidth = 0;
      let count = 0;
      for (let i = 0; i < itemWidths.length; i++) {
        const width = itemWidths[i];
        if (currentUsedWidth + width <= availableSpace) {
          currentUsedWidth += width + gap;
          count++;
        } else { break; }
      }
      setVisibleCount(count);
    };
    calculate();
    const observer = new ResizeObserver(calculate);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [toolbarItems]);

  const activeItems = toolbarItems.filter((item) => item.show);
  const hiddenItems = useMemo(() => {
    if (visibleCount === null) return [];
    return activeItems.slice(visibleCount);
  }, [activeItems, visibleCount]);


  // ========================================================================
  // 4. RENDER
  // ========================================================================
  return (
    <>
      {/* 
        #################################################################
        DESKTOP VIEW (hidden on mobile)
        #################################################################
      */}
      <div className={cn("sticky top-0 z-[10] block w-full editor-header", className)}>
        <div className="max-w-4xl  mx-auto pt-2">
          <div className="h-2 w-full bg-white" />
          {!onlyEditor && <SponsorWork />}

          <div className="border rounded-lg shadow-sm p-2 bg-muted/90 backdrop-blur-md flex items-center gap-2">
            
            <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden">
              <div className="flex flex-nowrap gap-1">
                {activeItems
                  .slice(0, visibleCount ?? activeItems.length)
                  .map((item) => (
                    <div key={item.key} className="flex gap-1 shrink-0">
                      {item.render?.()}
                      {item.children?.filter((child) => child.show).map((child) => (
                          <div key={child.key} className="shrink-0">{child.render?.()}</div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {hiddenItems.length > 0 && (
                <DropdownMenu.Root modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end" sideOffset={8} className="bg-white border p-2 rounded shadow-xl z-[99999] max-w-[50vw] flex flex-wrap gap-1">
                    {hiddenItems.map((item) => (
                      <div key={item.key} className="contents">
                        <div className="shrink-0">{item.render?.()}</div>
                        {item.children?.filter((child) => child.show).map((child) => (
                            <div key={child.key} className="shrink-0">{child.render?.()}</div>
                        ))}
                      </div>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}

              {optionsList.includes("header-footer") && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setOpenHeaderFooter(true)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <HeaderFooter open={openHeaderFooter}  onChange={setOpenHeaderFooter} editor={editor} pageNumber={pageNumber} />
                </>
              )}

              {optionsList.includes("print") && (
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="sm"><Printer className="h-4 w-4" /></Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-w-[450px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-[51]">
                      <Dialog.Title className="text-lg font-bold">Print Page</Dialog.Title>
                      <Dialog.Description className="mt-2">
                      This is only a page print (without header and footer), not
                      an exported document. Do you want to continue?
                    </Dialog.Description>
                      <div className="mt-4 flex justify-end gap-3">
                        <Dialog.Close asChild><Button variant="outline" size="lg">Cancel</Button></Dialog.Close>
                        <Button variant="ghost" size="lg" onClick={() => window.print()}>Print</Button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              )}

              {optionsList.includes("page-size") && (
                <select onChange={handlePageSizeChange} className="border rounded px-2 py-1 text-sm bg-background">
                  {pageOptions.map((size, index) => <option key={index} value={size.label}>{size.label}</option>)}
                </select>
              )}

              <Button variant="ghost" size="sm" onClick={setMobileMenuOpen.bind(null, true)}>
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 
              GHOST CONTAINER - FIXED OFF-SCREEN 
              This prevents horizontal scrolling issues on tablets/small desktops
          */}
          <div 
            className="hidden md:flex flex-nowrap gap-1 fixed top-[-9999px] left-[-9999px] invisible pointer-events-none" 
            aria-hidden="true"
          >
            {activeItems.map((item, index) => (
              <div key={`ghost-${item.key}`} ref={(el) => (ghostItemRefs.current[index] = el)} className="flex gap-1 shrink-0">
                {item.render?.()}
                {item.children?.filter((child) => child.show).map((child) => <div key={`ghost-${child.key}`} className="shrink-0">{child.render?.()}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* 
        #################################################################
        MOBILE VIEW (visible only on mobile)
        #################################################################
      */}
      <div className={cn("md:hidden fixed bottom-0 left-0 right-0 z-[50] bg-white border-t p-2 pb-safe", className)}>
        <div className="flex items-center justify-between gap-2 max-w-full overflow-x-auto no-scrollbar">
          <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content 
                className="fixed bottom-0 left-0 right-0 z-[61] max-h-[85vh] overflow-y-auto rounded-t-[20px] bg-white p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300"
              >
                <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300 mb-6" />
                <Dialog.Title className="text-lg font-bold mb-4">Toolbar Options</Dialog.Title>

                <div className="space-y-6">
                  {/* Headings */}
                  {optionsList.includes("heading") && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Headings</h4>
                      <div className="flex flex-wrap gap-2">
                         {getItem("heading-1")?.render?.()}
                         {getItem("heading-2")?.render?.()}
                      </div>
                    </div>
                  )}

                   {/* Formatting */}
                   <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Text Formatting</h4>
                      <div className="flex flex-wrap gap-2">
                         {getItem("bold")?.render?.()}
                         {getItem("italic")?.render?.()}
                         {getItem("underline")?.render?.()}
                         {getItem("strike")?.render?.()}
                      </div>
                    </div>

                  {/* Lists */}
                  {(optionsList.includes("list") || optionsList.includes("blockquote")) && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lists & Quotes</h4>
                      <div className="flex flex-wrap gap-2">
                         {getItem("bullet-list")?.render?.()}
                         {getItem("ordered-list")?.render?.()}
                         {getItem("blockquote")?.render?.()}
                      </div>
                    </div>
                  )}

                  {/* Insert */}
                  {(optionsList.includes("image") || optionsList.includes("table")) && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Insert</h4>
                      <div className="flex flex-wrap gap-2 items-start">
                         {getItem("image")?.render?.()}
                         
                         {/* Table Options: Only show children if table is active */}
                         {getItem("table")?.show && (
                           <div 
                              className={cn(
                                "flex flex-wrap gap-1 items-center rounded-md transition-all",
                                editor.isActive("table") ? "bg-muted/50 p-1 border" : ""
                              )}
                           >
                              <div className={cn(editor.isActive("table") && "mr-1")}>
                                {getItem("table")?.render?.()}
                              </div>

                              {getItem("table")?.children
                                ?.filter(child => child.show)
                                .map(child => (
                                  <div key={child.key}>{child.render?.()}</div>
                              ))}
                           </div>
                         )}
                      </div>
                    </div>
                  )}

                   {/* Page Actions */}
                   <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Page Actions</h4>
                      <div className="flex flex-wrap gap-4 items-center">
                         {optionsList.includes("header-footer") && (
                            <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); setOpenHeaderFooter(true); }}>
                              <Settings className="h-4 w-4 mr-2" /> Header & Footer
                            </Button>
                         )}
                         {optionsList.includes("print") && (
                            <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); window.print(); }}>
                               <Printer className="h-4 w-4 mr-2" /> Print
                            </Button>
                         )}
                      </div>
                      
                      {optionsList.includes("page-size") && (
                        <div className="mt-2">
                          <select onChange={handlePageSizeChange} className="w-full border rounded p-2 text-sm bg-background">
                            {pageOptions.map((size, index) => <option key={index} value={size.label}>{size.label}</option>)}
                          </select>
                        </div>
                      )}
                   </div>
                </div>

                <Dialog.Close asChild>
                  <Button variant="ghost" className="absolute right-4 top-4">
                    <X className="h-4 w-4" />
                  </Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

        </div>
      </div>
    </>
  );
});