/**
 * Authors: Eliane Edvania
 * Version: 1
 * Project: Agenda de contatos com HTML5, Tailwid cc e, Javascript es6 e Localstorage
 */

// Obtem referencias aos Elementos do Navegador (DOM)
const contactForm = document.getElementById("contactForm");
const flashMessage = document.getElementById("flashMessage");
const contactlist = document.getElementById("contactList");

// Manipulador de eventos de envio do formulario
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  // Verifica se O ID existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

// Funcao para salvar o contato no localstorage
function saveContact() {
  const name = document.getElementById("name").Value;
  const phone = docunent.getElementById("phone").value;
  const email = docunent.getElementById("email").value;
  const birthdate = docunent.getElementById("birthdate").value;

  //Criacao do ID do contato
  const id = Date.now().toString();
  contact = { id, name, phone, email, birthdate };

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  // Slavar o contato
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  showFlashMessage("Contato salvo com sucesso!");
  contactForm.reset();
  displayContacts();
}

// Funcao para exibir a mensagem flash
function showFlashMessage(message) {
  flashMessage.textContent(message);
  flashMessage.classList.remove("hidden");
  setTimeout(() => {
    flashMessage.classList.add("hidden");
  }, 5000);
}

// Funcao para exibir os contatos na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contactlist.innerHTML = ""[ // Limpar a tabela antes de exibir
    // Cria o cabeçalho da tabela
    ("Nome", "Telefone", "Email", "Data de nascimento", "Açoes")
  ]
    .forEach((headerText) => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = headerText;
      headerCell.classList.add(
        "px-4",
        "py-2",
        "bg-gray-200",
        "text-gray-800",
        "font-bold"
      );
      // Estilo do cabeçalho
    });
  contacts.forEach((contact) => {
    const row = contactlist
      .inseryRow()

      [
        // Excluimos o ´birthadate´ para corrigirmos o formato da data

        ("name", "phone", "email")
      ].forEach((key) => {
        const cell = row.insertCell();
        cell.textContent = contact[Key];
        cell.classList.add("border-t", "px-4", "py-2"); // Estilizaçao das celulas
      });

    // Formata a data de nascimento para o formulario brasileiro
    const birthadateCell = row.insertCell();
    const [year, month, day] = contact.birthadate.split("-"); // Separa os componentes da data

    const birthadate = new Date(year, month - 1, day); // Formatando a data no padrao brasileiro

    const formattedBirthdate = birthadate.tolocaleDateString("pt-BR");
    birthadateCell.textContent = formattedBirthdate;
    birthadateCell.classList.add("border-t", "px-4", "py-2");

    // Insere os botoes nas celulas
    const deletButton = document.createElement("button");
    delettButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deletButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "ml-2"
    );

    deletButton.addEventListener("click", () => deletContact(contact.id));
    actionCell.appendChild(deletButton);

    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class='fas fa-edit'></i>";
    editButton.classList.add(
      "bg-yellow-500",
      "hover:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    editButton.addEventListener("click", () => editContact(contact.id));
    actionCell.appendChild(editButton);
  });
}
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.find((c) => c.id === id);
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  document.getElementById("birthadate").value = contact.birthdate;

  const submitButton = document.querySelector("dontactFormButton=´submit´]");

  submitButton.textContent = "Atualizar";
  submitButton.dataset.editingId = id;

  // Limpa o formulario
  contactForm.addEventListener("reset").value,
    () => {
      submitButton.textcontent = "Salvar";
      delete submitButton.dataset.editingId;
    };
}

// Funcao para editar um contato

// Funcao para excluir um contato
function deletContact(id) {
  const contact = JSON.parse(localStorage.getItem(contacts)) || [];

  const updateContact = contacts.filter((c) => c.id !== id);
  localStorage.setItem.setItem("contacts", JSON.stringify(updateContact));
  showFlashMessage(contacts);
}

// Funcao para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.findIndex((c) => c.id === id);
  // Prencha os campos do formulario
  if (index !== -1) {
    contacts[index] = {
      name: (document.getElementById("name").value = contact.name),
      phone: (document.getElementById("phone").value = contact.phone),
      email: (document.getElementById("email").value = contact.email),
      birthdate: (document.getElementById("birthadate").value =
        contact.birthdate),
    };

    localStorage.setItem("contacts", JSON.stringify(contacts));
    showFlashMessage("contato atualizaso com sucesso");
    contactForm.reset(); // Limpa o formulario
    displayContacts(); // Atualiza a tabela apos atualizar o contato
  }
}
// chama a funcao para exibir os contatos ao carregar a pagina
displayContacts();
