import Community from "../models/Community.js";
import outfit from "../models/Outfit.js"

export const getAllPostsService = async () => {
  // 1. Fetch all outfits
  const posts = await outfit.find({})
    .populate("user") // load full user object
    .lean();

  // 2. Fetch all community data for those posts
  const CommunityPost = await Community.find({
    post: { $in: posts.map(p => p._id) }
  })
    .populate("reactions.user") // load full user object for reactors
    .lean();

  // 3. Merge posts with community data
  const CommunityWithPost = posts.map(post => {
    const social = CommunityPost.find(ps => ps.post.toString() === post._id.toString());

    return {
      communityId: social ? social._id : null,
      postId: post._id,
      postImage: post.image,
      title: post.title,

      // --------- Post Owner (Flattened) ----------
      userId: post.user?._id || null,
      email: post.user?.email || null,
      username: post.user?.username || null,
      name: post.user?.name || null,
      phone: post.user?.phone || null,
      gender: post.user?.gender || null,
      language: post.user?.language || null,
      profileImage: post.user?.profileImage || null,
      dob: post.user?.dob || null,
      bio: post.user?.bio || null,
      location: post.user?.location || null,
      followers: post.user?.followers || [],
      following: post.user?.following || [],
      blockedUsers: post.user?.blockedUsers || [],
      privacy: post.user?.privacy || {},
      notificationsEnabled: post.user?.notificationsEnabled ?? true,
      disabled: post.user?.disabled ?? false,
      active: post.user?.active ?? false,
      reports: post.user?.reports || [],
     

      // --------- Reactions (Flattened) ----------
      counter: social ? social.reactions.length : 0,
      reactions: social
        ? social.reactions.map(r => ({
            userId: r.user?._id || null,
            email: r.user?.email || null,
            username: r.user?.username || null,
            name: r.user?.name || null,
            phone: r.user?.phone || null,
            gender: r.user?.gender || null,
            language: r.user?.language || null,
            profileImage: r.user?.profileImage || null,
            dob: r.user?.dob || null,
            bio: r.user?.bio || null,
            location: r.user?.location || null,
            followers: r.user?.followers || [],
            following: r.user?.following || [],
            blockedUsers: r.user?.blockedUsers || [],
            privacy: r.user?.privacy || {},
            notificationsEnabled: r.user?.notificationsEnabled ?? true,
            disabled: r.user?.disabled ?? false,
            active: r.user?.active ?? false,
            reports: r.user?.reports || [],
            loginHistory: r.user?.loginHistory || [],
            firstLogin: r.user?.firstLogin || null,
            createdAt: r.user?.createdAt || null,
            updatedAt: r.user?.updatedAt || null,
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

