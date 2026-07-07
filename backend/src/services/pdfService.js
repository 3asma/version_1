import PDFDocument from 'pdfkit';

function getNestedValue(obj, path) {
    if (!obj) return '';
    return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
            return acc[part];
        }
        return undefined;
    }, obj);
}

export const streamPDF = (res, title, headers, rows) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    const dateStr = new Date().toISOString().split('T')[0];
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}_${dateStr}.pdf"`);

    doc.pipe(res);

    // Title
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#111827').text(title, { align: 'center' });
    doc.moveDown(0.3);

    // Subtitle Date
    const formattedDate = new Date().toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
    doc.fontSize(9).font('Helvetica-Oblique').fillColor('#4b5563').text(`Exporté le : ${formattedDate}`, { align: 'center' });
    doc.moveDown(1.5);

    // Empty dataset handling
    if (!rows || rows.length === 0) {
        doc.fontSize(12).font('Helvetica').fillColor('#6b7280').text('No data available in this module.', { align: 'center' });
        doc.end();
        return;
    }

    const startX = 50;
    const rowHeight = 22;
    let currentY = doc.y;

    const totalWidth = headers.reduce((acc, h) => acc + (h.width || 80), 0);

    // Draw header block
    doc.fillColor('#1f2937').rect(startX, currentY, totalWidth, rowHeight).fill();
    doc.fillColor('#ffffff');

    let currentX = startX;
    headers.forEach(h => {
        const width = h.width || 80;
        doc.fontSize(9).font('Helvetica-Bold').text(h.label, currentX + 5, currentY + 6, {
            width: width - 10,
            lineBreak: false
        });
        currentX += width;
    });

    currentY += rowHeight;

    // Draw grid rows
    rows.forEach((row, rowIndex) => {
        // Page wrap check (Max page depth for A4 is around 842 points; A4 margins at 50 give 742 max height)
        if (currentY > 750) {
            doc.addPage();
            currentY = 50;

            // Draw header again on new page
            doc.fillColor('#1f2937').rect(startX, currentY, totalWidth, rowHeight).fill();
            doc.fillColor('#ffffff');

            let headerX = startX;
            headers.forEach(h => {
                const width = h.width || 80;
                doc.fontSize(9).font('Helvetica-Bold').text(h.label, headerX + 5, currentY + 6, {
                    width: width - 10,
                    lineBreak: false
                });
                headerX += width;
            });
            currentY += rowHeight;
        }

        // Draw Zebra striping
        if (rowIndex % 2 === 1) {
            doc.fillColor('#f9fafb').rect(startX, currentY, totalWidth, rowHeight).fill();
        }

        // Write row cell values
        let cellX = startX;
        doc.fillColor('#374151');
        headers.forEach(h => {
            const width = h.width || 80;
            let val = getNestedValue(row, h.key);

            if (val === undefined || val === null) {
                val = '';
            } else if (typeof val === 'object' && val instanceof Date) {
                val = val.toLocaleDateString('fr-FR');
            } else if (typeof val === 'object') {
                val = '';
            } else {
                val = String(val);
            }

            doc.fontSize(8).font('Helvetica').text(val, cellX + 5, currentY + 6, {
                width: width - 10,
                lineBreak: false,
                ellipsis: true
            });
            cellX += width;
        });

        // Row Separator line
        doc.strokeColor('#f3f4f6').lineWidth(0.5).moveTo(startX, currentY + rowHeight).lineTo(startX + totalWidth, currentY + rowHeight).stroke();

        currentY += rowHeight;
    });

    doc.end();
};
