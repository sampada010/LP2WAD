const API = "http://localhost:3001";

async function fetchSongs() {
  const res = await fetch(`${API}/songs`);
  const data = await res.json();
  document.getElementById("songCount").textContent = `Total Songs: ${data.count}`;
  const tbody = document.getElementById("songList");
  tbody.innerHTML = "";
  data.songs.forEach(song => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td>
      <td>${song.singer}</td><td>${song.actor || ""}</td><td>${song.actress || ""}</td>
      <td><button onclick="deleteSong('${song._id}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("songForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  await fetch(`${API}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  form.reset();
  fetchSongs();
});

async function deleteSong(id) {
  await fetch(`${API}/songs/${id}`, { method: "DELETE" });
  fetchSongs();
}

async function initData() {
  await fetch(`${API}/init`);
  fetchSongs();
}

async function filterByDirector() {
  const director = document.getElementById("musicDirector").value;
  const res = await fetch(`${API}/songs/director/${director}`);
  const data = await res.json();
  displayFiltered(data);
}

async function filterByDirectorAndSinger() {
  const d = document.getElementById("filterMusicDirector").value;
  const s = document.getElementById("filterSinger").value;
  const res = await fetch(`${API}/songs/director/${d}/singer/${s}`);
  const data = await res.json();
  displayFiltered(data);
}

async function filterBySingerAndFilm() {
  const s = document.getElementById("singerFilter").value;
  const f = document.getElementById("filmFilter").value;
  const res = await fetch(`${API}/songs/singer/${s}/film/${f}`);
  const data = await res.json();
  displayFiltered(data);
}

function displayFiltered(songs) {
  const tbody = document.getElementById("songList");
  tbody.innerHTML = "";
  songs.forEach(song => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td>
      <td>${song.singer}</td><td>${song.actor || ""}</td><td>${song.actress || ""}</td>
      <td><button onclick="deleteSong('${song._id}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function updateSong() {
  const name = document.getElementById("songNameUpdate").value;
  const actor = document.getElementById("newActor").value;
  const actress = document.getElementById("newActress").value;
  await fetch(`${API}/songs/updateByName/${name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actor, actress })
  });
  fetchSongs();
}

fetchSongs();
