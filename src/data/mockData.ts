import { Video, Channel, Comment, NotificationItem, UserProfile } from '../types';

export const currentUser: UserProfile = {
  id: 'user-001',
  name: 'Alex Rivera ✨',
  handle: '@alex_kawaii',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  email: 'alex@metube.moe',
};

export const categories = [
  'All ✨',
  'Gaming 🎮',
  'Music 🎵',
  'Anime & Kawaii 🌸',
  'Tech 💻',
  'Coding ⚡',
  'Lofi Cafe ☕',
  'AI & Robotics 🤖',
  'Live 🔴',
  'Science 🧪',
  'Soundtracks 🎧',
];

export const channels: Record<string, Channel> = {
  fireship: {
    id: 'ch-fireship',
    name: 'Fireship ⚡',
    handle: '@fireship',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '3.12M',
    subscribersCount: 3120000,
    description: 'High-intensity code tutorials, kawaii tech news, and rapid software delivery.',
    isSubscribed: true,
  },
  mkbhd: {
    id: 'ch-mkbhd',
    name: 'MKBHD Tech 📱',
    handle: '@mkbhd',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '18.4M',
    subscribersCount: 18400000,
    description: 'Crisp red & blue tech reviews from smartphones to dream desk battlestations.',
    isSubscribed: false,
  },
  lofigirl: {
    id: 'ch-lofigirl',
    name: 'Lofi Girl 🌸',
    handle: '@lofigirl',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '14.2M',
    subscribersCount: 14200000,
    description: 'Peaceful lofi beats to study, chill, relax and code to 24/7. (｡♥‿♥｡)',
    isSubscribed: true,
  },
  ign: {
    id: 'ch-ign',
    name: 'IGN Gaming 🎮',
    handle: '@ign',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '17.9M',
    subscribersCount: 17900000,
    description: 'The latest game reviews, anime adaptations, trailers, and esports highlights.',
    isSubscribed: false,
  },
  veritasium: {
    id: 'ch-veritasium',
    name: 'Veritasium 🧪',
    handle: '@veritasium',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '16.5M',
    subscribersCount: 16500000,
    description: 'An element of truth - videos about quantum curiosity, physics, and wonders of the universe.',
    isSubscribed: true,
  },
  kurzgesagt: {
    id: 'ch-kurzgesagt',
    name: 'Kurzgesagt 🦆',
    handle: '@kurzgesagt',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&auto=format&fit=crop&q=80',
    verified: true,
    subscribers: '22.8M',
    subscribersCount: 22800000,
    description: 'Videos explaining space, biology, and existence with cute duck animations and optimistic nihilism ✨',
    isSubscribed: true,
  }
};

