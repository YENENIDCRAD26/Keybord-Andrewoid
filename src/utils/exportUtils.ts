import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Exports a DOM element as a high-quality JPEG image
 */
export async function exportElementAsJpg(
  element: HTMLElement,
  fileName = 'مستند-لوحة-المفاتيح.jpg',
  quality = 0.95
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // 2x scale for sharp text rendering
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    const link = document.createElement('a');
    link.download = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? fileName : `${fileName}.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting as JPG:', error);
    throw error;
  }
}

/**
 * Exports a DOM element as a formatted PDF document
 */
export async function exportElementAsPdf(
  element: HTMLElement,
  fileName = 'مستند-لوحة-المفاتيح.pdf'
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Scale canvas image proportionally into PDF margins
    const margin = 10;
    const maxContentWidth = pageWidth - margin * 2;
    const maxContentHeight = pageHeight - margin * 2;

    const ratio = Math.min(maxContentWidth / (imgWidth / 2.83465), maxContentHeight / (imgHeight / 2.83465));
    const renderWidth = (imgWidth / 2.83465) * ratio;
    const renderHeight = (imgHeight / 2.83465) * ratio;

    const xOffset = margin + (maxContentWidth - renderWidth) / 2;
    const yOffset = margin;

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } catch (error) {
    console.error('Error exporting as PDF:', error);
    throw error;
  }
}
