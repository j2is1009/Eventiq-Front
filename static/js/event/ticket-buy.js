// 변수 초기화
let selectedTicketName = '';
let selectedTicketPrice = 0;
let selectedTicketOriginal = 0;
let discountAmount = 0;
let couponApplied = false;

// 티켓 선택 함수
function selectTicket(element, name, price, original) {
    // 모든 티켓 옵션의 선택 상태 제거
    document.querySelectorAll('.ticket-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 현재 티켓 옵션 선택 상태로 변경
    element.classList.add('selected');
    
    // 라디오 버튼 체크
    const radio = element.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // 선택한 티켓 정보 저장
    selectedTicketName = name;
    selectedTicketPrice = price;
    selectedTicketOriginal = original;
    
    // 결제 정보 업데이트
    updatePaymentSummary();
    
    // 무료 티켓인 경우 버튼 텍스트 변경
    if (price === 0) {
        document.getElementById('payButton').textContent = '무료로 구매하기';
        document.getElementById('payButton').classList.remove('paid');
        document.getElementById('payButton').classList.add('free');
    } else {
        document.getElementById('payButton').textContent = '결제하기';
        document.getElementById('payButton').classList.remove('free');
        document.getElementById('payButton').classList.add('paid');
    }
}

// 쿠폰 적용 함수
function applyCoupon() {
    // 간단한 예시 쿠폰 적용 (실제로는 서버에서 확인 필요)
    const couponInput = document.querySelector('.coupon-input');
    
    if (couponInput.value.toUpperCase() === 'AI2025') {
        document.getElementById('appliedCoupon').classList.add('visible');
        couponApplied = true;
        couponInput.value = '';
        
        // 10% 할인 적용 (예시)
        discountAmount = Math.round(selectedTicketPrice * 0.1);
        updatePaymentSummary();
    } else {
        alert('유효하지 않은 쿠폰 코드입니다.');
    }
}

// 쿠폰 제거 함수
function removeCoupon() {
    document.getElementById('appliedCoupon').classList.remove('visible');
    couponApplied = false;
    discountAmount = 0;
    updatePaymentSummary();
}

// 결제 정보 업데이트 함수
function updatePaymentSummary() {
    // 할인 계산 (프로모션 할인 + 쿠폰 할인)
    const promotionDiscount = selectedTicketOriginal - selectedTicketPrice;
    const totalDiscount = promotionDiscount + (couponApplied ? discountAmount : 0);
    
    // 최종 가격 계산
    const finalPrice = selectedTicketPrice - (couponApplied ? discountAmount : 0);
    
    // 금액 포맷팅 함수
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
    };
    
    // 결제 정보 업데이트
    document.getElementById('summaryTicket').textContent = selectedTicketName;
    document.getElementById('summaryOriginal').textContent = formatPrice(selectedTicketOriginal);
    document.getElementById('summaryDiscount').textContent = '-' + formatPrice(totalDiscount);
    document.getElementById('summaryTotal').textContent = formatPrice(finalPrice);
}

// 결제 또는 무료 구매 버튼 클릭 시 구매 완료 페이지로 이동
document.getElementById('payButton').addEventListener('click', function() {
    location.href = '../event/ticket-buy-complete.html';
});