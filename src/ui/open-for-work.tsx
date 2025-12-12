import { Button } from "./button";

export const OpenForWork = () => {
  return (
    <div
      className="fixed bottom-0 border rounded-lg shadow-sm shadow-blue-100 p-2 bg-muted/90 backdrop-blur-md z-50 mb-4"
      style={{
        right: "50vw",
        marginLeft: "auto",
        alignSelf: "center",
        transform: "translateX(50%)",
      }}
    >
        {/* <div className="w-full">
          <h1 className="text-sm mb-1">
            I'm <span className="font-bold">Open for Work</span>
          </h1>
        </div> */}
      <div className="flex flex-row items-center justify-between gap-2" style={{width: "max-content"}}>
        <a href="https://forms.gle/KGVAhKSUnjFnGaAw8" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="!bg-amber-400 text-black hover:text-amber-50 !transition-all duration-150">
            Contact
          </Button>
        </a>
        <a href="https://discord.gg/6B2xYsHgPT" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" className="!text-white !hover:bg-white !hover:text-black" style={{background: "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)"}}>
            Join Discord
          </Button>
        </a>
        
      </div>
    </div>
  );
};
