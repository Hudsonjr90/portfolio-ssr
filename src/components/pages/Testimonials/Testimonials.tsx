"use client";

import React, { Suspense } from "react";
import styles from "./Testimonials.module.css";
import Transition from "@/components/Transition/Transition";
import SafeTranslation from "@/components/SafeTranslation/SafeTranslation";

const ParticlesB = React.lazy(
  () => import("@/components/Particles/ParticlesB")
);

const TestimonialComponent = React.lazy(
  () => import("@/components/Testimonial/TestimonialComponent")
);

const Testimonials = () => {
  return (
    <SafeTranslation>
      {(t) => (
        <Transition onAnimationComplete={() => {}}>
          <Suspense fallback={<div>{t("home.loading")}</div>}>
            <ParticlesB />
          </Suspense>
          <section className={styles.testimonials}>
            <h2 className={styles.heading}>
          <span>{"/*/"}</span>
          {t("testimonials.title")}
          <span>{t("testimonials.text")}</span>
        </h2>
        <Suspense fallback={<div>{t("home.loading")}</div>}>
          <TestimonialComponent />
        </Suspense>
      </section>
    </Transition>
      )}
    </SafeTranslation>
  );
};

export default Testimonials;
