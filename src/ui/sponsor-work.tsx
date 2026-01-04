import { ExternalLink, Github } from "lucide-react"
import { Button } from "./button"

export const SponsorWork = () => {  
    return (
        <div className="w-full mb-1 flex flex-row gap-2 justify-between bg-white">
          <div className="inline-flex flex-row gap-2">
          <a
            href="https://github.com/RomikMakavana/tiptap-pagination"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="!bg-black">
              <Github className="h-4 w-4 text-white" />
            </Button>
          </a>
          <iframe src="https://github.com/sponsors/RomikMakavana/button" title="Sponsor RomikMakavana" height="32" width="114" style={{border: '0', borderRadius: '6px'}}></iframe>
          </div>
          <a
          href="https://romikmakavana.me/tiptap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="sm"
            className=" !bg-black !text-white !hover:bg-white !hover:text-black"
          >
              Documentation &nbsp;
            <ExternalLink className="h-4 w-4 mr-1" />
          </Button>
        </a>
          <a
            href="https://www.buymeacoffee.com/romikmakavana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: "35px", width: "132px" }}
            />
          </a>
          
        </div>
    )
}

export default SponsorWork;