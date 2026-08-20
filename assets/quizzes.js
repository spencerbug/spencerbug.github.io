(function () {
  "use strict";

  const quizBank = {
    "/courses/nic-firmware/01-nic-as-a-system/": [
      {
        id: "nic1-q1",
        prompt: "Why does a NIC use DMA for packet data?",
        correct: "b",
        options: {
          a: ["To translate Ethernet frames into IP packets", "That is protocol processing, not the core purpose of DMA."],
          b: ["To read or write host memory without the CPU copying every packet byte", "DMA lets the device move packet data directly between the NIC and host memory."],
          c: ["To negotiate Ethernet link speed with the PHY", "Link negotiation belongs to the physical/link side, not DMA."],
          d: ["To decide which application owns each socket", "Socket ownership is an operating-system concern, not a DMA function."]
        }
      },
      {
        id: "nic1-q2",
        prompt: "What is the main purpose of an RX descriptor?",
        correct: "c",
        options: {
          a: ["It stores the complete Ethernet frame inside the descriptor ring", "Packet bytes usually live in separate host buffers; descriptors describe those buffers."],
          b: ["It contains the PHY's electrical signaling state", "PHY signaling state is unrelated to the host-side receive descriptor."],
          c: ["It describes a host buffer and metadata the NIC can use for receive work", "An RX descriptor commonly provides a DMA buffer address plus control or status metadata."],
          d: ["It tells the network switch which route to use", "Routing decisions are not the job of an RX descriptor."]
        }
      },
      {
        id: "nic1-q3",
        prompt: "Which direction does packet-data DMA normally move during transmit?",
        correct: "a",
        options: {
          a: ["The NIC reads packet bytes from host memory", "For TX, software prepares packet buffers and the NIC normally DMA-reads them before transmission."],
          b: ["The NIC writes received bytes into host memory", "That describes the usual RX data direction, not TX."],
          c: ["The CPU copies the packet from the NIC into RAM", "The goal of DMA is specifically to avoid a CPU byte-by-byte copy between device and RAM."],
          d: ["The PHY writes packet bytes directly into application memory", "The PHY handles the physical link and does not directly manage application buffers."]
        }
      },
      {
        id: "nic1-q4",
        prompt: "What is the clearest distinction between a NIC control path and data path?",
        correct: "d",
        options: {
          a: ["Control path is RX; data path is TX", "Both RX and TX are primarily data-path activities."],
          b: ["Control path is hardware; data path is software", "Both paths can involve hardware, firmware, and software."],
          c: ["Control path uses PCIe; data path never uses PCIe", "The data path commonly uses PCIe for DMA."],
          d: ["Control path configures or manages the device; data path performs repeated packet work", "Queue setup, reset, and policy are control-path examples, while descriptor, DMA, and completion work belongs to the packet data path."]
        }
      }
    ],

    "/courses/nic-firmware/02-ethernet-wire-to-mac/": [
      {
        id: "nic2-q1",
        prompt: "Which statement best captures the PHY/MAC boundary?",
        correct: "a",
        options: {
          a: ["The PHY recovers the physical link; the MAC recognizes Ethernet frames", "This is the useful boundary for the course: physical representation below, Ethernet framing above."],
          b: ["The PHY handles TCP; the MAC handles IP", "TCP and IP are higher-layer protocols and do not define the PHY/MAC boundary."],
          c: ["The PHY allocates RX buffers; the MAC performs DMA", "Host buffers and DMA belong deeper in the NIC/host path."],
          d: ["The PHY chooses CPU cores; the MAC handles virtual memory", "Those are unrelated responsibilities."]
        }
      },
      {
        id: "nic2-q2",
        prompt: "For the untagged Ethernet II frame model in this lesson, how large are the destination and source MAC address fields?",
        correct: "c",
        options: {
          a: ["4 bytes each", "Ethernet MAC addresses are longer than 32 bits."],
          b: ["8 bytes each", "Ethernet MAC addresses are not 64-bit fields in this frame format."],
          c: ["6 bytes each", "Each Ethernet MAC address is 48 bits, which is 6 bytes."],
          d: ["16 bytes each", "That size is not the Ethernet MAC-address field length."]
        }
      },
      {
        id: "nic2-q3",
        prompt: "What does the Ethernet Frame Check Sequence primarily detect?",
        correct: "b",
        options: {
          a: ["Whether the destination IP address is routable", "Routing validity is not what the Ethernet FCS checks."],
          b: ["Corruption of the Ethernet frame", "The 4-byte FCS carries a CRC used to detect frame corruption."],
          c: ["Whether the PHY negotiated the fastest possible link", "Autonegotiation and FCS solve different problems."],
          d: ["Whether the application read the payload", "Application behavior occurs much later than the Ethernet FCS check."]
        }
      },
      {
        id: "nic2-q4",
        prompt: "In this course, what should you assume when a diagram labels a block 'packet parser'?",
        correct: "d",
        options: {
          a: ["Every NIC must contain one standardized hardware block with that exact name", "The lesson explicitly avoids treating this as a universal standardized module."],
          b: ["It is another name for the Ethernet MAC", "The MAC and higher-layer header inspection are different functional boundaries."],
          c: ["It is software that always runs on the host CPU", "A NIC may implement header inspection in fixed-function or programmable device logic."],
          d: ["It is a functional description of deeper NIC logic whose implementation varies", "Different NICs may use hardwired logic, programmable pipelines, microcode, classifiers, or combinations of these."]
        }
      }
    ],

    "/courses/performance-cache/01-tracing-a-load-request/": [
      {
        id: "perf1-q1",
        prompt: "What does a TLB cache?",
        correct: "c",
        options: {
          a: ["Recently used instruction bytes", "Instruction caches handle instruction data; the TLB caches translations."],
          b: ["Recently used DRAM rows", "The TLB is not a DRAM-row cache."],
          c: ["Virtual-page to physical-frame translations", "The TLB is the fast-path cache for address translation."],
          d: ["Only page-fault error codes", "Page faults are architectural events; they are not what the TLB stores."]
        }
      },
      {
        id: "perf1-q2",
        prompt: "A load misses in the TLB, but the page-table entry is valid and resident. What normally happens next?",
        correct: "a",
        options: {
          a: ["Hardware walks the page tables, fills translation state, and continues", "A TLB miss alone does not require a page fault when the mapping is valid."],
          b: ["The kernel must terminate the process", "A valid mapping does not justify terminating the process."],
          c: ["The CPU skips translation and directly reads DRAM", "The virtual address still needs a valid translation."],
          d: ["The L1 cache is flushed", "A translation miss does not imply flushing the data cache."]
        }
      },
      {
        id: "perf1-q3",
        prompt: "Which event is fundamentally different from an ordinary CPU cache miss?",
        correct: "d",
        options: {
          a: ["An L1 miss that hits in L2", "That stays entirely within the hardware cache hierarchy."],
          b: ["An LLC miss that fetches the line from DRAM", "A valid mapped load can go to DRAM without kernel intervention."],
          c: ["A compulsory miss on a cache line", "That is still a cache-residency event."],
          d: ["A page fault that requires operating-system intervention", "Page faults concern mapping, residency, or protection and cross into the operating system."]
        }
      },
      {
        id: "perf1-q4",
        prompt: "Why is randomized dependent pointer chasing useful in memory-latency experiments?",
        correct: "b",
        options: {
          a: ["It guarantees every access is an L1 hit", "Randomized dependent accesses are often used specifically to expose slower levels of the hierarchy."],
          b: ["Each load reveals the next address, limiting prefetching and memory-level parallelism", "The dependency chain makes it harder for the CPU to overlap or predict future loads."],
          c: ["It eliminates virtual-address translation", "Pointer chasing still uses virtual addresses and translation."],
          d: ["It forces a page fault for every node", "The benchmark does not require pages to fault."]
        }
      }
    ],

    "/courses/performance-cache/02-virtual-memory/": [
      {
        id: "perf2-q1",
        prompt: "What do page tables authoritatively define?",
        correct: "a",
        options: {
          a: ["Mappings from virtual pages to physical frames plus access metadata", "Page tables are the backing mapping structure behind the TLB fast path."],
          b: ["Which cache line should be evicted next", "Cache replacement is a cache-policy problem, not a page-table function."],
          c: ["Which Ethernet queue receives a packet", "That belongs to NIC receive processing."],
          d: ["Which CPU instruction executes next", "Instruction sequencing is unrelated to page-table mappings."]
        }
      },
      {
        id: "perf2-q2",
        prompt: "Why does the page offset remain unchanged during ordinary page translation?",
        correct: "d",
        options: {
          a: ["Because the TLB ignores the lower half of memory", "The reason is about page-relative position, not ignoring memory."],
          b: ["Because physical memory has no byte offsets", "Physical addresses still identify byte positions."],
          c: ["Because the kernel rewrites the offset after every load", "Ordinary hardware translation does not require that kernel action."],
          d: ["Translation changes which frame contains the page, not the byte position within that page", "The virtual page number is translated; the offset identifies the same position inside the selected physical frame."]
        }
      },
      {
        id: "perf2-q3",
        prompt: "Why can fork() avoid copying an entire process address space immediately?",
        correct: "b",
        options: {
          a: ["The child executes without virtual memory", "The child still has a virtual address space."],
          b: ["Parent and child can initially share pages read-only using copy-on-write", "A private copy is created only when a write requires one."],
          c: ["The TLB permanently shares all entries between processes", "TLB state is not the mechanism that provides copy-on-write semantics."],
          d: ["The CPU stores both processes inside one cache line", "Cache-line placement has nothing to do with fork's memory-sharing mechanism."]
        }
      },
      {
        id: "perf2-q4",
        prompt: "What is TLB reach?",
        correct: "c",
        options: {
          a: ["The maximum distance between two CPU cores", "TLB reach is about address coverage, not physical core spacing."],
          b: ["The number of cache lines an L1 cache can hold", "That describes cache capacity, not translation coverage."],
          c: ["The amount of virtual memory covered by the TLB's active translations", "More entries or larger pages can increase the amount of address space covered without a TLB miss."],
          d: ["The time required to service a major page fault", "Fault latency is separate from TLB coverage."]
        }
      }
    ],

    "/courses/performance-cache/03-cache-structure/": [
      {
        id: "perf3-q1",
        prompt: "What does the set index portion of a cache address do?",
        correct: "c",
        options: {
          a: ["Selects the byte inside the cache line", "The line offset selects the byte within a line."],
          b: ["Identifies the process's page-table root", "The page-table root belongs to virtual-memory translation, not cache indexing."],
          c: ["Selects which cache set must be searched", "The set index narrows the lookup to one set and its candidate ways."],
          d: ["Determines the Ethernet frame length", "Cache indexing is unrelated to Ethernet framing."]
        }
      },
      {
        id: "perf3-q2",
        prompt: "How can a working set smaller than the total cache still experience many misses?",
        correct: "b",
        options: {
          a: ["A small working set always bypasses the cache", "Small data is not automatically bypassed."],
          b: ["Too many hot lines can map to the same set and exceed its associativity", "Conflict pressure can cause repeated eviction even when total byte capacity seems sufficient."],
          c: ["The cache can only hold one process at a time", "Caches are not partitioned that way by default."],
          d: ["Every load invalidates the previous load", "Ordinary loads do not behave that way."]
        }
      },
      {
        id: "perf3-q3",
        prompt: "What is the tag used for in a set-associative cache lookup?",
        correct: "a",
        options: {
          a: ["To identify which memory block occupies a candidate way in the selected set", "After the set is selected, tags distinguish the lines that could occupy its ways."],
          b: ["To choose the page-table level", "Page-table indexing and cache tags are different mechanisms."],
          c: ["To choose which CPU executes the instruction", "CPU scheduling is unrelated to cache tags."],
          d: ["To determine whether the packet FCS is valid", "Ethernet FCS checking is unrelated to CPU cache lookup."]
        }
      },
      {
        id: "perf3-q4",
        prompt: "Why can a sequential scan make DRAM access look cheaper than a dependent random walk?",
        correct: "d",
        options: {
          a: ["Sequential scans disable the cache hierarchy", "They usually benefit from caches and prefetchers rather than disabling them."],
          b: ["Random walks always trigger page faults", "A randomized access pattern can operate entirely on resident pages."],
          c: ["Sequential scans use physical addresses directly", "Normal programs still issue virtual addresses."],
          d: ["Hardware prefetchers and overlapping memory requests can hide some latency", "Regular access patterns are easier to predict and overlap than dependent randomized pointer chains."]
        }
      }
    ],

    "/courses/performance-cache/04-coherence-ordering/": [
      {
        id: "perf4-q1",
        prompt: "What is false sharing?",
        correct: "b",
        options: {
          a: ["Two threads reading the exact same immutable variable", "Shared reads can often coexist without writable-line ownership moving between cores."],
          b: ["Threads modify different variables that occupy the same cache line, causing coherence contention", "Coherence operates at cache-line granularity, so logically independent variables can still contend."],
          c: ["A process maps the same file twice", "That is a virtual-memory mapping scenario, not the definition of false sharing."],
          d: ["Two NIC queues receive packets from the same flow", "That is unrelated to cache-line false sharing."]
        }
      },
      {
        id: "perf4-q2",
        prompt: "What generally must happen before a core can modify a cache line that another core currently shares?",
        correct: "c",
        options: {
          a: ["The operating system must page the line out", "Cache coherence handles writable ownership without paging the memory out."],
          b: ["The line must be converted into a virtual address", "The memory already has an address mapping; coherence is about cached copies."],
          c: ["The writing core must obtain suitable writable/exclusive ownership and other conflicting copies must be invalidated or updated", "This ownership transition is the basis of cache-line ping-pong."],
          d: ["The program must call a system call for every store", "Ordinary coherent stores do not require a system call."]
        }
      },
      {
        id: "perf4-q3",
        prompt: "Why can relaxed atomics be appropriate for an independent statistics counter?",
        correct: "a",
        options: {
          a: ["They preserve atomicity of the counter without imposing stronger ordering on unrelated memory", "That is useful when the counter does not publish or synchronize other state."],
          b: ["They make the counter non-atomic but faster", "Relaxed atomic operations remain atomic."],
          c: ["They flush every cache line after each increment", "Relaxed ordering does not mean flushing caches."],
          d: ["They guarantee all threads observe every operation in strict source order", "Relaxed ordering explicitly does not request the strongest global ordering."]
        }
      },
      {
        id: "perf4-q4",
        prompt: "How is cache coherence different from memory ordering?",
        correct: "d",
        options: {
          a: ["Coherence is for reads; ordering is only for writes", "Both concepts involve interactions among reads and writes."],
          b: ["Coherence is a compiler feature; ordering is a NIC feature", "Both are central CPU/concurrency concepts, though drivers and devices also care about ordering."],
          c: ["They are two names for exactly the same guarantee", "The lesson explicitly separates them."],
          d: ["Coherence keeps copies of an individual location logically consistent; ordering constrains observable relationships among operations across locations", "A system can keep a line coherent while still permitting reorderings across different memory operations."]
        }
      }
    ],

    "/courses/openbmc/01-server-firmware-as-a-system/": [
      {
        id: "bmc1-q1",
        prompt: "Why is it useful for a BMC to run from standby power?",
        correct: "a",
        options: {
          a: ["It can manage, observe, power, or recover the host even when the main host is off or unhealthy", "BMC independence is what enables out-of-band platform management."],
          b: ["It lets the BMC execute every host application before the CPU starts", "The BMC does not normally execute host applications."],
          c: ["It removes the need for host firmware", "The host still needs its own platform firmware and boot process."],
          d: ["It makes Ethernet frames bypass the NIC", "Standby BMC power is unrelated to bypassing NIC packet processing."]
        }
      },
      {
        id: "bmc1-q2",
        prompt: "Where does UEFI primarily execute in the server model introduced here?",
        correct: "c",
        options: {
          a: ["Inside the network switch", "UEFI is host platform firmware, not switch firmware."],
          b: ["On the BMC's management CPU", "OpenBMC runs on the management processor; UEFI belongs to the host firmware world."],
          c: ["On the host CPU or CPUs", "The host executes its own platform firmware during boot."],
          d: ["Inside the DRAM modules", "DRAM stores data but does not execute the host's UEFI firmware."]
        }
      },
      {
        id: "bmc1-q3",
        prompt: "Which statement best describes the relationship between OpenBMC and the host?",
        correct: "d",
        options: {
          a: ["OpenBMC is just one daemon inside the host operating system", "OpenBMC is an embedded Linux system running on the BMC, not merely one host daemon."],
          b: ["The BMC executes UEFI on behalf of the host", "The BMC may control host power/reset, but the host executes its own UEFI firmware."],
          c: ["OpenBMC only works after the host OS has fully booted", "A major purpose of the BMC is to remain useful before, during, and after host boot failures."],
          d: ["OpenBMC runs on a separate management computer that observes and controls the host through explicit interfaces", "That separation is the central whole-machine model for the course."]
        }
      },
      {
        id: "bmc1-q4",
        prompt: "Why should IPMI, PLDM, MCTP, and KCS not initially be treated as four equivalent protocols at the same layer?",
        correct: "b",
        options: {
          a: ["Only one of them can ever be used in a server", "Servers may support multiple management mechanisms."],
          b: ["They can represent different layers, such as management semantics, message transport, or host/BMC interface", "The lesson introduces them as parts of layered communication stacks rather than interchangeable names."],
          c: ["Three are Ethernet frame fields and one is a CPU instruction", "That does not describe these management technologies."],
          d: ["They are all different names for UEFI boot phases", "They are management communication mechanisms, not UEFI phase names."]
        }
      }
    ]
  };

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
    } catch (_) {
      // The quiz still works for this page session when storage is unavailable.
    }
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
      const checked = selected === value ? " checked" : "";
      return `
        <label class="course-quiz-option" data-option="${escapeHtml(value)}">
          <input type="radio" name="${escapeHtml(question.id)}" value="${escapeHtml(value)}"${checked}>
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
    <div class="course-quiz-questions">
      ${questions.map(renderQuestion).join("")}
    </div>
  `;

  const reviewPanel = article.querySelector(".annotation-review");
  if (reviewPanel) {
    article.insertBefore(section, reviewPanel);
  } else {
    article.appendChild(section);
  }

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
      option.classList.add("selected");
      option.classList.add(selected === question.correct ? "correct" : "incorrect");
    });

    if (!selected || !question.options[selected]) {
      feedback.textContent = "";
      feedback.className = "course-quiz-feedback";
      return;
    }

    const isCorrect = selected === question.correct;
    const explanation = question.options[selected][1];
    feedback.textContent = (isCorrect ? "Yes. " : "Not quite. ") + explanation + (isCorrect ? "" : " Try another choice if you want.");
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
