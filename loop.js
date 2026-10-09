
  const gallerySlider = document.getElementById("gallerySlider");

  let position = 0;
  let speed = 1;
  let animationId;

  function animateGallery() {
    position -= speed;

    /*
      Because the second half is an exact duplicate
      of the first half, we can jump back by half
      the total slider width without the user noticing.
    */
    const halfWidth = gallerySlider.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    gallerySlider.style.transform = `translate3d(${position}px, 0, 0)`;

    animationId = requestAnimationFrame(animateGallery);
  }

  animateGallery();


  /*
    Pause when the user places the mouse over the gallery.
  */
  gallerySlider.addEventListener("mouseenter", () => {
    speed = 0;
  });

  gallerySlider.addEventListener("mouseleave", () => {
    speed = 1;
  });


  /*
    Pause while touching the slider on mobile.
  */
  gallerySlider.addEventListener("touchstart", () => {
    speed = 0;
  }, { passive: true });

  gallerySlider.addEventListener("touchend", () => {
    speed = 1;
  }, { passive: true });


  /*
    Recalculate after resizing.
  */
  window.addEventListener("resize", () => {
    position = 0;
    gallerySlider.style.transform = "translate3d(0, 0, 0)";
  });


  //lightbox effect
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");

  // Open lightbox when any gallery image is clicked
  gallerySlider.querySelectorAll("img").forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");

      // Stop the gallery while viewing an image
      speed = 0;

      document.body.style.overflow = "hidden";
      closeLightbox.focus();
    });
  });

  // Close lightbox
  function hideLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");

    lightboxImage.src = "";
    document.body.style.overflow = "";

    // Resume gallery movement
    speed = 1;
  }

  closeLightbox.addEventListener("click", hideLightbox);

  // Close when clicking the dark background
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      hideLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
      hideLightbox();
    }
  });
