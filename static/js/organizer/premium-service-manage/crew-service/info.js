       // 서비스 상태에 따라 UI 업데이트
       const serviceInfo = {
        hasService: true,
        serviceType: 'Premium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        nextPaymentDate: '2024-03-24',
        status: '이용중'
    };

    function handleApplyService() {
        // 그룹 서비스 신청 페이지로 이동
        console.log('그룹 서비스 신청 페이지로 이동');
    }

    function handleCancelService() {
        // 그룹 서비스 해지 신청 페이지로 이동
        console.log('그룹 서비스 해지 신청 페이지로 이동');
    }

    // 초기 UI 설정
    if (!serviceInfo.hasService) {
        document.getElementById('serviceInfoContainer').style.display = 'none';
        document.getElementById('noServiceContainer').style.display = 'block';
    }