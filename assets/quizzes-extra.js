(function () {
  "use strict";

  const quizBank = {
    "/courses/nic-firmware/03-pcie-for-nic-engineers/": [
      {
        id: "nic3-q1",
        prompt: "Which statement best distinguishes MMIO from DMA in the model used in this lesson?",
        correct: "c",
        options: {
          a: ["MMIO carries received packets while DMA only configures the NIC", "That reverses the roles. MMIO is normally used for device-register access, while DMA moves data between the device and host memory."],
          b: ["MMIO uses Ethernet and DMA uses PCIe", "Both MMIO and NIC DMA can travel through PCIe; Ethernet is on the network-facing side of the NIC."],
          c: ["MMIO is usually a CPU-initiated access to NIC registers; DMA is usually a NIC-initiated access to host memory", "That is the central distinction of this lesson, even though both kinds of transaction travel through PCIe."],
          d: ["MMIO and DMA are two names for the same PCIe operation", "They have different initiators, targets, and purposes even though PCIe transports both."]
        }
      },
      {
        id: "nic3-q2",
        prompt: "What is the main purpose of a NIC's PCIe BAR in this lesson?",
        correct: "a",
        options: {
          a: ["To expose an address range through which the host can access device resources such as registers", "A memory BAR commonly maps NIC registers or other device resources into the host's address space for MMIO."],
          b: ["To store every packet buffer allocated by the driver", "Packet buffers normally live in host RAM and are accessed through DMA, not inside the BAR itself."],
          c: ["To contain the Ethernet destination MAC address of every received frame", "Ethernet frame fields are packet data, not the purpose of a PCIe BAR."],
          d: ["To choose the PCIe link width during autonegotiation", "Link negotiation and BAR resource mapping are separate PCIe mechanisms."]
        }
      },
      {
        id: "nic3-q3",
        prompt: "Why does a DMA-capable NIC normally need PCI bus mastering enabled?",
        correct: "d",
        options: {
          a: ["So the NIC can become the PCIe Root Complex", "The NIC remains an endpoint; bus mastering does not make it the root of the hierarchy."],
          b: ["So the CPU can read the NIC's Vendor ID", "Configuration-space discovery can occur without treating the NIC as a DMA bus master."],
          c: ["So the PHY can validate Ethernet FCS values", "Ethernet frame validation is unrelated to PCI bus mastering."],
          d: ["So the NIC can initiate PCIe memory transactions toward host memory", "Bus-master capability allows the endpoint to initiate transactions such as the Memory Reads and Writes used by DMA."]
        }
      },
      {
        id: "nic3-q4",
        prompt: "For the simplified PCIe transaction model in this lesson, what happens after an ordinary Memory Read request?",
        correct: "b",
        options: {
          a: ["Nothing is returned because all PCIe operations are posted", "Ordinary Memory Reads are not posted in that sense; the requester needs the requested data returned."],
          b: ["The requested data returns in a PCIe completion", "A Memory Read request requires completion traffic carrying the requested data back to the requester."],
          c: ["The NIC must reset its PCIe link before the data can return", "Normal read completion does not require a link reset."],
          d: ["The operating system must generate an Ethernet acknowledgment", "PCIe transaction completion is unrelated to Ethernet acknowledgments."]
        }
      }
    ]
  };

  if (document.querySelector(".course-quiz")) return;

  const questions = quizBank[window.location.pathname];
  if (!questions || questions.length === 0) return;

  const article = document.querySelector(".post-content");
  if (!article) return;

  const storageKey = "course-quiz-responses:v1:" + window.location.pathname;
  let state = loadState();

  function loadState() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return { responses: {}, attempts: [] };
      const parsed = JSON.parse(raw);
      return {
        responses: parsed && parsed.responses && typeof parsed.responses === "object" ? parsed.responses : {},
        attempts: parsed && Array.isArray(parsed.attempts) ? parsed.attempts : []
      };
    } catch (_) {
      return { responses: {}, attempts: [] };
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderQuestion(question, index) {
    const selected = state.responses[question.id] || "";
    const options = Object.entries(question.options).map(function (entry) {
      const value = entry[0];
      const label = entry[1][0];
      return `
        <label class="course-quiz-option" data-option="${escapeHtml(value)}">
          <input type="radio" name="${escapeHtml(question.id)}" value="${escapeHtml(value)}"${selected === value ? " checked" : ""}>
          <span>${escapeHtml(label)}</span>
        </label>
      `;
    }).join("");

    return `
      <fieldset class="course-quiz-question" data-question-id="${escapeHtml(question.id)}">
        <legend><span class="course-quiz-number">${index + 1}.</span> ${escapeHtml(question.prompt)}</legend>
        <div class="course-quiz-options">${options}</div>
        <div class="course-quiz-feedback" aria-live="polite"></div>
      </fieldset>
    `;
  }

  const section = document.createElement("section");
  section.className = "course-quiz";
  section.innerHTML = `
    <div class="course-quiz-header">
      <div>
        <h2>Check your understanding</h2>
        <p>No grade or score. Choose an answer to get immediate feedback, then change it if you want to try again.</p>
      </div>
      <button type="button" class="course-quiz-reset">Reset answers</button>
    </div>
    <div class="course-quiz-questions">${questions.map(renderQuestion).join("")}</div>
  `;

  const reviewPanel = article.querySelector(".annotation-review");
  if (reviewPanel) article.insertBefore(section, reviewPanel);
  else article.appendChild(section);

  function updateQuestion(questionId) {
    const question = questions.find(function (item) { return item.id === questionId; });
    const fieldset = section.querySelector(`[data-question-id="${questionId}"]`);
    if (!question || !fieldset) return;

    const selected = state.responses[questionId] || "";
    const feedback = fieldset.querySelector(".course-quiz-feedback");

    fieldset.querySelectorAll(".course-quiz-option").forEach(function (option) {
      option.classList.remove("selected", "correct", "incorrect");
      const input = option.querySelector("input");
      if (!input || input.value !== selected) return;
      option.classList.add("selected", selected === question.correct ? "correct" : "incorrect");
    });

    if (!selected || !question.options[selected]) {
      feedback.textContent = "";
      feedback.className = "course-quiz-feedback";
      return;
    }

    const isCorrect = selected === question.correct;
    feedback.textContent = (isCorrect ? "Yes. " : "Not quite. ") + question.options[selected][1] + (isCorrect ? "" : " Try another choice if you want.");
    feedback.className = "course-quiz-feedback " + (isCorrect ? "correct" : "incorrect");
  }

  questions.forEach(function (question) { updateQuestion(question.id); });

  section.addEventListener("change", function (event) {
    const input = event.target.closest('input[type="radio"]');
    if (!input) return;
    const fieldset = input.closest("[data-question-id]");
    if (!fieldset) return;

    const questionId = fieldset.dataset.questionId;
    const question = questions.find(function (item) { return item.id === questionId; });
    if (!question) return;

    state.responses[questionId] = input.value;
    state.attempts.push({
      questionId: questionId,
      selected: input.value,
      correct: input.value === question.correct,
      at: new Date().toISOString()
    });
    saveState();
    updateQuestion(questionId);
  });

  section.querySelector(".course-quiz-reset").addEventListener("click", function () {
    if (!window.confirm("Clear your saved answers for this lesson quiz?")) return;
    state = { responses: {}, attempts: [] };
    try { window.localStorage.removeItem(storageKey); } catch (_) {}
    section.querySelectorAll('input[type="radio"]').forEach(function (input) { input.checked = false; });
    questions.forEach(function (question) { updateQuestion(question.id); });
  });
})();
