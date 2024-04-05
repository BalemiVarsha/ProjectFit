const {uploadToS3,retrieveFromS3}=require('./middlewares/aws_s3')
const PDFParser = require('pdf-parse');
const fs = require('fs');


// Function to calculate cosine similarity between two text documents
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

// Function to calculate term frequency
function calculateTermFrequency(words) {
  const termFrequency = {};
  const totalWords = words.length;
  for (const word of words) {
    termFrequency[word] = (termFrequency[word] || 0) + (1 / totalWords);
  }
  return termFrequency;
}

// Function to calculate magnitude of term frequency
function calculateMagnitude(termFrequency) {
  let sumOfSquares = 0;
  for (const term in termFrequency) {
    sumOfSquares += Math.pow(termFrequency[term], 2);
  }
  return Math.sqrt(sumOfSquares);
}

// Function to calculate similarity score using cosine similarity
async function euclideanDistance(pdfContent1, pdfContent2) {
  // const textA= await retrieveFromS3(projectId);
  // console.log(textA);
 const textA = fs.readFileSync(pdfContent1, 'utf-8');
 const textB = fs.readFileSync(pdfContent2, 'utf-8');
  const similarity = cosineSimilarity(textA, textB);
  const euclideanDistance = Math.sqrt(2 * (1 - similarity));
  // Convert Euclidean distance to similarity percentage
  const similarityPercentage = ((1 - euclideanDistance) * 100).toFixed(2);
  return similarityPercentage;
}

module.exports = { euclideanDistance };




// Function to parse PDF content using pdf-parse library
// async function parsePDFContent(pdfContent) {
//   try {
//     const data = await PDFParser(pdfContent);
//     return data.text;
//   } catch (error) {
//     console.error('Error parsing PDF content:', error);
//     throw new Error('Error parsing PDF content');
//   }
// }
// function cosineSimilarity(textA, textB) {
//   // Tokenize the text into words
//   const wordsA = textA.toLowerCase().match(/\b\w+\b/g);
//   const wordsB = textB.toLowerCase().match(/\b\w+\b/g);
//   // Count term frequencies
//   const tfA = calculateTermFrequency(wordsA);
//   const tfB = calculateTermFrequency(wordsB);
//   // Calculate dot product
//   let dotProduct = 0;
//   for (const term in tfA) {
//     if (term in tfB) {
//       dotProduct += tfA[term] * tfB[term];
//     }
//   }




// Function to calculate similarity score using cosine similarity

// async function euclideanDistance(projectId, employeeResumePath) {
//   try {
//     // Retrieve PDF content from AWS S3
//     const projectFileContent = await retrieveFromS3(projectId);
//     const employeeFileContent = await retrieveFromS3(employeeResumePath);

//     // Calculate cosine similarity
//     const similarity = cosineSimilarity(projectFileContent, employeeFileContent);
//     const euclideanDistance = Math.sqrt(2 * (1 - similarity));

//     // Convert Euclidean distance to similarity percentage
//     const similarityPercentage = ((1 - euclideanDistance) * 100).toFixed(2);
//     return similarityPercentage;
//   } catch (error) {
//     console.error('Error calculating similarity score:', error);
//     throw error;
//   }
// }

// module.exports = { euclideanDistance };



























































































