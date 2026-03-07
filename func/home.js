const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const issueContainer = document.getElementById("issue-container");

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

    console.log(labelHtml);

    const createDiv = document.createElement("div");
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
            topBorder: "#10B981",
            circleBg: "bg-green-100",
            circleBorder: "border-green-500",
            icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>
        `,
          }
        : {
            topBorder: "#A855F7",
            circleBg: "bg-purple-100",
            circleBorder: "border-purple-500",
            icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" stroke-width="2" />
          </svg>
        `,
          };

    issue.status.toLowerCase() === "open" ? "#00A96E" : "#A855F7";
    createDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">

                
                <div style="background-color:${statusColor}" class="h-1.5 w-full"></div>

               
                <div class="p-6">
                   
                    <div class="flex justify-between items-center mb-4">
                       
                        <div
                            class="w-10 h-10 rounded-full bg-green-100 border-2 border-dashed border-green-500 flex items-center justify-center">
                            <div class="w-5 h-5 rounded-full border-2 border-green-500"></div>
                        </div>
                   
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

             
                <div class="p-6 pt-4 pb-8 space-y-2">
                    <div class="text-slate-500 text-base flex gap-2">
                        <span class="font-medium">#1</span>
                        <span>by john_doe</span>
                    </div>
                    <div class="text-slate-500 text-base">
                        1/15/2024
                    </div>
                </div>

            </div>
        
        `;
    issueContainer.append(createDiv);
  });
};

// const showOpenIssues = (openIssues)=> {
// // console.log(openIssues);

// }

fetchIssues();
