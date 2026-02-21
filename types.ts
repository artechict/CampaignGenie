
export interface EmailCampaign {
  id: string;
  title: string;
  subjectLines: string[];
  bodyCopy: string;
  targetAudience: string;
  tone: string;
  imagePrompt: string;
  createdAt: number;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  size: '1K' | '2K' | '4K';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export enum AspectRatio {
  RATIO_1_1 = '1:1',
  RATIO_3_4 = '3:4',
  RATIO_4_3 = '4:3',
  RATIO_9_16 = '9:16',
  RATIO_16_9 = '16:9'
}
