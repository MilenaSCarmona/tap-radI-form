class FormView {
    constructor(form) {
        this.form = form;
    }

    template() {
        return `
            <span>Formulário enviado com sucesso!</span>
            <button id="formValidate" class="">ENVIAR</button>
        `
    }
}