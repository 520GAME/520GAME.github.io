const modal = document.getElementById('modal');
    const dragBar = document.getElementById('dragBar');
    const closeBtn = document.getElementById('closeBtn');

    let isDragging = false;
    let startX;
    let startY;

    // 关闭模拟窗口
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // 开始拖拽
    dragBar.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX - modal.offsetLeft;
        startY = e.clientY - modal.offsetTop;
    });

    // 结束拖拽
    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // 拖拽中
    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            // modal.style.transform = 'none';
            const newLeft = e.clientX - startX;
            const newTop = e.clientY - startY;

            // 限制拖拽范围不超出页面
            const maxX = window.innerWidth - modal.offsetWidth/2;
            const maxY = window.innerHeight - modal.offsetHeight/2;
            const clampedLeft = Math.min(Math.max(modal.offsetWidth/2, newLeft), maxX);
            const clampedTop = Math.min(Math.max(modal.offsetHeight/2, newTop), maxY);

            modal.style.left = clampedLeft + 'px';
            modal.style.top = clampedTop + 'px';
        }
    });