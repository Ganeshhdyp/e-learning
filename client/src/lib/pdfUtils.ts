// This file handles PDF loading and rendering
// using the PDF.js library

let pdfjsLib: any;

// Declare the window object shape to include pdfjsLib
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

// Initialize PDF.js
export const initPdfJs = async () => {
  if (!pdfjsLib) {
    // Check if the library is available
    if (typeof window.pdfjsLib !== 'undefined') {
      pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    } else {
      console.error('PDF.js library not found. Make sure it is properly loaded.');
      throw new Error('PDF.js library not found');
    }
  }
  return pdfjsLib;
};

// Load PDF document from path
export const loadPdfDocument = async (pdfPath: string) => {
  try {
    const lib = await initPdfJs();
    
    // Map unit IDs to PDF paths for the units we have
    // Using a sample PDF for demo purposes, but we'd use the real content in production
    const samplePdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf';
    
    const unitMap: Record<string, string> = {
      '1': samplePdfUrl,  // We'll replace with unit-1.pdf when fixed
      '2': samplePdfUrl,
      '3': samplePdfUrl,
      '4': samplePdfUrl,
      '5': samplePdfUrl,
      '6': samplePdfUrl
    };
    
    // Check if this is a unit path request
    const unitMatch = pdfPath.match(/\/units\/(\d+)/);
    let pdfUrl = pdfPath;
    
    if (unitMatch && unitMatch[1]) {
      const unitId = unitMatch[1];
      // Use the mapped path or default to the sample PDF
      pdfUrl = unitMap[unitId] || 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf';
    }
    
    // Handle direct paths to PDFs in public directory
    if (pdfPath.startsWith('/pdfs/')) {
      pdfUrl = pdfPath;
    }
    
    console.log('Loading PDF from:', pdfUrl);
    
    // Create loading task with cMapUrl for better text extraction
    const loadingTask = lib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
      cMapPacked: true,
    });
    
    return await loadingTask.promise;
  } catch (error) {
    console.error('Error loading PDF document:', error);
    throw error;
  }
};
