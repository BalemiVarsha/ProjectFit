
const fs = require('fs');
const PdfParse = require('pdf-parse');
function cosineSimilarity(textA, textB) {
    // Tokenize the text into words
    const wordsA = textA.toLowerCase().match(/\b\w+\b/g);
    const wordsB = textB.toLowerCase().match(/\b\w+\b/g);
    // Count term frequencies
    const tfA = calculateTermFrequency(wordsA);
    const tfB = calculateTermFrequency(wordsB);
    // Calculate dot product
    let dotProduct = 0;
    for (const term in tfA) {
        if (term in tfB) {
            dotProduct += tfA[term] * tfB[term];
        }
    }
    // Calculate magnitudes
    const magnitudeA = calculateMagnitude(tfA);
    const magnitudeB = calculateMagnitude(tfB);
    // Calculate cosine similarity
    const similarity = dotProduct / (magnitudeA * magnitudeB);
    return similarity;
}

function calculateTermFrequency(words) {
    const termFrequency = {};
    const totalWords = words.length;
    for (const word of words) {
        termFrequency[word] = (termFrequency[word] || 0) + (1 / totalWords);
    }
    return termFrequency;
}

function calculateMagnitude(termFrequency) {
    let sumOfSquares = 0;
    for (const term in termFrequency) {
        sumOfSquares += Math.pow(termFrequency[term], 2);
    }
    return Math.sqrt(sumOfSquares);
}

function euclideanDistance(textA, textB) {
    // const similarity = cosineSimilarity(textA, textB);
    // const euclideanDistance = Math.sqrt(2 * (1 - similarity));
    // return euclideanDistance;
    const similarity = cosineSimilarity(textA, textB);
    const euclideanDistance = Math.sqrt(2 * (1 - similarity));
    // Convert Euclidean distance to similarity percentage
    const similarityPercentage = (1 - euclideanDistance) * 100;
    return similarityPercentage;
}

function parsePDF(file1, file2) {
    const textA = fs.readFileSync(file1, 'utf-8');
    const textB = fs.readFileSync(file2, 'utf-8');
    const distance = euclideanDistance(textA, textB);
    console.log(`Euclidean Distance between ${file1} and ${file2}: ${distance}`);
}

// Array containing file paths
const files = ['SmartHomes.pdf', 'YadlaShilpa_Resume.pdf'];

// Loop through the array and parse each pair of files
for (let i = 0; i < files.length - 1; i++) {
    for (let j = i + 1; j < files.length; j++) {
        parsePDF(files[i], files[j]);
    }
}

//npm install pdfjs-dist natural







// const fs=require('fs')
// const PdfParse = require('pdf-parse')
// const ResumeParser = require('easy-resume-parser');

// const res = new ResumeParser('YadlaShilpa_Resume.pdf')
// res.parseToJSON()
// .then((result) => {
//     console.log(result.parts.skills)
// })
// .catch((err) => console.log(err))
// // const pdfparser=require('pdf-parser')
// const pdffile=fs.readFileSync('YadlaShilpa_Resume.pdf')

// PdfParse(pdffile).then(function (data){
//     console.log(data.numpages)
//     console.log(data.info)
//     console.log(data.text)
// })

// const fs = require('fs');
// const PdfParse = require('pdf-parse');

// // Function to calculate cosine similarity between two texts
// function cosineSimilarity(textA, textB) {
//     // Tokenize the text into words
//     const wordsA = textA.toLowerCase().match(/\b\w+\b/g);
//     const wordsB = textB.toLowerCase().match(/\b\w+\b/g);
//     // Count term frequencies
//     const tfA = calculateTermFrequency(wordsA);
//     const tfB = calculateTermFrequency(wordsB);
//     // Calculate dot product
//     let dotProduct = 0;
//     for (const term in tfA) {
//         if (term in tfB) {
//             dotProduct += tfA[term] * tfB[term];
//         }
//     }
//     // Calculate magnitudes
//     const magnitudeA = calculateMagnitude(tfA);
//     const magnitudeB = calculateMagnitude(tfB);
//     // Calculate cosine similarity
//     const similarity = dotProduct / (magnitudeA * magnitudeB);
//     return similarity;
// }

