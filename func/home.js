const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const issueContainer = document.getElementById("issue-container");
const issueLength = document.getElementById("issueLength");

let allIssues = [];
const getLabelConfig = (label) => {
  const lowerLabel = label.toLowerCase();

  if (lowerLabel === "bug") {
    return {
      wrapperClass: "bg-red-50 border border-red-200",
      textClass: "text-red-500",
      icon: `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    };
  }

  if (lowerLabel === "help wanted") {
    return {
      wrapperClass: "bg-orange-50 border border-orange-200",
      textClass: "text-orange-400",
      icon: `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-orange-400" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2" />
          <path stroke-width="2" d="M8 12h8m-4-4v8" />
        </svg>
      `,
    };
  }

  if (lowerLabel === "enhancement") {
    return {
      wrapperClass: "bg-green-50 border border-green-200",
      textClass: "text-green-500",
      icon: `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3l1.912 5.813H20l-4.956 3.57L16.912 18 12 14.5 7.088 18l1.868-5.617L4 8.813h6.088L12 3z" />
        </svg>
      `,
    };
  }

  return {
    wrapperClass: "bg-gray-50 border border-gray-200",
    textClass: "text-gray-500",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M7 7h10M7 12h10M7 17h6" />
      </svg>
    `,
  };
};
const fetchIssues = async () => {
  const response = await fetch(url);
  const data = await response.json();
  allIssues = data.data;
  showAllIssues(allIssues);
};

// show all issues on the ui
const showAllIssues = (issues) => {
  issueContainer.innerHTML = "";
  issueLength.innerText = issues.length;

  issues.forEach((issue) => {
    const labels = issue.labels;

    const labelHtml = labels
      .map((el) => {
        const { wrapperClass, textClass, icon } = getLabelConfig(el);

        return `
      <div class="flex items-center gap-1 ${wrapperClass} px-2 py-1 rounded-full">
        ${icon}
        <span class="${textClass} text-[9px] tracking-wide uppercase">${el}</span>
      </div>
    `;
      })
      .join("");

    const createDiv = document.createElement("div");
    createDiv.addEventListener("click", () => {
      // showIssueModal(issue.id);
    });
    const priorityColor =
      issue.priority.toLowerCase() === "high"
        ? "#EF4444"
        : issue.priority.toLowerCase() === "medium"
          ? "#F59E0B"
          : issue.priority.toLowerCase() === "low"
            ? "#9CA3AF"
            : "";
    const priorityBgColor =
      issue.priority.toLowerCase() === "high"
        ? "#EF444410"
        : issue.priority.toLowerCase() === "medium"
          ? "#F59E0B10"
          : issue.priority.toLowerCase() === "low"
            ? "#9CA3AF10"
            : "";

    const statusColor =
      issue.status.toLowerCase() === "open" ? "#00A96E" : "#A855F7";

    const badgeIconAndColor =
      issue.status.toLowerCase() === "open"
        ? {
            icon: `
            <div class="w-7 h-7 flex items-center justify-center text-green-500 bg-green-100 rounded-full">
            <i class="fa-regular fa-circle-dot"></i>
            </i></div>
        `,
          }
        : {
            icon: `
          <div class="w-7 h-7 flex items-center justify-center text-purple-500 bg-purple-100 rounded-full">
            <i class="fa-regular fa-circle-check"></i></div>
        `,
          };

    issue.status.toLowerCase() === "open" ? "#00A96E" : "#A855F7";
    createDiv.innerHTML = `
            <div onclick="loadModalDetail(${issue.id})" class="cursor-pointer bg-white rounded-xl h-full shadow-sm border border-gray-100 overflow-hidden relative">

                
                <div style="background-color:${statusColor}" class="h-1.5 w-full"></div>

               
                <div class="p-6">
                   
                    <div class="flex justify-between items-center mb-4">
                       
                        ${badgeIconAndColor.icon}
                   
                        <span style="color: ${priorityColor}; background-color: ${priorityBgColor}; border-radius: 20px" class= px-6 py-1.5 rounded-full text-sm font-bold tracking-wider">
                            ${issue.priority}
                        </span>
                    </div>

                   
                    <h2 class="text-[#2c3e50] text-xl font-bold leading-tight mb-3">
                        ${issue.title}
                    </h2>

                    
                    <p class="text-slate-400 text-base mb-6">
                        ${issue.description}
                    </p>

                    
                    <div class="flex gap-3">
                        
                       ${labelHtml}
                    </div>
                </div>

              
                <div class="border-t border-gray-100"></div>

             
                <div class="p-6 flex items-start justify-between pt-4 pb-8 space-y-2">
                    <div class="text-slate-500 text-sm flex gap-2">
                       
                        <span>#${issue.id} ${issue.author ? "by" : ""} ${issue.author ? issue.author : "N/A"}</span>
                    </div>
                    <div class="text-slate-500 text-sm">
                        ${new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div class="p-6 flex items-start justify-between pt-4 pb-8 space-y-2">
                    <div class="text-slate-500 text-sm flex gap-2">
                       
                        <span>assignee: ${issue.assignee ? issue.assignee : "N/A"}</span>
                    </div>
                    <div class="text-slate-500 text-sm">
                       Updated: ${new Date(issue.updatedAt).toLocaleDateString()}
                    </div>
                </div>

            </div>
        
        `;
    issueContainer.append(createDiv);
  });
};

// get specific issue by id

const loadModalDetail = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  showModalDetail(data.data);
};

