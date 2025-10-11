'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string,
  author: string,
  communityId?: string | null,
  path: string
}

export const createThreadAction = async ({
  text,
  author,
  communityId,
  path
}: Params) => {
  connectToDB();

  try {
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id }
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error);
  }
  
}

export const fetchThreads = async (pageNumber: 1, pageSize: 20) => {

  const skip = (pageNumber - 1) * pageSize;

  const postQuery = Thread.find({
    parentId: {
      $in: [null, undefined]
    }
  }).sort({ createdAt: "desc" })
  .skip(skip)
  .limit(pageSize)
  .populate({
    path: "author",
    model: User
  })
  .populate({
    path: "children",
    populate: {
      path: "author",
      model: User,
      select: "_id name parentId image"
    }
  });

  const totalPostsCount = await Thread.countDocuments({
    parentId: {
      $in: [null, undefined]
    }
  });

  const posts = await postQuery.exec();

  const isNext = totalPostsCount > (skip + posts.length);

  return { posts, isNext };
}