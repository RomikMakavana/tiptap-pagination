import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Import your components/pages
import { Linkedin, Loader, Twitter } from 'lucide-react';
import { Suspense } from 'react';
import { cn } from './lib/utils';
import Home from './pages/Home';
import { AnimatePresence } from 'framer-motion';
import { BASE_PATH } from './lib/config';
import ImagePlus from './pages/ImagePlus';
import TablePlusWithoutPagination from './pages/TablePlusWithoutPagination';
import TablePlusWithPagination from './pages/TablePlusWithPagination';
import { useEffect } from 'react';
import { toast } from 'sonner';

function App() {  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast(
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <span className="text-xl">💜</span>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Your support means a lot!</h2>
              <p className="text-sm text-muted-foreground">
                This project is built with care and shared completely free. If it saved you time or inspired your work, you can support it simply by sharing with others.
              </p>
              <p className="text-sm text-muted-foreground">
                🌍 A quick post on LinkedIn or Twitter helps more developers discover this solution — and it means the world to us 🙏.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  "https://romikmakavana.me/tiptap-pagination/"
                )}`;
                window.open(
                  shareUrl,
                  "linkedin-share-dialog",
                  "width=600,height=600,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
                );
                toast.dismiss();
              }}
              className="px-3 py-1.5 text-sm !bg-[#0077b5] text-white rounded-md !hover:bg-[#006399] transition-colors"
            >
              <Linkedin /> Share on LinkedIn
            </button>
            <button
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out Tiptap Pagination - Add pagination to your Tiptap editor!")}&url=${encodeURIComponent("https://romikmakavana.me/tiptap-pagination/")}`,
                  "_blank"
                );
                toast.dismiss();
              }}
              className="px-3 py-1.5 text-sm !bg-[#1DA1F2] text-white rounded-md !hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter /> Share on Twitter
            </button>
          </div>
        </div>,
        {
          duration: Infinity,
          position: "bottom-right",
        }
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <><Suspense fallback={<LoadingSpinner />}>
      <Router basename={BASE_PATH}>
          <AnimatePresence mode="wait">
            <Routes >
              <Route path='*' element={<Home />} />
              <Route path='image-plus' element={<ImagePlus />} />
              <Route path='table-plus' element={<TablePlusWithoutPagination />} />
              <Route path='table-plus-with-pagination' element={<TablePlusWithPagination />} />
            </Routes>
          </AnimatePresence>
        </Router>
    </Suspense></>
  );
}

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return <div className="flex justify-center items-center w-full h-screen">
      <Loader className={cn("animate-spin w-15 h-15", className)} />
    </div>;
};

export default App;
