// 创建一个新的Audio对象，用于播放音效
const audio = new Audio();
audio.src = 'click.mp3'; // 替换为你的音频文件路径

// 获取所有的链接元素
const links = document.querySelectorAll('a');

// 为每个链接添加点击事件监听器
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认的链接跳转行为
        audio.play(); // 播放音效

        // 播放音效后，延迟跳转到链接的目标页面
        setTimeout(() => {
            window.location.href = this.href; // 跳转到链接的目标页面
        }, 1000); // 延迟1秒后跳转，可以根据需要调整延迟时间
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有图像按钮
    var imageButtons = document.querySelectorAll('a img:not(.no-change)');
    
    // 定义原始和更改后的图像路径
    var originalSrc = 'images/ore-jump-to.png';
    var changedSrc1 = 'images/ore-jump-to2.png';
    var changedSrc2 = 'images/ore-jump-to2.png';
    
    // 为每个图像按钮添加点击事件监听器
    imageButtons.forEach(function(buttonImage, index) {
        buttonImage.addEventListener('click', function(event) {
            // 阻止默认行为（跳转）
            event.preventDefault();
            
            // 更改图像源
            buttonImage.src = index === 0 ? changedSrc1 : changedSrc2;
            
            // 1秒后恢复图像源和跳转
            setTimeout(function() {
                buttonImage.src = originalSrc;
                
                // 短暂延迟后跳转
                setTimeout(function() {
                    window.location.href = buttonImage.parentNode.href;
                }, 100); // 100毫秒延迟
            }, 700); // 1000毫秒延迟
        });
    });
});




//滚轮
const scrollbar = document.getElementById('custom-scrollbar');
const thumb = document.getElementById('scroll-thumb');
const content = document.documentElement;

let isDragging = false;
let initialMouseY = 0;
let initialScrollTop = 0;
let scrollbarHeight = scrollbar.clientHeight;
let contentHeight = content.scrollHeight;
let contentClientHeight = content.clientHeight;

// 更新滚动条的大小和位置
function updateThumbPosition() {
    const thumbHeight = scrollbarHeight * (contentClientHeight / contentHeight);
    const thumbTop = (content.scrollTop / (contentHeight - contentClientHeight)) * (scrollbarHeight - thumbHeight);
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${thumbTop}px`;
}

// 滚动条事件
function handleMouseDown(e) {
    isDragging = true;
    initialMouseY = e.clientY;
    initialScrollTop = content.scrollTop;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e) {
    e.preventDefault();
    const deltaY = e.clientY - initialMouseY;
    content.scrollTop = initialScrollTop + deltaY;
    updateThumbPosition();
}

function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// 监听滚动条拖动
thumb.addEventListener('mousedown', handleMouseDown);
// 初始化滚动条位置
updateThumbPosition();

// 窗口大小变化时更新滚动条
window.addEventListener('resize', function() {
    contentHeight = content.scrollHeight;
    contentClientHeight = content.clientHeight;
    updateThumbPosition();
});