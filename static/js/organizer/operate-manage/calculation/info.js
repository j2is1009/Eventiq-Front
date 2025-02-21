        // 계좌 정보 수정 토글
        function toggleAccountEdit() {
            const inputs = document.querySelectorAll('.account-form input');
            const editButton = document.getElementById('editAccountBtn');
            
            if (inputs[0].disabled) {
                // 수정 모드 활성화
                inputs.forEach(input => input.disabled = false);
                editButton.textContent = '저장';
            } else {
                // 저장 및 수정 모드 비활성화
                if (confirm('변경된 계좌 정보를 저장하시겠습니까?')) {
                    inputs.forEach(input => input.disabled = true);
                    editButton.textContent = '정보 수정';
                    alert('계좌 정보가 저장되었습니다.');
                }
            }
        }

        // 주최자 권한 체크
        function checkHostPermission() {
            const isHost = true; // 실제 구현 시 권한 체크 로직 필요
            const editButton = document.getElementById('editAccountBtn');
            editButton.style.display = isHost ? 'block' : 'none';
        }

        // 페이지 로드 시 초기화
        document.addEventListener('DOMContentLoaded', () => {
            checkHostPermission();
        });