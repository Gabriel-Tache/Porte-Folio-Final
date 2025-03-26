
  document.getElementById("estimationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const produit = document.getElementById("produit").value;
    const modele = document.getElementById("modele").value;
    const capacite = document.getElementById("capacite").value;
    const etat = document.getElementById("etat").value;

    const formData = {
      produit: produit,
      modele: modele,
      capacite: capacite,
      etat: etat
    };

    try {
      const response = await fetch("https://api-estimation.onrender.com/estimate", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Erreur API");

      const data = await response.json();
      document.getElementById("estimationResult").textContent =
        `💸 Estimation : environ ${data.estimate} €`;

    } catch (err) {
      console.error(err);
      document.getElementById("estimationResult").textContent =
        "❌ Une erreur est survenue.";
    }
  });

  const produitSelect = document.getElementById("produit");
  const modeleSelect = document.getElementById("modele");
  const capaciteSelect = document.getElementById("capacite");

  const modelesParProduit = {
    iphone: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"],
    ipad: ["iPad Air", "iPad Pro", "iPad Mini"],
    macbook: ["MacBook Air M1", "MacBook Pro M1", "MacBook Pro M2"],
    imac: ["iMac 21.5\"", "iMac 24\"", "iMac 27\""],
    watch: ["Watch Series 5", "Series 6", "SE", "Ultra"],
    airpods: ["AirPods 2", "AirPods 3", "AirPods Pro"]
  };

  const capacitesParProduit = {
    iphone: ["64", "128", "256", "512", "1000"],
    ipad: ["64", "128", "256", "512"],
    macbook: ["256", "512", "1000", "2000"],
    imac: ["512", "1000", "2000"],
    watch: ["32", "64"],
    airpods: ["Standard"]
  };

  produitSelect.addEventListener("change", () => {
    const produit = produitSelect.value;

    // Remplir les modèles
    modeleSelect.innerHTML = '<option value="">-- Choisir --</option>';
    if (modelesParProduit[produit]) {
      modelesParProduit[produit].forEach(mod => {
        const option = document.createElement("option");
        option.value = mod;
        option.textContent = mod;
        modeleSelect.appendChild(option);
      });
    }

    // Remplir les capacités
    capaciteSelect.innerHTML = '<option value="">-- Choisir --</option>';
    if (capacitesParProduit[produit]) {
      capacitesParProduit[produit].forEach(cap => {
        const option = document.createElement("option");
        option.value = cap;
        option.textContent = cap === "Standard" ? cap : cap + " Go";
        capaciteSelect.appendChild(option);
      });
    }
  });



