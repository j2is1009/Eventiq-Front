// 권한 목록 데이터
const permissionGroups = [
    { id: 'event', name: '이벤트 관리' },
    { id: 'schedule', name: '일정 관리' },
    { id: 'speaker', name: '발표자 관리' },
    { id: 'participant', name: '참가자 관리' },
    { id: 'material', name: '자료 관리' },
    { id: 'inquiry', name: '문의 관리' },
    { id: 'group', name: '그룹 관리' },
    { id: 'settlement', name: '정산 관리' },
    { id: 'ticket', name: '티켓/쿠폰 관리' },
    { id: 'gift', name: '사은품 발송 관리' },
    { id: 'premium', name: '유료 서비스 관리' },
    { id: 'analytics', name: '데이터 분석' }
];

const permissionTypes = ['읽기', '쓰기', '수정', '삭제'];

// 현재 권한 표시
function displayCurrentPermissions() {
    const container = document.querySelector('.permission-list');
    container.innerHTML = permissionGroups.map(group => `
        <div class="permission-item">
            <h4>${group.name}</h4>
            <div class="permission-details">
                읽기, 쓰기, 수정
            </div>
        </div>
    `).join('');
}

// 권한 수정 폼 생성
function createPermissionEditForm() {
    const container = document.getElementById('editPermissions');
    container.innerHTML = `
        ${permissionGroups.map(group => `
            <div class="permission-group">
                <div class="permission-group-header">
                    <h3 class="permission-group-title">${group.name}</h3>
                    <label class="checkbox-wrapper">
                        <input type="checkbox" class="group-toggle" data-group="${group.id}">
                        <span>전체 선택</span>
                    </label>
                </div>
                <div class="permission-options">
                    ${permissionTypes.map(type => `
                        <label class="checkbox-wrapper">
                            <input type="checkbox" name="${group.id}_${type}">
                            <span>${type}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        <div class="save-permissions">
            <button class="btn btn-secondary" onclick="cancelPermissionEdit()">취소</button>
            <button class="btn btn-primary" onclick="savePermissionChanges()">저장</button>
        </div>
    `;

    // 전체 선택 이벤트 핸들러 설정
    document.querySelectorAll('.group-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const group = e.target.closest('.permission-group');
            const checkboxes = group[type="checkbox"];
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        });
    });
}

// 권한 수정 모드 토글
function togglePermissionEdit() {
    const currentPermissions = document.getElementById('currentPermissions');
    const editPermissions = document.getElementById('editPermissions');
    const editButton = document.getElementById('editPermissionBtn');

    if (editPermissions.style.display === 'none') {
        currentPermissions.style.display = 'none';
        editPermissions.style.display = 'block';
        editButton.textContent = '수정 취소';
        createPermissionEditForm();
    } else {
        cancelPermissionEdit();
    }
}

// 권한 수정 취소
function cancelPermissionEdit() {
    const currentPermissions = document.getElementById('currentPermissions');
    const editPermissions = document.getElementById('editPermissions');
    const editButton = document.getElementById('editPermissionBtn');

    currentPermissions.style.display = 'block';
    editPermissions.style.display = 'none';
    editButton.textContent = '권한 변경';
}

// 권한 변경 저장
function savePermissionChanges() {
    // 여기에 권한 저장 로직 구현
    alert('권한이 저장되었습니다.');
    cancelPermissionEdit();
    displayCurrentPermissions(); // 변경된 권한으로 목록 업데이트
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentPermissions();
    
    // Premium 상태와 주최자 여부에 따른 권한 설정
    const isPremium = true; // 예시: Premium 사용자
    const isHost = true;    // 예시: 주최자

    const editButton = document.getElementById('editPermissionBtn');
    editButton.style.display = isHost ? 'block' : 'none';
    editButton.disabled = !isPremium;
});