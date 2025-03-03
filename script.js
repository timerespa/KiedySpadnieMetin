document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const nextRespElement = document.getElementById("nextResp");
    const respList = document.getElementById("respList");
    const toggleListButton = document.getElementById("toggleList");

    // Pierwszy resp ustawiony na 19:18:35
    let baseTime = new Date();
    baseTime.setHours(19, 18, 35, 0); 

    const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

    function getNextRespTime() {
        let now = new Date();
        let nextResp = new Date(baseTime.getTime());

        while (nextResp <= now) {
            nextResp = new Date(nextResp.getTime() + interval);
        }

        return nextResp;
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

        for (let i = 1; i <= 12; i++) {
            let respTime = new Date(nextResp.getTime() + (i - 1) * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        let firstResp = new Date(nextResp.getTime());
        nextRespElement.text
