document.addEventListener('DOMContentLoaded', () => {
    let library = []
    
    function Book(title, author, pages, read) {
        // the constructor
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.read = read ? 'Yes' : 'No';
    }

    Book.prototype.setRead = function(read) {
        this.read = read;
    }

    Book.prototype.getInfo = function() {
        const bookProps = [
            {propCnt: 'Author: ', propValue: this.author},
            {propCnt: 'Title: ', propValue: this.title},
            {propCnt: 'Pages: ', propValue: this.pages},
            {propCnt: 'Read: ', propValue: this.read}
        ]
        let bookDes = document.createElement('div');
        for (let i = 0; i < bookProps.length; i++) {
            let p = document.createElement('p');
            let strong = document.createElement('strong');

            p.classList.add(classes[8]);

            strong.textContent = bookProps[i].propCnt;
            p.appendChild(strong);

            p.innerHTML += bookProps[i].propValue;
            bookDes.appendChild(p);
        }
        return bookDes;
    }

    Book.prototype.getRead = function() {
        return this.read;
    }

    function addBookToLibrary(book) {
        library.push(book)    
    }

    function removeBook(index) {
        library.splice(index, 1);
        removeLibCnt();
        renderCatalog();
    }

    function readBook(index) {
        const readStat = library[index].getRead();
        readStat === 'Yes' ? library[index].setRead('No') : 
                             library[index].setRead('Yes');
        
        removeLibCnt();
        renderCatalog();
    }

    let mainFeature = document.querySelector('#main-ft');

    const menuBtnNum = 2;

    const ids = ['start-menu', 'lib-feat', 'book-form'];
    const tags = ['input']
    const classes = ['t-btn', 'n-border', 'fl-c', 'form-ctn-c', 'align-left',
                     'form-hdr', 'form-input', 'cat-entry', 'cat-item', 'fade-in']
    const paddings = ['pb-15', 'p-8', 'pl-5'];
    const margins = ['m-10', 'mb-10'];
    const types = ['text', 'number', 'checkbox', 'button'];
    const attrs = ['for', 'type', 'name', 'placeholder', 'form', 'data-key'];
    const menuCnt = [
        {text: 'ADD BOOK', func: renderAddBook},
        {text: 'VIEW CATALOG', func: renderCatalog}
    ];
    const bookFormCnt = [
        {name: 'book-form', text: 'ADD BOOK', type: types[3], func: submitBook},
        {name: 'back', text: 'BACK', type: types[3], func: renderMenu}
    ]
    const bookFormInput = [
        {name: 'title', text: 'Title', placeholder: 'Enter title', type: types[0]},
        {name: 'author', text: 'Author', placeholder: 'Enter author', type: types[0]},
        {name: 'pages', text: 'Number of pages', placeholder: 'Enter number of pages', type: types[1]},
        {name: 'read', text: 'Read the book?', placeholder: '', type: types[2]},
    ]
    const catEntryCnt = [
        {text: 'REMOVE', func: removeBook},
        {text: 'READ', func: readBook},
        {text: 'BACK', func: renderMenu}
    ]

    function renderMenu() {
        let startMenu = document.createElement('div');
        startMenu.id = ids[0];
        startMenu.classList.add(classes[9]);
        for (let i = 0; i < menuBtnNum; i++){
            let tBtn = document.createElement('button');
            tBtn.classList.add(classes[0], margins[0]);
            tBtn.textContent = menuCnt[i].text;

            // Event Delegation to dynamically created elements
            tBtn.addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`)) {
                    removeLibCnt();
                    menuCnt[i].func();
                }
            }, false)
            
            startMenu.appendChild(tBtn);
        }
        mainFeature.appendChild(startMenu);
    }

    function renderAddBook() {
        let libFeature = document.createElement('div');
        let fieldset = document.createElement('fieldset');
        let form = document.createElement('form');

        libFeature.id = ids[1];
        form.id = ids[2];

        libFeature.classList.add(classes[2], classes[9]);
        fieldset.classList.add(classes[1]);

        renderBookFormInput(form);
        
        fieldset.appendChild(form);
        libFeature.appendChild(fieldset);
        mainFeature.appendChild(libFeature);
    }

    function renderBookFormInput(form) {
        for (let i = 0; i < bookFormInput.length; i++) {
            let bookInput = document.createElement('div');
            let label = document.createElement('label');
            let input = document.createElement('input');

            bookInput.classList.add(classes[3], margins[0]);
            label.classList.add(classes[4], classes[5]);
            input.classList.add(classes[6], paddings[1]);

            label.setAttribute(attrs[0], bookFormInput[i].name);
            label.textContent = bookFormInput[i].text;

            input.required = true;
            input.setAttribute(attrs[1], bookFormInput[i].type);
            input.setAttribute(attrs[2], bookFormInput[i].name);
            if (bookFormInput[i].length !== 0) 
                input.setAttribute(attrs[3], bookFormInput[i].placeholder);

            appendChildren(bookInput, [label, input]);
            form.appendChild(bookInput);
        }

        renderBookBtnCtn(form);
    }

    function renderBookBtnCtn(form) {
        let btnCtn = document.createElement('div');
        let btns = [];

        for (let i = 0; i < menuBtnNum; i++) 
            btns.push(document.createElement('button'));

        btnCtn.classList.add(classes[2]);

        for (let i = 0; i < bookFormCnt.length; i++) {
            btns[i].classList.add(classes[0], margins[0]);

            btns[i].textContent = bookFormCnt[i].text;
            btns[i].setAttribute(attrs[1], bookFormCnt[i].type);
            if (bookFormCnt[i].name === ids[2])
                btns[i].setAttribute(attrs[4], bookFormCnt[i].name);
            
            btns[i].addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`)) {
                    if (bookFormCnt[i].func.name === 'renderMenu')
                        removeLibCnt();
                    bookFormCnt[i].func();
                }
            }, false);
        }
        appendChildren(btnCtn, btns);
        form.appendChild(btnCtn);
    }

    function appendChildren(parent, children) {
        for (let i = 0; i < children.length; i++) parent.appendChild(children[i]);
    }

    function renderCatalog() {
        let catalog = document.createElement('div');
        let backBtnCtn = document.createElement('div');
        
        catalog.classList.add(classes[2], classes[9]);
        backBtnCtn.classList.add(classes[2], paddings[0]);

        for (let i = 0; i < library.length; i++) {
            let bookEntry = document.createElement('div');
            let bookCnt = library[i].getInfo();
            let bookBtns = renderCatBtns(i);

            bookEntry.setAttribute(attrs[5], i + 1);
            bookEntry.classList.add(classes[4], classes[7], paddings[2]);

            appendChildren(bookEntry, [bookCnt, bookBtns]);
            catalog.appendChild(bookEntry);
        }
        backBtnCtn.appendChild(renderBtn(catEntryCnt[catEntryCnt.length - 1]));
        appendChildren(mainFeature, [catalog, backBtnCtn]);
    }

    function renderCatBtns(index) {
        let btnCtn = document.createElement('div');
        let btns = [];

        for (let i = 0; i < menuBtnNum; i++) 
            btns.push(document.createElement('button'));

        btnCtn.classList.add(classes[2], paddings[0]);
        for (let i = 0; i < catEntryCnt.length - 1; i++){
            btns[i].classList.add(classes[0], margins[0]);
            btns[i].textContent = catEntryCnt[i].text;

            btns[i].addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`)) {
                    catEntryCnt[i].func(index);
                }
            }, false);
            btnCtn.appendChild(btns[i]);
        }
        return btnCtn;
    }

    function renderBtn(btnProps) {
        let btn = document.createElement('button');
        btn.classList.add(classes[0], margins[0]);
        for (let key in btnProps) {
            if (key === 'text') btn.textContent = btnProps[key];
            else if (key === 'func')  
                btn.addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`)) {
                    if (btnProps.func.name === 'renderMenu')
                        removeLibCnt();
                    btnProps.func();
                }
                }, false);
        }
        return btn;
    }

    function removeLibCnt() {
        while (mainFeature.lastChild.id !== 'header') 
            mainFeature.removeChild(mainFeature.lastChild);
    }

    function submitBook() {
        let bkForm = Array.from(document.querySelectorAll(`#${ids[2]} ${tags[0]}`))
        if (bkForm.filter(input => input.value !== '').length < bookFormInput.length) 
            return;
        bkForm = bkForm.reduce((acc, input) => ({...acc, 
            [input.name]: input.type === types[2] ? 
                          input.checked : input.value}), {})
        addBookToLibrary(new Book(bkForm.title, bkForm.author, bkForm.pages, bkForm.read));
        removeLibCnt();
        renderMenu();
    }

    // Initialize Test Cases
    let book1 = new Book('Harry Potter', 'J.K. Rowling', 200, false);
    let book2 = new Book('World of Animals', 'J.K. Rowling', 200, false);
    
    addBookToLibrary(book1);
    addBookToLibrary(book2);


    // Initialize Menu
    renderMenu();

    // FRONT-END
    // Establish simple layout of buttons, forms, and display books
    // Later, add a more dynamic layout

    // BACK-END
    // add rendering elements like buttom and such
    // add render form through NEW BOOK button
    // add interactivity with form
    // add removing button on each display // give data-attribute
    // add button to change read status
    // add firebase database to store data

    // use form values to send form values
});