'use client';

import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaBookOpen, FaHandHoldingHeart, FaRotateLeft } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Your next favourite story is on the shelf',
    text: "Browse a growing collection of fiction, science, history and kids' books shared by readers like you.",
    Icon: FaBookOpen,
    bg: 'from-primary to-[oklch(30%_0.07_190)]',
  },
  {
    title: 'Borrow today, return when you are done',
    text: 'Pick a book, choose your return date and enjoy it at your own pace. No fees, no fuss.',
    Icon: FaRotateLeft,
    bg: 'from-[oklch(45%_0.12_45)] to-[oklch(32%_0.08_30)]',
  },
  {
    title: 'Got a book gathering dust? Share it',
    text: 'Add your books to BookNook and let other members discover them. One shelf, many readers.',
    Icon: FaHandHoldingHeart,
    bg: 'from-[oklch(40%_0.09_260)] to-[oklch(28%_0.07_280)]',
  },
];

export default function HeroSlider() {
  return (
    <section aria-label="Featured">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-112 md:h-128"
      >
        {slides.map(({ title, text, Icon, bg }) => (
          <SwiperSlide key={title}>
            <div
              className={`flex h-full items-center bg-linear-to-br ${bg} text-white`}
            >
              <div className="page-wrap flex flex-col items-start gap-5 px-12 sm:px-16">
                <Icon className="text-5xl text-accent" aria-hidden />
                <h2
                  className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {title}
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {text}
                </p>
                <Link href="/books" className="btn btn-accent btn-lg">
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
