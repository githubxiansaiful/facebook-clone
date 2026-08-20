import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Facebook clone database seeding...");

  // Clean existing database
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationMember.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.story.deleteMany();
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.savedPost.deleteMany();
  await prisma.postImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  const defaultPassword = await bcrypt.hash("password123", 10);

  // 1. Create 12 diverse users
  const usersData = [
    {
      name: "Mark Zuckerberg",
      username: "mark",
      email: "mark@facebook.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80",
      headline: "Building the future of social connection 🌐",
      bio: "Founder & CEO. Passionate about building communities and bringing the world closer together.",
      location: "Palo Alto, California",
      work: "Meta / Facebook",
      education: "Harvard University",
      relationship: "Married",
      website: "https://about.meta.com",
      isOnline: true,
    },
    {
      name: "Sarah Jenkins",
      username: "sarahj",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop&q=80",
      headline: "Product Designer & Travel Enthusiast ✈️🎨",
      bio: "Designing digital experiences by day, photographing sunsets by night.",
      location: "San Francisco, CA",
      work: "Lead UI/UX Designer at Figma Studio",
      education: "Stanford University",
      relationship: "In a relationship",
      website: "https://sarahdesigns.io",
      isOnline: true,
    },
    {
      name: "Alex Rivera",
      username: "alexr",
      email: "alex@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&auto=format&fit=crop&q=80",
      headline: "Full-Stack Engineer & Open Source Contributor 💻⚡",
      bio: "TypeScript, React, Next.js, Rust. Always building something new.",
      location: "Seattle, WA",
      work: "Senior Software Engineer at CloudCorp",
      education: "University of Washington",
      relationship: "Single",
      website: "https://alexrivera.dev",
      isOnline: true,
    },
    {
      name: "Emily Watson",
      username: "emilyw",
      email: "emily@example.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&auto=format&fit=crop&q=80",
      headline: "Coffee lover, Nature hiker & Photographer ☕📸",
      bio: "Living life one adventure at a time. Plant mom and sourdough baker.",
      location: "Portland, OR",
      work: "Creative Director at Nomad Studio",
      education: "University of Oregon",
      relationship: "Single",
      website: "https://emilyphotos.com",
      isOnline: false,
    },
    {
      name: "Michael Chen",
      username: "mchen",
      email: "michael@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80",
      headline: "AI Researcher & Tech Columnist 🤖🚀",
      bio: "Exploring large language models, neural graphics, and the future of computation.",
      location: "Boston, MA",
      work: "AI Research Scientist at MIT CSAIL",
      education: "MIT",
      relationship: "Married",
      website: "https://mchen.ai",
      isOnline: true,
    },
    {
      name: "Jessica Taylor",
      username: "jessicat",
      email: "jessica@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&auto=format&fit=crop&q=80",
      headline: "Fitness Coach & Nutritionist 🏋️‍♀️🥑",
      bio: "Helping you become the strongest and happiest version of yourself.",
      location: "Austin, TX",
      work: "Founder at Elevate Fitness",
      education: "UT Austin",
      relationship: "In a relationship",
      website: "https://elevatefit.com",
      isOnline: false,
    },
    {
      name: "David Kim",
      username: "davidk",
      email: "david@example.com",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&auto=format&fit=crop&q=80",
      headline: "Musician & Sound Engineer 🎸🎧",
      bio: "Making beats, playing guitar, and producing indie records.",
      location: "Nashville, TN",
      work: "Audio Producer at SoundWaves Records",
      education: "Berklee College of Music",
      relationship: "Single",
      website: "https://davidkimmusic.com",
      isOnline: true,
    },
    {
      name: "Olivia Martinez",
      username: "oliviam",
      email: "olivia@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&auto=format&fit=crop&q=80",
      headline: "Culinary Artist & Food Blogger 🍜✨",
      bio: "Cooking authentic comfort food from around the world. Recipes and restaurant reviews.",
      location: "New York, NY",
      work: "Executive Chef at Bistro Central",
      education: "Culinary Institute of America",
      relationship: "Engaged",
      website: "https://oliviacooks.blog",
      isOnline: true,
    },
    {
      name: "James Wilson",
      username: "jamesw",
      email: "james@example.com",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&auto=format&fit=crop&q=80",
      headline: "Architect & Urban Designer 🏛️📐",
      bio: "Designing sustainable spaces and future-ready cities.",
      location: "Chicago, IL",
      work: "Principal Architect at Studio Urban",
      education: "Cornell Architecture",
      relationship: "Married",
      website: "https://studiourban.net",
      isOnline: false,
    },
    {
      name: "Sophia Rossi",
      username: "sophiar",
      email: "sophia@example.com",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
      coverPhoto: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1400&auto=format&fit=crop&q=80",
      headline: "Fashion Stylist & Visual Storyteller 👗✨",
      bio: "Curating aesthetics and sustainable wardrobe collections.",
      location: "Los Angeles, CA",
      work: "Stylist at Vogue West",
      education: "FIDM Los Angeles",
      relationship: "Single",
      website: "https://sophiarossi.style",
      isOnline: true,
    },
  ];

  const createdUsers: any[] = [];
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        ...u,
        passwordHash: defaultPassword,
      },
    });
    createdUsers.push(user);
  }

  const mark = createdUsers[0];
  const sarah = createdUsers[1];
  const alex = createdUsers[2];
  const emily = createdUsers[3];
  const michael = createdUsers[4];
  const jessica = createdUsers[5];
  const david = createdUsers[6];
  const olivia = createdUsers[7];
  const james = createdUsers[8];
  const sophia = createdUsers[9];

  console.log(`✅ Created ${createdUsers.length} users (Default password: password123)`);

  // 2. Friendships
  const acceptedPairs = [
    [mark.id, sarah.id],
    [mark.id, alex.id],
    [mark.id, emily.id],
    [mark.id, michael.id],
    [mark.id, david.id],
    [sarah.id, alex.id],
    [sarah.id, emily.id],
    [sarah.id, olivia.id],
    [alex.id, michael.id],
    [alex.id, david.id],
    [emily.id, jessica.id],
    [michael.id, james.id],
    [david.id, sophia.id],
    [olivia.id, sophia.id],
  ];

  for (const [senderId, receiverId] of acceptedPairs) {
    await prisma.friendship.create({
      data: {
        senderId,
        receiverId,
        status: "ACCEPTED",
      },
    });
  }

  // Pending friend requests for Mark (so he can test accept/reject)
  await prisma.friendship.create({
    data: {
      senderId: jessica.id,
      receiverId: mark.id,
      status: "PENDING",
    },
  });
  await prisma.friendship.create({
    data: {
      senderId: olivia.id,
      receiverId: mark.id,
      status: "PENDING",
    },
  });
  await prisma.friendship.create({
    data: {
      senderId: sophia.id,
      receiverId: mark.id,
      status: "PENDING",
    },
  });

  console.log("✅ Created friendships and pending friend requests");

  // 3. Groups
  const group1 = await prisma.group.create({
    data: {
      name: "React & Next.js Developers Worldwide",
      slug: "nextjs-developers",
      description: "A community for modern web developers building fast full-stack applications with React, Next.js, and TypeScript.",
      coverPhoto: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      privacy: "PUBLIC",
      createdById: alex.id,
      members: {
        create: [
          { userId: alex.id, role: "ADMIN" },
          { userId: mark.id, role: "MEMBER" },
          { userId: michael.id, role: "MODERATOR" },
          { userId: sarah.id, role: "MEMBER" },
        ],
      },
    },
  });

  const group2 = await prisma.group.create({
    data: {
      name: "Landscape & Street Photography",
      slug: "photography-club",
      description: "Share your best shots, camera gear discussions, composition critique, and post-processing tips.",
      coverPhoto: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop&q=80",
      privacy: "PUBLIC",
      createdById: emily.id,
      members: {
        create: [
          { userId: emily.id, role: "ADMIN" },
          { userId: mark.id, role: "MEMBER" },
          { userId: sarah.id, role: "MEMBER" },
          { userId: david.id, role: "MEMBER" },
        ],
      },
    },
  });

  const group3 = await prisma.group.create({
    data: {
      name: "Culinary Adventures & Secret Recipes",
      slug: "foodie-creations",
      description: "For passionate home cooks and professional chefs sharing gourmet recipes, kitchen hacks, and food styling.",
      coverPhoto: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
      privacy: "PUBLIC",
      createdById: olivia.id,
      members: {
        create: [
          { userId: olivia.id, role: "ADMIN" },
          { userId: mark.id, role: "MEMBER" },
          { userId: jessica.id, role: "MEMBER" },
        ],
      },
    },
  });

  console.log("✅ Created Groups with memberships");

  // 4. Stories
  const storyExpiry = new Date();
  storyExpiry.setHours(storyExpiry.getHours() + 23);

  await prisma.story.create({
    data: {
      userId: sarah.id,
      mediaType: "IMAGE",
      mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      textContent: "Morning coffee by the bay ☕🌊",
      expiresAt: storyExpiry,
    },
  });

  await prisma.story.create({
    data: {
      userId: alex.id,
      mediaType: "TEXT",
      textContent: "Shipped Next.js 16 update today! Absolutely loving React Server Actions 🚀",
      bgGradient: "from-purple-600 via-pink-600 to-rose-500",
      expiresAt: storyExpiry,
    },
  });

  await prisma.story.create({
    data: {
      userId: emily.id,
      mediaType: "IMAGE",
      mediaUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
      textContent: "Weekend summit hike completed! 🏔️✨",
      expiresAt: storyExpiry,
    },
  });

  await prisma.story.create({
    data: {
      userId: michael.id,
      mediaType: "IMAGE",
      mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      textContent: "Late night in the lab testing new neural network weights 🔬",
      expiresAt: storyExpiry,
    },
  });

  console.log("✅ Created Stories");

  // 5. Feed Posts
  const post1 = await prisma.post.create({
    data: {
      authorId: mark.id,
      content: "Excited to share our vision for the next generation of social applications! When people are empowered with intuitive tools, great things happen. What features are you most excited to see built next? 🌐🚀 #Meta #Innovation #Tech",
      privacy: "PUBLIC",
      feeling: "feeling optimistic 😊",
      location: "Menlo Park, CA",
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
            order: 0,
          },
        ],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      authorId: sarah.id,
      content: "Spent the weekend exploring the coast and catching the golden hour light. There is something truly therapeutic about the ocean rhythm. 🌊📸✨",
      privacy: "PUBLIC",
      feeling: "feeling peaceful 🧘‍♀️",
      location: "Big Sur, California",
      createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
            order: 3,
          },
        ],
      },
    },
  });

  const post3 = await prisma.post.create({
    data: {
      authorId: alex.id,
      content: "Why write 500 lines of Redux boilerplate when you can have React 19 Server Actions and optimistic UI with zero extra network overhead? The future is now! 🔥🚀",
      privacy: "PUBLIC",
      bgTheme: "fire",
      feeling: "feeling energized ⚡",
      createdAt: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    },
  });

  const post4 = await prisma.post.create({
    data: {
      authorId: emily.id,
      content: "Crisp mountain air, quiet trails, and coffee brewed over a campfire. Doesn't get much better than this weekend getaway. 🌲☕",
      privacy: "PUBLIC",
      location: "Mount Hood Wilderness",
      createdAt: new Date(Date.now() - 1000 * 60 * 360),
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&auto=format&fit=crop&q=80",
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&auto=format&fit=crop&q=80",
            order: 1,
          },
        ],
      },
    },
  });

  const post5 = await prisma.post.create({
    data: {
      authorId: olivia.id,
      content: "Homemade handmade ramen from scratch! Simmered the rich tonkotsu broth for 14 hours with charred garlic oil and tender chashu pork. Totally worth the effort! 🍜🥢",
      privacy: "PUBLIC",
      feeling: "eating delicious food 😋",
      location: "New York, NY",
      createdAt: new Date(Date.now() - 1000 * 60 * 480),
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80",
            order: 0,
          },
        ],
      },
    },
  });

  // Group Post
  const groupPost = await prisma.post.create({
    data: {
      authorId: alex.id,
      groupId: group1.id,
      content: "Quick poll for the Next.js group: Are you currently using Prisma with SQLite, Postgres, or Supabase for your latest projects? Drop your tech stack below! 💻👇",
      privacy: "PUBLIC",
      createdAt: new Date(Date.now() - 1000 * 60 * 600),
    },
  });

  console.log("✅ Created Posts with multi-image layouts and gradient themes");

  // 6. Reactions
  const reactionsList = [
    { type: "LOVE", userId: sarah.id, postId: post1.id },
    { type: "LIKE", userId: alex.id, postId: post1.id },
    { type: "WOW", userId: michael.id, postId: post1.id },
    { type: "LIKE", userId: david.id, postId: post1.id },

    { type: "LOVE", userId: mark.id, postId: post2.id },
    { type: "CARE", userId: emily.id, postId: post2.id },
    { type: "LIKE", userId: alex.id, postId: post2.id },
    { type: "LOVE", userId: sophia.id, postId: post2.id },

    { type: "HAHA", userId: sarah.id, postId: post3.id },
    { type: "LIKE", userId: mark.id, postId: post3.id },
    { type: "LIKE", userId: michael.id, postId: post3.id },

    { type: "LOVE", userId: mark.id, postId: post4.id },
    { type: "WOW", userId: david.id, postId: post4.id },

    { type: "LOVE", userId: mark.id, postId: post5.id },
    { type: "CARE", userId: sarah.id, postId: post5.id },
  ];

  for (const r of reactionsList) {
    await prisma.reaction.create({
      data: {
        type: r.type,
        userId: r.userId,
        postId: r.postId,
      },
    });
  }

  // 7. Comments & Nested Replies
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      authorId: sarah.id,
      content: "Incredible progress! Love the clean aesthetics and the lightning-fast responsiveness.",
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
    },
  });

  await prisma.comment.create({
    data: {
      postId: post1.id,
      parentId: comment1.id,
      authorId: mark.id,
      content: "Thanks Sarah! The team worked really hard on optimizing the render pipeline.",
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      postId: post2.id,
      authorId: emily.id,
      content: "These photos are stunning Sarah! That third shot in particular is wallpaper material 😍",
      createdAt: new Date(Date.now() - 1000 * 60 * 90),
    },
  });

  await prisma.comment.create({
    data: {
      postId: post2.id,
      parentId: comment2.id,
      authorId: sarah.id,
      content: "Thank you so much Emily! We need to go hiking together next month!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
  });

  console.log("✅ Created Comments and Nested Replies");

  // 8. Conversations & Messages
  const conv1 = await prisma.conversation.create({
    data: {
      isGroup: false,
      members: {
        create: [{ userId: mark.id }, { userId: sarah.id }],
      },
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv1.id,
      senderId: sarah.id,
      content: "Hey Mark! Have you checked out the new UI mockups for the profile section?",
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv1.id,
      senderId: mark.id,
      content: "Yes! They look fantastic. Love the clean three-column layout and the responsive mobile view.",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
    },
  });

  const conv2 = await prisma.conversation.create({
    data: {
      isGroup: false,
      members: {
        create: [{ userId: mark.id }, { userId: alex.id }],
      },
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conv2.id,
      senderId: alex.id,
      content: "Hey Mark, Prisma SQLite is running super fast in our local environment!",
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
    },
  });

  // 9. Notifications
  await prisma.notification.create({
    data: {
      recipientId: mark.id,
      issuerId: sarah.id,
      type: "POST_LIKE",
      entityId: post1.id,
      message: "loved your post.",
      link: `/#post-${post1.id}`,
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
    },
  });

  await prisma.notification.create({
    data: {
      recipientId: mark.id,
      issuerId: sarah.id,
      type: "POST_COMMENT",
      entityId: post1.id,
      message: "commented on your post: 'Incredible progress!'",
      link: `/#post-${post1.id}`,
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
    },
  });

  await prisma.notification.create({
    data: {
      recipientId: mark.id,
      issuerId: jessica.id,
      type: "FRIEND_REQUEST",
      entityId: jessica.id,
      message: "sent you a friend request.",
      link: "/friends/requests",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 40),
    },
  });

  console.log("✅ Created Conversations, Messages, and Notifications");
  console.log("🎉 Database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
