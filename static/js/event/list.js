// 필터링 및 검색 관련 상태
let selectedCategory = '전체';
let selectedPrice = '전체';
let selectedVenue = '전체';
let selectedLocation = '전체';
let selectedMonth = '전체';
let searchQuery = '';
let isFilterOpen = false;

// 필터 섹션 토글 기능
const filterToggleBtn = document.getElementById('filter-toggle-btn');
const filtersContainer = document.getElementById('filters-container');
const filterBtnText = document.getElementById('filter-btn-text');

filterToggleBtn.addEventListener('click', function () {
    isFilterOpen = !isFilterOpen;

    if (isFilterOpen) {
        filtersContainer.style.display = 'block';
        filterBtnText.textContent = '필터 접기';
        filterToggleBtn.classList.add('active');
        filterToggleBtn.querySelector('i').className = 'fas fa-times';
    } else {
        filtersContainer.style.display = 'none';
        filterBtnText.textContent = '상세 필터';
        filterToggleBtn.classList.remove('active');
        filterToggleBtn.querySelector('i').className = 'fas fa-filter';
    }
});

// 필터 옵션 클릭 이벤트 처리
document.querySelectorAll('.filter-option, .sort-option').forEach(option => {
    option.addEventListener('click', function () {
        // 같은 그룹 내에서 선택된 항목을 해제
        const parent = this.parentNode;
        parent.querySelectorAll('.selected').forEach(selected => {
            selected.classList.remove('selected');
        });

        // 클릭한 항목을 선택 상태로 변경
        this.classList.add('selected');

        // 필터링 상태 업데이트
        if (parent.id === 'category-filter') {
            selectedCategory = this.getAttribute('data-category');
        } else if (parent.id === 'price-filter') {
            selectedPrice = this.getAttribute('data-price');
        } else if (parent.id === 'venue-filter') {
            selectedVenue = this.getAttribute('data-venue');
        } else if (parent.id === 'location-filter') {
            selectedLocation = this.getAttribute('data-location');
        } else if (parent.id === 'month-filter') {
            selectedMonth = this.getAttribute('data-month');
        }

        // 필터링 적용
        applyFilters();
    });
});

// 검색 기능 처리
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');

searchInput.addEventListener('input', function () {
    searchQuery = this.value.toLowerCase().trim();
    clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
    applyFilters();
});

clearSearchBtn.addEventListener('click', function () {
    searchInput.value = '';
    searchQuery = '';
    this.style.display = 'none';
    applyFilters();
});

// 필터링 적용 함수
function applyFilters() {
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const price = card.getAttribute('data-price');
        const venue = card.getAttribute('data-venue');
        const location = card.getAttribute('data-location');
        const month = card.getAttribute('data-month');

        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();

        const matchesCategory = selectedCategory === '전체' || category === selectedCategory;
        const matchesPrice = selectedPrice === '전체' || price === selectedPrice;
        const matchesVenue = selectedVenue === '전체' || venue === selectedVenue;
        const matchesLocation = selectedLocation === '전체' || location === selectedLocation;
        const matchesMonth = selectedMonth === '전체' || month.includes(selectedMonth);
        const matchesSearch = !searchQuery || title.includes(searchQuery) || description.includes(searchQuery);

        const isVisible = matchesCategory && matchesPrice && matchesVenue && matchesLocation && matchesMonth && matchesSearch;

        if (isVisible) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // "결과 없음" 메시지 표시 여부
    const noEventsContainer = document.getElementById('no-events');
    if (visibleCount === 0) {
        noEventsContainer.style.display = 'block';
    } else {
        noEventsContainer.style.display = 'none';
    }
}