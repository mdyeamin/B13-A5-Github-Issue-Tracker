const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const fetchIssues = async () => {
  const response =await fetch(url);
  const data = await response.json();

};
// fetchIssues()