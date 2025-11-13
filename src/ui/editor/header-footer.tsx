"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PaginationPlusOptions } from "tiptap-pagination-plus";
import { Toolbar } from "./toolbar";
import { Button } from "../button";

export const HeaderFooter = (props: { open: boolean, onChange: (open: boolean) => void, editor: Editor }) => {

  const [configuration, setConfiguration] = useState<PaginationPlusOptions|null>(null);
  const [focusedEditor, setFocusedEditor] = useState<"header-left" | "header-right" | "footer-left" | "footer-right">("header-left");

  useEffect(() => {
    if(props.open) {
      const paginationExtension = props.editor.extensionManager.extensions.find(extension => extension.name === "PaginationPlus");
      if(paginationExtension) {
        const paginationExtensionConfiguration = paginationExtension.options;
        if(paginationExtensionConfiguration) {
          setConfiguration({
            ...paginationExtensionConfiguration,
          })
          if(headerEditorLeft) headerEditorLeft.commands.setContent(paginationExtensionConfiguration.headerLeft);
          if(headerEditorRight) headerEditorRight.commands.setContent(paginationExtensionConfiguration.headerRight);
          if(footerEditorLeft) footerEditorLeft.commands.setContent(paginationExtensionConfiguration.footerLeft);
          if(footerEditorRight) footerEditorRight.commands.setContent(paginationExtensionConfiguration.footerRight);
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

  const updateValues = () => {
    if(headerEditorLeft && footerEditorLeft && footerEditorRight && headerEditorRight) {
      console.log("I am updating header and footer content");
      const headerLeftContent = headerEditorLeft.getHTML();
      const headerRightContent = headerEditorRight.getHTML();
      const footerLeftContent = footerEditorLeft.getHTML();
      const footerRightContent = footerEditorRight.getHTML();
      props.editor.commands.updateHeaderContent(headerLeftContent, headerRightContent);
      props.editor.commands.updateFooterContent(footerLeftContent, footerRightContent);
    }
  }

  const maxHeaderHeight = useMemo(() => {
    return configuration ? Math.floor((configuration.pageHeight * 0.35) - configuration.marginTop - configuration.contentMarginTop) : 100;
  }, [configuration]);

  const maxFooterHeight = useMemo(() => {
    return configuration ? Math.floor((configuration.pageHeight * 0.35) - configuration.marginBottom - configuration.contentMarginBottom) : 100;
  }, [configuration]);

  if (!headerEditorLeft || !footerEditorLeft || !footerEditorRight || !headerEditorRight || !configuration) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    props.onChange(open);
    if(!open) {
      updateValues();
    }
  }


  return (
    <Dialog.Root open={props.open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
      </Dialog.Trigger>
      <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50">
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg header-footer-container max-h-[80vh] flex flex-col">
          <Dialog.Title className="text-lg font-bold mb-2">
            Edit Header & Footer
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
          <div className="flex justify-end mt-2">
            <Button variant="ghost" size="sm" onClick={() => handleOpenChange(false)}>Save</Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};