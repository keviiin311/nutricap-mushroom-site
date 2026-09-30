"use strict";
const $ = (s, r = document) => r.querySelector(s);
const grads = ["#f3e3c3,#d9b98a", "#e6efd9,#a9c99a", "#f6e8d8,#d8a878", "#e3ecdf,#8fb59a", "#f1e0cf,#c99a72", "#efe6c8,#cbb168"];
const bg = i => `background:linear-gradient(135deg,${grads[i % grads.length]})`;

/* ---------- Data ---------- */
const MUSH = [
  ["🍄", "Oyster Mushroom", "Fresh, nutritious and perfect for everyday cooking.", "Protein • Fibre • B-vitamins"],
  ["🍄", "Button Mushroom", "A versatile mushroom for curries, pizzas, pasta and snacks.", "Low calorie • Potassium • Fibre"],
  ["🍄", "Milky Mushroom", "Delicious texture with a naturally rich flavor.", "Protein • Minerals • Fibre"],
  ["🍄", "Other Varieties", "Seasonal and speciality varieties — ask us what is fresh today.", "Customizable • Seasonal"]
];
// [name, emoji, desc, prep, cook, difficulty, rating, tags, ingredients "qty|unit|name", steps]
const RECIPES = [
  ["Garlic Butter Mushroom", "🧄", "Golden mushrooms tossed in garlic butter and herbs.", 5, 10, "Easy", 4.8, "quick easy vegetarian popular", ["250|g|button mushrooms", "2|tbsp|butter", "4|cloves|garlic, minced", "1|tsp|black pepper", "1|tbsp|chopped parsley"], ["Clean and halve the mushrooms.", "Melt butter and sauté garlic for 30 seconds.", "Add mushrooms and cook on high heat until golden.", "Season, add parsley and serve hot."]],
  ["Mushroom Masala", "🍛", "Spiced onion-tomato gravy with tender mushrooms.", 15, 25, "Medium", 4.7, "vegetarian popular", ["300|g|mushrooms", "2|nos|onions, chopped", "2|nos|tomatoes, puréed", "2|tsp|garam masala", "2|tbsp|oil"], ["Heat oil and brown the onions.", "Add tomato purée and spices; cook till oil separates.", "Add mushrooms and a little water.", "Simmer 10 minutes and garnish with coriander."]],
  ["Chilli Mushroom", "🌶️", "Crispy Indo-Chinese style mushrooms in a spicy sauce.", 15, 15, "Medium", 4.6, "quick vegetarian popular", ["250|g|mushrooms", "2|tbsp|corn flour", "1|nos|capsicum, cubed", "2|tbsp|soy sauce", "1|tbsp|chilli sauce"], ["Coat mushrooms in corn flour and fry until crisp.", "Stir-fry capsicum on high heat.", "Add sauces and a splash of water.", "Toss in the mushrooms and serve immediately."]],
  ["Mushroom Fried Rice", "🍚", "Wok-tossed rice with mushrooms and fresh vegetables.", 10, 12, "Easy", 4.5, "quick easy vegetarian", ["2|cups|cooked rice", "150|g|mushrooms, sliced", "1|cup|mixed vegetables", "2|tbsp|soy sauce", "1|tbsp|oil"], ["Heat oil in a wok on high.", "Stir-fry mushrooms and vegetables for 4 minutes.", "Add rice and soy sauce.", "Toss well for 3 minutes and serve."]],
  ["Creamy Mushroom Pasta", "🍝", "Silky cream sauce with sautéed mushrooms and garlic.", 10, 20, "Easy", 4.8, "easy vegetarian popular", ["200|g|pasta", "200|g|mushrooms, sliced", "1|cup|cream", "3|cloves|garlic", "1|tsp|mixed herbs"], ["Boil the pasta until al dente.", "Sauté garlic and mushrooms until browned.", "Pour in cream and herbs; simmer 3 minutes.", "Toss in the pasta and serve warm."]],
  ["Mushroom Pizza", "🍕", "Cheesy pizza topped with roasted mushrooms.", 20, 15, "Medium", 4.7, "vegetarian popular", ["1|nos|pizza base", "100|g|mushrooms, sliced", "1|cup|mozzarella", "3|tbsp|pizza sauce", "1|tsp|oregano"], ["Preheat oven to 220°C.", "Spread sauce on the base.", "Top with mushrooms and cheese.", "Bake 12–15 minutes and sprinkle oregano."]],
  ["Mushroom Soup", "🥣", "Warm, comforting soup with a smooth earthy flavour.", 10, 20, "Easy", 4.6, "easy healthy vegetarian", ["250|g|mushrooms", "1|nos|onion, chopped", "2|cups|vegetable stock", "1|tbsp|butter", "1|tsp|black pepper"], ["Sauté onion in butter.", "Add mushrooms and cook until soft.", "Pour in stock and simmer 10 minutes.", "Blend smooth, season and serve."]],
  ["Mushroom Tikka", "🍢", "Marinated mushrooms grilled to smoky perfection.", 20, 15, "Medium", 4.7, "healthy vegetarian popular", ["250|g|button mushrooms", "1|cup|thick curd", "2|tsp|tikka masala", "1|tbsp|lemon juice", "1|tbsp|oil"], ["Mix curd, masala, lemon and oil.", "Marinate mushrooms for 30 minutes.", "Skewer and grill or pan-roast until charred.", "Serve with mint chutney."]],
  ["Mushroom Biryani", "🍲", "Fragrant layered rice with spiced mushrooms.", 25, 35, "Hard", 4.9, "vegetarian popular", ["1|cup|basmati rice", "250|g|mushrooms", "1|cup|curd", "2|tsp|biryani masala", "2|nos|onions, fried"], ["Marinate mushrooms with curd and masala.", "Par-boil the rice with whole spices.", "Layer mushrooms, rice and fried onions.", "Cover and cook on low heat for 20 minutes."]],
  ["Mushroom Sandwich", "🥪", "Toasty sandwich with a savoury mushroom filling.", 10, 10, "Easy", 4.4, "quick easy vegetarian", ["4|slices|bread", "150|g|mushrooms, chopped", "1|tbsp|butter", "1|nos|onion, chopped", "1|tsp|pepper"], ["Sauté onion and mushrooms until dry.", "Season with salt and pepper.", "Fill the bread slices.", "Toast until golden and crisp."]],
  ["Mushroom Stir Fry", "🥗", "Quick, light stir fry with crunchy vegetables.", 10, 8, "Easy", 4.5, "quick easy healthy vegetarian", ["250|g|mushrooms", "1|nos|capsicum", "1|nos|onion", "1|tbsp|soy sauce", "1|tsp|sesame oil"], ["Slice all vegetables evenly.", "Stir-fry on high heat for 5 minutes.", "Add soy sauce and sesame oil.", "Serve hot."]],
  ["Mushroom Curry", "🍜", "Everyday home-style curry with soft mushrooms.", 10, 25, "Easy", 4.6, "easy healthy vegetarian", ["300|g|mushrooms", "2|nos|tomatoes", "1|nos|onion", "1|tsp|turmeric", "2|tsp|curry powder"], ["Sauté onion until soft.", "Add tomatoes and spices.", "Add mushrooms and 1 cup water.", "Simmer 15 minutes and serve with roti or rice."]],
  ["Mushroom Matar Masala", "🍛", "Tender mushrooms and green peas in a spiced tomato gravy.", 10, 20, "Medium", 4.8, "healthy vegetarian popular", ["250|g|mushrooms", "1|cup|green peas", "2|nos|onions, chopped", "2|nos|tomatoes, puréed", "2|tsp|garam masala"], ["Heat oil and soften the onions.", "Add tomato purée and spices; cook until thick.", "Stir in mushrooms, peas and a splash of water.", "Cover and simmer until tender; garnish with coriander."]]
];
const recipeImages = [
  "assets/recipes/01-garlic-butter.jpeg",
  "assets/recipes/12-mushroom-masala-rich.jpeg",
  "assets/recipes/03-chilli-mushroom.jpeg",
  "https://images.unsplash.com/photo-1620582708067-9f6ba1e2fc1c?auto=format&fit=crop&w=900&q=80",
  "assets/recipes/05-creamy-pasta.jpeg",
  "assets/recipes/06-mushroom-pizza.jpeg",
  "assets/recipes/07-mushroom-soup.jpeg",
  "assets/recipes/08-mushroom-tikka.jpeg",
  "assets/recipes/09-mushroom-biryani.jpeg",
  "assets/recipes/10-mushroom-patty.jpeg",
  "assets/recipes/11-mushroom-stir-fry.jpeg",
  "assets/recipes/02-mushroom-masala.jpeg",
  "assets/recipes/04-matar-masala.jpeg"
];
const FILTERS = ["All", "Quick", "Easy", "Healthy", "Vegetarian", "Popular", "❤️ Favorites"];
const GAL = [
  ["Mushroom Farm", "🏡", "photo-1762889278403-1d1a57d9a587"], ["Fresh Mushrooms", "🍄", "photo-1629665001701-a232a0ba4eec"],
  ["Harvesting", "🧺", "photo-1770429939069-2f649afea536"], ["Packaging", "📦", "photo-1624968665982-84bac2a2821e"],
  ["Mushroom Recipes", "🍽️", "photo-1608219992759-8d74ed8d76eb"], ["Fresh Mushrooms", "🍄", "photo-1504545102780-26774c1bb073"],
  ["Harvesting", "🧑‍🌾", "photo-1770884844724-ac9e36b599e9"], ["Mushroom Farm", "🌿", "photo-1621455799534-deab8a1c1d89"],
  ["Mushroom Recipes", "🍝", "photo-1692737580563-7ba2d896f0f6"], ["Packaging", "🛍️", "photo-1620582708067-9f6ba1e2fc1c"]
].map(([title, emoji, id]) => [title, emoji, "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=900&q=80"]);

