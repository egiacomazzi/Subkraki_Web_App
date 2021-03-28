# Subtrahieren mit Subkraki :octopus:

![alt text](src/resources/Subkraki.png 'Subkraki')

Anleitung, um die Web-App zu starten:

1. Installiere [node](https://nodejs.org/en/download/) und [npm](https://www.npmjs.com/get-npm)
   - Für MacOS mit [Homebrew](https://brew.sh/) `brew install node`
   - Siehe [hier](https://nodejs.org/en/download/package-manager/) für andere Betriebssysteme
2. Um alle Dependencies/Packages zu installierens, kann folgendes Package zur Hilfe genommen werden: [npm-install-all](https://www.npmjs.com/package/npm-install-all). Es kann mit `npm install npm-install-all -g` installiert werden.
3. Dann sollte im Projekt Ordner folgender Befehl ausgeführt werden: `npm-install-all`. Dieser sollte alle nötigen Packages installiert haben.
4. `npm start` aus dem Projekt Orner startes die Web-App. Um alle Funktionen des ITS zur Verfügung zu haben, muss noch die Anleitung in [Subtraktion-API]() befolgt werden.

# Aufbau der Web-App

![alt text](src/resources/ReadMe/ComponentDiagram.png 'Component Diagramm')
Die Web-App besteht aus verschiedenen Components und das hier präsentierte Component Diagram zeigt den Aufbau der Webseite in Form von Beziehung zwischen den verwendeten Components. Die Pfeile veranschaulichen die Eltern-Kind-Beziehung zwischen den einzelnen Components, während die zugehörigen Zahlen die Kardinalität zeigen. Bei einer Kardinalität von beispielsweise “0...1” gibt es Fälle im Eltern-Component, in denen der jeweilige Kind-Component garnicht verwendet wird, und Fälle, in dem der Component ein Mal verwendet wird. Beim Starten der Webseite wird der `ComponentApp.js` aufgerufen. Je nach angegebener URL verweist `App.js` mittels Routing auf `Welcome.js` oder bei der URL `“.../rechnen”` auf `Calculate.js`.

Genaueres zum Aufbau der App kann in unserem [Projektbericht]() nachgelesen werden.

# Referenzen

- Die App wurde mit Hilfe von [Create React App](https://github.com/facebook/create-react-app) erstellt
- [Subkraki Bildquelle](https://www.freepik.com/premium-vector/cute-octopus-cartoon_6520544.htm)
- [Hintergrund Bildquelle](https://www.animierte-gifs.net/img-animiertes-see-ozean-bild-0008-161513.htm)
