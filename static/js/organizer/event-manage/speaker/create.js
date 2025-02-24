function openModal() {
    document.getElementById('eventSearchModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('eventSearchModal').style.display = 'none';
}

function selectEvent(element) {
    const eventName = element.querySelector('h3').textContent;
    document.getElementById('eventInput').value = eventName;
    closeModal();
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('eventSearchModal');
    if (event.target == modal) {
        closeModal();
    }
}