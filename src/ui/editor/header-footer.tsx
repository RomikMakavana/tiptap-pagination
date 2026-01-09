"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PaginationPlusOptions } from "tiptap-pagination-plus";
import { Toolbar } from "./toolbar";
import { Button } from "../button";
import { PageNumber } from "tiptap-pagination-plus";

export const HeaderFooter = (props: { open: boolean, onChange: (open: boolean) => void, editor: Editor, pageNumber: PageNumber | null }) => {

  const [configuration, setConfiguration] = useState<PaginationPlusOptions|null>(null);
  const [focusedEditor, setFocusedEditor] = useState<"header-left" | "header-right" | "footer-left" | "footer-right">("header-left");
  const [diffrentForThisPage, setDiffrentForThisPage] = useState(false);

  useEffect(() => {
    if(props.open) {
      const paginationExtension = props.editor.extensionManager.extensions.find(extension => extension.name === "PaginationPlus");
      if(paginationExtension) {
        const paginationExtensionConfiguration = paginationExtension.options;
        if(paginationExtensionConfiguration) {

          setConfiguration({
            ...paginationExtensionConfiguration,
          })

          if(
            props.pageNumber && (props.pageNumber in paginationExtensionConfiguration.customHeader || props.pageNumber in paginationExtensionConfiguration.customFooter)
          ) {
            setDiffrentForThisPage(true);
          } else {
            setDiffrentForThisPage(false);
          }
          updateEditorContent(props.pageNumber, paginationExtensionConfiguration);
        }
      }
    }
  }, [props.open]);

  const headerEditorLeft = useEditor({
    content: "Header Left",
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
    ],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    onFocus: () => setFocusedEditor("header-left"),
  });
  const headerEditorRight = useEditor({
    content: "Header Right",
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
    ],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    onFocus: () => setFocusedEditor("header-right"),
  });
  const footerEditorLeft = useEditor({
    content: "Footer Left",
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
    ],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    onFocus: () => setFocusedEditor("footer-left"),
  });
  const footerEditorRight = useEditor({
    content: "Footer Right",
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
    ],
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
    onFocus: () => setFocusedEditor("footer-right"),
  });

  const updateEditorContent = useCallback((pageNumber: PageNumber | null, paginationExtensionConfiguration: PaginationPlusOptions) => {
    if(paginationExtensionConfiguration) {

      let headerLeft = paginationExtensionConfiguration.headerLeft;
      let headerRight = paginationExtensionConfiguration.headerRight;
      let footerLeft = paginationExtensionConfiguration.footerLeft;
      let footerRight = paginationExtensionConfiguration.footerRight;

      if(pageNumber && pageNumber in paginationExtensionConfiguration.customHeader) {
        headerLeft = paginationExtensionConfiguration.customHeader[pageNumber].headerLeft;
        headerRight = paginationExtensionConfiguration.customHeader[pageNumber].headerRight;
      }

      if(pageNumber && pageNumber in paginationExtensionConfiguration.customFooter) {
        footerLeft = paginationExtensionConfiguration.customFooter[pageNumber].footerLeft;
        footerRight = paginationExtensionConfiguration.customFooter[pageNumber].footerRight;
      }

      if(headerEditorLeft) headerEditorLeft.commands.setContent(headerLeft);
      if(headerEditorRight) headerEditorRight.commands.setContent(headerRight);
      if(footerEditorLeft) footerEditorLeft.commands.setContent(footerLeft);
      if(footerEditorRight) footerEditorRight.commands.setContent(footerRight);
    }
  }, [headerEditorLeft, headerEditorRight, footerEditorLeft, footerEditorRight]);

  const handleChangeDifferentForThisPage = useCallback((_differentForThisPage: boolean) => {

    updateEditorContent(_differentForThisPage ? props.pageNumber : null, configuration as PaginationPlusOptions);
    setDiffrentForThisPage(_differentForThisPage);
  }, [updateEditorContent, props.pageNumber, configuration]);


  const updateValues = useCallback(() => {
    if(headerEditorLeft && footerEditorLeft && footerEditorRight && headerEditorRight) {
      const headerLeftContent = headerEditorLeft.getHTML();
      const headerRightContent = headerEditorRight.getHTML();
      const footerLeftContent = footerEditorLeft.getHTML();
      const footerRightContent = footerEditorRight.getHTML();
      if(diffrentForThisPage && props.pageNumber) {
        props.editor.commands.updateHeaderContent(headerLeftContent, headerRightContent, props.pageNumber);
        props.editor.commands.updateFooterContent(footerLeftContent, footerRightContent, props.pageNumber);
      } else {
        props.editor.commands.updateHeaderContent(headerLeftContent, headerRightContent);
        props.editor.commands.updateFooterContent(footerLeftContent, footerRightContent);
      }
    }
  }, [headerEditorLeft, footerEditorLeft, footerEditorRight, headerEditorRight, props.editor, diffrentForThisPage, props.pageNumber]);

  const maxHeaderHeight = useMemo(() => {
    return configuration ? Math.floor((configuration.pageHeight * 0.35) - configuration.marginTop - configuration.contentMarginTop) : 100;
  }, [configuration]);

  const maxFooterHeight = useMemo(() => {
    return configuration ? Math.floor((configuration.pageHeight * 0.35) - configuration.marginBottom - configuration.contentMarginBottom) : 100;
  }, [configuration]);

  if (!headerEditorLeft || !footerEditorLeft || !footerEditorRight || !headerEditorRight || !configuration) {
    return null;
  }

  const handleOpenChange =  (open: boolean) => {
    props.onChange(open);
  };

  const handleSave = () => {
    updateValues();
    handleOpenChange(false);
  };

  return (
    <Dialog.Root open={props.open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
      </Dialog.Trigger>
      <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50">
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg header-footer-container max-h-[80vh] flex flex-col">
          <Dialog.Title className="text-lg font-bold mb-2">
            Edit Header & Footer {props.pageNumber ? <span className="text-2xl float-end ml-2 text-gray-500">Page {props.pageNumber}</span> : ""}
          </Dialog.Title>
          {focusedEditor === "header-left" && <Toolbar onlyEditor={true} optionsList={["bold", "italic", "underline", "strikethrough", "heading"]} editor={headerEditorLeft} className="mb-2 inline-block !relative ml-[inherit] mr-auto !pt-1" />}
          {focusedEditor === "header-right" && <Toolbar onlyEditor={true} optionsList={["bold", "italic", "underline", "strikethrough", "heading"]} editor={headerEditorRight} className="mb-2 inline-block !relative ml-[inherit] mr-auto !pt-1" />}
          {focusedEditor === "footer-left" && <Toolbar onlyEditor={true} optionsList={["bold", "italic", "underline", "strikethrough", "heading"]} editor={footerEditorLeft} className="mb-2 inline-block !relative ml-[inherit] mr-auto !pt-1" />}
          {focusedEditor === "footer-right" && <Toolbar onlyEditor={true} optionsList={["bold", "italic", "underline", "strikethrough", "heading"]} editor={footerEditorRight} className="mb-2 inline-block !relative ml-[inherit] mr-auto !pt-1" />}
          <div className="grow overflow-y-auto">
            <div className="inline-flex justify-between" style={{ 
              width: configuration.pageWidth, 
              border: "1px solid", 
              borderBottom: "none", 
              paddingTop: configuration.marginTop,
              paddingLeft: configuration.marginLeft,
              paddingRight: configuration.marginRight,
            }}>
              <EditorContent editor={headerEditorLeft} className={cn({"is-empty": headerEditorLeft.isEmpty}, "header-left-editor editor-container overflow-hidden min-w-[100px]")} style={{ maxHeight: `${maxHeaderHeight}px` }} />
              <EditorContent editor={headerEditorRight} className={cn({"is-empty": headerEditorRight.isEmpty}, "header-right-editor editor-container overflow-hidden min-w-[100px]")} style={{ maxHeight: `${maxHeaderHeight}px` }} />
            </div>
            <div className="text-center bg-gray-200 py-2 my-0.5">
              Content gap
            </div>
            <div className="inline-flex justify-between" style={{ 
              width: configuration.pageWidth, border: "1px solid", borderTop: "none", 
              paddingBottom: configuration.marginBottom,
              paddingLeft: configuration.marginLeft,
              paddingRight: configuration.marginRight,
            }}>
              <EditorContent editor={footerEditorLeft} className={cn({"is-empty": footerEditorLeft.isEmpty}, "footer-left-editor editor-container overflow-hidden min-w-[100px]")} style={{ maxHeight: `${maxFooterHeight}px` }} />
              <EditorContent editor={footerEditorRight} className={cn({"is-empty": footerEditorRight.isEmpty}, "footer-right-editor editor-container overflow-hidden min-w-[100px]")} style={{ maxHeight: `${maxFooterHeight}px` }} />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
            {
              props.pageNumber && (
                <>
                  <input type="checkbox" className="h-4 w-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 accent-blue-600" checked={diffrentForThisPage} onChange={() => handleChangeDifferentForThisPage(!diffrentForThisPage)} />
                  <label htmlFor="diffrentForThisPage">&nbsp; Different for this page</label>
                </>
                )
              }
              </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-300" size="sm" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button variant="ghost" size="sm" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};