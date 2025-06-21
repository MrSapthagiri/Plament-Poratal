import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Don't allow password updates through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(204).json(null);
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};




export const updateProfile = async (req, res) => {
  try {
    // Don't allow password updates through this route
    const { password, role, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Current password is incorrect',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error changing password',
      error: error.message,
    });
  }
};


///tfhjry

export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Ensure user is authenticated & `req.user` is populated
    const user = await User.findById(userId).select('+password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update basic text fields
    const fields = ['name', 'email', 'role', 'placementStatus'];
    fields.forEach(field => {
      if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    // Update experience array
    if (req.body.experience) {
      try {
        const experienceArray = typeof req.body.experience === 'string'
          ? JSON.parse(req.body.experience)
          : req.body.experience;

        if (Array.isArray(experienceArray)) {
          user.experience = experienceArray;
        }
      } catch (err) {
        console.error('Invalid experience format');
      }
    }

    // Update certifications array
    if (req.body.certifications) {
      try {
        const certArray = typeof req.body.certifications === 'string'
          ? JSON.parse(req.body.certifications)
          : req.body.certifications;

        if (Array.isArray(certArray)) {
          user.certifications = certArray;
        }
      } catch (err) {
        console.error('Invalid certifications format');
      }
    }

    // Update education array
    if (req.body.education) {
      try {
        const educationArray =
          typeof req.body.education === 'string'
            ? JSON.parse(req.body.education)
            : req.body.education;

        if (Array.isArray(educationArray)) {
          user.education = educationArray;
        }
      } catch (err) {
        console.error('Invalid education format');
      }
    }


    // File uploads
    if (req.files?.profileImage) {
      // Optional: remove old image
      if (user.profileImage && fs.existsSync(user.profileImage)) {
        fs.unlinkSync(user.profileImage);
      }
      user.profileImage = req.files.profileImage[0].path;
    }

    if (req.files?.resume) {
      if (user.resume && fs.existsSync(user.resume)) {
        fs.unlinkSync(user.resume);
      }
      user.resume = req.files.resume[0].path;
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
