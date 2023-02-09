type ApiResponse = { isValid: boolean };

const form = document.querySelector("form");
const input = document.querySelector("input");
const validityStatus = document.getElementById("validity-status");

function updateValidityStatus(status: boolean | null) {
  let message: string;
  if (status === true) {
    message = "Valid!";
  } else if (status === false) {
    message = "Invalid!";
  } else {
    message = "";
  }
  validityStatus.innerHTML = message;
}

const validity: { status: boolean | null } = new Proxy(
  { status: null },
  {
    set(target, p, newValue) {
      if (target.status == newValue) return false;
      target.status = newValue;
      updateValidityStatus(newValue);
      return true;
    },
  }
);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const word = formData.get("word") as string;
  if (word.length === 0) return;
  validity.status = await getWordValidity(word);
});

input.addEventListener("keydown", () => {
  validity.status = null;
});

async function getWordValidity(word: string): Promise<boolean> {
  const response = await fetch(
    "/api?" + new URLSearchParams({ word: word.toLowerCase() })
  );
  const data: ApiResponse = await response.json();
  return data.isValid;
}
