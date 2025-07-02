import sub1 from './sub1_data.js';

const sub1_all = () => {
    const $list = get('.service .list-box');
    const $checks = getAll('.chk-box input[type="checkbox"]');
    const $num = get('.filter .num');
    const $total = get('.list-title h3 span');

    const renderList = (data) => {
        $list.innerHTML = '';
        data.forEach((item, i) => {
            const li = document.createElement('li');

            const emWrap = document.createElement('div');
            emWrap.classList.add('em-wrap');
            item.tags.forEach((tag) => {
                const em = document.createElement('em');
                em.textContent = tag;
                emWrap.appendChild(em);
            });

            const strong = document.createElement('strong');
            strong.textContent = item.title;

            const p = document.createElement('p');
            p.textContent = item.desc;

            const btn = document.createElement('button');
            btn.textContent = '자세히보기';

            li.append(emWrap, strong, p, btn);
            $list.appendChild(li);
        });
    };

    const applyFilter = () => {
        const checkedTypes = Array.from($checks)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value); // ['지역가입자', '직장가입자']

        let filtered;

        if (checkedTypes.length === 0) {
            filtered = sub1;
        } else {
            filtered = sub1.filter((item) => checkedTypes.includes(item.type));
        }

        renderList(filtered);
        $num.textContent = checkedTypes.length;
        $total.textContent = filtered.length;
    };

    renderList(sub1);
    $num.textContent = 0;
    $total.textContent = sub1.length;

    $checks.forEach((checkbox) => {
        checkbox.addEventListener('change', applyFilter);
    });
};

(() => {
    sub1_all();
})();
