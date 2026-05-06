import { StreamChat } from "stream-chat";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Use environment variables for API credentials
const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY || "pq7a699xvrx2";
const api_secret = process.env.STREAM_API_SECRET || "6z8wkzexdsxf7yw588d4dyznnj88q6yw4ybcagq8h5cq97e8hwj5p9jh7exdv3nv";

// Utility function
function capitalize(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1) || '';
}

export async function POST(request) {
  try {
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const user = await request.json();
    
    // Validate user data
    if (!user?.data?.id) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }
    
    const userId = user.data.id;
    const userEmail = user.data.email_addresses?.[0]?.email_address || "";
    const firstName = user.data.first_name || "User";
    const lastName = user.data.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    
    console.log("Creating user:", userId, userEmail, fullName);
    
    // Create Stream Chat token
    const token = serverClient.createToken(userId);
    
    // Get Clerk client
    const client = await clerkClient();
    
    // Create/update Stream Chat user with detailed info
    await serverClient.upsertUser({
      id: userId,
      name: fullName,
      email: userEmail,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}&backgroundColor=00a884`,
      custom: {
        firstName,
        lastName,
        joinedAt: new Date().toISOString()
      }
    });
    
    // Update Clerk user metadata with Stream token
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        token: token,
        streamUserId: userId,
        setupComplete: true
      },
    });
    
    // Define available channels with better configuration
    const channels = [
      {
        slug: "general",
        name: "General Discussion",
        description: "Welcome! Chat about anything here",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=general&backgroundColor=6366f1"
      },
      {
        slug: "developers", 
        name: "Developers Hub",
        description: "Share code, discuss tech, and collaborate",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=developers&backgroundColor=10b981"
      },
      {
        slug: "Python",
        name: "Python Discussion", 
        description: "Python programming language community",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=python&backgroundColor=3b82f6"
      },
      {
        slug: "Javascript",
        name: "JavaScript Discussion",
        description: "JavaScript and web development", 
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=javascript&backgroundColor=f59e0b"
      },
      {
        slug: "React",
        name: "React Discussion",
        description: "React.js community and best practices",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=react&backgroundColor=06b6d4"
      },
      {
        slug: "design",
        name: "Design & UI/UX",
        description: "Creative minds sharing design ideas",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=design&backgroundColor=ec4899"
      },
      {
        slug: "startup",
        name: "Startup Stories",
        description: "Entrepreneurs sharing their journey",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=startup&backgroundColor=f59e0b"
      },
      {
        slug: "Html",
        name: "HTML Discussion",
        description: "A deep dive into Hypertext Markup Language basics",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=html&backgroundColor=f97316"
      },
      {
        slug: "Css",
        name: "CSS Discussion",
        description: "Styling web pages with Cascading Style Sheets",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=css&backgroundColor=3b82f6"
      },
      {
        slug: "Nodejs",
        name: "Node.js Discussion",
        description: "Server-side programming with Node.js runtime",
        image: "https://api.dicebear.com/7.x/shapes/svg?seed=nodejs&backgroundColor=22c55e"
      }
    ];
    
    // Create/join channels in parallel for better performance
    const channelPromises = channels.map(async (channelData) => {
      try {
        const channel = serverClient.channel('livestream', channelData.slug, {
          name: channelData.name,
          description: channelData.description,
          image: channelData.image,
          created_by_id: userId,
          custom: {
            description: channelData.description,
            category: "community",
            isPublic: true
          }
        });
        
        // Create channel if it doesn't exist
        await channel.create();
        
        // Add user as member
        await channel.addMembers([userId]);
        
        return { slug: channelData.slug, success: true };
      } catch (error) {
        console.error(`Error creating channel ${channelData.slug}:`, error);
        return { slug: channelData.slug, success: false, error: error.message };
      }
    });
    
    const results = await Promise.allSettled(channelPromises);
    const channelResults = results.map(result => 
      result.status === 'fulfilled' ? result.value : { success: false, error: result.reason }
    );
    
    console.log("Channel creation results:", channelResults);
    
    return NextResponse.json({ 
      success: true,
      message: 'User setup completed successfully',
      userId,
      token,
      channels: channelResults
    });
    
  } catch (error) {
    console.error('Error in POST /api/create:', error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}
