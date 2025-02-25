// Tab switching functionality
const advertisingTab = document.getElementById('advertising-tab');
const groupTab = document.getElementById('group-tab');
const advertisingContent = document.getElementById('advertising-content');
const groupContent = document.getElementById('group-content');
const inquiryButton = document.getElementById('inquiry-button');
inquiryButton.onclick = handleInquiry;

advertisingTab.addEventListener('click', function() {
    advertisingTab.classList.add('active');
    groupTab.classList.remove('active');
    advertisingContent.classList.add('active');
    groupContent.classList.remove('active');
    
    // Change button
    inquiryButton.innerHTML = '<i class="fas fa-envelope"></i> 광고 문의하기';
    inquiryButton.className = 'fixed-button blue';
    inquiryButton.onclick = handleInquiry;
});

groupTab.addEventListener('click', function() {
    groupTab.classList.add('active');
    advertisingTab.classList.remove('active');
    groupContent.classList.add('active');
    advertisingContent.classList.remove('active');
    
    // Change button            
    inquiryButton.innerHTML = '<i class="fas fa-user-plus"></i> 크루 서비스 신청하기';
    inquiryButton.className = 'fixed-button purple';
    inquiryButton.onclick = handleApplication;
});

// Button handlers
function handleInquiry() {
    // alert('광고 문의 페이지로 이동합니다.');
    // In a real implementation, this would redirect to the inquiry page
    window.location.href = './inquiry.html';
}

function handleApplication() {            
    // alert('크루 서비스 신청 페이지로 이동합니다.');
    // In a real implementation, this would redirect to the application page
    window.location.href = './apply.html';
}
