
const ProjectRequest = require('../models/ProjectRequest');
const saveProjectRequest = async (req, res) => {
  try {
    const { title, startDate, endDate, department, description,projectId} = req.body;
   // const filePath = req.file.path;
    const newProjectRequest = new ProjectRequest({ 
      title,
       startDate, 
       endDate, 
       department,
        description ,
        projectId 
      // filePath
      });
    await newProjectRequest.save();
    res.status(200).json({ message: 'Project request saved successfully' });
  } catch (error) {
    console.error('Error saving project request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getRequestCount = async (req, res) => {
  try {
    const count = await ProjectRequest.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching employee count:', error);
    res.status(500).json({ error: 'Failed to fetch employee count' });
  }
};
const deleteReqProject = async (req, res) => {
  try {
    const {projectId} = req.params; // Extract project ID from request parameters
    // const project = await ProjectRequest.findOneAndDelete({projectId});
    const project = await ProjectRequest.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getProjectRequests = async (req, res) => {
  try {
    const projectRequests = await ProjectRequest.find();
    res.json(projectRequests);
  } catch (error) {
    console.error('Error fetching project data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getDistinctTitles = async (req, res) => {
  try {
    const titles = await ProjectRequest.distinct('title');
    res.json({ titles });
  } catch (error) {
    console.error('Error fetching titles:', error);
    res.status(500).json({ error: 'Failed to fetch titles' });
  }
};

module.exports={saveProjectRequest,getRequestCount,deleteReqProject,getProjectRequests,getDistinctTitles};