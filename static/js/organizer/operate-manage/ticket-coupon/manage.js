// 티켓 모달 제어
function openTicketModal(type) {
    const modal = document.getElementById('ticketModal');
    const btn = document.getElementById('ticket-form-submit-btn');
    const title = document.querySelector('#ticketModal .modal-title');

    if (type === 'add') {
        title.textContent = '티켓 추가';
        btn.textContent = '추가';
    } else {
        title.textContent = '티켓 수정';
        btn.textContent = '수정';
    }

    modal.style.display = 'block';
}

function closeTicketModal() {
    document.getElementById('ticketModal').style.display = 'none';
}

// 쿠폰 모달 제어
function openCouponModal(type) {
    const modal = document.getElementById('couponModal');
    const btn = document.getElementById('coupon-form-submit-btn');
    const title = document.querySelector('#couponModal .modal-title');

    if (type === 'add') {
        title.textContent = '쿠폰 발급';
        btn.textContent = '발급';
    } else {
        title.textContent = '쿠폰 수정';
        btn.textContent = '수정';
    }

    modal.style.display = 'block';
}

function closeCouponModal() {
    document.getElementById('couponModal').style.display = 'none';
}

// 랜덤 쿠폰 코드 생성
function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.querySelector('#couponForm input[type="text"]').value = code;
}

// 폼 제출 처리
document.getElementById('ticketForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // 티켓 저장 로직 구현
    closeTicketModal();
});

document.getElementById('couponForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // 쿠폰 발급 로직 구현
    closeCouponModal();
});

// 등급에 따른 쿠폰 발급 버튼 제어
function checkSubscriptionLevel() {
    const isStandard = true; // 실제 구현 시 등급 체크 로직 필요
    const createCouponBtn = document.getElementById('createCouponBtn');
    createCouponBtn.disabled = !isStandard;
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    checkSubscriptionLevel();
});