'use server'

import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export const updateUserAction = async ({
  userId,
  username,
  name,
  image,
  bio,
  path
}: Params): Promise<void> => {
  
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { 
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true
      },
      { upsert: true }
    );

    if (path === "/profile/edit") revalidatePath(path);
    
  } catch (error: any) {
    throw new Error("Failed to create/update user: " + error.message);
  }
}

export const fetchUser = async (userId: string) => {
  
  try {
    connectToDB();

    return await User
      .findOne({ id: userId })
      // .populate({
      //   path: "Communities",
      //   model: Community,
      // });
  } catch (error: any) {
    throw new Error("Failed to fetch user: " + error.message);
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    
    await connectToDB();

    const threads = await User.findOne({id: userId})
      .populate({
        path: "threads",
        model: Thread,
        populate: {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id username"
          }
        }
      });

      return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user threads: ${error.message}`)
  }
}