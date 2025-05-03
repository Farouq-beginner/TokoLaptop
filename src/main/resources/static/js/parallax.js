// Header Sticky Effect
window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
  });

// Parallax Scrolling for Background Elements
gsap.from("#m1", {
    scrollTrigger: {
      scrub: true
    },
    y: 100,
  });

  gsap.from("#m2", {
    scrollTrigger: {
      scrub: true
    },
    y: 50,
  });

  gsap.from("#t2", {
    scrollTrigger: {
      scrub: true
    },
    x: -50,
  });

  gsap.from("#t1", {
    scrollTrigger: {
      scrub: true
    },
    x: 50,
  });

  gsap.from("#man", {
    scrollTrigger: {
      scrub: true
    },
    x: -250,
  });

  gsap.from("#plants", {
    scrollTrigger: {
      scrub: true
    },
    x: -50,
  });

  gsap.from("#text", {
    scrollTrigger: {
      scrub: true
    },
    x: 600,
  });

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