import { useState, useEffect } from "react";

export default function Home() {
  const steps = [
    "Create the shell",
    "Make it installable",
    "Make it offline",
    "Test the boundary",
    "Deploy it"
  ];

  const [done, setDone] = useState<number[]>(() => {
    const saved = localStorage.getItem("lab_done");
    return saved ? JSON.parse(saved) : [0, 1, 2, 3, 4];
  });

  useEffect(() => {
    localStorage.setItem("lab_done", JSON.stringify(done));
  }, [done]);

  const progress = Math.round((done.length / steps.length) * 100);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "What makes a PWA?",
      body: "A manifest, a service worker, and a reliable user experience."
    }
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function addNote(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setNotes([{ id: Date.now(), title, body }, ...notes]);
    setTitle("");
    setBody("");
  }

  return (
    <div className="shell">
      <header>
        <strong>Offline Notes Lab</strong>
        <span>Online</span>
      </header>
      
      <aside>
        <p>WORKSHOP MAP</p>
        {steps.map((step, index) => (
          <button 
            key={step} 
            onClick={() => setDone(done.includes(index) ? done.filter((x) => x !== index) : [...done, index])}
          >
            {done.includes(index) ? "✓ " : `${index + 1}. `}{step}
          </button>
        ))}
        <small>{progress}% complete</small>
      </aside>

      <main>
        {/* Student Identification Banner */}
        <div style={{ marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid #e0dbd1" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#555", letterSpacing: "0.06em" }}>
            AJANAKU JOHNSON ADAVIRUKU • MECHATRONICS ENGINEERING • 2024/1/100697ET
          </span>
        </div>

        <p className="eyebrow">FOUNDATION TRACK</p>
        <h1>Keep learning when the network leaves.</h1>
        <p className="lede">Save a note, refresh the page, then test the same experience with the network turned off.</p>

        <section className="columns">
          <div>
            <h2>Notes from the lab</h2>
            {notes.map((note) => (
              <article key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <small>Today</small>
              </article>
            ))}
          </div>

          <div>
            <form onSubmit={addNote}>
              <h2>Write a note</h2>
              <label>
                Title
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Lab insight..." 
                />
              </label>
              <label>
                Observation
                <textarea 
                  value={body} 
                  onChange={(e) => setBody(e.target.value)} 
                  placeholder="What did you observe..." 
                  rows={4}
                />
              </label>
              <button type="submit">Save locally</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}