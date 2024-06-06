status=""
object=[]
function setup() {
    canvas = createCanvas(100, 100)
    canvas.position(320, 400)
    video = createCapture(VIDEO)
    video.position(320, 400)
    coco = ml5.objectDetector("cocossd", modelLoaded)
}

function draw() {
    image(video, 0, 0, 100, 100)
    noFill()
    r=255
    g=255
    b=255
    stroke('r, g, b')
    if(status!=""){
        for(i=0; i<object.length;i++){
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            confidence=Math.floor(object[i].confidence*100)
            text(object[i].label+""+confidence+"%", object[i].x, object[i].y)
        }
    }
}

function modelLoaded() {
    console.log('coco is initialised')
    coco.detect(video, gotResults)
    status=true
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        object=results
    }
}