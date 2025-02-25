        // Simulated auth state - in a real app, you'd use proper auth management
        const MOCK_USER = {
            isLoggedIn: true,
            username: '홍길동',
            groupName: 'Event Masters',
            service: 'Premium'
        };

        // Simulated pricing data with subscription periods
        const PRICING = {
            Standard: {
                monthly: 50000,
                vat: 0.1, // 10% VAT
                periods: {
                    1: {
                        discount: 0,
                        label: '1개월'
                    },
                    3: {
                        discount: 0.05, // 5% discount
                        label: '3개월',
                    },
                    6: {
                        discount: 0.1, // 10% discount
                        label: '6개월',
                    },
                    12: {
                        discount: 0.15, // 15% discount
                        label: '12개월',
                        bestValue: true
                    }
                }
            },
            Premium: {
                monthly: 90000,
                vat: 0.1, // 10% VAT
                periods: {
                    1: {
                        discount: 0,
                        label: '1개월'
                    },
                    3: {
                        discount: 0.05, // 5% discount
                        label: '3개월',
                    },
                    6: {
                        discount: 0.1, // 10% discount
                        label: '6개월',
                    },
                    12: {
                        discount: 0.15, // 15% discount
                        label: '12개월',
                        bestValue: true
                    }
                }
            },
            Enterprise: {
                monthly: 200000,
                vat: 0.1, // 10% VAT
                periods: {
                    1: {
                        discount: 0,
                        label: '1개월'
                    },
                    3: {
                        discount: 0.05, // 5% discount
                        label: '3개월',
                    },
                    6: {
                        discount: 0.1, // 10% discount
                        label: '6개월',
                    },
                    12: {
                        discount: 0.15, // 15% discount
                        label: '12개월',
                        bestValue: true
                    }
                }
            }
        };

        // Bank account information
        const BANK_INFO = {
            bank: '기업은행',
            account: '273-104804-01-012',
            holder: '김재섭'
        };

        // Application state
        let state = {
            isLoggedIn: MOCK_USER.isLoggedIn,
            user: MOCK_USER,
            selectedPeriod: 1, // Default to 1 month
            paymentMethod: 'bank',
            isPaymentComplete: false
        };

        // Format number with commas for currency display
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Calculate pricing based on subscription period
        function calculatePricing(serviceName, periodMonths) {
            const serviceData = PRICING[serviceName];
            const periodData = serviceData.periods[periodMonths];
            
            const basePrice = serviceData.monthly * periodMonths;
            const discount = basePrice * periodData.discount;
            const discountedPrice = basePrice - discount;
            const vat = discountedPrice * serviceData.vat;
            const total = discountedPrice + vat;
            
            return {
                basePrice,
                discount,
                vat,
                total,
                periodData
            };
        }

        // Render login form
        function renderLoginForm() {
            return `
                <div class="login-form">
                    <h2>로그인</h2>
                    <p>크루 서비스를 신청하기 위해 로그인이 필요합니다.</p>
                    
                    <div class="form-group">
                        <label for="username">아이디</label>
                        <input type="text" id="username" class="form-control" placeholder="아이디를 입력하세요">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" class="form-control" placeholder="비밀번호를 입력하세요">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%" onclick="handleLogin()">로그인</button>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <a href="#" style="color: #666; text-decoration: none; font-size: 14px;">아이디/비밀번호 찾기</a> | 
                        <a href="#" style="color: #666; text-decoration: none; font-size: 14px;">회원가입</a>
                    </div>
                </div>
            `;
        }

        // Render quotation info section
        function renderQuotationInfo() {
            return `
                <div class="section">
                    <div class="section-header">
                        <i class="fas fa-info-circle"></i>
                        <h2 class="section-title">견적서 발행 안내</h2>
                    </div>
                    <div class="info-box">
                        <p class="info-text">
                            견적서 발행을 원하실 경우 <span class="highlight">support@eventiq.co.kr</span>으로 아래 양식에 맞춰 문의 부탁드립니다.
                        </p>
                        <p class="info-list-item">• 제목 : 크루 서비스 견적서 발행 요청</p>
                        <p class="info-list-item">• 아이디 : ${state.user.username}</p>
                        <p class="info-list-item">• 크루 서비스 : ${state.user.service}</p>
                        <p class="info-list-item">• 결제 여부 : (아직 결제 전이실 경우 X 표시)</p>
                        <p class="info-list-item">• 결제일 : (결제 진행 하셨을 경우 결제일 작성)</p>
                    </div>
                </div>
            `;
        }

        // Render service info section
        function renderServiceInfo() {
            return `
                <div class="section">
                    <div class="section-header">
                        <i class="fas fa-users"></i>
                        <h2 class="section-title">크루 서비스 정보</h2>
                    </div>
                    <div class="service-info-row">
                        <div class="service-info-label">신청 서비스:</div>
                        <div class="service-badge">${state.user.service}</div>
                    </div>
                    <div class="notice-box">
                        <p>현재 계정이 주최자로 되어있는 모든 이벤트 크루에 적용됩니다.</p>
                    </div>
                </div>
            `;
        }

        // Render subscription period selection
        function renderSubscriptionPeriods() {
            const servicePeriods = PRICING[state.user.service].periods;
            const serviceMonthly = PRICING[state.user.service].monthly;
            
            let periodsHtml = '';
            
            for (const [months, data] of Object.entries(servicePeriods)) {
                const isSelected = parseInt(months) === state.selectedPeriod;
                const monthlyEquivalent = (serviceMonthly * (1 - data.discount)).toFixed(0);
                const totalPrice = serviceMonthly * parseInt(months) * (1 - data.discount);
                
                periodsHtml += `
                    <div class="subscription-period ${isSelected ? 'selected' : ''}" onclick="selectPeriod(${months})">
                        ${data.discount > 0 ? `<span class="discount-badge">${data.discount * 100}% 할인</span>` : ''}
                        ${data.bestValue ? `<span class="best-value">인기</span>` : ''}
                        <div class="period-duration">${data.label}</div>
                        <div class="period-price">${formatNumber(totalPrice)}원</div>
                        <div class="period-monthly-price">월 ${formatNumber(monthlyEquivalent)}원</div>
                    </div>
                `;
            }
            
            return `
                <div class="section">
                    <div class="section-header">
                        <i class="fas fa-calendar-alt"></i>
                        <h2 class="section-title">이용 기간 선택</h2>
                    </div>
                    <div class="subscription-periods">
                        ${periodsHtml}
                    </div>
                </div>
            `;
        }

        // Render pricing info section
        function renderPricingInfo() {
            const pricing = calculatePricing(state.user.service, state.selectedPeriod);
            
            return `
                <div class="section">
                    <div class="section-header">
                        <i class="fas fa-file-invoice-dollar"></i>
                        <h2 class="section-title">결제 정보</h2>
                    </div>
                    <div class="pricing-row">
                        <div class="pricing-label">서비스 가격 (${state.selectedPeriod}개월)</div>
                        <div class="pricing-value">${formatNumber(pricing.basePrice)}원</div>
                    </div>
                    ${pricing.discount > 0 ? `
                        <div class="pricing-row">
                            <div class="pricing-label">할인 (${pricing.periodData.discount * 100}%)</div>
                            <div class="pricing-value discount-text">-${formatNumber(pricing.discount)}원</div>
                        </div>
                    ` : ''}
                    <div class="pricing-row">
                        <div class="pricing-label">VAT (10%)</div>
                        <div class="pricing-value">${formatNumber(pricing.vat)}원</div>
                    </div>
                    <div class="divider"></div>
                    <div class="total-row">
                        <div class="total-label">총 결제 금액</div>
                        <div class="total-value">${formatNumber(pricing.total)}원</div>
                    </div>

                    <div class="notice-box">
                        <p>
                            <span class="highlight">※ </span>
                            ${`해당 상품은 ${state.selectedPeriod}개월 약정 상품으로, 약정 기간 내 해지 시 할인된 금액 및 남은 기간에 대한 위약금이 발생할 수 있습니다.`}
                        </p>
                        <p>
                            <span class="highlight">※ </span>
                            해지를 원하실 경우 '크루 페이지 → 유료 서비스 → 크루 서비스 정보'에서 해지하실 수 있습니다.
                        </p>
                    </div>
                </div>
            `;
        }

        // Render payment method section
        function renderPaymentMethod() {
            return `
                <div class="section">
                    <div class="section-header">
                        <i class="fas fa-credit-card"></i>
                        <h2 class="section-title">결제 방식 선택</h2>
                    </div>
                    <div class="payment-methods">
                        <div class="payment-method ${state.paymentMethod === 'bank' ? 'selected' : ''}" onclick="selectPaymentMethod('bank')">
                            <i class="fas fa-university"></i>
                            <div class="payment-method-title">계좌 이체</div>
                        </div>
                        <div class="payment-method ${state.paymentMethod === 'card' ? 'selected' : ''}" onclick="selectPaymentMethod('card')">
                            <i class="fas fa-credit-card"></i>
                            <div class="payment-method-title">카드 결제</div>
                        </div>
                    </div>

                    ${state.paymentMethod === 'bank' ? renderBankTransferInfo() : ''}

                    <button class="payment-button" onclick="handlePayment()">
                        ${state.paymentMethod === 'bank' ? '서비스 신청하기' : '카드 결제하기'}
                    </button>
                </div>
            `;
        }

        // Render bank transfer information
        function renderBankTransferInfo() {
            const pricing = calculatePricing(state.user.service, state.selectedPeriod);
            
            return `
                <div class="bank-info">
                    <div class="bank-info-title">
                        <i class="fas fa-info-circle"></i>
                        계좌 이체 정보
                    </div>
                    <div class="bank-info-row">
                        <div class="bank-info-label">은행명</div>
                        <div class="bank-info-value">${BANK_INFO.bank}</div>
                    </div>
                    <div class="bank-info-row">
                        <div class="bank-info-label">계좌번호</div>
                        <div class="bank-info-value">${BANK_INFO.account}
                            <button class="copy-button" onclick="copyToClipboard('${BANK_INFO.account}')">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <div class="bank-info-row">
                        <div class="bank-info-label">예금주</div>
                        <div class="bank-info-value">${BANK_INFO.holder}</div>
                    </div>
                    <div class="bank-info-row">
                        <div class="bank-info-label">입금액</div>
                        <div class="bank-info-value">${formatNumber(pricing.total)}원</div>
                    </div>
                    <div class="bank-info-row">
                        <div class="bank-info-label">입금자명</div>
                        <div class="bank-info-value">${state.user.username} (본인 이름으로 입금해주세요)</div>
                    </div>
                    <div class="bank-notice">
                        <p>• 계좌 입금은 영업일 기준 1~3일 소요되며 입금 확인 후 크루 서비스 신청이 최종적으로 완료됩니다.</p>
                        <p>• 신청자 이름으로 입금을 해주셔야 확인이 가능합니다.</p>
                        <p>• 영업일 기준 4일 이후에도 승인되지 않을 경우 support@eventiq.co.kr으로 문의 부탁드립니다.</p>
                        <p style="color:red;">• 입금 후 반드시 아래의 '서비스 신청하기' 버튼을 눌러주세요.</p>
                    </div>
                </div>
            `;
        }

        // Render completion screen
        function renderCompletionScreen() {
            return `
                <div class="completion-container">
                    <div class="completion-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2 class="completion-title">결제가 완료되었습니다</h2>
                    <p class="completion-message">
                        ${state.selectedPeriod}개월 ${state.user.service} 서비스가 활성화되었습니다.<br>
                        진행 사항은 크루 페이지 → 유료 서비스 관리 → 크루 서비스 정보에서 확인 가능합니다.
                    </p>
                    <a href="../organizer/dashboard.html" class="completion-button" onclick="navigateToServiceManagement()">
                        이벤트 크루 페이지로 이동
                    </a>
                </div>
            `;
        }

        // Main render function
        function render() {
            const contentElement = document.getElementById('content');
            
            if (!state.isLoggedIn) {
                contentElement.innerHTML = renderLoginForm();
                return;
            }

            if (state.isPaymentComplete) {
                contentElement.innerHTML = renderCompletionScreen();
                return;
            }

            contentElement.innerHTML = `
                ${renderQuotationInfo()}
                ${renderServiceInfo()}
                ${renderSubscriptionPeriods()}
                ${renderPricingInfo()}
                ${renderPaymentMethod()}
            `;
        }

        // Handle login
        function handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                alert('아이디와 비밀번호를 입력해주세요.');
                return;
            }
            
            // In a real app, you would make an API call to verify credentials
            state.isLoggedIn = true;
            state.user = {
                ...MOCK_USER,
                username: username
            };
            
            render();
        }

        // Handle edit group name
        function handleEditGroupName() {
            const newGroupName = prompt('새로운 크루명을 입력해주세요:', state.user.groupName);
            if (newGroupName && newGroupName.trim() !== '') {
                state.user.groupName = newGroupName.trim();
                render();
            }
        }

        // Select subscription period
        function selectPeriod(months) {
            state.selectedPeriod = parseInt(months);
            render();
        }

        // Select payment method
        function selectPaymentMethod(method) {
            state.paymentMethod = method;
            render();
        }

        // Handle payment
        function handlePayment() {
            const pricing = calculatePricing(state.user.service, state.selectedPeriod);
            
            if (state.paymentMethod === 'bank') {
                alert(`[EventIQ] ${state.selectedPeriod}개월 ${state.user.service} 서비스 계좌이체 정보\n\n• 금액: ${formatNumber(pricing.total)}원\n• 계좌: ${BANK_INFO.bank} ${BANK_INFO.account} (${BANK_INFO.holder})\n\n입금 후 영업일 기준 1~3일 내에 승인 처리됩니다.`);
                state.isPaymentComplete = true;
                render();
            } else {
                // In a real app, you would integrate with a payment processor here
                if (confirm(`${state.selectedPeriod}개월 ${state.user.service} 서비스 (${formatNumber(pricing.total)}원)를 카드로 결제하시겠습니까?`)) {
                    // Simulate loading
                    const paymentButton = document.querySelector('.payment-button');
                    paymentButton.disabled = true;
                    paymentButton.innerHTML = '결제 처리 중...';
                    
                    // Simulate successful payment after 2 seconds
                    setTimeout(() => {
                        state.isPaymentComplete = true;
                        render();
                    }, 2000);
                }
            }
        }

        // Navigate to service management
        function navigateToServiceManagement() {
            // In a real app, you would navigate to the service management page
            location.href = '#service-management';
        }

        // Copy to clipboard function
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('계좌번호가 클립보드에 복사되었습니다.');
            }).catch(err => {
                console.error('클립보드 복사에 실패했습니다:', err);
            });
        }

        // Initial render
        document.addEventListener('DOMContentLoaded', render);