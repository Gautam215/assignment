"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { value: "2.8", unit: "SEC", label: "0-100 KM/H", className: "spec-launch" },
  { value: "V12", unit: "", label: "6.5 LITRE", className: "spec-engine" },
  { value: "770", unit: "CV", label: "MAX OUTPUT", className: "spec-output" },
  { value: "350", unit: "KM/H", label: "TOP SPEED", className: "spec-speed" },
];

export default function Home() {
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const carGroup = document.querySelector<HTMLElement>(".car-group");
      const title = document.querySelector<HTMLElement>(".hero-title");
      const titleReveal = document.querySelector<HTMLElement>(".title-reveal");
      if (!carGroup || !title || !titleReveal) return;

      let titleLeft = 0;
      let titleWidth = 1;
      const updateTitleReveal = () => {
        const carLeft = carGroup.getBoundingClientRect().left;
        const passed = gsap.utils.clamp(0, 1, (carLeft - titleLeft) / titleWidth);
        titleReveal.style.setProperty("--reveal", `${passed * 100}%`);
      };
      const measureTitle = () => {
        const bounds = title.getBoundingClientRect();
        titleLeft = bounds.left;
        titleWidth = bounds.width;
        updateTitleReveal();
      };

      measureTitle();

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".topbar", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
        .fromTo(".hero-kicker", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-title", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, "-=0.2")
        .fromTo(".car-group", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .fromTo(".scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.25");

      const drive = gsap.timeline({
        onUpdate: updateTitleReveal,
        scrollTrigger: {
          trigger: ".drive-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: measureTitle,
        },
      });

      drive
        .fromTo(".road-progress", { scaleX: 0.055 }, { scaleX: 1, duration: 1, ease: "none" }, 0)
        .fromTo(
          carGroup,
          { x: () => title.getBoundingClientRect().left },
          { x: () => title.getBoundingClientRect().right, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".vehicle-shadow",
          { scaleX: 0.92, opacity: 0.42 },
          { scaleX: 1.08, opacity: 0.58, duration: 1, ease: "none" },
          0,
        )
        .fromTo(".scene-bg", { yPercent: 0, scale: 1 }, { yPercent: 8, scale: 1.07, duration: 1, ease: "none" }, 0);

      const cardStops = [0.1, 0.36, 0.63, 0.9];
      gsap.utils.toArray<HTMLElement>(".spec-card").forEach((card, index) => {
        drive.fromTo(
          card,
          { autoAlpha: 0, scale: 0.96, y: 10 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out", immediateRender: false },
          cardStops[index],
        );
      });
    });

    return () => media.revert();
  }, []);

  return (
    <main>
      <section className="drive-section" aria-label="ITZ FIZZ scroll-driven car showcase">
        <div className="hero-stage">
          <div className="scene-bg" aria-hidden="true" />
          <div className="scene-wash" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />

          <header className="topbar">
            <a className="wordmark" href="#home" aria-label="ITZ FIZZ home">
              <span className="wordmark-mark">F<span>/</span>Z</span>
              <span className="wordmark-caption">MOTOR<br />CULTURE</span>
            </a>
            <div className="edition-label"><span /> V12 / OPEN ROAD <span className="edition-number">NO. 01</span></div>
            <a className="top-cta" href="#specs">SCROLL TO IGNITE <span>↗</span></a>
          </header>

          <p className="hero-kicker"><span className="kicker-line" /> LAMBORGHINI / V12 <span className="kicker-index">[ 01 — 04 ]</span></p>
          <p className="scene-note">A MACHINE BUILT<br />FOR THE LONG WAY HOME.</p>

          <div className="road-strip" aria-hidden="true">
            <div className="road-progress" />
            <div className="road-markings" />
            <div className="road-scale road-scale-top" />
            <div className="road-scale road-scale-bottom" />
            <span className="road-label road-label-start">START / 00</span>
            <span className="road-label road-label-end">OPEN / 350</span>
          </div>

          <h1 className="hero-title" id="home" aria-label="WELCOME ITZ FIZZ">
            <span className="title-reveal" aria-hidden="true">WELCOME <b>ITZ FIZZ</b></span>
          </h1>

          <div className="car-group" aria-hidden="true">
            <div className="vehicle-shadow" />
            <Image
              className="car-art"
              src="/car.webp"
              alt=""
              width={1500}
              height={560}
              priority
              sizes="(max-width: 560px) 76vw, (max-width: 900px) 44vw, 34vw"
            />
          </div>

          {specs.map((spec, index) => (
            <article
              className={`spec-card ${index < 2 ? "spec-card-top" : "spec-card-bottom"} ${spec.className}`}
              key={spec.label}
            >
              <p className="spec-label"><span>0{index + 1}</span> / {spec.label}</p>
              <p className="spec-value">{spec.value}<small>{spec.unit}</small></p>
              <span className="spec-rule" />
            </article>
          ))}

          <div className="scroll-cue"><span className="scroll-dot" /> FOLLOW THE LINE <span className="scroll-arrow">↓</span></div>
          <div className="frame-index" aria-hidden="true">FIG. 01 <span /> THE OPEN ROAD</div>
        </div>
      </section>

      <section className="closing" id="specs" aria-label="Closing message">
        <p>THE ROAD ISN&apos;T AN EXIT.</p>
        <span>IT&apos;S AN INVITATION.</span>
        <a href="#home">BACK TO THE START <span>↑</span></a>
      </section>
    </main>
  );
}