export const initialVideos: Video[] = [
  {
    id: 'vid-1',
    youtubeId: 'fJ9rUzIMcZQ',
    title: '✨ Next-Gen AI Models Shattered Coding Benchmarks (Full Speedrun)',
    description: `We benchmarked the latest frontier reasoning neural networks with real-world full-stack web applications, kernel patches, and mathematical synthesis. Kawaii visualizer & synth audio enabled! (｡♥‿♥｡)

Chapters:
00:00 - Introduction & The Setup ✨
01:30 - The 100-File Fullstack Test ⚡
04:15 - Live Debugging in WebAssembly 💻
07:45 - Token Efficiency & Latency 🌸
10:12 - What this means for Engineers (◕‿◕)

#AI #KawaiiCode #Tech #Cyberpunk #MeTube`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    duration: '11:42',
    durationSeconds: 702,
    views: '1.4M views',
    viewsCount: 1400000,
    timestamp: '2 days ago',
    likes: 92400,
    dislikes: 800,
    isLiked: false,
    category: 'AI & Robotics 🤖',
    tags: ['AI', 'Tech', 'Coding', 'Benchmark'],
    channel: channels.fireship,
    commentsCount: 1840,
    chapters: [
      { title: 'Introduction & Setup ✨', timestamp: '00:00', seconds: 0 },
      { title: '100-File Fullstack Test ⚡', timestamp: '01:30', seconds: 90 },
      { title: 'Live Debugging in WebAssembly 💻', timestamp: '04:15', seconds: 255 },
      { title: 'Token Efficiency & Latency 🌸', timestamp: '07:45', seconds: 465 },
      { title: 'Final Verdict (◕‿◕)', timestamp: '10:12', seconds: 612 },
    ]
  },
  {
    id: 'vid-2',
    youtubeId: 'kJQP7kiw5Fk',
    title: '💙 Cyberpunk Neon Studio Tour - Red & Blue Dream Battlestation 2026',
    description: `A complete architectural tour of our new red and blue neon production studio. Custom acoustic slat panels, dual 8K color-calibrated monitors, automated RGB light bars, and top-tier workstation gear!

Gear breakdown:
- Custom Liquid Cooled Ryzen 9950X3D + RTX 5090
- Dual 32" OLED 240Hz Monitors
- Shure SM7dB with Kawaii Boom Arm
- Custom Ergonomic Chair (Cyber Blue & Neon Red accents)

#StudioTour #DeskSetup #MKBHD #Kawaii #Tech`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    duration: '18:05',
    durationSeconds: 1085,
    views: '4.2M views',
    viewsCount: 4200000,
    timestamp: '4 days ago',
    likes: 245000,
    dislikes: 1900,
    isLiked: true,
    category: 'Tech 💻',
    tags: ['Tech', 'Setup', 'Desk', 'MKBHD'],
    channel: channels.mkbhd,
    commentsCount: 4120,
    chapters: [
      { title: 'Tour Overview 🎀', timestamp: '00:00', seconds: 0 },
      { title: 'Dual 8K Displays 💻', timestamp: '03:10', seconds: 190 },
      { title: 'Audio & Acoustics 🎵', timestamp: '08:40', seconds: 520 },
      { title: 'Neon Red & Blue Lighting ✨', timestamp: '13:20', seconds: 800 },
      { title: 'Final Review (｡♥‿♥｡)', timestamp: '16:50', seconds: 1010 },
    ]
  },
  {
    id: 'vid-3',
    youtubeId: 'jfKfPfyJRdk',
    title: '🌸 Lofi Hip Hop Radio ☕ Beats to Relax / Study / Code to [24/7 LIVE]',
    description: `Welcome to the official Lofi stream! Chill vibes, peaceful piano chords, rainy cafe ambient sound, and anime cat animations to boost your focus or help you sleep peacefully. (≧◡≦) ♡

🎧 Streaming 24/7 around the globe
☕ Join our kawaii Discord server with over 500,000 friends!
✨ Don't forget to like and subscribe!`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    duration: 'LIVE',
    durationSeconds: 0,
    views: '54.2K watching',
    viewsCount: 54200,
    timestamp: 'Started streaming 4 hours ago',
    likes: 680000,
    dislikes: 2400,
    isLiked: true,
    category: 'Live 🔴',
    isLive: true,
    tags: ['Lofi', 'Music', 'Live', 'Study', 'Anime', 'Kawaii'],
    channel: channels.lofigirl,
    commentsCount: 15890,
  },
  {
    id: 'vid-4',
    youtubeId: 'dQw4w9WgXcQ',
    title: '🎮 Black Myth: Wukong - Unreal Engine 5.5 Max Ray-Tracing Overkill',
    description: `We benchmarked Black Myth: Wukong with Nanite tessellation, full hardware path tracing, and DLSS 4 on the highest graphic preset possible. Watch the fluid motion and cinematic martial arts! ✨`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    duration: '14:22',
    durationSeconds: 862,
    views: '1.1M views',
    viewsCount: 1100000,
    timestamp: '1 week ago',
    likes: 58000,
    dislikes: 640,
    isLiked: false,
    category: 'Gaming 🎮',
    tags: ['Gaming', 'UnrealEngine', 'IGN', 'Wukong'],
    channel: channels.ign,
    commentsCount: 2300,
  },
  {
    id: 'vid-5',
    youtubeId: 'lZ3bPUKo5zc',
    title: '🧪 Why The Entire Universe Might Be an Optical Hologram',
    description: `What if the 3D world we see is an projection encoded on a distant 2D cosmic event horizon? Exploring the AdS/CFT correspondence, quantum entanglement, and the holographic principle with theoretical physics. 🌌`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    duration: '22:15',
    durationSeconds: 1335,
    views: '5.9M views',
    viewsCount: 5900000,
    timestamp: '5 days ago',
    likes: 340000,
    dislikes: 2900,
    isLiked: true,
    category: 'Science 🧪',
    tags: ['Science', 'Physics', 'Cosmology', 'Veritasium'],
    channel: channels.veritasium,
    commentsCount: 7890,
  },
  {
    id: 'vid-6',
    youtubeId: 'BoovwA47g4U',
    title: '🌃 Cyberpunk 2077 in 2026: Ray Tracing Overdrive & 8K Visual Mods',
    description: `Night City illuminated in neon red and electric cyan blue! We explore Night City at midnight with 400+ graphic mods, real-time caustics, and ultra high fidelity audio. Pure eye candy! ✨`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    duration: '19:40',
    durationSeconds: 1180,
    views: '2.1M views',
    viewsCount: 2100000,
    timestamp: '2 weeks ago',
    likes: 125000,
    dislikes: 920,
    isLiked: false,
    category: 'Gaming 🎮',
    tags: ['Cyberpunk', 'Gaming', 'PC', 'Mods'],
    channel: channels.ign,
    commentsCount: 2950,
  },
  {
    id: 'vid-7',
    youtubeId: '9ZbpsV9t9lM',
    title: '🦆 What Happens If We Detonate All Nuclear Bombs in the Mariana Trench?',
    description: `If we gathered every bomb, took them 11,000 meters down into the dark abyss, and pressed the shiny red button... would a mega tsunami wipe out civilization? Supercomputer fluid simulations with cute animated ducks! (◕‿◕)`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
    duration: '10:55',
    durationSeconds: 655,
    views: '9.8M views',
    viewsCount: 9800000,
    timestamp: '6 days ago',
    likes: 790000,
    dislikes: 4100,
    isLiked: true,
    category: 'Anime & Kawaii 🌸',
    tags: ['Kurzgesagt', 'Science', 'Animation', 'Kawaii'],
    channel: channels.kurzgesagt,
    commentsCount: 14200,
  },
  {
    id: 'vid-8',
    youtubeId: '4xDzrJKXOOY',
    title: '🎵 Synthwave & Kawaii Chill Mix - Neon Red & Blue Electro Beats',
    description: `A 1-hour curated auditory escape through retrowave, dreamwave, outrun, and cyberpunk chill melodies. Perfect companion for late night coding sessions, night walks, and drawing. (｡♥‿♥｡)

Tracklist and timestamps available below!`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    duration: '54:12',
    durationSeconds: 3252,
    views: '3.4M views',
    viewsCount: 3400000,
    timestamp: '2 weeks ago',
    likes: 210000,
    dislikes: 720,
    isLiked: true,
    category: 'Music 🎵',
    tags: ['Synthwave', 'Music', 'Electro', 'Retro', 'Kawaii'],
    channel: channels.lofigirl,
    commentsCount: 3890,
  }
];

