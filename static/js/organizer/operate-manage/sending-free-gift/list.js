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

// 수령인 검색 모달 제어
function openRecipientModal() {
    document.getElementById('recipientModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRecipientModal() {
    document.getElementById('recipientModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 검색 처리
function handleSearch(event) {
    if (event.key === 'Enter') {
        searchRecipients();
    }
}

function searchRecipients() {
    const searchInput = document.getElementById('searchInput').value;
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    // 검색 로직 구현
    console.log(`Searching for ${searchInput} by ${searchType}`);
}

// 수령인 선택 처리
function selectRecipient(index) {
    // 예시 데이터
    const recipients = [
        {
            name: '홍길동',
            phone: '010-1234-5678',
            zipcode: '12345',
            address1: '서울시 강남구 테헤란로 123',
            address2: '456호'
        },
        {
            name: '김영희',
            phone: '010-9876-5432',
            zipcode: '54321',
            address1: '서울시 서초구 서초대로 456',
            address2: '789호'
        }
    ];

    const selected = recipients[index];
    
    // 선택된 수령인 정보 표시
    document.getElementById('recipientInfo').value = selected.name;
    document.getElementById('recipientName').value = selected.name;
    document.getElementById('recipientPhone').value = selected.phone;
    document.getElementById('recipientZipcode').value = selected.zipcode;
    document.getElementById('recipientAddress1').value = selected.address1;
    document.getElementById('recipientAddress2').value = selected.address2;
    
    // 상세 정보 표시
    document.getElementById('recipientDetails').style.display = 'block';
    
    closeRecipientModal();
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}