const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .img-list");
    const slideBtn = document.querySelectorAll(".slider-wrapper .slider-btn");
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar" );
    const ScrollBarThumb = document.querySelector(".container .scrollbar-thumb" );
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    ScrollBarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = ScrollBarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - ScrollBarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition/maxThumbPosition) * maxScrollLeft;

            ScrollBarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);


    })

    slideBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            // console.log(btn);
            const direction = btn.id === "prev-slide"? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
        });
    });

    const handleSlideButtons = () => {
        slideBtn[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"; 
        slideBtn[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"; 
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition =  imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - ScrollBarThumb.offsetWidth);
        ScrollBarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load", initSlider);