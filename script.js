const imageData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'Mountain Landscape',
        category: 'nature',
        alt: 'Beautiful mountain landscape with snow peaks'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        title: 'City Skyline',
        category: 'architecture',
        alt: 'Modern city skyline at sunset'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'Forest Path',
        category: 'nature',
        alt: 'Peaceful forest path in autumn'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Desert Dunes',
        category: 'travel',
        alt: 'Golden sand dunes in the desert'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        title: 'Abstract Art',
        category: 'abstract',
        alt: 'Colorful abstract painting'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'Beach Sunset',
        category: 'nature',
        alt: 'Stunning beach sunset over ocean'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Historic Building',
        category: 'architecture',
        alt: 'Ancient historic building with intricate details'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        title: 'Street Market',
        category: 'travel',
        alt: 'Vibrant street market in a foreign city'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'Geometric Patterns',
        category: 'abstract',
        alt: 'Modern geometric patterns and shapes'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Waterfall',
        category: 'nature',
        alt: 'Majestic waterfall in the mountains'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        title: 'Modern Bridge',
        category: 'architecture',
        alt: 'Contemporary bridge design over water'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'Mountain Village',
        category: 'travel',
        alt: 'Charming mountain village with traditional houses'
    }
];

// Global variables
let currentImageIndex = 0;
let filteredImages = [...imageData];
let currentCategory = 'all';

// DOM elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const imageTitle = document.getElementById('imageTitle');
const imageCategory = document.getElementById('imageCategory');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
    addLoadingAnimation();
}

// Render gallery items
function renderGallery() {
    gallery.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        gallery.appendChild(galleryItem);
    });
}

// Create individual gallery item
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    
    item.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" loading="lazy">
        <div class="category-badge">${image.category}</div>
        <div class="gallery-item-info">
            <h3>${image.title}</h3>
            <p>${image.category}</p>
        </div>
    `;
    
    // Add click event for lightbox
    item.addEventListener('click', () => openLightbox(index));
    
    return item;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterImages(category);
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Lightbox controls
    closeLightbox.addEventListener('click', closeLightboxModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });
}

// Filter images by category
function filterImages(category) {
    currentCategory = category;
    
    if (category === 'all') {
        filteredImages = [...imageData];
    } else {
        filteredImages = imageData.filter(image => image.category === category);
    }
    
    // Add fade out effect
    gallery.style.opacity = '0';
    
    setTimeout(() => {
        renderGallery();
        gallery.style.opacity = '1';
    }, 300);
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const image = filteredImages[index];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    imageTitle.textContent = image.title;
    imageCategory.textContent = image.category;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons state
    updateNavigationButtons();
}

// Close lightbox
function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    
    // Add fade effect
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        imageTitle.textContent = image.title;
        imageCategory.textContent = image.category;
        lightboxImage.style.opacity = '1';
        updateNavigationButtons();
    }, 200);
}

// Update navigation buttons state
function updateNavigationButtons() {
    // Show/hide navigation buttons based on image count
    if (filteredImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightboxModal();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Add loading animation
function addLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading images...';
    gallery.appendChild(loadingDiv);
    
    // Remove loading after images are loaded
    setTimeout(() => {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }, 1000);
}

// Add smooth scroll behavior
function addSmoothScroll() {
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}

// Add intersection observer for lazy loading
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add touch/swipe support for mobile
function addTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage(); // Swipe left
            } else {
                showPreviousImage(); // Swipe right
            }
        }
    }
}

// Add image preloading for better performance
function preloadImages() {
    imageData.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Add error handling for images
function addImageErrorHandling() {
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found';
            e.target.alt = 'Image not available';
        }
    }, true);
}

// Add performance optimizations
function addPerformanceOptimizations() {
    // Debounce filter function
    let filterTimeout;
    const originalFilterImages = filterImages;
    
    filterImages = function(category) {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {
            originalFilterImages(category);
        }, 150);
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    addSmoothScroll();
    addTouchSupport();
    preloadImages();
    addImageErrorHandling();
    addPerformanceOptimizations();
    
    // Add some additional styling for better UX
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .gallery-item {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .gallery-item:nth-child(1) { animation-delay: 0.1s; }
        .gallery-item:nth-child(2) { animation-delay: 0.2s; }
        .gallery-item:nth-child(3) { animation-delay: 0.3s; }
        .gallery-item:nth-child(4) { animation-delay: 0.4s; }
        .gallery-item:nth-child(5) { animation-delay: 0.5s; }
        .gallery-item:nth-child(6) { animation-delay: 0.6s; }
        
        .lightbox-image-container img {
            transition: opacity 0.3s ease;
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .filter-btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(additionalStyles);
});

// Export functions for potential external use
window.ImageGallery = {
    filterImages,
    openLightbox,
    closeLightbox: closeLightboxModal,
    showNextImage,
    showPreviousImage
}; 
