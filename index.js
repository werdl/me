let current_line = "";

let term, default_prompt;

let last_exit_code = 0;

erase_on_next = false;

played_jingle = false;

jingle_is_playing = false;


function beep() {
    if (jingle_is_playing) {
        return;
    }
    // play specific frequency for 100ms
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    
    oscillator.frequency.setValueAtTime(523.5, ctx.currentTime);

    oscillator.connect(ctx.destination);

    oscillator.start();

    setTimeout(() => {
        oscillator.stop();
    }, 100);
}

function playCMajorTriad() {
    const ctx = new AudioContext();

    const c = ctx.createOscillator();
    c.type = "sine";
    c.frequency.setValueAtTime(261.63, ctx.currentTime);
    c.connect(ctx.destination);

    const e = ctx.createOscillator();
    e.type = "sine";
    e.frequency.setValueAtTime(329.63, ctx.currentTime);
    e.connect(ctx.destination);
    
    const g = ctx.createOscillator();
    g.type = "sine";
    g.frequency.setValueAtTime(392.00, ctx.currentTime);
    g.connect(ctx.destination);

    c.start();
    
    setTimeout(() => {
        e.start();
    }, 300);

    setTimeout(() => {
        g.start();
    }
    , 600);

    setTimeout(() => {
        c.stop();
        e.stop();
        g.stop();
    }, 2000);
}

function playCMinorTriad() {
    const ctx = new AudioContext();

    const c = ctx.createOscillator();
    c.type = "sine";
    c.frequency.setValueAtTime(261.63, ctx.currentTime);
    c.connect(ctx.destination);

    const e = ctx.createOscillator();
    e.type = "sine";
    e.frequency.setValueAtTime(311.13, ctx.currentTime);
    e.connect(ctx.destination);
    
    const g = ctx.createOscillator();
    g.type = "sine";
    g.frequency.setValueAtTime(392.00, ctx.currentTime);
    g.connect(ctx.destination);

    c.start();
    
    setTimeout(() => {
        e.start();
    }, 300);

    setTimeout(() => {
        g.start();
    }
    , 600);

    setTimeout(() => {
        c.stop();
        e.stop();
        g.stop();
    }, 2000);
}

function playOpeningJingle() {
    // Play an upbeat jingle with five notes
    const notes = ["C", "E", "G", "HIGH_C", "C"];
    for (let note of notes) {
        playSound(note, (notes.indexOf(note) * 200), notes.indexOf(note) * 150);
    }

    setTimeout(() => {
        jingle_is_playing = false;
    }, 1000);
}

function playSound(note, length=1000, start_in=0) {
    let notes = {
        "C": 261.63,
        "D": 293.66,
        "E": 329.63,
        "F": 349.23,
        "G": 392.00,
        "A": 440.00,
        "B": 493.88,
        "HIGH_C": 523.25,
    }

    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(notes[note], ctx.currentTime);
    oscillator.connect(ctx.destination);

    setTimeout(() => {
        oscillator.start();
    }, start_in);

    setTimeout(() => {
        oscillator.stop();
    }, length + start_in);
}
    

document.addEventListener("DOMContentLoaded", function () {
    term = document.getElementById("text");

    default_prompt = "<span style='color: #00ff00;'>user</span>@<span style='color: #00ffff;'>werdl</span>:<span style='color: #ff0000;'>~</span>$";

    document.querySelector("#prompt").innerHTML = `(0) ${default_prompt}`

    result = document.querySelector("#result");


    // Create a cursor element
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.textContent = "_";

    // Append the cursor element to the term div
    document.getElementById("term").appendChild(cursor);

    // Function to toggle the cursor visibility
    function toggleCursor() {
        cursor.style.visibility = cursor.style.visibility === "visible" ? "hidden" : "visible";
    }

    // Start the cursor blinking interval
    setInterval(toggleCursor, 500);

});


function notFound() {
    result.innerHTML = `${current_line}: command not found`
}

