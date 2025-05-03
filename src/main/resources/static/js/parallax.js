// Header Sticky Effect
window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
});


if (window.innerWidth > 768) {
  gsap.from("#m1", {
    scrollTrigger: {
      scrub: 4, // Scrub lebih tinggi untuk efek lebih dramatis
      trigger: "#m1",
      start: "top bottom",
      end: "bottom top",
    },
    y: 60,
    scale: 1.2,
    rotate: 3, 
    skewX: 5, // Efek miring untuk perspektif lebih dinamis
    duration: 4,
    ease: "power2.out",
  });

  gsap.from("#m2", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#m2",
      start: "top bottom",
      end: "bottom top",
    },
    y: 120,
    scale: 1.25,
    rotate: -3,
    skewX: -5,
    duration: 4.2,
    ease: "power2.out",
  });

  gsap.from("#t2", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#t2",
      start: "top bottom",
      end: "bottom top",
    },
    x: -120,
    scale: 1.15,
    skewY: 3,
    duration: 4.5,
    ease: "power3.out",
  });

  gsap.from("#t1", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#t1",
      start: "top bottom",
      end: "bottom top",
    },
    x: 120,
    scale: 1.15,
    skewY: -3,
    duration: 4.5,
    ease: "power3.out",
  });

  gsap.from("#man", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#man",
      start: "top bottom",
      end: "bottom top",
    },
    x: -400,
    opacity: 0,
    scale: 1.3,
    skewX: 10,
    duration: 5,
    ease: "power3.out",
  });

  gsap.from("#plants", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#plants",
      start: "top bottom",
      end: "bottom top",
    },
    x: -100,
    scale: 1.1,
    skewY: 5,
    duration: 4.3,
    ease: "power2.out",
  });

  gsap.from("#text1", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#text1",
      start: "top bottom",
      end: "bottom top",
    },
    y: 70,
    x: -100, // Geser ke kiri sebanyak 50px
    opacity: 0,
    scale: 1.2,
    duration: 4,
    ease: "power2.out",
  });

  gsap.from("#text", {
    scrollTrigger: {
      scrub: 4,
      trigger: "#text",
      start: "top bottom",
      end: "bottom top",
    },
    y: 70,
    x: -100, // Geser ke kiri sebanyak 50px
    opacity: 0,
    scale: 1.2,
    duration: 4,
    ease: "power2.out",
});
} else {
  gsap.set(["#m1", "#m2", "#t2", "#t1", "#man", "#plants", "#text1", "#text"], { clearProps: "all" });
}


// Animate text container
gsap.to(".text-container", {
  scrollTrigger: {
    trigger: ".text-container",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.3
});

// Make scrolling smoother
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll initialization
const smoothScroll = () => {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  gsap.to(window, {
    scrollTo: {
      y: height,
      autoKill: false
    },
    ease: "power4.out",
    scrollTrigger: {
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5
    }
  });
};