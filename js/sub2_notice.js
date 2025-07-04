import { provisionData, regulations, legalCounsel } from '../data/data.js';

const sub2_all = () => {
    const $noticeHead = get('.notice-head h2');
    const $subTitle = getAll('.notice-head .sub-category p');

    let current = 0;

    $noticeHead.textContent = $subTitle[1].textContent;

    $subTitle.forEach((title, idx) => {
        title.addEventListener('click', (e) => {
            $noticeHead.textContent = $subTitle[idx].textContent;
            $subTitle.forEach((item) => item.classList.remove('on'));
            e.currentTarget.classList.add('on');
            if (idx === 0) {
                showTable(regulations);
            } else if (idx === 1) {
                showTable(provisionData);
            } else if (idx === 4) {
                showTable(legalCounsel);
            }
        });
    });

    const showTable = (data) => {
        const $table = get('.table tbody');
        $table.innerHTML = '';
        data.forEach((item, idx) => {
            const { number, title, date, view } = item;
            const tr = document.createElement('tr');

            const numberTd = document.createElement('td');
            numberTd.textContent = number;
            tr.appendChild(numberTd);

            const titleTd = document.createElement('td');
            titleTd.textContent = title;
            tr.appendChild(titleTd);

            const downloadTd = document.createElement('td');
            // downloadTd.textContent = item.download ? 'fa-solid?' : '';
            if (item.download) {
                const icon = document.createElement('img');

                icon.src = '/images/icons/download.png';
                icon.alt = '첨부파일';
                icon.style.width = '16px';
                icon.style.height = '16px';
                downloadTd.appendChild(icon);
            } else {
                downloadTd.textContent = '';
            }
            tr.appendChild(downloadTd);

            const dateTd = document.createElement('td');
            dateTd.textContent = date;
            tr.appendChild(dateTd);

            const viewTd = document.createElement('td');
            viewTd.textContent = view;
            tr.appendChild(viewTd);

            $table.appendChild(tr);
        });
    };

    showTable(provisionData);
};

(() => {
    sub2_all();
})();
