async function sendMessage() {
  const input = document.getElementById("prompt");
  const chatbox = document.getElementById("chatbox");
  const prompt = input.value.trim();

  if (!prompt) return;

  // Show user's message
  chatbox.innerHTML += `<div class="message user">𐌖: ${prompt}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;

  // Clear input
  input.value = "";

  // Fetch GPT response
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    chatbox.innerHTML += `<div class="message ai">𐌆: ${data.reply}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

  } catch (err) {
    chatbox.innerHTML += `<div class="message error">[BOUNDGPT ERROR...]</div>`;
  }
}
