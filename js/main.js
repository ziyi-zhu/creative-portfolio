// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize view state variables
    let isGridView = false;
    
    // Check if on mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Set grid view as default for mobile
    if (isMobile) {
        isGridView = true;
    }
    
    // Shuffle the artworks data on page load
    const shuffledArtworks = shuffleArray([...artworksData]);
    
    // Generate navigation and gallery content from artwork data
    generateCategoryNav();
    generateGallery(shuffledArtworks);
    
    // Apply grid view styling after gallery is generated (for mobile)
    if (isGridView) {
        const galleryCategories = document.querySelectorAll('.gallery-category');
        galleryCategories.forEach(category => {
            category.classList.add('grid-view');
        });
        
        // Update toggle button state if it exists
        const viewToggle = document.getElementById('viewToggle');
        if (viewToggle) {
            viewToggle.classList.add('grid-active');
        }
    }

    // Fisher-Yates shuffle algorithm to randomize array order
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme based on preference
    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // User has a saved preference, use that
        setTheme(savedTheme);
    } else {
        // No saved preference, use system preference
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change theme if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Function to generate category navigation
    function generateCategoryNav() {
        // Get all unique categories from artwork data
        const categories = [...new Set(artworksData.map(item => item.category))];
        
        // Add "all" category
        categories.push('all');
        
        // Get the category navigation list element
        const categoryNavList = document.getElementById('category-nav-list');
        if (!categoryNavList) return;
        
        // Clear any existing content
        categoryNavList.innerHTML = '';
        
        // Determine which category should be active (from URL hash or default to 'all')
        const activeCategory = window.location.hash ? window.location.hash.substring(1) : 'all';
        
        // Generate the navigation items
        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-category', category);
            
            // Set active class if this is the active category
            if (category === activeCategory) {
                listItem.classList.add('active');
            }
            
            // Format category name for display (capitalize)
            const displayName = category === 'all' ? 'ALL WORKS' : category.toUpperCase();
            listItem.textContent = displayName;
            
            // Add to the navigation list
            categoryNavList.appendChild(listItem);
        });
        
        // Attach event listeners to the newly created navigation items
        attachCategoryNavEvents();
    }
    
    // Attach event listeners to category navigation items
    function attachCategoryNavEvents() {
        const categoryButtons = document.querySelectorAll('.category-nav li');
        
        // Handle category switching
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Prevent default browser scroll on hash change
                e.preventDefault();
                
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get category to show
                const categoryToShow = button.getAttribute('data-category');
                
                // Update URL hash for bookmarking without scrolling
                // 1. Save current scroll position
                const scrollPosition = window.scrollY;
                
                // 2. Change the hash without scrolling
                history.pushState(null, null, '#' + categoryToShow);
                
                // 3. Restore scroll position
                window.scrollTo(0, scrollPosition);
                
                // Hide all categories
                const galleryCategories = document.querySelectorAll('.gallery-category');
                galleryCategories.forEach(category => {
                    category.classList.remove('active');
                });
                
                // Show selected category
                document.getElementById(categoryToShow).classList.add('active');
                
                // Ensure the works section is properly positioned in the viewport
                const worksSection = document.querySelector('#works');
                if (worksSection) {
                    // Calculate proper offset to show works section at top of viewport with some padding
                    const worksSectionTop = worksSection.getBoundingClientRect().top + window.scrollY;
                    const headerOffset = 80; // Adjust based on your header height
                    window.scrollTo({
                        top: worksSectionTop - headerOffset,
                        behavior: 'smooth'
                    });
                }
                
                // Reset IntersectionObserver for the newly visible items
                setupIntersectionObserver();
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // View Toggle (Scroll/Grid)
    const viewToggle = document.getElementById('viewToggle');
    
    if (viewToggle) {
        viewToggle.addEventListener('click', () => {
            isGridView = !isGridView;
            viewToggle.classList.toggle('grid-active', isGridView);
            
            // Toggle grid view for all gallery categories
            const galleryCategories = document.querySelectorAll('.gallery-category');
            galleryCategories.forEach(category => {
                category.classList.toggle('grid-view', isGridView);
            });
            
            // Reset IntersectionObserver for newly arranged items
            setupIntersectionObserver();
        });
    }
    
    // Get scrollable containers for other functions
    const scrollContainers = document.querySelectorAll('.gallery-scroll');
    const worksSection = document.querySelector('#works');
    
    // Handle responsive view changes
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 768;
        
        // Only change view if there's a transition between mobile and desktop
        if (isMobileNow && !isGridView) {
            // Switch to grid view on mobile
            isGridView = true;
            const viewToggle = document.getElementById('viewToggle');
            if (viewToggle) {
                viewToggle.classList.add('grid-active');
            }
            
            // Apply grid view to all gallery categories
            const galleryCategories = document.querySelectorAll('.gallery-category');
            galleryCategories.forEach(category => {
                category.classList.add('grid-view');
            });
            
            // Reset IntersectionObserver for newly arranged items
            setupIntersectionObserver();
        }
    });
    
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            // Only handle horizontal scroll if not in grid view
            if (!isGridView && e.deltaY !== 0) {
                // Get container's parent gallery category
                const galleryCategory = container.closest('.gallery-category');
                
                // Only hijack scroll if the gallery category is active and centered in viewport
                if (galleryCategory && galleryCategory.classList.contains('active')) {
                    const rect = galleryCategory.getBoundingClientRect();
                    const isFullyVisible = 
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= window.innerHeight &&
                        rect.right <= window.innerWidth;
                    
                    // Alternative: check if the section is centered in the viewport
                    const isCentered = 
                        rect.top <= window.innerHeight * 0.4 && 
                        rect.bottom >= window.innerHeight * 0.6;
                    
                    // Check if we can scroll horizontally
                    const canScrollRight = container.scrollWidth > container.clientWidth && 
                                          container.scrollLeft < container.scrollWidth - container.clientWidth - 5;
                    const canScrollLeft = container.scrollLeft > 5;
                    
                    // Only hijack if centered/visible and we can scroll horizontally
                    if ((isFullyVisible || isCentered) && ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft))) {
                        e.preventDefault();
                        container.scrollLeft += e.deltaY;
                    }
                }
            }
        }, { passive: false });
        
        // Add scroll indicator to each container
        const scrollIndicator = document.createElement('div');
        scrollIndicator.classList.add('scroll-indicator');
        scrollIndicator.innerHTML = '→';
        container.parentNode.appendChild(scrollIndicator);
        
        // Hide scroll indicator when scrolled to the end or in grid view or on mobile
        const currentIsMobile = window.innerWidth <= 768;
        if (isGridView || currentIsMobile) {
            scrollIndicator.style.opacity = '0';
        }
        
        // Hide scroll indicator when scrolled to the end
        container.addEventListener('scroll', () => {
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
            if (isAtEnd || isGridView) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    });

    // Fullscreen Image Viewer
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenTitle = document.getElementById('fullscreenTitle');
    const fullscreenDescription = document.getElementById('fullscreenDescription');
    const closeFullscreen = document.getElementById('closeFullscreen');
    
    // Open fullscreen view when clicking on an image
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('src');
            const imgAlt = item.getAttribute('alt');
            const title = item.parentNode.querySelector('h3').textContent;
            const description = item.parentNode.querySelector('p').textContent;
            
            fullscreenImage.setAttribute('src', imgSrc);
            fullscreenImage.setAttribute('alt', imgAlt);
            fullscreenTitle.textContent = title;
            fullscreenDescription.textContent = description;
            
            fullscreenOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close fullscreen view
    closeFullscreen.addEventListener('click', () => {
        fullscreenOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside the image
    fullscreenOverlay.addEventListener('click', (e) => {
        // Check if the click was on the overlay background (not on the image or caption)
        if (e.target === fullscreenOverlay) {
            fullscreenOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Also close on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenOverlay.classList.contains('active')) {
            fullscreenOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add fade-in animation for gallery items
    function setupIntersectionObserver() {
        const galleryItems = document.querySelectorAll('.gallery-category.active .gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        galleryItems.forEach(item => {
            // Reset animation state
            item.classList.remove('fade-in');
            observer.observe(item);
        });
    }
    
    // Initial setup of IntersectionObserver
    setupIntersectionObserver();
    
    // Handle direct navigation to hash URLs without excessive scrolling
    window.addEventListener('hashchange', (e) => {
        // Prevent the default scroll behavior
        e.preventDefault();
        
        // Get category from hash
        const categoryToShow = window.location.hash.substring(1) || 'all';
        
        // Update active category in navigation
        const categoryButtons = document.querySelectorAll('.category-nav li');
        categoryButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === categoryToShow) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Hide all categories
        const galleryCategories = document.querySelectorAll('.gallery-category');
        galleryCategories.forEach(category => {
            category.classList.remove('active');
        });
        
        // Show selected category
        const categoryToActivate = document.getElementById(categoryToShow);
        if (categoryToActivate) {
            categoryToActivate.classList.add('active');
            
            // Reset IntersectionObserver for the newly visible items
            setupIntersectionObserver();
        }
    });
    
    // Create cursor follower (optional design element)
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to links for cursor
    const links = document.querySelectorAll('a, .category-nav li, .toggle-btn, .gallery-item img, .close-fullscreen');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('link-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('link-hover');
        });
    });

    // Function to generate gallery HTML from artwork data
    function generateGallery(artworks = artworksData) {
        // Get all unique categories
        const categories = [...new Set(artworks.map(item => item.category))];
        
        // Add "all" category
        categories.push('all');
        
        // Generate category container HTML
        const categoryContainer = document.querySelector('.category-container');
        if (!categoryContainer) return;
        
        // Clear any existing content
        categoryContainer.innerHTML = '';
        
        // Create gallery category sections
        categories.forEach(category => {
            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'gallery-category';
            categorySection.id = category;
            
            // Mark the first one as active (or the one that matches the URL hash)
            if (category === (window.location.hash.substring(1) || 'all')) {
                categorySection.classList.add('active');
                
                // Also set the corresponding nav item as active
                const navItems = document.querySelectorAll('.category-nav li');
                navItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
            
            // Create scrollable container
            const scrollContainer = document.createElement('div');
            scrollContainer.className = 'gallery-scroll';
            
            // Filter artworks by category (or include all for "all" category)
            const filteredArtworks = category === 'all' 
                ? artworks 
                : artworks.filter(artwork => artwork.category === category);
            
            // Add artwork items
            filteredArtworks.forEach(artwork => {
                const itemHtml = `
                    <div class="gallery-item" data-id="${artwork.id}">
                        <img src="${artwork.imagePath}" alt="${artwork.title}">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;
                scrollContainer.innerHTML += itemHtml;
            });
            
            // Add scroll container to category section
            categorySection.appendChild(scrollContainer);
            
            // Add category section to container
            categoryContainer.appendChild(categorySection);
        });
        
        // Re-initialize event listeners for new gallery items
        initGalleryEvents();
    }
    
    // Initialize event listeners for dynamically created gallery items
    function initGalleryEvents() {
        // Fullscreen Image Viewer
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        // Open fullscreen view when clicking on an image
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.getAttribute('src');
                const imgAlt = item.getAttribute('alt');
                const title = item.parentNode.querySelector('h3').textContent;
                const description = item.parentNode.querySelector('p').textContent;
                
                fullscreenImage.setAttribute('src', imgSrc);
                fullscreenImage.setAttribute('alt', imgAlt);
                fullscreenTitle.textContent = title;
                fullscreenDescription.textContent = description;
                
                fullscreenOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Add horizontal scroll with mouse wheel
        initHorizontalScroll();
        
        // Setup IntersectionObserver for newly added items
        setupIntersectionObserver();
    }
    
    // Initialize horizontal scroll for dynamically created containers
    function initHorizontalScroll() {
        const scrollContainers = document.querySelectorAll('.gallery-scroll');
        
        scrollContainers.forEach(container => {
            // Skip if this container already has an event listener
            if (container.hasHorizontalScrollHandler) return;
            
            container.hasHorizontalScrollHandler = true;
            
            container.addEventListener('wheel', (e) => {
                // Only handle horizontal scroll if not in grid view
                if (!isGridView && e.deltaY !== 0) {
                    // Get container's parent gallery category
                    const galleryCategory = container.closest('.gallery-category');
                    
                    // Only hijack scroll if the gallery category is active and centered in viewport
                    if (galleryCategory && galleryCategory.classList.contains('active')) {
                        const rect = galleryCategory.getBoundingClientRect();
                        const isFullyVisible = 
                            rect.top >= 0 &&
                            rect.left >= 0 &&
                            rect.bottom <= window.innerHeight &&
                            rect.right <= window.innerWidth;
                        
                        // Alternative: check if the section is centered in the viewport
                        const isCentered = 
                            rect.top <= window.innerHeight * 0.4 && 
                            rect.bottom >= window.innerHeight * 0.6;
                        
                        // Check if we can scroll horizontally
                        const canScrollRight = container.scrollWidth > container.clientWidth && 
                                            container.scrollLeft < container.scrollWidth - container.clientWidth - 5;
                        const canScrollLeft = container.scrollLeft > 5;
                        
                        // Only hijack if centered/visible and we can scroll horizontally
                        if ((isFullyVisible || isCentered) && ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft))) {
                            e.preventDefault();
                            container.scrollLeft += e.deltaY;
                        }
                    }
                }
            }, { passive: false });
            
            // Add scroll indicator to each container
            const scrollIndicator = document.createElement('div');
            scrollIndicator.classList.add('scroll-indicator');
            scrollIndicator.innerHTML = '→';
            container.parentNode.appendChild(scrollIndicator);
            
            // Hide scroll indicator when scrolled to the end or in grid view or on mobile
            const currentIsMobile = window.innerWidth <= 768;
            if (isGridView || currentIsMobile) {
                scrollIndicator.style.opacity = '0';
            }
            
            // Hide scroll indicator when scrolled to the end
            container.addEventListener('scroll', () => {
                const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
                if (isAtEnd || isGridView) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            });
        });
    }
}); 