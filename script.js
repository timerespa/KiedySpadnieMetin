document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const nextRespElement = document.getElementById("nextResp");
    const respList = document.getElementById("respList");
    const toggleListButton = document.getElementById("toggleList");

    // Ustawienie pierwszego czasu respa
    const initialHour = 12;
    const initialMinute = 00; 
    const initialSecond = 00;

    const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

    function getLastRespTime() {
        let now = new Date();
        let baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), initialHour, initialMinute, initialSecond);
        
        // Jeśli jest przed pierwszym respem danego dnia, szukamy ostatni resp z poprzedniego dnia
        if (baseTime > now) {
            baseTime.setDate(baseTime.getDate() - 1);
        }

        let lastResp = new Date(baseTime.getTime());

        // Liczymy kolejne respy do momentu, aż znajdziemy ostatni poprawny przed teraz
        while (lastResp <= now) {
            lastResp = new Date(lastResp.getTime() + interval);
        }

        return new Date(lastResp.getTime() - interval); // Poprzedni faktyczny resp
    }

    function getNextRespTime() {
        let lastResp = getLastRespTime();
        return new Date(lastResp.getTime() + interval);
    }

    function updateTimer() {
        let nextResp = getNextRespTime();
        let now = new Date();
        let timeDiff = nextResp - now;

        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        if (timeDiff <= 1000) {
            updateRespList();
        }
    }

    function updateRespList() {
        respList.innerHTML = "";
        let nextResp = getNextRespTime();

        for (let i = 0; i < 12; i++) {
            let respTime = new Date(nextResp.getTime() + i * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        nextRespElement.textContent = nextResp.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    updateRespList();
    setInterval(updateTimer, 1000);
});