/* ---------- State ---------- */
let favs = [];
try { favs = JSON.parse(localStorage.getItem("nm_favs")) || []; } catch (e) { favs = []; }
const saveFavs = () => { try { localStorage.setItem("nm_favs", JSON.stringify(favs)); } catch (e) {} };
let filter = "All", query = "", current = null, servings = 2;

/* ---------- Mushrooms ---------- */
$("#mushGrid").innerHTML = MUSH.map((m, i) => `
  <article class="card reveal"><div class="thumb" style="${bg(i)}">${m[0]}</div>
  <div class="body"><h3>${m[1]}</h3><p>${m[2]}</p><span class="tag">${m[3]}</span>
  <a class="btn btn-sm" href="#recipes">View Recipes</a></div></article>`).join("");

/* ---------- Recipes ---------- */
function renderRecipes() {
  const list = RECIPES.map((r, i) => ({ r, i })).filter(({ r, i }) => {
    const okF = filter === "All" || (filter.includes("Fav") ? favs.includes(i) : r[7].split(" ").includes(filter.toLowerCase().replace("vegetarian", "vegetarian")));
    return okF && r[0].toLowerCase().includes(query);
  });
  $("#recipeGrid").innerHTML = list.map(({ r, i }) => `
    <article class="card"><div class="thumb" style="${bg(i)}"><span class="thumb-fallback">${r[1]}</span>
      <img class="thumb-photo" src="${recipeImages[i]}" alt="" loading="lazy" onerror="this.hidden=true">
      <button class="fav" data-fav="${i}" aria-label="Toggle favorite for ${r[0]}">${favs.includes(i) ? "❤️" : "🤍"}</button></div>
    <div class="body"><h3>${r[0]}</h3><p>${r[2]}</p>
    <div class="row"><span class="tag">⏱ ${r[3] + r[4]} min</span><span class="tag">${r[5]}</span><span class="tag">⭐ ${r[6]}</span></div>
    <button class="btn btn-sm" data-view="${i}">View Recipe</button></div></article>`).join("");
  $("#noRes").hidden = list.length > 0;
}
$("#filters").innerHTML = FILTERS.map((f, i) => `<button class="${i ? "" : "on"}">${f}</button>`).join("");
$("#filters").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#filters button").forEach(b => b.classList.remove("on"));
  e.target.classList.add("on"); filter = e.target.textContent; renderRecipes();
});
$("#search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderRecipes(); });
$("#recipeGrid").addEventListener("click", e => {
  const f = e.target.closest("[data-fav]"), v = e.target.closest("[data-view]");
  if (f) toggleFav(+f.dataset.fav);
  if (v) openRecipe(+v.dataset.view);
});
function toggleFav(i) {
  favs = favs.includes(i) ? favs.filter(x => x !== i) : [...favs, i];
  saveFavs(); renderRecipes(); if (current === i) updateFavBtn();
}
function updateFavBtn() { $("#mFav").textContent = favs.includes(current) ? "💔 Remove from Favorites" : "❤️ Add to Favorites"; }

/* ---------- Modal, servings, timer ---------- */
const modal = $("#modal");
const fmt = n => { const v = Math.round(n * 100) / 100; return Number.isInteger(v) ? v : v.toFixed(v * 10 % 1 ? 2 : 1); };
function renderIngredients() {
  const r = RECIPES[current];
  $("#sVal").textContent = servings;
  $("#mIng").innerHTML = r[8].map((s, k) => {
    const [q, u, n] = s.split("|");
    return `<li><label><input type="checkbox"><span>${fmt(q * servings / 2)} ${u} ${n}</span></label></li>`;
  }).join("");
}
function openRecipe(i) {
  current = i; servings = 2; const r = RECIPES[i];
  $("#mImg").style.cssText = bg(i); $("#mImg").textContent = r[1];
  $("#mTitle").textContent = r[0];
  $("#mMeta").textContent = `⭐ ${r[6]} • Prep ${r[3]} min • Cook ${r[4]} min • Total ${r[3] + r[4]} min • ${r[5]}`;
  $("#mSteps").innerHTML = r[9].map(s => `<li>${s}</li>`).join("");
  renderIngredients(); updateFavBtn(); resetTimer();
  modal.hidden = false; document.body.style.overflow = "hidden";
}
function closeAll() { modal.hidden = true; $("#lightbox").hidden = true; document.body.style.overflow = ""; pauseTimer(); }
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeAll));
[modal, $("#lightbox")].forEach(m => m.addEventListener("click", e => { if (e.target === m) closeAll(); }));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
$("#sMinus").onclick = () => { if (servings > 1) { servings--; renderIngredients(); } };
$("#sPlus").onclick = () => { if (servings < 20) { servings++; renderIngredients(); } };
$("#mFav").onclick = () => toggleFav(current);

