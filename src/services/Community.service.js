import Community from "../models/Community.js";
import outfit from "../models/Outfit.js"

export const getAllPostsService = async () => {
  // 1. Fetch all outfits
  const posts = await outfit.find({})
    .populate("user", "name profileImage")
    .lean();

  // 2. Fetch all community data for those posts
  const CommunityPost = await Community.find({
    post: { $in: posts.map(p => p._id) }
  })
    .populate("reactions.user", "name profileImage _id")
    .lean();

  // 3. Merge posts with community data
  const CommunityWithPost = posts.map(post => {
    const social = CommunityPost.find(ps => ps.post.toString() === post._id.toString());

    return {
      community:CommunityPost._id,
      userId:post.user ? post.user._id : null,
      postId: post._id,
      postImage: post.image,
      title: post.title,
      userName: post.user ? post.user.name : null,
      userImage: post.user ? post.user.profileImage : null,
      counter: social ? social.reactions.length : 0,
      reactions: social
        ? social.reactions.map(r => ({
            userId: r.user._id,
            reactorImage: r.user.profileImage,
            name: r.user.name,
            type: r.type
          }))
        : []
    };
  });

  return CommunityWithPost;
};


export const reactToPost = async (postId, userId, reactionType) => {
   
  // Ensure post exists
  const post = await outfit.findById({_id:postId});
  if (!post) throw new Error("Post not found");

  // Find or create PostSocial for this post
  let postSocial = await Community.findOne({ post: postId });
  if (!postSocial) {
    postSocial = new Community({ post: postId, reactions: [], reports: [] });
  }

  // Check if user already reacted
  const existingReactionIndex = postSocial.reactions.findIndex(
    (r) => r.user.toString() === userId.toString()
  );

  if (existingReactionIndex !== -1) {
    // Update reaction type if already reacted
    postSocial.reactions[existingReactionIndex].type = reactionType;
    postSocial.reactions[existingReactionIndex].reactedAt = new Date();
  } else {
    // Add new reaction
    postSocial.reactions.push({ user: userId, type: reactionType });
  }

  await postSocial.save();
  return postSocial;
// const result = await Community.create(postSocial)
// return result
};



export const reportPost = async (postId, userId, message) => {
  let postSocial = await Community.findOne({ post: postId });
  if (!postSocial) {
    postSocial = new Community({ post: postId });
  }

  // prevent duplicate report by same user
  const alreadyReported = postSocial.reports.some(r => r.user.toString() === userId);
  if (alreadyReported) throw new Error("User already reported this post");

  postSocial.reports.push({ user: userId, message });
  await postSocial.save();
  return postSocial;
};

