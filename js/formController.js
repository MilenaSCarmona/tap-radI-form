class FormController {
    selectors = {
        self: '.cmp-form__card',
        inputCheckbox: '.cmp-form__card-checkbox:checked',
        inputCounter: '.cmp-form__card-input',
        inputTextarea: '.cmp-form__card-textarea',
        footer: '.cmp-form__card-footer',
        idButtonMore: '#more',
        idButtonLess: '#less',
        idButton: "#formValidate"
    }

    modifiers = {
        classErro: 'erro',
        classDisabledCouter: 'disabled-btn',
    }

    constructor() {
        this.app = document.querySelector(this.selectors.self);
        this.form = new Form('',0,'');
        this.infor = document.querySelector(this.selectors.footer);
        this.bind();
    }

    bind() {
        let counter = document.querySelector(this.selectors.inputCounter);
        let idButtonLess = document.querySelector(this.selectors.idButtonLess);
        let idButton = document.querySelector(this.selectors.idButton);

        document.querySelector(this.selectors.idButtonMore).addEventListener('click', (e) => this.more(e, counter, idButtonLess));
        idButtonLess.addEventListener('click', (e) => this.less(e, counter, idButtonLess));
        idButton.addEventListener('click', (e) => this.formValidate(e, idButton));
    }

    reset(checkboxInput, counterInput, commentsInput) {
        this.form = new Form('',0,'');
        commentsInput.value = '';
        counterInput.value = 0;
        for (var i = 0; i < checkboxInput.length; i++) {
            if (checkboxInput[i].checked) {
                checkboxInput[i].checked = false ;
            }
        }
    }

    mountShow() {
        let showErro = document.getElementById("toast");
        showErro.className = "show";
        setTimeout(function(){ 
            showErro.className = showErro.className.replace("show", ""); 
        }, 3000);
    }

    setIntervalButton() {
        let idButton = document.getElementById('formValidate');
        setInterval(function(){ 
            idButton.innerText= 'ENVIAR';
            idButton.classList.remove("disabled");
            idButton.disabled = false;
        }, 1000);
        this.mountShow();
    }

    requeridCounter(input) {
        input.classList.remove(this.modifiers.classErro);   
        if(input.value == 0){
            input.classList.add(this.modifiers.classErro);
            this.setIntervalButton();
            return false;
        }else {
            return true;
        }
    }

    requeridCheckbok(checkbox){
        const value = [];
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                value.push(checkbox[i].value);
            }
        }

        if(value == ""){
            document.getElementById("vue").classList.add(this.modifiers.classErro);
            document.getElementById("angular").classList.add(this.modifiers.classErro);
            document.getElementById("react").classList.add(this.modifiers.classErro);
            this.setIntervalButton();
            return null;
        }else {
            document.getElementById("vue").classList.remove(this.modifiers.classErro);
            document.getElementById("angular").classList.remove(this.modifiers.classErro);
            document.getElementById("react").classList.remove(this.modifiers.classErro);
            return value;
        }
    }

    less(e, counter, idButton) {    
        counter.value -- ;
        this.form.counter = counter.value;

        if((counter.value ) == 0){
            idButton.classList.add(this.modifiers.classDisabledCouter);
            idButton.disabled = true;
        }else {
            idButton.classList.remove(this.modifiers.classDisabledCouter);
            idButton.disabled = false;
        }
        e.preventDefault();
    }
      
    more(e, counter, idButton) {      
        if(counter.value < 0){
            idButton.classList.add(this.modifiers.classDisabledCouter);
            idButton.disabled = true;
        }else {
            idButton.classList.remove(this.modifiers.classDisabledCouter);
            idButton.disabled = false;
        }

        counter.value ++ ;
        this.form.counter = counter.value;
        e.preventDefault();
    }

    formValidate(e,idButton) {
        idButton.innerText= 'ENVIANDO...';
        idButton.classList.add("disabled");
        idButton.disabled = true;
       
        let checkbox  = document.querySelectorAll(this.selectors.inputCheckbox);
        let counter = document.querySelector(this.selectors.inputCounter);
        let comments = document.querySelector(this.selectors.inputTextarea);
       
        if (this.requeridCheckbok(checkbox) != null 
        && this.requeridCounter(counter) == true) {
            this.form.checklist = this.requeridCheckbok(checkbox);
            this.form.counter = counter.value;
            this.form.comments = comments.value;
            this.infor.innerHTML = new FormView(this.form).template();
            this.reset(checkbox, counter, comments);
        }
        e.preventDefault();
    }
}