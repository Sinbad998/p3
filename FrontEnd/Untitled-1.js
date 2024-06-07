

async function getProjectsByArchitect(architectId) {
    const url = `http://localhost:5678/api/projects?architectId=${architectId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  // Exemple d'utilisation
  const architectId = 123;
  getProjectsByArchitect(architectId)
    .then(projects => {
      console.log(projects);
    })
    .catch(error => {
      console.error(error);
    });