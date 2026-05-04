function getInitialsFromName(name) {
  return String(name || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeProject(project) {
  const owner = String(project.owner || "Project Owner").trim();
  const skills = Array.isArray(project.skills)
    ? project.skills.map((s) => String(s).trim()).filter(Boolean)
    : [];

  const normalizedMembers = Array.isArray(project.members)
    ? project.members
        .map((m) => ({
          name: String(m.name || "").trim() || owner,
          initials:
            String(m.initials || "").trim() ||
            getInitialsFromName(String(m.name || owner)),
          role: String(m.role || "Contributor").trim(),
        }))
        .filter((m) => m.name)
    : [];

  const members = normalizedMembers.length
    ? normalizedMembers
    : [{ name: owner, initials: getInitialsFromName(owner), role: "Owner" }];

  const collaboratorCount = Number.parseInt(project.collaborators, 10);

  return {
    ...project,
    owner,
    skills,
    members,
    collaborators:
      Number.isFinite(collaboratorCount) && collaboratorCount > 0
        ? collaboratorCount
        : members.length,
  };
}

let PROJECTS = [];
let LEADERBOARD = { weekly: [], monthly: [], alltime: [] };
let ADMIN_USERS = [];
let ADMIN_MENTOR_APPLICATIONS = [];

async function initializeDataFromBackend() {
  try {
    const [projectsRes, usersRes, leaderboardRes, mentorshipRes] = await Promise.all([
      apiFetch('/projects'),
      apiFetch('/users'),
      apiFetch('/gamification/leaderboard'),
      apiFetch('/mentorship/applications').catch(e => { console.warn("Mentorship API not available yet or forbidden.", e); return []; })
    ]);

    PROJECTS = (projectsRes || []).map(normalizeProject);
    ADMIN_USERS = usersRes || [];
    LEADERBOARD = leaderboardRes || { weekly: [], monthly: [], alltime: [] };
    ADMIN_MENTOR_APPLICATIONS = mentorshipRes || [];
    
    console.log("Data initialized from backend", { PROJECTS, ADMIN_USERS, LEADERBOARD, ADMIN_MENTOR_APPLICATIONS });
  } catch (err) {
    console.error("Failed to initialize data from backend:", err);
  }
}

async function addProjectToData(projectInput) {
  const owner = String(projectInput.owner || "Project Owner").trim();
  const skills = Array.isArray(projectInput.skills)
    ? projectInput.skills.map((s) => String(s).trim()).filter(Boolean)
    : [];
    
  const createDto = {
    title: String(projectInput.name || "").trim(),
    description: String(projectInput.desc || "").trim(),
    difficulty: String(projectInput.difficulty || "Medium").trim(),
    requiredSkills: skills,
    duration: String(projectInput.duration || "").trim()
  };

  try {
    const newProject = await apiFetch('/projects', {
      method: 'POST',
      body: JSON.stringify(createDto)
    });
    
    // Add to local array to reflect UI immediately
    PROJECTS.unshift(normalizeProject(newProject));
    return newProject;
  } catch (error) {
    console.error("Error creating project via API:", error);
    showToast("Error creating project", "error");
    throw error;
  }
}

function syncAdminSeedMetadataToUsers() {
  // Now sync directly via backend or do nothing as backend is truth
}
