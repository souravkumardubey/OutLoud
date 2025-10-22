'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";

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
  
  try {

    await connectToDB();

    const communityObjectId = await Community.findOne(
      {id: communityId},
      {_id: 1}
    )

    console.log(communityObjectId)
    const createdThread = await Thread.create({
      text,
      author,
      community: communityObjectId,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id }
    });

    if (communityObjectId) {

      await Community.findByIdAndUpdate(communityObjectId, {
        $push: {
          threads: createdThread._id
        },
      })

    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
  
}

export const fetchThreads = async (pageNumber: 1, pageSize: 20) => {

  await connectToDB();
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
    path: "community",
    model: Community,
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

export const fetchThreadById = async (id: string) => {

  try {
    
    await connectToDB();
    // multi-level commenting functionality
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image"
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image"
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image"
            }
          }
        ]
      }).exec();

      return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`)
  }
}

export const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) => {

  await connectToDB();

  console.log("Add comment")
  try {
    
    const parentThread = await Thread.findById(threadId);
    if (!parentThread) throw new Error("Thread not found.");

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId
    });

    const saveCommentToThread = await commentThread.save();

    parentThread.children.push(saveCommentToThread._id);
    await parentThread.save();

    revalidatePath(path);

  } catch (error: any) {
    console.error("Error while adding comment: ", error.message);
    throw new Error(`Error adding comment to thread: ${error.message}`)
  }
}