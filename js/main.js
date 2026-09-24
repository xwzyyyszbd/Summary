/**
 * 张峻银 - 前端开发实习生个人主页
 * 主交互脚本
 * 功能：粒子背景生成、滚动动画、技能条动画、平滑导航
 */

// ========== 1. 粒子背景生成 ==========
/**
 * 在页面背景中生成浮动粒子动画效果
 * 随机生成30个粒子，设置随机大小、位置、动画时长和延迟
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 随机大小 (2px ~ 8px)
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // 随机水平位置
        particle.style.left = Math.random() * 100 + '%';

        // 随机动画时长 (10s ~ 25s)
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';

        // 随机动画延迟 (0s ~ 10s)
        particle.style.animationDelay = (Math.random() * 10) + 's';

        particlesContainer.appendChild(particle);
    }
}

// ========== 2. 滚动显示动画 (Intersection Observer) ==========
/**
 * 使用 IntersectionObserver API 实现元素进入视口时的淡入动画
 * 同时触发技能进度条的填充动画
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加可见类，触发CSS过渡动画
                entry.target.classList.add('visible');

                // 触发该区块内的技能条动画
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(bar => {
                    const targetWidth = bar.dataset.width;
                    bar.style.width = targetWidth + '%';
                });
            }
        });
    }, {
        // 元素进入视口10%时触发
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
}

// ========== 3. 导航栏平滑滚动 ==========
/**
 * 为所有锚点链接绑定点击事件，实现平滑滚动到目标区块
 * 阻止默认跳转行为，使用 scrollIntoView 实现平滑滚动
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== 4. 导航栏滚动效果 ==========
/**
 * 监听页面滚动事件，根据滚动位置调整导航栏样式
 * 滚动超过50px时增加底部阴影，增强视觉层次
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 26, 0.85)';
        }
    });
}

// ========== 5. 技能条数据配置 ==========
/**
 * 定义各技能条的目标宽度百分比
 * 可通过修改此配置动态更新技能展示
 */
const skillData = [
    { name: 'HTML5 / CSS3', width: 90 },
    { name: 'JavaScript', width: 75 },
    { name: 'Photoshop / Illustrator', width: 85 },
    { name: 'Java / Python', width: 65 },
    { name: '低代码平台', width: 80 },
    { name: 'Vue.js（学习中）', width: 40 }
];

// ========== 6. 页面加载完成后初始化 ==========
/**
 * DOMContentLoaded 事件监听器
 * 确保DOM完全加载后再执行交互逻辑
 */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScrollEffect();

    console.log('页面初始化完成 - 张峻银个人主页');
    console.log('技能数据配置:', skillData);
});
