document.addEventListener('DOMContentLoaded', function () {
    // Check login status
    checkLoginStatus();

    // Initialize date picker
    const datePickerOptions = {
        minDate: "today",
        dateFormat: "Y년 m월 d일",
        disableMobile: "true",
        // Example of disabled dates (already booked dates)
        disable: [
            new Date(2025, 1, 28), // Feb 28, 2025
            new Date(2025, 2, 5),  // Mar 5, 2025
            new Date(2025, 2, 10)  // Mar 10, 2025
        ],
        onChange: function (selectedDates, dateStr) {
            // Hide error message when a valid date is selected
            document.getElementById('dateError').style.display = 'none';
            calculateCost();
        },
        onError: function (date, message) {
            // Show error message when an invalid date is selected
            document.getElementById('dateError').style.display = 'block';
        }
    };

    flatpickr("#adDate", datePickerOptions);

    // Show/Hide Banner Type based on Ad Type selection
    const adTypeInputs = document.querySelectorAll('input[name="adType"]');
    const bannerTypeSection = document.getElementById('bannerTypeSection');

    adTypeInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.value === '배너') {
                bannerTypeSection.style.display = 'block';
            } else {
                bannerTypeSection.style.display = 'none';
            }
            calculateCost();
        });
    });

    // Banner Type change event for cost calculation
    const bannerTypeInputs = document.querySelectorAll('input[name="bannerType"]');
    bannerTypeInputs.forEach(input => {
        input.addEventListener('change', calculateCost);
    });

    // Duration change event for cost calculation
    document.getElementById('adDuration').addEventListener('change', calculateCost);

    // Navigation links
    document.getElementById('cost-guide-link').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = './info.html';
    });

    // Form submission
    document.getElementById('adInquiryForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Show payment complete modal
        document.getElementById('paymentCompleteModal').style.display = 'block';
    });

    // Go to login button
    document.getElementById('goToLoginBtn').addEventListener('click', function () {
        // Redirect to login page
        window.location.href = '/login';
    });

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', function () {
        if (confirm('작성 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
            // Redirect to previous page
            history.back();
        }
    });
});

// Function to check login status
function checkLoginStatus() {
    // Simulating a login check
    // In a real application, you would check if the user is logged in
    const isLoggedIn = true; // Change to false to test the login modal

    if (!isLoggedIn) {
        document.getElementById('loginRequiredModal').style.display = 'block';
    }
}

// Function to calculate advertising cost
function calculateCost() {
    let baseCost = 0;
    let durationFactor = 1;
    let premiumCost = 0;

    // Get selected ad type
    const selectedAdType = document.querySelector('input[name="adType"]:checked');
    if (selectedAdType) {
        switch (selectedAdType.value) {
            case '메일':
                baseCost = 100000;
                break;
            case 'SMS':
                baseCost = 150000;
                break;
            case '검색 프리미엄 광고':
                baseCost = 200000;
                break;
            case '배너':
                baseCost = 250000;
                // Check banner type
                const selectedBannerType = document.querySelector('input[name="bannerType"]:checked');
                if (selectedBannerType) {
                    if (selectedBannerType.value === '메인 프로모션 배너') {
                        premiumCost = 100000;
                    } else if (selectedBannerType.value === '프리미엄 추천 광고') {
                        premiumCost = 150000;
                    }
                }
                break;
            case '팝업':
                baseCost = 300000;
                break;
            default:
                baseCost = 50000; // 미정
        }
    }

    // Get selected duration
    const durationSelect = document.getElementById('adDuration');
    const duration = parseInt(durationSelect.value);

    // Calculate duration cost factor
    switch (duration) {
        case 1:
            durationFactor = 1;
            break;
        case 3:
            durationFactor = 2.7; // 10% discount
            break;
        case 7:
            durationFactor = 6; // 15% discount
            break;
        case 15:
            durationFactor = 12; // 20% discount
            break;
        case 30:
            durationFactor = 21; // 30% discount
            break;
    }

    // Calculate costs
    const durationCost = baseCost * (durationFactor - 1);
    const totalCost = (baseCost * durationFactor) + premiumCost;

    // Update cost display
    document.getElementById('baseCost').textContent = `₩${baseCost.toLocaleString()}`;
    document.getElementById('durationCost').textContent = `₩${durationCost.toLocaleString()}`;
    document.getElementById('premiumCost').textContent = `₩${premiumCost.toLocaleString()}`;
    document.getElementById('totalCost').textContent = `₩${totalCost.toLocaleString()}`;
}