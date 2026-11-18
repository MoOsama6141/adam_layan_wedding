export const weddingData = {
  couple: {
    groom: { ar: 'آدم', en: 'Adam', initial: 'آ' },
    bride: { ar: 'ليان', en: 'Layan', initial: 'ل' },
    displayNameAr: 'آدم & ليان',
    displayNameEn: 'Adam & Layan',
    initials: 'آ & ل',
  },

  date: {
    /** ISO date used for countdown & calendar */
    iso: '2027-09-20',
    displayAr: '٢٠ سبتمبر ٢٠٢٧',
    displayEn: 'September 20, 2027',
    startTime: '19:00',
    endTime: '23:30',
    timezone: 'Asia/Riyadh',
  },

  venue: {
    nameAr: 'قاعة النخيل الذهبية',
    nameEn: 'Golden Palm Hall',
    cityAr: 'جدة، المملكة العربية السعودية',
    cityEn: 'Jeddah, Saudi Arabia',
    addressAr: 'كورنيش جدة، المملكة العربية السعودية',
    addressEn: 'Jeddah Corniche, Saudi Arabia',
    mapsUrl: 'https://maps.google.com/?q=Jeddah+Corniche',
    lat: 21.5433,
    lng: 39.1728,
  },

  copy: {
    heroTagline: 'ندعوكم لمشاركتنا فرحتنا',
    introTitle: 'من القلب إلى من نحب',
    introBody:
      'بكل الحب والامتنان نفتح لكم أبواب قلوبنا لنشارككم أجمل لحظات العمر. حضوركم يكتمل به فرحنا، ودعواتكم تضيء طريقنا.',
    storyTitle: 'أربع لحظات... وحكاية واحدة',
    countdownTitle: 'اللحظة التي ننتظرها',
    eventTitle: 'وجهتنا في هذه الليلة',
    rsvpTitle: 'هل نحتفل معاً؟',
    rsvpConfirm: 'تأكيد الحضور',
    rsvpDecline: 'للأسف، لن أتمكن من الحضور',
    shareLabel: 'شاركوا فرحتنا',
    calendarLabel: 'أضف الموعد إلى تقويمك',
    mapsLabel: 'عرض الموقع',
    footerMessage: 'بانتظاركم بكل شوق ومحبة',
    guestGreetingPrefix: 'أهلاً وسهلاً',
    loadingMessage: 'أهلاً بكم في دعوتنا',
  },

  share: {
    message: `بكل الحب ندعوكم لمشاركتنا أجمل لحظات العمر ❤️

يسعدنا حضوركم ومشاركتكم فرحتنا في يوم زفافنا.

ننتظركم بكل شوق!`,
  },

  calendar: {
    title: 'زفاف آدم وليان',
    description:
      'بكل الحب ندعوكم لمشاركتنا أجمل لحظات العمر في حفل زفاف آدم وليان. ننتظركم بكل شوق!',
  },

  rsvp: {
    /** Set to a real endpoint when backend is ready */
    apiUrl: null as string | null,
    whatsappNumber: '966500000000',
    maxGuests: 6,
  },

  story: [
    {
      id: '01',
      date: 'مارس ٢٠٢٢',
      title: 'أول لقاء',
      description: 'لقاء عفوي في مقهى هادئ... وبدأت الحكاية.',
      image: '/images/s1.jpg',
      orientation: 'landscape' as const,
    },
    {
      id: '02',
      date: 'يونيو ٢٠٢٣',
      title: 'نزهة على البحر',
      description: 'أمواج وحديث طويل، ووعدٌ صغير بأن نبقى معاً.',
      image: '/images/s2.jpg',
      orientation: 'portrait' as const,
    },
    {
      id: '03',
      date: 'يناير ٢٠٢٤',
      title: 'قهوة الصباح',
      description: 'طقوس يومية بسيطة صنعت ألفة لا تُنسى.',
      image: '/images/s3.jpg',
      orientation: 'landscape' as const,
    },
    {
      id: '04',
      date: 'مايو ٢٠٢٥',
      title: 'لحظة الخطوبة',
      description: 'خاتم، دمعة فرح، وبداية فصل جديد.',
      image: '/images/s4.jpg',
      orientation: 'portrait' as const,
    },
  ],

  images: {
    hero: '/images/hero.jpg',
    intro: '/images/intro.jpg',
    event: '/images/event.jpg',
  },
} as const;

export type WeddingData = typeof weddingData;
