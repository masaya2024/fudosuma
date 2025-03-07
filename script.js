(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const sendLoadingFlag = document.getElementById("sendLodingFlag");
    if (sendLoadingFlag) {
      sendLoadingFlag.style.visibility = "hidden";
    }

    const currentHref = window.location.href;

    const setupSendButton = (btnId) => {
      const sendBtn = document.getElementById(btnId);
      if (sendBtn) {
        sendBtn.addEventListener("click", (event) => {
          event.preventDefault();
          validateForm();
        });
      }
    };

    if (currentHref.includes("contact")) {
      setupSendButton("contact_send");
    } else {
      setupSendButton("send");
    }

    setupRealTimeValidation("contact_last_name", "error_last_name");
    setupRealTimeValidation("contact_first_name", "error_first_name");
    setupRealTimeValidation("contact_email", "error_email");
    setupRealTimeValidation("contact_message", "error_message");
  });

  function validateForm() {
    let isValid = true;
    const lastName = document.getElementById("contact_last_name");
    const firstName = document.getElementById("contact_first_name");
    const email = document.getElementById("contact_email");
    const message = document.getElementById("contact_message");
    const errorLastName = document.getElementById("error_last_name");
    const errorFirstName = document.getElementById("error_first_name");
    const errorEmail = document.getElementById("error_email");
    const errorMessage = document.getElementById("error_message");

    resetValidation(
      [lastName, firstName, email, message],
      [errorLastName, errorFirstName, errorEmail, errorMessage]
    );

    if (lastName.value.trim() === "") {
      showError(lastName, errorLastName);
      isValid = false;
    }

    if (firstName.value.trim() === "") {
      showError(firstName, errorFirstName);
      isValid = false;
    }

    if (email.value.trim() === "") {
      showError(email, errorEmail, "メールアドレスを入力してください");
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, errorEmail, "有効なメールアドレスを入力してください");
      isValid = false;
    }

    if (message.value.trim() === "") {
      showError(message, errorMessage, "お問い合わせ内容を入力してください");
      isValid = false;
    }

    if (isValid) {
      sendPost(
        lastName.value.trim(),
        firstName.value.trim(),
        email.value.trim(),
        message.value.trim()
      );
    }
  }

  function setupRealTimeValidation(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) {
      input.addEventListener("input", () => {
        error.style.display = "none";
        input.classList.remove("input-error");
      });
    }
  }

  function showError(
    input,
    errorElement,
    message = "この項目を入力してください"
  ) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("input-error");
  }

  function resetValidation(inputs, errors) {
    inputs.forEach((input) => input.classList.remove("input-error"));
    errors.forEach((error) => (error.style.display = "none"));
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async function sendPost(lastName, firstName, email, message) {
    try {
      const sendLoadingFlag = document.getElementById("sendLodingFlag");
      if (sendLoadingFlag) {
        sendLoadingFlag.style.visibility = "visible";
      }

      const fields = {
        last_name: lastName,
        first_name: firstName,
        email: email,
        message: message,
      };

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://info.uk-corp.co.jp/l/957632/2025-02-26/75zgl";

      for (const fieldName in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = fieldName;
        input.value = fields[fieldName];
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        window.location.href = "https://fudosma.com/contact/thanks/";
      }, 1000);

      if (sendLoadingFlag) {
        sendLoadingFlag.style.visibility = "hidden";
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  }
})();
