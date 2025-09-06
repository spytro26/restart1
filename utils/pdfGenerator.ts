import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export interface PDFData {
  title: string;
  subtitle: string;
  sections: Array<{
    title: string;
    items: Array<{
      label: string;
      value: string;
      unit: string;
      isHighlighted?: boolean;
    }>;
  }>;
}

export const generateAndSharePDF = async (data: PDFData) => {
  try {
    const htmlContent = generateHTMLContent(data);
    
    // Generate PDF
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Share the PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${data.title}`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      Alert.alert('Error', 'Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    Alert.alert('Error', 'Failed to generate PDF. Please try again.');
  }
};

const generateHTMLContent = (data: PDFData): string => {
  // Find the main result value (usually first highlighted item)
  const mainResult = data.sections
    .flatMap(section => section.items)
    .find(item => item.isHighlighted);
  
  const finalLoad = mainResult ? `${mainResult.value} ${mainResult.unit}` : 'N/A';
  const finalLoadLabel = mainResult ? mainResult.label : 'Final Load';
  
  // Create a comprehensive results table with all data
  const allResultsHTML = data.sections.map(section => `
    <tr class="section-header">
      <td colspan="4" class="section-title">${section.title}</td>
    </tr>
    ${section.items.map(item => `
      <tr class="result-row ${item.isHighlighted ? 'highlighted' : ''}">
        <td class="result-label">${item.label}</td>
        <td class="result-value">${item.value}</td>
        <td class="result-unit">${item.unit || ''}</td>
        <td class="result-status">${item.isHighlighted ? '●' : ''}</td>
      </tr>
    `).join('')}
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data.title}</title>
      <style>
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        @page { 
          size: A4; 
          margin: 10mm; 
        }
        
        body {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
          line-height: 1.3;
          color: #1a202c;
          background: #ffffff;
          font-size: 11px;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Section - Keep as is */
        .header {
          text-align: center;
          margin-bottom: 6mm;
          padding: 6mm 4mm 4mm 4mm;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
          color: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
        }
        
        .brand-title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 3mm;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .report-title {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }
        
        /* Final Load Section - Keep as is */
        .final-load-section {
          text-align: center;
          margin-bottom: 6mm;
          padding: 5mm;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          border-radius: 12px;
          box-shadow: 0 6px 25px rgba(37, 99, 235, 0.25);
        }
        
        .final-load-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2mm;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .final-load-value {
          font-size: 28px;
          font-weight: 900;
          color: white;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        /* Main Results Table - NEW DESIGN */
        .results-container {
          flex: 1;
          margin-bottom: 4mm;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        
        .results-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }
        
        .section-header {
          background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .section-title {
          padding: 3mm 4mm;
          font-weight: 700;
          font-size: 11px;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #e2e8f0;
          text-align: left;
        }
        
        .result-row {
          transition: background-color 0.2s ease;
        }
        
        .result-row:hover {
          background: #f8fafc;
        }
        
        .result-row.highlighted {
          background: linear-gradient(90deg, #dbeafe 0%, #bfdbfe 100%);
          font-weight: 600;
        }
        
        .result-row td {
          padding: 2.5mm 4mm;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        
        .result-label {
          color: #374151;
          font-weight: 500;
          width: 50%;
        }
        
        .highlighted .result-label {
          color: #1e40af;
          font-weight: 600;
        }
        
        .result-value {
          color: #2563eb;
          font-weight: 700;
          font-size: 11px;
          text-align: right;
          width: 25%;
        }
        
        .highlighted .result-value {
          color: #1d4ed8;
          font-size: 12px;
        }
        
        .result-unit {
          color: #6b7280;
          font-weight: 500;
          text-align: left;
          width: 15%;
          padding-left: 2mm;
        }
        
        .highlighted .result-unit {
          color: #1e40af;
          font-weight: 600;
        }
        
        .result-status {
          color: #10b981;
          font-weight: 900;
          font-size: 14px;
          text-align: center;
          width: 10%;
        }
        
        /* Footer */
        .footer {
          margin-top: auto;
          padding: 3mm 4mm;
          background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #e2e8f0;
          font-size: 9px;
          color: #64748b;
        }
        
        .footer-left {
          font-weight: 600;
          color: #3b82f6;
        }
        
        .footer-right {
          font-style: italic;
        }
        
        /* Print optimizations */
        @media print {
          body { 
            font-size: 10px; 
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .brand-title { font-size: 20px; }
          .final-load-value { font-size: 26px; }
          .results-table { font-size: 9px; }
          .section-title { font-size: 10px; }
          .result-value { font-size: 10px; }
          .highlighted .result-value { font-size: 11px; }
          
          .results-container {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header - UNCHANGED -->
      <div class="header">
        <div class="brand-title">Powered by Enzo CoolCalc</div>
        <div class="report-title">${data.title}</div>
      </div>
      
      <!-- Final Load Section - UNCHANGED -->
      <div class="final-load-section">
        <div class="final-load-label">${finalLoadLabel}</div>
        <div class="final-load-value">${finalLoad}</div>
      </div>
      
      <!-- Results Table - NEW CLEAN FORMAT -->
      <div class="results-container">
        <table class="results-table">
          <thead>
            <tr style="background: #1e293b; color: white;">
              <th style="padding: 3mm 4mm; text-align: left; font-weight: 700; font-size: 11px;">Parameter</th>
              <th style="padding: 3mm 4mm; text-align: right; font-weight: 700; font-size: 11px;">Value</th>
              <th style="padding: 3mm 4mm; text-align: left; font-weight: 700; font-size: 11px;">Unit</th>
              <th style="padding: 3mm 4mm; text-align: center; font-weight: 700; font-size: 11px;">Key</th>
            </tr>
          </thead>
          <tbody>
            ${allResultsHTML}
          </tbody>
        </table>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">Professional Refrigeration Calculator</div>
        <div class="footer-right">Generated on ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>
  `;
};
