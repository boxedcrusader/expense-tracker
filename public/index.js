const API_BASE = "https://expense-tracker-production-f1d6.up.railway.app";
let token = localStorage.getItem("token") || null;

document.getElementById("signupModal").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Signup:", data);
    alert(data.message || data.error);

    if (res.ok) {
      if (data.token) {
        token = data.token;
        localStorage.setItem("token", token);
      }

      document.getElementById("signupModal").classList.add("hidden");
      loadExpenses();
    }

    loadExpenses();
  } catch (err) {
    alert("Could not connect to server");
  }
});

document.getElementById("loginModal").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("login:", data);
    alert(data.message || data.error);

    if (res.ok) {
      if (data.token) {
        token = data.token;
        localStorage.setItem("token", token);
      }

      document.getElementById("loginModal").classList.add("hidden");
      loadExpenses();
    }
  } catch (err) {
    alert("Could not connect to server");
  }
});

async function loadExpenses() {
  if (!checkToken()) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to load expenses: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error loading expenses:", err);
    alert("Failed to load expenses");
  }

}

function checkToken() {
  if (!token) {
    console.log("No authentication token found");
    return false;
  }
  return true;
}
