document.addEventListener('DOMContentLoaded', () => {
    

    let library = []
    
    function Book(title, author, pages, read) {
        // the constructor
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.read = read
    }

    Book.prototype.displayInfo = function () {
        console.log(`${this.author} ${this.title} ${this.pages} ${this.read}`)
    }

    function addBookToLibrary(book) {
        library.push(book)    
    }
    
    let book1 = new Book('Harry Potter', 'J.K. Rowling', 200, false);
    let book2 = new Book('World of Animals', 'J.K. Rowling', 200, false);
    
    addBookToLibrary(book1);
    addBookToLibrary(book2);

    for (let i = 0; i < library.length; i++) {
        library[i].displayInfo();
    }

    /*
    Render Start Menu


    */

    let mainFeature = document.querySelector('#main-ft');

    const menuBtnNum = 2;

    const ids = ['start-menu', 'lib-feat', 'book-form'];
    const tags = ['input']
    const classes = ['t-btn', 'n-border', 'fl-c', 'form-ctn-c', 'align-left',
                     'form-hdr', 'form-input']
    const paddings = ['pb-15', 'p-8'];
    const margins = ['m-10', 'mb-10'];
    const types = ['text', 'number', 'checkbox', 'button'];
    const attrs = ['for', 'type', 'name', 'placeholder', 'form'];
    const menuCnt = [
        {text: 'ADD BOOK', func: renderAddBook},
        {text: 'VIEW CATALOG', func: renderCatalog}
    ];
    const bookFormCnt = [
        {name: 'book-form', text: 'ADD BOOK', type: types[3], func: submitBook},
        {name: 'back', text: 'BACK', type: types[3], func: renderMenu}
    ]
    const bookFormInput = [
        {name: 'title', text: 'Title', placeholder: 'Enter title here', type: types[0]},
        {name: 'author', text: 'Author', placeholder: 'Enter author here', type: types[0]},
        {name: 'pages', text: 'Number of pages', placeholder: 'Enter number of pages here', type: types[1]},
        {name: 'read', text: 'Read the book?', placeholder: '', type: types[2]},
    ]
    const entryCnt = ['REMOVE', 'READ', 'BACK'];

    function renderMenu() {
        let startMenu = document.createElement('div');
        startMenu.id = ids[0];
        for (let i = 0; i < menuBtnNum; i++){
            let tBtn = document.createElement('button');
            tBtn.classList.add(classes[0], margins[0]);
            tBtn.textContent = menuCnt[i].text;

            // Event Delegation to dynamically created elements
            tBtn.addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`))
                    menuCnt[i].func();
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
        fieldset.classList.add(classes[1]);

        renderBookFormInput(form);

        console.log(form);
        
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
            btns[i].setAttribute(types[3], bookFormCnt[i].type);
            if (bookFormCnt[i].name === ids[2])
                btns[i].setAttribute(attrs[4], bookFormCnt.name);
            
            btns[i].addEventListener('click', (e) => {
                if (e.target && e.target.matches(`.${classes[0]}`))
                    bookFormCnt[i].func();
            }, false);
        }
        appendChildren(btnCtn, btns);
        form.appendChild(btnCtn);
    }

    function appendChildren(parent, children) {
        for (let i = 0; i < children.length; i++) parent.appendChild(children[i]);
    }

    function renderCatalog() {
        console.log('at catalog')
    }

    function submitBook() {
        //console.log('submit book');
        let bkForm = Array.from(document.querySelectorAll(`#${ids[2]} ${tags[0]}`))
        if (bkForm.filter(input => input.value !== '').length < bookFormInput.length) 
            return;
        bkForm = bkForm.reduce((acc, input) => ({...acc, 
            [input.name]: input.type === types[2] ? 
                          input.checked : input.value}), {})
        library.push(new Book(bkForm.title, bkForm.author, bkForm.pages, bkForm.read));
        console.log(library)
    }

    //renderMenu();
    renderAddBook();
    

    /*
    Form Feature

    const bookFormNum = 4;
    let library = [];
    let submitBookBtn = document.querySelector('#submit-book');

    submitBookBtn.addEventListener('click', () => {
        const bkForm = Array.from(document.querySelectorAll('#book-form input'))
        if (bkForm.filter(input => input.value !== '').length < bookFormNum) 
            return;
        library.push(bkForm.reduce((acc, input) => ({...acc, 
            [input.name]: input.value}), {}
        ))
    })
    */

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