const { parsePDFContent } = require('../pdfComparisonFunctions');

const calculateScores = async (req, res) => {
    const { projectPdfUrl, employeePdfUrls } = req.body; // Assuming you pass the PDF URLs in the request body

    try {
        // Fetch the project PDF content
        const projectPdfResponse = await fetch(projectPdfUrl);
        const projectPdfContent = await projectPdfResponse.text();

        // Fetch employee PDF contents and calculate scores
        const scores = [];
        for (const employeePdfUrl of employeePdfUrls) {
            const employeePdfResponse = await fetch(employeePdfUrl);
            const employeePdfContent = await employeePdfResponse.text();
            const score = parsePDFContent(projectPdfContent, employeePdfContent);
            scores.push({ employeePdfUrl, score });
        }

        res.json({ scores });
    } catch (error) {
        console.error('Error calculating scores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    calculateScores,
};
