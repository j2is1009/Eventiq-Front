// 모달 열기
function openModal() {
    document.getElementById('inviteModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 모달 닫기
function closeModal() {
    document.getElementById('inviteModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // 배경 스크롤 복구
}

// 초대 처리
function sendInvite() {
    const inviteInput = document.getElementById('inviteInput');
    const inviteValue = inviteInput.value.trim();
    
    if (!inviteValue) {
        alert('닉네임 또는 이메일을 입력해주세요.');
        return;
    }
    
    // 여기에 초대 처리 로직 추가
    
    closeModal();
}

// 모달 바깥 영역 클릭시 닫기
document.getElementById('inviteModal').addEventListener('click', (e) => {
    if (e.target.className === 'invite-modal-overlay') {
        closeModal();
    }
});