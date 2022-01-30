# Learn written subtraction with Subkraki :octopus:
The following repository was developed for a university project as a group of three students. It contains the frontend only because the backend is protected via a license. The resulting website can be found [here](https://cogsys.uni-bamberg.de/ITS/). 

The web-app is meant to deal as a support system for teachers who teach students written subtraction according to the rules that currently apply to the Bavarian school system. Students should work with the web-app and improve by learning from analogies which are presented to them. The analogy fits the mistake the student made. Subkraki, works as an avatar, who presents the analogies step-by-step which intends to let the students understand their miscalculation and improve over time. Substraction tasks with up to three digits and results only in the positive range can be calculated. Own exercises can be entered by pressing the _Eigene Aufgabe_ button in the upper left. The _Neue Aufgabe_ button works as a random exercise generator. 

The following ReadMe was part of a university assignment and thus intended for the professor, who should use it to start the web-app locally and understand the structure of the page. Therefore, the text is written in German and it is assumed that you have access to the API although we are not allowed to publish it.

# Subtrahieren mit Subkraki :octopus:

## Anleitung, um die Web-App zu starten:

1. Installiere [node](https://nodejs.org/en/download/) und [npm](https://www.npmjs.com/get-npm)
   - Für MacOS mit [Homebrew](https://brew.sh/) `brew install node`
   - Siehe [hier](https://nodejs.org/en/download/package-manager/) für andere Betriebssysteme
2. Um alle Dependencies/Packages zu installierens, kann folgendes Package zur Hilfe genommen werden: [npm-install-all](https://www.npmjs.com/package/npm-install-all). Es kann mit `npm install npm-install-all -g` installiert werden.
3. Im Projekt Ordner muss folgender Befehl ausgeführt werden: `npm-install-all`. Daraufhin sollten alle nötigen Packages installiert worden sein.
4. `npm start` ausgeführt aus dem Projekt Ordner startes die Web-App.
5. Um alle Funktionen des ITS zur Verfügung zu haben, muss [Subtraktion-API] laufen. Standardmäßig läuft die API auf http://localhost:4444. Die URL muss zur "proxy" Einstellung im package.json passen, um einen CORS-Error zu umgehen.

## Aufbau der Web-App

![alt text](src/resources/ReadMe/ComponentDiagram.png 'Component Diagramm')
Die Web-App besteht aus verschiedenen Components und das hier präsentierte Component Diagram zeigt den Aufbau der Webseite in Form von Beziehung zwischen den verwendeten Components. Die Pfeile veranschaulichen die Eltern-Kind-Beziehung zwischen den einzelnen Components, während die zugehörigen Zahlen die Kardinalität zeigen. Bei einer Kardinalität von beispielsweise “0...1” gibt es Fälle im Eltern-Component, in denen der jeweilige Kind-Component garnicht verwendet wird, und Fälle, in dem der Component ein Mal verwendet wird. Beim Starten der Webseite wird der `ComponentApp.js` aufgerufen. Je nach angegebener URL verweist `App.js` mittels Routing auf `Welcome.js` oder bei der URL `“.../rechnen”` auf `Calculate.js`.

Genaueres zum Aufbau der App kann in unserem Projektbericht nachgelesen werden.

<img src="src/resources/Subkraki.png" align="center" width="120" height="auto">

Subkraki wünscht ganz viel Spaß mit _Subtrahieren mit Subkraki_

## Referenzen

- Die App wurde mit Hilfe von [Create React App](https://github.com/facebook/create-react-app) erstellt
- [Subkraki Bildquelle](https://www.freepik.com/premium-vector/cute-octopus-cartoon_6520544.htm)
- [Hintergrund Bildquelle](https://www.animierte-gifs.net/img-animiertes-see-ozean-bild-0008-161513.htm)
