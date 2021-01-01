var Screen
var Database
const Log = console.log

var MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL
const IdentifierQuestionArrayPosition = 0
var Questions = [
  "What's your roblox username",
  "What's your discord name and tag?",
  "Why do you want to be a head tester?",
  "What are your skills and weaknesses?",
  "How active are you willing to be?",
  'Do you have any past expereince if so list them.',
  'Are you good at giving feedback truthfully and honestly?',
  'How good can you spot bugs in games?',
  'Why should we pick you over other applicants?'
]


var Page1 = {
  Elements: [],
  Add: (ThingToAdd) => {
    Page1.Elements.push(ThingToAdd)
  }
}


var Elements =  {
  Input:[], // idk if javascript can store pointers as keys
  QuestionText: []
}

function setup() {
  Database = firebase.database()

  Screen = {
      Size: {x: windowWidth, y: windowHeight}
  }

  createCanvas(Screen.Size.x,Screen.Size.y);

  var MY_HEADING = createElement('h1', 'Tester Application')
  MY_HEADING.position(Screen.Size.x/2-  50, 20)
  MY_HEADING.style('background-color: red')

  
  Page1.Add(MY_HEADING)

  const LAST_SURVEY_QUESTION_Y_POSITION = BUILD_SURVEY(120, 75)

  var MY_SUBMIT = createButton('Submit')
  MY_SUBMIT.size(100,40)
  MY_SUBMIT.style('font-size: 20px')

  Page1.Add(MY_SUBMIT)

  MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL =createElement('h1', 'Do not leave any questions empty')
  MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL.position(Screen.Size.x/2 - 50, LAST_SURVEY_QUESTION_Y_POSITION - 20)
  MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL.hide()


  MY_SUBMIT.mouseClicked(() =>{

    var QuestionToAnswer = GetQuestionToAnswer()
    var Discord_Tag = QuestionToAnswer[IdentifierQuestionArrayPosition]


    for (x in QuestionToAnswer)
    {
      if (QuestionToAnswer[x] == '')
      {
        MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL.show()

        setTimeout(() =>{
          MY_FILL_OUT_ALL_QUESTIONS_WARNING_LABEL.hide()
        }, 2000)

        return
      }
    }

    for (x = 0; x < Page1.Elements.length; x++) {
      Page1.Elements[x].hide()
    }

    Database.ref('TesterApplication/' + Discord_Tag.trim()).set(QuestionToAnswer)

      Log(QuestionToAnswer)

    var MY_HEADING = createElement('h1', 'Submitted! I will reiview your app soonly!')
    MY_HEADING.position(Screen.Size.x/2 - 250, 20)
    MY_HEADING.style('background-color: red') 
    
    var MY_GIF = createImg("https://media.giphy.com/media/ios8qmkqJvLYA/giphy.gif", 'CELEBRATE!!!')
    MY_GIF.position(Screen.Size.x/2 - 250, 100)

  })

  MY_SUBMIT.position(
    Screen.Size.x/2,
    LAST_SURVEY_QUESTION_Y_POSITION + 40
  )

}

function draw() {


  background(255,255,255); 
  drawSprites();
}

function BUILD_SURVEY(YCORD_START, GAP)
{
  var CURRENT_Y_CORD = YCORD_START

  for (x = 0; x < Questions.length; x++) {
    var MyQuestion = createElement('h3', Questions[x])
    MyQuestion.position(Screen.Size.x/2-  560,CURRENT_Y_CORD)

    var MyInput = createInput('')
    MyInput.position(Screen.Size.x/2-  100,CURRENT_Y_CORD)
    MyInput.size(350, 40)

    Elements.Input.push(MyInput)
    Elements.QuestionText.push(MyQuestion)

    Page1.Add(MyInput)
    Page1.Add(MyQuestion)

    CURRENT_Y_CORD += GAP
  }

  return CURRENT_Y_CORD
}


function GetQuestionToAnswer()
{
  var s = {}

  for (x = 0; x < Elements.QuestionText.length; x++)
    {
      s[x] = Elements.Input[x].value()
    }

  return s
}