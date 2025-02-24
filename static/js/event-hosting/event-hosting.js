
// 발표자 추가 함수
function addSpeaker() {
    const speakersContainer = document.getElementById('speakersContainer');
    const speakerCard = document.createElement('div');
    speakerCard.className = 'speaker-card';
    speakerCard.innerHTML = `
                <div class="form-group">
                    <label class="form-label">프로필 사진</label>
                    <div class="file-input-container">
                        <input type="file" class="file-input" accept="image/*">
                        <p>프로필 사진을 원치 않을 경우 이벤트 대표 이미지를 삽입하세요.</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">이름 또는 닉네임</label>
                    <input type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">발표 주제</label>
                    <input type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">경력 사항</label>
                    <textarea class="form-input form-textarea"></textarea>
                </div>
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">삭제</button>
            `;
    speakersContainer.appendChild(speakerCard);
}

// 이벤트 타입 변경 핸들러
function handleEventTypeChange() {
    const eventType = document.getElementById('eventType').value;
    const addressInput = document.getElementById('addressInput');
    addressInput.className = `address-input ${eventType === 'offline' || eventType === 'hybrid' ? 'show' : ''}`;
}

// 카테고리 태그 생성
const categories = ['IT/개발', '디자인', '마케팅', '창업', '취업', '교육', '네트워킹', '기타'];
const categoryTags = document.getElementById('categoryTags');
categories.forEach(category => {
    const tag = document.createElement('div');
    tag.className = 'category-tag';
    tag.textContent = category;
    tag.onclick = function () {
        this.classList.toggle('selected');
    };
    categoryTags.appendChild(tag);
});

// 파일 업로드 UI 개선
document.querySelectorAll('.file-input-container').forEach(container => {
    container.onclick = function () {
        this.querySelector('.file-input').click();
    };
});

// 현재 스텝 상태 관리
let currentStep = 1;
const totalSteps = 4;

// 다음 스텝으로 이동
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateProgress();
    }
}

// 이전 스텝으로 이동
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgress();
    }
}

// 프로그레스 바 업데이트
function updateProgress() {
    const progress = document.getElementById('progress');
    const steps = document.querySelectorAll('.step');

    progress.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

    steps.forEach((step, idx) => {
        if (idx < currentStep) {
            step.classList.add('active');
            if (idx < currentStep - 1) {
                step.classList.add('completed');
            }
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // 버튼 상태 업데이트
    const prevButton = document.querySelector('.btn-secondary');
    const nextButton = document.querySelector('.btn-primary');

    prevButton.style.display = currentStep === 1 ? 'none' : 'block';
    nextButton.textContent = currentStep === totalSteps ? '제출' : '다음';
}

// 버튼 이벤트 리스너 업데이트
document.querySelector('.btn-secondary').onclick = prevStep;
document.querySelector('.btn-primary').onclick = nextStep;

// 초기 프로그레스 상태 설정
updateProgress();