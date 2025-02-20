let addAttendeeRowFlag = false;

function addAttendeeRow() {
    if (!addAttendeeRowFlag) {
        const attendeeList = document.getElementById('attendeeList');
        const newRow = document.createElement('div');
        newRow.className = 'attendee-row';
        newRow.innerHTML = `
                <div class="attendee-input-group">
                    <label>아이디</label>
                    <input type="text" class="form-input" placeholder="참석자 아이디">
                </div>
                <div class="attendee-input-group">
                    <label>이메일</label>
                    <input type="email" class="form-input" placeholder="참석자 이메일 주소">
                </div>
                <div class="attendee-actions">
                    <button class="btn btn-primary">추가</button>
                    </div>
                    <div class="attendee-actions">
                    <button type="button" class="btn-remove-attendee" onclick="removeAttendeeRow(this)">
                        ✕
                    </button>
                </div>
            `;
        attendeeList.appendChild(newRow);
        addAttendeeRowFlag = true;
    }
}

function removeAttendeeRow(button) {
    const row = button.closest('.attendee-row');
    row.remove();
    addAttendeeRowFlag = false;
}

function showAddAttendeeModal() {
    document.getElementById('addAttendeeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addAttendeeModal').style.display = 'none';
    // 입력 필드 초기화
    document.getElementById('attendeeName').value = '';
    document.getElementById('attendeeEmail').value = '';
    document.getElementById('attendeeRole').value = 'participant';
    document.getElementById('attendeeRequired').checked = false;
}

function addAttendee() {
    const name = document.getElementById('attendeeName').value;
    const email = document.getElementById('attendeeEmail').value;
    const role = document.getElementById('attendeeRole');
    const required = document.getElementById('attendeeRequired').checked;

    if (!name || !email) {
        alert('이름과 이메일은 필수 입력 항목입니다.');
        return;
    }

    const roleText = role.options[role.selectedIndex].text;
    
    const attendeeList = document.getElementById('attendeeList');
    const attendeeCard = document.createElement('div');
    attendeeCard.className = 'attendee-card';
    attendeeCard.innerHTML = `
        <div class="attendee-info">
            <div class="attendee-details">
                <div class="attendee-name">${name}</div>
                <div class="attendee-email">${email}</div>
            </div>
            <div class="attendee-badges">
                <span class="badge badge-role">${roleText}</span>
                ${required ? '<span class="badge badge-required">필수</span>' : ''}
            </div>
        </div>
        <button type="button" class="btn-remove-attendee" onclick="removeAttendee(this)">
            ×
        </button>
    `;
    attendeeList.appendChild(attendeeCard);
    closeModal();
}

function removeAttendee(button) {
    const card = button.closest('.attendee-card');
    card.remove();
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 모달 외부 클릭시 닫기
document.getElementById('addAttendeeModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});