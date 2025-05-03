// Header Sticky Effect
window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
});


if (window.innerWidth <= 768) {
  gsap.set(["#m1", "#m2", "#t2", "#t1", "#man", "#plants"], { y: 0, x: 0 });
}
// Parallax Scrolling for Background Elements
if (window.innerWidth > 768) {
  gsap.from("#m1", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#m1",
      start: "top bottom",
      end: "bottom top",
    },
    y: 10,
  });

  gsap.from("#m2", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#m2",
      start: "top bottom",
      end: "bottom top",
    },
    y: 50,
  });

  gsap.from("#t2", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#t2",
      start: "top bottom",
      end: "bottom top",
    },
    x: -50,
  });

  gsap.from("#t1", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#t1",
      start: "top bottom",
      end: "bottom top",
    },
    x: 50,
  });

  gsap.from("#man", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#man",
      start: "top bottom",
      end: "bottom top",
    },
    x: -250,
  });

  gsap.from("#plants", {
    scrollTrigger: {
      scrub: 1,
      trigger: "#plants",
      start: "top bottom",
      end: "bottom top",
    },
    x: -50,
  });
} else {
  gsap.set(["#m1", "#m2", "#t2", "#t1", "#man", "#plants"], { clearProps: "all" });
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