function matchLine(line) {
    let functions = {
        "help": function () {
            result.innerHTML = `
            <h2>welcome</h2>
            this is werdl's home page. find out more by typing commands. they are listed below.
            <ul>
                <li>about</li>
                <li>projects</li>
                <li>contact</li>
            </ul>
            `
        },

        "about": function () {
            result.innerHTML = `
            <h2>about</h2>
            hi, i'm werdl. i am a software developer. i am primarily interested in systems and low level engineering. i have also worked with backend web techologies, and some light frontend work. i am also interested in security and cryptography.
            `
        },

        "projects": function () {
            let projects = {
                "spartanproj/os": "an i386 operating system written in c and assembly",
                "dispatch-x/api": "the api for dispatch-x, a chat service i wrote with some friends",
                "werdl/safile": "a distributed file access system written in python, using the socket library",
                "werdl/thetime": "a rust library for time manipulation",
                "werdl/gext": "a text-based adventure game written in rust",
                "werdl/servt": "a simple http server written in rust",
                "werdl/quickhttp": "a simple and fast http client written in rust",
                "jsontp/paper": "the spec for the json transfer protocol, a modern alternative to http",
                "werdl/timesite": "a simple website for displaying the time incredibly accurately, written in javascript",
                "werdl/hgit": "a simple git client written in rust",
                "spartanproj/rosemary": "a small programming language that compiles to c, written in python",
                "werdl/mtx": "a minifying plain text format, which crams as much data as possible into a small space without losing any information, or compression of any kind",
                "werdl/utils": "a collection of small projects, including a text editor, a shell, and a git alternative, among other things. written in python and c",
                "werdl/libntp": "a python library for ntp, the network time protocol",
                "werdl/fibonacci": "a fibonacci nth-term generator written in python, using Binet's formula",
                "werdl/cxf": "a v library for complex and floating point numbers",
                "werdl/jsonfeed": "an alternative to rss, written in v",
                "werdl/livec": "a c interpreter written in v, using tcc. has syntax highlighting",
                "werdl/color": "a v library for color manipulation",
                "werdl/doc": "a documentation generator written in python",
                "werdl/pyt": "extremely simple python testing library",
                "werdl/chat": "a mess of spaghetti code resembling a chatbot, written in python",
                "werdl/humantalk": "a rust library for debugging and logging for end users",
                "werdl/githuback": "a very fast (all my repos in 9 secs) asynchronous github repo ripper, written in rust",
                "werdl/parsg": "a rust command line argument parser",
                "werdl/gitrs": "a git library written in rust",
                "werdl/bench": "benchmarking various programming languages (engine written in python)",

            };

            result.innerHTML = "<ul>";

            for (let project in projects) {
                result.innerHTML += `<li><a href="https://github.com/${project}">${project}</a>: ${projects[project]}</li>`
            }

            result.innerHTML += "</ul>";
        },

        "contact": function () {
            result.innerHTML = `
            <h2>contact</h2>
            you can contact me at <a href="mailto:werdl_is_cool@outlook.com">werdl_is_cool@outlook.com"</a>. my github account is <a href="https://github.com/werdl">werdl</a>.
            `
        }
        

    }

    if (line in functions) {
        playCMajorTriad();
        functions[line]();
        last_exit_code = 0;
    }
    else {
        playCMinorTriad();
        notFound();
        last_exit_code = 1;
    }
}

// event listener listening for any key press
document.addEventListener("keydown", function (event) {
    beep();

    if (!played_jingle) {
        jingle_is_playing = true;
        playOpeningJingle();
        played_jingle = true;
    }
    // if the key pressed is not enter
    if (event.key !== "Enter") {
        if (erase_on_next) {
            current_line = "";
            erase_on_next = false;
        }
        // handle backspace
        if (event.key === "Backspace") {
            current_line = current_line.slice(0, -1);
        } else {
            // check if alphanumeric or space
            if (event.key.match(/[a-zA-Z0-9 ]/)) {
                current_line += event.key;
            }

        }



        term.innerHTML = current_line;
    } else {
        // if the key pressed is enter, log the current line and reset it
        console.log(current_line);
        matchLine(current_line);

        erase_on_next = true;

        // add the default prompt to the terminal
        document.querySelector("#prompt").innerHTML = `(${last_exit_code}) ${default_prompt}`
    }

    console.log("Key pressed: " + event.key);


});


