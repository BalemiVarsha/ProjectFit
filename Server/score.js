// const fs = require('fs');

// function compareFiles(file1, file2) {
//   return new Promise((resolve, reject) => {
//     // Read the content of both files
//     const content1 = fs.readFileSync(file1, 'utf8');
//     const content2 = fs.readFileSync(file2, 'utf8');

//     // Calculate similarity based on words
//     const similarity = calculateSimilarity(content1, content2);
//     resolve(similarity);
//   });
// }

// function calculateSimilarity(content1, content2) {
//   // Tokenize the content into words
//   const words1 = new Set(content1.split(/\s+/));
//   const words2 = new Set(content2.split(/\s+/));

//   // Calculate the intersection of words
//   const intersection = new Set([...words1].filter(word => words2.has(word)));

//   // Calculate the union of words
//   const union = new Set([...words1, ...words2]);

//   // Calculate Jaccard similarity coefficient
//   const similarity = (intersection.size / union.size) * 100;

//   return similarity;
// }

// // Example usage:
// const file1 = 'YadlaShilpa_Resume.pdf';
// const file2 = 'VikasResume.pdf';

// compareFiles(file1, file2)
//   .then((similarity) => {
//     console.log(`Word-level similarity between ${file1} and ${file2}: ${similarity}%`);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// Function to parse PDF content and calculate term frequency
async function parseAndCalculateTermFrequency(pdfContent) {
  const text = await parsePDFContent(pdfContent);
  const words = text.toLowerCase().match(/\b\w+\b/g);
  return calculateTermFrequency(words);
}

// Function to calculate Euclidean distance between two text documents
async function euclideanDistance(pdfContent1, pdfContent2) {
  const tf1 = await parseAndCalculateTermFrequency(pdfContent1);
  const tf2 = await parseAndCalculateTermFrequency(pdfContent2);
  
  let squaredDifferenceSum = 0;

  // Calculate the sum of squared differences between term frequencies
  for (const term in tf1) {
    if (term in tf2) {
      squaredDifferenceSum += Math.pow(tf1[term] - (tf2[term] || 0), 2);
    } else {
      squaredDifferenceSum += Math.pow(tf1[term], 2);
    }
  }

  // Include terms present in tf2 but not in tf1
  for (const term in tf2) {
    if (!(term in tf1)) {
      squaredDifferenceSum += Math.pow(tf2[term], 2);
    }
  }

  // Calculate Euclidean distance
  const euclideanDistance = Math.sqrt(squaredDifferenceSum);

  // Convert Euclidean distance to similarity percentage
  const similarityPercentage = (1 - euclideanDistance) * 100;

  return similarityPercentage;
}

module.exports = { euclideanDistance };