let secs = 0, tick = null;
const showTime = () => { $("#tDisp").textContent = String(Math.floor(secs / 60)).padStart(2, "0") + ":" + String(secs % 60).padStart(2, "0"); };
function startTimer() {
  if (tick || secs <= 0) return;
  tick = setInterval(() => { secs--; showTime(); if (secs <= 0) { pauseTimer(); alert("⏱ Time's up! Your dish is ready."); } }, 1000);
}
function pauseTimer() { clearInterval(tick); tick = null; }
function resetTimer() { pauseTimer(); secs = current === null ? 0 : RECIPES[current][4] * 60; showTime(); }
$("#tStart").onclick = startTimer; $("#tPause").onclick = pauseTimer; $("#tReset").onclick = resetTimer;
$("#mStart").onclick = () => { $("#mSteps").scrollIntoView({ behavior: "smooth", block: "center" }); startTimer(); };

/* ---------- Gallery ---------- */
const cats = ["All", ...new Set(GAL.map(g => g[0]))];
$("#galFilters").innerHTML = cats.map((c, i) => `<button class="${i ? "" : "on"}">${c}</button>`).join("");
function renderGal(c = "All") {
  $("#galGrid").innerHTML = GAL.map((g, i) => ({ g, i })).filter(({ g }) => c === "All" || g[0] === c).map(({ g, i }) =>
    `<button class="g-item" data-g="${i}" style="${bg(i)};height:${[170, 230, 200][i % 3]}px" aria-label="Open ${g[0]}"><span class="g-fallback">${g[1]}</span><img class="gallery-photo" src="${g[2]}" alt="" loading="lazy" onerror="this.hidden=true"><span class="g-caption">${g[0]}</span></button>`).join("");
}
renderGal();
$("#galFilters").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#galFilters button").forEach(b => b.classList.remove("on"));
  e.target.classList.add("on"); renderGal(e.target.textContent);
});
$("#galGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-g]"); if (!b) return;
  const i = +b.dataset.g;
  $("#lbContent").innerHTML = `<div class="g-item gallery-lightbox" style="${bg(i)}"><span class="g-fallback">${GAL[i][1]}</span><img class="gallery-photo" src="${GAL[i][2]}" alt="${GAL[i][0]}"><span class="g-caption">${GAL[i][0]}</span></div>`;
  $("#lightbox").hidden = false; document.body.style.overflow = "hidden";
});
$("#instaGrid").innerHTML = ["🍄", "🍝", "🧺", "🍛", "🌿", "🍕"].map((e, i) => `<div style="${bg(i + 2)}">${e}</div>`).join("");

