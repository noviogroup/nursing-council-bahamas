export type NewsArticle = {
  title: string;
  summary: string;
  publisher: string;
  publishedAt?: string;
  dateLabel?: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const newsArticles: NewsArticle[] = [
  {
    title: 'Darville: Ministry Will Call Up 47 Retired Nurses as They Look to Recruit 50 More from Ghana',
    summary: 'Coverage of plans to bring retired nurses back into the public healthcare system alongside recruitment efforts.',
    publisher: 'The Tribune',
    publishedAt: '2026-02-05',
    href: 'https://www.tribune242.com/news/2026/feb/05/darville-ministry-will-call-up-47-retired-nurses-as-they-look-to-recruit-50-more-from-ghana/',
    image: '/assets/news/retired-nurses-tribune.png',
    imageAlt: 'Princess Margaret Hospital sign published with The Tribune article',
  },
  {
    title: 'Ministry of Health Taps Retired Nurses',
    summary: 'The Ministry of Health and Wellness discusses re-engaging retired nurses and expanding training pathways.',
    publisher: 'ZNS Bahamas',
    publishedAt: '2026-02-04',
    href: 'https://znsbahamas.com/ministry-of-health-taps-retired-nurses/',
    image: '/assets/news/retired-nurses-zns.jpg',
    imageAlt: 'Minister of Health and Wellness photograph published with the ZNS article',
  },
  {
    title: 'Prime Minister Davis: PHA Academy Graduation Ceremony ‘A Proud Moment for Our Nation’',
    summary: 'The Prime Minister addresses the PHA Academy graduation and the role of training in the national healthcare workforce.',
    publisher: 'ZNS Bahamas',
    publishedAt: '2025-12-01',
    href: 'https://znsbahamas.com/prime-minister-davis-pha-academy-graduation-ceremony-a-proud-moment-for-our-nation/',
    image: '/assets/news/pha-academy-graduation.jpg',
    imageAlt: 'PHA Academy graduation photograph published with the ZNS article',
  },
  {
    title: 'Pinning Ceremony Held for More Than 180 UB Nursing and Allied Health Professions Graduates',
    summary: 'University of The Bahamas nursing and allied health graduates are recognized during the Spring 2025 pinning ceremony.',
    publisher: 'Government of The Bahamas',
    publishedAt: '2025-05-30',
    href: 'https://bahamas.gov.bs/news-press-release/pinning-ceremony-held-for-more-than-180-ub-nursing-and-allied-health-professions-graduates/',
    image: '/assets/news/ub-pinning-ceremony.jpg',
    imageAlt: 'University of The Bahamas nursing pinning ceremony photograph',
  },
  {
    title: 'New Nursing Council Board Meets with Minister',
    summary: 'The new Council Board meets with the Minister of Health and Wellness to discuss implementation of the Nurses and Midwives Act, 2023.',
    publisher: 'Bahamas Local',
    publishedAt: '2023-09-01',
    href: 'https://www.bahamaslocal.com/newsitem/303306/New_Nursing_Council_Board_meets_with_Minister.html',
    image: '/assets/news/nursing-council-board-minister.jpg',
    imageAlt: 'Nursing Council Board meeting photograph published by Bahamas Local',
  },
  {
    title: 'Minister of Health and Wellness Opens Debate on New Nurses and Midwives Bill',
    summary: 'The Minister opens debate on legislation intended to modernize the statutory framework for nursing and midwifery.',
    publisher: 'Bahamas Local',
    publishedAt: '2023-02-02',
    href: 'https://www.bahamaslocal.com/newsitem/289803/Minister_of_Health_and_Wellness_opens_debate_on_new_Nurses_and_Midwives_Bill.html',
    image: '/assets/news/nurses-midwives-bill-debate.jpg',
    imageAlt: 'Nurses and Midwives Bill debate photograph published by Bahamas Local',
  },
  {
    title: 'Bill Aims to Expand Nursing and Midwifery',
    summary: 'Coverage of the Nurses and Midwives Bill 2022 and its proposed expansion of nursing and midwifery practice.',
    publisher: 'Bahamas Local',
    publishedAt: '2022-05-19',
    href: 'https://www.bahamaslocal.com/newsitem/277046/Bill_aims_to_expand_nursing_and_midwifery.html',
    image: '/assets/news/bill-expand-nursing-midwifery.jpg',
    imageAlt: 'Nursing and midwifery legislation photograph published by Bahamas Local',
  },
];

export const featuredNewsArticles = newsArticles.slice(0, 4);

export function formatNewsDate(article: NewsArticle) {
  if (!article.publishedAt) return article.dateLabel ?? 'Reference';

  return new Intl.DateTimeFormat('en-BS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${article.publishedAt}T12:00:00`));
}
