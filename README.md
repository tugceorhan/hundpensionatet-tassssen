# Hundpensionatet Tassen

Detta är ett individuellt skolprojekt som heter tassen. Hemsida visar bland annat öppettider, information om hemsidan, en live klocka som visar live status. I hemsidan består även kallender för att boka tid. I menyn "våra tjänster" har jag byggt ett responsivt rutnät med tjänstekort (service cards) som innehåller både bild, beskrivning och pris. sist var i en kontaktlista där besökaren kan kolla adress och kontakta de olika personalen.


## Hur man kör projektet
1. Öppna mappen i VS Code.
2. Högerklicka på `index.html` och välj "Open with Live Server" (eller dubbelklicka på `index.html` för att öppna direkt i webbläsaren).

## Reflektion
Det svåraste för mig var användingen av javascript koden då jag fortfarande inte är van vid den. Tog längre tid. fick använda hjälp material. 


 ## vad jag lärde mig
 jag lärde mig hur man bygger en live-klocka i JavaScript med `setInterval`, hur man hanterar händelser från formulär med `preventDefault` och hur man sparar data i webbläsaren. Jag lärde mig en hel del kod i javascript. 

## Bugg som uppstod och hur den löstes
Fick ett fel när jag skulle fixa datum kallendern då felet var att jag kunde boka datum från de föregående datumen. det fixade jag genom:

const dagensDatum = new Date().toISOString().split('T')[0];
bookingDateInput.setAttribute("min", dagensDatum);

 
const idag = new Date().toISOString().split('T')[0];
if (datum < idag) {
    formError.textContent = "Du kan inte boka ett datum som redan har varit!";
    return;
}