/* ---------- Forms ---------- */
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function say(el, text, ok) { el.textContent = text; el.className = "msg " + (ok ? "ok" : "err"); }
document.querySelectorAll('input[name="siteRating"]').forEach(input => input.addEventListener("change", () => {
  const rating = Number(input.value);
  document.querySelectorAll(".rating-options label").forEach((star, index) => star.classList.toggle("selected", index < rating));
}));
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const n = $("#cName").value.trim(), p = $("#cPhone").value.replace(/\D/g, ""), em = $("#cEmail").value.trim(), m = $("#cMsg").value.trim(), rating = $("input[name='siteRating']:checked")?.value, out = $("#formMsg");
  if (n.length < 2) return say(out, "Please enter your name.");
  if (p.length < 10) return say(out, "Please enter a valid 10-digit phone number.");
  if (!emailOk(em)) return say(out, "Please enter a valid email address.");
  if (m.length < 5) return say(out, "Please write a short message.");
  if (!rating) return say(out, "Please select a website rating.");
  const message = ["Fresh mushroom enquiry from the Nutricap website", "Name: " + n, "Phone: " + p, "Email: " + em, "Website rating: " + rating + "/5", "Message: " + m].join("\n");
  const waUrl = "https://wa.me/917228086685?text=" + encodeURIComponent(message);
  window.open(waUrl, "_blank", "noopener,noreferrer");
  say(out, "Your message and rating are ready to send in WhatsApp.", true); e.target.reset();
  document.querySelectorAll(".rating-options label").forEach(star => star.classList.remove("selected"));
});
$("#newsForm").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("#nEmail").value.trim(), out = $("#newsMsg");
  if (!emailOk(v)) { out.style.color = "#ffd9d6"; return say(out, "Please enter a valid email."); }
  out.style.color = "#fff"; say(out, "🎉 Subscribed! Fresh recipes are on their way.", true); e.target.reset();
});

/* ---------- UI ---------- */
const burger = $("#burger"), menu = $("#menu");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
const toTop = $("#toTop");
toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
window.addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 500), { passive: true });
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 }) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

renderRecipes();
