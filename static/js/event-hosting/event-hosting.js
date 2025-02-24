
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
    const progress = document.getElementById('progress-container');
    const steps = document.querySelectorAll('.step');

    // progress.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

    steps.forEach((step, idx) => {
        console.log("????????")
        console.log(idx);
        console.log(currentStep);
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

// 티켓 카드 HTML 템플릿
function getTicketTemplate(index) {
    return `
        <div class="ticket-card">
            <div class="ticket-header">
                <h3 class="ticket-title">티켓 #${index + 1}</h3>
                <button type="button" class="ticket-remove" onclick="removeTicket(this)">삭제</button>
            </div>
            
            <div class="form-group">
                <label class="form-label required">티켓명</label>
                <input type="text" class="form-input" required>
            </div>

            <div class="form-group">
                <label class="form-label required">발급 수량</label>
                <input type="number" class="form-input" min="1" required>
            </div>

            <div class="form-group">
                <div class="price-container">
                    <div>
                    <label class="form-label required">가격</label>
                        <input type="number" class="form-input" min="0" required onchange="calculateDiscountPrice(this)">
                    </div>
                    <div>
                        <label class="form-label">할인율 (%)</label>
                        <input type="number" class="form-input" min="0" max="100" value="0" onchange="calculateDiscountPrice(this)">
                    </div>
                </div>
                <div class="discount-price" style="margin-top: 8px; color: #2196F3;"></div>
            </div>

            <div class="form-group">
                <label class="form-label required">판매 기간</label>
                <div class="date-container">
                    <div>
                        <label class="form-label">시작일</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>
                    <div>
                        <label class="form-label">종료일</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 외부 페이지 연동 토글
function toggleTicketForm() {
    const externalPage = document.getElementById('externalPage');
    const ticketFormContainer = document.getElementById('ticketFormContainer');
    const externalUrlContainer = document.getElementById('externalUrlContainer');
    
    if (externalPage.checked) {
        ticketFormContainer.style.display = 'none';
        externalUrlContainer.style.display = 'block';
    } else {
        ticketFormContainer.style.display = 'block';
        externalUrlContainer.style.display = 'none';
    }
}

// 티켓 추가
function addTicket() {
    const ticketList = document.getElementById('ticketList');
    const ticketCount = ticketList.children.length;
    const newTicket = document.createElement('div');
    newTicket.innerHTML = getTicketTemplate(ticketCount);
    ticketList.appendChild(newTicket);
}

// 티켓 삭제
function removeTicket(button) {
    button.closest('.ticket-card').remove();
}

// 할인가 계산
function calculateDiscountPrice(input) {
    const card = input.closest('.ticket-card');
    const priceInput = card.querySelector('input[type="number"]');
    const discountInput = card.querySelectorAll('input[type="number"]')[1];
    const discountPriceDiv = card.querySelector('.discount-price');
    
    const price = Number(priceInput.value);
    const discount = Number(discountInput.value);
    const discountedPrice = price * (1 - discount / 100);
    
    if (price && discount >= 0) {
        discountPriceDiv.textContent = `할인 적용가: ${Math.floor(discountedPrice).toLocaleString()}원`;
    }
}

// 페이지 전환 함수 업데이트
function updateFormSection(step) {
    const eventSection = document.getElementById('event-section');
    const ticketSection = document.getElementById('ticket-section');
    const accountSection = document.getElementById('account-section');
    const confirmationSection = document.getElementById('confirmation-section');
    const nextBtn = document.getElementById('next-btn');

    
    // 모든 섹션 숨기기
    [eventSection, ticketSection, accountSection].forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    // 현재 스텝에 해당하는 섹션 보이기
    console.log(step);
    switch(step) {
        case 1:
            eventSection.style.display = 'block';
            ticketSection.style.display = 'none';
            accountSection.style.display = 'none';
            confirmationSection.style.display = 'none';
            nextBtn.onclick = '';
            break;
        case 2:
            eventSection.style.display = 'none';
            ticketSection.style.display = 'block';
            accountSection.style.display = 'none';
            confirmationSection.style.display = 'none';
            break;
        case 3:
            eventSection.style.display = 'none';
            ticketSection.style.display = 'none';
            accountSection.style.display = 'block';
            confirmationSection.style.display = 'none';
            break;
        case 4:
            eventSection.style.display = 'none';
            ticketSection.style.display = 'none';
            accountSection.style.display = 'none';
            confirmationSection.style.display = 'block';
            break;
        case 5 :
            nextBtn.onclick = handleSubmit();
            break;
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 계좌번호 입력 시 숫자만 입력되도록 처리
document.querySelector('input[type="text"][placeholder*="숫자만"]').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
// 초기 티켓 추가
addTicket();

// 스텝 이동 함수
function updateSteps(currentStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        if (index < currentStep - 1) {
            step.classList.add('completed');
            step.classList.add('active');
        } else if (index === currentStep - 1) {
            step.classList.remove('completed');
            step.classList.add('active');
        } else {
            step.classList.remove('completed', 'active');
        }
    });
}

// 다음 버튼 클릭 이벤트 수정
document.querySelector('.next-btn').addEventListener('click', function() {
    const currentStep = document.querySelectorAll('.step.active').length;
    if (currentStep <= 4) {
        updateSteps(currentStep + 1);
        updateFormSection(currentStep + 1);
    }
});

// 이전 버튼 클릭 이벤트 수정
document.querySelector('.prev-btn').addEventListener('click', function() {
    const currentStep = document.querySelectorAll('.step.active').length;
    if (currentStep > 1) {
        updateSteps(currentStep - 1);
        updateFormSection(currentStep - 1);
    }
});

// 최종 확인 페이지 데이터 표시 함수
function updateConfirmationPage() {
    // 이벤트 설정 정보 가져오기
    const eventData = {
        name: document.querySelector('#eventSection input[type="text"]').value,
        // 다른 이벤트 설정 데이터도 가져오기
    };

    // 티켓 설정 정보 가져오기
    const ticketData = Array.from(document.querySelectorAll('.ticket-card')).map(card => ({
        name: card.querySelector('input[type="text"]').value,
        // 다른 티켓 설정 데이터도 가져오기
    }));

    // 정산 계좌 정보 가져오기
    const accountData = {
        holder: document.querySelector('#accountSection input[type="text"]').value,
        // 다른 계좌 설정 데이터도 가져오기
    };

    // 데이터를 화면에 표시
    displayConfirmationData(eventData, ticketData, accountData);
}

// 제출 처리 함수
function handleSubmit() {
    if (!document.getElementById('termsCheck').checked) {
        alert('안내사항 확인 및 동의가 필요합니다.');
        return;
    }

    // 완료 메시지 모달 표시
    showCompletionModal();
}

// 완료 메시지 모달 표시 함수
function showCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">신청 완료</h2>
            <div class="modal-message">
                <p>이벤트 주최 신청이 완료되었습니다.</p>
                <p>관리자가 승인 후 Eventiq의 페이지에 노출이 시작되며</p>
                <p>주최 관리 페이지를 확인하실 수 있습니다.</p>
                <p>영업일 기준 약 1~3일 소요되며,</p>
                <p>승인 시 이메일로 결과를 전달드립니다.</p>
            </div>
            <button class="btn btn-primary" onclick="window.location.href='/'">
                확인
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}