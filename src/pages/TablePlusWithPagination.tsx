import { OpenForWork } from "@/ui/open-for-work";
import TiptapEditor from "@/components/table-with-pagination/tiptap-editor";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

function TablePlusWithPagination() {
  const [searchParams] = useSearchParams();
  const onlyEditor = useMemo(() => searchParams.has("frame"), [searchParams]);
  return (
    <div className="mx-auto px-2 relative">
      <TiptapEditor onlyEditor={onlyEditor} />
      {onlyEditor ? <> </> : <OpenForWork />} 
    </div>
  );
}

export default TablePlusWithPagination;
