// about section tabs
(() => {
	const aboutSection = document.querySelector(".about-section"),
		tabsContainer = document.querySelector(".about-tabs");
	tabsContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
			const target = event.target.getAttribute("data-target");
			tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
			event.target.classList.add("active", "outer-shadow");
			aboutSection.querySelector(".tab-content.active").classList.remove("active");
			aboutSection.querySelector(target).classList.add("active");
		}
	})
})();


function bodyScrollingToggle(){
	document.body.classList.toggle("stop-scrolling");
}
// portfolio filter and popup
(() => {
	// Khai báo biến
	const filterContainer = document.querySelector(".portfolio-filter"),
		portfolioItemsContainer = document.querySelector(".portfolio-items"),
		portfolioItems = document.querySelectorAll(".portfolio-item");
	popup = document.querySelector(".portfolio-popup"),
		prevBtn = popup.querySelector(".pp-prev"),
		nextBtn = popup.querySelector(".pp-next"),
		closeBtn = popup.querySelector(".pp-close"),
		projectDetailsContainer = popup.querySelector(".pp-details"),
		projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
	let itemIndex, slideIndex, screenshots;
	// filter portfolio items
	filterContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("filter-item") &&
			!event.target.classList.contains("active")) {
			// Hủy kích hoạt class active cho filter-item
			filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
			// kích hoạt class active cho filter-item mới
			event.target.classList.add("active", "outer-shadow");
			const target = event.target.getAttribute("data-target");
			portfolioItems.forEach((item) => {
				if (target === item.getAttribute("data-category") || target === "all") {
					item.classList.remove("hide");
					item.classList.add("show");
				} else {
					item.classList.remove("show");
					item.classList.add("hide");
				}
			})
		}
	})

	portfolioItemsContainer.addEventListener("click", (event)=>{
		if(event.target.closest(".portfolio-item-inner")){
			const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
			// Lấy index của portfolio item 
			itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
			screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
			// convert screenshots into array
			screenshots = screenshots.split(",");
			if(screenshots.length === 1)
			{
				prevBtn.style.display="none";
				nextBtn.style.display="none";
			}
			else
			{
				prevBtn.style.display="block";
				nextBtn.style.display="block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideShow();
		}
	})

	closeBtn.addEventListener("click", ()=>{
		popup.style.visibility = "hidden";
		popup.style.opacity = 0;
		bodyScrollingToggle();
		if(projectDetailsContainer.classList.contains("active")){
			popupDetailsToggle();
		}	
	})

	nextBtn.addEventListener("click",(event)=>{
		if(slideIndex === screenshots.length-1)
		{
			slideIndex = 0;
		}
		else
			slideIndex++;
		popupSlideShow()
	})

	prevBtn.addEventListener("click", ()=>{
		if(slideIndex === 0)
		{
			slideIndex =  screenshots.length-1;
		}
		else
		{
			slideIndex--;
		}
		popupSlideShow();
	})


	projectDetailsBtn.addEventListener("click", ()=>{
		popupDetailsToggle();
	})



	function popupDetails(){
		if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
			projectDetailsBtn.display="none";
			return;
		}
		projectDetailsBtn.display="block";
		const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
		popup.querySelector(".pp-project-details").innerHTML = details;	
		const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
		popup.querySelector(".pp-title h2").innerHTML = title;
		const category = portfolioItems[itemIndex].getAttribute("data-category");
		popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
}
	function popupToggle()
	{	
		popup.style.visibility = "visible";
		popup.style.opacity = 1;
		bodyScrollingToggle();
	}


	function popupSlideShow(){
		const imgSrc = screenshots[slideIndex];
		const popupImg= popup.querySelector(".pp-img");
		popup.querySelector(".pp-loader").style.opacity = 1;
		popup.querySelector(".pp-loader").style.visibility = "visible";
		popupImg.src = imgSrc; 
		popupImg.onload = ()=>{
			popup.querySelector(".pp-loader").style.opacity = 0;
			popup.querySelector(".pp-loader").style.visibility = "hidden";
		}
		popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
	}

	function popupDetailsToggle(){
		if(projectDetailsContainer.classList.contains("active"))
		{
			projectDetailsContainer.classList.remove("active");
			projectDetailsBtn.querySelector("i").classList.add("fa-plus");
			projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
			projectDetailsContainer.style.maxHeight = 0;
			projectDetailsContainer.style.opacity=0;
		}
		else
		{	
			projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
			projectDetailsBtn.querySelector("i").classList.add("fa-minus");
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
			projectDetailsContainer.style.opacity=1;
			popup.scrollTo(0,projectDetailsContainer.offsetTop);
		}
		popupDetails();
	}
})();