export const initialComments: Record<string, Comment[]> = {
  'vid-1': [
    {
      id: 'c-101',
      videoId: 'vid-1',
      userId: 'u-1',
      userName: 'CodeArchitect ✨',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: 'The jump in multi-file refactoring latency is staggering! Love the new red & blue kawaii theme so much (｡♥‿♥｡)',
      timestamp: '1 day ago',
      likes: 1420,
      dislikes: 12,
      isLiked: true,
      isPinned: true,
    },
    {
      id: 'c-102',
      videoId: 'vid-1',
      userId: 'u-2',
      userName: 'Sakura_Dev 🌸',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      text: 'The interactive audio player and visualizer are so adorable! The synth beats are so soothing while testing code ✨',
      timestamp: '18 hours ago',
      likes: 642,
      dislikes: 5,
    }
  ],
  'vid-2': [
    {
      id: 'c-201',
      videoId: 'vid-2',
      userId: 'u-5',
      userName: 'NeonSamurai 💙',
      userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
      text: 'Those red & cyan neon light strips are legendary! Need that wallpaper link ASAP (≧◡≦)',
      timestamp: '3 days ago',
      likes: 2450,
      dislikes: 18,
      isPinned: true,
    }
  ],
  'vid-3': [
    {
      id: 'c-301',
      videoId: 'vid-3',
      userId: 'u-7',
      userName: 'ChibiCoder 🎀',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      text: 'Best lofi stream in existence! The anime cat bouncing to the beat gives me life (◕‿◕) ♡',
      timestamp: '2 hours ago',
      likes: 3120,
      dislikes: 4,
      isPinned: true,
    }
  ]
};

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    channelName: 'Fireship ⚡',
    channelAvatar: channels.fireship.avatar,
    text: 'uploaded: ✨ Next-Gen AI Models Shattered Coding Benchmarks',
    timestamp: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    isRead: false,
    videoId: 'vid-1',
  },
  {
    id: 'notif-2',
    channelName: 'Lofi Girl 🌸',
    channelAvatar: channels.lofigirl.avatar,
    text: 'is live: 🌸 Lofi Hip Hop Radio ☕ Beats to Relax / Study / Code to',
    timestamp: '3 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    isRead: false,
    videoId: 'vid-3',
  }
];

export const searchSuggestions = [
  'Lofi Girl beats 🌸',
  'Cyberpunk Red & Blue 💙',
  'Next-Gen AI models ✨',
  'MKBHD dream studio tour',
  'Black Myth Wukong gameplay 🎮',
  'Fireship 100 seconds ⚡',
  'Quantum physics documentary 🧪',
];