const showModalDetail = (obj) => {
  console.log(obj);
  const modalContainer = document.getElementById("modal-container");
  // const createModalDiv = document.createElement("div");
  modalContainer.innerHTML = `
             <h1 class="text-3xl font-bold text-[#1a1f36] mb-4">Fix broken image uploads</h1>

                <div class="flex flex-wrap items-center gap-3 mb-6 text-slate-500 font-medium">
                    <span
                        class="bg-[#00a96e] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">Opened</span>
                    <span class="text-slate-300 hidden sm:block">•</span>
                    <span>Opened by Fahim Ahmed</span>
                    <span class="text-slate-300 hidden sm:block">•</span>
                    <span>22/02/2026</span>
                </div>

                <div class="flex gap-3 mb-8">
                    <div
                        class="flex items-center gap-1.5 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="font-bold text-[11px] uppercase tracking-wider">Bug</span>
                    </div>
                    <div
                        class="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full text-orange-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8m-4-4v8" />
                        </svg>
                        <span class="font-bold text-[11px] uppercase tracking-wider">Help Wanted</span>
                    </div>
                </div>

                <p class="text-slate-500 text-lg leading-relaxed mb-10 max-w-[95%]">
                    The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive
                    behavior.
                </p>

                <div
                    class="bg-[#f8faff] rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border border-slate-50">
                    <div>
                        <p class="text-slate-400 text-lg mb-1 font-medium">Assignee:</p>
                        <p class="text-[#1a1f36] text-xl font-bold">Fahim Ahmed</p>
                    </div>
                    <div class="sm:text-right">
                        <p class="text-slate-400 text-lg mb-2 font-medium">Priority:</p>
                        <span
                            class="bg-[#f05252] text-white px-8 py-1.5 rounded-full text-sm font-bold shadow-md">HIGH</span>
                    </div>
                </div>

                <div class="modal-action mt-0">
                    <form method="dialog">
                        <button
                            class="btn bg-[#6610f2] hover:bg-[#520dc2] text-white border-none normal-case px-10 rounded-xl text-lg font-bold h-14 shadow-lg transition-transform active:scale-95">
                            Close
                        </button>
                    </form>
                </div>
  `;
  document.getElementById("card_modal").showModal();
};

// for change color  buttons
const setActiveButton = (activeBtn) => {
  const buttons = [allBtn, openBtn, closedBtn];

  buttons.forEach((btn) => {
    btn.classList.remove("bg-blue-700", "text-white");
    btn.classList.add("bg-white", "text-slate-500");
  });

  activeBtn.classList.remove("bg-white", "text-slate-500");
  activeBtn.classList.add("bg-blue-700", "text-white");
};

allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);
  showAllIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  setActiveButton(openBtn);
  const openIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "open",
  );

  showAllIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActiveButton(closedBtn);
  const closedIssue = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "closed",
  );
  showAllIssues(closedIssue);
});
setActiveButton(allBtn);
fetchIssues();