// testimonial section ----------------
(()=>{

	const slideContainer = document.querySelector(".testi-slider-container"),
	slides = slideContainer.querySelectorAll(".testi-item"),
	slideWidth = slideContainer.offsetWidth,
	prevBtn = document.querySelector(".testi-slider-nav .prev"),
	nextBtn = document.querySelector(".testi-slider-nav .next"),
	activeSlide = slideContainer.querySelector(".testi-item.active");
    
	let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
	console.log(slideIndex);
	// set slide width
	slides.forEach((slide)=>{
		slide.style.width = slideWidth + "px";
	});
	// set slideContainer's width

	slideContainer.style.width = slideWidth*slides.length + "px";

	nextBtn.addEventListener("click", ()=>{
		if(slideIndex === slides.length-1 ){
			slideIndex = 0;
		}
		else{
			slideIndex++;
		}
		slider();
	})
	
	prevBtn.addEventListener("click", ()=>{
		if(slideIndex === 0 ){
			slideIndex = slides.length-1;
		}
		else{
			slideIndex--;
		}
		slider();
	})
	function slider(){
		// deactive existing active slider
		slideContainer.querySelector(".testi-item.active").classList.remove("active");
		slides[slideIndex].classList.add("active");
		slideContainer.style.marginLeft = - (slideWidth*slideIndex) + "px";
	}
	slider();
})();

// navigation menu


(()=>{
	const circleBtn = document.querySelector(".circle-btn"),
	navMenu = document.querySelector(".nav-menu"),
	closeNavBtn = navMenu.querySelector(".close-nav-menu");

	circleBtn.addEventListener("click",showNavMenu);
	closeNavBtn.addEventListener("click",hideNavMenu)
	function showNavMenu(){
		navMenu.classList.add("open");
		bodyScrollingToggle();
	}
	function hideNavMenu(){
		navMenu.classList.remove("open");
		fadeOutEffect();
		bodyScrollingToggle();
	}
	function fadeOutEffect(){
		document.querySelector(".fade-out-effect").classList.add("active");
		setTimeout(()=>{
			document.querySelector(".fade-out-effect").classList.remove("active");
		},300)
	}

	document.addEventListener("click",(event)=>{
		if(event.target.classList.contains("link-item")){
			if(event.target.hash !==""){
				event.preventDefault();
				const hash = event.target.hash;
				// deactive existing section 'active'
				document.querySelector(".section.active").classList.add("hide");
				document.querySelector(".section.active").classList.remove("active");
				// // active new section
				document.querySelector(hash).classList.add("active");
				document.querySelector(hash).classList.remove("hide");
				// deactive existing active navigation menu 'link-item'
				navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
				navMenu.querySelector(".active").classList.remove("active");
				if(navMenu.classList.contains("open")){
					// active new navigation menu link-item
					event.target.classList.add("active","outer-shadow");
					event.target.classList.remove("hover-in-shadow");
					// hide naviigation menu
					hideNavMenu();
				}
				else
				{
					let navItems = navMenu.querySelectorAll(".link-item");
					navItems.forEach((item)=>{
						if(hash === item.hash){
							// active new navigation menu link-item
							item.classList.add("active","outer-shadow");
							item.classList.remove("hover-in-shadow");
						}					
					})
					fadeOutEffect();
				}
				// add hash (#) to url
				window.location.hash =  hash;
				
			}
		}
	})


})();


// hide all section except active
(()=>{
	
	const sections= document.querySelectorAll(".section");

	sections.forEach((section)=>{
		if(!section.classList.contains("active")){
			section.classList.add("hide");
		}
	})
})();

