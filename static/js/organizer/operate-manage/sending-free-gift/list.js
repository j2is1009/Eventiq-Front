function showDetail(id) {
    document.getElementById('listPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
    // 여기에 상세 정보를 가져오는 로직 추가
}

function showList() {
    document.getElementById('listPage').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
}

// 모달 제어
function openShippingModal() {
    document.getElementById('shippingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeShippingModal() {
    document.getElementById('shippingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 주소 검색
function searchAddress() {
    // 주소 검색 API 연동 로직
    alert('주소 검색 기능은 실제 구현 시 Daum 주소 API 등을 연동해야 합니다.');
}

// 폼 제출 처리
function handleShippingSubmit(event) {
    event.preventDefault();
    // 발송 등록 처리 로직
    alert('발송이 등록되었습니다.');
    closeShippingModal();
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('shippingModal');
    if (event.target == modal) {
        closeShippingModal();
    }
}