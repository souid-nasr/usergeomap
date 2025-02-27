import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
// CREATE
export const createUser = async (req: Request, res: Response) => {
  const { name, email, latitude, longitude } = req.body;

  try {
    const user: IUser = new User({
      name,
      email,
      location: [longitude, latitude],
      
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
// UPDATE
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  const { name, email, latitude, longitude } = req.body;

  try {
    console.log("Updating user with ID:", _id);

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (latitude !== undefined && longitude !== undefined) {
      updateData.location = [longitude, latitude];
    }

    console.log("Update data:", updateData);

    const user = await User.findByIdAndUpdate(_id, updateData, { new: true });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};
// GET ALL
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};