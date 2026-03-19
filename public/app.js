import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js"
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-remote-config.js"

const firebaseConfig = {
  apiKey: "AIzaSyCQP8BFh-BOrOzg-5IuvK0IITqBUc4bOUc",
  authDomain: "node-56864.firebaseapp.com",
  projectId: "node-56864",
  storageBucket: "node-56864.firebasestorage.app",
  messagingSenderId: "421481354662",
  appId: "1:421481354662:web:6e2f4e8021effa4b11eb67",
  measurementId: "G-GPHP0MYJY4"
}

const app = initializeApp(firebaseConfig)
const remoteConfig = getRemoteConfig(app)

remoteConfig.settings.minimumFetchIntervalMillis = 1

remoteConfig.defaultConfig = {
  show_projects_button: true,
  show_resources_button: true,
  show_positions_button: true,
  show_allocations_button: true,
  welcome_message: "Welcome",
  projects_button_label: "Projects",
  positions_button_label: "Positions",
  resources_button_label: "Resources",
  allocations_button_label: "Allocations"
}

const output = document.getElementById("output")
const projectsBtn = document.getElementById("projectsBtn")
const resourcesBtn = document.getElementById("resourcesBtn")
const positionsBtn = document.getElementById("positionsBtn")
const allocationsBtn = document.getElementById("allocationsBtn")

const loadData = async (endpoint) => {
  const response = await fetch(endpoint)
  const data = await response.json()
  output.textContent = JSON.stringify(data, null, 2)
}

projectsBtn.addEventListener("click", async () => {
  await loadData("/projects")
})

resourcesBtn.addEventListener("click", async () => {
  await loadData("/resources")
})

positionsBtn.addEventListener("click", async () => {
  await loadData("/positions")
})

allocationsBtn.addEventListener("click", async () => {
  await loadData("/allocations")
})

const initRemoteConfig = async () => {
  try {
    await fetchAndActivate(remoteConfig)

    const showProjects = getValue(
      remoteConfig,
      "show_projects_button"
    ).asBoolean()
    const showResources = getValue(
      remoteConfig,
      "show_resources_button"
    ).asBoolean()
    const showPositions = getValue(
      remoteConfig,
      "show_positions_button"
    ).asBoolean()
    const showAllocations = getValue(
      remoteConfig,
      "show_allocations_button"
    ).asBoolean()
    const welcomeMessage = getValue(remoteConfig, "welcome_message").asString()
    const projectsLabel = getValue(
      remoteConfig,
      "projects_button_label"
    ).asString()
    const positionLabel = getValue(
      remoteConfig,
      "positions_button_label"
    ).asString()
    const resourcesLabel = getValue(
      remoteConfig,
      "resources_button_label"
    ).asString()
    const allocationsLabel = getValue(
      remoteConfig,
      "allocations_button_label"
    ).asString()

    projectsBtn.style.display = showProjects ? "inline-block" : "none"
    resourcesBtn.style.display = showResources ? "inline-block" : "none"
    positionsBtn.style.display = showPositions ? "inline-block" : "none"
    allocationsBtn.style.display = showAllocations ? "inline-block" : "none"

    projectsBtn.textContent = projectsLabel
    positionsBtn.textContent = positionLabel
    resourcesBtn.textContent = resourcesLabel
    allocationsBtn.textContent = allocationsLabel

    output.textContent = welcomeMessage
  } catch (error) {
    output.textContent = `Remote Config error: ${error.message}`
  }
}

initRemoteConfig()
