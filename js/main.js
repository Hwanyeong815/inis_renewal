const mainBanner = () => {
    const $bannerLis = getAll('#visual .main-visual li');
    const $next = get('#visual .btn-wrap .next ');
    const $prev = get('#visual .btn-wrap .prev');

    let current = 0,
        old = 0,
        size = 100,
        totalImg = $bannerLis.length,
        interval = 5000,
        timer = null;

    $bannerLis.forEach((el, i) => {
        el.style.left = i === 0 ? '0%' : '100%';
        el.style.zIndex = i === 0 ? 10 : 1;
        el.style.transition = 'none';
    });

    $next.addEventListener('click', (e) => {
        clearInterval(timer);
        old = current;
        current = (current + 1) % totalImg;
        banner('next');
        startAutoSlide();
    });
    $prev.addEventListener('click', (e) => {
        clearInterval(timer);
        old = current;
        current = (current - 1 + totalImg) % totalImg;
        banner('prev');
        startAutoSlide();
    });

    const startAutoSlide = () => {
        timer = setInterval(() => {
            $next.click();
        }, interval);
    };

    startAutoSlide();

    const banner = (txt) => {
        const num = txt === 'next' ? size : -size;
        const $cur = $bannerLis[current];
        const $old = $bannerLis[old];

        $old.style.transition = 'none';
        $cur.style.transition = 'none';

        $cur.style.left = `${num}%`;
        $cur.style.zIndex = 10;
        $old.style.zIndex = 1;

        $cur.offsetHeight;
        $old.offsetHeight;

        setTimeout(() => {
            $cur.style.transition = '0.8s ease';
            $old.style.transition = '0.8s ease';

            $cur.style.left = '0%';
            $cur.classList.add('on');

            $old.style.left = `${num * -1}%`;
            $old.classList.remove('on');
        }, 20);
    };
};

const con1 = () => {
    const $switchBtn = getAll('#main .con1 .titleBox .switch p');
    const $imgs = getAll('.category-toggle img');
    const $txts = getAll('.category-toggle p');

    $switchBtn.forEach((btn, idx) =>
        btn.addEventListener('click', (e) => {
            const clicked = e.currentTarget;

            if (clicked.classList.contains('on')) return;

            // 버튼 on 토글
            $switchBtn.forEach((item) => item.classList.remove('on'));
            clicked.classList.add('on');

            // idx: 0이면 홀수(0,2,4...), idx: 1이면 짝수(1,3,5...)
            const isEven = idx === 0;

            // 이미지 토글
            $imgs.forEach((img, i) => {
                const shouldShow = (i % 2 === 0) === isEven;
                img.classList.toggle('on', shouldShow);
            });

            // 텍스트 토글
            $txts.forEach((txt, i) => {
                const shouldShow = (i % 2 === 0) === isEven;
                txt.classList.toggle('on', shouldShow);
            });
        })
    );
};

const con2 = () => {
    const $cont = get('#main .con2 .left .content');
    const $infoBox = get('#main .con2 .left .content .infoBox-wrap');
    const $num = get('.con2 .left .btn-wrap .num span');
    const $prev = get('.con2 .left .btn-wrap .prev');
    const $next = get('.con2 .left .btn-wrap .next');
    const $stop = get('.con2 .left .btn-wrap .stop');
    const $play = get('.con2 .left .btn-wrap .play');

    let current = 0,
        interval = 5000,
        timer = null;

    const moveSlide = (index) => {
        if (index === 0) {
            $infoBox.style.left = '0%';
            $num.textContent = '1';
        } else {
            $infoBox.style.left = 'calc(-100% - 10px)';
            $num.textContent = '2';
        }
        current = index;
    };
    const startSlide = () => {
        timer = setInterval(() => {
            moveSlide(current === 0 ? 1 : 0);
        }, interval);
    };

    const stopSlide = () => {
        clearInterval(timer);
    };

    moveSlide(0);
    startSlide();

    $next.addEventListener('click', (e) => moveSlide(1));
    $prev.addEventListener('click', (e) => moveSlide(0));

    $cont.addEventListener('mouseenter', stopSlide);
    $cont.addEventListener('mouseleave', () => {
        stopSlide();
        startSlide();
    });
    $stop.addEventListener('click', (e) => {
        stopSlide();
        $stop.style.display = 'none';
        $play.style.display = 'block';
    });
    $play.addEventListener('click', (e) => {
        startSlide();
        $play.style.display = 'none';
        $stop.style.display = 'block';
    });
};

