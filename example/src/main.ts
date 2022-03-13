import TabsIntercom from 'tabs-intercom'
import './style.css'

const documentTitle = 'Tabs Intercom Example'
document.title = documentTitle

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>${documentTitle}</h1>
  <p class="warn"> You must have local storage access enabled to make Tabs Intercom working.</p>
  <p>To experience cross-tab function call, please follow these steps:</p>
  <ol>
    <li>open the same page in at least 2 tabs / windows</li>
    <li>fill up your name</li>
    <li>click one of the buttons to get a one of following results:</li>
    <ul>
      <li><b>Greet</b> - to see updated message in all tabs immediately</li>
      <li><b>Greet with delay</b> - to see updated in all tabs after 3 seconds</li>
    </ul>
  </ol>
  
  <div class="example">
    <label class="label" for="greeting-name">Name:</label>
    <input id="greeting-name" type="text" placeholder="e.g. John">
    <button type="button" class="button" id="greet-button">Greet</button>
    <button type="button" class="button" id="greet-delayed-button">Greet with delay</button>
    <div id="message" class="message"></div>
  </div>
`

const greetingNameElement = app.querySelector<HTMLInputElement>('#greeting-name')!

const greetButton = app.querySelector<HTMLButtonElement>('#greet-button')!
const greetDelayedButton = app.querySelector<HTMLButtonElement>('#greet-delayed-button')!

const greetingMessageElement = app.querySelector<HTMLDivElement>('#message')!

function getName() {
  return greetingNameElement.value || 'Mr. Nobody'
}

function greet(name: string) {
  greetingMessageElement.innerText = `Hello, ${name}!`
}

function greetDelayed(name: string) {
  setTimeout(() => {
    greet(name)
  }, 3000)
}

const tabsIntercom = new TabsIntercom()
const greetEverywhere = tabsIntercom.register(greet)
const greetEverywhereDelayed = tabsIntercom.register(greetDelayed)

greetButton.addEventListener('click', () => greetEverywhere(getName()))
greetDelayedButton.addEventListener('click', () => greetEverywhereDelayed(getName()))
