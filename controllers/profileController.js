import Profile from "../models/profileModel.js";

// GET Profile
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({
        name: "Your Name",
        bio: "Add your bio",
        profilePicture: "",
        socialLinks: {},
        skills: []
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Profile
export const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD Skill
export const addSkill = async (req, res) => {
  try {
    const { name } = req.body;

    const profile = await Profile.findOne();
    profile.skills.push({
      name: req.body.name,
      endorsements: 0
   });

    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ENDORSE Skill

export const endorseSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    const skill = profile.skills.id(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.endorsements += 1;

    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Skill
export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const profile = await Profile.findOne();
    profile.skills = profile.skills.filter(
      (skill) => skill._id.toString() !== skillId
    );

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};