const con3 = () => {
    const $imgs = getAll('#main .con3 .promo .imgs img');
    const $cur = get('.con3 .promo .btn-wrap .cur');
    const $tot = get('.con3 .promo .btn-wrap .tot');
    const $stop = get('.con3 .promo .btn-wrap .stop');
    const $play = get('.con3 .promo .btn-wrap .play');
    const $prev = get('.con3 .promo .btn-wrap .prev');
    const $next = get('.con3 .promo .btn-wrap .next');

    let current = 0,
        old = 0,
        size = 100,
        interval = 4000,
        total = $imgs.length;

    $imgs.forEach((img) => {
        img.style.position = 'absolute';
        img.style.left = '100%';
        img.style.top = 0;
        img.style.width = '100%';
        img.style.transition = 'left 0.8s ease';
    });
    $imgs[0].style.left = '0%';

    $cur.textContent = current + 1;
    $tot.textContent = total;

    const slide = (txt) => {
        const num = txt === 'next' ? size : -size;
        $imgs[current].style.transition = '0s';
        $imgs[current].style.left = `${num}%`;
        setTimeout(() => {
            $imgs[current].style.transition = '0.8s';
            $imgs[current].style.left = '0%';
            $imgs[current].classList.add('on');

            $imgs[old].style.left = `${-num}%`;
            $imgs[old].classList.remove('on');

            $cur.textContent = current + 1;
        }, 20);
    };

    $cur.textContent = current + 1;
    $tot.textContent = total;

    $next.addEventListener('click', () => {
        old = current;
        current = (current + 1) % total;
        slide('next');
    });

    $prev.addEventListener('click', () => {
        old = current;
        current = (current - 1 + total) % total;
        slide('prev');
    });

    const startSlide = () => {
        timer = setInterval(() => {
            $next.click();
        }, interval);
    };

    const stopSlide = () => {
        clearInterval(timer);
    };

    $stop.addEventListener('click', (e) => {
        stopSlide();
        $stop.style.display = 'none';
        $play.style.display = 'block';
    });

    $play.addEventListener('click', (e) => {
        startSlide();
        $play.style.display = 'none';
        $stop.style.display = 'block';
    });

    // 자동재생 시작
    startSlide();
    $imgs.forEach((img) => {
        img.addEventListener('mouseenter', stopSlide);
        img.addEventListener('mouseleave', startSlide);
    });
};

const con5_youtube = () => {
    const $bigImg = get('.con5 .big-thums img');
    const $thums = getAll('.con5 .img-box-wrap .img-box img');
    const $imgBoxs = get('.con5 .img-box-wrap');

    let current = 0,
        imgurl = null,
        timer = null,
        interval = 8000,
        total = $thums.length;

    $thums.forEach((thum, idx) => {
        thum.addEventListener('click', (e) => {
            imgurl = `images/imgthum-${idx}.jpg`;
            $bigImg.setAttribute('src', imgurl);
        });
    });

    const thumAni = () => {
        if (current > total - 1) current = 0;
        imgurl = `images/imgthum-${current}.jpg`;
        $bigImg.setAttribute('src', imgurl);
        current++;
    };

    const startInt = () => {
        timer = setInterval(thumAni, interval);
    };

    const stopInt = () => {
        clearInterval(timer);
    };
    startInt();

    const targets = [$imgBoxs, $bigImg];
    targets.forEach((el) => {
        el.addEventListener('mouseenter', stopInt);
        el.addEventListener('mouseleave', startInt);
    });
};

const con5 = () => {
    const $img = get('.con5 .notice .imgBox img');
    const $next = get('.con5 .notice .btn-wrap .next');
    const $prev = get('.con5 .notice .btn-wrap .prev');
    const $pages = getAll('.con5 .notice .btn-wrap2 .btn');

    console.log($img);

    let imgurl,
        timer,
        interval = 5000,
        current = 0,
        total = 3;

    // imgurl = `images/notice-img-0${idx}.png`

    // timer = setInterval(statSlide, interval);

    const startSlide = () => {
        timer = setInterval(() => {
            $next.click();
        }, interval);
    };

    startSlide();

    const stopSlide = () => {
        clearInterval(timer);
    };

    $pages[current].classList.add('on');

    $next.addEventListener('click', (e) => {
        clearInterval(timer);
        current++;
        if (current > total - 1) current = 0;
        imgurl = `images/notice-img-0${current}.png`;
        $img.setAttribute('src', imgurl);
        $pages.forEach((page) => {
            page.classList.remove('on');
        });
        $pages[current].classList.add('on');
        startSlide();
    });

    $prev.addEventListener('click', (e) => {
        clearInterval(timer);
        current--;
        if (current < 0) current = total - 1;
        imgurl = `images/notice-img-0${current}.png`;
        $img.setAttribute('src', imgurl);
        $pages.forEach((page) => {
            page.classList.remove('on');
        });
        $pages[current].classList.add('on');
        startSlide();
    });

    $img.addEventListener('mouseenter', stopSlide);
    $img.addEventListener('mouseleave', startSlide);
};

(() => {
    mainBanner();
    con1();
    con2();
    con3();
    con5_youtube();
    con5();
})();
