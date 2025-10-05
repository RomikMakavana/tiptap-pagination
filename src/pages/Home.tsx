import { OpenForWork } from "@/ui/open-for-work";
import TiptapEditor from "@/ui/tiptap-editor";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
  // Get query params
  const [searchParams] = useSearchParams();

  const onlyEditor = useMemo(() => searchParams.has("frame"), [searchParams]);

  return (
    <div className="mx-auto px-2 relative">
      <TiptapEditor onlyEditor={onlyEditor} />
      {onlyEditor ? <> </> : <OpenForWork />} 
    </div>
  );
}

export default Home;
