document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.querySelector("#cep");
    const addressInput = document.querySelector("#rua");
    const cityInput = document.querySelector("#cidade");
    const neighborhoodInput = document.querySelector("#bairro");
    const regionInput = document.querySelector("#uf");

    cepInput.addEventListener("keypress", (e) => {
        const onlyNumbers = /[0-9]|\./;
        const key = String.fromCharCode(e.keyCode);

        // allow only numbers
        if (!onlyNumbers.test(key)) {
            e.preventDefault();
            return;
        }
    });

    cepInput.addEventListener("keyup", async (e) => {
        const inputValue = e.target.value;

        // Check if we have a complete CEP
        if (inputValue.length === 8) {
            await getAddress(inputValue);
            document.getElementById('numero_endereco').focus();
        }
    });

    const getAddress = async (cep) => {
        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.erro) {
                console.error("CEP não encontrado");
                return;
            }

            addressInput.value = data.logradouro;
            cityInput.value = data.localidade;
            neighborhoodInput.value = data.bairro;
            regionInput.value = data.uf;
        } catch (error) {
            console.error("Ocorreu um erro ao obter o endereço:", error);
        }
    };
});