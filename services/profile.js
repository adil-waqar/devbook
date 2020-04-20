const Profile = require('../models/Profile');

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
        { new: true, useFindAndModify: false }
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
}

module.exports = ProfileService;
