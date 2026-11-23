export type GalleryCategory = 'all' | 'details' | 'memories' | 'venue';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
  orientation: 'portrait' | 'landscape';
}

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'كل الصور' },
  { id: 'details', label: 'تفاصيل' },
  { id: 'memories', label: 'الذكريات' },
  { id: 'venue', label: 'المكان' },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/images/g1.jpg',
    alt: 'لحظات الخطوبة',
    category: 'memories',
    orientation: 'landscape',
  },
  {
    id: 'g2',
    src: '/images/g2.jpg',
    alt: 'تفاصيل الزهور',
    category: 'details',
    orientation: 'landscape',
  },
  {
    id: 'g3',
    src: '/images/g3.jpg',
    alt: 'أجواء المكان ليلاً',
    category: 'venue',
    orientation: 'landscape',
  },
  {
    id: 'g4',
    src: '/images/g4.jpg',
    alt: 'خاتم الخطوبة',
    category: 'details',
    orientation: 'portrait',
  },
  {
    id: 'g5',
    src: '/images/g5.jpg',
    alt: 'ذكرى رومانسية',
    category: 'memories',
    orientation: 'portrait',
  },
  {
    id: 'g6',
    src: '/images/g6.jpg',
    alt: 'طاولات الضيافة',
    category: 'venue',
    orientation: 'portrait',
  },
  {
    id: 'g7',
    src: '/images/g7.jpg',
    alt: 'شموع وزهور',
    category: 'details',
    orientation: 'landscape',
  },
  {
    id: 'g8',
    src: '/images/g8.jpg',
    alt: 'نزهة معاً',
    category: 'memories',
    orientation: 'landscape',
  },
  {
    id: 'g9',
    src: '/images/g9.jpg',
    alt: 'قاعة الاحتفال',
    category: 'venue',
    orientation: 'landscape',
  },
  {
    id: 'g10',
    src: '/images/g10.jpg',
    alt: 'تفاصيل الدعوة',
    category: 'details',
    orientation: 'portrait',
  },
  {
    id: 'g11',
    src: '/images/g11.jpg',
    alt: 'لحظة سعيدة',
    category: 'memories',
    orientation: 'portrait',
  },
  {
    id: 'g12',
    src: '/images/g12.jpg',
    alt: 'ديكور المكان',
    category: 'venue',
    orientation: 'portrait',
  },
  {
    id: 'g13',
    src: '/images/g13.jpg',
    alt: 'تفاصيل الزهور',
    category: 'details',
    orientation: 'landscape',
  },
  {
    id: 'g14',
    src: '/images/g14.jpg',
    alt: 'تفاصيل الزهور',
    category: 'details',
    orientation: 'portrait',
  },
  {
    id: 'g15',
    src: '/images/g15.jpg',
    alt: 'تفاصيل الزهور',
    category: 'memories',
    orientation: 'landscape',
  },
  {
    id: 'g16',
    src: '/images/g16.jpg',
    alt: 'تفاصيل الزهور',
    category: 'memories',
    orientation: 'portrait',
  },
  {
    id: 'g17',
    src: '/images/g17.png',
    alt: 'ديكور المكان',
    category: 'venue',
    orientation: 'landscape',
  },
  {
    id: 'g18',
    src: '/images/g18.jpg',
    alt: 'ديكور المكان',
    category: 'venue',
    orientation: 'portrait',
  },
];
