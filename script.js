// Configuración
const MIN_GRADE_TO_PASS = 3.6
const MAX_GRADE = 5.0

// Elementos del DOM
const calculateBtn = document.getElementById("calculate-btn")

// Event listeners
calculateBtn.addEventListener("click", calculateResults)

// Agregar event listeners para cálculo automático
document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", calculateResults)
})

function calculateResults() {
    calculateStudentResult(1)
    calculateStudentResult(2)
}

function calculateStudentResult(studentNumber) {
    const studentName = document.getElementById(`student${studentNumber}-name`).value || `Princesa ${studentNumber}`
    const grades = []

    // Obtener todas las notas del estudiante
    for (let i = 1; i <= 5; i++) {
        const gradeInput = document.getElementById(`grade${studentNumber}-${i}`)
        const grade = Number.parseFloat(gradeInput.value)

        if (!isNaN(grade) && grade >= 0 && grade <= MAX_GRADE) {
            grades.push(grade)
        }
    }

    const averageElement = document.getElementById(`average${studentNumber}`)
    const statusElement = document.getElementById(`status${studentNumber}`)

    if (grades.length === 0) {
        averageElement.textContent = "--"
        statusElement.textContent = "💫 Ingresa las notas para ver el resultado 💫"
        statusElement.className = "status"
        return
    }

    // Calcular promedio
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length
    averageElement.textContent = average.toFixed(2)

    // Determinar si pasa o no
    const passed = average >= MIN_GRADE_TO_PASS

    if (grades.length < 5) {
        statusElement.textContent = `⚠️ ${studentName} tiene ${grades.length}/5 notas ingresadas ⚠️`
        statusElement.className = "status"
    } else if (passed) {
        statusElement.textContent = `🎉 ¡${studentName} APROBÓ la materia! 👑✨`
        statusElement.className = "status passed"

        // Agregar efecto de celebración
        createCelebrationEffect(studentNumber)
    } else {
        statusElement.textContent = `😢 ${studentName} no aprobó la materia 💔`
        statusElement.className = "status failed"
    }
}

function createCelebrationEffect(studentNumber) {
    const studentCard = document.querySelector(`.student-card:nth-child(${studentNumber})`)

    // Crear elementos de celebración
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const celebration = document.createElement("div")
            celebration.textContent = ["🎉", "✨", "👑", "💖", "🌟"][i]
            celebration.style.position = "absolute"
            celebration.style.fontSize = "30px"
            celebration.style.left = Math.random() * 100 + "%"
            celebration.style.top = Math.random() * 100 + "%"
            celebration.style.animation = "celebrationFloat 2s ease-out forwards"
            celebration.style.pointerEvents = "none"
            celebration.style.zIndex = "1000"

            studentCard.style.position = "relative"
            studentCard.appendChild(celebration)

            // Remover el elemento después de la animación
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.parentNode.removeChild(celebration)
                }
            }, 2000)
        }, i * 200)
    }
}

// Agregar CSS para la animación de celebración
const style = document.createElement("style")
style.textContent = `
    @keyframes celebrationFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-50px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
        }
    }
`
document.head.appendChild(style)

// Validación de entrada en tiempo real
document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", function() {
        const value = Number.parseFloat(this.value)

        if (value < 0) {
            this.value = 0
        } else if (value > MAX_GRADE) {
            this.value = MAX_GRADE
        }

        // Agregar efecto visual para notas altas
        if (value >= MIN_GRADE_TO_PASS) {
            this.style.borderColor = "#28a745"
            this.style.boxShadow = "0 0 10px rgba(40, 167, 69, 0.3)"
        } else if (value > 0) {
            this.style.borderColor = "#dc3545"
            this.style.boxShadow = "0 0 10px rgba(220, 53, 69, 0.3)"
        } else {
            this.style.borderColor = "rgba(255, 192, 203, 0.5)"
            this.style.boxShadow = "none"
        }
    })
})


// Mensaje de bienvenida
console.log("👑 ¡Bienvenida a la Calculadora Mágica de Notas de Princesas! ✨")
console.log("🌟 Nota mínima para aprobar: 3.6")
console.log("🌟 Nota máxima: 5.0")
console.log("💖 ¡Que tengas un día mágico! 💖")