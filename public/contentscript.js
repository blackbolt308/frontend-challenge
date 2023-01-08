console.log('Contentscript injected');
// let parentElement = document.querySelector(
  //  'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
 //);

const parentElement = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2)';
const topNode = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section';
const h1Node = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > h1';
// TODO --> Get the BTB Values from the DOMManipulationView.
// BTB ELEMENTS --> "Budget-to-beat" and "351 €"
const btbTextTag = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p.makeStyles-question-24';
const btbCostClassTag = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p.makeStyles-btb-27';
const paragraphNode = 'div#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3)';

// Getting the value of the Budget to Beat using Query Selecter.
// Query selected based on Class Name => 'makeStyles-btb-27'

const btbText =  document.querySelector(btbTextTag).innerHTML;
const btbCost = document.querySelector(btbCostClassTag).innerHTML;

var b2bTextAndCost = `${btbText}: ${btbCost}`;

// TODO --> Create a Div which goes to the mainDiv. It hold img, BTB elements
const newButton = document.createElement('button');
newButton.style.width = '18%';
newButton.style.height = '50px';
newButton.style.float = 'right';
newButton.style.marginRight = '20%';
newButton.style.backgroundColor = 'darkBlue';
newButton.style.borderRadius = '5px';

// TODO --> Hover Effect
// Button Event when Mouse hovered over Button. Change color to Blue.
newButton.addEventListener('mouseover', function() {
  newButton.style.backgroundColor = "blue"
})

// Button Event when Mouse has left Button area. Change back to Dark Blue.
newButton.addEventListener('mouseleave', function() {
  newButton.style.backgroundColor = "darkBlue"
})

// Button Event when Button click is performed. It triggers Get Request function.
newButton.addEventListener('click', async function() {
  getDescriptionFromGithubRepo();
})

// TODO --> Create Div for Img 

const containerDiv = document.createElement('div');
containerDiv.style.display = 'grid';
containerDiv.style.gridTemplateColumns = '1fr 4fr';
containerDiv.style.paddingTop = '5%'
containerDiv.style.justifyItems = 'center'

const imgDiv = document.createElement('div');
//imgDiv.style.paddingTop = '10%';
//imgDiv.style.marginLeft = '10%'

var img = document.createElement('img');
img.src = './images/favicon-32x32.png';
img.style.width = '20px'
img.style.height = '20px'
imgDiv.append(img);


// TODO --> Create Div for BTB Text
const textDiv = document.createElement('div');
textDiv.style.fontSize = 'small';
textDiv.style.color = 'white';
textDiv.style.fontWeight = 'bold'
textDiv.innerText = b2bTextAndCost;


containerDiv.append(imgDiv);
containerDiv.append(textDiv);


newButton.append(containerDiv);

/**  FUNCTION to POST REQUEST
 * Function to get the Description of the first three repositories from Github.
 */

 async function getDescriptionFromGithubRepo () {
  let url = 'https://api.github.com/search/repositories?q=Climate-Change';
  let paragraphText = ""
  let maxLookIndex = 2;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let valueArr = Object.values(data)[2];
    for (let i = 0; i <= maxLookIndex; i++) {
      var description = valueArr[i]['description']; 
      if (i != 0) {
        paragraphText += ", " + description; 
      } else {
        paragraphText += description;
      }
    }
    
    // Get the Node Where new Heading and New Paragraph should be added.
    const paragraphNodeQuery = document.querySelector(paragraphNode);
    
    // Look for Heading with name. If not found, create a new Heading.
    if (!document.querySelector('.new-heading')) {
      let newHeading = document.createElement('h2');
      newHeading.className = "new-heading";
      newHeading.innerText = "New Paragraph";
      newHeading.style.fontWeight = 'bold';
  
      paragraphNodeQuery.append(newHeading);
    } 
    
    // Look out for new-paragraph class, if not found, create a new paragraph.
    // If found, just update the inner text with new Information.
    if (!document.querySelector('.new-paragraph')) {
      const newParagraph = document.createElement('p');
      newParagraph.className = "new-paragraph";
      newParagraph.innerText = paragraphText;
      paragraphNodeQuery.append(newParagraph);
    } else {
      document.querySelector('.new-paragraph').innerText = paragraphText;
    }

  })
  .catch(error => console.error(error));
}
/** End of File */

// TESTING Query PART
const element = document.querySelector(topNode).prepend(newButton);
console.log(document.querySelector(h1Node).innerHTML);

