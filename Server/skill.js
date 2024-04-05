// const fs = require('fs');
// const ResumeParser = require('easy-resume-parser');

// // Function to parse skills from a resume file
// async function parseSkillsFromFile(filePath) {
//     try {
//         const res = new ResumeParser(filePath);
//         const result = await res.parseToJSON();
//         return result.parts.skills;
//     } catch (err) {
//         console.error(`Error parsing skills from file ${filePath}:`, err);
//         return [];
//     }
// }

// // Function to clean and filter skills array
// function cleanSkillsArray(skills) {
//     const keywordsToRemove = ['programming', 'languages', 'frameworks', 'aws'];
//     return skills.replace(/\n/g, ' ')
//                  .split(/[ ,]+/)
//                  .filter(word => !keywordsToRemove.includes(word.toLowerCase()))
//                  .map(word => word.toLowerCase());
// }

// // Function to calculate matching skills percentage
// function calculateMatchingSkillsPercentage(skills1, skills2) {
//     const count = skills1.filter(word => skills2.includes(word));
//     const score = (count.length / skills1.length) * 100;
//     const roundedScore = Math.round(score);
//     return roundedScore;
// }

// // Function to compare skills from two resume files and calculate matching percentage
// async function compareSkillsFromFiles(file1, file2) {
//     try {
//         // Parse skills from both files
//         const [skills1, skills2] = await Promise.all([
//             parseSkillsFromFile(file1),
//             parseSkillsFromFile(file2)
//         ]);

//         // Clean and filter skills arrays
//         const cleanedSkills1 = cleanSkillsArray(skills1);
//         const cleanedSkills2 = cleanSkillsArray(skills2);

//         // Calculate matching skills percentage
//         const matchingPercentage = calculateMatchingSkillsPercentage(cleanedSkills1, cleanedSkills2);

//         console.log('Skills from file 1:');
//         console.log(cleanedSkills1);
//         console.log('Skills from file 2:');
//         console.log(cleanedSkills2);
//         console.log('Matching skills percentage:', matchingPercentage + '%');
//     } catch (error) {
//         console.error('Error parsing skills from files:', error);
//     }
// }

// // Usage
// const file1 = 'demo1.pdf';
// const file2 = 'demo2.pdf';

// compareSkillsFromFiles(file1, file2);




// const fs = require('fs');
// const ResumeParser = require('easy-resume-parser');

// // Function to parse skills from a resume file
// function parseSkillsFromFile(filePath) {
//     const res = new ResumeParser(filePath);
//     return res.parseToJSON()
//         .then(result => result.parts.skills)
//         .catch(err => {
//             console.error(`Error parsing skills from file ${filePath}:`, err);
//             return [];
//         });
// }

// // Parse skills from two resume files and calculate the percentage of matching skills
// async function calculateMatchingSkillsPercentage(file1, file2) {
//     try {
//         // Parse skills from both files
//         const [skills1, skills2] = await Promise.all([
//             parseSkillsFromFile(file1),
//             parseSkillsFromFile(file2)
//         ]);
//         const a1 = skills1.replace(/\n/g, ' ').split(/[ ,]+/);
//         const keywordsToRemove = ['programming', 'languages', 'frameworks','aws'];
//         const a3 = a1
//         .filter(word => !keywordsToRemove.includes(word.toLowerCase()))
//         .map(word => word.toLowerCase());
//         const a2 = skills2.replace(/\n/g, ' ').split(/[ ,]+/);
//         const a4 = a2
//         .filter(word => !keywordsToRemove.includes(word.toLowerCase()))
//         .map(word => word.toLowerCase());
       
//         const count=a3.filter(word=>a4.includes(word));
//         const score=(count.length/a3.length)*100;
//         // const roundedScore = score.toFixed(2); 
//         const roundedScore = Math.round(score); 
        
//         console.log(a3);
//         console.log("-------------------------------------")
//         console.log(a4);
//         console.log("-------------------------------------")
//         console.log(roundedScore);

       
//     } catch (error) {
//         console.error('Error parsing skills from files:', error);
//     }
// }

// // Usage
// const file1 = 'demo1.pdf';
// const file2 = 'demo2.pdf';

// calculateMatchingSkillsPercentage(file1, file2);
































// const fs=require('fs')
// const PdfParse = require('pdf-parse')
// function cosineSimilarity(textA, textB) {
//     // Extract skills from each text
//     const skillsA = extractSkills(textA);
//     const skillsB = extractSkills(textB);

//     // Count the number of matching skills
//     const matchingSkills = skillsA.filter(skill => skillsB.includes(skill)).length;

//     // Calculate similarity percentage based on matching skills
//     const totalSkills = Math.max(skillsA.length, skillsB.length); 
//     if (totalSkills === 0) {
//         return 0; // Return 0 if there are no skills to compare
//     }// Total unique skills across both texts
//     const similarityPercentage = (matchingSkills / totalSkills) * 100;
//     //console.log(similarityPercentage);

//     return similarityPercentage;
// }

