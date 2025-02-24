export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  content2?: string;
  content3?: string;
  date: string;
  category: string;
  imageUrl: string;
  youtubeUrl?: string;
  slug: string;
  status: 'Draft' | 'Published';
} 