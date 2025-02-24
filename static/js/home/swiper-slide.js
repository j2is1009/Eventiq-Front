// 더미 데이터 생성 함수
function generateEvents(count, type) {
    const events = [];
    const eventTypes = ['콘서트', '뮤지컬', '연극', '전시회', '페스티벌'];
    const locations = ['서울', '부산', '대구', '인천', '광주'];
    
    for (let i = 0; i < count; i++) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const price = Math.floor(Math.random() * 150000 + 30000);
        const views = Math.floor(Math.random() * 50000 + 1000);
        const sales = Math.floor(Math.random() * 5000 + 100);
        
        events.push({
            id: i + 1,
            title: `${location} ${eventType}`,
            image: `../../../static/images/콘서트.jpg`,
            date: '2024.03.15 ~ 2024.03.17',
            price: price,
            views: views,
            sales: sales,
            isDeadlineSoon: Math.random() > 0.7
        });
    }
    return events;
}

// 슬라이더 초기화
const mainBanner = new Swiper('.mainBanner', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 추천 이벤트 슬라이더
const recommendedSwiper = new Swiper('.recommendedSwiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

// 각 섹션별 데이터 생성 및 렌더링
const sections = [
    { name: 'recommended', count: 7 },
    { name: 'personalized', count: 10 },
    { name: 'popular', count: 10 },
    { name: 'recent', count: 10 },
    { name: 'deadline', count: 10 }
];

sections.forEach(section => {
    const events = generateEvents(section.count, section.name);
    
    if (section.name === 'popular') {
        // 인기 이벤트 랭킹 렌더링
        const rankingList = document.querySelector('.ranking-list');
        rankingList.innerHTML = events
            .sort((a, b) => b.views - a.views)
            .map((event, index) => `
                <div class="ranking-item">
                    <span class="ranking-number">${index + 1}</span>
                    <div class="ranking-content">
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-info">조회수 ${event.views.toLocaleString()} · 판매 ${event.sales}매</p>
                    </div>
                </div>
            `).join('');
    } else {
        // 슬라이더 이벤트 렌더링
        const swiperWrapper = document.querySelector(`.${section.name}Swiper .swiper-wrapper`);
        if (swiperWrapper) {
            swiperWrapper.innerHTML = events.map(event => `
                <div class="swiper-slide">
                    <div class="event-card">
                        <img class="event-image" src="${event.image}" alt="${event.title}">
                        <div class="event-content">
                            <div class="event-header">
                            ${event.isDeadlineSoon ? '<span class="deadline-badge">마감 임박</span>' : ''}<h3 class="event-title">${event.title}</h3>
                            </div>
                            <p class="event-info">${event.date}</p>
                            <p class="event-price">${event.price.toLocaleString()}원</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
});

// 나머지 슬라이더들 초기화
const swiperConfigs = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
};

new Swiper('.personalizedSwiper', swiperConfigs);
new Swiper('.recentSwiper', swiperConfigs);
new Swiper('.deadlineSwiper', swiperConfigs);