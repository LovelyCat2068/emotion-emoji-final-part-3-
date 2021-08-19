prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width : 300,
    height : 300,
    image_format : 'jpeg',
    jpeg_quality : 91
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot(){
    Webcam.snap(function (Screen){
        document.getElementById("result").innerHTML = '<img id="Img" src="'+Screen+'"/>';
    });}

console.log("Ml5.version",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wfDJTgmBk/model.json', ModelLoaded);

function ModelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.SpeechSynthesis;
    first_line = "You can be" + prediction_1;
    second_line = "Or you can be" + prediction_2;
    all_lines = new SpeechSynthesisUtterance(first_line + second_line);
    synth.speak(all_lines);
}

function check(){
    image_holder = document.getElementById("Img");
    classifier.classify(image_holder, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("name").innerHTML = results[0].label;
        document.getElementById("name-2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == 'Happy'){
            document.getElementById("emoji").innerHTML = '&#128512';
        }
        
        if(results[0].label == 'Cheerful'){
            document.getElementById("emoji").innerHTML = '&#128522';
        }
        if(results[0].label == 'Cry'){
            document.getElementById("emoji").innerHTML = '&#128546';
        }
        
        if(results[0].label == 'Sad'){
            document.getElementById("emoji").innerHTML = '&#128532';
        }
        if(results[0].label == 'Angry'){
            document.getElementById("emoji").innerHTML = '&#128545';
        }


        if(results[1].label == 'Happy'){
            document.getElementById("emoji-2").innerHTML = '&#128512';
        }
        
        if(results[1].label == 'Cheerful'){
            document.getElementById("emoji-2").innerHTML = '&#128522';
        }
        if(results[1].label == 'Cry'){
            document.getElementById("emoji-2").innerHTML = '&#128546';
        }
        
        if(results[1].label == 'Sad'){
            document.getElementById("emoji-2").innerHTML = '&#128532';
        }
        if(results[1].label == 'Angry'){
            document.getElementById("emoji-2").innerHTML = '&#128545';
        }
    }   
}