// function extractSkills(text) {
//     const matches = text.match(/SKILLS\n([\s\S]*)/i);
//     if (matches && matches[1]) {
//         return matches[1].split(',').map(skill => skill.trim().toLowerCase());
//     } else {
//         return [];
//     }
// }


// function parsePDF(file1, file2) {
//     const textA = fs.readFileSync(file1, 'utf-8');
//     const textB = fs.readFileSync(file2, 'utf-8');
//     const similarity = cosineSimilarity(textA, textB);
//   //  const similarityPercentage = (similarity * 100).toFixed(2);
//     console.log(`Cosine Similarity between ${file1} and ${file2}: ${similarity}`);
//   //  console.log(`Cosine Similarity between ${file1} and ${file2}: ${similarityPercentage}%`);
// }

// // Array containing file paths
// const files = ['demo3.pdf', 'demo3.pdf'];
// for (let i = 0; i < files.length - 1; i++) {
//     for (let j = i + 1; j < files.length; j++) {
//         parsePDF(files[i], files[j]);
//     }
// }

//---------------------------------------------------------------------------------------------------------------------------
// const fs = require('fs');
// const ResumeParser = require('easy-resume-parser');

// // Function to parse skills from a resume file
// function parseSkillsFromFile(filePath) {
//     const res = new ResumeParser(filePath);
//     return res.parseToJSON()
//         .then(result => result.parts.skills)
//         .catch(err => {
//             console.error(`Error parsing skills from file ${filePath}:`, err);
//             return [];
//         });
// }

// // Parse skills from two resume files
// async function parseSkillsFromFiles(file1, file2) {
//     try {
//         // Parse skills from both files
//         const [skills1, skills2] = await Promise.all([
//             parseSkillsFromFile(file1),
//             parseSkillsFromFile(file2)
//         ]);

//         // Print skills from file 1 (textA)
//         console.log('Skills from file 1 (textA):');
//         console.log(skills1);

//         // Print skills from file 2 (textB)
//         console.log('Skills from file 2 (textB):');
//         console.log(skills2);
//     } catch (error) {
//         console.error('Error parsing skills from files:', error);
//     }
// }

// // Usage
// const file1 = 'demo1.pdf';
// const file2 = 'demo3.pdf';

// parseSkillsFromFiles(file1, file2);
//----------------------------------------------------------------------------------------------------------------------
// const fs = require('fs');
// const ResumeParser = require('easy-resume-parser');

// // Function to parse skills from a resume file
// function parseSkillsFromFile(filePath) {
//     const res = new ResumeParser(filePath);
//     return res.parseToJSON()
//         .then(result => result.parts.skills)
//         .catch(err => {
//             console.error(`Error parsing skills from file ${filePath}:`, err);
//             return [];
//         });
// }

// // Parse skills from two resume files and calculate the percentage of matching skills
// async function calculateMatchingSkillsPercentage(file1, file2) {
//     try {
//         // Parse skills from both files
//         const [totalSkills, matchSkills] = await Promise.all([
//             parseSkillsFromFile(file1),
//             parseSkillsFromFile(file2)
//         ]);

//         // Calculate the percentage of matching skills
//         const matchingSkillsPercentage = (matchSkills.length / totalSkills.length) * 100;

//         console.log(`Total number of skills in file1: ${totalSkills.length}`);
//         console.log(`Number of matching skills in file2: ${matchSkills.length}`);
//         console.log(`Percentage of matching skills: ${matchingSkillsPercentage.toFixed(2)}%`);
//     } catch (error) {
//         console.error('Error parsing skills from files:', error);
//     }
// }

// // Usage
// const file1 = 'demo1.pdf';
// const file2 = 'demo3.pdf';

// calculateMatchingSkillsPercentage(file1, file2);
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------
// Function to parse skills from a resume file
// const fs = require('fs');
// const ResumeParser = require('easy-resume-parser');
// function parseSkillsFromFile(filePath) {
//     const res = new ResumeParser(filePath);
//     return res.parseToJSON()
//         .then(result => result.parts.skills)
//         .catch(err => {
//             console.error(`Error parsing skills from file ${filePath}:`, err);
//             return [];
//         });
// }

// // Parse skills from two resume files and return them in separate arrays
// async function extractSkillsFromFiles(file1, file2) {
//     try {
//         // Parse skills from both files
//         const [skills1, skills2] = await Promise.all([
//             parseSkillsFromFile(file1),
//             parseSkillsFromFile(file2)
//         ]);
        
//         return [ skills1, skills2 ];
//     } catch (error) {
//         console.error('Error parsing skills from files:', error);
//         return [[], [] ];
//     }
// }

// // Usage
// const file1 = 'demo1.pdf';
// const file2 = 'demo3.pdf';

// extractSkillsFromFiles(file1, file2)
//     .then(({ skills1, skills2 }) => {
//         console.log('Skills from file 1 (file1):', skills1);
//         console.log('Skills from file 2 (file2):', skills2);
//     });
