export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
  status: 'Draft' | 'Published';
} 