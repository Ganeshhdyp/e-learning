import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { loadPdfDocument } from '@/lib/pdfUtils';

interface PdfViewerProps {
  pdfPath: string;
  onProgressUpdate?: (progress: number) => void;
}

export default function PdfViewer({ pdfPath, onProgressUpdate }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when the PDF path changes
    setCurrentPage(1);
    setPdfDocument(null);
    setLoadingError(null);
    
    // Load PDF document
    const loadPdf = async () => {
      try {
        const document = await loadPdfDocument(pdfPath);
        setPdfDocument(document);
        setTotalPages(document.numPages);
        
        // Render first page
        renderPage(1, document);
        
        // Report initial progress (viewed first page)
        if (onProgressUpdate) {
          onProgressUpdate(Math.round((1 / document.numPages) * 100));
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
        setLoadingError("Failed to load PDF document. Please try again later.");
      }
    };
    
    loadPdf();
  }, [pdfPath, onProgressUpdate]);

  const renderPage = async (pageNumber: number, doc: any = pdfDocument) => {
    if (!doc) return;
    
    try {
      const page = await doc.getPage(pageNumber);
      const canvas = canvasRef.current;
      
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1.5 });
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
      // Update progress based on viewed pages
      if (onProgressUpdate) {
        const progress = Math.round((pageNumber / totalPages) * 100);
        onProgressUpdate(progress);
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      setLoadingError("Failed to render PDF page. Please try again.");
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      renderPage(newPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      renderPage(newPage);
    }
  };

  const downloadPdf = () => {
    // For our application structure, we need to handle the download differently
    // based on the source of the PDF
    
    // Get the actual PDF URL that's being displayed
    const unitMatch = pdfPath.match(/\/units\/(\d+)/);
    let downloadUrl = pdfPath;
    
    if (unitMatch && unitMatch[1]) {
      const unitId = unitMatch[1];
      // Map to the correct PDF path for download
      downloadUrl = `/pdfs/unit-${unitId}.pdf`;
    }
    
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `unit-${unitMatch?.[1] || '1'}-material.pdf`;
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h3 className="font-medium">Learning Materials</h3>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous Page</span>
          </Button>
          
          <span className="text-sm self-center">
            Page {currentPage} of {totalPages || '?'}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next Page</span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={downloadPdf}>
            <Download className="h-5 w-5" />
            <span className="sr-only">Download PDF</span>
          </Button>
        </div>
      </div>
      
      <div ref={containerRef} className="pdf-container p-4 flex justify-center items-start bg-neutral-100" style={{ height: '600px', overflowY: 'auto' }}>
        {loadingError ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <p className="text-error mb-4">{loadingError}</p>
            <Button onClick={() => renderPage(currentPage)}>Retry</Button>
          </div>
        ) : !pdfDocument ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <canvas ref={canvasRef} className="shadow-sm"></canvas>
        )}
      </div>
    </div>
  );
}
