import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, ArrowRight, Code, Database, Globe, Palette, Component, Server } from 'lucide-react'

const topics = [
    {
        text: "Python",
        img: "/python.webp",
        desc: "Discuss about Python programming language and share coding tips",
        slug: "Python",
        icon: Code,
        color: "from-blue-500 to-yellow-500",
        members: "2.3k"
    },
    {
        text: "JavaScript",
        img: "/javascript.webp",
        desc: "Explore the fundamentals of JavaScript and modern frameworks",
        slug: "Javascript",
        icon: Globe,
        color: "from-yellow-400 to-yellow-600",
        members: "3.1k"
    },
    {
        text: "HTML",
        img: "/html.webp",
        desc: "A deep dive into Hypertext Markup Language basics",
        slug: "Html",
        icon: Globe,
        color: "from-orange-500 to-red-500",
        members: "1.8k"
    },
    {
        text: "CSS",
        img: "/css.webp",
        desc: "Styling web pages with Cascading Style Sheets",
        slug: "Css",
        icon: Palette,
        color: "from-blue-400 to-blue-600",
        members: "1.5k"
    },
    {
        text: "React",
        img: "/react.webp",
        desc: "Building modern user interfaces with the React library",
        slug: "React",
        icon: Component,
        color: "from-cyan-400 to-blue-500",
        members: "4.2k"
    },
    {
        text: "Node.js",
        img: "/nodejs.webp",
        desc: "Server-side programming with Node.js runtime",
        slug: "Nodejs",
        icon: Server,
        color: "from-green-500 to-green-700",
        members: "2.7k"
    }
];

const Forums = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-background via-accent/30 to-background'>
            {/* Hero Section */}
            <div className='container mx-auto px-4 pt-16 pb-8'>
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center justify-center w-20 h-20 bg-whatsapp-green/10 rounded-full mb-6'>
                        <MessageCircle className='w-10 h-10 text-whatsapp-green' />
                    </div>
                    <h1 className='text-5xl lg:text-6xl font-bold text-foreground mb-6'>
                        Discussion <span className='bg-gradient-to-r from-whatsapp-green to-whatsapp-dark-green bg-clip-text text-transparent'>Forums</span>
                    </h1>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                        Join our vibrant community of developers and share knowledge, ask questions, and collaborate on exciting projects.
                    </p>
                </div>
            </div>
            
            {/* Topics Grid */}
            <div className='container mx-auto px-4 pb-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    {topics.map((topic, index) => {
                        const IconComponent = topic.icon;
                        return (
                            <div 
                                key={topic.slug} 
                                className='group relative bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-whatsapp-green/50'
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Background gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                                
                                {/* Content */}
                                <div className='relative z-10'>
                                    {/* Header */}
                                    <div className='flex items-center justify-between mb-4'>
                                        <div className='flex items-center space-x-3'>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg`}>
                                                <IconComponent className='w-6 h-6 text-white' />
                                            </div>
                                            <div>
                                                <h2 className='text-xl font-bold text-foreground'>{topic.text}</h2>
                                                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                                    <Users className='w-4 h-4 mr-1' />
                                                    <span>{topic.members} members</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Description */}
                                    <p className='text-muted-foreground leading-relaxed mb-6'>
                                        {topic.desc}
                                    </p>
                                    
                                    {/* Action Button */}
                                    <Link href={`/forum/${topic.slug}`}>
                                        <Button 
                                            className='w-full bg-whatsapp-green hover:bg-whatsapp-dark-green text-white transition-all duration-200 group-hover:shadow-lg'
                                            size="lg"
                                        >
                                            <MessageCircle className='w-4 h-4 mr-2' />
                                            Join Discussion
                                            <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                                        </Button>
                                    </Link>
                                </div>
                                
                                {/* Activity indicator */}
                                <div className='absolute top-4 right-4'>
                                    <div className='w-2 h-2 bg-whatsapp-green rounded-full animate-pulse'></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Stats Section */}
            <div className='bg-card/50 border-t border-border'>
                <div className='container mx-auto px-4 py-12'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center'>
                        <div className='space-y-2'>
                            <div className='text-3xl font-bold text-whatsapp-green'>15k+</div>
                            <div className='text-sm text-muted-foreground'>Active Members</div>
                        </div>
                        <div className='space-y-2'>
                            <div className='text-3xl font-bold text-whatsapp-green'>50k+</div>
                            <div className='text-sm text-muted-foreground'>Messages Sent</div>
                        </div>
                        <div className='space-y-2'>
                            <div className='text-3xl font-bold text-whatsapp-green'>24/7</div>
                            <div className='text-sm text-muted-foreground'>Active Support</div>
                        </div>
                        <div className='space-y-2'>
                            <div className='text-3xl font-bold text-whatsapp-green'>100%</div>
                            <div className='text-sm text-muted-foreground'>Free to Join</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forums
