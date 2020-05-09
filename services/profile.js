const Profile = require('../models/Profile');
const Axios = require('axios');

class ProfileService {
  findByUserId = async (id) => {
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) return { statusCode: 404, msg: 'Profile not found' };
    return { statusCode: 200, profile };
  };

  createOrUpdate = async (data, userId) => {
    const newprofile = {
      ...data,
      user: userId
    };
    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      // Update
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId },
        newprofile,
        { new: true }
      );
      return { statusCode: 200, profile: updatedProfile };
    }
    // Create
    profile = await Profile.create(newprofile);
    return { statusCode: 201, profile };
  };

  getAll = async () => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return { statusCode: 200, profiles };
  };

  updateExperience = async (data, userId) => {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { experience: data } },
      {
        new: true
      }
    );
    if (!profile) return { statusCode: 404, msg: 'Profile not found' };
    return { statusCode: 200, profile };
  };

  deleteExperienceById = async (expId, userId) => {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) return { statusCode: 404, msg: 'User profile not found' };
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(expId);
    if (removeIndex !== -1) {
      profile.experience.splice(removeIndex, 1);
      const newProfile = await profile.save();
      return { statusCode: 200, profile: newProfile };
    }
    return { statusCode: 404, msg: 'Experience id is invalid' };
  };

  updateEducation = async (education, userId) => {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { education } },
      {
        new: true
      }
    );
    if (!profile) return { statusCode: 404, msg: 'Profile not found' };
    return { statusCode: 200, profile };
  };

  deleteEducationById = async (eduId, userId) => {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) return { statusCode: 404, msg: 'User profile not found' };
    const removeIndex = profile.education.map((item) => item.id).indexOf(eduId);
    if (removeIndex !== -1) {
      profile.education.splice(removeIndex, 1);
      const newProfile = await profile.save();
      return { statusCode: 200, profile: newProfile };
    }
    return { statusCode: 404, msg: 'Education id is invalid' };
  };

  getGithubRepos = async (userName) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      };

      const gitHubResponse = await Axios.get(uri, { headers });
      return { statusCode: 200, githubRepos: gitHubResponse.data };
    } catch (error) {
      console.log(error);
      return { statusCode: 404, msg: 'No Github profile found' };
    }
  };
}

module.exports = ProfileService;
