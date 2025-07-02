const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const preventDefaultAnchor = () => {
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach((a) => {
        a.addEventListener('click', (e) => e.preventDefault());
    });
    // window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navi = () => {
    const $header = get('#header');
    const $gnb = get('#header .headGnb .gnb');
    const $bg = get('.bg');
    const $menuTitles = getAll('#header .menuTitle a');
    const $menuWrap = getAll('#header .menuWrap');

    $menuTitles.forEach((title, idx) => {
        title.addEventListener('mouseenter', (e) => {
            $menuWrap.forEach((menu) => menu.classList.remove('on'));
            if ($menuWrap[idx]) {
                $menuWrap[idx].classList.add('on');
            }
            $bg.style.display = 'block';
        });
    });

    $menuWrap.forEach((menu) => {
        const mainMenus = menu.querySelectorAll('.mainMenu > ul > li');
        const subMenuUl = menu.querySelectorAll('.subMenuWrap > ul');

        mainMenus.forEach((item, i) => {
            const showSubs = () => {
                subMenuUl.forEach((sub) => sub.classList.remove('on'));
                if (subMenuUl[i]) {
                    subMenuUl[i].classList.add('on');
                }
            };
            item.addEventListener('mouseenter', (e) => showSubs());
            item.addEventListener('click', (e) => {
                e.preventDefault();
                showSubs();
            });
        });
        menu.addEventListener('mouseleave', () => {
            subMenuUl.forEach((sub) => sub.classList.remove('on'));
            $bg.style.display = 'none';
        });
    });
};

const getInit = () => {
    const getPage = (url, tag) => {
        const $container = get(tag);
        // 현재 문서에 해당 요소가 없으면 그냥 조용히 리턴!
        if (!$container) {
            return;
        }

        fetch(url)
            .then((res) => res.text())
            .then((html) => {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                const content = temp.querySelector(tag);

                // 불러온 HTML 안에 해당 요소가 있을 때만 추가하고, 없으면 이것도 조용히 패스!
                if (content) {
                    $container.appendChild(content);
                    navi();
                }
            })
            // fetch 실패해도 아무 메시지 없이 조용히 넘어감!
            .catch(() => {
                /* 에러 발생 시 아무것도 안 함 */
            });
    };

    getPage('sub/header.html', '#header');
    getPage('sub/footer.html', '#footer');
};

(() => {
    preventDefaultAnchor();
    getInit();
})();
