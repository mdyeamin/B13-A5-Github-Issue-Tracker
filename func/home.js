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
      wrapperClass: "bg-red-50 border text-sm border-red-200",
      textClass: "text-red-500",
      icon: `
      <i class="fa-solid fa-bug text-red-500 w-4 h-4"></i>
        
      `,
    };
  }

  if (lowerLabel === "help wanted") {
    return {
      wrapperClass: "bg-orange-50 border text-sm border-orange-200",
      textClass: "text-orange-400",
      icon: `
      <i class="fa-solid fa-life-ring text-orange-400 w-4 h-4"></i>
      `,
    };
  }

  if (lowerLabel === "enhancement") {
    return {
      wrapperClass: "bg-green-50 border text-sm border-green-200",
      textClass: "text-green-500",
      icon: `
      <i class="fa-solid fa-bahai w-4 h-4 text-green-500"></i>
       
      `,
    };
  }
  if (lowerLabel === "good first issue") {
    return {
      wrapperClass: "bg-blue-50 border text-sm border-green-200",
      textClass: "text-blue-500",
      icon: `
      <i class="fa-regular fa-star w-4 h-4 text-blue-500"></i>
       
      `,
    };
  }

  return {
    wrapperClass: "bg-gray-50 border text-sm border-gray-200",
    textClass: "text-gray-500",
    icon: `
    <i class="fa-solid fa-bars-staggered w-4 h-4 text-gray-500"></i>
      
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
        <span class="${textClass} text-[10px] tracking-wide uppercase">${el}</span>
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

  const response = await fetch(url);
  const data = await response.json();
  showModalDetail(data.data);
};

const showModalDetail = (obj) => {
  const labels = obj.labels;
  const labelHtml = labels
    .map((el) => {
      const { wrapperClass, textClass, icon } = getLabelConfig(el);

      return `
      <div class="flex items-center gap-1 ${wrapperClass} px-2 py-1 rounded-full">
        ${icon}
        <span class="${textClass} text-[10px] tracking-wide uppercase">${el}</span>
      </div>
    `;
    })
    .join("");

  const priorityColor =
    obj.priority.toLowerCase() === "high"
      ? "#EF4444"
      : obj.priority.toLowerCase() === "medium"
        ? "#F59E0B"
        : obj.priority.toLowerCase() === "low"
          ? "#9CA3AF"
          : "";
  const priorityBgColor =
    obj.priority.toLowerCase() === "high"
      ? "#EF444410"
      : obj.priority.toLowerCase() === "medium"
        ? "#F59E0B10"
        : obj.priority.toLowerCase() === "low"
          ? "#9CA3AF10"
          : "";
  const statusColor =
    obj.status.toLowerCase() === "open" ? "#00A96E" : "#A855F7";


  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
             
    <!-- Title -->
    <h2 class="text-xl font-bold text-[#1a1f36] mb-2">${obj.title}</h2>

    <!-- Status & Date -->
    <div class="flex items-center gap-2 mb-4 text-xs font-medium text-slate-500">
        <span style="background-color:${statusColor}" class=" text-white px-2.5 py-0.5 rounded-full">${obj.status.toLowerCase() === "open" ? "Opened": "Closed"}</span>
        <span>•</span>
        <span >${obj.status.toLowerCase() === "open" ? "Opened": "Closed"}</span>
        <span>By ${obj.author ? obj.author : "N/A"}</span>
        <span>•</span>
        <span>${new Date(obj.createdAt).toLocaleDateString()}</span>
    </div>

    <!-- Tags -->
    <div class="flex gap-3">
                        
                       ${labelHtml}
                    </div>

    <!-- Description -->
    <p class="text-slate-500 text-sm leading-snug mb-6">
${obj.description}
    </p>

    <!-- Info Box (Smaller) -->
    <div class="bg-[#f8faff] rounded-xl p-4 flex justify-between items-center mb-6 border border-slate-50">
        <div>
            <p class="text-slate-400 text-xs font-medium">Assignee:</p>
            <p class="text-[#1a1f36] text-sm font-bold">${obj.assignee ? obj.assignee : "N/A"}</p>
        </div>
        <div class="text-right">
            <p class="text-slate-400 text-xs font-medium mb-1">Priority</p>
            <span style="color: ${priorityColor}; background-color: ${priorityBgColor}; border-radius: 20px"  class="text-white px-4 py-0.5 rounded-full text-[14px] font-semibold">${obj.priority}</span>
        </div>
    </div>

    <!-- Close Button (Smaller) -->
    <div class="modal-action mt-0">
        <form method="dialog">
            <button class="btn btn-sm bg-[#6610f2] hover:bg-[#520dc2] text-white border-none normal-case px-6 rounded-lg font-bold">
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
