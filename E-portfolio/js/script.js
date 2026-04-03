const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const units = [
    {
        name: "Web Development",
        assessments: [
            
            "Assets/assesments/Web design 1.pdf",
            "Assets/assesments/Web design 2.pdf",
            "Assets/assesments/Web design 3.pdf"
        ]
    },
    {
        name: "Database Systems",
        assessments: [
            "Assets/assesments/Database 1.pdf",
            "assets/assessments/db2.pdf",
            "assets/assessments/db3.pdf"
        ]
    }
];

const container = document.getElementById("units-container");

units.forEach(unit => {
    const unitDiv = document.createElement("div");
    unitDiv.className = "unit-card";   

    let assessmentsHTML = "";

    unit.assessments.forEach(pdfPath => {
      
        const fileName = pdfPath.split('/').pop().replace('.pdf', '');
        
        assessmentsHTML += `
            <div class="assessment-item">
                <span class="pdf-name">${fileName}</span>
                <div class="pdf-buttons">
                    <button onclick="viewPDF('${pdfPath}')" class="btn-view">
                        👁️ View
                    </button>
                    <button onclick="downloadPDF('${pdfPath}')" class="btn-download">
                        ⬇️ Download
                    </button>
                </div>
            </div>
        `;
    });

    unitDiv.innerHTML = `
        <h3>${unit.name}</h3>
        <div class="assessments-list">
            ${assessmentsHTML}
        </div>
    `;

    container.appendChild(unitDiv);
});

function viewPDF(pdfPath) {
    window.open(pdfPath, '_blank');
}

function downloadPDF(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop();  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openFullscreen(elem) {
    if (!elem) return;

    try {
      
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } 
        
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } 
        
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } 
        
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } 
        else {
            
            const parent = elem.parentElement;
            if (parent && parent.requestFullscreen) {
                parent.requestFullscreen();
            } else {
                console.warn("Fullscreen API is not supported in this browser.");
                
                alert("Fullscreen mode is not supported in your browser. You can still zoom in manually.");
            }
        }
    } catch (error) {
        console.error("Error entering fullscreen:", error);
        alert("Could not enter fullscreen mode. Please try again.");
    }
}

document.addEventListener('fullscreenchange', () => {
    console.log('Fullscreen mode changed');
});

document.addEventListener('webkitfullscreenchange', () => {
    console.log('WebKit fullscreen changed');
});