// function calculateTermFrequency(words) {
//     const termFrequency = {};
//     const totalWords = words.length;
//     for (const word of words) {
//         termFrequency[word] = (termFrequency[word] || 0) + (1 / totalWords);
//     }
//     return termFrequency;
// }

// function calculateMagnitude(termFrequency) {
//     let sumOfSquares = 0;
//     for (const term in termFrequency) {
//         sumOfSquares += Math.pow(termFrequency[term], 2);
//     }
//     return Math.sqrt(sumOfSquares);
// }

// // Function to parse PDF files and calculate cosine similarity
// function parsePDF(file1, file2) {
//     const textA = fs.readFileSync(file1, 'utf-8');
//     const textB = fs.readFileSync(file2, 'utf-8');
//     const similarity = cosineSimilarity(textA, textB);
//     const similarityPercentage = (similarity * 100).toFixed(2);
//     console.log(`Cosine Similarity between ${file1} and ${file2}: ${similarity}`);
//     console.log(`Cosine Similarity between ${file1} and ${file2}: ${similarityPercentage}%`);
// }

// // Array containing file paths
// const files = ['demo3.pdf', 'demo1.pdf'];

// // Loop through the array and parse each pair of files
// for (let i = 0; i < files.length - 1; i++) {
//     for (let j = i + 1; j < files.length; j++) {
//         parsePDF(files[i], files[j]);
//     }
// }
































// // Required libraries
// const PDFLib = require('pdf-lib');
// const fs = require('fs');
// const mammoth = require('mammoth');

// // Function to extract text from a PDF file
// async function extractTextFromPDF(pdfPath) {
//     const pdfBytes = await fs.promises.readFile(pdfPath);
//     // Load PDF document
//     const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
//     let text = '';
//     // Iterate through each page and extract text
//     for (const [index, page] of pdfDoc.getPages().entries()) {
//         const { items } = await page.getTextContent();
//         text += items.map(item => item.str).join('');
//     }
//     return text;
// }

// // Function to extract text from a DOCX file
// async function extractTextFromDOCX(docxPath) {
//     // Extract raw text from DOCX file
//     const { value } = await mammoth.extractRawText({ path: docxPath });
//     return value;
// }

// // Function to extract skills from text
// function extractSkills(text) {
//     // Define a regular expression pattern to match common skill-related keywords
//     const skillPattern = /python|java|c\+\+|javascript|html|css|sql|data\s?analysis|data\s?science|machine\s?learning|deep\s?learning|natural\s?language\s?processing/gi;
//     const skills = new Set();
//     let match;
//     // Iterate through matches and add to set
//     while ((match = skillPattern.exec(text)) !== null) {
//         skills.add(match[0].toLowerCase()); // Convert to lowercase for consistency
//     }
//     return skills;
// }

// // Function to parse the resume and extract skills
// async function parseResume(resumePath) {
//     let text;
//     // Check file format and extract text accordingly
//     if (resumePath.endsWith('.pdf')) {
//         text = await extractTextFromPDF(resumePath);
//     } else if (resumePath.endsWith('.docx')) {
//         text = await extractTextFromDOCX(resumePath);
//     } else {
//         throw new Error('Unsupported file format. Only PDF and DOCX are supported.');
//     }
//     // Extract skills from the resume text
//     const skills = extractSkills(text);
//     return skills;
// }

// // Example resume file path
// const resumeFile = 'YadlaShilpa_Resume.pdf';

// // Extract and print skills from the resume
// parseResume(resumeFile)
//     .then((skills) => console.log('Skills mentioned in the resume:', Array.from(skills)))
//     .catch((error) => console.error(error));
